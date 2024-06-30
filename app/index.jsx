import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import HeaderApp from '../components/HeaderApp'

import Crono from '../components/Crono'
import LinearGradient from 'react-native-linear-gradient'

const App = () => {
  return (
    <LinearGradient
      colors={['#6366f1', '#0ea5e9', '#10b981']}
      locations={[0.1, 0.3, 0.9]}
      start={{ x: 1, y: 1 }}
      end={{ x: 0, y: 0 }}
    >
      <SafeAreaView className="w-full h-full">
        <ScrollView contentContainerStyle={{ height: '100%' }}>
          <HeaderApp />
          <Crono otherStyles="flex-grow items-center " />
        </ScrollView>
        <StatusBar style="light" />
      </SafeAreaView>
    </LinearGradient>
  )
}

export default App
