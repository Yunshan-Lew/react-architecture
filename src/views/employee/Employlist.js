import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Layout, Table, Tree, Button, Form, Modal, Input, Select, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
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
			current_page: 1,
			tree: [ ],
			expand: [ ],

			employees: [ ],
			pagination: {
				current: 1,
				pageSize: 10
			},
			loading: false,

			modalV: false,
			rank_arr: [ ],
			ref_arr: [ ],

			modalV2: false,
			changing: ""
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
				<a onClick={ this.changeHandle.bind(this, record.employee_id, record.rank_level_txt) } >修改职级</a>
			)
		}]
		this.formForAdd = React.createRef()
		this.formForEdit = React.createRef()
	}

	// 获取树状结构
	pullTree(){
		let { Ajax } = this.props.actions
		Ajax({
			url: `${ configs.THE_HOST }/employee/tree`,
			method: 'post',
			data: { },
			success: res => {
				this.setState({ tree: res.data })
			}
		})
	}

	// 获取表格数据
	pullData(){
		let { AjaxList } = this.props.actions
		let { current_page } = this.state
		this.setState({ loading: true })
		AjaxList({
			url: `${ configs.THE_HOST }/employee/list`,
			method: 'post',
			data: { current_page },
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
		const { current } = pageC
		let { pullData } = this
		return this.setState({ "current_page": current }, pullData)
	}

	// 重置清除
	resetTable(){
		let { pullData } = this
		return this.setState({ "current_page": 1 }, pullData)
	}

	// 添加员工
	addHandle = () => {
		this.setState({ modalV: true })
		let form = this.formForAdd.current
		form && form.resetFields()
	}

	employeeAdd = () => {
		const form = this.formForAdd.current
		let { employee_name, rank_level, employee_id_reference } = form.getFieldsValue()
		if( employee_name == "" ){
			message.error('请填写员工姓名')
			return
		}
		else if( rank_level == "" ){
			message.error('请选择职位')
			return
		}

		let { Ajax } = this.props.actions
		Ajax({
			url: `${ configs.THE_HOST }/employee/add`,
			method: 'post',
			data: { employee_name, rank_level, employee_id_reference },
			success: res => {
				message.success(res.msg)
				this.setState({ modalV: false })
				this.pullData()
				this.pullTree()
			}
		})
	}

	// 修改员工职级
	changeHandle(ID, TXT){
		let form = this.formForEdit.current
		form.setFieldsValue({
			changing: ID,
			changing_level: TXT,
		})
		this.setState({ modalV2: true })
	}

	rankChange = () => {
		const form = this.formForEdit.current
		let { changing_level } = form.getFieldsValue()
		if( changing_level == "" ){
			message.error('请选择职位')
			return
		}

		let { changing } = this.state,
		{ Ajax } = this.props.actions
		Ajax({
			url: `${ configs.THE_HOST }/employee/edit`,
			method: 'post',
			data: { "employee_id": changing, "rank_level": changing_level },
			success: res => {
				message.success(res.msg)
				this.setState({ modalV2: false })
				this.pullData()
				this.pullTree()
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
				this.setState({ rank_arr: res.data })
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
				this.setState({ ref_arr: res.data })
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
				<Sider className="bg-fff tree-contain border-r">
					<p className="color-blue">员工关系树</p>
					<Tree showLine defaultExpandedKeys={ this.state.expand } treeData={ this.state.tree } />
				</Sider>
				<Content className="tb-contain">
					<div className="marb-30">
						<Button icon={ <PlusOutlined /> } type="default" onClick={ this.addHandle }>新增员工</Button>
					</div>
					<Table className="table-fixed" columns={ this.columns } dataSource={ this.props.listData.list } pagination={{
						current: this.props.listData.current,
						pageSize: configs.pageSize,
						total: this.props.listData.total
					}} onChange={ this.handleTableChange.bind(this) } loading={ this.state.loading } rowKey={ record => record.employee_id } />

					<Modal title="新增员工" width={ 450 } visible={ this.state.modalV } maskClosable={ false } onOk={ this.employeeAdd } onCancel={
						() => this.setState({ modalV: false })
					} okText="确定" cancelText="取消" >
						<Form ref={ this.formForAdd } initialValues={{ employee_name: "", rank_level: "", employee_id_reference: "0" }} { ...layout }>
							<FormItem label="员工姓名" name="employee_name">
								<Input placeholder="请输入员工姓名" />
							</FormItem>
							<FormItem label="员工职级" name="rank_level">
								<Select>
									<Option value="">请选择职级</Option>
									{
										this.state.rank_arr.map( (item) => <Option key={ item.key } value={ item.key }>{ item.value }</Option> )
									}
								</Select>
							</FormItem>
							<FormItem label="推荐人" name="employee_id_reference">
								<Select>
									{
										this.state.ref_arr.map( (item) => <Option key={ item.employee_id } value={ item.employee_id }>{ item.employee_name }</Option> )
									}
								</Select>
							</FormItem>
						</Form>
					</Modal>

					<Modal title="修改员工职级" width={ 450 } visible={ this.state.modalV2 } maskClosable={ false } onOk={ this.rankChange } onCancel={
						() => this.setState({ modalV2: false })
					} okText="确定" cancelText="取消" >
						<Form ref={ this.formForEdit } { ...layout }>
							<FormItem label="员工职级" name="changing_level">
								<Select>
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
