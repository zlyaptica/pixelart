import { FC, memo, useState } from "react";
import { CanvasCell } from "./CanvasCell";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { setHoveredCellCoodrdinates } from "../lib/reducers/CanvasClise/CanvasSlice";

interface CanvasRowProps {
    x: number
    height: number
}

const CanvasRow: FC<CanvasRowProps> = memo((props) => {
    const columns: React.ReactElement[] = []
    const cells = useAppSelector((state) => state.canvasReducer.cells)

    if (cells.length > 0) {
        for (let i = 0; i < props.height; i++) {
            columns.push(<CanvasCell key={i} cell={cells[i][props.x]} />)
        }
    }

    return (
        <div>
            {columns}
        </div>
    )
})

export { CanvasRow }