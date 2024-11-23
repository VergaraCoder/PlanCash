import React, { useEffect, useState } from "react";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import {
    Button,
    FlatList,
    Image,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { saveData } from "@/scripts/explore/saveData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useContact } from "@/scripts/createContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import { deleteData } from "@/scripts/explore/remove";
import { Link, useLocalSearchParams } from "expo-router";
import { EditContact } from "../edit/editContact";
import { FilterByname } from "@/scripts/explore/filterdataByName";
import { returnContacts } from "@/scripts/explore/returnContacts-owner";


interface Contact {
    key: string;
    name: string;
    email: string;
    telephone: number;
    letter:string;
    photo:string;
}

const letters = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "Ñ",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
];

export function GetContacts() {
    const [contacts, setContacts] = useState<Contact[] | any>([]);
    const [refresh, setRefresh] = useState(0);
    const [searchContact,setSearchContact]= useState<any>({search:""});
    let { idActive } = useLocalSearchParams() as {
        idActive:string
    };

    useEffect(()=>{
        const fetchContacts = async () => {
            try {
                //let dataContacts = [];
                console.log("ENTER TO GET CONTACTS");
                
                const allContacts = await returnContacts();
                console.log(allContacts);

                const orderBy = orderByName(allContacts);
                idActive=""
                setContacts(orderBy);
                
            } catch (err) {
                console.error("Error loading contacts:", err);
            }
        };

        fetchContacts();
    },[idActive ,refresh]);


    const handligRefresh = () => {
        setRefresh((prev) => prev + 1);
    };

    const orderByName = (data: Contact[]) => {
        return letters.reduce((acc:any[], letter) => {

            const filteredContacts = data.filter(contact => contact.email[0].toUpperCase() === letter);
            if (filteredContacts.length > 0) {
                acc.push({ letter });
                acc.push(...filteredContacts); 
            }
            return acc;
        }, []);
    };

    const renderItem = ({ item }: any) => (
        item.letter ?

        <Text style={styles.firstLettter}>{item.letter}</Text>
        
        :
        <Pressable style={styles.contact}>
            <ThemedView style={styles.contactBlock}>
                <ThemedText style={styles.textContact}>{item.email}</ThemedText>
                {item.photoUri ? (
                    <Image 
                        source={{ uri: item.photoUri }} 
                        style={styles.image}
                        onError={() => {
                            console.log("ERROR");
                            console.log(item.photoUri);
                        }}
                        resizeMode="cover"
                    />
                ) : (
                    <Text>No image available</Text>
                )}
            </ThemedView>
            <ThemedView style={styles.contactBlock2}>
                <TouchableOpacity style={styles.button}>
                    <Link
                        href={`/(tabs)/editContact?key=${JSON.stringify(item)}`}
                        style={styles.text}
                    >
                        Editar
                    </Link>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        deleteData(item.id, setRefresh, idActive);
                    }}
                >
                    <Text style={styles.text}>Eliminar</Text>
                </TouchableOpacity>
            </ThemedView>
        </Pressable>
    );

    return (

        contacts.length ==0 ?
            <View style={styles.containerLogin}>
                <View style={styles.containerChildLogin}>
                    <Text style={styles.textLogin}>
                        Debes loguarte
                    </Text>

                    <Link href={""} style={styles.buttonLogin}>
                        Ir a Loguarme
                    </Link>
                </View>
            </View>
        :
        <ThemedView style={styles.bigContainer}>
            <ThemedView style={styles.fatherTitleFirst}>
                <ThemedView style={styles.fatherTitle2}>
                    <TextInput
                        placeholder="Search you Contact by Name"
                        value={searchContact.search}
                        onChangeText={(text:any)=>{
                            setSearchContact({...searchContact, search:text})
                            setContacts(contacts.filter((item:any)=>{                                
                               return !item.name ? null : item.email.includes(searchContact.search);
                            }))
                        }}
                        style={{color:"black"}}
                    />
                </ThemedView>
            </ThemedView>

            <ThemedView style={styles.fatherTitle}>
                <ThemedView style={styles.fatherTitleTird}>
                    <Pressable onPress={handligRefresh} style={styles.childTitleTird}>
                        <ThemedText style={styles.refreshContacts}>
                            Actualizar Contactos
                        </ThemedText>
                    </Pressable>
                </ThemedView>
            </ThemedView>

            <ThemedView style={styles.containerContacts}>
                <FlatList
                    data={contacts}
                    keyExtractor={(item: any) => item.key}
                    renderItem={renderItem}
                    contentContainerStyle={{ flexGrow: 1 }} 
                />
            </ThemedView>

            <Pressable style={styles.iconNewContact}>
                <Link href={"/(tabs)/newContact"}>
                    <Ionicons name="person-add" size={40} color={"white"} />
                </Link>
            </Pressable>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    contact: {
        borderColor: "#48e",
        borderWidth: 1,
        flexDirection: "row",
        marginBottom: 10,
        backgroundColor:"#48e"
        //height:"40%"
    },
    bigContainer: {
        width: "100%",
        height: "100%",
        paddingTop: 24,
        paddingLeft:10,
        paddingRight:10,
        paddingBottom:20,
    },
    contactBlock: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:"#48e",
        width: "50%",
    },
    contactBlock2: {
        width: "40%",
        gap: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:"#48e",
    },
    fatherTitle: {
        height: "10%",
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    fatherTitleFirst: {
        height: "17%",
        paddingTop: 10,
        display: "flex",
        flexDirection: "row",
    },
    fatherTitle2: {
        width: "80%",
        height: "90%",
        justifyContent: "center",
        padding: 20,
    },
    fatherTitle3: {
        width: "20%",
        height: "90%",
        backgroundColor: "#48e",

    },
    fatherTitleTird: {
        width: "90%",
        height: "90%",
        justifyContent: "center",
        alignItems: "center",
    },
    childTitleTird: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        backgroundColor: "#48e",
    },
    title: {
        fontSize: 30,
        textAlign: "center",
        paddingTop: 10,
        color: "white",
    },
    icon: {
        position: "absolute",
        left: 0,
        top: 20,
        color: "white",
    },
    inputSearch: {
        backgroundColor: "#48e",
        borderColor: "black",
        borderWidth: 2,
    },
    refreshContacts: {
        fontSize: 25,
        color: "white",
    },
    button: {
        width: "80%",
        borderRadius: 20,
        borderColor: "#48e",
        backgroundColor: "white",
        borderWidth: 2,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: "#48e",
        fontSize: 17,
    },
    containerContacts: {
        width: "100%",
        height: "100%",
        paddingBottom:160
    },
    iconNewContact: {
        position: "absolute",
        right: 30,
        bottom: 30,
        backgroundColor: "#48e",
        borderRadius: 50,
        width: 60,
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
       // borderColor: "black",
    },
    firstLettter: {
        fontSize:20,
        margin:15,
        borderWidth:5,
        borderColor:"#48e",
        color:"white",
        backgroundColor:"#48e",
        borderRadius:50,
        width:"14%",
        paddingTop:8,
        textAlign:"center",
        alignItems: "center",
    },
    textContact:{
        color:"white",fontSize:15
    },
    image:{
        width:50,
        height:50,
        borderRadius:50,
    },
    containerLogin:{
        width:"100%",
        height:"100%",
        backgroundColor:"black",
        justifyContent: "center",
        alignItems: "center",
    },
    containerChildLogin:{
        width:"70%",
        height:"70%",
        backgroundColor:"orange",
        justifyContent: "center",
        alignItems: "center",
        borderRadius:20
    },
    textLogin:{
        fontSize:25
    },
    buttonLogin:{
        padding:20,
        backgroundColor:"black",
        color:"white",
        borderRadius:10
    }
});
