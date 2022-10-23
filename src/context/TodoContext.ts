import { createContext } from "react";


export const TodoContext = createContext({
    to_navigate_forms: true,
    tasks: {
        description: '',
        state: ''
    }
});
