


export const returnBudget = async () =>{
    try{
        const dataBudget:Response= await fetch(`${import.meta.env.VITE_BASE_URL}/budget`,{
            credentials:"include"
        }
        );
        const responseBudget= await dataBudget.json();
        console.log("the data is");
        
        console.log(responseBudget);
        console.log(responseBudget[0].id);
        
        localStorage.setItem("budGet",JSON.stringify({
            idBudget:responseBudget[0].id,
            budget:responseBudget[0].generalAmount
        }));
        
        return responseBudget[0].generalAmount;
    }catch(err:any){

    }
}