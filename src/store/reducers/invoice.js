import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  list: []
}

const slice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {
    updateInvoiceList: (state, action) => {
      state.list = action.payload
    },
    addInvoice: (state, action) => {
      const list = [...state.list]
      list.push(action.payload)

      state.list = list
    },
    updateInvoice: (state, action) => {
      const list = state.list.map(item => {
        if(item.id === action.payload.id) {
          return action.payload
        }
        return item
      })
      state.list = list
    },
    removeInvoice: (state, action) => {
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
  updateInvoiceList,
  addInvoice,
  updateInvoice,
  removeInvoice
} = slice.actions

export default slice.reducer
