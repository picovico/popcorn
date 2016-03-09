// class FacebookHelper{
//     constructor(history){
//         window.fbAsyncInit = () => {
//                 FB.init({
//                     appId      : '1003470959709853',
//                     cookie     : true, 
//                     xfbml      : true, 
//                     version    : 'v2.5'
//                 });

//                 FB.getLoginStatus(function(response){
//                   if(response.status != "connected"){
//                     history.pushState(null, "/login")
//                   }
//                 })

//             }
//         if (typeof(FB) == 'undefined') {
//             ((d, s, id) => {
//               let js, fjs = d.getElementsByTagName(s)[0];
//               if (d.getElementById(id)) return;
//               js = d.createElement(s);
//               js.id = id;
//               js.src = "//connect.facebook.net/en_US/sdk.js";
//               fjs.parentNode.insertBefore(js, fjs);
//             })(document, 'script', 'facebook-jssdk');
//         }
//     }
// }

// export default FacebookHelper

class FacebookHelper {

  initFbScript() {
    if(!this.scriptPromise) {
      this.scriptPromise = new Promise((resolve, reject) => {
        window.fbAsyncInit = () => {
          FB.init({
                    appId      : '1003470959709853',
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