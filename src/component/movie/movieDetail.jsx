import React from 'react';
import { Button, Icon } from 'antd';
import fetchJSONP from 'fetch-jsonp';
const ButtonGroup = Button.Group;
import { Spin, Alert } from 'antd';

export default class MovieDetail extends React.Component{
    constructor(props){
        super(props);
        this.state={
            info:{}, //电影信息对象
            isloading:true
        };
    }

    componentWillMount(){
        fetchJSONP('https://douban.uieee.com/v2/movie/subject/'+this.props.match.params.id)
        .then(response=>response.json())
        .then(data=>(
            console.log(this.props),
            this.setState({
                info:data,
                isloading:false
            })

        ));
    }
    render(){
        return <div>
        <ButtonGroup onClick={this.goback}>
      <Button type="primary">
        <Icon type="left" />
        返回上一层
      </Button>      
    </ButtonGroup>
        {this.getMovieInfo()}
        </div>
    }
    goback =()=>{
        this.props.history.go(-1)
    }
    getMovieInfo =()=>{
        if(this.state.isloading){
            return <Spin tip="Loading..." style={{margin:'auto',height:'100px'}}>
            <Alert 
              message="正在加载电影详情"
              description="敬请期待"
              type="info"
            />
          </Spin>
        }else{
            return <div>
                <div style={{textAlign:'center'}}>
                <h1>{this.state.info.title}</h1>
        
        <img src={this.state.info.images.small} alt=""/>
                </div>
        
        
        <p style={{textIndent:'2em',lineHeight:'30px',marginTop:'15px'}}>{this.state.info.summary}</p>
            </div>
            
        }
    }
}