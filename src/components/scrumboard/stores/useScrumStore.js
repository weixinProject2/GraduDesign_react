import { useLocalStore } from 'mobx-react-lite';

import { getAllSprintSelect, getAllMyjobs, changeProblemDetail } from '../../../api';
import { message } from 'antd';
import { getScrumBoardStatus, parseStatusCode } from '../../../Constants';

export default function useScrumStore() {
    return useLocalStore(() => ({
        allSprint: [],
        setAllSprint(value) {
            this.allSprint = value;
        },
        get getAllSprint() {
            return this.allSprint.slice();
        },

        selectedSprint: '',
        setSelectSprint(value) {
            this.selectedSprint = value;
        },
        get getSeletSprint() {
            return this.selectedSprint;
        },

        selectLoading: false,

        loadProfs(projectId) {
            this.selectLoading = true;
            const obj = {
                projectId,
            }
            getAllSprintSelect(obj).then(async (res) => {
                if (!res.error) {
                    this.selectLoading = false;
                    this.setAllSprint(res.list);
                    this.setSelectSprint(res.list.length > 0 && res.list[0].sprintId);
                } else {
                    message.error(res.message);
                }
            })
        },

        boardLoading: false,
        btnDisabled: false,
        jobLists: [],
        setJobLists(value) {
            const arr = value.map((item, key) => {
                item.statusNum = item.status;
                item.status = getScrumBoardStatus(item.status);
                return item
            });
            this.jobLists = arr;
        },
        changeJobStatus(value) {
            const obj = {
                problemId: value.problemId,
                status: parseStatusCode(value.status),
            }
            changeProblemDetail(obj).then((res) => {
                if (!res.error) {
                    this.joblists = this.jobLists.map((item, key) => {
                        if (item.problemId === value.problemId) {
                            item = value;
                        }
                        return item
                    });
                } else {
                    message.error(res.message);
                }
            })
        },
        get getAlljobLists() {
            return this.jobLists.slice();
        },
        loadMyJob(projectId) {
            this.boardLoading = true;
            this.btnDisabled = true;
            const obj = {
                projectId,
                sprintId: this.getSeletSprint,
            }
            getAllMyjobs(obj).then((res) => {
                if (!res.error) {
                    this.setJobLists(res.list);
                    this.boardLoading = false;
                    this.btnDisabled = false;
                } else {
                    message.error(res.message);
                    this.boardLoading = true;
                }
            })
        },
        editData:'',
        setEditData(value){
            this.editData =value;
        },
    }))
}