import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { Button, Form, Modal, Input, Select, message } from 'antd';
import configs from '@/config'

const FormItem = Form.Item
const Option = Select.Option

class Addbillmodal extends Component {
	
	constructor(props) {
		super(props)
		this.state = {
			ep_arr: [ ]
		}
	}
	
	componentWillUpdate(nextProps){
		if(nextProps.visible != this.props.visible && nextProps.visible === true) {
			this.pullEp()
			this.props.form.resetFields(['employee_id',  'premium_standard'])
		}
	}
	
	// 确认提交
	submitHandle = () => {
		const { getFieldValue, getFieldsValue } = this.props.form
		if( getFieldValue('employee_id') === "" ){
			message.error('请选择出单人')
			return
		}
		else if( !/^(([1-9]{1}\d*)|([0]{1}))(\.(\d){1,2})?$/.test( getFieldValue('premium_standard') ) ){
			message.error('请正确填写保费')
			return
		}
		this.props.addConfirm.call(this, getFieldsValue(['employee_id', 'premium_standard']))
	}
	
	pullEp = () => {
		let { Ajax } = this.props.actions
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
		const { getFieldDecorator } = this.props.form
		return (
			<Modal title="新增保单" width={ 600 } visible={ this.props.visible } maskClosable={ false } onOk={ this.submitHandle } onCancel={ this.props.cancelConfirm } okText="确定" cancelText="取消" >
				<Form>
					<FormItem label="出单人">
						{getFieldDecorator('employee_id', {
								rules: [{ required: true, message: "必填项"}],
						})(
							<Select>
								{
									this.state.ep_arr.map( (item, index) => <Option key={ item.employee_id } value={ item.employee_id }>{ item.employee_name }</Option> )
								}
							</Select>
						)}
					</FormItem>
					<FormItem label="标准保费">
						{getFieldDecorator('premium_standard', {
								rules: [{ required: true, message: "必填项"}],
						})(
							<Input placeholder="请输入标准保费" />
						)}
					</FormItem>
				</Form>
			</Modal>
		)
	}
	
}

export default Addbillmodal
