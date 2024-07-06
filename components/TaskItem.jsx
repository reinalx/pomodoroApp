import { View, Text } from 'react-native'
import { parseTime } from '../lib/utils'

const TaskItem = ({ startDate, endDate, task, time, otherStyles, index }) => {
  return (
    <View className={`h-24 w-full flex-row ${otherStyles} ${index % 2 === 0 ? 'bg-slate-100' : ''}`} >
        <Text className="text-center w-16 text-md font-normal">{task}</Text>
        <Text className="text-center w-16 text-md font-normal">{parseTime(time)}</Text>
        <Text className="text-center w-16 text-md font-normal">{startDate}</Text>
        <Text className="text-center w-16 text-md font-normal">{endDate}</Text>
    </View>
  )
}

export default TaskItem
