import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  list: []
}

const slice = createSlice({
  name: 'timesheet',
  initialState,
  reducers: {
    updateTimesheetList: (state, action) => {
      state.list = action.payload
    },
    addTimesheet: (state, action) => {
      const list = [...state.list]
      list.push(action.payload)

      state.list = list
    },
    updateTimesheet: (state, action) => {
      const list = state.list.map(item => {
        if(item.id === action.payload.id) {
          return action.payload
        }
        return item
      })
      state.list = list
    },
    removeTimesheet: (state, action) => {
      const list = state.list.filter(item => {
        if(item.id === action.payload) {
          return false
        }
        return true
      })
      state.list = list
    }
  },
})

export const {
  updateTimesheetList,
  addTimesheet,
  updateTimesheet,
  removeTimesheet
} = slice.actions

export default slice.reducer
