import React from 'react';

const Node = ({item, onAddNode, onDeleteNode, onChange}) => {
    const {id, title, root} = item;
    return  (
        <li className="node">
            <input
                type="text"
                id={id}
                value={title}
                onChange={onChange}
            />
            <div className="node__buttons">
                <button className="button__add" onClick={() => onAddNode(id)}>Add</button>
                { root ? '' : <button className="button__remove" onClick={() => onDeleteNode(id)}>Remove</button> }
            </div>
        </li>
    );
};

export default Node;
