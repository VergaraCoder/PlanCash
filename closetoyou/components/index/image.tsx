import { StyleSheet } from "react-native";
import { ThemedView } from "../ThemedView";
import Ionicons from '@expo/vector-icons/Ionicons';



export function IconUser(){
    return(
        <ThemedView style={styles.containerImage}>
            <Ionicons size={150}  name="person" />
        </ThemedView>
    );
}

const styles=StyleSheet.create({
    containerImage:{
        width:"50%",
        height:"40%",
        justifyContent:"center",
        alignItems:"center"
    }
});