


export const deleteBuy = (idCategory:number,dateCreated:any) => {
    
    const deleteBuy:string | any = localStorage.getItem(idCategory.toString()); // we obtanin all buys of one category
    const dataBuys:any[] = JSON.parse(deleteBuy); // we parser the data to array
    let categoryLike:any={};
    let buyLike:any={};
    const newBuys= dataBuys.filter((item:any)=>{    // we filter the buys that not matches with date of creation
        if(item.dateCreated==dateCreated.dateCreated){buyLike=item} // We obtain the last register of the buy to delete
        return item.dateCreated !== dateCreated.dateCreated  
    });
    const amountCategory:string|any=localStorage.getItem("category"); // we obtanin all categorys
    const parseValue=JSON.parse(amountCategory); // we parser all categorys to array


    const category= parseValue.filter((item:any)=>{
        if(item.idCategory == idCategory)
            {categoryLike=item}
        return item.idCategory!==idCategory;
    });
    
    let number= typeof buyLike.value == "string" ? Number(buyLike.value ): buyLike.value; 

    categoryLike.disponible += number;

    category.push(categoryLike);
    localStorage.setItem("category",JSON.stringify(category));

    localStorage.setItem(idCategory.toString(),JSON.stringify(newBuys));
}