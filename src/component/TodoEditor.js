import {useState} from "react";
import '../css/TodoEditor.css'

const TodoEditor = ({onCreate}) => {
    const [content, setContent] = useState("");
    const onChangeContent = (e) => {
      setContent(e.target.value);
    };
    return (
        <div className="TodoEditor">
            <h4>✒새로운 todo 작성</h4>
            <div className="editorWrapper">
                <input value={content} onChange={onChangeContent} placeholder="new Todo....."/>
                <button>추가</button>
            </div>
        </div>
    );
};

export default TodoEditor;