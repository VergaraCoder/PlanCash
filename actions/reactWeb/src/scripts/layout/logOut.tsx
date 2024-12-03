import { SendCategorie } from "./updateCategorie";



export const updatedDataWithBackEnd = async () => {

    const keyLocalStorage= Object.keys(localStorage);

    for(const x of keyLocalStorage){

        const dataKey:string | any=localStorage.getItem(x);
        const data = JSON.parse(dataKey);

        for(const value of data){

            await SendCategorie({...value,categoryId:x});

        }
    }
}