import React, { useState, useRef, useCallback, useMemo } from 'react';

const ResponseCheck = () => {
    const [state, setState] = useState('waiting');
    const [message, setMessage] = useState('클릭해서 시작하세요.');
    const [result, setResult] = useState([]);
    const timeout = useRef(null);
    const startTime = useRef(0);
    const endTime = useRef(0);

    const onClickScreen = useCallback(() => {
        if (state === 'waiting') {
            timeout.current = setTimeout(() => {
                setState('now');
                setMessage('지금 클릭');
                startTime.current = new Date();
            }, Math.floor(Math.random() * 1000) + 2000); // 2초~3초 랜덤
            setState('ready');
            setMessage('초록색이 되면 클릭하세요.');
        } else if (state === 'ready') { // 성급하게 클릭
            clearTimeout(timeout.current);
            setState('waiting');
            setMessage('너무 성급하시군요! 초록색이 된 후에 클릭하세요.');
        } else if (state === 'now') { // 반응속도 체크
            endTime.current = new Date();
            setState('waiting');
            setMessage('클릭해서 시작하세요.');
            setResult((prevResult) => {
                return [...prevResult, endTime.current - startTime.current];
            });
        }
    }, [state]);
    const onReset = useCallback(() => {
        setResult([]);
    }, []);

    const renderAverage = () => {
        return result.length === 0
            ? null
            : <>
                <div>평균 시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
                <button onClick={onReset}>리셋</button>
            </>
    };

    return (
        <>
            <div
                id="screen"
                className={state}
                onClick={onClickScreen}
            >
                {message}
            </div>
            {renderAverage()}
        </>
    );
};

export default ResponseCheck;

// import React,{ PureComponent } from 'react';

// class ResponseCheck extends PureComponent {
//     state = {
//         state: 'waiting',
//         message: '클릭해서 시작',
//         result: []
//     }
//     // 9, 10 번 줄처럼 값을 사용하면 렌더링이 안되는 장점이 있음
//     timeout; //   <------- clrearTimeout사용하기
//     startTime // 시간재기
//     endTime // 시간재기

//     onClickScreen = () => {
//         const { state, message, result } = this.state;
//         if (state === 'waiting') {
//             this.setState({
//                 state: 'ready',
//                 message: '초록색이되면 클릭하세요',
//             })
//             this.timeout = setTimeout(() => { //   <------- clrearTimeout사용하기
//                 this.setState({
//                     state: 'now',
//                     message: '지금클릭!',
//                 })
//                 this.startTime = new Date(); // 시간재기
//             }, Math.floor(Math.random()*1000) + 2000)

//         } else if (state === 'ready') {
//             clearTimeout(this.timeout) //   <------- clrearTimeout사용하기
//             this.setState({
//                 state: 'waiting',
//                 message: '너무 성급하시군요! 초록색 되면 클릭하세요!'
//             })

//         } else if (state === 'now') {
//             this.endTime = new Date();
//             this.setState((prevState) => {
//                 return {
//                     state: 'waiting',
//                     message: '클릭해서 시작',
//                     result: [...prevState.result, this.endTime - this.startTime]
//                 }
//             })
//         }
//     };

//     onReset = () => { // <--------- 평균시간 리셋 버튼 만들기
//         this.setState({
//             result: [],
//         })
//     }

//     renderAverage = () => {  //      <-------- 삼항연산자 모듈화
//         const { result } = this.state;
//         return result.length === 0 ? null :
//         <>
//         <div> 평균시간: {result.reduce((ac,cu)=> ac + cu) / result.length}ms</div>
//         <button onClick={this.onReset}>리셋</button> {/* <--------- 평균시간 리셋 버튼 만들기*/} 
//         </>
//     }

//     render() {
//         let { state, message, result } = this.state;
//         return (
//             <>
//             <div 
//             id="screen" 
//             className={state}
//             onClick={this.onClickScreen}
//             >
//                 {message}
//             </div>
//             {this.renderAverage()}     {/*  <--------삼항연산자 모듈화*/}
//             </>
//         )
//     }
// }

// export default ResponseCheck;
