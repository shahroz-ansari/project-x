import { configureStore } from '@reduxjs/toolkit'

import projects from './reducers/projects'
import msa from './reducers/msa'
import sow from './reducers/sow'
import timesheet from './reducers/timesheet'
import invoice from './reducers/invoice'
import filters from './reducers/filters'

export const store = configureStore({
  reducer: {
    projects,
    msa,
    sow,
    timesheet,
    invoice,
    filters,
  },
})
