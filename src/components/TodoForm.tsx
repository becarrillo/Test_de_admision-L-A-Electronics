const TodoForm = () => {
    
    return (
        <div id="query-adv" className="modal bg-cyan-50 shadow-xl shadow-air-super-blue">
            <form action="/form" method="get" className="flex flex-col px-2 py-12 grid rounded-lg grid-rows-2 mx-auto">
                <div className="grid grid-cols-2 gap-10 h-32 ">
                    <label htmlFor="#your_select" className="col-span-2 mt-4 text-center text-lg">Selecciona el método para crear tarea(s)/actividad(es)</label>
                    <select name="select_opt" className="col-span-2 rounded-md bg-white shadow-md shadow-zinc-400 mx-auto w-64 h-8">
                        <option value="descripcion manual" >descripción manual</option>
                        <option value="de la API de comentarios">de la API de comentarios</option>
                    </select>
                    <input type="submit" className="col-span-2 rounded-sm bg-cyan-700 text-white cursor-pointer mx-auto px-28 py-1 hover:bg-cyan-600" value="Comenzar" />
                </div>
            </form>
        </div>
    )
}

export default TodoForm;
