


export const returnCategory = async (dataCategory:any) => {
    try{                
        const dataToCategoryInStorage={
            dateStart:dataCategory.dateStart,
            dateEnd:dataCategory.dateEnd,
            name:dataCategory.name,
            destinado:dataCategory.amount,
            idCategory:dataCategory.id,
            disponible:dataCategory.amount,
            dateAccess:new Date()}

        const dataLocal=localStorage.getItem("category");

        if(!dataLocal){
            const arrayCategories=[];
            arrayCategories.push({...dataToCategoryInStorage});
            localStorage.setItem("category",JSON.stringify(arrayCategories));

            return dataCategory
        }else{           
            const dataArrayObjects=JSON.parse(dataLocal);
            const filter= dataArrayObjects.filter((item:any)=>{
                return item.idCategory== dataCategory.idCategory;
            });

            if(filter.length==0){
                dataArrayObjects.push({...dataToCategoryInStorage});
    
                localStorage.setItem("category",JSON.stringify(dataArrayObjects));
    
                return {...dataToCategoryInStorage};
            }


            return filter[0];
           
        }
    
    }catch(err:any){
        throw err;
    }
}