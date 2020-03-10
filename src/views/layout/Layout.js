import React, { Component } from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '@/store/actions';
import { Layout, Menu, Icon } from 'antd';
import Topnavigator from './Topnavigator'
import Topbuttons from './Topbuttons'

const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup
const { Header, Content, Sider } = Layout

class Userlayout extends Component {
	constructor(props){
		super(props)
		this.state = {
			minH: 'auto'
		}
	}
	
	catchCurrent = () => {
		let { pathname } = this.props.location
		return pathname.replace(/^\//, '')
	}
	
	render(){
		let current = this.catchCurrent()
		return (
			<Layout>
				<Header className="header header-light">
					<div className="logo-brand pull-left" />
					<Topnavigator selection={ '1' } />
					<Topbuttons />
				</Header>
				<Layout className="dark">
					<Sider width={ 200 } className="bg-fff">
						<Layout className="bg-fff border-b">
							<Menu selectedKeys={ [current] } defaultOpenKeys={ ['employee', 'bill'] } mode="inline" className="custom-menu">
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

// lead stores in
const mapStateToProps = state => ({
	logState: state.loginInfo['logState']
})

// lead actions in
const mapDispatchToProps = dispatch => ({ "actions": bindActionCreators(actions, dispatch) })

export default connect(mapStateToProps, mapDispatchToProps)(Userlayout)
