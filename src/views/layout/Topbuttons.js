import React, { Component } from 'react';
import { Link } from 'react-router';
import { Menu, Dropdown, Button, Icon } from 'antd';

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
						<Icon type="logout" /> 退出登录
					</div>
				</MenuItem>
			</Menu>
		)
		
		return (
			<Dropdown overlay={ menu } placement="bottomLeft">
				<Button className="top-buttons" icon="user">
					User Name
				</Button>
			</Dropdown>
		)
	}
	
	componentDidMount(){
		
	}
}

export default Topbuttons
