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
			<Menu.Item key="2">
				<Link to="/employee/list">鉴标管理</Link>
			</Menu.Item>
			<Menu.Item key="3">
				<Link to="/employee/list">运营管理</Link>
			</Menu.Item>
			<Menu.Item key="4">
				<Link to="/employee/list">财务管理</Link>
			</Menu.Item>
			<Menu.Item key="5">
				<Link to="/employee/list">系统管理</Link>
			</Menu.Item>
		</Menu>
	)
}

export default Topnavigator
