import { View, Text } from 'react-native'

const TaskItem = ({ id, startDate, endDate, task, time }) => {
  return (
    <View className="h-24 w-full flex-row justify-around" >
        <Text className="text-center text-xl font-bold">{task}</Text>
        <Text className="text-center text-xl font-bold">{time}</Text>
        <Text className="text-center text-xl font-bold">{startDate}</Text>
        <Text className="text-center text-xl font-bold">{endDate}</Text>
    </View>
  )
}

export default TaskItem
