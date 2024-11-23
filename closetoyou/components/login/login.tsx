import { verifyLogin } from "@/scripts/login/verifyData";
import { Link, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Button, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useNavigation } from "expo-router";



export const Login = () => {

    const [email, setEmail] = useState<any>();
    const [password, setPassword] = useState<any>();
    const [register,setRegister]=useState<boolean>(false);
    const [error, setError] = useState();
    const [enter,setEnter]= useState(0);

    const navegation: any = useNavigation();

    useEffect(()=>{
        console.log("ENTER TO EXPLORER");
        navegation.navigate("explore",{idActive:enter});
    },[enter]);

    useEffect(()=>{
        if (register) {
            console.log("Navigating to Register screen");
            navegation.navigate("register");
          }
    },[register])

    return (
        <View style={styles.container}>
            <View style={styles.container2} >
                <View style={styles.containerTitle}>
                    <Text style={styles.title}>
                        Entrar a mi cuenta
                    </Text>
                </View>
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={(text)=>{
                        setEmail({...email,email:text});    
                    }}
                    style={styles.inputs}
                />

                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={(text)=>{
                        setPassword({...password,password:text});    
                    }}
                    style={styles.inputs}

                />

                {   
                    error ? 
                    <Text>
                        {error}
                    </Text>
                    :
                    null
                }
                <Pressable style={styles.button} onPress={async ()=>{await verifyLogin(email,password,setError,setEnter)}}>
                    <Text style={styles.text2}>
                        Entrar
                    </Text>
                </Pressable>


                <Text >
                    ¿No tienes cuenta?  

                </Text>
                <Link href={"/(tabs)/register"}>
                        registrarme
                </Link> 
            </View>
        </View>
        );
}


const styles= StyleSheet.create({
    container:{
        width:"100%",
        height:"100%",
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#48e",
    },
    container2:{
        width:"90%",
        height:"90%",
        alignItems:"center",
        justifyContent:"space-evenly",
        backgroundColor:"white",
        borderRadius:10,
        padding:20,
        gap:20
    },
    containerTitle:{
        width:"100%",
        height:"10%",
        marginBottom:20
    },
    title:{
        fontSize:30,
        textAlign:"center",
        color:"#48e"
    },
    inputs:{
        width:"90%",
        height:"10%",
        color:"#48e",
        borderRadius:5,
        borderWidth:.1,
        borderTopWidth:5,
        borderColor:"#48e",
        fontSize:18
    },
    text2:{
        color:"white",
    },
    link:{
        color:"blue",
        fontSize:16
    },
    button:{
        width:"65%",
        height:"10%",
        backgroundColor:"#48e",
        alignItems: 'center',
        justifyContent:"center",
        borderRadius:20,
    }
});