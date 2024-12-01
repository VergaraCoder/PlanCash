import { ChangeEvent, FormEvent, useState } from 'react';
import { Input } from '../components/input';
import style from './form.module.css';
import { Button } from '../components/button';
import { Navigate, NavLink } from 'react-router';
import { senData } from '../scripts/register/sendData';

interface Data{
    email:string,
    name:string,
    password:string
}

export const Form = () =>{

    const [form,setForm]= useState<Data>({
        email:"",
        name:"",
        password:""
    });

    const [error,setError] = useState("");


    const handleChange=(e:ChangeEvent<HTMLInputElement>) => {
        console.log(form);
        
        setForm({
            ...form,
            [e.target.name]:e.target.value
        });
    }

    const handleSendData = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 
        console.log(form);
        
        await senData({
            name:form.name,
            email:form.email,
            password:form.password
        },setError);
        return <Navigate to={"/home"} />
      };



      

    return(
        <>
            <div className={style.container}>
                <div className={style.container2}>
                <form onSubmit={handleSendData} className={style.form} >

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

                    {
                        error ?
                            <p>
                                {error}
                            </p>
                        :
                        null
                    }

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