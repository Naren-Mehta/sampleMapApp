app.controller('LoginController', function ($location, loginService, FlashService, $scope, $cookies, $modalInstance) {


    var vm = this;

    $scope.login = function (username, password) {

        vm.dataLoading = true;

        if (username != undefined) {

            if (username.indexOf("@wm.com") !== -1) {
                $cookies.put("username", username);
                $cookies.put("role", "employee");

                $scope.loginErrorMsg = '';
                $location.path('/employee');
                $modalInstance.close();
            } else {
                loginService.authenticate(username).then(function (response) {
                    if (response.data.length > 0) {
                        $scope.loginErrorMsg = "Incorrect username or password. Please try again."
                    } else {
                        $cookies.put("username", username);
                        $cookies.put("role", "customer");

                        var addressWithFormat = [];
                        var address = response.data.address;
                        for (var i = 0; i < address.length; i++) {
                            var adrs = address[i].street + ' ' + address[i].city + ' ' + address[i].state;
                            addressWithFormat.push(adrs);
                        }
                        $cookies.putObject("address", addressWithFormat);
                        $scope.loginErrorMsg = '';
                        $location.path('/home');
                        $modalInstance.close();
                    }
                });
            }
        } else {
            $scope.loginErrorMsg = "Please enter username or password"
        }

    };


});
