import { createCategories } from "../../../utils/interfaces/createCategorie";




export const createCategorie = async (data:createCategories) =>{
    try{    
        const idBudget=localStorage.getItem("budGet") as string;
        const parseData= JSON.parse(idBudget);
        console.log("THE DATA FOR SEND IS");
        console.log({...data, idBudget:parseData.idBudget});
        
        const dataCreateCategori: Response = await fetch(`${import.meta.env.VITE_BASE_URL}/categories`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({...data, idBudget:parseData.idBudget}),
            credentials:"include"
        });

        const responseData= await dataCreateCategori.json();
        if(responseData.statusCode){
            throw new Error(responseData.message)
        }
        console.log(responseData);
        
        return true;

    }catch(err:any){
        throw err;
    }
}