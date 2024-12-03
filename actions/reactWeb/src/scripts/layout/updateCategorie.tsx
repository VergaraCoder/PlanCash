import { dataForm } from "../../utils/interfaces/dataForm";


export const SendCategorie = async (data:any) => {
    console.log("the data id");
    console.log(data);
    
    const responseRequest:Response = await fetch(`${import.meta.env.VITE_BASE_URL}/bills`,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body:JSON.stringify(data),
        credentials:"include"
    });

    const dataResponse = await responseRequest.json();
    return dataResponse
}