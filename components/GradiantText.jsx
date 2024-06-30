import { Text } from 'react-native'
import MaskedView from '@react-native-masked-view/masked-view'
import LinearGradient from 'react-native-linear-gradient'

const GradientText = (props) => {
  return (
    <MaskedView maskElement={<Text {...props} />}>
      <LinearGradient
        colors={['#6366f1', '#0ea5e9', '#10b981']}
        locations={[0.1, 0.3, 0.9]}
        start={{ x: 1, y: 1 }}
        end={{ x: 0, y: 0 }}
      >
        <Text {...props} style={[props.style, { opacity: 0 }]} />
      </LinearGradient>
    </MaskedView>
  )
}

export default GradientText
