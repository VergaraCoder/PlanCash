import { AnyARecord } from "dns";
import { findCategory, findCategoryAndReturnGoodElements } from "./findCategoryStorage";




export const deleteCategory = async (idCategory:number) => {
    const question = confirm("Estas seguro de eliminar esta categoria");
    if(question){
        const request:Response= await fetch(`${import.meta.env.VITE_BASE_URL}/categories/${idCategory}`,{
            method: 'DELETE',
            credentials:"include"
        });
    
        if(!request.ok){
            const dataError=await request.json();
            throw new Error(dataError.message);
        }
        
        const budGetGeneral:string|any=localStorage.getItem("budGet");
        const findCategorie= findCategoryAndReturnGoodElements(idCategory);

        console.log("THE ELEMENT IS ");
        console.log(findCategorie[1]);
        
        let operation=Number(JSON.parse(budGetGeneral))+Number(findCategorie[0].destinado);

        localStorage.setItem("budGet",JSON.stringify(operation));

        localStorage.setItem("category",JSON.stringify(findCategorie[1]));
        localStorage.removeItem(idCategory.toString());
        return true;
    }else{
        return null;
    }
}