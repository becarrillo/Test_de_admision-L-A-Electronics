import { TodoContext } from "./TodoContext";
import { IProps } from "../props/IProps";


export function ContextProvider({children}: IProps) {
    return (
        <TodoContext.Provider value={{}}>
            {children}
        </TodoContext.Provider>
    )
}