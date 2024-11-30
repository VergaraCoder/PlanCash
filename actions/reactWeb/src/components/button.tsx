

interface Props{
    onClick?:() => void,
    style:any
}

export const Button = ({onClick,style}:Props) => {
    return(
        <button className={style} onClick={onClick} >
            Enviar
        </button>
    );
}