app.controller('HomeController', function (UserService, customerService, $scope, $cookies, $cookieStore, $location, $filter, NgMap) {

    $scope.search = false;
    $scope.loaderInCustomer = false;
    $scope.username = $cookies.get("username");
     $scope.image = 'img/locator-point.png';

    $scope.centerPointInCustomer = $cookies.get("center");
    $scope.centerLatitude = $cookies.get("centerLatitude");
    $scope.centerLongitude = $cookies.get("centerLongitude");


console.log("===centerLatitude=="+ $scope.centerLatitude);
console.log("===centerLongitude=="+ $scope.centerLongitude);

   

     window.onresize = function() {
        console.log('juyhbyh');
        NgMap.getMap({class:'mapHeight'}).then(function(map){
            var center= {
                "lat": $scope.centerLatitude,
                "lng": $scope.centerLongitude
            }
            google.maps.event.trigger(map, 'resize');
            console.log(center);
            map.setCenter(center);
    })};

    console.log("==$scope.centerPointInCustomer ===" + $scope.centerPointInCustomer)

    var directionsService = new google.maps.DirectionsService();


    $scope.customMarkers = [
        {
            address: "ADDRESS HERE",
            class: "my1",
            img: "/img/cust/1.png",
            icon: "img/locator-point.png"
        }];

    $scope.searchCustomerAddress = function (customerAddress) {

        $scope.loaderInCustomer = true;
        $scope.customIcon = {
            "scaledSize": [32, 32],
            "url": "http://www.cliparthut.com/clip-arts/823/arrowhead-clip-art-823528.png"
        };
        customerAddress = customerAddress.replace(/,/g, "");
        if (customerAddress != undefined) {

            customerService.getCustomerDetails(customerAddress).then(function (response) {

                if (response.data) {

                    $scope.customerLocationInCustomer = JSON.stringify(angular.copy(response.data.customer_location.latitude + ',' + response.data.customer_location.longitude));
                    $scope.centerPointInCustomer = JSON.stringify(angular.copy(response.data.customer_location.latitude + ',' + response.data.customer_location.longitude));

 $scope.centerLatitude  = Number(response.data.customer_location.latitude);
    $scope.centerLongitude =Number(response.data.customer_location.longitude) ;

                    $scope.etaInCustomer = angular.copy(response.data.ETA);
                     $scope.truckLocationInCustomer = "";

                    if ($scope.etaInCustomer.reason_code == 'ComputedETA') {
                        $scope.truckLocationInCustomer = JSON.stringify(angular.copy(response.data.truck_location.coordinates[0].latitude
                            + ',' + response.data.truck_location.coordinates[0].longitude));
                        $scope.etaInCustomer.reason_code = 'Truck on the way';
                    }


                    $scope.upcoming_schedule = response.data.upcoming_schedule;

                    console.log("=etaInCustomer===" + JSON.stringify($scope.etaInCustomer));
                    console.log("=truck_location111===" + JSON.stringify(response.data.truck_location.coordinates));
                    console.log("=customerLocationInCustomer===" + JSON.stringify($scope.customerLocationInCustomer));
                    console.log("=truckLocationInCustomer===" + JSON.stringify($scope.truckLocationInCustomer));
                    console.log("=centerPointInCustomer===" + $scope.centerPointInCustomer);
                    console.log("=upcoming_schedule===" + $scope.upcoming_schedule);


                    if ($scope.truckLocationInCustomer != "") {
                        var request = {
                            origin: $scope.customerLocationInCustomer,
                            destination: $scope.truckLocationInCustomer,
                            travelMode: google.maps.DirectionsTravelMode.DRIVING
                        };


                        directionsService.route(request, function (response, status) {
                            if (status == google.maps.DirectionsStatus.OK) {
                                var numberofWaypoints = response.routes[0].overview_path.length;
                                var midPoint = response.routes[0].overview_path[parseInt(numberofWaypoints / 2)];
                                $scope.centerPointInCustomer = angular.copy(midPoint.lat() + "," + midPoint.lng());
                                 $scope.centerLatitude =midPoint.lat();
                                 $scope.centerLongitude = midPoint.lng();



console.log("===centerLatitude=="+ $scope.centerLatitude);
console.log("===centerLongitude=="+ $scope.centerLongitude);

                            }
                        });
                    }


                    $scope.search = true;
                    $scope.loaderInCustomer = false;
                } else {
                    console.log("=====no data found in api======");
                }
            });

            /* $scope.customerLocationInCustomer = "29.759436999999998,-95.407568999999995";
             $scope.truckLocationInCustomer = "29.8067259395,-95.4725801058";

             $scope.etaInCustomer = {
             stop_status_cd: "95",
             etaDateTime: "2017-07-06 12:36:00",
             from: "11:06:00.0",
             to: "14:06:00.0",
             reason_code: "RouteNotStarted",
             reason_text: "ETA - Truck not left Yard/Route not started",
             serviced_date_time: null,
             route_id: "H1BK"
             };

             var request = {
             origin: $scope.customerLocationInCustomer,
             destination: $scope.truckLocationInCustomer,
             travelMode: google.maps.DirectionsTravelMode.DRIVING
             };


             directionsService.route(request, function (response, status) {
             if (status == google.maps.DirectionsStatus.OK) {
             var numberofWaypoints = response.routes[0].overview_path.length;
             var midPoint = response.routes[0].overview_path[parseInt(numberofWaypoints / 2)];
             $scope.centerPointInCustomer = angular.copy(midPoint.lat() + "," + midPoint.lng());
             }
             });*/


        }
    };

    var address = $cookies.getObject("address");
    $scope.customerAddress = address[0];
    // $scope.customerAddress = "20046 Fieldtree Drive";

    console.log("====$scope.customerAddress=====" + $scope.customerAddress);

    if ($scope.customerAddress) {
        $scope.searchCustomerAddress($scope.customerAddress);
    }

    $scope.logout = function () {
        angular.forEach($cookies, function (v, k) {
            $cookieStore.remove(k);
        });
        $location.path('/');
    };


    $scope.convertDate = function (strDate) {

        var date = new Date(strDate);
        var newDate = $filter('date')(date, "MM-dd-yyyy hh:mm a", "CST");

        return newDate;
    };

    $scope.getEtaTimeOrServicedTime = function (etaInCustomer) {
       
        if (etaInCustomer.reason_code == 'AlreadyServiced') {
            return $scope.convertDate(etaInCustomer.serviced_date_time);
        } else if (etaInCustomer.reason_code == 'RouteNotStarted') {
            return '';

        } else if (etaInCustomer.reason_code == 'Truck on the way') {
            return $scope.convertDate(etaInCustomer.etaDateTime);
        }

        return '';


    }


});





