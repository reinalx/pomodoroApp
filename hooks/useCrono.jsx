import { useTimer } from 'react-timer-hook'
import { useState, useEffect, useRef } from 'react'
import { useGlobalContext } from '../context/GlobalProvider'
import { usePushNotification } from './usePushNotification'
import { AppState } from 'react-native'

// Eliminar dependecias de confetti

export function useCrono (timing, restTime, customRestTime) {
  const [cycle, setCycle] = useState(1)
  const { setIsActive, isModalOpen, setIsModalOpen } = useGlobalContext()
  const [initSeconds, setInitSeconds] = useState(0)
  const [progressCrono, setProgressCrono] = useState(0)
  const countCyclesBlock = useRef(0)
  const { notification, schedulePushNotification } = usePushNotification()

  const time = new Date()
  time.setSeconds(time.getSeconds() + timing)
  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    isRunning,
    start,
    pause,
    resume,
    restart
  } = useTimer({
    expiryTimestamp: time,
    autoStart: false,
    onExpire: () => {
      schedulePushNotification()
      console.log(totalSeconds)
    }
  })

  useEffect(() => {
    AppState.addEventListener('change', handleAppsStateChange)
  }, [])

  useEffect(() => {
    setProgressCrono((totalSeconds / initSeconds) * 100)

    console.log(totalSeconds)
  }, [totalSeconds])

  const handleAppsStateChange = (nextAppState) => {
    if (nextAppState === 'active') {
      console.log('App is in the foreground')
    } else if (nextAppState === 'background') {
      console.log('App is in the background')
      console.log(totalSeconds)
    }
  }

  const startCrono = () => {
    setIsActive(true)
    start()
    setInitSeconds(totalSeconds)
  }

  const resetCrono = () => {
    restart(time, false)
    setIsActive(false)
    setProgressCrono(100)
    setCycle(1)
  }

  const nextCycle = () => {
    const time = new Date()
    if (cycle % 2 === 0) {
      time.setSeconds(time.getSeconds() + timing)
      setInitSeconds(timing)
    } else {
      countCyclesBlock.current += 1
      if (countCyclesBlock.current === 4) {
        time.setSeconds(time.getSeconds() + customRestTime)
        countCyclesBlock.current = 0
        setInitSeconds(customRestTime)
      } else {
        time.setSeconds(time.getSeconds() + restTime)
        setInitSeconds(restTime)
      }
    }
    restart(time)
    setCycle(cycle + 1)
  }

  return {
    hours,
    minutes,
    seconds,
    isRunning,
    resume,
    pause,
    startCrono,
    resetCrono,
    totalSeconds,
    initSeconds,
    progressCrono,
    cycle,
    nextCycle
  }
}
