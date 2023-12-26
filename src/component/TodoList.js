import TodoItem from './TodoItem'
import '../css/TodoList.css'
import {useMemo, useState} from "react";

const TodoList = ({todo, onUpdate, onDelete}) => {
    const [search, setSearch] = useState("");

    const analyzeTodo = useMemo(() => {
        console.log("analyzeTodo 함수 호출");
        const totalCount = todo.length;
        const doneCount = todo.filter((it) => it.isDone).length;
        const notDoneCount = totalCount - doneCount;
        return {
            totalCount,
            doneCount,
            notDoneCount
        };
    },[todo]);

    const {totalCount, doneCount, notDoneCount} = analyzeTodo

    const onChangeSearch = (e) => {
        setSearch(e.target.value);
    };

    const getSearchResult = () => {
        return search === ""
            ? todo
            : todo.filter((it) => it.content.toLowerCase().includes(search.toLowerCase()))
    };

    return (
        <div className="TodoList">
            <h4>Todo List 🔨</h4>
            <div>
                <div>총개수 : {totalCount}</div>
                <div>해야 할 일 : {notDoneCount}</div>
                <div>완료한 일 : {doneCount}</div>
            </div>
            <input value={search} onChange={onChangeSearch} className="searchbar" placeholder="검색어를 입력하세요"/>
            <div className="list_wrapper">
                {getSearchResult().map((it) => (
                    <TodoItem key={it.id} {...it} onUpdate={onUpdate} onDelete={onDelete}/>
                ))}
            </div>
        </div>
    );
};

export default TodoList;