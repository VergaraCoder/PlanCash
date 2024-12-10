import { FormEvent, useEffect, useState } from "react";
import { returnBudget } from "../../scripts/home/returnBudget";
import { returnCategories } from "../../scripts/home/returnCategories";
import style from './home.module.css';
import { Modal } from "../../components/modal";
import { createCategories } from "../../utils/interfaces/createCategorie";
import { NavigateFunction, useNavigate } from "react-router";
import { updateBudGet } from "../../scripts/layout/updateBudGet";

interface DataHome{
    budget:number;
    categories:string[];
}

export const Home = () =>{

    const [data,setData] = useState<DataHome>({
        budget:0,
        categories:[]
    });
    
    const [addBudget,setAddBudget] = useState<any>({
        budGet:0
    });

    const [mount,setMount] = useState<number>(addBudget.budGet);

    const [loading,setLoading] = useState<boolean>(false);

    const [modal,setModal]= useState<boolean>(false);

    const [classBigContainer,setClassBigContainer]= useState("containerGeneral2");

    const [classModal,setClassModal] = useState("");

    const [addAmount,setAddAmount] = useState<string>("inputAddAmount");

    const [categoriData,setCategoriData] = useState<createCategories>({
        name:"",
        dateStart:"",
        dateEnd:"",
        amount:0
    });

    const [error,setError] = useState("");

    const navegation:NavigateFunction=useNavigate();




    useEffect(()=>{
        const returnData= async () =>{
            const dataLocal= localStorage.getItem("budGet");
            const categories= await returnCategories();

            if(!dataLocal){
                navegation("/pages/register");
            }
            else{                
                setData((prev)=>({
                    ...prev,
                    budget:JSON.parse(dataLocal),
                    categories: categories ? categories : []
                }));
                setMount(JSON.parse(dataLocal));
                
            }
        }   
        returnData();
        setLoading(true);
        
    },[]);



    const changeBackgorund = async () =>{
        try{
            if(data.budget==0){
                alert("NO TIENES FONDOS DEBES INGRESAR UN MONTO GENERAL PARA CREAR CATEGORIAS");
            }
            else{     
                await updateBudGet(data.budget);
    
                setModal(true);
                setClassBigContainer("containerGeneral3");
                setClassModal("containerModal");
            }
        }catch(err:any){
            console.log(err);
            
        }
    }


    const transformDate = (date:any) => {
        const dateTransfor=new Date(date);
        const day= dateTransfor.getDate() < 10 ? `0${dateTransfor.getDate()}` : dateTransfor.getDate();
        const mounth= (dateTransfor.getMonth()+1) < 10 ? `0${dateTransfor.getMonth()+1}` : dateTransfor.getMonth()+1;
        return `${dateTransfor.getFullYear()}-${mounth}-${day}`;
    }

    const showAllCategories = (data:any[]) =>{
        if(data.length==0){
            return null;
        }
        else{            
            return data.map((item)=>{
                const dateStart= transformDate(item.dateStart)
                const dateEnd=transformDate(item.dateEnd);
                console.log("the mount is");
                console.log(dateStart);
                console.log(dateEnd);
                
                
               return( 
                    <button className={style.categorie} onClick={()=>viewCategory({idCategory:item.id, ...item,dateStart:dateStart,dateEnd:dateEnd})} >
                        {item.name}
                        <button className={style.showButtonEstadistic}>Ver Estadistica</button>
                    </button>
                )
            });
        }
    }

    const viewCategory = (data:any) =>{   
        console.log("TO SHOW CATEGORY");
        
        console.log(data);
        navegation("/pages/category",{state:{...data}});
    }
    
    const cancelCreationCategorie = () =>{
        setClassBigContainer("containerGeneral2");
        setClassModal("containerModalCancel");
    }

    const addAmountFunction = () => {
        setAddAmount("inputAddAmountVisible");
    }

    const cancelAddFunction = () => {
        setAddAmount("inputAddAmount");
    }

    const viewChange = () =>{
        console.log("ENTER p");
        
        const currentBudGet= addBudget.budGet+data.budget;
        setData((preveState:any)=>({
            ...preveState,
            budget:currentBudGet,
        })); 
        setMount(currentBudGet);
        setAddAmount("inputAddAmount");    
        localStorage.setItem("budGet",currentBudGet);
    }

    return(
        <div className={style.containerGeneral}>
            <div className={style[classBigContainer]}></div>

            <div className={style.containerBudget}>
                <h2 className={style.titleBudget}>
                    Monto general: <br/>
                     <h3 className={style.amountGeneral}>
                        {
                            data.budget == mount ? 

                                data.budget 

                            :   0
                        }
                     </h3>
                     
                    <div  className={style.addAmount}>

                                <button onClick={addAmountFunction}>+</button>

                                <input 
                                    type="number" 
                                    placeholder="Añadir cantidad" 
                                    onChange={(e)=>setAddBudget({...addBudget,budGet: Number(e.target.value)})}
                                    className={style[addAmount]}
                                />

                                <input 
                                    type="submit" 
                                    value={"añadir"} 
                                    name="budGet"
                                    onClick={viewChange}
                                    className={style[addAmount]}
                                />

                                <input 
                                    type="submit" 
                                    value={"cancelar"} 
                                    name="cancel"
                                    onClick={cancelAddFunction}
                                    className={style[addAmount]}
                                />
                    </div>
                </h2>


            
            </div>

            <div>
                <button onClick={changeBackgorund} className={style.createCategorieButton}>
                    Crear categoria
                </button>
                {
                    modal ? (
                        <Modal 
                        form={categoriData} 
                        setForm={setCategoriData} 
                        styleInput={style.input} 
                        styleContainer={style[classModal]} 
                        styleContainerButton={style.containerActionsButtons} 
                        styleForm={style.modalForm} 
                        styleInputDate={style.inputDate} 
                        styleButton={style.buttonActions}  
                        setError={setError}
                        error={error}
                        cancelCreation={cancelCreationCategorie}
                        restarValues={setCategoriData}
                        subtractGeneralAmount={[data,setData]}
                        />
                    )
                        :null
                }
            </div>

            <div className={style.containerCategories}>
            {loading==true && data.categories.length === 0 ? 
                <p>No hay categorías creadas</p>
                : 
                showAllCategories(data.categories)
            }
            </div>

        </div>
    );
}

