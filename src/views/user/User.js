import React, { Component } from 'react';
import { Link } from 'react-router';
import { Layout, Menu, Icon } from 'antd';

const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup
const Content = Layout

class User extends Component {
	constructor(props){
		super(props)
		this.state = {
			current: 'nav1-1',
			minH: 'auto'
		}
	}
	
	catchCurrent(key){
		this.setState({
			current: key
		})
	}
	
	componentWillMount(){
		
	}
	
	render(){
		return (
			<Layout className="dark">
				<Layout className="bg-fff border-b">
					<Menu selectedKeys={ [this.state.current] } mode="horizontal" className="custom-hor">
						<Menu.Item key="nav1-1">
							<Link to="/employee/list">员工列表</Link>
						</Menu.Item>
						<Menu.Item key="nav2-1">
							<Link to="/train/list">育成总览</Link>
						</Menu.Item>
						<Menu.Item key="nav3-1">
							<Link to="/bill/list">保单列表</Link>
						</Menu.Item>
					</Menu>
				</Layout>
				<Content className="center-box" style={{ minHeight: this.state.minH }}>
					{ 
						this.props.children && React.cloneElement(this.props.children, {
							catchCurrent: this.catchCurrent.bind(this)
						})
					}
				</Content>
			</Layout>
		)
	}
	
	componentDidMount(){
		this.setState({
			minH: ( document.documentElement.clientHeight - 108 ) + 'px'
		})
	}
}

export default User
