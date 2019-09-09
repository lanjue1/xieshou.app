import React from 'react';
import {HashRouter,Route,Link} from 'react-router-dom';
import { Layout, Menu,Icon } from 'antd';
const { Header, Footer, Sider, Content } = Layout;


require ('../src/css/logo.scss');
import MovieContainer from '../src/component/movie/movieContainer.jsx';
import HomeContainer from '../src/component/home/homeContainer.jsx';
import AboutContainer from '../src/component/about/aboutContainer.jsx';


export default class APPP extends React.Component{
    constructor(props){
        super(props);
        this.state={};
    }
    componentWillMount(){
        console.log(window.location.hash.split('/')[1]);
    }
    render(){
        return <HashRouter>
<Layout className="layout" style={{height:'100%'}}>

    {/* 头部区域 */}
    <Header>
      <div className="logo logo1"/>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={[window.location.hash.split('/')[1]]}
         /* 1.刷新一下，这个默认值永远指向1.即首页，而我们要刷新后获取当前页，所以要拿到当前页的网址
            2.用刷新后将要挂载的函数componentWillMount 来测试，
            3.经测试，在window.链接必然用location,location下有个hash，带了我们要的地址，用split来截取第二个地址即可
         */
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="home">
            <Link to="/home">首页</Link>
        </Menu.Item>
        <Menu.Item key="movie">
            <Link to="/movie">电影</Link>
        </Menu.Item>
        <Menu.Item key="about">
            <Link to="/about">关于</Link>
        </Menu.Item>
      </Menu>
    </Header>
     
{/* 侧边栏区域 */}
    

    {/* 内容区域 */}
    <Content style={{ padding: '0 50px' ,backgroundColor:'#fff'}}>
      {/* <div style={{height:'100%',width:'100%'}}>1234</div> */}
     <Route path="/home" component={HomeContainer}></Route>
     <Route path="/movie" component={MovieContainer}></Route>
     <Route path="/about" component={AboutContainer}></Route>

    </Content>


    {/* 底部区域 */}
    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
  </Layout>,
</HashRouter>
    }
}