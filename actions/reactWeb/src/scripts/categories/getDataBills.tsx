


export const GetBills = async () => {
    const response:Response=await fetch(`${import.meta.env.VITE_BASE_URL}/all`,{
        credentials:"include"
    });

    const data = await response.json();
    return data;
}