import React, { useState, useEffect } from 'react';
import { Button, Popover, Input, message } from 'antd';

const { Fragment } = React

const Amappopover = props => {
  // 组件属性
  let visible = props.visible || false
  let initMark = props.initMark || { }
  let selectConfirm = props.selectConfirm || function(){}
  let cancelConfirm = props.cancelConfirm || function(){}

  if( visible && typeof visible !== 'boolean' ){
    return 'visible属性错误'
  }
  else if( initMark && typeof initMark !== 'object' ){
    return 'initMark属性错误'
  }
  else if( typeof selectConfirm !== 'function' || typeof cancelConfirm !== 'function' ){
    return '操作事件错误'
  }

  let mapInstance = ''
  let marker = ''
  let geolocate = {}

  // 状态数据
  let [ idForSearch ] = useState(`tipinput${ Math.round(Math.random() * 10000) }`)
  let [ idForRender ] = useState(`amap${ Math.round(Math.random() * 10000) }`)
  let [ spaceName, setSpaceName ] = useState('')
  let [ geoLocation, setGeoLocation ] = useState({})

  const geoLocate = () => {
    return new Promise((resolve, reject) => {
      AMap.plugin('AMap.Geolocation', () => {
        geolocate = new AMap.Geolocation({
          enableHighAccuracy: true,
          buttonPosition: 'RB'
        })
        geolocate.getCurrentPosition((status, result) => {
          if(status=='complete'){
            let { lng, lat } = result.position
            resolve({ lng, lat })
          }
          else{
            resolve({ "lng": 104.07, "lat": 30.54 })
            console.info(result.message)
          }
        })
      })
    })
  }

  const drawAmap = () => {
    setSpaceName('')
    setGeoLocation({})
    mapInstance = new AMap.Map(idForRender, {
      zoom: 15,
      mapStyle: 'amap://styles/a8032d38187b1e7734edb8889203cb68'
    })
    // 绑定搜索事件
    let autoOptions = { "input": idForSearch }
    let auto = new AMap.Autocomplete(autoOptions)
    let placeSearch = new AMap.PlaceSearch({
      "map": mapInstance
    })
    AMap.event.addListener(auto, "select", e => {
      placeSearch.setCity(e.poi.adcode)
      placeSearch.search(e.poi.name)
      let { district, address, name } = e.poi
      let { lng, lat } = e.poi.location
      setSpaceName(district + address + name)
      setGeoLocation({ lng, lat })
    })
    // 标点点击事件
    AMap.event.addListener(placeSearch, 'markerClick', ({ data }) => {
      let { pname, cityname, address, name } = data
      let entr_location = data.entr_location || {}
      let { lng, lat } = entr_location
      setSpaceName(pname + cityname + address + name)
      setGeoLocation({ lng, lat })
    })
    // 逆向地理编码
    mapInstance.on('click', e => {
      let { lng, lat } = e.lnglat
      if( marker ) marker.setMap(null)
      marker = new AMap.Marker({
        position: new AMap.LngLat(lng, lat)
      })
      mapInstance.add(marker)
      let geocoder = new AMap.Geocoder()
      geocoder.getAddress([lng, lat], (status, result) => {
        if (status === 'complete' && result.regeocode) {
          setSpaceName(result.regeocode.formattedAddress)
          setGeoLocation({ lng, lat })
        }
        else {
          setSpaceName('未知目标')
          setGeoLocation({ })
        }
      })
    })
  }

  const submitHandle = () => {
    let { lng, lat } = geoLocation
    if( !lng || !lat ) {
      message.error('未获取到经纬度，请重新选择')
      return
    }
    selectConfirm({ spaceName, lng, lat })
  }

  // 更新
  useEffect(() => {
		if( visible == true ){
      geoLocate()
      .then(res => {
        drawAmap()
        let spaceName = initMark.spaceName || ''
        let lng = initMark.lng || res.lng
        let lat = initMark.lat || res.lat
        mapInstance.setCenter([lng, lat])
        mapInstance.addControl(geolocate)
        // 编辑时回显
        if( spaceName && /^[0-9.]+$/.test(lng) && /^[0-9.]+$/.test(lat) ){
          marker = new AMap.Marker({
            position: new AMap.LngLat(lng, lat)
          })
          mapInstance.add(marker)
          setSpaceName(spaceName)
          setGeoLocation({ lng, lat })
        }
      })
		}
	}, [ visible ])

  return (
		<Popover title="选择地址" content={
      <Fragment>
        <Input id={ idForSearch } placeholder="搜索地址" value={ spaceName } onChange={ e => setSpaceName(e.target.value) } />
        <div className="popover-amap" id={ idForRender }></div>
        <div className="text-right">
          <Button type="primary" onClick={ submitHandle } size="small" style={{ marginRight: '10px' }}>确定</Button>
          <Button onClick={ cancelConfirm } size="small">取消</Button>
        </div>
      </Fragment>
    } visible={ visible }>
      { props.children }
    </Popover>
	)
}

export default Amappopover
