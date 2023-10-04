import { createSlice } from '@reduxjs/toolkit'

const filtersInitialState = {
  projectId: '',
  year: [],
  status: ''
}
const initialState = {
  data: filtersInitialState
}

const slice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    addFilter: (state, action) => {
      state.data = action.payload
    },
    removeFilter: (state, action) => {
      state.data = filtersInitialState
    }
  },
})

export const {
  addFilter,
  removeFilter
} = slice.actions

export default slice.reducer
