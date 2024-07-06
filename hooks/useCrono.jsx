import { useTimer } from 'react-timer-hook'
import { useState, useEffect, useRef } from 'react'
import { useGlobalContext } from '../context/GlobalProvider'
import { usePushNotification } from './usePushNotification'
import { saveTask } from '../lib/useStorage'
import { generateRandomId } from '../lib/utils'

// Eliminar dependecias de confetti

export function useCrono (timing, restTime, customRestTime) {
  const [cycle, setCycle] = useState(1)
  const { setIsActive, isModalOpen, setIsModalOpen } = useGlobalContext()
  const [initSeconds, setInitSeconds] = useState(0)
  const [progressCrono, setProgressCrono] = useState(0)
  const countCyclesBlock = useRef(0)
  const { notification, schedulePushNotification } = usePushNotification()
  const [loading, setLoading] = useState(false)

  const [task, setTask] = useState('')
  const [startDate, setStartDate] = useState('')
  const [totalTime, setTotalTime] = useState(0)

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
      setIsModalOpen(true)
    }
  })

  useEffect(() => {
    setProgressCrono((totalSeconds / initSeconds) * 100)
  }, [totalSeconds])

  const startCrono = () => {
    setIsActive(true)
    start()
    setInitSeconds(totalSeconds)
    const startDate = new Date().toLocaleString()
    setStartDate(startDate)
  }

  const resetCrono = () => {
    const time = new Date()
    time.setSeconds(time.getSeconds() + timing)
    setProgressCrono(100)
    restart(time, false)
    setIsActive(false)
    setCycle(1)

    // Logíca para guardar la tarea
    const cycleTime = cycle % 2 === 0 ? restTime : timing
    console.log('cycleTime', cycleTime)
    console.log('totalSeconds', totalSeconds)

    const newTotalTime = totalTime + (cycleTime - totalSeconds)
    setTotalTime(newTotalTime)

    const id = task + generateRandomId()
    const taskFinish = {
      startDate,
      endDate: new Date().toLocaleString(),
      task,
      time: newTotalTime
    }
    setLoading(true)
    saveTask(taskFinish, id).then(() => setLoading(false))

    setStartDate('')
    setTask('')
  }

  const nextCycle = () => {
    // NO ESTA BIEN HECHO LA SUMA, hay que hacer un calculo mas preciso
    const time = new Date()
    if (cycle % 2 === 0) {
      time.setSeconds(time.getSeconds() + timing)
      setInitSeconds(timing)
      const newTotalTime = totalTime + (timing - totalSeconds)
      setTotalTime(newTotalTime)
    } else {
      countCyclesBlock.current += 1
      if (countCyclesBlock.current === 4) {
        time.setSeconds(time.getSeconds() + customRestTime)
        countCyclesBlock.current = 0
        setInitSeconds(customRestTime)
        const newTotalTime = totalTime + (customRestTime - totalSeconds)
        setTotalTime(newTotalTime)
      } else {
        time.setSeconds(time.getSeconds() + restTime)
        setInitSeconds(restTime)

        const newTotalTime = totalTime + (restTime - totalSeconds)
        setTotalTime(newTotalTime)
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
    nextCycle,
    setTask,
    task
  }
}
