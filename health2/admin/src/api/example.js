import api from './api';
import constants from 'common/constants/constants';
export function getranklist(){
	const {RANK_LIST, RECOMMEND_BANNER_URL_PARAMS, OPTION} = constants;
	const data = Object.assign({},RECOMMEND_BANNER_URL_PARAMS,{
		uin: 0,
		platform: 'h5',
		needNewCode: 1,
		_: 1542118088345
	})
	return api(RANK_LIST, data)
}