import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import style from "./viewBuy.module.css";
import { deleteBuy } from "../../scripts/buy/deleteBuys";
import { updatedBuy } from "../../scripts/buy/updatedBuys";



export const ViewBuy = () => {

    const location= useLocation();
    const navigate = useNavigate();
    const [dataBuy,setDataBut] = useState<any>({
        dateCreated:new Date(),
        description:"",
        value:0,
        idCategory:0,
        purchaseName:"",
        date:""
    });

    const [error,setError] =useState("");

    useEffect(()=>{
       const setData = async () =>{               
        setDataBut({...location.state});
       }
       setData();               
    },[location.state]);


    const handleChange=(e:ChangeEvent<HTMLInputElement>) => {    
        console.log(dataBuy);
            
        setDataBut({
            ...dataBuy,
            [e.target.name]:e.target.value
        });
    }

    const deleteBuys = () => {
        deleteBuy(dataBuy.idCategory,dataBuy);
        navigate("/pages/category",{state:{idCategory:dataBuy.idCategory}});
    }

    const handleSendData = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 
        try{
            const submit= e.nativeEvent.submitter as HTMLButtonElement;
            if(submit.name=="eliminar"){
                deleteBuys();
                return ;
            }
            else{                
                const response=updatedBuy(dataBuy, setError);
                response == false ? 
                    null
                :
                navigate("/pages/category",{state:{idCategory:dataBuy.idCategory}});
            }
        }catch(err:any){
            alert(err);
        }
    }
        


    return (
        <div className={style.containerGeneral}>
            <form action="" className={style.form} onSubmit={handleSendData}>

                <h1>Actualizar Compra
                </h1>

                <label>Gasto: <br/>
                <input className={style.casilla}
                    type="text"
                    placeholder="Nombre del gasto"
                    name="purchaseName"
                    value={dataBuy.purchaseName}
                    onChange={handleChange}
                />
                </label>


                <label>Valor del gasto: <br/>
                <input
                    className={style.casilla}
                    type="number"
                    placeholder="valor del gasto"
                    name="value"
                    value={dataBuy.value}
                    onChange={handleChange}
                />
                </label>

                <label>Fecha del gasto: <br/>
                <input
                    className={style.casilla}
                    type="date"
                    name="date"
                    value={dataBuy.date}
                    onChange={handleChange}
                />
                </label>

                <label>Descripcion del gasto: <br/>
                <input
                    className={style.casilla}
                    type="text"
                    placeholder="Descripcion"
                    name="description"
                    value={dataBuy.description}
                    onChange={handleChange}
                />
                </label>
                <div style={{height:"2vh"}}>
                    {
                        error ? 
                            <p>{error}</p>
                            :
                            null
                    }
                </div>

                <div style={{display:"flex" , gap:"20px"}}>
                    <button name="enviar" className={style.keep}>
                            <p>Guardar</p>
                    </button>
                    <button name="eliminar"  className={style.delete}  >
                            <p>Eliminar</p>
                    </button>
                </div>
            </form>
        </div>
    );
}