import { foundContact } from "@/scripts/edit/foundContact";
import { useEffect, useState , useCallback  } from "react";
import { ThemedView } from "../ThemedView";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { useLocalSearchParams  } from 'expo-router';
import { useFocusEffect } from 'expo-router';
import { updateContact } from "@/scripts/edit/updateContact";
import { useNavigation } from "expo-router";



export function EditContact(){
    const [contact,setContact]=useState<any>();
    const navegation:any=useNavigation();
    const {key,dataUser,imageUri}= useLocalSearchParams() as {key:string, dataUser:string,imageUri:string};

    useFocusEffect(
        useCallback(()=>{            
            const fetchContact = async () => {
                
                if(imageUri){
                    const json=JSON.parse(key);
                    setContact({...json,photo:imageUri});        
                }
                else{
                    const contact2 = await foundContact(key);               
                    setContact(contact2);
                }
            };
            fetchContact();
        },[key])
    );

    const changeFoto = () =>{        
        navegation.navigate("camera",{screen:"editContact",dataUser:JSON.stringify(contact)});
    }

    return(
            <ThemedView style={styles.father}>
                {contact ? (
                    <>
                        <Text style={styles.title}> Actualizar Contacto</Text>
                        <ThemedView style={styles.containerImage}>
                            <Image source={{uri:contact.photo}} style={styles.image} 
                            />
                            <ThemedView style={styles.overlay}>
                                <Text style={styles.textOverlay} onPress={changeFoto}>
                                    Cambiar Foto
                                </Text>
                            </ThemedView>
                        </ThemedView>

                        <TextInput
                            style={styles.inputs}
                            value={contact.name}
                             onChangeText={(text) => setContact({ ...contact, name: text })}
                placeholder="Enter name"
                            
                        />
                        <TextInput
                        style={styles.inputs}
                        value={contact.email}
                          onChangeText={(text) => setContact({ ...contact, email: text })}
                placeholder="Enter email"
                        />
                        <TextInput
                        style={styles.inputs}
                        value={contact.telephone}
                          onChangeText={(text) => setContact({ ...contact, telephone: text })}
                placeholder="Enter Telephone"
                        />
                    </>
                ) : (
                    <Text>Cargando...</Text> // O cualquier otro indicador de carga
                )}
                <TouchableOpacity 
                    style={styles.buttonUpdate}
                    onPress={()=>updateContact(contact)}
                >
                    <Text 
                        style={styles.textButton}
                    >Actualizar</Text>
                </TouchableOpacity>
            </ThemedView>
    );
}


const styles=StyleSheet.create({
    father:{
        width:"100%",
        height:"100%",
        backgroundColor:"#48e",
        justifyContent:"center",
        alignItems:"center"
    },
    inputs:{
        width:"80%",
        height:"7%",
        backgroundColor:"white",
        textAlign:"center",
        marginBottom:20,
        borderRadius:6,

    },
    title:{
        fontSize:20,
        marginBottom:30,
        color:"white",
        fontWeight:"600"
    },
    buttonUpdate:{
        backgroundColor:"white",
        width:"60%",
        height:"7%",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:10,
        borderColor:"black",
        borderWidth:5
    },
    textButton:{
        fontSize:13,
    },
    containerImage:{
        width:150,
        height:150,
        borderRadius:100,
        marginBottom:20,
        overflow:"hidden"
    },
    image:{
        width:"100%",
        height:"100%",
        borderRadius:100,
    },
    overlay:{
        position:"absolute",
        top:90,
        width:"100%",
        height:"100%",
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignItems:"center",
        paddingTop:10
    },
    textOverlay:{
        textAlign:"center",
        fontSize:15,
        color:"white",
        width:"100%",height:"100%",
    }
});