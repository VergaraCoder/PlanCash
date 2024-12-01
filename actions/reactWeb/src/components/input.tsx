import { ChangeEvent, useState } from "react";
import {} from 'react-icons';
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface Props{
    //type?:string;
    placeholder?:string,
    value?:string,
    name?:string;
    onChange?:(e:ChangeEvent<HTMLInputElement>) => void
    style:any,
    visi:boolean
}

export const Input = ({name,value,placeholder,onChange,style,visi}:Props) => {

    const [showPassword ,setShowPassword] = useState(true);

    const togglePasswordVisibility = () => {      
        setShowPassword(!showPassword);
    };
//char js
    return(

        <div className={style}>
        <input
          type={showPassword==false || visi==false ? 'text' : 'password'} 
          name={name}
          placeholder={placeholder}
          className={style}
          value={value}
          onChange={onChange}
        />

        {visi ?
         <span
         onClick={togglePasswordVisibility}
         style={{
           position: 'absolute',
           right: '10px',
           top: '50%',
           transform: 'translateY(-42%)',
           cursor: 'pointer',
         }}
       >
         {showPassword ? <FaEyeSlash /> : <FaEye />} {}
       </span> :
       
       null}
       
      </div>

    );
}