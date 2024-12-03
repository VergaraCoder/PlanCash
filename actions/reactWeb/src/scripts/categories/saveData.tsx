import { stringify } from "querystring";
import { dataForm } from "../../utils/interfaces/dataForm";


export const saveBuys = (category:number,data:dataForm,setAmount:Function) => {
    
    const verifyId:string | any=localStorage.getItem(category.toString());
    const transform=JSON.parse(verifyId);
    
    if(transform == null){
        let arrayData:any[]=[];
        arrayData.push(data);
        localStorage.setItem(category.toString(),JSON.stringify(arrayData));
    }
    else{        
        transform.push(data);
        localStorage.setItem(category.toString(),JSON.stringify(transform));
    }
    

    setAmount((currentAmount:number)=> currentAmount-data.value);
}