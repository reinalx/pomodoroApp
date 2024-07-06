import { View, Text, Modal, Button, TouchableOpacity } from 'react-native'
import ActionButton from './ActionButton'
import icons from '../constants/icons'
import InputTask from './InputTask'
import { useState } from 'react'
import CircularProgress from './CircularProgress'
import { useCrono } from '../hooks/useCrono'
import { TIME_FOCUS_BLOCK, TIME_REST_BLOCK } from '../constants/crono'
import { useGlobalContext } from '../context/GlobalProvider'
import { CustomModal } from './CustomModal'

const Crono = ({ otherStyles }) => {
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
    cycle,
    nextCycle,
    setTask,
    task
  } = useCrono(TIME_FOCUS_BLOCK, TIME_REST_BLOCK, 600) // Hacer que el usuario pueda cambiar el tiempo de la block de resto

  // Función para asegurar que los números siempre tengan dos dígitos

  return (
    <View
      className={`justify-between bg-slate-50 pt-8 rounded-t-3xl  space-y-4 ${otherStyles}`}
    >
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
          <InputTask onChange={handleOnChange} value={task} />
        </View>
      </View>

      <View className="p-12 flex-row items-center justify-around w-96 ">
        {!isActive
          ? (
          <View className="justify-center items-center h-24">
            <ActionButton
              icon={icons.plus}
              handlePress={startCrono}
              disable={!task}
              otherStyles={'transition-all duration-500 w-52'}
            />
          </View>
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

            <ActionButton
              icon={icons.next}
              handlePress={() => {
                pause()
                console.log('next')
                setIsModalOpen(true)
              }}
            />
          </>
            )}
      </View>
      <CustomModal
        visible={isModalOpen}
        setVisible={setIsModalOpen}
        title="Time is up!"
        textButton="Continue"
        onPress={nextCycle}
      >
        {cycle % 2 === 0
          ? (
          <Text className="font-light">You have finish the rest block</Text>
            )
          : (
          <Text className="font-light">You have finish the focus block</Text>
            )}
      </CustomModal>

    </View>
  )
}

export default Crono
