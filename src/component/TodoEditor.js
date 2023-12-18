import {useRef, useState} from "react";
import '../css/TodoEditor.css'

const TodoEditor = ({onCreate}) => {
    const [content, setContent] = useState("");
    const inputRef = useRef();
    const onChangeContent = (e) => {
      setContent(e.target.value);
    };

    const onKeyDown = (e) => {
        if (e.keyCode === 13) {
            onSubmit();
        }
    }

    const onSubmit = () => {
        if (!content){
            inputRef.current.focus();
            return;
        }
        onCreate(content);
        setContent("");
    }

    return (
        <div className="TodoEditor">
            <h4>✒새로운 todo 작성</h4>
            <div className="editorWrapper">
                <input ref={inputRef} value={content} onChange={onChangeContent} onKeyDown={onKeyDown} placeholder="new Todo....."/>
                <button onClick={onSubmit}>추가</button>
            </div>
        </div>
    );
};

export default TodoEditor;