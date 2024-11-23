import AsyncStorage from "@react-native-async-storage/async-storage"


export const updateContact = async (dataContact:any)=>{
    try{           
        const id=dataContact.id;  
        delete dataContact.id;
        await AsyncStorage.setItem(id,JSON.stringify(dataContact));
        alert("Perfect updated");
        return "melo";
    }catch(err:any){
        console.log("err in editCOntact", err);
    }
}