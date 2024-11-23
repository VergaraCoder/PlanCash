import { Pressable , StyleSheet, Text} from "react-native";
import { ThemedView } from "../ThemedView";
import { Link } from "expo-router";


export function ButtonEnter(){
    return(
        <ThemedView style={styles.container}>
            <Pressable style={styles.button}>
                <Link href={"/(tabs)/explore"} style={styles.text}>
                    <Text style={styles.text2}>
                    View contacts
                    </Text>
                </Link>
            </Pressable>
        </ThemedView>
    );
}


const styles = StyleSheet.create({
    container: {
      width: '50%',
      height:"10%",
      alignItems: 'center',
      justifyContent:"center",
      gap: 8,
    },
    button:{
        width:"100%",
        height:"90%",
        backgroundColor:"black",
        alignItems: 'center',
        justifyContent:"center",
        borderRadius:20
    },
    text:{
        color:"white",
        width:"100%",
        alignSelf: 'center',
        textAlign:"center"
    },
    text2:{
        color:"white",
        fontSize:20,
        fontWeight:"600"
    }
  });
  