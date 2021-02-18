import React from 'react'

// 引入 index.css  文件
import "../assets/css/index.css";
// 引入路由的插件
import { Switch, Route, Redirect, NavLink } from 'react-router-dom'
//引入封装好的头部组件
import Header from '../components/header'
//引入二级路由
import Recommended from "../views/recommended"
import HotRank from "../views/hotRank"
import Search from "../views/search"
class Index extends React.Component {
    render() {
        return (<div className="index">
            {/* 头部标题 */}
            <Header></Header>
            {/* 二级路由导航 */}
            <div  className="navbar">
                <NavLink to="/index/rec"  activeClassName='active'>推荐音乐</NavLink>
                <NavLink to="/index/hotRank"  activeClassName='active'>热歌榜</NavLink>
                <NavLink to="/index/search"  activeClassName='active'>搜索</NavLink>
            </div>
           
            {/* 二级路由出口 */}
            <Switch>
                <Route path='/index/rec' component={Recommended}></Route>
                <Route path='/index/hotRank' component={HotRank}></Route>
                <Route path='/index/search' component={Search}></Route>
                {/* 路由重定向 */}
                <Redirect to='/index/rec'></Redirect>
            </Switch>
        </div>)
    }
}
export default Index