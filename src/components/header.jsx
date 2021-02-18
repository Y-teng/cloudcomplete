import React from 'react'
//引入静态图片
import header from "../assets/images/header.png";
/* 
对于普通嵌套组件，它没有路由的配置对象，如何解决
我们可以调用，路由的高阶函数
高阶函数：函数(组件)  通过调用函数return一个新组件
*/
// 引入配置路由对象的方法
import {withRouter} from 'react-router-dom'
class Home extends React.Component {
      //跳转播放的方法
  goPlay() {
    console.log(this,"触发跳转播放");
    //通过编程式导航进行跳转
     this.props.history.push('/play')
  }
    render() {
        return (<div className='header'>
            {/* 头部标题 */}
            <div >
                <img onClick={this.goPlay.bind(this)} className='title' src={header}></img>
                <span className='load' >下载APP</span>
            </div>
        </div>)
    }
}


export default withRouter(Home);