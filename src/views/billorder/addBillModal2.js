import React, { useState, useEffect } from 'react';
import { Link, browserHistory } from 'react-router';
import { Button, Form, Modal, Input, Select, message } from 'antd';
import configs from '@/config'

const FormItem = Form.Item
const Option = Select.Option

const Addbillmodal = props => {
	const [ form ] = Form.useForm()

	const [ ep_arr, set_ep_arr ] = useState([])

	useEffect(() => {
		if( props.visible == true ){
			pullEp()
			form && form.resetFields()
		}
	}, [ props.visible ])

	// 确认提交
	const submitHandle = () => {
		let { employee_id, premium_standard } = form.getFieldsValue()
		if( !employee_id ){
			message.error('请选择出单人')
			return
		}
		else if( !/^(([1-9]{1}\d*)|([0]{1}))(\.(\d){1,2})?$/.test(premium_standard) ){
			message.error('请正确填写保费')
			return
		}
		props.addConfirm({ employee_id, premium_standard })
	}

	const pullEp = () => {
		let { Ajax } = props.actions
		Ajax({
			url: `${ configs.THE_HOST }/sysset/train`,
			method: 'post',
			data: { },
			success: res => {
				set_ep_arr({
					ep_arr: res.data
				})
			}
		})
	}

	const layout = {
		labelCol: { span: 5 },
		wrapperCol: { span: 19 }
	}
	return (
		<Modal title="新增保单" width={ 450 } getContainer={ false } visible={ props.visible } maskClosable={ false } onOk={ submitHandle } onCancel={ props.cancelConfirm } okText="确定" cancelText="取消" >
			<Form form={ form } { ...layout } initialValues={{ premium_standard: '5000.00' }}>
				<FormItem label="出单人" name="employee_id" rules={ [{ required: true, message: "必填项"}] }>
					<Select>
						{
							ep_arr.map( (item, index) => <Option key={ item.employee_id } value={ item.employee_id }>{ item.employee_name }</Option> )
						}
					</Select>
				</FormItem>
				<FormItem label="标准保费" name="premium_standard" rules={ [{ required: true, message: "必填项"}] }>
					<Input placeholder="请输入标准保费" />
				</FormItem>
			</Form>
		</Modal>
	)
}

export default Addbillmodal
