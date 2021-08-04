import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Layout, Table, Tree, Button, Form, Modal, Input, Select, message } from 'antd';
import { RollbackOutlined } from '@ant-design/icons';
import actions from '@/store/actions';
import configs from '@/config';

const { Sider, Content } = Layout
const TreeNode = Tree.TreeNode
const FormItem = Form.Item
const Option = Select.Option

const columns = [{
	title: '序号',
	dataIndex: 'commission_id',
	key: '0'
}, {
	title: '标准保费',
	dataIndex: 'premium_standard',
	key: '1'
}, {
	title: '收益人',
	dataIndex: 'employee_name_benefit',
	key: '2'
}, {
	title: '职级',
	dataIndex: 'rank_level_txt',
	key: '3'
}, {
	title: '佣金性质',
	dataIndex: 'commission_type_txt',
	key: '4'
}, {
	title: '佣金',
	dataIndex: 'money',
	key: '5'
}]

class Comslist extends Component {

	constructor(props) {
		super(props)
		this.state = {
			commissions: [ ],
			pagination: {
				current: 1,
				pageSize: 100
			},
			loading: false,
		}
	}

	handleTableChange(pageC, filters, sorter){
		const pager = this.state.pagination
		pager.current = pageC.current

		this.setState({
			pagination: pager
		})
		this.pullData()
	}

	// 获取表格数据
	pullData( params = this.state.pagination ){
		this.setState({ loading: true })
		let { order_nid } = this.props.match.params
		let { Ajax } = this.props.actions
		Ajax({
			url: `${ configs.THE_HOST }/commission/list`,
			method: 'post',
			data: {
				"current_page": params.current,
				"page_size": params.pageSize,
				order_nid
			},
			success: res => {
				const pagination = this.state.pagination
				pagination.total = parseInt(res.data.total)
				this.setState({
					loading: false,
					commissions: res.data.list,
					pagination
				})
			},
			fail: res => {
				this.setState({ loading: false })
				message.error(res.msg)
			}
		})
	}

	render() {
		let { history } = this.props
		return (
			<Layout className="bg-fff flex-initial">
				<Content className="tb-contain">
					<div className="marb-30">
						<Button icon={ <RollbackOutlined /> } type="default" onClick={
							() => {
								history.push({ pathname: '/bill/list' })
							}
						}>返回</Button>
					</div>
					<p>
						<span className="color-blue">推荐关系链：</span><br/>
						{ this.props.relation }
					</p>
					<Table className="table-fixed" columns={ columns } dataSource={ this.state.commissions } pagination={ this.state.pagination } onChange={ this.handleTableChange.bind(this) } loading={ this.state.loading } rowKey={ record => record.commission_id } />
				</Content>
			</Layout>
		)
	}

	componentDidMount(){
		this.pullData()
	}
}

// lead stores in
const mapStateToProps = state => ({
	relation: state.detailData.relation
})

// lead actions in
const mapDispatchToProps = dispatch => ({ "actions": bindActionCreators(actions, dispatch) })

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Comslist))
