import { APP_ID } from '../constants/social_config'

class FacebookHelper {

  initFbScript() {
    if(!this.scriptPromise) {
      this.scriptPromise = new Promise((resolve, reject) => {
        window.fbAsyncInit = () => {
          FB.init({
                    // appId      : '1003470959709853',
                    appId: APP_ID,
                    cookie     : true, 
                    xfbml      : true, 
                    version    : 'v2.5'
                });

          resolve();
        };
        if (typeof(FB) == 'undefined') {
            ((d, s, id) => {
              let js, fjs = d.getElementsByTagName(s)[0];
              if (d.getElementById(id)) return;
              js = d.createElement(s);
              js.id = id;
              js.src = "//connect.facebook.net/en_US/sdk.js";
              fjs.parentNode.insertBefore(js, fjs);
            })(document, 'script', 'facebook-jssdk');
        }
      })
    }
    return this.scriptPromise;
  }

  getLoginStatus(callback) {
    return this.initFbScript().then(() => FB.getLoginStatus(callback));
  }
}

export default FacebookHelper