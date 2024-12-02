import { LoginData } from "../../utils/interfaces/interfaceLogin";



export const verifyData = async (dataLogin:LoginData) =>{
    try{
        const authResponse:Response = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/login`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(dataLogin),
            credentials:"include"
        });

        if(!authResponse.ok){
            return false;
        }

        const tokens= await authResponse.json();

        console.log(tokens);
        
        return true;
        
    }catch(err:any){
        return false;
    }
}