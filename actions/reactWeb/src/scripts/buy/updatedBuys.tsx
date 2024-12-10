import { findCategoryAndReturnGoodElements } from "../categories/findCategoryStorage";
import { lessValueToCategory } from "./restarValue";




export const updatedBuy = (dataBuy:any,setError:any) =>{
  try{
    const request:string|any=localStorage.getItem(dataBuy.idCategory.toString()); 
    const arrayBuys:any[]=JSON.parse(request);
    
    for(let i=0; i<arrayBuys.length; i++){

        const element=arrayBuys[i];
        console.log("enter");
        console.log(element.dateCreated==dataBuy.dateCreated);
        console.log(element);
        console.log(dataBuy);
        
        
        if(element.dateCreated==dataBuy.dateCreated){
            const findCatego= findCategoryAndReturnGoodElements(dataBuy.idCategory);  
            const diferenceQuantity=Number(dataBuy.value)-Number(element.value);
            console.log(diferenceQuantity);
            
            if(findCatego[0].disponible < diferenceQuantity){
                throw new Error("LA CANTIDAD DISPONIBLE DEL MONTO DE ESTA CATEGORIA NO ES SUFICIENTE");
            }
            else if(Number(element.value)<Number(dataBuy.value)){
                lessValueToCategory(findCatego[1],findCatego[0],diferenceQuantity);         
            }
            arrayBuys.splice(i,1,{...dataBuy});
            break;
        }
    }   
    localStorage.setItem(dataBuy.idCategory.toString(),JSON.stringify(arrayBuys));

  }catch(err:any){
    setError("LA CANTIDAD DISPONIBLE DEL MONTO GENERAL NO ES SUFICIENTE");
    setTimeout(()=>{
        setError("");
    },2000)
    return false;
  }
}