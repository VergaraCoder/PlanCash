import { Outlet, useNavigate } from 'react-router';
import style from './layout.module.css';
import { ReactNode } from 'react';
import { Button } from '../button';
import { updatedDataWithBackEnd } from '../../scripts/layout/logOut';

interface Props{
    children?:ReactNode;    
}


export const Layout = ({children}:Props) =>{

    const navigate= useNavigate();

    const handleLogOut = async () =>{
        await updatedDataWithBackEnd();
        navigate("/pages/register");

    }

    return(
        <div className={style.father} >
            <header className={style.header}>
                <h1>Welcome Form</h1>
                <button onClick={handleLogOut}>
                    Log out
                </button>
            </header>
            <Outlet/>
            {children}
            <footer className={style.footer}>
                <h2>
                    Colaboradores
                    Contacto
                </h2>
            </footer>
        </div>
    );
}