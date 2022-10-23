import { TodoContext } from "./TodoContext";
import { IProps } from "../interfaces/props/IProps";


export function ContextProvider({ children }: IProps) {
    return (
        <TodoContext.Provider value={{
            to_navigate_forms: false,
            tasks: {
                description: '',
                state: ''
            }
        }}>
            {children}
        </TodoContext.Provider>
    )
}
