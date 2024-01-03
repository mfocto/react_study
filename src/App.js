import {Routes, Route} from 'react-router-dom'
import './App.css';
import Home from './pages/Home'
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";
import New from "./pages/New";
import {useReducer, useRef, useEffect} from "react";

const mockData = [
    {
        id: "mock1",
        date: new Date().getTime(),
        content: "mock1",
        emotionId: 1,
    },
    {
        id: "mock2",
        date: new Date().getTime(),
        content: "mock2",
        emotionId: 2,
    },
    {
        id: "mock3",
        date: new Date().getTime(),
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
            return state.map((it) => String(it.id) !== String(action.targetId))
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
    <div className="App">
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/new" element={<New/>}/>
            <Route path="/diary" element={<Diary/>}/>
            <Route path="/edit" element={<Edit/>}/>
        </Routes>
    </div>
    );
}

export default App;

