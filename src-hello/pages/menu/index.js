import React from 'react';
import './index.scss';
import {Link} from 'react-router-dom';

import {Menu} from 'antd';
import menuList from '../../mock/menuList';
import logo from '../../imgs/logo.jpeg';
const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu

export default class MenuList extends React.Component{

    constructor(props){
        super(props);
        this.state = {

        }
    }

    renderMenuTree = data => data.map(item=>{
            if(item.children){
                return (
                    <SubMenu title={item.title} key ={item.key}>
                        {this.renderMenuTree(item.children)}
                    </SubMenu>

                    
                )
            }
            return <MenuItem key={item.key}><Link to ={item.key}>{item.title}</Link></MenuItem>
    })
    

    componentWillMount(){
        let data = this.renderMenuTree(menuList);
        this.setState({
            menuList: data
        })
    }
    render(){
        return(
            <div>
                <div className="logo">
                    <Link to ='/'>
                        <img src={logo} />
                        <span>mis后管系统 </span>
                    </Link>
                </div>
            <Menu theme='dark'>
                {this.state.menuList}
            </Menu>
            </div>

        )
    }
}