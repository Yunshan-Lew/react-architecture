import React, { Component } from 'react';
import { Link } from 'react-router';
import { Menu } from 'antd';

const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup

function Topnavigator(props){
	return(			
		<Menu mode="horizontal" className="pull-left" selectedKeys={[ props.selection ]} style={{ lineHeight: '62px' }} >
			<Menu.Item key="1">
				<Link to="/employee/list">用户管理</Link>
			</Menu.Item>
		</Menu>
	)
}

export default Topnavigator
