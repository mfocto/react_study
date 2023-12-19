import '../css/TodoItem.css'

const TodoItem = ({id, content, isDone, createdDate, onUpdate, onDelete}) => {
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

export default TodoItem;