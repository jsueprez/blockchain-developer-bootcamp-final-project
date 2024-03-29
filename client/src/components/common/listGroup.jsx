import React from 'react';

const ListGroup = ({ items, textProperty, valueProperty, selectedItem, onItemSelect }) => {
    return (
        <ul className="list-group clickable">
            {items.map(item =>
                <li key={item[valueProperty]}
                    onClick={() => onItemSelect(item)}
                    className={item === selectedItem ? "list-group-item active" : "list-group-item"} >
                    {item[textProperty]}
                </li>
            )
            }
        </ul >
    );
}

ListGroup.defaultProps = {
    textProperty: 'name',
    valueProperty: '_id'
};

export default ListGroup;