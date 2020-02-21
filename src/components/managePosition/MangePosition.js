import React, { Fragment } from 'react'
import { observer } from 'mobx-react-lite'
import { usePositionsStore } from './stores'


export default observer(() => {
    const {
        mainStore,
    } = usePositionsStore();
    return (
        <Fragment>
            <header>

            </header>
            <div>

            </div>
        </Fragment>
    )
})