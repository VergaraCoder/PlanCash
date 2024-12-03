


export const returnCategory = async (idCategory:number) => {
    try{
        const petitionCategory:Response= await fetch(`${import.meta.env.VITE_BASE_URL}/categories/${idCategory}`,{
            credentials:"include"
        }
        );

        const dataCategory:any = await petitionCategory.json();
        console.log(dataCategory);
        
        return dataCategory;

    }catch(err:any){
        throw err;
    }
}