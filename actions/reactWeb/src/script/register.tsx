import {Navigate} from 'react-router-dom';

interface DataUser{
    name:string;
    email:string;
    password:string;
}

export const RegisterUser = async (dataUser:DataUser, setError:any) =>{
    try{

        console.log(import.meta.env.VITE_URL_BASE_BACKEND);
        
        const dataRequest = await fetch(`${import.meta.env.VITE_URL_BASE_BACKEND}/user`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(dataUser)
        });
        const data = await dataRequest.json();
        if(!dataRequest.ok){
            throw new Error(`Error en el registro: ${data.message}`);
        }
        
        return <Navigate to={"/pages/home"}/>;
    
    }catch(err:any){
        setError(err.message);
        setTimeout(()=>{
            setError("");
        },2000);
        throw err;
    }
}