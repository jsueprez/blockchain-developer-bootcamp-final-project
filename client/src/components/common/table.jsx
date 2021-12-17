import React from 'react';
import TableHeader from './tableHeader';
import Tablebody from './tableBody';

const Table = ({ columns, data }) => {
    return (
        <table className="table">
            <TableHeader
                columns={columns}
            />
            <Tablebody data={data} columns={columns} />

        </table>);
}

export default Table;