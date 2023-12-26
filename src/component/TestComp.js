import {useReducer} from 'react';
import '../css/TestComp.css'


function reducer(state, action) {
    switch(action.type) {
        case "INCREASE":
            return state + action.data;
        case "DECREASE":
            return state - action.data;
        case "INIT": 
            return 0;
        default:
            return state;
    }
}

const TestComp = () => {
    const [count, dispatch] = useReducer(reducer, 0);
    return (
        <div className="TestComp">
            <h4>test Component</h4>
            <div className="count_b">
                <h3>{count}</h3>
            </div>
            <div className="btn_c">
                <button onClick={() => dispatch({type:"INCREASE", data: 1})}>+</button>
                <button onClick={() => dispatch({type:"DECREASE", data: 1})}>-</button>
                <button onClick={() => dispatch({type:"INIT", data: 1})}>0으로 초기화</button>
            </div>
        </div>
    );
}
export default TestComp;