import { createSelector } from 'reselect'

const sortDecending = (a,b) => b.id - a.id

export const _projects = state => state.projects.list
export const _msa = state => state.msa.list
export const _sow = state => state.sow.list
export const _timesheet = state => state.timesheet.list
export const _invoice = state => state.invoice.list
export const _filters = state => state.filters.data

export const _projectsSorted = createSelector(_projects, list => [...list].sort(sortDecending))
export const _msaSorted = createSelector(_msa, list => [...list].sort(sortDecending))
export const _sowSorted = createSelector(_sow, list => [...list].sort(sortDecending))
export const _timesheetSorted = createSelector(_timesheet, list => [...list].sort(sortDecending))
export const _invoiceSorted = createSelector(_invoice, list => [...list].sort(sortDecending))

export const _msaFiltered = createSelector(
  _msaSorted,
  _filters,
  (msa, filters) => msa.filter((doc) => {
    const docHasProject = (projectId) => doc.projectId === projectId
    const docHasYear = (year) => year.includes(doc.fromYear) || year.includes(doc.toYear)
    const docHasStatus = (status) => doc.status === status

    if(filters.projectId && !docHasProject(filters.projectId)) return false
    if(filters.year.length && !docHasYear(filters.year)) return false
    if(filters.status && !docHasStatus(filters.status)) return false

    return true
  })
)

export const _sowFiltered = createSelector(
  _sowSorted,
  _filters,
  (sow, filters) => sow.filter((doc) => {
    const docHasProject = (projectId) => doc.projectId === projectId
    const docHasYear = (year) => year.includes(doc.fromYear) || year.includes(doc.toYear)
    const docHasStatus = (status) => doc.status === status

    if(filters.projectId && !docHasProject(filters.projectId)) return false
    if(filters.year.length && !docHasYear(filters.year)) return false
    if(filters.status && !docHasStatus(filters.status)) return false

    return true
  })
)

export const _timesheetFiltered = createSelector(
  _timesheetSorted,
  _filters,
  (timesheet, filters) => timesheet.filter((doc) => {
    const docHasProject = (projectId) => doc.projectId === projectId
    const docHasYear = (year) => year.includes(doc.year)
    const docHasStatus = (status) => (doc.statusSelf === status || doc.statusClient === status)

    if(filters.projectId && !docHasProject(filters.projectId)) return false
    if(filters.year.length && !docHasYear(filters.year)) return false
    if(filters.status && !docHasStatus(filters.status)) return false

    return true
  })
)

export const _timesheetMonthHashTable = createSelector(
  _timesheetFiltered,
  (timesheets) => timesheets.reduce((hashTable, timesheet) => {
    hashTable[timesheet.projectId + timesheet.month + timesheet.year] = timesheet;
    return hashTable;
  }, {})
)

export const _invoiceFiltered = createSelector(
  _invoiceSorted,
  _filters,
  (invoice, filters) => invoice.filter((doc) => {
    const docHasProject = (projectId) => doc.projectId === projectId
    const docHasYear = (year) => year.includes(doc.year)
    const docHasStatus = (status) => doc.status === status

    if(filters.projectId && !docHasProject(filters.projectId)) return false
    if(filters.year.length && !docHasYear(filters.year)) return false
    if(filters.status && !docHasStatus(filters.status)) return false

    return true
  })
)

export const _invoiceMonthHashTable = createSelector(
  _invoiceFiltered,
  (invoices) => invoices.reduce((hashTable, invoice) => {
    hashTable[invoice.projectId + invoice.month + invoice.year] = invoice;
    return hashTable;
  }, {})
)

export const _activeProjects = createSelector(
  _projectsSorted,
  projects => projects.filter(project => project.status)
)

export const _projectsFiltered = createSelector(
  _activeProjects,
  _filters,
  (projects, filters) => projects.filter((doc) => {
    const docHasProject = (projectId) => doc.id === projectId

    if(filters.projectId && !docHasProject(filters.projectId)) return false

    return true
  })
)

export const _ProjectHashTable = createSelector(
  _activeProjects,
  projects => projects.reduce((hashTable, project) => {
    hashTable[project.id] = project;
    return hashTable;
  }, {})
)

export const _isFilterActive = createSelector(
  _filters,
  filters => Boolean(filters.projectId || filters.year.length || filters.status)
)