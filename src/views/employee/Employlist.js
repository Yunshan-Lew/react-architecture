import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Layout, Table, Tree, Button, Form, Modal, Input, Select, message } from 'antd';
import actions from '@/store/actions';
import configs from '@/config'

const { Sider, Content } = Layout
const TreeNode = Tree.TreeNode
const FormItem = Form.Item
const Option = Select.Option
const sign = 'EMPLOYEE'

class Employlist extends Component {
	
	constructor(props) {
		super(props)
		this.state = {
			tree: [ ],
			expand: [ ],
			
			employees: [ ],
			pagination: {
				current: 1,
				pageSize: 10
			},
			loading: false,
			
			modalV: false,
			employee_name: "",
			rank_level: "",
			employee_id_reference: "0",
			rank_arr: [ ],
			ref_arr: [ ],
			
			modalV2: false,
			changing: "",
			changing_level: ""
		}
		this.columns = [{
			title: '序号',
			dataIndex: 'employee_id',
			key: '0'
		}, {
			title: '姓名',
			dataIndex: 'employee_name',
			key: '1'
		}, {
			title: '职级',
			dataIndex: 'rank_level',
			key: '2'
		}, {
			title: '推荐人',
			dataIndex: 'reference_name',
			key: '3'
		}, {
			title: '操作',
			dataIndex: null,
			key: '4',
			render: (text, record) => (
				<a onClick={ () => {
					this.setState({
						changing: record.employee_id,
						changing_level: record.rank_level_txt,
						modalV2: true
					})
				} } >修改职级</a>
			)
		}]
	}
	
	// 获取树状结构
	pullTree(){
		let { Ajax } = this.props.actions
		Ajax({
			url: `${ configs.THE_HOST }/employee/tree`,
			method: 'post',
			data: { },
			success: res => {
				this.setState({
					tree: res.data
				})
			}
		})
	}
	
	// 获取表格数据
	pullData(){
		this.setState({ loading: true })
		let { AjaxList } = this.props.actions
		AjaxList({
			url: `${ configs.THE_HOST }/employee/list`,
			method: 'post',
			data: { },
			sign: sign,
			success: res => {
				this.setState({ loading: false })
			},
			fail: res => {
				this.setState({ loading: false })
				message.error(res.msg)
			}
		})
	}
	
	// 翻页
	handleTableChange(pageC, filters, sorter){
		const current = pageC.current
		
		const { pushListData } = this.props.actions
		pushListData(sign, { current })
		setTimeout(() => { this.pullData() })
	}
	
	// 重置清除
	resetTable(){
		const { pushListData } = this.props.actions
		let current = 1
		pushListData(sign, { current })
		setTimeout(() => { this.pullData() })
	}
	
	// 添加员工
	employeeAdd(){
		const _self = this
		if( this.state.employee_name == "" ){
			message.error('请填写员工姓名')
			return
		}
		else if( this.state.rank_level == "" ){
			message.error('请选择职位')
			return
		}
		
		let { employee_name, rank_level, employee_id_reference } = this.state
		let { Ajax } = this.props.actions
		Ajax({
			url: `${ configs.THE_HOST }/employee/add`,
			method: 'post',
			data: { employee_name, rank_level, employee_id_reference },
			success: res => {
				message.success(res.msg)
				_self.setState({
					modalV: false
				})
				_self.pullData()
				_self.pullTree()
			}
		})
	}
	
	// 修改员工职级
	rankChange(){
		const _self = this
		if( this.state.changing_level == "" ){
			message.error('请选择职位')
			return
		}
		
		let { changing, changing_level } = this.state
		let { Ajax } = this.props.actions
		Ajax({
			url: `${ configs.THE_HOST }/employee/edit`,
			method: 'post',
			data: { "employee_id": changing, "rank_level": changing_level },
			success: res => {
				message.success(res.msg)
				_self.setState({
					modalV2: false
				})
				_self.pullData()
				_self.pullTree()
			}
		})
	}
	
	pullRanks() {
		let { Ajax } = this.props.actions
		Ajax({
			url: `${ configs.THE_HOST }/sysset/ranklevel`,
			method: 'post',
			data: { },
			success: res => {
				this.setState({
					rank_arr: res.data
				})
			}
		})
	}
	
