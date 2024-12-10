import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { NavLink, useLocation, useNavigate } from "react-router";
import { returnCategory } from "../../scripts/categories/returnCategorie";
import style from './view.module.css';
import { RegisterBuy } from "../../components/registerBuy";
import { dataForm } from "../../utils/interfaces/dataForm";
import { dataBill, saveBuys } from "../../scripts/categories/saveData";
import { deleteCategory } from "../../scripts/categories/deleteCategori";
import { dataState } from "../../utils/dataStates/data.state";
import { UpdatedCategory } from "../../scripts/categories/updatedLocalCategory";
import { SaveValueDisponible } from "../../scripts/categories/saveValue";



export const Category = () => {

    const location = useLocation();     //  Hook of location for extracted data and idCategory

    const navigate =  useNavigate();  // Hook of navegation 

    const [viewMoreInformation,setViewMoreInformation] = useState("none")
    
    const { 
        idCategory,
    } = location.state as {
        idCategory:number,
    };  // Id category extracted from the state of the location

    const [errorUpdated,setErrorUpdated] = useState("");

    const [category,setCategory] = useState<any>();  // initial state for data category this include (dateInitial,dateFinal name,etc..)

    const [captureStateCategory,setCaptureStateCategory]= useState<any>();  // State for capture the data of the category in the form of state

    const [available,setAvailale] = useState<any>();

    const [modal,setModal] = useState(false);   // state for modal to register buys
    
    const [localStorageBuy,setLocalStorageBuys] = useState<dataBill[] | any>(()=>{  // State for get buy of this category from localstorage or i have a empty array
        const data:string | any=localStorage.getItem(idCategory.toString());
        return JSON.parse(data) || [dataState]  // state is a object empty 
    });

    // const [amount,setAmount] = useState<number>();  //  state for amount of the category (NO GENERAL)

    const [form,setForm] = useState<dataForm | any>({   // state for form to create register buys
        purchaseName:"",
        description:"",
        value:0,
        date:""
    }) ;

    const [count,setCount] = useState<number>(localStorageBuy.length);  // State for 
    
    
    const [classContainer,setClassContainer]=useState<string>("");
    const [error,setError] = useState<string>("");
    

    
    useEffect(()=>{   //UseEffect for get the data of category through request back end 
        const dataCategory = async () =>{                        
            const response = await returnCategory(location.state);   // request for the data category
            
            // setAmount(response.destinado);  // changes the state of amount if it have 2 element that mean that the amount category already exist in local storage
            setAvailale(response.disponible)
            setCategory(response);      // set data complete for show in the screen
            setCaptureStateCategory(response);
        }
        dataCategory();     
    },[idCategory]);


    const showForm = () => {
        setClassContainer("containerModal");
        setModal(true);
    }


    const deletedCategorie = async () => {
        const response = await deleteCategory(idCategory);
        if(!response){}
        else{
            navigate("/pages/home");
        }
    }


    const updatedCategory = async (e:FormEvent<HTMLFormElement>) =>{
        try{
            e.preventDefault();
            const dataCategory=captureStateCategory;
            
            
            const response=await UpdatedCategory(idCategory,setErrorUpdated,dataCategory);
            if(response){
                const operation= Number(dataCategory.destinado) - Number(category.destinado);

                setAvailale((prev:number)=>prev+operation);
                SaveValueDisponible(dataCategory,available,operation);

                setCategory((preve:any)=>({
                    ...preve,
                    name:dataCategory.name,
                    dateStart:dataCategory.dateStart,
                    dateEnd:dataCategory.dateEnd,
                    destinado:dataCategory.destinado
                }));
                setCaptureStateCategory((preve:any)=>({
                    ...preve,
                    destinado:Number(dataCategory.destinado)
                }));

                HideFormUpdatedDataCategory();
            }
    
        }catch(err:any){
            alert("HAY UN ERROR");
        }
    }

    const handleChange=(e:ChangeEvent<HTMLInputElement>) => {        
        setCaptureStateCategory({
            ...captureStateCategory,
            [e.target.name]:e.target.value
        });
    }

    const handleSendData = async (e:FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        try{
            const submit= e.nativeEvent.submitter as HTMLButtonElement;

            if(submit.name=="enviar"){
                const dataCount:number=saveBuys(idCategory,{
                    purchaseName:form.purchaseName,
                    description:form.description,
                    value:form.value,
                    date:form.date
                },setAvailale,setLocalStorageBuys);
                  
                setCount(dataCount);
            }
            setClassContainer("containerModalCancel");
            setForm({
                purchaseName:"",
                description:"",
                value:0,
                date:""
            });
            
            
    }catch(err:any){
                 
        }
    }
    const viewDetailsBuys = (data:any) => {        
        const dataToSend={
            purchaseName:data.purchaseName,
            description:data.description,
            value:data.value,
            date:data.date,
            dateCreated:data.dateCreated
        }
        navigate("/pages/buy",{state:{...dataToSend,idCategory:idCategory}});
    }

    const dataRenderBuys = (data:any) => {               
        if(data.length== 1 && data[0].purchaseName==""){            
            return <p>No hay compras registradas</p>;
        }
        else{
            let count =0;
            return data.map((item:any)=>{
                count++;
                return(
                    <button style={{width:"40%", height:"10vh"}}>
                        <p>{item.purchaseName}</p>
                        <button
                            className={style.buttonViewMore}
                            onClick={()=>viewDetailsBuys(item)}
                            >
                                Actualizar registro
                        </button>
                    </button>
                );
            });
        }
    }

    const HideFormUpdatedDataCategory = () => {
        if(viewMoreInformation=="none"){
            setViewMoreInformation("block");
        }
        else{
            //setCaptureStateCategory(category);
            setViewMoreInformation("none");
        }
    }

    const dataRender = (data:any) => {
        if(!data){
            return <div>Loading...</div>;
        }
        else{
            return (
                <div style={{width:"100%", height:"100%"}}>
                    
                    <NavLink className={style.return} onClick={()=>{
                            localStorage.removeItem("new");
                        }} to="/pages/home"> Regresar </NavLink>

                    <div className={style.containerTitles}>
                        <h2>
                          {data.name.toUpperCase()}</h2>
                        <div style={{display:"flex", fontSize:"12px", gap:"20px"}}>
                         <p>
                             Destinado inicialmente :  ${category.destinado} </p> 

                            <p>Disponible Actualmente : ${available}</p>
                        </div>
                  
                        <button className={style.buttonViewAllItems} onClick={HideFormUpdatedDataCategory}>
                            Ver todo sobre esta categoria
                        </button>

                        <div style={{display:viewMoreInformation}}>
                           <form  className={style.formToUpdatedData} onSubmit={updatedCategory}>

                            <span 
                                style={{position:"absolute",top:"-2%",right:"-1%",backgroundColor:"red",padding:"10px",borderRadius:"3px",color:"white"}}
                                onClick={HideFormUpdatedDataCategory}
                            >
                                X
                            </span>

                                <input
                                        type="text"
                                        name="name"
                                        value={captureStateCategory.name}
                                        placeholder="Nombre de categoria"
                                        onChange={handleChange}
                                    />

                                    <input
                                        type="number"
                                        name="destinado"
                                        value={captureStateCategory.destinado}
                                        placeholder="Monto destinado"
                                        onChange={handleChange}
                                    />

                                    <input
                                        type="date"
                                        name="dateStart"
                                        value={captureStateCategory.dateStart}
                                        onChange={handleChange}
                                        placeholder="Fecha Inicial"
                                    />

                                    <input
                                        type="date"
                                        name="dateEnd"
                                        value={captureStateCategory.dateEnd}
                                        placeholder="Fecha Final"
                                        onChange={handleChange}
                                    />
                                    <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                                        {
                                            errorUpdated ? 
                                             <p style={{color:"red",fontSize:"15px",textAlign:"center"}}>{errorUpdated}</p>:
                                             null
                                        }
                                    </div>

                                    <input
                                        type="submit"
                                        className={style.buttonToKeepData}
                                        value={"Actualizar"}
                                    />

                           </form>
                        </div>
                    </div>

                    <div className={style.containerExpenseRecords}>
                        <button 
                            onClick={
                               async ()=>{
                                    await deletedCategorie()
                                }
                            }
                            className={style.delete}
                        >   Eliminar categoria
                        </button>
                        <button
                            className={style.add}
                           onClick={showForm} >Registrar gasto
                        </button>
                    </div>
                </div>
            );
        }
    }

    return(
        <div className={style.containerGeneral}>
            <div className={style.containerGeneral2}>
            {
                captureStateCategory ? 
                (dataRender(captureStateCategory))
                :null
            }

            { 
            modal ? 
                (<RegisterBuy 
                    form={form} 
                    setForm={setForm} 
                    styleContainerGeneral={style[classContainer]}
                    styleForm={style.formModal}
                    sendForm={handleSendData}
                    error={error}
                    setError={setError}
                />):
                null
            }
            </div>

            <div className={style.containerRenderBuys}>
                {
                    localStorageBuy.length == count  ?
                        dataRenderBuys(localStorageBuy)
                    :
                    <p>{localStorageBuy.length} and  {count}</p>
                }
            </div>
        </div>
    );
}



