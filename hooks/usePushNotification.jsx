import { useEffect, useState, useRef } from 'react'
import { Constants } from 'expo-constants'
import * as Notifications from 'expo-notifications'
import * as Device from 'expo-device'
import { Platform } from 'react-native'

// RECUERDA PEDIR PERMISOS PARA FUNCIONAR EN SEGUNDO Plano

export function usePushNotification () {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldPlaySound: false,
      shouldShowAlert: true,
      shouldSetBadge: false
    })
  })

  const [expoPushToken, setExpoPushToken] = useState('')
  const [notification, setNotification] = useState(undefined)
  const [channels, setChannels] = useState([])

  const notificationListener = useRef()
  const responseListener = useRef()
  const HIGHT_PRIORITY_CHANNEL_ID = 'high-priority'
  const LOW_PRIORITY_CHANNEL_ID = 'low-priority'

  const registerForPushNotificationsAsync = async () => {
    let token

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C'
      })
    }

    if (Device.isDevice) {
      const { existingStatus } = await Notifications.getPermissionsAsync()

      let finalStatus = existingStatus

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync()
        finalStatus = status
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token ')
      }
      try {
        const projectId =
          Constants?.expoConfig?.extra?.eas?.projectId ??
          Constants?.easConfig?.projectId
        if (!projectId) {
          throw new Error('Project ID not found')
        }
        token = (
          await Notifications.getExpoPushTokenAsync({
            projectId
          })
        ).data
        console.log(token)
      } catch (e) {
        token = `${e}`
      }
    } else {
      console.log('ERROR: Please use a phisical device ')
    }

    return token
  }

  const configureNotificationChannels = async () => {
    // Crear un canal de alta prioridad
    await Notifications.setNotificationChannelAsync('high-priority', {
      name: 'High Priority Notifications',
      importance: Notifications.AndroidImportance.HIGH,
      sound: 'default',
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C'
    })

    // Crear un canal de baja prioridad
    await Notifications.setNotificationChannelAsync('low-priority', {
      name: 'Low Priority Notifications',
      importance: Notifications.AndroidImportance.LOW
    })
  }
  useEffect(() => {
    registerForPushNotificationsAsync().then(
      (token) => token && setExpoPushToken(token)
    )

    if (Platform.OS === 'android') {
      Notifications.getNotificationChannelsAsync().then((value) =>
        setChannels(value ?? [])
      ) // eliminar esto
      configureNotificationChannels()
    }

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification)
      })

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response)
      })

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(
          notificationListener.current
        )
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current)
    }
  }, [])

  async function schedulePushNotification () {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Time is up!',
        body: 'Go back to your task',
        data: { data: 'goes here', test: { test1: 'more data' } }
      },
      identifier: 'BACKGROUND-NOTIFICATION-TASK',
      trigger: { seconds: 1, channelId: HIGHT_PRIORITY_CHANNEL_ID }
    })
  }

  return {
    expoPushToken,
    notification,
    schedulePushNotification
  }
}
