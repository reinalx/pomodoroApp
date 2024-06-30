import { View, Text, ScrollView, FlatList } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import GradientText from '../components/GradiantText'
import { data } from '../constants/fakeData'
import TaskItem from '../components/TaskItem'
const History = () => {
  console.log(data)
  return (
    <SafeAreaView className=" w-full h-full bg-slate-200 justify-center items-center">
      <FlatList
        data={data}
        className="w-full h-full"
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskItem
            startDate={item.startDate}
            endDate={item.endDate}
            task={item.task}
            time={item.time}
          />
        )}
        ListHeaderComponent={() => (
          <View>
            <View className="">
              <GradientText className="p-4 text-4xl font-bold">
                History
              </GradientText>
            </View>

            <View className="h-24 w-full flex-row justify-around">
              <Text className="text-center text-xl font-bold">Task</Text>
              <Text className="text-center text-xl font-bold">Total time</Text>
              <Text className="text-center text-xl font-bold">Start Date</Text>
              <Text className="text-center text-xl font-bold">End Date</Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  )
}

export default History
