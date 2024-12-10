


export const returnCategories = async () =>{
    try{
            const data:Response= await fetch(`${import.meta.env.VITE_BASE_URL}/categories/all`,{
                credentials:"include"
            });
            const dataCategories= await data.json();
            // console.log("the categoires are ");
            // console.log(dataCategories);
            return dataCategories;
        
    }catch(err:any){
        throw err;
    }
}