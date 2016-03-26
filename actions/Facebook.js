import * as types from '../constants/ActionTypes'
import * as message from '../constants/messages'
import FacebookHelper from '../utils/facebook'
import picovicoApi from '../api/api'
import { APP_ID } from '../constants/social_config'
import * as urls from '../constants/urls'
import * as presets from '../constants/project'
import { URL_PREFIX } from '../constants/project'

export function loginSuccess(response){
      return { response, type: types.LOGIN }
}

export function userInfo(response){
    return {response, type: types.USER_INFO}
}

export function fetchUserInfo(router, accessToken){
  return (dispatch, getState) => {
    FB.api('/me','GET',{"fields":"id,name,email,albums{name,cover_photo{id,source},photos{id,source}}"},function(response) {

      var fb_info_response = response
    
      if(response && !response.email){
        dispatch({type: types.FE_COMPLETE_AUTHENTICATING})
        return dispatch({type: types.FE_EMAIL_NOT_FOUND_ERROR})
      }

      let data = {"token": accessToken,
                  "service": "facebook",
                  "app_id": '277a723c32b3578a549e5aaaf8e79c7f7f3a64a91e12e1e219c6c50db4496a93',
                  "device_id": "com.facebook.apps.picovico"
      }

      return dispatch(picovicoApi({url: urls.LOGIN_EXTERNAL, method: "POST", data: data}
        )).then(function(response){
            if(response.status === 200){
              return response.json()
            }else{
              return dispatch({type: types.FE_LOGIN_ERROR})
            }
          }).then(function(response){
            return dispatch(loginSuccess(response))
          }).then(function(response){
            return dispatch(userInfo(fb_info_response))
          }).then(function(response){
            dispatch(list_video())
            dispatch({type: types.FE_COMPLETE_AUTHENTICATING})
            router.pushState(null, URL_PREFIX+'/videos')
          })
    })
  }
}

export function list_video(response){
  return (dispatch, getState) => {
    var pv_headers = getState().picovico.headers
      return  dispatch(picovicoApi({url: urls.GET_VIDEOS, method: "GET", headers: pv_headers}
          )).then(function(response){
            if(response.status === 200){
              return response.json()
            }
          }).then(function(response){
            return dispatch({response, type: types.VIDEOS})
        })
  }
}

export function paginate_video(url){
  return (dispatch, getState) => {
    var pv_headers = getState().picovico.headers
    return dispatch(picovicoApi({url: url, method: "GET", headers: pv_headers}
      )).then(response => {
        return response.json()
    }).then(response => {
        return dispatch({response, type: types.VIDEOS})
    })
  }
}


export function minimumPhotoError(){
    return {type: types.FE_MINIMUM_PHOTO_ERROR}
}

export function begin_project(data){
  return (dispatch, getState) => {
    var pv_headers = getState().picovico.headers
    return dispatch(picovicoApi({url: urls.BEGIN_PROJECT, method: "POST", data: data, headers: pv_headers}
      )).then(function(response){
        return response.json()
    }).then(function(response){
      dispatch({response, type: types.BEGIN_PROJECT})
      return response
    })

  }
}


export function set_music(){
  return (dispatch, getState) => {
    var pv_headers = getState().picovico.headers
    var music_data = {'url': presets.PRESETS['music'], 'preview_url': presets.PRESETS['music']}

    return dispatch(picovicoApi({url: urls.ADD_MUSIC, method: "POST", data: music_data, headers: pv_headers}
      )).then(response => {
        return response.json()
    }).then(response => {
        var music_asset_data = {  
              "start_time":0.0,
              "end_time":0.0,
              "name":"music",
              "asset_id": response.id
            }
        return dispatch({music_asset_data, type: types.SET_MUSIC})
    })
  }
}

export function add_photos(data){
  var limited_photo_data = data.slice(0,26)

  return (dispatch, getState) => {
    var pv_headers = getState().picovico.headers
    var start_time = 0
    var end_time = 5

    var allPromises = new Array(limited_photo_data.length)

    for(var i in limited_photo_data){
      var data = {'url': limited_photo_data[i], 'source': 'facebook', 'thumbnail_url': limited_photo_data[i]}
      allPromises[i] = dispatch(picovicoApi({url: urls.ADD_PHOTO, method: "POST", data: data, headers:pv_headers}
        )).then(response => {
        return response.json()
      }).then(response => {
        var photo_asset_data = {  
            "start_time":start_time,
            "end_time":end_time,
            "asset_id":response.id,
            "name":"image",
            "data":{
            "text":""
          },
        }
        start_time += 5
        end_time += 5
        return dispatch({photo_asset_data, type: types.ADD_PHOTO})
      })
    }
    return Promise.all(allPromises)
  }
}

