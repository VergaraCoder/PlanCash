



export const updateBudGet = async (amount:number,idBudGet:number) => {
        const response : Response = await fetch(`${import.meta.env.VITE_BASE_URL}/budGet/${idBudGet}`,{
            method:"PATCH",
            headers:{
                "Content-Type": "application/json",
            },
            body:JSON.stringify({ generalAmount:amount}),
            credentials:"include"
        });
        if(!response.ok){
            throw new Error("sucedio un error");
        }
        // await response.json();
}