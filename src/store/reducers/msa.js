import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  list: []
}

const slice = createSlice({
  name: 'msa',
  initialState,
  reducers: {
    updateMSAList: (state, action) => {
      state.list = action.payload
    },
    addMSA: (state, action) => {
      const list = [...state.list]
      list.push(action.payload)

      state.list = list
    },
    updateMSA: (state, action) => {
      const list = state.list.map(item => {
        if(item.id === action.payload.id) {
          return action.payload
        }
        return item
      })
      state.list = list
    },
    removeMSA: (state, action) => {
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
  updateMSAList,
  addMSA,
  updateMSA,
  removeMSA
} = slice.actions

export default slice.reducer
