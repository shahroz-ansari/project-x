import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  list: []
}

const slice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    updateProjectsList: (state, action) => {
      state.list = action.payload
    },
    addProject: (state, action) => {
      const list = [...state.list]
      list.push(action.payload)

      state.list = list
    },
    updateProject: (state, action) => {
      const list = state.list.map(item => {
        if(item.id === action.payload.id) {
          return action.payload
        }
        return item
      })
      state.list = list
    },
    removeProject: (state, action) => {
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
  updateProjectsList,
  addProject,
  updateProject,
  removeProject
} = slice.actions

export default slice.reducer
