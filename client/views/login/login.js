Template.login.events({
    'click #facebook-login': function(event) {
        Meteor.loginWithFacebook({}, function(err){
            Meteor.call("getAccessToken", function(error, accessToken){
                if (accessToken){
                    console.log("We will call picovico authentication later");
                    Meteor.call("getUserAlbum", accessToken, function(response){
                        if (response){
                            console.log(response)
                            Router.go("videos")
                        };
                    });
                };
            });
            if (err) {
                throw new Meteor.Error("Facebook login failed");
            }
        });
    },

});