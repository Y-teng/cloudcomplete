/* eslint-disable no-undef */
import React from 'react';

// 引入 css 样式
import "../assets/css/hotRank.css"

//引入封装好的 热门榜单 接口
import { hotList } from "../util/axios"


// 引入导航链接
import { Link } from "react-router-dom";
class HotRank extends React.Component {
    constructor() {
        // 继承父级组件的数据
        super();
        this.state = {
            hotList: []
        }
    }
    //组件挂载
    componentDidMount() {
        this.getHostList();
    }
    // 封装一个获取热门榜单的接口
    getHostList() {
        hotList()
            .then(res => {
                console.log(res, '热门榜单');
                if (res.code === 200) {
                    this.setState({
                        hotList: res.playlist.tracks.filter((item, i) => i < 20)
                    })
                }
            })
    }
    render() {
        const { hotList } = this.state;
        return (<div className="hotRank">
            <div className="hotop">
                <div className="hotopct">
                    <div className="u-hmsprt hoticon"></div>
                    <div className="hottime">更新日期：01月28日</div>
                </div>
            </div>
            <ul>
                {/* 路由导航进行跳转 */}
                {hotList.map((item, idx) => {
                    return (
                        <Link to={
                            {
                                pathname: '/play',
                                state: {
                                    id: item.id,
                                    picUrl:item.al.picUrl
                                }
                            }
                        } key={item.id} className="hotcont">
                            <li className="song">


                                <div className="song_list">
                                    <div className="song_number">
                                        <p>{idx + 1}</p>
                                    </div>
                                    <div className="song_na">
                                        <div className="song_name">
                                            <div className="name">{item.name} 
                                            <span>
                                                {item.alia}
                                            </span>
                                             
                                             </div>
                                        </div>
                                        <div className="song_author">
                                            <div className="author">
                                                <div className="sq_icon">
                                                    <div className="icon">SQ</div>
                                                </div>
                                                {item.ar[0].name} - {item.name}</div>
                                        </div>
                                    </div>
                                    <div className="song_icon">
                                        <i className="iconfont icon-bofang"></i>
                                    </div>
                                </div>


                            </li></Link>

                    );
                })}
                {/* 通过编程式导航进行跳转 */}
                {/* {hotList.map((item, idx) => {
                return (
                  <li onClick={this.goPlay.bind(this,item.id)} key={item.id}>
                    {idx + 1}、{item.songname}
                  </li>
                );
              })} */}
            </ul>
        </div>);

    }
}

export default HotRank;