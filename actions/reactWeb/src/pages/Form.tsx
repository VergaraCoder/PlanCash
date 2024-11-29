import { ChangeEvent, FormEvent, useState } from 'react';
import { Input } from '../components/input';
import style from './form.module.css';
import { Button } from '../components/button';
import { NavLink } from 'react-router';

interface Data{
    email:string,
    name:string,
    age:string,
    password:string
}

export const Form = () =>{

    const [form,setForm]= useState<Data>({
        email:"",
        name:"",
        age:"",
        password:""
    });


    const handleChange=(e:ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]:e.target.value
        });
    }

    const handleSendData = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 
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
                            name="Email"
                            placeholder='email'
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