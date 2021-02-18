import React from "react";
//引入静态资源图片
import search from '../assets/images/search.png'
//引入css文件
import '../assets/css/search.css'

// 引入封装好的接口
import { getSearch, getHotSearch, getSearchSuggest } from "../util/axios/index"

// 引入导航链接
import { Link } from "react-router-dom";
class Search extends React.Component {
    constructor() {
        super();
        this.state = {
            hotList: [],
            lenovoList: [],
            searchList: [],
            // 联想
            albums: [],
            artists: [],
        };
        this.inp = React.createRef();
        this.val = "";
    }

    //封装一个键盘抬起事件
    keyUp(e) {
        this.val = e.target.value

        console.log(e.target.value, "e.target.value");
        // 剔除空状态
        if (e.target.value === "" || e.keyCode === 32) {
            // 把搜索列表 置空
            this.setState({
                searchList:[]
            })
            // 把中间值 val 置空
            this.val = "" 
            return;
        }
        //调取搜索接口
        this.getSearchList(e.target.value)




        // 判断 input 的值是否为空
        if (e.target.value !== "") {
            /* 调取联想 */
            // this.getSearchSuggestList(e.target.value)
        }

        // if (e.keyCode == 13) {
        //     console.log(e.target.value, "e.target.value");
        //     // 剔除空状态
        //     if(e.target.value === "" ){
        //         return;
        //     }
        //     //调取搜索接口
        //     this.getSearchList(e.target.value)
        // }
    }
    componentDidMount() {
        this.getHotSearchList()
    }
    // shouldComponentUpdate(newProps,newState){
    //     // 参数分别为改变之前的数据状态对象
    //     if(newState.val!==""){
    //         console.log(newState.val,"前");
    //         return true
    //     }else{
    //         return false
    //     }
    // }
    //封装一个 搜索方法
    getSearchList(keywords) {
        getSearch({ keywords })
            .then(res => {
                if (res.code === 200) {
                    console.log(res, "搜索方法");
                    this.setState({
                        searchList: res.result.songs.filter((item, i) => i < 10)
                    })
                }
            })
            .catch(err => {
                console.log(err, "请求失败");
            })
    }


    //封装一个 搜索建议
    getSearchSuggestList(keywords) {
        getSearchSuggest({ keywords })
            .then(res => {
                if (res.code === 200) {
                    console.log(res, "搜索建议");
                    this.setState({
                        // lenovoList: res.result.songs.filter((item, i) => i < 10)
                        albums: res.result.albums,
                        artists: res.result.artists,
                    })
                }
            })
    }

    //封装一个 热搜歌曲 的方法
    getHotSearchList() {
        getHotSearch()
            .then(res => {
                if (res.code === 200) {
                    console.log(res, "热搜歌曲");
                    this.setState({
                        hotList: res.data.filter((item, i) => i < 10)
                    })
                }
            })
    }

    //清空事件
    del() {
        this.setState({
            searchList: [],
        })
        this.inp.current.value = ''
    }

    // 封装一个点击渲染 input 的值
    hotInput(keywords) {
        // console.log(a,"我是打印的值。。。。");
        this.getSearchList(keywords)
        this.inp.current.value = keywords
    }
    render() {
        const { hotList, lenovoList, searchList, artists, albums } = this.state;

        this.val = this.inp.current ? this.inp.current.value : "";

        /* 热门搜索 */
        let hotInfo = (<div className='con'>
            <p>热门搜索</p>
            <ul className='list'>
                {
                    hotList.map((item) => {
                        return (
                            <li className='song' key={item.searchWord}>
                                <div className="cont" onClick={this.hotInput.bind(this, item.searchWord)}>
                                    {item.searchWord}
                                </div>
                            </li>
                        );
                    })
                }
            </ul>
        </div>
        );

        /* 搜索歌曲 */
        let searchInfo = (<div>
            <ul className="searchList" >
                {searchList.map((item, idx) => {
                    return (
                        <Link to={
                            {
                                pathname: '/play',
                                state: {
                                    id: item.id,
                                    picUrl:item.album.artist.img1v1Url
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
                                                {item.artists[0].name} - {item.name}</div>
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
        </div>)


        return (
            <div>
                <div className='box'>
                    <img src={search} alt="" />
                    <input type="text" placeholder='搜索歌曲、歌手、专辑' className='input' ref={this.inp} onKeyUp={this.keyUp.bind(this)} />
                    {this.val ? <span className='reset' onClick={this.del.bind(this)}>×</span> : ""}
                </div>
                {/* 联想歌曲 */}
                {/* {val ? <div>
                    <ul className="lenovoList" >
                        <li  className="name">搜索{val}</li>id
                        {
                            artists.map((item) => {
                                return (
                                    <li key={item.id}>
                                        <span className="name">{item.name}</span>
                                    </li>
                                )
                            })
                        }
                         {
                            albums.map((item) => {
                                return (
                                    <li key={item.id}>
                                        <span className="name">{item.name}</span>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div> : ""} */}

                {/* 搜索歌曲列表 */}
                {/* {falg===true ? <div>nihao </div> :<div className="search_song"></div>} */}

                {/* 利用条件判断 判断是否显示搜索列表 */}
                {searchList.length > 0 ? searchInfo : hotInfo}
            </div>
        );
    }
}
export default Search;
