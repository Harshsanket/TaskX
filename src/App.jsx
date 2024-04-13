import React,{
   useState,
   useEffect 
  } from "react";
import { 
  Check, 
  X, 
  Trash2,
  Plus
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./components/ui/button";

const App = () => {
  const [todo, setTodo] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [id, setId] = useState()
  const formSubmit = (e) => {
    e.preventDefault();
    setId(Math.round(Math.random()*99999))
            if (!inputValue.trim()) return;
            const newToDoList = [
              ...todo,
              { id: id, text: inputValue, completed: false },
            ];
            setTodo(newToDoList);
            localStorage.setItem("todolist", JSON.stringify(newToDoList));
            setInputValue("");
  }
  const deleteTask = (id) => {
    const deleteTask = todo.filter((todo) => todo.id !== id);
    setTodo(deleteTask);
    localStorage.setItem("todolist", JSON.stringify(deleteTask));
  };

  const completeTask = (id) => {
    const completeTask = todo.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodo(completeTask);
    localStorage.setItem("todolist", JSON.stringify(completeTask));
  };

  useEffect(() => {
    const storedTodoList = JSON.parse(localStorage.getItem("todolist"));
    if (storedTodoList) {
      setTodo(storedTodoList);
    }
  }, []);

  return (

    <div className="text-white">
      <div
        id="Header"
        className="w-full text-white sm:h-72 h-56 pt-2 pl-2 text-center flex flex-col justify-end pb-12"
      >
        <a href="#" className="sm:text-8xl text-5xl font-bold">
          TaskX
        </a>
      </div>

      <div className=" justify-center w-full text-center flex">
        <form
          action=""
          onSubmit={(e) => {formSubmit(e)}}
        >
          <div className="flex flex-col w-full max-w-sm items-center space-y-2">
            <div className="flex w-full items-center space-x-2">
              <input
                type="text"
                className="border border-black rounded p-2 text-black h-10 sm:w-80 sm:h-12"
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                }}
                placeholder="Enter Task ..."
              />
              <button
                type="submit"
                className="bg-sky-600 rounded overflow-hidden h-10 sm:h-12 sm:w-auto p-2 text-white font-bold"
              >
                <Plus />
              </button>
            </div>
          </div>
        </form>
      </div>
      {todo.length > 0 && (
        <div className="sm:flex justify-center mr-4 ml-4 ">
        <div className=" border border-white mt-6 p-2 rounded-xl sm:w-1/2">
          {/* new table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px] text-white">
                  <Check className="h-4 w-4" />
                </TableHead>
                <TableHead className="text-white">ID</TableHead>
                <TableHead className="text-white">Task</TableHead>
                <TableHead className="text-right text-white">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {todo.map((todoItem, index) => (
                <TableRow  key={index}>
                  <TableCell className="font-medium">
                    <Button
                      onClick={() => completeTask(todoItem.id)}
                      variant="outline"
                      size="icon"
                      className="bg-transparent"
                    >
                      {todoItem.completed ? (
                        <X className="h-4 w-4" />
                      ) : (
                        <Check className="h-4 w-4" />
                      )}
                    </Button>
                  </TableCell>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell
                    style={{
                      textDecoration: todoItem.completed
                        ? "line-through"
                        : "none",
                    }}
                    className='sm:text-lg'
                  >
                    {todoItem.text}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      className="bg-transparent"
                      variant="outline"
                      size="icon"
                      onClick={() => deleteTask(todoItem.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      )}
      
    </div>
  );
};

export default App;
