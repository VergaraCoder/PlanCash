import { FormEvent, useEffect, useState } from "react";
import { returnBudget } from "../../scripts/home/returnBudget";
import { returnCategories } from "../../scripts/home/returnCategories";
import style from './home.module.css';
import { Modal } from "../../components/modal";
import { createCategories } from "../../utils/interfaces/createCategorie";
import { createCategorie } from "../../scripts/home/categories/createCategorie";
import { Navigate, NavigateFunction, Navigation, useNavigate, useNavigation } from "react-router";

interface DataHome{
    budget:number;
    categories:string[];
}



export const Home = () =>{

    const [data,setData] = useState<DataHome>({
        budget:0,
        categories:[]
    });

    const [loading,setLoading] = useState<boolean>(false);

    const [modal,setModal]= useState<boolean>(false);

    const [classBigContainer,setClassBigContainer]= useState("containerGeneral2");

    const [classModal,setClassModal] = useState("");

    const dateToday= new Date();

    const [categoriData,setCategoriData] = useState<createCategories>({
        name:"",
        dateStart:dateToday,
        dateEnd:dateToday,
        amount:0
    });

    const [error,setError] = useState("");

    const navegation:NavigateFunction=useNavigate();




    useEffect(()=>{
        const returnData= async () =>{
            const budget=await returnBudget();
            const categories= await returnCategories();
            setData({budget:budget,categories:categories});
        }

        console.log("the data is ");
        
        console.log(data);
        returnData();
        setLoading(true);
    },[]);


    useEffect(()=>{

    },[]);

    const changeBackgorund = () =>{
        setModal(true);
        setClassBigContainer("containerGeneral3");
        setClassModal("containerModal");
    }

    const showAllCategories = (data:any[]) =>{
        if(data.length==0){
            return null;
        }
        else{
            console.log("enter data");
            
            return data.map((item)=>{
               return( 
                    <button className={style.categorie} onClick={()=>viewCategory(item.id)} >
                        {item.name}
                    </button>
                )
            });
        }
    }

    const viewCategory = (idCategory:number) =>{
        navegation("/pages/category",{state:{idCategory:idCategory}});
    }
    
    const cancelCreationCategorie = () =>{
        setClassBigContainer("containerGeneral2");
        setClassModal("containerModalCancel");
    }

    return(
        <div className={style.containerGeneral}>
            <div className={style[classBigContainer]}></div>

            <div className={style.containerBudget}>
                <h2 className={style.titleBudget}>
                    Monto general: <br/>
                     <h3 className={style.amountGeneral}>{data.budget ? data.budget : 0}
                     </h3>
                     
                    <div  className={style.addAmount}>
                                <button >+</button>
                    </div>
                </h2>


            
            </div>

            <div>
                <button onClick={changeBackgorund}>
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

