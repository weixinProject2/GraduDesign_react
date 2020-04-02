import React from 'react';
import { useLocalStore } from 'mobx-react-lite';

export default function useStore() {
    return useLocalStore(() => ({
        
    }))
}