import React,{ useState, memo } from 'react';
import Try from './Try'

function getNumbers() { // 숫자 네개를 겹치지 않고 랜덤하게 뽑는 함수
    let candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    let array = [];
    for (let i =0; i < 4; i++) {
        const chosen = candidate.splice( Math.random() * (9 - i), 1 )[0] 
        array.push(chosen);
    }
    return array;
}

const NumberBaseball = memo( () => {
    let [result, setResult] = useState('')
    let [value,setValue] = useState('')
    let [answer, setAnswer] = useState(getNumbers())
    let [tries, setTries] = useState([])

    const onSubmitForm = (e) => {
        e.preventDefault();
        if ( value === answer.join('') ) { // 정답인 경우
            
            setResult('홈런!!!')
            setTries((prevTries)=>{
                return [ ...prevTries, {try: value, result: '홈런!!!'}]
            })
            alert('게임을 다시 시작합니다.');
            setValue('')
            setAnswer(getNumbers())
            setTries([])
        } else { // 오답인 경우
            const answerArray = value.split('').map( el => parseInt(el))
            let strike = 0;
            let ball = 0;
            
            if ( tries.length >= 9) {
                setResult(`10번 넘겨서 실패!!! 답은 ${answer.join('')} 였습니다.`)
                alert('게임을 다시 시작합니다.');
                setValue('')
                setAnswer(getNumbers())
                setTries([])
                
            } else {
                for (let i = 0; i < 4; i++) {
                    if (answerArray[i] === answer[i]) {
                        strike += 1
                    } else if (answer.includes(answerArray[i])) {
                        ball += 1
                    }
                }
                setValue('')
                setTries(prevTries => {
                    return [ ...prevTries, {try: value, result: `${strike}스크라이크, ${ball}볼 입니다.`}]
                })
            }
        }
    }

    const onChangeInput = (e) => {
        setValue(e.target.value )
    }

    return (
        <>
        <h1>{result}</h1>
        <form onSubmit={onSubmitForm}>
            <input maxLength={4} 
            value={value} 
            onChange={onChangeInput}/>
        </form>
        
        <div>시도: {tries.length}</div>
        <ul>
            {tries.map((el, i) => {
                return (
                    <Try key={`${i+1}차 시도`} tryInfo={el} index={i}/>
                )
            })}
        </ul>
        </>
    )
}
)

export default NumberBaseball;
/*
class 문법

import React, { Component } from 'react';
import Try from './Try'

function getNumbers() { // 숫자 네개를 겹치지 않고 랜덤하게 뽑는 함수
    let candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    let array = [];
    for (let i =0; i < 4; i++) {
        const chosen = candidate.splice( Math.random() * (9 - i), 1 )[0] 
        array.push(chosen);
    }
    return array;
}

class NumberBaseball extends Component {
    state={
        result: '',
        value: '',
        answer: getNumbers(),
        tries: [],
    };

    onSubmitForm = (e) => {
        let { result, value, answer, tries } = this.state
        e.preventDefault();
        if ( value === answer.join('') ) { // 정답인 경우
            console.log('answer', answer)
            this.setState({
                result: '홈런!!!',
                tries: [ ...tries, {try: value, result: '홈런!!!'}]
            })
            alert('게임을 다시 시작합니다.');
                this.setState({
                    value: '',
                    answer: getNumbers(),
                    tries: [],
                });
        } else { // 오답인 경우
            const answerArray = value.split('').map( el => parseInt(el))
            let strike = 0;
            let ball = 0;
            if ( tries.length >= 9) { //
                this.setState({
                    result: `10번 넘겨서 실패!!! 답은 ${answer.join('')} 였습니다.`,
                });
                alert('게임을 다시 시작합니다.');
                this.setState({
                    value: '',
                    answer: getNumbers(),
                    tries: [],
                });
            } else {
                for (let i = 0; i < 4; i++) {
                    if (answerArray[i] === answer[i]) {
                        strike += 1
                    } else if (answer.includes(answerArray[i])) {
                        ball += 1
                    }
                }
                this.setState({
                    value : '',
                    tries: [ ...tries, {try: value, result: `${strike}스크라이크, ${ball}볼 입니다.`}]
                })
            }
        }
    }

    onChangeInput = (e) => {
        this.setState({ value: e.target.value })
    }

    render() {
        return (
            <>
            <h1>{this.state.result}</h1>
            <form onSubmit={this.onSubmitForm}>
                <input maxLength={4} 
                value={this.state.value} 
                onChange={this.onChangeInput}/>
            </form>
            
            <div>시도: {this.state.tries.length}</div>
            <ul>
                {this.state.tries.map((el, i) => {
                    return (
                        <Try key={`${i+1}차 시도`} tryInfo={el} index={i}/>
                    )
                })}
            </ul>
            </>
        )
    }
}

export default NumberBaseball;
*/