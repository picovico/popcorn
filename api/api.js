import "isomorphic-form-data";
import fetch from 'isomorphic-fetch'
import * as urls from '../constants/urls';
import * as Actions from '../actions/Facebook'


export default function picovicoApi({url, method, headers, data}={}){
	return (dispatch, getState) => {

		console.log(method)

		if(data){
			var form = new FormData();
			for(var key in data){
				form.append(key, data[key])
			}
		}
		var init_params;

		if(method == "GET"){
			init_params = {
				method: method,
				headers: headers
			}
		}else{
			init_params = {
				method: method,
				headers: headers,
				body: form
			}
		}
		return fetch(urls.PICOVICO_API_ENDPOINT + url, init_params)
		
	}
}



