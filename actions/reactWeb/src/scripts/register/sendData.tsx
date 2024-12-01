
export const senData=async (data:any,setError:any) => {
    try{

        console.log("the url is");
        
        console.log(import.meta.env.VITE_BASE_URL);
        
        const response : Response= await fetch(`${import.meta.env.VITE_BASE_URL}/user`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
        });
        if(!response.ok){
            throw new Error("Los datos son incorrectos");
        }
        await response.json();

        return true;

    }catch(err:any){
        setError(err.message);
        setTimeout(()=>{
            setError("");
        },2000);
    }
}