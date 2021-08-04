import React, { Component } from 'react';
import { Button, Form, Modal, Input, Select, message } from 'antd';
import Inputamap from '@/components/Inputamap'
import configs from '@/config'

const FormItem = Form.Item
const Option = Select.Option

class Addbillmodal extends Component {

	constructor(props) {
		super(props)
		this.state = {
			ep_arr: [ ]
		}
		this.formForBill = React.createRef()
		this.mapInput = React.createRef()
	}

	componentDidUpdate(prevProps, prevState){
		if(this.props.visible != prevProps.visible && this.props.visible === true) {
			this.pullEp()
			let form = this.formForBill.current
			form && form.resetFields()
		}
	}

	// 确认提交
	submitHandle = async () => {
		const form = this.formForBill.current
		let { employee_id, premium_standard } = form.getFieldsValue()
		const map = this.mapInput.current
		let location = await map.requestExtra()
		console.log(location)
		if( !employee_id ){
			message.error('请选择出单人')
			return
		}
		else if( !/^(([1-9]{1}\d*)|([0]{1}))(\.(\d){1,2})?$/.test(premium_standard) ){
			message.error('请正确填写保费')
			return
		}
		this.props.addConfirm({ employee_id, premium_standard })
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

	setAmapValue = address => {
		let form = this.formForBill.current
		return form.setFieldsValue({ address })
	}

	render() {
		const layout = {
		  labelCol: { span: 5 },
		  wrapperCol: { span: 19 }
		}
		return (
			<Modal title="新增保单" width={ 450 } visible={ this.props.visible } maskClosable={ false } onOk={ this.submitHandle } onCancel={ this.props.cancelConfirm } okText="确定" cancelText="取消" >
				<Form ref={ this.formForBill } { ...layout } initialValues={{ premium_standard: '5000.00' }}>
					<FormItem label="出单人" name="employee_id" rules={ [{ required: true, message: "必填项"}] }>
						<Select>
							{
								this.state.ep_arr.map( (item, index) => <Option key={ item.employee_id } value={ item.employee_id }>{ item.employee_name }</Option> )
							}
						</Select>
					</FormItem>
					<FormItem label="标准保费" name="premium_standard" rules={ [{ required: true, message: "必填项"}] }>
						<Input placeholder="请输入标准保费" />
					</FormItem>
					<FormItem label="寄送地址" name="address" rules={ [{ required: true, message: "必填项"}] }>
						<Inputamap ref={ this.mapInput } placeholder="请输入邮寄地址" carrier="popover" inputHandle={ this.setAmapValue } />
					</FormItem>
				</Form>
			</Modal>
		)
	}

}

export default Addbillmodal
