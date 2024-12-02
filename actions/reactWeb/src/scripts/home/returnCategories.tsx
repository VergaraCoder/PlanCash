


export const returnCategories = async () =>{
    try{
        const data:Response= await fetch(`${import.meta.env.VITE_BASE_URL}/categories/all`,{
            credentials:"include"
        });
        const dataCategories= await data.json();
        return dataCategories;
    }catch(err:any){
        throw err;
    }
}