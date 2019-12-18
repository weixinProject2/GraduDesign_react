import { useLocalStore } from 'mobx-react-lite';
export default function useStore() {
    return useLocalStore(() => ({
        params: {
            size: 100,
            page: 1
        },
        get getParams() {
            return this.params;
        },

        allPostions: [], // 所有的职位选项
        get getAllPos() {
            return this.allPostions.slice();
        },
        setPosition(data) {
            if (!this.allPostions.length > 0) {
                this.allPostions = data
            } else {
                this.allPostions = this.getAllPos.concat(data);
            }
        },

        loading: true,
        get getLoading() {
            return this.loading
        },
        setLoading(value) {
            this.loading = value;
        }
    }))
}