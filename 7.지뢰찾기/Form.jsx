import React,{ useState, useCallback, useContext, memo } from 'react';
import { START_GAME,TableContext } from './MineSearch';

const Form = memo(() => {
    const [row, setRow] = useState(10); // 가로 몇칸 만들지
    const [cell, setCell] = useState(10); // 세로 몇칸 만들지
    const [mine, setMine] = useState(20); // 지뢰 몇개 심을지
    //const value = useContext(TableContext);
    const { dispatch } = useContext(TableContext); //--------- Context API

//------------------------------------------------------
    const onChangeRow = useCallback((e) => {
        setRow(e.target.value)
    },[])

    const onChangeCell = useCallback((e) => {
        setCell(e.target.value)
    },[])

    const onChangeMine = useCallback((e) => {
        setMine(e.target.value)
    },[])

//------------------------------------------------------ 시작버튼 
    const onClickBtn = useCallback(() => {
        dispatch({ type: START_GAME, row, cell, mine })
    },[row, cell, mine])

//------------------------------------------------------
    return (
        <div>
            <input type="number" placeholder="세로" value={row} onChange={onChangeRow}/>
            <input type="number" placeholder="가로" value={cell} onChange={onChangeCell}/>
            <input type="number" placeholder="세로" value={mine} onChange={onChangeMine}/>
            <button onClick ={onClickBtn}>시작</button>
        </div>
    )
});

export default Form;