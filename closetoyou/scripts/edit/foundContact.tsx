import AsyncStorage from "@react-native-async-storage/async-storage"


export const foundContact = async (idContact:any)=>{
    try{      

        console.log("the contact is ");
        console.log(idContact);
        
        let id=JSON.parse(idContact);      
        let key= id.key ? id.key : id.id;
        const contact=await AsyncStorage.getItem(key);
        if(!contact){
            throw new Error("This contact not exist");
        }
        console.log(contact);
        
        
        const data=JSON.parse(contact);
        return {...data,id:id.key};
    }catch(err:any){
        console.log("err in found contact ", err);
    }
}