import { View, Text, TouchableOpacity, Image } from 'react-native'
import { router } from 'expo-router'
import icons from '../constants/icons'
const HeaderApp = () => {
  return (
    <View className=" flex-row justify-between">
      <View className="m-4 p-2">
        <Text className=" text-slate-100  pb-0 text-4xl font-bold">
          Welcome to Pomodoro App
        </Text>
        <Text className="font-semibold text-sm text-stone-200 ">
          This is a simple Pomodoro App that helps you to manage your time and
          stay focused on your tasks.
        </Text>
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        className="absolute top-6 right-2 w-10 h-10 "
        onPress={() => {
          router.push('/history')
        }}
      >
        <Image source={icons.history} className="w-8 h-8" />
      </TouchableOpacity>
    </View>
  )
}

export default HeaderApp
