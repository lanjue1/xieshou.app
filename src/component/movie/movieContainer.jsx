import React from 'react';

//导入路由组件
import {Route,Link,Switch} from 'react-router-dom';

//导入需要的Ant design组件
import { Layout, Menu, Icon } from 'antd';

const { Content, Sider } = Layout;

import MovieList from './movieList.jsx';
import MovieDetail from './movieDetail.jsx';

export default  class MovieContainer extends React.Component{
    constructor(props){
        super(props);
        this.state={};
    }
    render(){
        return <Layout style={{height:'100%'}}>
        <Sider width={200} style={{ background: '#fff' }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={[window.location.hash.split('/')[2]]}            
            style={{ height: '100%', borderRight: 0 }}
          >
            <Menu.Item key="in_theaters"><Link to="/movie/in_theaters/1">正在热映</Link></Menu.Item>
            <Menu.Item key="coming_soon"><Link to="/movie/coming_soon/1">即将上映</Link></Menu.Item>
            <Menu.Item key="top250"><Link to="/movie/top250/1">Top250</Link></Menu.Item>            
          </Menu>
        </Sider>
        <Layout style={{ paddingLeft:'1px'}}>          
          <Content
            style={{
              background: '#fff',
              padding: 24,
              margin: 0,
              minHeight: 280,
              flex:1,
            }}
          >
            <Switch>
              {/* 在匹配路由规则的时候，这里提供了两个参数； 如果想要从路由规则中，提取参数，需要使用
              this.props.match.params*/}
              <Route path='/movie/detail/:id' component={MovieDetail}></Route>
             <Route path="/movie/:type/:page" component={MovieList}></Route>
              
            </Switch>
              
          </Content>
        </Layout>
      </Layout>
    }
}