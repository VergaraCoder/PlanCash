import { Image, StyleSheet, Platform } from 'react-native';

import {Start} from '../../components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Ionicons from '@expo/vector-icons/Ionicons';
import { IconUser } from '@/components/index/image';
import { ButtonEnter } from '@/components/index/buttonEnter';
import Register from './register';
import { Login } from '@/components/login/login';


export default function HomeScreen() {
  return (
    <Login/>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height:"100%",
    alignItems: 'center',
    justifyContent:"center",
    gap: 8,
  },
});
