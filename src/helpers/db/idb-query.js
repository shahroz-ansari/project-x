import { toast } from "react-toastify"
import { deleteDoc, saveDoc, updateDoc } from "../../db"

export const addRecord = async (store, data, callback) => {
  try {
    const datetime = new Date().toLocaleString()
    const updatedData = {...data, createdAt: datetime, updatedAt: datetime }
    const id = await saveDoc(store, updatedData)
    callback?.({...updatedData, id})
    toast.success('Success')
  } catch(error) {
    console.error(error);
    toast.error('Error')
  }
}

export const putRecord = async (store, data, callback) => {
  try {
    const datetime = new Date().toLocaleString()
    const updatedData = {...data, updatedAt: datetime }
    await updateDoc(store, updatedData)
    callback?.(updatedData)
    toast.success('Success')
  } catch(error) {
    console.error(error);
    toast.error('Error')
  }
}

export const deleteRecord = async (store, key, callback) => {
  try {
    await deleteDoc(store, key)
    callback?.(key)
    toast.success('Success')
  } catch(error) {
    console.error(error);
    toast.error('Error')
  }
}