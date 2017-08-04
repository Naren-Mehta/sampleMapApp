app.controller('LandingController', function($scope,$modal,$rootScope,$cookies) {


    var options = {
        enableHighAccuracy: true
    };
    navigator.geolocation.getCurrentPosition(function(pos) {
            $scope.center=JSON.stringify(angular.copy(pos.coords.latitude +","+pos.coords.longitude));
            $scope.$digest();
            console.log("==="+$scope.center);

            $cookies.put("center", $scope.center);
            $cookies.put("centerLatitude",pos.coords.latitude);
            $cookies.put("centerLongitude", pos.coords.longitude);

             $rootScope.centerLatitude =pos.coords.latitude;
             $rootScope.centerLongitude = pos.coords.longitude;

        },
        function(error) {
            alert('Unable to get location: ' + error.message);
        }, options);


    $scope.open = function () {
        var modalInstance = $modal.open({
            templateUrl: 'loginView.html',
            controller: 'LoginController',
            backdrop: 'static',
            resolve: {
                items: function () {
                    return 1;
                }
            }
        });

    };

});


















