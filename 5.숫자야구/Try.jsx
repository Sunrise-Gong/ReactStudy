import React,{ memo } from 'react';

const Try = memo( ({ tryInfo }) => {
    return (
        <li>
            <div>{tryInfo.try}</div>
            <div>{tryInfo.result}</div>
        </li>
    )
}
)
export default Try;

/* 
// props를 자식컴포넌트에서 바꿔야하는 경우 (원래 원칙상 안되지만 실무에서 종종 필요)

import React,{ memo,useState } from 'react';

const Try = memo( ({ tryInfo }) => {
    const [result, setResult] = useState(tryInfo.result); // props를 state로 만들어서 바꿔준다.

    const onClick = () => {
        setResult('1');
    };
    return (
        <li>
            <div>{tryInfo.try}</div>
            <div onClick={onClick}>{result}</div>
        </li>
    )
}
)
export default Try;
*/

/*
class 
import React, { Component } from 'react';

class Try extends Component {
    render() {
        return (
            <li>
                <div>{this.props.tryInfo.try}</div>
                <div>{this.props.tryInfo.result}</div>
            </li>
        )
    }
}
export default Try;
*/
