import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import routers from '@/router';
import configureStore from '@/store/configureStore'
import { Provider } from 'react-redux';
import reducer from '@/store/reducers';
import { Layout } from 'antd';

import '@/index.css';
import registerServiceWorker from '@/registerServiceWorker';

const store = configureStore();

class App extends Component {
	constructor(props){
		super(props)
	}
	
	render(){
		return this.props.children
	}
	
	componentDidMount(){
		document.title = '易保网'
	}
}

ReactDOM.render( (
	<Provider store={store}>
		{ routers }
	</Provider>
), document.getElementById('root') )

registerServiceWorker()

export default App