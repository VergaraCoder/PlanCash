import { updateBudGet } from "./updateBudGet";
import { SendBills } from "./createBills";



export const updatedDataWithBackEnd = async () => {

    const budGet:string|any=localStorage.getItem("budGetReal");
    const idBudGet=JSON.parse(budGet);

    const budGetAmount:string|any=localStorage.getItem("budGet");

    const keyLocalStorage= Object.keys(localStorage);

    await updateBudGet(JSON.parse(budGetAmount),idBudGet);


    for(const x of keyLocalStorage){

        
        const dataKey:string | any=localStorage.getItem(x);
        // const data = JSON.parse(dataKey);

        if(x == "budGet"){
            continue;
        }
        else if(x=="category"){
            continue;
        }
        else{
            await SendBills(dataKey);
        }
    }

    localStorage.clear();
}