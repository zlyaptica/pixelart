import { configureStore } from "@reduxjs/toolkit"
import colorReducer from "@/app/lib/reducers/ColorSlice"
import toolReducer from "./reducers/ToolSlice"
import canvasReducer from "./reducers/CanvasClise/CanvasSlice"

export const makeStore = () => {
  return configureStore({
    reducer: {
      colorReducer: colorReducer,
      toolReducer: toolReducer,
      canvasReducer: canvasReducer
    },
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']