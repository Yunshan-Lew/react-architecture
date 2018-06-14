import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Layout, Table, Tree, Button, Form, Modal, Input, Select, message } from 'antd';
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
			order_nid: this.props.params.order_nid,
			employee_name: "",
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
		this.setState({ loading: true });
		let { order_nid, employee_name } = this.state
		let { Ajax } = this.props
		Ajax({
			url: `${ configs.THE_HOST }/commission/list`,
			method: 'post',
			data: {
				"current_page": params.current,
				"page_size": params.pageSize,
				...{ order_nid, employee_name }
			},
			success: res => {
				const pagination = this.state.pagination
				pagination.total = parseInt(res.data.total)
				res.data.list.forEach( (item) => {
					item["key"] = item["commission_id"]
				} )
				this.setState({
					loading: false,
					commissions: res.data.list,
					pagination
				})
			}
		})
	}
	
	render() {
		return (
			<Layout className="bg-fff flex-initial">
				<Content className="tb-contain">
					<div className="marb-30">
						<Button icon="rollback" type="default" onClick={
							() => {
								browserHistory.push({ pathname: '/bill/list' })
							}
						}>返回</Button>
					</div>
					<p>
						<span className="color-blue">推荐关系链：</span><br/>
						{ this.props.relation }
					</p>
					<Table className="table-fixed" columns={ columns } dataSource={ this.state.commissions } pagination={ this.state.pagination } onChange={ this.handleTableChange.bind(this) } loading={ this.state.loading } />
				</Content>
			</Layout>
		)
	}
	
	componentDidMount(){
		this.props.catchCurrent('nav4-1')
		this.pullData()
	}
}

// lead stores in
const mapStateToProps = state => ({
	relation: state.relationTodo.relation
})

// lead actions in
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Comslist)
