import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  list: []
}

const slice = createSlice({
  name: 'sow',
  initialState,
  reducers: {
    updateSOWList: (state, action) => {
      state.list = action.payload
    },
    addSOW: (state, action) => {
      const list = [...state.list]
      list.push(action.payload)

      state.list = list
    },
    updateSOW: (state, action) => {
      const list = state.list.map(item => {
        if(item.id === action.payload.id) {
          return action.payload
        }
        return item
      })
      state.list = list
    },
    removeSOW: (state, action) => {
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
  updateSOWList,
  addSOW,
  updateSOW,
  removeSOW
} = slice.actions

export default slice.reducer
