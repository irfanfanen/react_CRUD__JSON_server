import { useEffect, useState } from "react"
import Item from "./Item";

const List = ({isRefresh, setRefresh}) => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/todos")
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            setRefresh(false)
            setTodos(data);
            console.log('Success:', data);
        })
        .catch((err) => {
            setRefresh(false)
            if (err.name === "AbortError") {
                console.log("fetch aborted.");
            }
        });
    }, [isRefresh, setRefresh]);

    return (
        <ul id="todo-list">
            {todos.map((todo) => (
                <Item todo={todo} key={todo.id} setRefresh={setRefresh} />
            ))}
        </ul>
    )
}

export default List