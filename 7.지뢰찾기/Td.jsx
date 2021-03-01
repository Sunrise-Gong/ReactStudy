import React, { useContext, useCallback, memo, useMemo } from 'react';
import { TableContext, CODE, OPEN_CELL, CLICK_MINE, FLAG_CELL, QUESTION_CELL, NORMALIZE_CELL } from './MineSearch'
//------------------------------------------------------
const getTdStyle = (code) => {
    switch (code) {
        case CODE.NORMAL:
        case CODE.MINE: // 안눌렀을 때 검정
            return {
                background: "#444",
            };
        case CODE.OPENED: // 열었을 때 화이트
            return {
                background: 'white'
            };
        case CODE.QUESTION_MINE:// ? 는 노랑
        case CODE.QUESTION:
            return {
                background: 'yellow',
            };
        case CODE.FLAG_MINE: // 깃발은 빨강
        case CODE.FLAG:
            return {
                background: 'red',
            }

        default:
            return {
                background: 'white'
            }

    }
};
//------------------------------------------------------
const getTdText = (code) => {
    switch (code) {
        case CODE.NORMAL:
            return '';
        case CODE.MINE:
            return 'X';
        case CODE.CLIKED_MINE:
            return '펑';
        case CODE.FLAG_MINE:
        case CODE.FLAG:
            return '!';
        case CODE.QUESTION_MINE:
        case CODE.QUESTION:
            return '?';
        default:
            return code || '';
    }
};
//------------------------------------------------------ 컴포넌트
const Td = memo(({ rowIndex, cellIndex }) => {
    const { tableData, dispatch, halted } = useContext(TableContext)

//------------------------------------------------------ 칸 클릭시 반응
    const onClickTd = useCallback(()=> {
        if (halted) {
            return;
        }
        switch (tableData[rowIndex][cellIndex]) {            
            case CODE.OPENED:
            case CODE.FLAG_MINE:
            case CODE.FLAG:
            case CODE.QUESTION_MINE:
            case CODE.QUESTION: // 여기까지는 눌러도 반응 없어야 하는 경우
                return;
            
            case CODE.NORMAL:
                dispatch({type: OPEN_CELL, row: rowIndex, cell: cellIndex });
                return;
            
            case CODE.MINE:
                dispatch({type: CLICK_MINE, row: rowIndex, cell: cellIndex })
                return;
        }
    },[tableData[rowIndex][cellIndex], halted]);
//------------------------------------------------------
    const onRightClickTd = useCallback((e) => {
        e.preventDefault();
        if (halted) {
            return;
        }
        switch (tableData[rowIndex][cellIndex]) {
            case CODE.NORMAL:
            case CODE.MINE:
                dispatch({ type: FLAG_CELL, row: rowIndex, cell: cellIndex });
                return;
            case CODE.FLAG_MINE:
            case CODE.FLAG:
                dispatch({ type: QUESTION_CELL, row: rowIndex, cell: cellIndex });
                return;
            case CODE.QUESTION_MINE:
            case CODE.QUESTION:
                dispatch({ type: NORMALIZE_CELL, row: rowIndex, cell: cellIndex });
                return;
            default:
                return;
        }
    },[tableData[rowIndex][cellIndex], halted]);

//------------------------------------------------------
    console.log('Td rendered')
    return useMemo (() => (
        <td 
        style={getTdStyle(tableData[rowIndex][cellIndex])}
        onClick={onClickTd}
        onContextMenu={onRightClickTd}
        >{getTdText(tableData[rowIndex][cellIndex])}</td>
    ), [tableData[rowIndex][cellIndex]]);
})

export default Td;