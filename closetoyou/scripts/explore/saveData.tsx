import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASEURL } from "../connection";


export const saveData=async(data:any)=>{
    try{
        const access_token:any=await AsyncStorage.getItem("access_token");
        const refresh_token:any=await AsyncStorage.getItem("refresh_token");
        console.log("enter");
        
        console.log("data is");
        console.log(data);
        
        

        const response= await fetch(`${BASEURL}/contacts`,{
            method:"POST",
            headers:{
                "access_token":access_token,
                "refresh_token":refresh_token
            },
            body:JSON.stringify(data)
        });

        const datas=await response.json();
        console.log(datas);
        

        return datas;
        
    }catch(err:any){
        throw new Error("failed to save data");
    }
}