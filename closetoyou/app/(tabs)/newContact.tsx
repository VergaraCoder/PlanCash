import { ThemedView } from "@/components/ThemedView";
import { useContact} from "../../scripts/createContext";
import { reviewValues } from "@/scripts/newContact/submitNew";
import { useCallback, useEffect, useState } from "react";
import { Button, Image, Pressable, StyleSheet, Text, TextInput } from "react-native";
import { useFocusEffect } from 'expo-router';
import { useLocalSearchParams } from "expo-router";
import { useNavigation } from "expo-router";


export default function NewContact(){
    
    const {uri}= useLocalSearchParams() as {uri:string};

    const [image,setImage]=useState<any>(null);
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [telephone,setTelephone] = useState("");

    const [error,setError] = useState("");
    const [button,setButton] = useState(false);
    const navegation:any=useNavigation();
    
    useEffect(()=>{
        
        setImage(uri);
        console.log(uri);
        console.log(image);
        
    },[uri])


    const takePhoto = () =>{
        navegation.navigate("camera",{screen:"newContact"});
    }

    const choosePhoto = () =>{
        console.log("navigate to galery");
        
        navegation.navigate("galery",{screen:"newContact"});
    }
  
    return(
    <ThemedView style={styles.body}>

        {image && <Image source={{uri:image}} width={150} height={150} style={styles.image}/>}
        
        <ThemedView>
            <Text style={styles.child2}>
            New Contact
            </Text>
        </ThemedView>
       <ThemedView style={styles.child1}>
             <TextInput
                style={{ borderWidth: 1, padding: 10, marginBottom: 15 }}
                placeholder="Name"
                onChangeText={(text)=>setName(text)}
            />
            <TextInput
                style={{ borderWidth: 1, padding: 10, marginBottom: 15 }}
                placeholder="Email"
                onChangeText={(text)=>setEmail(text)}

            />
            <TextInput
                style={{ borderWidth: 1, padding: 10, marginBottom: 15 }}
                placeholder="Telephone"
                keyboardType="numeric"
                onChangeText={(text)=>setTelephone(text)}
            />
            <Pressable style={styles.takePhoto} onPress={takePhoto}>
                <Text style={styles.textPhoto}>
                    Tomar foto
                </Text>

            </Pressable>

            <Pressable style={styles.takePhoto} onPress={()=>choosePhoto()}>
                <Text style={styles.textPhoto}>
                Elegir foto de galeria
                </Text>
            </Pressable>
            <Button
                title="Crear"
                onPress={()=>reviewValues(name,email,telephone,setError,setButton,image)}
            />

            {error ? <Text>{error} </Text> : null}
       </ThemedView>

    </ThemedView>
    );
}


const styles= StyleSheet.create({
    body:{
        padding:40,
        width:"100%",
        height:"100%",
        justifyContent:"center",
        alignItems: "center",
        gap:30,
        paddingBottom:150
    },
    child1:{
        width:"80%",
        height:"50%",
    },
    child2:{
        fontSize:30,
        fontWeight:"500"
    },
    takePhoto:{
        width:"80%",
        height:"20%",
        backgroundColor:"#4811",
        marginBottom:10,
        justifyContent:"center",
        alignSelf:"center"
    },
    textPhoto:{
        fontSize:20,
        textAlign:"center",
    },
    image:{
        borderRadius:100
    }
});