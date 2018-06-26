import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Layout, Table, Tree, Button, Form, Modal, Input, Select, message } from 'antd';
import actions from '@/store/actions';
import nameToId from '@/utils/nameToId';
import configs from '@/config'

const { Sider, Content } = Layout
const TreeNode = Tree.TreeNode
const FormItem = Form.Item
const Option = Select.Option
const sign = 'BILLORDER'

class Billlist extends Component {
	
	constructor(props) {
		super(props)
		this.state = {
			trains: [ ],
			loading: false,
			
			modalV: false,
			biller_name: "",
			premium_standard: "",
			ep_arr: [ ]
		}
		this.columns = [{
			title: '序号',
			dataIndex: 'order_id',
			key: '0'
		}, {
			title: '保单编号',
			dataIndex: 'order_nid',
			key: '1'
		}, {
			title: '出单人姓名',
			dataIndex: 'employee_name',
			key: '2'
		}, {
			title: '职级',
			dataIndex: 'rank_level_txt',
			key: '3'
		}, {
			title: '标准保费',
			dataIndex: 'premium_standard',
			key: '4'
		}, {
			title: '操作',
			dataIndex: 'premium_standard',
			key: '5',
			render: (text, record) => (
				<a onClick={ this.direct.bind(this, record.order_nid, record.base_relation) } >佣金</a>
			)
		}]
	}
	
	direct(order_nid, base_relation){
		this.props.pushRelation(base_relation)
		browserHistory.push({ pathname: `/commission/list/${ order_nid }` })
	}
	
	handleTableChange(pageC, filters, sorter){
		const pager = this.props.listData.pagination
		pager.current = pageC.current
		
		const { pushListData } = this.props
		pushListData(sign, { ...this.props.listData, pagination: pager })
		
		this.pullData()
	}
	
	// 获取表格数据
	pullData(act){
		const { pushListData, Ajax } = this.props
		if( act === 'search' ){
			let pager = this.props.listData.pagination
			pager.current = 1
			pushListData(sign, { ...this.props.listData, pagination: pager })
		}
		if( act === 'reset' ){
			let pager = this.props.listData.pagination
			pager.current = 1
			pushListData(sign, { pagination: pager, order_nid: "", employee_name: "" })
			setTimeout(() => { this.pullData() })
			return
		}
		
		let { order_nid, employee_name, pagination } = this.props.listData
		
		this.setState({ loading: true });
		Ajax({
			url: `${ configs.THE_HOST }/billorder/list`,
			method: 'post',
			data: {
				"current_page": pagination.current,
				"page_size": pagination.pageSize,
				order_nid, employee_name
			},
			success: res => {
				const pager = this.props.listData.pagination
				pager.total = parseInt(res.data.total)
				
				pushListData(sign, { ...this.props.listData, pagination: pager })
				
				this.setState({
					loading: false,
					trains: res.data.list
				})
			},
			fail: res => {
				this.setState({ loading: false })
				message.error(res.msg)
			}
		})
	}
	
	// 添加保单
	billAdd(){
		const _self = this
		if( this.state.biller_name === "" ){
			message.error('请选择出单人')
			return
		}
		else if( !/^(([1-9]{1}\d*)|([0]{1}))(\.(\d){1,2})?$/.test( this.state.premium_standard ) ){
			message.error('请正确填写保费')
			return
		}
		
		let { biller_name, premium_standard, ep_arr } = this.state
		let { Ajax } = this.props
		Ajax({
			url: `${ configs.THE_HOST }/billorder/add`,
			method: 'post',
			data: { "employee_id": nameToId(biller_name, ep_arr), premium_standard },
			success: res => {
				message.success(res.msg)
				_self.setState({
					modalV: false
				})
				_self.pullData()
			},
			fail: res => {
				message.error(res.msg)
			}
		})
	}
	
	pullEp() {
		let { Ajax } = this.props
		Ajax({
			url: `${ configs.THE_HOST }/sysset/train`,
			method: 'post',
			data: { },
			success: res => {
				this.setState({
					ep_arr: res.data
				})
			}
		})
	}
	
	render() {
		const { pushListData } = this.props
		return (
			<Layout className="bg-fff flex-initial">
				<Content className="tb-contain">
					<Form layout="inline" className="marb-30">
						<FormItem label="保单编号">
							<Input placeholder="请输入保单编号" value={ this.props.listData.order_nid } onChange={ (e) => { pushListData(sign, { ...this.props.listData, order_nid: e.target.value }) } } />
						</FormItem>
						<FormItem label="出单人">
							<Input placeholder="请输入出单人" value={ this.props.listData.employee_name } onChange={ (e) => { pushListData(sign, { ...this.props.listData, employee_name: e.target.value }) } } />
						</FormItem>
						<FormItem>
							<Button type="primary" onClick={ this.pullData.bind(this, 'search') }>搜索</Button>
						</FormItem>
						<FormItem>
							<Button type="default" onClick={ this.pullData.bind(this, 'reset') }>清除</Button>
						</FormItem>
						<Button icon="plus" type="default" className="pull-right" onClick={
							() => {
								this.setState({
									modalV: true,
									biller_name: "",
									premium_standard: ""
								})
							}
						}>新增保单</Button>
					</Form>
					<Table className="table-fixed" columns={ this.columns } dataSource={ this.state.trains } pagination={ this.props.listData.pagination } onChange={ this.handleTableChange.bind(this) } loading={ this.state.loading } rowKey={ record => record.order_nid } />
					
					<Modal title="新增保单" width={ 600 } visible={ this.state.modalV } maskClosable={ false } onOk={ this.billAdd.bind(this) } onCancel={ 
						() => {
							this.setState({
								modalV: false
							})
						}
					} okText="确定" cancelText="取消" >
						<Form>
							<FormItem label="出单人">
								<Select mode="combobox" value={ this.state.biller_name } onChange={ (value) => { this.setState({ biller_name: value }) } } >
									{
										this.state.ep_arr.map( (item, index) => <Option key={ item.employee_id } value={ item.employee_name }>{ item.employee_name }</Option> )
									}
								</Select>
							</FormItem>
							<FormItem label="标准保费">
								<Input placeholder="请输入标准保费" value={ this.state.premium_standard } onChange={ (e) => { this.setState({ premium_standard: e.target.value }) } } />
							</FormItem>
						</Form>
					</Modal>
				</Content>
			</Layout>
		)
	}
	
	componentDidMount(){
		this.props.catchCurrent('nav3-1')
		this.pullData()
		this.pullEp()
	}
}

// lead stores in
const mapStateToProps = state => ({
	listData: state.ListData[sign]
})

// lead actions in
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Billlist)
