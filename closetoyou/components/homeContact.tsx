import { Image, StyleSheet } from "react-native";
import { ThemedView } from "./ThemedView";
import {Ionicons} from '@expo/vector-icons';


export function HomeContact(props:any){
    return(
        <ThemedView style={styles.fatherPicture}>
            <Ionicons 
            name="person"  size={150} color="black"/>
        </ThemedView>
    );
}

const styles= StyleSheet.create({
    fatherPicture:{
        width:150,
        height:150,
        justifyContent:"center",
        alignItems:"center"
    },
});