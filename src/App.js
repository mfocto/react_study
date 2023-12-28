import './App.css';
import {useCallback, useRef, useReducer} from "react";
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

function reducer(state, action) {
    switch(action.type){
        case "CREATE" : {
            return [action.newItem, ...state];
        }
        case "UPDATE" : {
            return state.map((it) => it.id === action.targetId
                ?{
                    // 전달한 객체 아이디와 같은 아이디 값인 경우
                    ...it,
                    isDone: !it.isDone,
                }
                :
                    // 전달한 객체 아이디와 같은 아이디 값이 아닌 경우
                    it
                )
        }
        case "DELETE": {
            return state.filter((it) => it.id !== action.targetId);
        }
        default:
            return state;
    }

}

function App() {
    const [todo, dispatch] = useReducer(reducer, mockTodo);
    const idRef = useRef(3);
    /*
    * useState 버전 *
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
     */

    const onCreate = (content) => {
        dispatch({
            type: "CREATE",
            newItem: {
                id: idRef.current,
                content,
                isDone: false,
                createdDate: new Date().getTime(),
            },
        });
        idRef.current += 1;
    };

    const onUpdate = useCallback((targetId) => {
        /*
        *   useState
        */

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
        // setTodo(
        //     todo.map((it) => it.id === targetId ? {...it, isDone: !it.isDone}: it)
        // )

        /*
        * useReducer
        */
        dispatch({
            type:"UPDATE",
            targetId,
        });
    }, []);

    const onDelete = useCallback((targetId) => {
        // setTodo(todo.filter((it) => it.id !== targetId))

        /*
        *   useReducer
        */
        dispatch({
            type: "DELETE",
            targetId,
        });
    }, []);


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