	pullRef() {
		let { Ajax } = this.props.actions
		Ajax({
			url: `${ configs.THE_HOST }/sysset/reference`,
			method: 'post',
			data: { },
			success: res => {
				this.setState({
					ref_arr: res.data
				})
			}
		})
	}
	
	render() {
		const buildTree = arr => arr.map( (item) => {
			if( item.children && item.children.length ){
				this.state.expand.push(item.employee_id)
				return <TreeNode title={ item.employee_name } key={ item.employee_id } >{ buildTree(item.children) }</TreeNode>
			}
			else{
				return <TreeNode title={ item.employee_name } key={ item.employee_id } />
			}
		} )
		
		return (
			<Layout className="bg-fff flex-initial">
				<Sider className="bg-fff tree-contain border-r">
					<p className="color-blue">员工关系树</p>
					<Tree showLine defaultExpandedKeys={ this.state.expand } >
						{ buildTree(this.state.tree) }
					</Tree>
				</Sider>
				<Content className="tb-contain">
					<div className="marb-30">
						<Button icon="plus" type="default" onClick={
							() => {
								this.setState({
									modalV: true,
									employee_name: "",
									rank_level: "",
									employee_id_reference: "0"
								})
							}
						}>新增员工</Button>
					</div>
					<Table className="table-fixed" columns={ this.columns } dataSource={ this.props.listData.list } pagination={{
						current: this.props.listData.current,
						pageSize: configs.pageSize,
						total: this.props.listData.total
					}} onChange={ this.handleTableChange.bind(this) } loading={ this.state.loading } rowKey={ record => record.employee_id } />
					
					<Modal title="新增员工" width={ 600 } visible={ this.state.modalV } maskClosable={ false } onOk={ this.employeeAdd.bind(this) } onCancel={ 
						() => {
							this.setState({
								modalV: false
							})
						}
					} okText="确定" cancelText="取消" >
						<Form>
							<FormItem label="员工姓名">
								<Input placeholder="请输入员工姓名" value={ this.state.employee_name } onChange={ (e) => { this.setState({ employee_name: e.target.value }) } } />
							</FormItem>
							<FormItem label="员工职级">
								<Select defaultValue={ this.state.rank_level } onChange={ (value) => { this.setState({ rank_level: value }) } }>
									<Option value="">请选择职级</Option>
									{
										this.state.rank_arr.map( (item) => <Option key={ item.key } value={ item.key }>{ item.value }</Option> )
									}
								</Select>
							</FormItem>
							<FormItem label="推荐人">
								<Select defaultValue={ this.state.employee_id_reference } onChange={ (value) => { this.setState({ employee_id_reference: value }) } }>
									{
										this.state.ref_arr.map( (item) => <Option key={ item.employee_id } value={ item.employee_id }>{ item.employee_name }</Option> )
									}
								</Select>
							</FormItem>
						</Form>
					</Modal>
					
					<Modal title="修改员工职级" width={ 450 } visible={ this.state.modalV2 } maskClosable={ false } onOk={ this.rankChange.bind(this) } onCancel={ 
						() => {
							this.setState({
								modalV2: false
							})
						}
					} okText="确定" cancelText="取消" >
						<Form>
							<FormItem label="员工职级">
								<Select value={ this.state.changing_level } onChange={ (value) => { this.setState({ changing_level: value }) } }>
									<Option value="">请选择职级</Option>
									{
										this.state.rank_arr.map( (item) => <Option key={ item.key } value={ item.key }>{ item.value }</Option> )
									}
								</Select>
							</FormItem>
						</Form>
					</Modal>
				</Content>
			</Layout>
		)
	}
	
	componentDidMount(){
		this.pullTree()
		this.resetTable()
		this.pullRanks()
		this.pullRef()
	}
}

// lead stores in
const mapStateToProps = state => ({
	listData: state.ListData[sign]
})

// lead actions in
const mapDispatchToProps = dispatch => ({ "actions": bindActionCreators(actions, dispatch) })

export default connect(mapStateToProps, mapDispatchToProps)(Employlist)
