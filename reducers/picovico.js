import * as types from '../constants/ActionTypes'

var initialState;

if(localStorage['picovico']){
  initialState = JSON.parse(localStorage['picovico'])
  initialState['frontend'] = {'authenticating': false}
  // initialState['vdd']['assets'] = []
}else{
  initialState = {
    isLoggedIn: false,
    headers:{"X-Access-Key":null,"X-Access-Token":null},
    id: null,
    frontend:{'authenticating': false},
    vdd:{
      assets: []
    }
  }
}


export default function picovico(state = initialState, action) {
  switch (action.type) {

    case types.LOGIN:
    	return Object.assign({}, state, {
          isLoggedIn: true,
          headers: {"X-Access-Key":action.response.access_key,"X-Access-Token":action.response.access_token},
          id: action.response.id
          })

    case types.FE_LOGIN_ERROR:
      return Object.assign({}, state, {frontend: Object.assign({}, state.frontend, {login_error: true})})

    case types.FE_EMAIL_NOT_FOUND_ERROR:
      return Object.assign({}, state, {frontend: Object.assing({}, state.frontend, {email_not_found: true})})

    case types.FE_AUTHENTICATING:
      return Object.assign({}, state, {frontend: Object.assign({}, state.frontend, {authenticating: true})})

    case types.FE_COMPLETE_AUTHENTICATING:
      return Object.assign({}, state, {frontend: Object.assign({}, state.frontend, {authenticating: false})})

    case types.FE_ALBUM_SELECTION_ERROR:
      return Object.assign({}, state, {frontend: Object.assign({}, state.frontend, {album_selection_error: true})})

    case types.FE_MINIMUM_PHOTO_ERROR:
      return Object.assign({}, state, {frontend: Object.assign({}, state.frontend, {minimum_photo_error: true})})

    case types.FE_CREATING_VIDEO:
      return Object.assign({}, state, {frontend: Object.assign({}, state.frontend, {creating_video: true})})

    case types.FE_COMPLETE_CREATING_VIDEO:
      return Object.assign({}, state, {frontend: Object.assign({}, state.frontend, {creating_video: false})})

    case types.FE_SHARE_VIDEO:
      return Object.assign({}, state, {frontend: Object.assign({}, state.frontend, {share_video: true})})

    case types.FE_COMPLETE_SHARE_VIDEO:
      return Object.assign({}, state, {frontend: Object.assign({}, state.frontend, {share_video: false})})



    case types.USER_INFO:
      return Object.assign({}, state, {user_info: action.response})

    case types.VIDEOS:
      return Object.assign({}, state, {user_videos: action.response})

    case types.BEGIN_PROJECT:
      return Object.assign({}, state, {vdd: Object.assign({}, state.vdd, {id: action.response.id, name: action.response.name})})

    case types.ADD_PHOTO:
      return Object.assign({}, state, state.vdd.assets.push(action.photo_asset_data))

    case types.SET_MUSIC:
      return Object.assign({}, state, state.vdd.assets.push(action.music_asset_data))

    case types.RESET_VDD:
      return Object.assign({}, state, {vdd: {assets: []}})

    default:
      return state
  }
}
