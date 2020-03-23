import React, { Component } from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '@/store/actions';
import { Layout, Table, Tree, Button, Form, Modal, Input, Select, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import nameToId from '@/utils/nameToId';
import configs from '@/config'

const { Sider, Content } = Layout
const TreeNode = Tree.TreeNode
const FormItem = Form.Item
const Option = Select.Option
const sign = 'TRAIN'

const columns = [{
	title: '序号',
	dataIndex: 'train_id',
	key: '0'
}, {
	title: '姓名',
	dataIndex: 'employee_name',
	key: '1'
}, {
	title: '职级',
	dataIndex: 'rank_level_txt',
	key: '2'
}, {
	title: '育成人姓名',
	dataIndex: 'employee_name_train',
	key: '3'
}, {
	title: '育成人职级',
	dataIndex: 'rank_level_train_txt',
	key: '4'
}]

class Trainlist extends Component {

	constructor(props) {
		super(props)
		this.state = {
			loading: false,
			modalV: false,
			ep_arr: [ ],
			train_arr: [ ]
		}
		this.formForAdd = React.createRef()
	}

	// 获取表格数据
	pullData(){
		this.setState({ loading: true })
		let { AjaxList } = this.props.actions
		AjaxList({
			url: `${ configs.THE_HOST }/train/list`,
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

	// 添加育成关系
	addHandle = () => {
		this.setState({ modalV: true })
		let form = this.formForAdd.current
		form && form.resetFields()
	}

	trainAdd = () => {
		let form = this.formForAdd.current,
		{ employee_name, employee_name_train } = form.getFieldsValue()
		if( employee_name === "" ){
			message.error('请选择员工')
			return
		}
		else if( employee_name_train === "" ){
			message.error('请选择育成人')
			return
		}

		let { ep_arr, train_arr } = this.state
		let { Ajax } = this.props.actions
		Ajax({
			url: `${ configs.THE_HOST }/train/add`,
			method: 'post',
			data: {
				"employee_id": nameToId(employee_name, ep_arr),
				"employee_id_train": nameToId(employee_name_train, train_arr)
			},
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

	pullTrain() {
		let { Ajax } = this.props.actions
		Ajax({
			url: `${ configs.THE_HOST }/sysset/train`,
			method: 'post',
			data: { },
			success: res => {
				this.setState({
					ep_arr: res.data,
					train_arr: res.data
				})
			}
		})
	}

	render() {
		const layout = {
		  labelCol: { span: 5 },
		  wrapperCol: { span: 19 }
		}
		return (
			<Layout className="bg-fff flex-initial">
				<Content className="tb-contain">
					<div className="marb-30">
						<Button icon={ <PlusOutlined /> } type="default" onClick={ this.addHandle }>新增育成关系</Button>
					</div>
					<Table className="table-fixed" columns={ columns } dataSource={ this.props.listData.list } pagination={{
						current: this.props.listData.current,
						pageSize: configs.pageSize,
						total: this.props.listData.total
					}} onChange={ this.handleTableChange.bind(this) } loading={ this.state.loading } rowKey={ record => record.train_id } />

					<Modal title="新增育成关系" width={ 450 } visible={ this.state.modalV } maskClosable={ false } onOk={ this.trainAdd } onCancel={
						() => this.setState({ modalV: false })
					} okText="确定" cancelText="取消" >
						<Form ref={ this.formForAdd } initialValues={{ employee_name: "", employee_name_train: "" }} { ...layout }>
							<FormItem label="员工姓名" name="employee_name">
								<Select mode="combobox">
									{
										this.state.ep_arr.map( (item) => <Option key={ item.employee_id } value={ item.employee_name }>{ item.employee_name }</Option> )
									}
								</Select>
							</FormItem>
							<FormItem label="育成人姓名" name="employee_name_train">
								<Select mode="combobox">
									{
										this.state.train_arr.map( (item) => <Option key={ item.employee_id } value={ item.employee_name }>{ item.employee_name }</Option> )
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
		this.resetTable()
		this.pullTrain()
	}
}

// lead stores in
const mapStateToProps = state => ({
	listData: state.ListData[sign]
})

// lead actions in
const mapDispatchToProps = dispatch => ({ "actions": bindActionCreators(actions, dispatch) })

export default connect(mapStateToProps, mapDispatchToProps)(Trainlist)
