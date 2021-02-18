import React from 'react'

// 引入静态样式
import "../assets/css/list.css"
//引入路由导航
import { NavLink, Link } from 'react-router-dom'

// 引入封装好的接口
import { getPlayList } from "../util/axios/index"

class List extends React.Component {
    constructor() {
        super();
        this.state = {
            playList: [],
            playImg: "",
            playCount: 0,
            playName: "",
            creator: "",
            nickname: "",
        }
    }
    //生命周期挂载
    componentDidMount() {
        this.getPlayListSon()
    }
    //  封装一个获取歌单的方法
    getPlayListSon() {
        getPlayList({ id: this.props.location.state.id })
            .then(res => {
                if (res.code === 200) {
                    this.setState({
                        playList: res.playlist.tracks,
                        playImg: res.playlist.coverImgUrl,
                        playName: res.playlist.name,
                        playCount: res.playlist.playCount,
                        creator: res.playlist.creator.avatarUrl,
                        nickname: res.playlist.creator.nickname,
                    })
                }
                console.log(res.playlist, '推荐歌单列表详情！！！');
            })
    }
    render() {
        const { playList, playImg, playName, playCount, creator, nickname } = this.state;
        return (<div>
            <div className="songTop">
              {/*   <div className="songTOP">
                    <div className="songTOP_in">

                    </div>
                </div> */}
                <div className="songTop_in fl">
                    <div className="left">
                        <div className="img_song">
                            <img src={playImg} alt="" />
                            <i className="iconfont icon-erji1">{(playCount / 10000).toFixed(1)}万</i>
                        </div>

                    </div>
                    <div className="right fl">
                        <div className="right_in">
                            <p className="right_in_text">{playName}</p>
                        </div>
                        <div className="songImg songPic">
                            <div className="songImg_in">
                                <img src={creator} alt="" className="songImg_img" />
                                <p className="songImg_Text">{nickname}</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>


            <div className="pylst_list">
                <h3>歌曲列表</h3>
            </div>


            {/* 最新歌单列表 */}
            <ul>
                {/* 路由导航进行跳转 */}
                {playList.map((item, idx) => {
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
                                                    {item.alia}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="song_author">
                                            <div className="author">
                                                <div className="sq_icon">
                                                    <div className="icon">SQ</div>
                                                </div>
                                                {item.ar[0].name}
                                                     - {item.name}
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
        </div >)
    }
}
export default List