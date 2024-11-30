import { ChangeEvent, FormEvent, useState } from 'react';
import { Input } from '../components/input';
import style from './form.module.css';
import { Button } from '../components/button';
import { Navigate, NavLink, redirect } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { RegisterUser } from '../script/register';

interface Data{
    email:string,
    name:string,
    password:string
}


interface DataRedux{
    returnEmail:string,
    returnName:string,
    returnAllData:string
}

export const Form = () =>{

    const [form,setForm]= useState<Data>({
        email:"",
        name:"",
        password:""
    });

    const [error,setError] = useState("");


    const handleChange=(e:ChangeEvent<HTMLInputElement>) => {      
        setForm({
            ...form,
            [e.target.name]:e.target.value
        });
    }

      const dispatch=useDispatch<any>();
      const count= useSelector((state:any)=>state.user);



      const handleSUbmit =async (e: React.FormEvent) => {
        e.preventDefault();
          dispatch({type:"RETURN_ALL_DATA",payload:{
            name:form.name,
            email:form.email,
            password:form.password
          }});
        await RegisterUser(form,setError);
        return <Navigate to="/pages/home" />;
      }
      

    return(
        <>
            <div className={style.container}>
                <div className={style.container2}>
                <form onSubmit={handleSUbmit} className={style.form} >

                        <Input
                            visi={false}
                            value={form.name}
                            name="name"
                            placeholder='Name'
                            onChange={handleChange}
                            style={style.input}
                        />

                        <Input
                            visi={false}
                            value={form.email}
                            name="email"
                            placeholder='Email'
                            onChange={handleChange}
                            style={style.input}
                        />
                        
                        
                        <Input
                            visi={true}
                            value={form.password}
                            name="password"
                            placeholder='Password'
                            onChange={handleChange}
                            style={style.input}
                        />

                        {error ? <p className={style.error}>{error}</p> : null}

                        <Button style={style.button}/>

                        <NavLink className={style.register} to="/pages/login">
                            ¿ Ya tienes cuenta ? <br/> Iniciar sesión
                        </NavLink>
                </form> 
                </div>
            </div>
        </>
    );
}