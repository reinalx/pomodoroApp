import { View, Text } from 'react-native'

const BlockTime = ({ isRestBlock }) => {
  const color = isRestBlock ? 'bg-sky-600' : 'bg-red-600'
  const size = isRestBlock ? 'w-4' : 'min-w-26 flex-1'
  return (
    <View className={`${color} ${size}`}>
    </View>
  )
}

export default BlockTime
