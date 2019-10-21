import React from 'react';
import ReactDOM from 'react-dom';

import Router from './router/index';  //路由文件
import { AppStore } from './stores/index'  // 全局store文件

import './index.less';

ReactDOM.render(
    <AppStore>
        <Router />
    </AppStore>,
    document.getElementById('root')
);