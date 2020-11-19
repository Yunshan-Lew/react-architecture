/*
  高德地图v1.4.15地址选择框
  应用key值：58d5fe45d8b118529147ec8fa32d8801
  附加插件：Autocomplete, PlaceSearch, Geocoder, Geolocation
  输出值格式：Object {
    spaceName[地址名称 String],
    lng[经度 Number],
    lat[维度 Number]
  }
  创建日期：2020-09-21
*/

import React, { useState, useEffect, useImperativeHandle } from 'react';
import { Input, Button, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Amapmodal from './Amapmodal';
import Amappopover from './Amappopover';

const { Fragment, forwardRef } = React

const Inputamap = forwardRef((props, ref) => {
	// 组件属性
	let carrier = props.carrier || 'modal'
	let value = props.value || {}
	let placeholder = props.placeholder || '请输入地址'
	let inputHandle = props.inputHandle || function(){}

	if( carrier && !['modal', 'popover'].includes(carrier) ){
		return 'carrier属性错误'
	}
	else if( typeof value !== 'object' ){
		return 'value属性错误'
	}
	else if( placeholder && typeof placeholder !== 'string' ){
		return 'placeholder属性错误'
	}
	else if( inputHandle && typeof inputHandle !== 'function' ){
		return 'inputHandle事件错误'
	}

	// 组件数据
	let [ modalV, setModalV ] = useState(false)

	const addressLocate = data => {
    setModalV(false)
		inputHandle(data)
  }

	const requestExtra = () => {
    return new Promise((resolve, reject) => {
      let { lng, lat } = value
      if( lng && lat ){
        let geocoder = new AMap.Geocoder()
        geocoder.getAddress([lng, lat], (status, result) => {
          if (status === 'complete' && result.regeocode) {
            let { adcode } = result.regeocode.addressComponent
            let { province, city, district } = result.regeocode.addressComponent
            resolve({ adcode: `${ adcode.slice(0,2) + '0000' },${ adcode.slice(0,4) + '00' },${ adcode }`, district: `${ province }-${ city }-${ district }` })
          }
          else {
            message.error('地图未获取到地区，请重新选择')
            reject()
          }
        })
      }
      else {
        message.error('地图未获取到经纬度，请重新选择')
        reject()
      }
    })
  }

	useImperativeHandle(ref, () => ({
    requestExtra
  }))

	return (
		<Fragment>
			{
				carrier == 'modal' ?
				<Fragment>
					<Input placeholder={ placeholder } suffix={ <SearchOutlined /> } value={ value.spaceName } onClick={ () => setModalV(true) } />
					<Amapmodal visible={ modalV } initMark={ value } selectConfirm={ addressLocate } cancelConfirm={ () => setModalV(false) } />
				</Fragment> : null
			}
			{
				carrier == 'popover' ?
				<Amappopover visible={ modalV } initMark={ value } selectConfirm={ addressLocate } cancelConfirm={ () => setModalV(false) }>
					<Input placeholder={ placeholder } suffix={ <SearchOutlined /> } value={ value.spaceName } onFocus={ () => setModalV(true) } />
				</Amappopover> : null
			}
		</Fragment>
	)
})

export default Inputamap
