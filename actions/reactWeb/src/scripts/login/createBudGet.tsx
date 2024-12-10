


export const createBudGet = async () => {
    const response :Response= await fetch(`${import.meta.env.VITE_BASE_URL}/budGet/one`,{
        credentials:"include"
    });

    if(!response.ok){
        throw new Error("TODAVIA NO SE PUEDE INGRESAR AL PERFIL INTENTALO MAS TARDE");
    }
    const resultResponse= await response.json();
    console.log(resultResponse);
    
    localStorage.setItem("budGetReal",JSON.stringify(resultResponse.id));
    localStorage.setItem("budGet",JSON.stringify(resultResponse.generalAmount));
    return true;
}