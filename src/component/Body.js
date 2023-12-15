import {useRef,useState} from "react";

function Body() {
    const [text, setText] = useState("");
    const textRef = useRef();
    const handleOnchange = (e) => {
        setText(e.target.value);
    };

    const handleOnclick = function () {
        if (text.length  < 5) {
            textRef.current.focus();
        } else {
            alert(text);
            setText("");

        }
    };

    return (
        <div>
            <input ref={textRef} value={text} onChange={handleOnchange}/>
            <button onClick={handleOnclick}>작성완료</button>
        </div>
    );
}

export default Body;