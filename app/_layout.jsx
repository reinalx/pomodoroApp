import { Stack } from 'expo-router'
import { GlobalProvider } from '../context/GlobalProvider'

const RootLayout = () => {
  return (
    <>
      <GlobalProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="history" options={{ headerShown: false }} />
        </Stack>
      </GlobalProvider>
    </>
  )
}

export default RootLayout
