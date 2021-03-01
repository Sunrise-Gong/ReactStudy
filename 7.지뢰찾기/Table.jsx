import React, { useContext,memo } from 'react'; //--------- Context API
import Tr from './Tr';
import { TableContext } from './MineSearch' //--------- Context API

const Table = memo(() => {
    const { tableData } = useContext(TableContext); //--------- Context API
    return (
        <table>
            {Array(tableData.length).fill().map((tr,i) => <Tr rowIndex={i} />)}
        </table>
    )
})

export default Table;