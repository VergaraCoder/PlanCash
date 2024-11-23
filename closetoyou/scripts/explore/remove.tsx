import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASEURL } from "../connection";


export const deleteData=async(id:any,refresh:any, idUser:any)=>{
    try{    
        idUser=null;
        
        refresh((prevent:any)=>prevent+1);
        const access_token:any=await AsyncStorage.getItem("access_token");
        const refresh_token:any=await AsyncStorage.getItem("refresh_token");   

        const response=await fetch(`${BASEURL}/contacts/${id}`,{
            method:"DELETE",
            headers:{
                "access_token":access_token,
                "refresh_token":refresh_token
            }
        });

        return await response.json();
    }catch(err:any){
        throw new Error("failed to save data");
    }
}