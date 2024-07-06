import { View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import GradientText from '../components/GradiantText'
import TaskItem from '../components/TaskItem'
import { router } from 'expo-router'
import icons from '../constants/icons'
import { useEffect, useState } from 'react'
import { clearAllTasks, getAllTasks } from '../lib/useStorage'
import { CustomModal } from '../components/CustomModal'

const History = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    setLoading(true)
    getAllTasks().then((tasks) => {
      setData(tasks)
    }).finally(() => setLoading(false))
  }, [])

  return (
    <SafeAreaView className=" w-full h-full bg-slate-200 ">
      <FlatList
        data={data}
        className="w-full h-full mt-4"
        renderItem={({ item, index }) => (
          <TaskItem
            startDate={item.startDate}
            endDate={item.endDate}
            task={item.task}
            time={item.time}
            index={index}
            otherStyles="justify-around p-2 items-center"
          />
        )}
        ListHeaderComponent={() => (
          <View className="m-4 p-2">
            <GradientText className="text-4xl font-bold text-start">
              History
            </GradientText>
            <View className="absolute top-4 right-0 w-18 gap-6 h-10 flex-row ">
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  setLoading(true)
                  clearAllTasks().then(() => {
                    setLoading(false)
                    setIsModalOpen(true)
                  })
                }}
              >
                <Image
                  source={icons.trash}
                  className="w-6 h-6"
                  tintColor={'#D0012C'}
                />
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  router.push('/')
                }}
              >
                <Image
                  source={icons.out}
                  className="w-6 h-6"
                  tintColor={'#000'}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
        ItemSeparatorComponent={() => (
          <View className="h-0.5 bg-slate-400 opacity-20" />
        )}
        onRefresh={() => {
          setLoading(true)
          getAllTasks()
            .then((tasks) => {
              setData(tasks)
            })
            .finally(() => setLoading(false))
        }}
        refreshing={loading}
      />

      <CustomModal visible={isModalOpen} setVisible={setIsModalOpen} title="Deleted Task!" textButton="Ok">
        <Text>The registered task has been deleted</Text>
      </CustomModal>

    </SafeAreaView>
  )
}

export default History
