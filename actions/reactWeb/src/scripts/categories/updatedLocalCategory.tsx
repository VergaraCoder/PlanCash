import { SubstractBudGet } from "./subsTractionBudGet";
import { SumBudGet } from "./sumBudGet";
import { UpdatedBackEndCategories } from "./updatedBackCategories";

export const UpdatedCategory = async (idCategory:number,setError:any,categoryData:any) =>{
    try{
        const allCategorys:string|any=localStorage.getItem("category");
        const parserAllCategorys= JSON.parse(allCategorys);

        
        let categoryToFind:any;
        const filterCategorys = parserAllCategorys.filter((item:any)=>{
            if(item.idCategory==idCategory){categoryToFind=item}
            return item.idCategory !== idCategory;
        });
        
        const numberMoreTall= categoryData.destinado > categoryToFind.destinado ? categoryData.destinado : categoryToFind.destinado;  // find number more tall beetween the old data and the new data for when i am going to operation of substraction the operation result is not negtive

        const numberMorelittle= categoryData.destinado < categoryToFind.destinado ? categoryData.destinado : categoryToFind.destinado;  // find number more tall beetween the old data and the new data for when i am going to operation of substraction the operation result is not negtive}

        const operationToReview=Number(numberMoreTall)-Number(numberMorelittle);

        const responseBoolean=await reviewDataForm(categoryData,categoryToFind,operationToReview,setError);

        if(!responseBoolean){

        }else{
            const newCategory={...categoryToFind,...categoryData};
            filterCategorys.push(newCategory);
            console.log("THE ALL CATEGORIES IS ");
            console.log(filterCategorys);
            
            localStorage.setItem("category",JSON.stringify(filterCategorys));
            return true;
        }
    }catch(err:any){        
        setError(err.message);
        setTimeout(()=>{
            setError("");
        },4700);
    }
} 




const reviewDataForm =async (newcategoryData:any,oldCategoryData:any,destinadoAditional:number,setError:any) =>{
    try{
        const values= Object.values(newcategoryData);
    
    const boolean= values.every((item)=>{
        return item !== "";
    });
       
    const valueGeneral:string|any= localStorage.getItem("budGet");
    const valueGeneralAmount= JSON.parse(valueGeneral);

    if(!boolean){    
        throw new Error("NO PUEDE HABER NINGUN CAMPO VACIO");
    }
        
    if(destinadoAditional > valueGeneralAmount){
        throw new Error("EL VALOR GENERAL ES INSUFICIENTE PARA TRAER MAS PRESUPUESTO A ESTA CATEGORIA");
    }
    const responseBoolean=await UpdatedBackEndCategories(newcategoryData,setError);
    console.log("CONTINUAMOS EL FUJO s");
    

    if(!responseBoolean){
        throw new Error("FALLO LA ACTUALIZACION DE LOS DATOS");
    }else{

        if(newcategoryData.destinado <= oldCategoryData.destinado){
            console.log(oldCategoryData.destinado);
            console.log(newcategoryData.destinado);
            
            const opeation= oldCategoryData.destinado - newcategoryData.destinado;
            SumBudGet(valueGeneralAmount,opeation);
            return true;
        }
        else{
            SubstractBudGet(valueGeneralAmount,destinadoAditional);
            return true;
        }
    }

    
    }catch(err:any){       
        setError(err.message);
        setTimeout(()=>{
            setError("");
        },4700);
        return false;
    }
}


