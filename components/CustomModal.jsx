import { View, Text, Modal, TouchableOpacity } from 'react-native'

export const CustomModal = ({ visible, setVisible, children, otherStyles, title, textButton, onPress }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => setVisible(false)}
    >
      <View className={`w-full h-full justify-center items-center ${otherStyles}`}>
        <View className="justify-around items-center space-y-2 bg-white rounded-xl p-4 w-52 h-36 opacity-90">
          <View className="space-y-1">
            <Text className="font-bold text-sl ">{title}</Text>
            {children}
          </View>
          <TouchableOpacity
            onPress={() => {
              setVisible(false)
              onPress && onPress()
            }}
            className="bg-sky-200  w-32 items-center justify-center rounded-xl p-2 text-center  font-semibold"
          >
            <Text className="text-slate-800 font-normal">{textButton}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}
