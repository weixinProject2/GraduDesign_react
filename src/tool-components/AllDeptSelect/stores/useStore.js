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

        allDepts: [], // 所有的职位选项
        get getAllDepts() {
            return this.allDepts.slice();
        },
        setDepts(data) {
            if (!this.allDepts.length > 0) {
                this.allDepts = data
            } else {
                this.allDepts = this.getAllDepts.concat(data);
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