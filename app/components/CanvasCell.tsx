import { FC, memo } from "react";
import styles from '@/app/styles/CanvasCell.module.css'
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { ToolType } from "../lib/enums";
import { ICell } from "../lib/models";
import { IChangeCellOpacityPayload, IHoveredCell } from "../lib/reducers/CanvasClise/payloads";
import { changeCellColor, changeCellOpacity, fillBackground, handleHoveredCell, movePicture, setAuthenticColor, setAuthenticOpacity, setHoveredCellCoodrdinates, setPreviousPosition } from "../lib/reducers/CanvasClise/CanvasSlice";
import { setPrimaryColor } from "../lib/reducers/ColorSlice";

interface ICanvasCellProps {
    cell: ICell,
}

const CanvasCell: FC<ICanvasCellProps> = memo((props) => {
    const dispatch = useAppDispatch()
    const color = useAppSelector((state) => state.colorReducer.primaryColor)
    const toolType = useAppSelector((state) => state.toolReducer.toolType)

    const authenticColor = useAppSelector((state) => state.canvasReducer.authenticColor)
    const authenticOpacity = useAppSelector((state) => state.canvasReducer.authenticOpacity)
    const x = useAppSelector((state) => state.canvasReducer.currentPosition.x)
    const y = useAppSelector((state) => state.canvasReducer.currentPosition.y)

    const changeColor = () => {
        if (toolType === ToolType.brush) {
            dispatch(setAuthenticColor(props.cell.color))
            dispatch(setAuthenticOpacity(props.cell.opacity))
            const cell: ICell = {
                position: { x, y },
                color: color,
                opacity: 1
            }
            dispatch(changeCellColor(cell))

        } else if (toolType === ToolType.eraser) {
            dispatch(setAuthenticOpacity(0))
            const cell: IChangeCellOpacityPayload = {
                position: props.cell.position,
                opacity: 0
            }
            dispatch(changeCellOpacity(cell))
        } else if (toolType === ToolType.colorPicker && authenticOpacity) {
            dispatch(setPrimaryColor(authenticColor))
        }
    }

    const handleMouseOver = (e: any) => {
        if (e.buttons === 1) {
            if (toolType === ToolType.move) {
                dispatch(movePicture())
            } else if (toolType !== ToolType.backgroundFill) {
                changeColor()
            }
        }
    }

    const handleMouseDown = (e: any) => {
        if (e.buttons === 1) {
            if (toolType === ToolType.backgroundFill) {
                dispatch(setAuthenticColor(color))
                dispatch(setAuthenticOpacity(1))
                dispatch(fillBackground(color))
            } else if (toolType === ToolType.move) {
            } else {
                changeColor()
            }
        }
    }

    const handleMouseEnter = (e: any) => {
        dispatch(setHoveredCellCoodrdinates(props.cell.position))

        if (e.buttons === 0 && toolType === ToolType.move) return

        dispatch(setAuthenticColor(props.cell.color))
        dispatch(setAuthenticOpacity(props.cell.opacity))

        let cellOpacity: number
        if (toolType === ToolType.brush) {
            cellOpacity = 1
        } else if (toolType === ToolType.move) {
            console.log("opacity", props.cell.opacity, props.cell.position)
            cellOpacity = props.cell.opacity
        } else {
            cellOpacity = 0.5
        }

        const cell: IHoveredCell = {
            position: props.cell.position,
            color: toolType === ToolType.brush ? color : authenticColor,
            opacity: cellOpacity,
        }
        dispatch(handleHoveredCell(cell))
    }

    const handleMouseLeave = (e: any) => {
        if (toolType === ToolType.move && e.buttons === 1) {
            dispatch(setPreviousPosition(props.cell.position))
        } else if (toolType !== ToolType.move && e.buttons === 0) {

            const cell: IHoveredCell = {
                position: props.cell.position,
                color: authenticColor,
                opacity: authenticOpacity
            }
            dispatch(handleHoveredCell(cell))
        }
    }

    return (
        <div className={styles.cell}
            style={{
                backgroundColor: props.cell.color,
                opacity: props.cell.opacity,
                cursor: toolType === ToolType.brush ? "pointer" : "crosshair"
            }}
            onClick={changeColor}
            onMouseDown={handleMouseDown}
            onMouseOver={handleMouseOver}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onDragStart={(e) => e.preventDefault()}
            onDragEnd={(e) => e.preventDefault()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => e.preventDefault()}
        ></div>
    )
})

export { CanvasCell }