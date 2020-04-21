import React, { Fragment, useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useScrumStore } from './stores'
export default observer((props) => {
    const [ins, setIn] = useState(false);
    const { canDragIn, status, dragTo, children } = props;

    const { STATUS_CODE } = useScrumStore();

    function handleDragEnter(e) {
        e.preventDefault();
        if (canDragIn) {
            setIn(true);
        }
    }
    function handleDragLeave(e) {
        e.preventDefault();
        if (canDragIn) {
            setIn(false);
        }
    }
    function handleDrop(e) {
        e.preventDefault();
        dragTo(status);
        setIn(false);
    }

    return (
        <Fragment>
            <div
                id={`col-${status}`}
                className={'col'}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragEnter}
                onDrop={handleDrop}
            >
                <header className={`col-header col-header-${status}`} >
                    {STATUS_CODE[status]}
                </header>
                <main className={'col-main' + (ins ? ' active' : '')}>
                    {children}
                </main>
            </div>
        </Fragment>
    )
})