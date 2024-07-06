import { TextInput } from 'react-native'
import { useGlobalContext } from '../context/GlobalProvider'

const InputTask = ({ onChange, value }) => {
  const { isActive } = useGlobalContext()

  // Tengo que hacer que cuando se reinicie el crono se borre el texto
  return (
    <TextInput
      className=' w-full transition-colors duration-300 bg-slate-200 opacity-70 p-4 rounded-lg font-semibold '
      placeholder="Write your task"
      onChangeText={onChange}
      readOnly={isActive}
      value={value}
    />
  )
}

export default InputTask
