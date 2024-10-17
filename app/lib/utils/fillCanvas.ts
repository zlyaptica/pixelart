export const fillCanvas = (width: number, height: number) => {
    return Array.from({ length: width }, (_, x) => (
        Array.from({ length: height }, (_, y) => ({
            position: { x, y },
            color: '#ffffff',
            opacity: 0,
        }))
    ))
}