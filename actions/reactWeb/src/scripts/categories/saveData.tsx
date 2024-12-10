import { stringify } from "querystring";
import { dataForm } from "../../utils/interfaces/dataForm";



export interface dataBill{
    purchaseName:string;
    description:string;
    value:number;
    date:string;
    dateCreated:string
}


export const saveBuys = (category:number,data:dataForm,setAvailable:Function, setLocalStorageBuys:any) => {
    
    const verifyId:string | any=localStorage.getItem(category.toString());
    const transform:dataBill[] | any=JSON.parse(verifyId);
    const dataComplete= {...data,categoryId:category};

    if(transform == null){
        let arrayData:any[]=[];
        arrayData.push(dataComplete);                
        setLocalStorageBuys(arrayData);
        localStorage.setItem(category.toString(),JSON.stringify(arrayData));
    }
    else{        
        transform.push(dataComplete);
        setLocalStorageBuys(transform);
        localStorage.setItem(category.toString(),JSON.stringify(transform));
    }

    setAvailable((currentAmount:number)=> currentAmount-data.value);

    const AmountCategory:string|any=localStorage.getItem("category");
    const arrayParser= JSON.parse(AmountCategory);

    const extractCategorie= arrayParser.filter((item:any)=>{
        return item.idCategory == category;
    });

    extractCategorie[0].disponible -= data.value;
    
    localStorage.setItem("category",JSON.stringify(arrayParser));

    return transform.length;
}