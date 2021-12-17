import React, { Component } from 'react';

class TableHeader extends Component {
    render() {
        return (
            <thead>
                <tr>
                    {this.props.columns.map(column => (
                        <th className="clickable"
                            key={column.path || column.key}

                        >
                            {column.label}
                        </th>))}
                </tr>
            </thead>);
    }
}

export default TableHeader;