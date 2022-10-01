import { HiPlusSm } from "react-icons/hi";


const TodoList = () => {

    return (
        <div className="mt-20 py-1">
            <button className="flex flex-row rounded-md bg-green-800 shadow-md shadow-zinc-400 p-2 w-44 mx-auto hover:bg-green-700">
                <span className="ring-1 ring-zinc-400 text-white ml-7 w-4 rounded-sm"><HiPlusSm className="" /></span> 
                <span className="ml-1 text-white">Agregar</span>
            </button>
            <div className="flex flex-col mx-auto my-1 rounded-md ring-1 ring-slate-400 w-11/12 text-zinc-700">
                
                
                <table className="rounded-md mx-auto w-full">
                    <thead className="bg-slate-600 text-white">   
                        <tr>
                            <th>ID de tarea</th>
                            <th>Descripción</th>
                            <th>Acción</th>
                        </tr>    
                    </thead>

                    <tbody>
                        <tr className="text-white">
                            <td>1</td>
                            <td>2</td>
                            <td>3</td>
                        </tr>
                        
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TodoList;