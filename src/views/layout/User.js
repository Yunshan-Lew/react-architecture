import React, { Component } from 'react';
import { Link } from 'react-router';
import { Layout, Menu, Icon } from 'antd';

const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup
const { Content, Sider } = Layout

class User extends Component {
	constructor(props){
		super(props)
		this.state = {
			current: 'employee/list',
			minH: 'auto'
		}
	}
	
	catchCurrent(key){
		this.setState({
			current: key
		})
	}
	
	componentWillReceiveProps(nextProps){
		let { pathname } = nextProps.location,
		key = pathname.replace(/^\//, '')
		this.catchCurrent(key)
	}
	
	componentWillMount(){
		
	}
	
	render(){
		return (
			<Layout className="dark">
				<Sider width={ 200 } className="bg-fff">
					<Layout className="bg-fff border-b">
						<Menu selectedKeys={ [this.state.current] } defaultOpenKeys={ ['employee', 'bill'] } mode="inline" className="custom-menu">
							<SubMenu key="employee" title="员工管理">
								<Menu.Item key="employee/list">
									<Link to="/employee/list">员工列表</Link>
								</Menu.Item>
								<Menu.Item key="employee/train">
									<Link to="/employee/train">育成总览</Link>
								</Menu.Item>
							</SubMenu>
							<SubMenu key="bill" title="保单管理">
								<Menu.Item key="bill/list">
									<Link to="/bill/list">保单列表</Link>
								</Menu.Item>
							</SubMenu>
						</Menu>
					</Layout>
				</Sider>
				<Layout style={{ padding: '24px' }}>
					<Content className="center-box" style={{ minHeight: this.state.minH }}>
						{ 
							this.props.children /*&& React.cloneElement(this.props.children, {
								catchCurrent: this.catchCurrent.bind(this)
							})*/
						}
					</Content>
				</Layout>
			</Layout>
		)
	}
	
	componentDidMount(){
		document.title = 'React Achitecture'
		this.setState({
			minH: `${ document.documentElement.clientHeight }px`
		})
	}
}

export default User
