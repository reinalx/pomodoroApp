import { ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import HeaderApp from '../components/HeaderApp'
import * as NavigationBar from 'expo-navigation-bar'

import Crono from '../components/Crono'
import LinearGradient from 'react-native-linear-gradient'

const App = () => {
  NavigationBar.setBackgroundColorAsync('#f8fafc') // Cambia el color de fondo del navegador de la pantalla
  NavigationBar.setButtonStyleAsync('dark') // Cambia el color de fondo del botón de navegación
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
