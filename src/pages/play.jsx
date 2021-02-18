import React from "react";

// 引入 jQuery 库
import jq from "jquery"

// 引入 nodeapi
import qsString from "querystring"

// 利用并发处理如调取接口
// 引入核心库
import axios from "axios"

//引入play.css文件
import '../assets/css/play.css'

//引入静态图片
import playtop from "../assets/images/playtop.png";

//引入封装好的接口
import { getSongDetail, getSongUrl, getLyric } from '../util/axios'


// 引入导航链接
// import { NavLink, Link } from "react-router-dom";
// import ReactDOM from 'react-dom';


class Play extends React.Component {
  constructor() {
    super();
    this.state = {
      songUrl: "",
      lyric: "",
      songName: '',
      singer: "",
      picImg: "",
      playTime:""
    };
     // 创建一个音乐播放器的ref
     this.audio = React.createRef()
  }
  componentDidMount() {
    console.log(this.props, "this.propsthis.propsthis.props");
    // 获取query参数
    // let query = this.props.location.state.slice(1)
    // let id = qsString.parse(query)

    let query = this.props.location.state

    // 组件一加载 就调取接口
    axios.all([getSongDetail({ ids: query.id }), getSongUrl({ id: query.id }), getLyric({ id: query.id })])
      .then(axios.spread((detail, songUrl, lyric) => {
        if (detail.code === 200) {
          this.setState({
            picImg: detail.songs[0].al.picUrl,
            songName: detail.songs[0].name,
            singer: detail.songs[0].ar[0].name,
          })
        }
        if (songUrl.code === 200) {
          this.setState({
            songUrl: songUrl.data[0].url,
          });
        }
        if (lyric.code === 200) {
          // 针对于返回值的歌词进行转化 replace 替换
          let lyricInfo = lyric.lrc.lyric
          console.log(lyricInfo,"lyricInfolyricInfolyricInfolyricInfo");
          // 定义一个正则，正则的目的就是去除 []
          let reg = /\[(.*?)](.*)/g

          // 指定一个空对象
          let obj = {}

          // 执行字符串替换，也可以按照我们的规则，按照正则的规则
          /*   replace() 他可以有两个参数，
              第一个  参数是要匹配的要求
              第二个  参数是根据返回的结果
          */
         lyricInfo.replace(reg,(a,b,c)=>{
          //  console.log(a,"aaaaaaa");
          //  console.log(b,"bbbbbbb");
          //  console.log(c,"ccccccc");
           b = b.slice(0,5)
           obj[b]=c
          //  console.log(obj[b]);
         })
          this.setState({
            lyric: obj,
          },()=>{
            // 获取到 audio 属性
            console.log(this.audio.current,'对象对象对象对象');
            let audio = this.audio.current
            // 实时监控音乐播放器
            audio.ontimeupdate=()=>{
              // console.log(audio.currentTime,"正在播放的时间");
              // 调用封装好的时间转化函数，用来转化正在播放的时间
              let nowTime = this.formateTime(audio.currentTime)
              console.log(nowTime,"正在播放的时间");
              // 剔除掉没有歌词的时间
              // 在 json 格式中查找 key 用 js 中 in
              if(nowTime in this.state.lyric){
                // 查到了歌词和播放时间一致的时候，我们就赋给 playTime , 证明正在播放，并给歌词添加高亮
                this.setState({
                  playTime:nowTime
                },()=>{
                  console.log(this.state.playTime,"匹配到的时间");
                  this.moveLyric()
                })
              }
            }
          });
        }
      }))


    console.log(this.props, "属性");
    // getSongUrl({ id: this.props.location.state.id })
    //   .then(res => {
    //     if (res.code === 200) {
    //       console.log(res, "内容");
    //       this.setState({
    //         songUrl: res.data[0].url,

    //       })
    //     }
    //   })

    // getLyric({ id: this.props.location.state.id })
    //   .then(res => {
    //     if (res.code === 200) {
    //       console.log(res, "歌词");
    //       this.setState({
    //         lyric: res.lrc.lyric
    //       })
    //     }
    //   })
  }
  // 封装一个 点击暂停的方法
  clickIcon(e) {
    console.log(e);
    console.log(e.target.nextSibling);
    // console.log(e.target.id);
    if (e.target.id !== "") {
      e.target.id = "";
      e.target.nextSibling.pause()

    } else {
      e.target.id = "display";
      e.target.nextSibling.play()
    }
  }

  // 封装时间转化函数
  /* 把得到的时间装换成 00:00 格式 */
  formateTime(tiemr){
    let m = (Math.floor(tiemr/60)+"").padStart(2,"0")
    let s = (Math.floor(tiemr%60)+"").padStart(2,"0")
    // console.log(`${m}:${s}`);
    return `${m}:${s}`
  }

  // 封装一个歌词滚动的方法
  moveLyric(){
    let active = document.getElementsByClassName('active')[0];
    // 找出高亮所在的位置
    // let index = jq(".songer_info-iner").children().index(active)
    let index = jq(".songer_info-iner").children().index(active)
    // 设置初始位移值 
    let offSet = 32
    // 超出的值，就加上 位移
    if(active.offsetTop>offSet){
      jq('.songer_info-iner').css('transform',`translateY(-${index*offSet}px)`)
    }
    console.log(index,'高亮');
  }
  
  render() {
    const { query, songUrl, lyric, picImg, songName, singer ,playTime} = this.state;
    return (
      <div >
        <div className='content'>
          {/* logo */}
          <div className='m-logo '>
            <img    src={playtop}></img>
          </div>

          {/* <h1>接收到的query参数是---{query.id}</h1> */}
          {/* 播放器 */}
          <div className='m-song-disc'>
            <div className='m-song-turn'>
              <div className='m-song-rollwrap'>
                <div className='m-song-img a-circling z-pause'>
                  <img className='u-img' alt="song-img" src={picImg} />

                </div>
              </div>
            </div>
            {/* 播放 */}
            {/* <span className='m-song-plybtn'src={songUrl}> */}
            {/* <audio   src={songUrl} controls autoPlay></audio> */}
            {/* <audio   src={songUrl}  autoPlay></audio> */}

            <div onClick={this.clickIcon.bind(this)}>
              <i className="iconfont icon-bofang bofang" ></i>
              <audio ref={this.audio} src={songUrl}></audio>
            </div>


            {/* </span> */}

          </div>

          {/* 歌词 */}
          <div className='songer'>
            <div className="songer_info">
              <div className="songer_title">
                <span className="songer_sname">{singer}</span>
                <span className="songer_gap">-</span>
                <span className="songer_autr">{songName}</span>
              </div>
              <div className="songer_info_con">
                <div className="songer_info_conin">
                  <div className="songer_info-iner">
                    {Object.entries(lyric).map((item,idx)=>{
                      if(playTime === item[0]){
                        // 匹配到加高亮
                        return (<p className="active" key={idx}>{item[1]}</p>)
                        // return (<p className="active" key={idx}>{item[0]}----{item[1]}</p>)
                      }else{
                        return (<p key={idx}>{item[1]}</p>)
                        // return (<p key={idx}>{item[0]}----{item[1]}</p>)
                      }
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Play;
