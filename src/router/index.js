import React from 'react';
import { Router, Route, browserHistory, IndexRedirect, Redirect } from 'react-router';
import App from '@/index'
import User from '@/views/layout/User';
import Employlist from '@/views/employee/Employlist';
import Trainlist from '@/views/train/Trainlist';
import Billlist from '@/views/billorder/Billlist';
import Comslist from '@/views/commission/Comslist';

const routers = (
	<Router history={ browserHistory } >
		<Route path="/" component={ App }  >
			<Route path="employee" component={ User } >
				<Route path="list" component={ Employlist } />
				<IndexRedirect to="/employee/list" />
			</Route>
			<Route path="train" component={ User } >
				<Route path="list" component={ Trainlist } />
				<IndexRedirect to="/train/list" />
			</Route>
			<Route path="bill" component={ User } >
				<Route path="list" component={ Billlist } />
				<IndexRedirect to="/bill/list" />
			</Route>
			<Route path="commission" component={ User } >
				<Route path="list/:order_nid" component={ Comslist } />
				<IndexRedirect to="/bill/list" />
			</Route>
			// 匹配空
			<IndexRedirect to="/employee" />
			// 匹配其它
			<Redirect from="*" to="/employee" />
		</Route>
	</Router>
)

export default routers