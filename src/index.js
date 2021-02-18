import React from 'react';
import ReactDOM from 'react-dom';
// 引入全局的 js 和 css
import './assets/js/rem.js'
import './assets/css/reset.css'

// 引入 icon-font 
import "./assets/css/icon-font/iconfont.css"

import './index.css';
import App from './App';

// 引入路由模式的方法
import {BrowserRouter} from 'react-router-dom'

ReactDOM.render(
  <BrowserRouter>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </BrowserRouter>
  ,
  document.getElementById('root')
);


