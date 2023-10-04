export const computeIconColor = (icons, projectsLength) => {
  const iconsLength = icons.length
  if(iconsLength !== projectsLength) return 'grey'
  if(icons.includes('warning')) return 'warning'
  return 'success'
} 