import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Layout, Table, Tree, Button, Form, Modal, Input, Select, message, DatePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import locale from 'antd/es/date-picker/locale/zh_CN'
import actions from '@/store/actions';
import configs from '@/config'
import Addbillmodal from './addBillModal2'

const { Sider, Content } = Layout
const TreeNode = Tree.TreeNode
const FormItem = Form.Item
const Option = Select.Option
const RangePicker = DatePicker.RangePicker
const sign = 'BILLORDER'

class Billlist extends Component {

	constructor(props) {
		super(props)
		this.state = {
			loading: false,
			modalV: false
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
		this.searchForm = React.createRef()
	}

	direct(order_nid, base_relation){
		let { pushRelation } = this.props.actions
		pushRelation(base_relation)
		browserHistory.push({ pathname: `/bill/commission/${ order_nid }` })
	}

	// 获取表格数据
	pullData(){
		const { AjaxList } = this.props.actions
		let { order_nid, employee_name, date_range_from, date_range_to } = this.props.listData

		this.setState({ loading: true })
		AjaxList({
			url: `${ configs.THE_HOST }/billorder/list`,
			method: 'post',
			data: {
				order_nid,
				employee_name,
				date_range_from,
				date_range_to
			},
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
		const form = this.searchForm.current
		pushListData(sign, {
			current,
			...form.getFieldsValue()
		})
		setTimeout(() => { this.pullData() })
	}

	// 条件搜索
	search(){
		const { pushListData } = this.props.actions
		const form = this.searchForm.current
		let current = 1
		pushListData(sign, {
			current,
			...form.getFieldsValue()
		})
		setTimeout(() => { this.pullData() })
	}

	// 重置清除
	resetTable(){
		const { pushListData } = this.props.actions
		const form = this.searchForm.current
		form.resetFields()
		let current = 1
		pushListData(sign, {
			current,
			...form.getFieldsValue()
		})
		setTimeout(() => { this.pullData() })
	}

	// 添加保单
	billAdd = (params) => {
		let { Ajax } = this.props.actions
		Ajax({
			url: `${ configs.THE_HOST }/billorder/add`,
			method: 'post',
			data: { ...params },
			success: res => {
				message.success(res.msg)
				this.setState({ modalV: false })
				this.pullData()
			},
			fail: res => {
				message.error(res.msg)
			}
		})
	}

	render() {
		return (
			<Layout className="bg-fff flex-initial">
				<Content className="tb-contain">
					<Form layout="inline" ref={ this.searchForm } className="marb-30">
						<FormItem label="保单编号" name="order_nid">
							<Input placeholder="请输入保单编号" />
						</FormItem>
						<FormItem label="出单人" name="employee_name">
							<Input placeholder="请输入出单人" />
						</FormItem>
						<FormItem label="出单日期" name="date_range">
							<RangePicker locale={ locale } size="default" />
						</FormItem>
						<FormItem>
							<Button type="primary" onClick={ this.search.bind(this) }>搜索</Button>
						</FormItem>
						<FormItem>
							<Button type="default" onClick={ this.resetTable.bind(this) }>清除</Button>
						</FormItem>
					</Form>
					<div style={{ height: '60px' }}>
						<Button icon={ <PlusOutlined /> } type="default" className="pull-right" onClick={
							() => this.setState({ modalV: true })
						}>新增保单</Button>
					</div>
					<Table className="table-fixed" columns={ this.columns } dataSource={ this.props.listData.list } pagination={{
						current: this.props.listData.current,
						pageSize: configs.pageSize,
						total: this.props.listData.total
					}} onChange={ this.handleTableChange.bind(this) } loading={ this.state.loading } rowKey={ record => record.order_nid } />

					<Addbillmodal { ...this.props } visible={ this.state.modalV } addConfirm={ this.billAdd.bind(this) } cancelConfirm={ () => this.setState({ modalV: false }) } />
				</Content>
			</Layout>
		)
	}

	componentDidMount(){
		this.resetTable() // pullData()
	}
}

// lead stores in
const mapStateToProps = state => ({
	listData: state.ListData[sign]
})

// lead actions in
const mapDispatchToProps = dispatch => ({ "actions": bindActionCreators(actions, dispatch) })

export default connect(mapStateToProps, mapDispatchToProps)(Billlist)
