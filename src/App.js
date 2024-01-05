import {Routes, Route} from 'react-router-dom'
import './App.css';
import Home from './pages/Home'
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";
import New from "./pages/New";
import React, {useReducer, useRef, useEffect} from "react";

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

const mockData = [
    {
        id: "mock1",
        date: new Date().getTime() - 1,
        content: "mock1",
        emotionId: 1,
    },
    {
        id: "mock2",
        date: new Date().getTime() - 2,
        content: "mock2",
        emotionId: 2,
    },
    {
        id: "mock3",
        date: new Date().getTime() - 3,
        content: "mock3",
        emotionId: 3,
    }
]

function reducer(state, action) {
    switch (action.type) {
        case "INIT" :
            return action.data
        case "create" :
            return [action.data, ...state];
        case "update" :
            return state.map((it) => String(it.id) === String(action.data.id) ? {...action.data} : it);
        case "delete" :
            return state.filter((it) => String(it.id) !== String(action.targetId))
        default :
            return [];
    }
}

function App() {
    const [data, dispatch] = useReducer(reducer, []);
    const idRef = useRef(0);

    useEffect(() => {
        dispatch({
            type: "INIT",
            data: mockData
            });
    }, []);
    const onCreate = (date, content, emotionId) => {
        dispatch({
            type: "create",
            data: {
                id: idRef.current,
                date: new Date(date).getTime(),
                content,
                emotionId
            }
        });
        idRef.current += 1;
    }

    const onUpdate = (targetId, date, content, emotionId) => {
        dispatch({
            type: "update",
            data: {
                id: targetId,
                date: new Date(date).getTime(),
                content,
                emotionId
            }
        })
    }

    const onDelete = (targetId) => {
        dispatch({
            type: "delete",
            targetId,
        });
    }

    return (
        <DiaryStateContext.Provider value={data}>
            <DiaryDispatchContext.Provider value={{onCreate, onUpdate, onDelete}}>
                <div className="App">
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/new" element={<New/>}/>
                        <Route path="/diary/:id" element={<Diary/>}/>
                        <Route path="/edit/:id" element={<Edit/>}/>
                    </Routes>
                </div>
            </DiaryDispatchContext.Provider>
        </DiaryStateContext.Provider>
    );
}

export default App;

