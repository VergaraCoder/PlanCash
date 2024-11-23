import { addData } from "./addOwner";


export const verifyData = async (dataRegister:any , setError:any, setSendData:any, valueSet:number) =>{
    try{
             
        if( !dataRegister ||!dataRegister.email || !dataRegister.name || !dataRegister.password ){
            throw new Error("Debes proporcionar todos los campos");
        }
        const expression=/[A-Z]/;
        if(!expression.test(dataRegister.password)){
            throw new Error("La contraseña debe contener una letra mayuscula");
        }
        setSendData(()=>{
            console.log(valueSet);
            console.log(valueSet+1);
            return valueSet+1;
        }
        );

        return await addData(dataRegister,setError);
        
    }catch(err:any){
        console.log("the error is verifyData", err.message );
        
        setError(err.message);
        setTimeout(()=>{
            setError("");
        },1500)
    }
}