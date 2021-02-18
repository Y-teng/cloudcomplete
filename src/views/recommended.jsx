import React from "react";

// 引入封装好的接口
import { personalized, getNewsong } from "../util/axios/index"

//引入路由导航
import { NavLink, Link } from 'react-router-dom'
// 引入 css 样式
import "../assets/css/recommended.css"

class Recommend extends React.Component {
    constructor() {
        super();
        this.state = {
            //  img:Img1,
            recList: [],
            songList: [],
        };
    }
    // 组件挂载完成
    componentDidMount() {
        this.getPerSon();
        this.getNewsongList()
    }
    // 封装一个获取歌单的方法
    getPerSon() {
        personalized({ limit: 6 })
            .then(res => {
                if (res.code === 200) {
                    this.setState({
                        recList: res.result
                    })
                }
                console.log(res, '推荐歌单列表');
            })
    }
    // 封装一个获取 最新音乐的接口 的方法
    getNewsongList() {
        getNewsong()
            .then(res => {
                if (res.code === 200) {
                    this.setState({
                        songList: res.result
                    })
                    console.log(res, '最新歌单列表');
                }
            })
    }

    //跳转到列表页事件
    goList(id) {
        //路由嵌套。含有路由配置对象
        console.log(this.props, '实现跳转');
        //编程式导航 push() 在历史记录中添加一条数据
        //replace 替换当前这条数据
        //go(n)  n是整数
        //goBack()  函数方法
        this.props.history.push('/list/' + id)
        //this.props.history.replace('/list/'+id)
    }


    render() {
        const { recList, songList } = this.state;
        return (
            <div className="remd">
                {/* 推荐歌单 */}
                <div>
                    <h2 className="remd_tl">推荐歌单</h2>
                </div>
                <div className="remd_song">
                    <ul className="remd_ul">
                        {/* 通过路由导航进行跳转 */}
                        {recList.map((item) => {
                            return (
                                <Link key={item.id} to=
                                    {{
                                        pathname: '/list',
                                        state: {
                                            id: item.id,
                                
                                        }
                                    }}
                                >
                                    <li className="remd_li">
                                        <div className="img_song">
                                            <img src={item.picUrl} alt="" />
                                            <i className="iconfont icon-erji1">165.4万</i>
                                        </div>
                                        <p className="remd_text">{item.name}</p>
                                    </li>
                                </Link>
                            );
                        })}
                    </ul>
                </div>
                {/* 最新歌单 */}
                <div>
                    <h2 className="remd_tl">最新歌单</h2>
                </div>

                {/* 最新歌单列表 */}
                <ul>
                    {/* 路由导航进行跳转 */}
                    {songList.map((item, idx) => {
                        return (
                            <Link to={
                                {
                                    pathname: '/play',
                                    state: {
                                        id: item.id,
                                        picUrl: item.picUrl
                                    }
                                }
                            } key={item.id} className="hotcont">
                                <li className="song">
                                    <div className="song_list">
                                        <div className="song_na">
                                            <div className="song_name">
                                                <div className="name">{item.name}
                                                    <span>
                                                        {item.song.alias}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="song_author">
                                                <div className="author">
                                                    <div className="sq_icon">
                                                        <div className="icon">SQ</div>
                                                    </div>
                                                    {item.song.artists[0].name} - {item.name}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="song_icon">
                                            <i className="iconfont icon-bofang"></i>
                                        </div>
                                    </div>


                                </li></Link>

                        );
                    })}
                </ul>
            </div>
        );
    }
}
export default Recommend;
