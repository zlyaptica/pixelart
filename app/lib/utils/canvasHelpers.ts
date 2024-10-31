import { ICell } from "../models"

export const fillCanvas = (width: number, height: number) => {
    return Array.from({ length: width }, (_, x) => (
        Array.from({ length: height }, (_, y) => ({
            position: { x, y },
            color: '#ffffff',
            opacity: 0,
        }))
    ))
}


export const initCanvasInLocalStorage = (cells: ICell[][]) => {
    localStorage.setItem("canvas", JSON.stringify(cells))
}


export const saveCellChanges = (cell: ICell) => {
    let canvas: ICell[][] = []
    if (typeof window !== "undefined") {
        const data = localStorage.getItem("canvas")
        canvas = JSON.parse(data!)
    }

    canvas[cell.position.x][cell.position.y] = cell

    localStorage.setItem("canvas", JSON.stringify(canvas))
}

export const saveCanvas = (canvas: ICell[][]) => {
    localStorage.setItem("canvas", JSON.stringify(canvas))
}