export function save_video(){
  return (dispatch, getState) => {
    var video_id = getState().picovico.vdd.id
    var pv_headers = getState().picovico.headers
    var video_assets = getState().picovico.vdd
    
    var vdd = {
      'name': video_assets['name'],
      'style': presets.PRESETS['style'],
      'quality': presets.PRESETS['quality'],
      'assets': JSON.stringify(video_assets['assets'])
    }

    return dispatch(picovicoApi({url: `me/videos/${video_id}`, method: "POST", data: vdd, headers: pv_headers}
      )).then(response => {
      return response.json()
    }).then(response => {
      return response
    })
  }
}


export function render_video(){
  return (dispatch, getState) => {

    var video_id = getState().picovico.vdd.id
    var pv_headers = getState().picovico.headers
    return dispatch(picovicoApi({url: `me/videos/${video_id}/render`, method: "POST", headers: pv_headers}
      )).then(response => {
        return response.json()
    }).then(response => {
        return response
    })
  }
}

export function get_rendered_video(){
  return (dispatch, getState) => {
    var video_id = getState().picovico.vdd.id
    var pv_headers = getState().picovico.headers
    return dispatch(picovicoApi({url: `me/videos/${video_id}`, method: "GET", headers: pv_headers}
      )).then(response => {
        return response.json()
    }).then(response => {
      return response
    })
  }
}

var wait = ms => new Promise(resolve => setTimeout(resolve, ms))

export function check_rendered_video(){
  return (dispatch, getState) => {
    var last_video_created = getState().picovico.vdd.id
    return dispatch(get_rendered_video()).then(response => {
      if(response.status == 7102){
        return dispatch(list_video()).then(response => {
          dispatch(reset_vdd())
          dispatch({last_video_created, type: types.FE_COMPLETE_CREATING_VIDEO})
          dispatch({type: types.FE_SHARE_VIDEO})
        })
      }else{
        wait(7000).then(() => dispatch(check_rendered_video()))
      }
    })
  }
}

export function reset_vdd(){
  return (dispatch, getState) => {
    return dispatch({type: types.RESET_VDD})
  }
}

export function create_video(id, router){
    return (dispatch, getState) => {

      var pv_headers = getState().picovico.headers
      var album = getState().picovico.user_info.albums.data.filter(album => album.id==id)

      if(album[0].photos.data.length < 4){
        return dispatch(minimumPhotoError())
      }else{
        var photo_data = album[0].photos.data.filter(photo => photo.source).map(album => album.source)
        var project_data = {'name': album[0].name, 'quality': presets.PRESETS['quality'] }
        dispatch({type: types.FE_CREATING_VIDEO})
        return dispatch(begin_project(project_data)
          ).then(function(response){
            return dispatch(add_photos(photo_data))
          }).then(function(response){

            return dispatch(set_music())
          }).then(function(response){
          
            return dispatch(save_video())
          }).then(function(response){

            return dispatch(render_video())
          }).then(function(response){  

            return dispatch(check_rendered_video())
          })
      }
    }
}

export function complete_share(){
  return {type: types.FE_COMPLETE_SHARE_VIDEO}
}

export function handle_share(video ,history){
  return (dispatch, getState) => {
    var user_id = getState().picovico.user_info.id
    var user_video = video
    var description = "Awesome video created using #Picovico"
    var title = "Video created using #Picovico"

    dispatch({type: types.FE_FB_VIDEO_SHARING})
    
    FB.getLoginStatus(function(response){
      if(response.status != "connected"){
        history.pushState(null, URL_PREFIX+'/login')
      }else{
        var accessToken = response.authResponse.accessToken
        FB.api(
          "/me/videos",
          "POST",
        {
          "file_url": user_video,
          "description": description,
          "title": title,
          "access_token": accessToken,
        },
        function (response) {
          if (response && !response.error) {
            /* handle the result */
            dispatch({type: types.FE_FB_VIDEO_SHARING_COMPLETE})
            dispatch(complete_share())
            history.pushState(null, URL_PREFIX+'/videos')
          }else{
            dispatch(complete_share())
            localStorage.removeItem('pv_fb_token')
          }
        })
      }
    })
  }
}

export function play_video(){
  return dispatch => {
    return dispatch({type: types.FE_SHARE_VIDEO})
  }
}

function handleLogin(router) {
  return (dispatch, getState) => {
    dispatch({type: types.FE_AUTHENTICATING})
    FB.login(function(response){   
    	if (response.status === 'connected') {
        let accessToken = response.authResponse.accessToken
        // localStorage['pv_fb_token'] = JSON.stringify(accessToken)
        dispatch(fetchUserInfo(router, accessToken))
       
  		} else if (response.status === 'not_authorized') {
    		router.pushState(null, URL_PREFIX+'/login')
  		} else {
    		router.pushState(null, URL_PREFIX+'/login')
 	 	  }
    }, {scope: ['user_photos', 'email', 'publish_actions']})
  }
}

function handleLogout(){
        FB.logout(function(response) {})
}


export function album_selection_error(){
  return dispatch => {
    return dispatch({type: types.FE_ALBUM_SELECTION_ERROR})
  }
}


export { handleLogin, handleLogout }

