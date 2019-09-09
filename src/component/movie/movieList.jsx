import React from 'react';
import { Spin, Alert } from 'antd';
import fetchJSONP from 'fetch-jsonp';
import MovieItem from './movieItem.jsx';


import { Pagination } from 'antd';
export default class MovieList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            movies:[], //电影列表
            nowPage:parseInt(props.match.params.page)||1,  //当前第几页的数据
            pageSize:18, //每页显示多少条数据
            total:0, // 当前电影分类下，总共有多少条数据；
            isloading:true,  // 数据是否正在加载，如果为true,表示正在加载数据；
            movieType: props.match.params.type, //保存一下 要获取的电影的类型
        };
    }

    //在React 中，我们可以使用fetch API来获取数据， fetch 是基于Promise封装的；
    // 当使用 fetch API 获取数据的时候， 第一个.then 中，获取不到数据，拿到的是一个Response对象，我们可以
    // 调用response.json() 得到一个新的 promise 
    componentWillMount(){
        /* console.log('ok');
        fetch('http://vue.studyit.io/api/getlunbo')
        .then(response =>{
           return response.json();
        }).then(data =>{
            console.log(data);
        }); 
        setTimeout(()=>{
            // 假设1s后数据加载出来了
            this.setState({
                isloading:false
            });
        },1000);*/

        this.loadMovieList();

    }
    componentWillReceiveProps(nextProps){ //在 热映、即将上线、top250之间切换的时候，数据需要更新，组件将要接收新属性
        //console.log(nextProps.match);
        // 每当地址栏，变化的时候，重置state中的参数项，重置完毕之后，我们可以重新发起数据请求；
        this.setState({
            nowPage:parseInt(nextProps.match.params.page)||1,
            isloading:true,
            movieType: nextProps.match.params.type,
            
            
        },function(){ // 重置完毕后，别忘记回调函数拿到数据；
            this.loadMovieList();
        });

    }
    render(){
        return <div>
            {this.loadingList()}
        </div>
    }

    loadMovieList=()=>{ /* 注意： 默认的window.fetch 收到跨域限制时，无法直接使用，我们使用第三方包
                        fetch-jsonp 来发生JSONP请求，它的用法，和浏览器内置的fetch完全兼容*/
        //fetch('https://douban.uieee.com/v2/movie/in_theaters')
        /* 因为要获取热映、即将上映、TOP250的数据，获取数据的链接不能写死 */
        // 开始获取数据的索引
     // const starting=this.state.pageSize*(this.state.nowPage-1)  // 第一页从0开始加载数据，第二页从16开始加载数据
     //const url1='https://douban.uieee.com/v2/movie/${this.state.movieType}?start=${starting}&count=${this.state.pageSize}'
     const start = this.state.pageSize*(this.state.nowPage - 1)
        const url = `https://douban.uieee.com/v2/movie/${this.state.movieType}?start=${start}&count=${this.state.pageSize}`
        fetchJSONP(url)
        .then(response =>response.json())
        .then(data =>{
            this.setState({
                isloading:false,  //将loading 效果隐藏
                movies:data.subjects, //为电影列表重新赋值
                total:data.total //把总条数，保存到data上，
            })
        }) 

        /* const testData=require('../test_data/in_theaters.json')
        setTimeout(()=>{
            this.setState({
                isloading:false,  //将loading 效果隐藏
                movies:testData.subjects, //为电影列表重新赋值
                total:testData.total //把总条数，保存到data上，
            })
        },1000) */
    }

    loadingList =()=>{
        if(this.state.isloading){
            return <Spin tip="Loading..." style={{margin:'auto',height:'100px'}}>
            <Alert 
              message="正在加载电影..."
              description="敬请期待"
              type="info"
            />
          </Spin>
        }else{
            return <div style={{display:'flex',flexWrap:'wrap'}}>
                {this.state.movies.map((item)=>{
                    return <MovieItem {...item} key={item.id} history={this.props.history}></MovieItem> 
                })}
                <div>
                
                </div>
                    
                <div style={{clear:"both"}}>
                
                <Pagination defaultCurrent={this.state.nowPage} pageSize={this.state.pageSize}
                 total={this.state.total}
                 onChange={this.pageChanged} />
                </div>
                
            </div>

        }
    }

    //当页码改变是，加载新一页的数据,同时页面链接也改变；给页码改变时添加一个事件，使得页码改变的同时链接也改变；
    pageChanged =(page)=>{ 
        //由于我们手动使用BOM对象，实现了跳转，这样不好，最好使用 路由的方法，进行编程式导航；console.log(this.props)
        //window.location.href='/#/movie/'+this.state.movieType+'/'+page
        // 使用react-router-dom 实现编程式导航即： this.props.history；
        //console.log(this.props)
        this.props.history.push('/movie/'+this.state.movieType+'/'+page)
    }

}