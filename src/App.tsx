import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import TodoHeader from "./components/header/TodoHeader";
import "./App.css";
import TodoFilter from "./components/TodoFilter";
import TodoList from "./components/TodoList";
import { ContextProvider } from "./context/TodoProvider";
import TodoForm from "./components/TodoForm";
import React from "react";


function App() {

  return (
    <div className="bg-zinc-700 h-fit space-y-11 text-white app-container md:h-screen">
      <ContextProvider>
        <BrowserRouter>
          <TodoHeader />
          <span className="ml-16 text-sm">Por : Brando Elí Carrillo Pérez</span>
          <Routes>
            <Route path="/" element={<TodoFilter />}>
              <Route path="/tasks-list" element={<TodoList />} />
              <Route path="/form" element={<TodoForm />} />
            </Route>
            
          </Routes>
        </BrowserRouter>
      </ContextProvider>
    </div>
  );
}

export default App;