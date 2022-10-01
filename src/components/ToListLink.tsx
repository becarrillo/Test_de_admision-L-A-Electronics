import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { GoTriangleUp } from "react-icons/go";
import { GoTriangleDown } from "react-icons/go";
import React from "react";

    
export function ToListLink() {

    const [toggleListCondHandler, setToggleListHandler] =  useState(false);
    const [advice, setAdvice] = useState("Listar tareas");
    const navigate = useNavigate();

    useEffect(() => {
        if (toggleListCondHandler === true) {
            navigate("/tasks-list")
            setAdvice("Minimizar tareas");
        } else {
            navigate("/")
            setAdvice("Listar tareas");
        }
        document.querySelector(".tog-link")!.innerHTML = advice;
        console.log("Estado de componente: ", toggleListCondHandler);
    }, [toggleListCondHandler, navigate, advice]);

    function handToggleShowList(cond: boolean) {
        setToggleListHandler(cond);
        
        console.log("cond", cond);
    }

    return (
        <div className="ml-auto mr-6 mt-28 w-36  w-5/12">
            
            <Link to="/tasks-list" className="tog-link text-sm text-zinc-400 underline hover:text-white active:text-green-400" onMouseDown={() => {
                !toggleListCondHandler ? handToggleShowList(true) : handToggleShowList(false);
            }}
            >
                {advice}
            </Link>
            <div>
                { !toggleListCondHandler ? <GoTriangleDown className="mx-auto" /> : <GoTriangleUp  className="mx-auto" /> }
            </div> 
        </div>
    )
}
    
    
    