import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import routers from '@/router/router';
import configureStore from '@/store/configureStore'
import { Provider } from 'react-redux';
import reducer from '@/store/reducers';
import { Layout } from 'antd';

import '@/style.less';
import registerServiceWorker from '@/registerServiceWorker';

const store = configureStore();

class App extends Component {
	constructor(props){
		super(props)
	}

	render(){
		return this.props.children
	}
}

ReactDOM.render( (
	<Provider store={store}>
		{ routers }
	</Provider>
), document.getElementById('root') )

registerServiceWorker()

export default App
