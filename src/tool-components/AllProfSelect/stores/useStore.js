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

        allProfs: [], // 所有的职位选项
        get getAllProfs() {
            return this.allProfs.slice();
        },
        setProfs(data) {
            if (!this.allProfs.length > 0) {
                this.allProfs = data
            } else {
                this.allProfs = this.getAllProfs.concat(data);
            }
        },

        loading: true,
        get getLoading() {
            return this.loading
        },
        setLoading(value) {
            this.loading = value;
        },
    }))
}