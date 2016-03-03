class FacebookHelper{
    constructor(){
        window.fbAsyncInit = () => {
                FB.init({
                    appId      : '1003470959709853',
                    cookie     : true, 
                    xfbml      : true, 
                    version    : 'v2.5'
                });

            }
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
    }
}

export default FacebookHelper