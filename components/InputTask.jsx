import { TextInput } from 'react-native'
import { useGlobalContext } from '../context/GlobalProvider'

const InputTask = ({ onChange }) => {
  const { isActive } = useGlobalContext()
  return (
    <TextInput
      className=' w-full transition-colors duration-300 bg-slate-200 p-4 rounded-lg font-semibold '
      placeholder="Write your task"
      onChangeText={onChange}
      readOnly={isActive}
    />
  )
}

export default InputTask
