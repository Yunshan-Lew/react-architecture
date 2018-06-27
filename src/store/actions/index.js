import { loginIn, loginOut, pullToken, pushToken } from './actionLogin'
import { pushRelation } from './actionRelation'
import { pushListData } from './actionListData'
import Ajax from './Ajax'
import AjaxList from './AjaxList'

export default { Ajax, AjaxList, loginIn, loginOut, pullToken, pushToken, pushRelation, pushListData }