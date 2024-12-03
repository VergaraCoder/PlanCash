import { FormEvent, useEffect, useState } from "react"
import { useLocation, useParams } from "react-router";
import { returnCategory } from "../../scripts/categories/returnCategorie";
import style from './view.module.css';
import { RegisterBuy } from "../../components/registerBuy";
import { dataForm } from "../../utils/interfaces/dataForm";
import { saveBuys } from "../../scripts/categories/saveData";



export const Category = () => {
    const [category,setCategory] = useState();

    const [modal,setModal] = useState(false);

    const [amount,setAmount] = useState<number>();
    const [form,setForm] = useState<dataForm | any>({
        purchaseName:"",
        description:"",
        value:0,
        date:""
    }) ;


    const [classContainer,setClassContainer]=useState<string>("");
    const [error,setError] = useState<string>("");


    const location = useLocation();

    const { idCategory} = location.state as {idCategory:number};

    useEffect(()=>{
        console.log(idCategory);
        const dataCategory = async () =>{
            
            const response = await returnCategory(idCategory);
            console.log("ENTRAMOS PARA VER UNA SOLA CATEGORIA");
            
            console.log(response);
            setAmount(response.amount);
            setCategory(response);
        }
        dataCategory();
    },[idCategory]);


    const showForm = () => {
        setClassContainer("containerModal");
        setModal(true);
    }


    const handleSendData = async (e:FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        try{
            const submit= e.nativeEvent.submitter as HTMLButtonElement;
            
            console.log("enter Send Data");

            if(submit.name=="enviar"){
                saveBuys(idCategory,{
                    purchaseName:form.purchaseName,
                    description:form.description,
                    value:form.value,
                    date:form.date
                },setAmount);  
            }

            console.log("NO ES PARA ENVIAR");
            setClassContainer("containerModalCancel");

            
    }catch(err:any){
            
        }
    }


    const dataRender = (data:any) => {
        if(!data){
            return <div>Loading...</div>;
        }
        else{
            return (
                <div style={{width:"100%", height:"100%"}}>
                    <div className={style.containerTitles}>
                        <h3>Nombre de categoria :  {data.name}</h3>
                        <h3>Presupuesto destinado para esta categoria : {amount}</h3>
                    </div>

                    <div className={style.containerExpenseRecords}>
                        <button>Eliminar categoria</button>
                        <button
                           onClick={showForm} >Registrar gasto
                        </button>
                    </div>
                </div>
            );
        }
    }

    return(
        <div className={style.containerGeneral}>
            {
                category ? 
                (dataRender(category))
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
    );
}