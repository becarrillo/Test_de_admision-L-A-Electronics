import { HiOutlineSearch } from "react-icons/hi";
import { Outlet } from "react-router-dom";
import { ToListLink } from "./ToListLink";


const TodoFilter = () => {
    
    return (
        <div className="text-lg text-center py-14">
            Filtrar tarea
            <div className="grid grid-rows-2 grid-cols-4 gap-2 mt-3 ring-1 ring-zinc-400 rounded-md w-11/12 h-auto mx-auto">
                <form className="col-span-4 flex flex-row space-x-1.5 px-7 py-8 h-20">
                    <input placeholder=" Descripción" className="w-48 rounded-md h-7 ring-1 ring-orange-500 text-black" />
                    <button type="submit" className="rounded-md shadow-sm shadow-cyan-400 mb-16 px-1"><HiOutlineSearch className="text-xl" /></button>
                </form>

                <table className="col-span-4 ring-1 ring-zinc-400 rounded-md divide-y divide-zinc-400">
                    <thead className="py-2 bg-slate-600">
                        <tr>
                            <th>ID de tarea</th>
                            <th>Descripción</th>
                            <th>Acción</th>
                        </tr>
                    </thead>

                    <tbody className="hover:bg-zinc-600">
                        <tr>
                            <td>01</td>
                            <td className="text-sm">Lorem ipsum dolor</td>
                            <td className="space-x-1.5">
                                <button className="bg-indigo-500 px-2 py-1 text-sm hover:bg-indigo-400">Editar</button>
                                <button className="bg-red-600 px-2 py-1 text-sm hover:bg-red-500">Eliminar</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <ToListLink />

            <Outlet />
        </div>
    )
}

export default TodoFilter;
