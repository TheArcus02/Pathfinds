import { createSlice } from "@reduxjs/toolkit";
import { Tools } from "../utils/interfaces";

interface ToolsSliceState {
    selectedTool: Tools
    currentWeight: number
    animationSpeed: number
}

const initialState: ToolsSliceState = {
    selectedTool: 'Walls',
    currentWeight: 1,
    animationSpeed: 50
}

export const toolsSlice = createSlice({
    name: 'tools',
    initialState,
    reducers: {
        changeSelectedTool: (state, action) => {
            state.selectedTool = action.payload
        },
        changeCurrentWeight: (state, action) => {
            state.currentWeight = action.payload
        },
        decrementWeight: (state) => {
            if (state.currentWeight > 1) {
                state.currentWeight -= 1
            }
        },
        incrementWeight: (state) => {
            state.currentWeight += 1
        },
        changeAnimationSpeed: (state, action) => {
            state.animationSpeed = action.payload
        },
    }
})

export const {
    changeSelectedTool,
    changeCurrentWeight,
    decrementWeight,
    incrementWeight,
    changeAnimationSpeed
} = toolsSlice.actions

export default toolsSlice.reducer