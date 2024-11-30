import { NavLink } from "react-router";
import style from './main.module.css';


export const Main = () =>{
    return(
        <div className={style.main}>
            <div className={style.containerTitle}>
                <h1 className={style.title}>
                    Information Main
                </h1>
            </div>

            <div className={style.containerText}>
                <p className={style.text}>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non sunt mollitia perferendis repellendus possimus dolores debitis enim voluptate error, magni exercitationem porro ut cupiditate repellat? Non fugiat ullam repudiandae dignissimos!
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non sunt mollitia perferendis repellendus possimus dolores debitis enim voluptate error, magni exercitationem porro ut cupiditate repellat? Non fugiat ullam repudiandae dignissimos!Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non sunt mollitia perferendis repellendus possimus dolores debitis enim voluptate error, magni exercitationem porro ut cupiditate repellat? Non fugiat ullam repudiandae dignissimos!Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non sunt mollitia perferendis repellendus possimus dolores debitis enim voluptate error, magni exercitationem porro ut cupiditate repellat? Non fugiat ullam repudiandae dignissimos!Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non sunt mollitia perferendis repellendus possimus dolores debitis enim voluptate error, magni exercitationem porro ut cupiditate repellat? Non fugiat ullam repudiandae dignissimos!Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non sunt mollitia perferendis repellendus possimus dolores debitis enim voluptate error, magni exercitationem porro ut cupiditate repellat? Non fugiat ullam repudiandae dignissimos!Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non sunt mollitia perferendis repellendus possimus dolores debitis enim voluptate error, magni exercitationem porro ut cupiditate repellat? Non fugiat ullam repudiandae dignissimos!Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non sunt mollitia perferendis repellendus possimus dolores debitis enim voluptate error, magni exercitationem porro ut cupiditate repellat? Non fugiat ullam repudiandae dignissimos!Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non sunt mollitia perferendis repellendus possimus dolores debitis enim voluptate error, magni exercitationem porro ut cupiditate repellat? Non fugiat ullam repudiandae dignissimos!Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non sunt mollitia perferendis repellendus possimus dolores debitis enim voluptate error, magni exercitationem porro ut cupiditate repellat? Non fugiat ullam repudiandae dignissimos!Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non sunt mollitia perferendis repellendus possimus dolores debitis enim voluptate error, magni exercitationem porro ut cupiditate repellat? Non fugiat ullam repudiandae dignissimos!Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non sunt mollitia perferendis repellendus possimus dolores debitis enim voluptate error, magni exercitationem porro ut cupiditate repellat? Non fugiat ullam repudiandae dignissimos!Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non sunt mollitia perferendis repellendus possimus dolores debitis enim voluptate error, magni exercitationem porro ut cupiditate repellat? Non fugiat ullam repudiandae dignissimos!Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non sunt mollitia perferendis repellendus possimus dolores debitis enim voluptate error, magni exercitationem porro ut cupiditate repellat? Non fugiat ullam repudiandae dignissimos!
                </p>


                <NavLink to="/pages/register" className={style.link}>
                    Volver a register
                </NavLink>

            </div>
        </div>
    );
}