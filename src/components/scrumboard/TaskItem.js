import React, { Fragment, useContext } from 'react';


export default ((props) => {
    const {
        id, title, point, username, active, onDragEnd, onDragStart,
    } = props;

    function handleDragStart() {
        onDragStart(id);
    }

    return (
        <div
            onDragStart={handleDragStart}
            onDragEnd={onDragEnd}
            id={`item-${id}`}
            className={'item' + (active ? ' active' : '')}
            draggable="true"
        >
            <header className="item-header">
                <span className="item-header-username">{username}</span>
                <span className="item-header-point">{point}</span>
            </header>
            <main className="item-main">{title}</main>
        </div>
    )
})