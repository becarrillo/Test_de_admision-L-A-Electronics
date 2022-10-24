import { HiPlusSm } from "react-icons/hi";
import TodoForm from "./TodoForm";
import db from "../firebase";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { ITodo } from "../props/ITodo";


const TodoList = () => {
    const snapShot: Promise<QueryDocumentSnapshot<DocumentData>[]> = db.ALL();

    const toBeMapped = snapShot.then(qDoc => { return qDoc })
        .catch(err => { throw new Error("Found error: ", err) });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    var qActionsDocsDataArr: ITodo[] = [];
    toBeMapped.then(qDocs => {
        // eslint-disable-next-line array-callback-return
        qDocs.map(data => {
            return qActionsDocsDataArr.push({
                "id": data.id,
                "description": data.data()["descripcion"],
                "state": data.data()["estado"]
            });
        });
        console.log(qActionsDocsDataArr.map(t => {return t["description"]}), "is LIST");
    })
        .catch(err => { throw new Error("Nuevo error: ", err) });

    return (
        <div className="mt-20 py-1">
            <button className="flex flex-row rounded-xl bg-mariner shadow-md shadow-zinc-400 justify-center transition 
            ease-out delay-150 hover:-translate-y-1 hover:scale-110 py-3 w-48 h-14 mx-auto hover:bg-air-super-blue"
            >
                <a href="#query-adv" rel="modal:open" className="grid grid-cols-3" >
                    <HiPlusSm className="text-3xl" />
                    <span className="col-span-2 text-white">Agregar</span>
                </a>
            </button>

            <div className="flex flex-col mx-auto my-2 rounded-md 
            ring-1 ring-slate-400 w-11/12 text-zinc-700"
            >
                <TodoForm />
                <table className="rounded-md mx-auto w-full">
                    <thead className="bg-slate-600 text-white">
                        <tr>
                            <th>ID de tarea</th>
                            <th>Descripción</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    
                    <tbody className="text-white hover:bg-zinc-500">
                        <>
                            {
                                qActionsDocsDataArr.map(task => {
                                    return (
                                        <tr key={task["id"]}>
                                            <td>{task["id"]}</td>
                                            <td>{task["description"]}</td>
                                            <td>{task["state"]}</td>
                                        </tr>
                                    )
                                })
                            }
                        </>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TodoList;
