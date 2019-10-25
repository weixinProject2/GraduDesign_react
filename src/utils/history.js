import { createHashHistory } from 'history'


const history = createHashHistory({
    basename: '',             //基链接
    forceRefresh: true        //是否强制刷新
});


export default history