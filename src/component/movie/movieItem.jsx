import React from 'react';
require('../../css/movieListCSS.scss');
//安装 评分 差价
import { Rate } from 'antd';


//import MoIiteStyle from '../../css/movieListCSS.scss';
export default class MovieItem extends React.Component{
    constructor(props){
        super(props);
        this.state={};
    }

    render(){
        return <div className="box" onClick={this.goMovieDetail}>
            <img src={this.props.images.small} />
            <h4>名称：{this.props.title}</h4>
            <h4>上映年份：{this.props.year}</h4>
            <h4>电影类型:{this.props.genres.join(',')}</h4>
            <Rate disabled defaultValue={this.props.rating.average /2 } />
        </div>
    }
    goMovieDetail =()=>{
        //console.log(this.props.history.push)
        console.log(this.props)
        this.props.history.push('/movie/detail/'+this.props.id)
    }
}