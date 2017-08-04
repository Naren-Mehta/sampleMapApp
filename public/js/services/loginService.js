app.service('loginService', function ($http, applicationContextURL) {

    return {
        authenticate: function (username) {

            console.log(applicationContextURL + "/login/" + username);
            return $http.get(applicationContextURL + "/login/" + username).then(function (success) {
                console.log("===get login details=="+JSON.stringify(success));
                return success;
            }, function (error) {
                console.error('Error while geting user login details-->'+error);
            });

        }
    }
});
