import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ToolType } from "../enums"

interface IToolState {
    toolType: ToolType
}

const initialState: IToolState = {
    toolType: ToolType.brush
}

export const toolSlice = createSlice({
    name: "tool",
    initialState,
    reducers: {
        setToolType: (state, action: PayloadAction<ToolType>) => {
            state.toolType = action.payload
        }
    }
})

export const { setToolType } = toolSlice.actions
export default toolSlice.reducer