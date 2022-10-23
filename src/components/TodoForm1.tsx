import { FormEvent, useContext, useEffect, useRef, useState  } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TodoContext } from "../context/TodoContext";
import db from "../firebase";


const TodoForm1 = () => {
    const [description, setDescription] = useState('');
    const [commentsCount, setCommentsCount] = useState(0);
    const context = useContext(TodoContext).tasks;
    const { search } = useLocation();
    const [param, setParam] = useState('');
    const taskRef = useRef(context);  

    useEffect(() => {
        setParam(search);
        console.log(search);
    },[search]);

    const descSelectLegend = "Describe tu nueva actividad/tarea para guardar";
    const title = "+ Nueva(s) Actividad(es)";
    const callApiSelectLegend = "¿Cuántas tareas desearías te proveyéramos de comentarios?"
    
    function submitActHandler(ev: FormEvent) {
        ev.preventDefault();
        
        // Capturar el query en la solicitud enviada y realizar funcionalidad en cada condición
        if (param === "?select_opt=descripcion+manual") {
            taskRef.current.description = description;
            taskRef.current.state = "pendiente"
            const fetchingData = () => {
                return db.TO_SAVE(
                    {
                        "descripcion": description,
                        "estado": context.state
                    }
                ).then(task => task).catch(err => {throw new Error("Catched an error: ", err)});
            }
            
            alert(fetchingData() +"  fetched");
            
            navigate("/");
        }
        if (param === "?select_opt=de+la+API+de+comentarios") {
            (async function () {
                const getComments = (await fetch("https://jsonplaceholder.typicode.com/comments"))
                  .json();

                // commentsCount = Cuántos comments de JSONPlaceholder solicitó el usuario para rellenar tareas  
                getComments.then(data => {
                    
                    if (commentsCount >= 1) {
                        var i = 0;
                        while (i < commentsCount) {
                            var randomIndex = Math.floor(Math.random()*data.length);
                            
                            console.log(data[randomIndex]["body"], " IS THE BODY");
                            ++i;
                        }
                    }
                });
            })();

            alert("Exitoso!: se han insertado "+ commentsCount+" actividades/tareas pendientes a la lista")
            navigate("/");
        }
    }

    const navigate = useNavigate();

    return (
        <div className="flex flex-row py-36 bg-zinc-600">
            <div className="grid grid-rows-5 mx-auto
            rounded-md bg-zinc-500 py-16 text-center h-96"
            >
                <h4 className="justify-self-center text-lg text-white py-1">
                    {
                        title
                    }
                </h4>
                <form className="row-span-4 grid grid-cols-6 justify-self-center py-14" onSubmit={ev => {
                if (param === "?select_opt=descripcion+manual") submitActHandler(ev);
                if (param === "?select_opt=de+la+API+de+comentarios") submitActHandler(ev)}}
                >
                    <fieldset className="col-span-6 space-y-7 h-14">
                        <legend className="col-span-3 mx-auto text-white">
                            {(param === "?select_opt=descripcion+manual") && descSelectLegend}
                            {(param === "?select_opt=de+la+API+de+comentarios") && callApiSelectLegend}
                        </legend>
                        {
                            (param === "?select_opt=descripcion+manual") && (
                                <>
                                    <input type="text" className="ml-3 w-96 rounded-3xl h-8 ring ring-offset-orange-500 transition 
                                    ease-out delay-150 hover:-translate-y-1 hover:scale-110 ring-offset-4 text-center text-lg 
                                    text-zinc-700" onChange={ev => setDescription(ev.target.value)}
                                    />
                                    <button type="submit" className="rounded-md shadow-lg shadow-cyan-400 px-5 py-2 bg-cyan-600 
                                    transition ease-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-cyan-500 
                                    hover:duration-500 hover:shadow-cyan-300"
                                    >
                                        Enviar actividad
                                    </button>
                                </>
                            )
                        }
                        {
                            (param === "?select_opt=de+la+API+de+comentarios") && (
                                <>
                                    <input type="number" className="text-center w-auto rounded-sm h-7 mx-3 text-zinc-700 
                                    ring ring-orange-500 ring-offset-1" onChange={
                                        ev => setCommentsCount(parseInt(ev.target.value))
                                    }/>
                                    <button type="submit" className="rounded-md shadow-lg shadow-cyan-400 px-3 py-1 
                                    bg-cyan-600 transition ease-out delay-150 hover:-translate-y-1 hover:scale-110 
                                    hover:bg-cyan-500 hover:duration-500 hover:shadow-cyan-300"
                                    >
                                        Solicitar
                                    </button>
                                </>
                            )
                        }
                    </fieldset>
                </form>
            </div>
        </div>
    )
}

export default TodoForm1;
