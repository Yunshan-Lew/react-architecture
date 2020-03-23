import React, { Component } from 'react';
import { Link } from 'react-router';
import { Menu, Dropdown, Button } from 'antd';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';

const MenuItem = Menu.Item

class Topbuttons extends Component {
	constructor(props){
		super(props)
		this.state = {

		}
	}

	handleLogout = () => {
		console.log('done')
	}

	render(){
		const menu = (
			<Menu>
				<MenuItem>
					<div onClick={ this.handleLogout }>
						<LogoutOutlined /> 退出登录
					</div>
				</MenuItem>
			</Menu>
		)

		return (
			<Dropdown overlay={ menu } placement="bottomLeft">
				<Button className="top-buttons" icon={ <UserOutlined /> }>
					User Name
				</Button>
			</Dropdown>
		)
	}

	componentDidMount(){

	}
}

export default Topbuttons
