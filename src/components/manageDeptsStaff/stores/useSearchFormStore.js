
import { useLocalStore } from 'mobx-react-lite';

export default function useStore() {
    return useLocalStore(() => ({
        allProfession: [], //所有的职业选项
        get getAllPf() {
            return this.allProfession.slice();
        },
        setPf(data) {
            this.allProfession = data;
        },

        allPostions: [], // 所有的职位选项
        get getAllPos() {
            return this.allPostions.slice();
        },
        setPosition(data) {
            this.allPostions = data;
        },

        
    }))
}