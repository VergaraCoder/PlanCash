import { Pressable, StyleSheet, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
} from 'react-native-reanimated';

import { ThemedText } from '@/components/ThemedText';

export function Start() {
  
  const start=()=>{
    alert("start session");
  }
  
  return(
    <Pressable
    onPress={start}
    style={styles.button}
    >
      <Text style={styles.text}>
        Ingresar
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  text: {
    fontWeight:"600",
    textAlign:"center",
    fontSize:20,
  },
  button:{
    width:"60%",
    borderWidth:4,
    borderColor:"black",
    borderRadius:10,
    padding:10
  }
});
