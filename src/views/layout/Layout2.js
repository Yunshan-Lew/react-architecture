import React, { useState, useEffect } from 'react';
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


const Userlayout = props => {
	const [ minH, setMinH ] = useState('auto')

	useEffect(() => {
		document.title = 'React Achitecture'
		let clientHeight = document.documentElement.clientHeight - 104
		setMinH(`${ clientHeight > 720 ? clientHeight : 720 }px`)
	})

	const catchCurrent = () => {
		let { pathname } = props.location
		return pathname.replace(/^\//, '')
	}

	let current = catchCurrent()

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
				<Layout style={{ padding: '20px' }}>
					<Content style={{ minHeight: minH }}>
						{ props.children }
					</Content>
				</Layout>
			</Layout>
		</Layout>
	)
}

// lead stores in
const mapStateToProps = state => ({
	logState: state.loginInfo['logState']
})

// lead actions in
const mapDispatchToProps = dispatch => ({ "actions": bindActionCreators(actions, dispatch) })

export default connect(mapStateToProps, mapDispatchToProps)(Userlayout)
