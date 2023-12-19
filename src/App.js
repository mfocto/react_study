import './App.css';
import {useRef, useState} from "react";
import Header from './component/Header'
import TodoEditor from "./component/TodoEditor";
import TodoList from "./component/TodoList";
import TestComp from './component/TestComp'

const mockTodo = [{
        id: 0,
        isDone: false,
        content: "공부",
        createdDate: new Date().getTime(),
},
    {
        id: 1,
        isDone: false,
        content: "빨래",
        createdDate: new Date().getTime(),
},
    {
        id: 2,
        isDone: false,
        content: "노래",
        createdDate: new Date().getTime(),
}];

function App() {
    const [todo, setTodo] = useState(mockTodo);
    const idRef = useRef(3);
    const onCreate = (content) => {
      const newItem = {
          id : idRef.current,
          content,
          isDone: false,
          createdDate: new Date().getTime()
      };
      setTodo([newItem, ...todo]);
      idRef.current += 1;
    };

    const onUpdate = (targetId) => {
        // setTodo(
        //     // eslint-disable-next-line array-callback-return
        //     todo.map((it) => {
        //         if (it.id === targetId) {
        //             return {
        //                 ...it,
        //                 isDone: !it.isDone,
        //             }
        //         }
        //     })
        // )

        //삼항연산자로 변환
        setTodo(
            todo.map((it) => it.id === targetId ? {...it, isDone: !it.isDone}: it)
        )
    }

    const onDelete = (targetId) => {
        setTodo(todo.filter((it) => it.id !== targetId))
    }


  return (
    <div className="App">
        <TestComp />
        <Header />
        <TodoEditor onCreate={onCreate}/>
        <TodoList todo={todo} onUpdate={onUpdate} onDelete={onDelete}/>
    </div>
  );
}

export default App;
