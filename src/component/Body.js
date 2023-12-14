import { useState } from "react";

function Body() {
    const [state, setState] = useState({
        name: "",
        gender: "",
        birth: "",
        bio: "",
    });

    const handleOnChange = (e) => {
        console.log("현재 수정 대상:", e.target.name)
    };

    return (
        <div>
            <h2>
                <input type="text" onChange={handleOnChange}/>
                <br/>
                {box}
            </h2>
        </div>
    );
}

export default Body;