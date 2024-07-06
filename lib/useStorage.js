import AsyncStorage from '@react-native-async-storage/async-storage'

export const saveTask = async (task, id) => {
  try {
    const jsonTask = JSON.stringify(task)
    await AsyncStorage.setItem(id, jsonTask)
    console.log('Task saved')
    return true
  } catch (error) {
    console.log('Error saving task')
    console.log(error)
    return false
  }
}

export const getTask = async (id) => {
  try {
    const task = await AsyncStorage.getItem(id)
    console.log(task)
    return task
  } catch (error) {
    console.log(error)
    return false
  }
}

export const getAllTasks = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys()
    console.log(keys)
    const tasks = await AsyncStorage.multiGet(keys)
    const parsedResult = tasks.map(([key, value]) => JSON.parse(value))
    console.log(parsedResult)
    return parsedResult
  } catch (error) {
    console.log(error)
    return false
  }
}

export const deleteTask = async (id) => {
  try {
    await AsyncStorage.removeItem(id)
    console.log('Task deleted')
    return true
  } catch (error) {
    console.log('Error deleting task')
    console.log(error)
    return false
  }
}
export const clearAllTasks = async () => {
  try {
    await AsyncStorage.clear()
    console.log('All tasks deleted')
    return true
  } catch (error) {
    console.log('Error deleting all tasks')
    console.log(error)
    return false
  }
}
