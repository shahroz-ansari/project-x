
export default function generateSelectList(list, options = null) {
  if(!list) return []

  const {idKey = 'id', labelKey} = options || {}
  return list.map(item => ({
    value: options ? item[idKey] : item,
    label: options ? item[labelKey] : item
  }))
}