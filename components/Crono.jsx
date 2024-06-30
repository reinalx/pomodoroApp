import { View, Text, Modal, Button, TouchableOpacity } from 'react-native'
import ActionButton from './ActionButton'
import icons from '../constants/icons'
import InputTask from './InputTask'
import { useState } from 'react'
import CircularProgress from './CircularProgress'
import { useCrono } from '../hooks/useCrono'
import { TIME_FOCUS_BLOCK, TIME_REST_BLOCK } from '../constants/crono'
import { useGlobalContext } from '../context/GlobalProvider'

const Crono = ({ otherStyles }) => {
  const [task, setTask] = useState('')
  const { isModalOpen, setIsModalOpen, isActive } = useGlobalContext()

  const formatTime = (time) => {
    return String(time).padStart(2, '0')
  }
  const handleOnChange = (text) => {
    setTask(text)
  }

  const {
    minutes,
    seconds,
    isRunning,
    resume,
    pause,
    startCrono,
    resetCrono,
    progressCrono,
    finishCycle,
    cycle,
    nextCycle
  } = useCrono(10, TIME_REST_BLOCK, 600) // Hacer que el usuario pueda cambiar el tiempo de la block de resto

  // Función para asegurar que los números siempre tengan dos dígitos

  return (
    <View className={`justify-between bg-slate-300 pt-8 rounded-t-3xl  space-y-4 ${otherStyles}`}>

      {/* añadir animación de pulso */}
      <CircularProgress
        progress={progressCrono}
        outerCircleColor="#057A55"
        showLabel
        size={250}
        labelContent={
          isActive
            ? (
            <>
              <Text className="font-semibold text-4xl text-center text-slate-800 ">
                {formatTime(minutes)}:{formatTime(seconds)}
              </Text>
              <Text className="font-normal text-lg text-center text-slate-800 ">
                P{cycle}
              </Text>
            </>
              )
            : (
            <Text className="font-semibold text-4xl text-center text-slate-800 ">
              Waiting
            </Text>
              )
        }
        progressCircleColor="#84E1BC"
      />

      <View className="flex-row m-12">
        <View className="flex-grow ">
          <InputTask onChange={handleOnChange} />
        </View>
      </View>

      <View className="p-12 flex-row items-center justify-around w-96 ">
        {!isActive
          ? (
          <ActionButton
            icon={icons.plus}
            handlePress={startCrono}
            disable={!task}
            otherStyles={'transition-all duration-500 w-52 '}
          />
            )
          : (
          <>
            <ActionButton
              icon={icons.reset}
              handlePress={resetCrono}
              otherStyles={'transition-all duration-500'}
            />
            {isRunning
              ? (
              <ActionButton
                icon={icons.pause}
                handlePress={pause}
                otherStyles={'transition-all duration-500 w-24 h-24 '}
              />
                )
              : (
              <ActionButton
                icon={icons.play}
                handlePress={resume}
                otherStyles={'transition-all duration-500 w-24 h-24 '}
              />
                )}

            <ActionButton icon={icons.next} handlePress={() => {
              pause()
              setIsModalOpen(true)
            }} />
          </>
            )}
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
      >
        <View className="w-full h-full justify-center items-center">
          <View className="justify-around items-center space-y-2 bg-white rounded-xl p-4 w-52 h-36 opacity-90">
            <View className="space-y-1">
              <Text className="font-bold text-sl ">Time is up!</Text>
              {cycle % 2 === 0
                ? (
                <Text className="font-light">
                  You have finish the rest block
                </Text>
                  )
                : (
                <Text className="font-light">
                  You have finish the rest block
                </Text>
                  )}
            </View>
            <TouchableOpacity
              onPress={() => {
                setIsModalOpen(false)
                nextCycle()
              }}
              className="bg-sky-200  w-32 items-center justify-center rounded-xl p-2 text-center  font-semibold"
            >
              <Text className="text-slate-800 font-normal">Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default Crono
