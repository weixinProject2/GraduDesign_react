import React from 'react';
import { useLocalStore } from 'mobx-react-lite';

export default function useStore() {
    return useLocalStore(() => ({
        loading: true,
        setLoading(value) {
            this.loading = value;
        },
        get getLoading() {
            return this.loading;
        },
        addModalStatus:false,
        setAddModalStatus(value){
            this.addModalStatus = value;
        },
        get getAddModalStatus(){
            return this.addModalStatus;
        },
        

    }))
}