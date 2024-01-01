import './App.css';
import React,{useCallback, useRef, useReducer, useMemo} from "react";
import Header from './component/Header'
import TodoEditor from "./component/TodoEditor";
import TodoList from "./component/TodoList";




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

export const TodoStateContext = React.createContext();
export const TodoDispatchContext = React.createContext();
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

    const memorizeDispatches = useMemo (() => {
        return {onCreate, onUpdate, onDelete};
    }, [])
  return (
    <div className="App">
        <Header />
        <TodoStateContext.Provider value={{todo}}>
            <TodoDispatchContext.Provider value={memorizeDispatches}>
                <TodoEditor />
                <TodoList />
            </TodoDispatchContext.Provider>
        </TodoStateContext.Provider>
    </div>
  );
}

export default App;
