import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ICell } from "../../models"
import { CellCoordinates } from "../../types"
import { IChangeCellOpacityPayload, IHoveredCell } from "./payloads"
import { fillCanvas } from "../../utils/fillCanvas"

interface ICanvasState {
    width: number,
    height: number,
    cells: ICell[][],
    authenticColor: string,
    authenticOpacity: number,
    currentPosition: CellCoordinates,
    previousPosition: CellCoordinates,
}

const initialState: ICanvasState = {
    height: 16,
    width: 16,
    cells: [],
    authenticColor: '#ffffff',
    authenticOpacity: 0,
    currentPosition: { x: 0, y: 0 },
    previousPosition: { x: 0, y: 0 },
}

export const canvasSlice = createSlice({
    name: "canvas",
    initialState,
    reducers: {
        initCanvas: (state) => {
            state.cells = fillCanvas(state.width, state.height)
        },
        changeCellColor: (state, action: PayloadAction<ICell>) => {
            const { x, y } = action.payload.position
            state.cells[x][y].color = action.payload.color
            state.cells[x][y].opacity = 1
        },
        changeCellOpacity: (state, action: PayloadAction<IChangeCellOpacityPayload>) => {
            const { x, y } = action.payload.position
            state.cells[x][y].opacity = action.payload.opacity
        },
        handleHoveredCell: (state, action: PayloadAction<IHoveredCell>) => {
            const { x, y } = action.payload.position
            state.cells[x][y].color = action.payload.color
            state.cells[x][y].opacity = action.payload.opacity
        },
        setAuthenticColor: (state, action: PayloadAction<string>) => {
            state.authenticColor = action.payload
        },
        setAuthenticOpacity: (state, action: PayloadAction<number>) => {
            state.authenticOpacity = action.payload

        },
        setHoveredCellCoodrdinates: (state, action: PayloadAction<CellCoordinates>) => {
            state.currentPosition = action.payload
        },
        increaseWidth: (state) => {
            state.cells.forEach((row, index) => {
                row.push({
                    position: { x: index, y: state.width },
                    color: '#ffffff',
                    opacity: 0
                })
            })
            state.width += 1
        },
        decreaseWidth: (state) => {
            state.width -= 1
            state.cells.forEach((row) => row.splice(state.width, 1))
        },
        increaseHeight: (state) => {
            const newRow = Array.from({ length: state.width }, (_, y) => ({
                position: { x: state.height, y: y },
                color: '#ffffff',
                opacity: 0,
            }))
            state.cells.push(newRow)
            state.height++
        },
        decreaseHeight: (state) => {
            state.height -= 1
            state.cells.splice(state.height, 1)
        },
        fillBackground: (state, action: PayloadAction<string>) => {
            state.cells.forEach((row) => {
                row.forEach((cell) => {
                    cell.color = action.payload
                    cell.opacity = 1
                })
            })
        },
        setPreviousPosition: (state, action: PayloadAction<CellCoordinates>) => {
            state.previousPosition = action.payload
        },
        movePicture: (state) => {
            const shiftX = state.currentPosition.x - state.previousPosition.x
            const shiftY = state.currentPosition.y - state.previousPosition.y

            const updatedCanvas: ICell[][] = Array.from({ length: state.width }, (_, x) => (
                Array.from({ length: state.height }, (_, y) => ({
                    position: { x, y },
                    color: '#ffffff',
                    opacity: 0,
                }))
            ))
            state.cells.forEach((row) => {
                row.forEach((cell) => {
                    const { x, y } = cell.position
                    const newX = x + shiftX
                    const newY = y + shiftY
                    if ((newX < state.width && newX >= 0) && (newY < state.height && newY >= 0)) {
                        updatedCanvas[newX][newY] = { ...cell, position: { x: newX, y: newY } }
                    }
                })
            });
            state.cells = updatedCanvas
        },
        clearCanvas: (state) => {
            state.cells.forEach((row) => {
                row.forEach((cell) => cell.opacity = 0)
            })
        }
    }
})

export const { initCanvas,
    changeCellColor,
    changeCellOpacity,
    handleHoveredCell,
    setAuthenticColor,
    setAuthenticOpacity,
    setHoveredCellCoodrdinates,
    increaseWidth,
    decreaseWidth,
    increaseHeight,
    decreaseHeight,
    fillBackground,
    setPreviousPosition,
    movePicture,
    clearCanvas } = canvasSlice.actions

export default canvasSlice.reducer