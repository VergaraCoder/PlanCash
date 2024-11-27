import { Outlet } from 'react-router';
import style from './layout.module.css';
import { ReactNode } from 'react';

interface Props{
    children?:ReactNode;    
}


export const Layout = ({children}:Props) =>{

    return(
        <div className={style.father} >
            <header className={style.header}>
                <h1>Welcome Form</h1>
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