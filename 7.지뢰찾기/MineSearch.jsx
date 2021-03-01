import React, { useEffect, useReducer, createContext, useMemo } from 'react';
import Table from './Table';
import Form from './Form';

//------------------------------------------------------테이블 칸의 상태
export const CODE = {
    MINE: -7,
    NORMAL: -1,
    QUESTION: -2,
    FLAG: -3,
    QUESTION_MINE: -4,
    FLAG_MINE: -5,
    CLIKED_MINE: -6,
    OPENED: 0, // 0 이상이면 다 opened
};

//------------------------------------------------------Context api를 사용하기 위한 세팅
export const TableContext = createContext({ 
    // 초기값 설정은 모양만 맞춰줄께요.
    tableData: [],
    halted: true,
    dispatch: () => {}, 
});

//------------------------------------------------------상태 값
const initialState = {
    tableData:[],
    timer: 0, 
    result: 0,
    halted: true,
    openedCount: 0,
    data: {
        row: 0,
        cell: 0,
        mine: 0,
    }, 
}

//------------------------------------------------------테이블 생성 & 무작위 지뢰심기 함수
const plantMine = (row, cell, mine) => {
    console.log(row, cell, mine);
    const candidate = Array(row * cell).fill().map((arr,i) => { // 지뢰가 될 수도 있는 후보자 배열 생성
        return i;
    });
    
    const shuffle = []; // 지뢰 넘버 무작위 뽑기
    while (candidate.length > row * cell - mine) {
        const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]
        shuffle.push(chosen);
    }
    const data = []; // 지뢰 없는 테이블 생성
    for (let i =0; i < row; i++) {
        const rowData = [];
        data.push(rowData);
        for (let j =0; j < cell; j++) {
            rowData.push(CODE.NORMAL)
        }
    }

    for (let k=0; k < shuffle.length; k++) { // 지뢰 넘버를 몇 콤마 몇 으로 바꿔주기
        const ver = Math.floor(shuffle[k] / cell);
        const hor = shuffle[k] % cell;
        data[ver][hor] = CODE.MINE; // 지뢰심기
    }
    console.log(data)
    return data;
}

//------------------------------------------------------액션 종류
export const START_GAME = 'START_GAME'; 
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';
export const INCREMENT_TIMER = 'INCREMENT_TIMER';

