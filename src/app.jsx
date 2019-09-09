import React from 'react';
import {HashRouter,Route,Link} from 'react-router-dom';
import Home from '../src/component/home.jsx';
import About from '../src/component/about.jsx';
import Movie from '../src/component/movie.jsx';
import {DatePicker} from 'antd';
//全局导入ant design样式表，一般，我们使用的第三方UI组件，他们的样式文件，都是
//以.CSS结尾的，所以最好不要为.css后缀名的文件启用模块化；改为给scss；
//推荐，不要直接手写.css文件，而是自己手写scss或less文件，这样，我们只需要为scss文件或Less文件启用模块化就好；
//import 'antd/dist/antd.css';

export default class ConApp extends React.Component{
    constructor(props){
        super(props);
        this.state={};
    }
    render(){
        return <HashRouter>
            <div>
                <h1>这是网址APP根组件</h1>

                <DatePicker></DatePicker>
                <hr/>
                <Link to="/home">首页</Link>&nbsp;&nbsp;
                <Link to="/movie">电影</Link>&nbsp;&nbsp;
                <Link to="/about">关于</Link>&nbsp;&nbsp;
                <hr/>
                <Route path="/home" Component={Home}></Route>
                <Route path="/movie" Component={Movie}></Route>
                <Route path="/about" Component={About}></Route>

            </div>
            
        </HashRouter>
    }
}