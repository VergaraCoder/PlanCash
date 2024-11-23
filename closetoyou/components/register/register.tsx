import { verifyData } from "@/scripts/register/register";
import { Link } from "expo-router";
import { useEffect, useState } from "react"
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useNavigation } from "expo-router";



export const Register = () =>{
    const [dataRegister,setDataRegister] = useState<any>();
    const [sendData,setSendData]=useState<any>(0);
    const [error,setError]= useState<any>();
    const navegation: any = useNavigation();

    useEffect(()=>{
        if(sendData){
            console.log("porfavor cambiemos a index");
            navegation.navigate("index");
        }
    },[sendData]);

    return(
        <View style={styles.container}>
        <View style={styles.containerChild}>
            <View>
                <Text style={styles.containerChild1Text}>
                        Register
                </Text>
                <Text style={styles.containerChild1Text2}>
                        closeToYou
                </Text>
            </View>
                
                <View style={styles.containerChild1}>
                    <TextInput
                        style= {styles.inputs}
                        placeholder="Name"
                        onChangeText={(text:any)=>{
                            setDataRegister({...dataRegister,name:text});
                        }}
                    />
            
                    <TextInput
                        style= {styles.inputs}
                        placeholder="Email"
                        onChangeText={(text:any)=>{
                            console.log("the value for the email is ");
                            setDataRegister({...dataRegister,email:text});
                        }}
                    />
            
                    <TextInput
                        style= {styles.inputs}
                        placeholder="Password"
                        onChangeText={(text:any)=>{   
                            setDataRegister({...dataRegister,password:text});
                        }}
                    />

                    {error ? 
                    <View>
                        <Text>
                            {error}
                        </Text>
                    </View>
                    :null}
            
                    <Pressable
                        style={styles.buttonRegister}
                        onPress={async ()=>await verifyData(dataRegister,setError,setSendData,sendData)}
                        >
                        <Text style={styles.textButton}>
                            Registrarme
                        </Text>
                    </Pressable>

                    <Link href={"/(tabs)"} style={styles.linkLogin}>
                        Ya tengo cuenta
                    </Link>
                    
                </View>
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
    },
    containerChild:{
        width:"95%",
        height:"90%",
        backgroundColor:"#48e",
        borderRadius:10,
        gap:10,
        padding:10,
        alignItems:"center",
    },
    containerChild1:{
        width:"90%",
        height:"80%",
        justifyContent:"center",
        alignItems:"center",
        gap:25
    },
    containerChild1Text:{
        fontSize:30,
        textAlign:"center",
        color:"white",

    },
    containerChild1Text2:{
        fontSize:30,
        textAlign:"center",
        color:"white",
        fontWeight:"700"

    },
    inputs:{
        width:"90%",
        height:"15%",
        color:"white",
        backgroundColor:"#48e",
        borderRadius:5,
        borderWidth:.1,
        borderTopWidth:5,
        borderColor:"white",
        fontSize:18
    },
    buttonRegister:{
        width:"60%",
        height:"10%",
        backgroundColor:"white",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:10
    },
    textButton:{
        width:"100%",
        textAlign:"center",
        fontSize:20,
        color:"#48e",
    },
    linkLogin:{
        color:"white",
        fontSize:17,
        borderBottomWidth:1,
        borderBottomColor:"white"
    }
});