//------------------------------------------------------리듀서 함수: 액션별로 수행할 일들을 작성
const reducer = (state, action) => {
    switch (action.type) {
        case START_GAME: // 시작 버튼을 누르면
            return {
                ...state,
                timer: 0,
                openedCount : 0,
                data: {
                    row: action.row,
                    cell: action.cell,
                    mine: action.mine,
                }, 
                tableData: plantMine(action.row, action.cell, action.mine), // 지뢰심은 테이블을 생성
                halted: false,
            }
        case OPEN_CELL: {// 칸을 클릭했을 경우
            const tableData = [...state.tableData];
            tableData.forEach((row, i) => { // 불변성을 위해서 모든 테이블을 다시 만들어서 넣어주기
                tableData[i] = [...row];
            });
            const checked = [];
            let openedCount = 0;
            const checkArround = (row, cell) => {
                if ( row < 0 || row >= tableData.length || cell < 0 || cell >= tableData[0].length) { 
                    return;
                } // 상하좌우 존재하는 칸이 아닌 경우 필터링
                if ([CODE.OPENED, CODE.FLAG_MINE, CODE.FLAG, CODE.QUESTION, CODE.QUESTION_MINE].includes(tableData[row][cell])) {
                    return;
                } // 닫힌 칸만 열기
                if (checked.includes( row + '/' + cell)) {
                    return;
                } else {
                    checked.push(row + '/' + cell)
                } // 한번 연칸은 무시하기
                let around = [
                    tableData[row][cell - 1], tableData[row][cell + 1],
                ];// 검사할 주변칸들을 넣는 배열
                if (tableData[row - 1]) { //윗줄이 존재한다면
                    around = around.concat(
                        tableData[row -1][cell -1], 
                        tableData[row -1][cell], 
                        tableData[row -1][cell +1], 
                        )
                }
                    // around = around.concat( // 현재 누른 칸의 좌우
                    // tableData[row][cell -1], 
                    // tableData[row][cell +1], 
                    // )
                if (tableData[row +1]) { // 아랫줄이 존재한다면
                    around = around.concat(
                        tableData[row +1][cell -1], 
                        tableData[row +1][cell], 
                        tableData[row +1][cell +1], 
                        )
                }
                // 주변 칸들 지뢰개수 카운트
                const count = around.filter(el => [CODE.MINE, CODE.QUESTION_MINE, CODE.FLAG_MINE].includes(el)).length;
                if (count === 0) {
                    if (row > -1) {
                    const near = []
                    if ( row -1 >= 0 ) {
                        near.push([row -1, cell -1]);
                        near.push([row -1, cell]);
                        near.push([row -1, cell +1]);
                    }
                    near.push([row, cell -1])
                    near.push([row, cell +1])
                    if ( row +1 < tableData.length ) {
                        near.push([row +1, cell -1]);
                        near.push([row +1, cell]);
                        near.push([row +1, cell +1]);
                    }
                    near.forEach(n => {
                        if (tableData[n[0]][n[1]] !== CODE.OPENED){
                            checkArround(n[0], n[1]);
                        }   
                    })
                }
                } 
                if (tableData[row][cell] === CODE.NORMAL) {
                    openedCount += 1;
                }
                tableData[row][cell] = count;
            };
            checkArround(action.row, action.cell)
            let halted = false;
            let result ='';
            if (state.data.row * state.data.cell - state.data.mine === state.openedCount + openedCount) {
                halted = true;
                result = `${state.timer}초 만에 승리하셨습니다!`
            }
            return { 
                ...state,
                tableData,
                openedCount: state.openedCount + openedCount,
                halted,
                result,
            }
        }
        case CLICK_MINE: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            tableData[action.row][action.cell] = CODE.CLIKED_MINE;
            return {
                ...state,
                tableData,
                halted: true,
            }
        }
        case FLAG_CELL: {
            const tableData = [...state.tableData];
            if (tableData[action.row][action.cell] === CODE.MINE) {
                tableData[action.row][action.cell] = CODE.FLAG_MINE;
            } else {
                tableData[action.row][action.cell] = CODE.FLAG;
            }
            return {
                ...state,
                tableData,
            }
        }
        case QUESTION_CELL: {
            const tableData = [...state.tableData];
            if (tableData[action.row][action.cell] === CODE.FLAG_MINE) {
                tableData[action.row][action.cell] = CODE.QUESTION_MINE;
            } else {
                tableData[action.row][action.cell] = CODE.QUESTION;
            }
            return {
                ...state,
                tableData,
            }
        }
        case NORMALIZE_CELL: {
            const tableData = [...state.tableData];
            if (tableData[action.row][action.cell] === CODE.QUESTION_MINE) {
                tableData[action.row][action.cell] = CODE.MINE;
            } else {
                tableData[action.row][action.cell] = CODE.NORMAL;
            }
            return {
                ...state,
                tableData,
            }
        }
        case INCREMENT_TIMER: {
            return {
                ...state,
                timer: state.timer + 1,
            }
        }
        default: // 어떤 케이스도 일치하지 않는 경우
            return state;
    }
}
//------------------------------------------------------컴포넌트
const MineSearch = () => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const { tableData, halted, timer, result } = state
    const value = useMemo(() => ({ tableData: tableData, halted: halted, dispatch }),[tableData]) //--------- Context API

    useEffect(() => {
        let timer;
        if (halted === false) {
            timer = setInterval(() => {
                dispatch({ type: INCREMENT_TIMER })
            },1000)
            return  () => { 
                clearInterval(timer)
            }
        }
    },[halted])
    return (
        <TableContext.Provider value={value}>
        
        <Form />
        <div>{timer}</div>
        <Table />
        <div>{result}</div>
        
        </TableContext.Provider>
        
    )
};

export default MineSearch;