import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ColorType } from "../enums"

interface IColorState {
    primaryColor: string,
    secondaryColor: string,
    colorType: ColorType
}

const initialState: IColorState = {
    primaryColor: "#ffffff",
    secondaryColor: "#000000",
    colorType: ColorType.primary
}

export const colorSlice = createSlice({
    name: "color",
    initialState,
    reducers: {
        setPrimaryColor: (state, action: PayloadAction<string>) => {
            state.primaryColor = action.payload
        },
        setSecondaryColor: (state, action: PayloadAction<string>) => {
            state.secondaryColor = action.payload
        },
        swapColors: (state) => {
            let swap: string = state.primaryColor
            state.primaryColor = state.secondaryColor
            state.secondaryColor = swap 
        }
    }
})

export const {setPrimaryColor, setSecondaryColor, swapColors} = colorSlice.actions

export default colorSlice.reducer