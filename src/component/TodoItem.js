import '../css/TodoItem.css'
import React,{useContext} from 'react';
import {TodoDispatchContext} from "../App";

const TodoItem = ({id, content, isDone, createdDate}) => {
    const {onUpdate, onDelete} = useContext(TodoDispatchContext);
    console.log(`${id} Todo item update`)
    const onChangeCheckbox = () => {
      onUpdate(id);
    };

    const onClickBtn = () => {
        onDelete(id);
    }

    return (
        <div className="TodoItem">
            <div className="checkbox_col">
                <input type="checkbox" onChange={onChangeCheckbox} checked={isDone}/>
            </div>
            <div className="title_col" style={{textDecoration: isDone === false? "none": "line-through", color: isDone? "red": "black"}}>{content}</div>
            <div className="date_col">{new Date(createdDate).toLocaleDateString()}</div>
            <div className="btn_col">
                <button onClick={onClickBtn}>삭제</button>
            </div>
        </div>
    );
}

export default React.memo(TodoItem);