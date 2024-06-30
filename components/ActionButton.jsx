import { Text, Image, TouchableOpacity, View } from 'react-native'

const ActionButton = ({ icon, handlePress, disable, otherStyles }) => {
  const bgColor = disable ? 'bg-slate-400' : 'bg-slate-300'
  return (
    <TouchableOpacity
      activeOpaticy={0.8}
      className={`${bgColor} rounded-full justify-center items-center p-2 w-16 h-16 ${otherStyles}`}
      onPress={handlePress}
      disabled={disable}
    >
      <Image
        source={icon}
        className=" w-12 h-12"
        tintColor={disable ? '#436CD5' : '#638fff'}
      />
    </TouchableOpacity>
  )
}

export default ActionButton
