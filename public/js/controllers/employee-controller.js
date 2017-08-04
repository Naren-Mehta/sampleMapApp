app.controller('EmployeeController', function (UserService, employeeService,$modal, $scope, $cookies, $location, $cookieStore, $filter, $timeout,NgMap) {

    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer();
    $scope.refresh = true;
    $scope.centerPoint = "";

    $scope.username = $cookies.get("username");
    $scope.image = 'img/locator-point.png';
    $scope.searchEmployee = false;
    $scope.isFirstZoom = false;
    $scope.searchEmployee1 = false;


    $scope.centerPoint = $cookies.get("center");


    $scope.centerLatitude = $cookies.get("centerLatitude");
    $scope.centerLongitude = $cookies.get("centerLongitude");

    window.onresize = function () {

        NgMap.getMap({class: 'mapHeight'}).then(function (map) {
            var center = {
                "lat": $scope.centerLatitude,
                "lng": $scope.centerLongitude
            };
            google.maps.event.trigger(map, 'resize');
            map.setCenter(center);
        })
      
    };

    $scope.quantity = 5;

    $scope.locatorPoint = {
        url: "/img/locator-point.png", // url
        scaledSize: new google.maps.Size(50, 50), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(0, 0) // anchor
    };

    $scope.customMarkers = [
        {
            address: "ADDRESS HERE",
            class: "my1",
            img: "/img/emp/3.png",
            icon: "img/locator-point.png"
        }];

 $scope.setZoomFun = function(){
      
     if($scope.isFirstZoom == true){
         
         NgMap.getMap({class: 'mapHeight'}).then(function (map) {
            $scope.initialZoom = map.getZoom(); 
           
        });
         $scope.isFirstZoom = false;

     }else{
         
         NgMap.getMap({class: 'mapHeight'}).then(function (map) {
            var zoom = map.getZoom();             
             if(map.getZoom()< $scope.initialZoom -2 ){              
                map.setZoom($scope.initialZoom -2);
           }
        });
       
     }
       
};
    
    $scope.searchCustomerAddress = function (customerAddress) {
       /* var completedLine = document.getElementById('completedLine');
        var pendingLine = document.getElementById('pendingLine');
        console.log("----done--------------------------"); 
        if(completedLine != null){
            console.log("=================completed line =====");
            console.log(document.getElementById('completedLine').getAttribute('waypoints'));
            document.getElementById('completedLine').setAttribute('waypoints','');
            document.getElementById('completedLine').setAttribute('origin','');
            document.getElementById('completedLine').setAttribute('destination','');
            console.log("=================completed line =====");
            console.log(document.getElementById('completedLine'));
            
        }
        if(pendingLine != null){
            document.getElementById('pendingLine').setAttribute('waypoints','');
            document.getElementById('pendingLine').setAttribute('origin','');
            document.getElementById('pendingLine').setAttribute('destination','');
            console.log("=================pending line =====");
            console.log(document.getElementById('pendingLine'));
            
        }*/

        $scope.refresh = false;

        if (directionsService != null) {

            directionsDisplay.set('directions', null);
            directionsDisplay = null;
            directionsService=null;
        }
        directionsService = new google.maps.DirectionsService();
        directionsDisplay = new google.maps.DirectionsRenderer();


        $cookies.remove("customerList");
        $cookies.remove("currentCustomer");

        $scope.customerList = [];
        $scope.customerListSorted = [];
        $scope.customerListCompleted = [];
        $scope.customerListPending = [];
        $scope.customerListCompletedWaypoints = [];
        $scope.customerListPendingWaypoints = [];
        $scope.currentCustomer = null;
        $scope.currentCustomerSequence=0;
        $scope.centerPoint="";
        $scope.averageCompletionPercentage=0;
        $scope.currentCustomerServiceStatus="";
        
        /*
        */
        customerAddress = customerAddress.replace(/,/g, "");
        if (customerAddress != undefined) {
            employeeService.getCustomerDetails(customerAddress).then(function (response) {
                   
                    if (response.data.routeStatus == true) {

                        $scope.routeStatus=true;
                           
                        var data = response.data;

                        $scope.customerList = data.customers;
                        $cookies.putObject("customerList", $scope.customerList);
                        $scope.searched_customer = data.searched_customer;
                        $scope.customerListSorted = $filter('orderBy')($scope.customerList, 'sequence');


                        console.log("====2=====");

                        for (var j = 0; j < $scope.customerListSorted.length; j++) {
                           
                            if ($scope.customerListSorted[j].ETA.reason_code == 'AlreadyServiced') {
                           
                                $scope.customerListSorted[j].image = "/img/completeLocation/completed-" + (j + 1) + ".png";
                                $scope.customerListCompleted.push($scope.customerListSorted[j]);

                            } else {
                           
                                $scope.customerListSorted[j].image = "/img/pendingLocation/pending-" + (j + 1) + ".png";
                                $scope.customerListPending.push($scope.customerListSorted[j]);
                            }

                            if ($scope.customerListSorted[j].masUnique == $scope.searched_customer) {
                           
                                $scope.customerListSorted[j].image = "";
                                $scope.currentCustomer = $scope.customerListSorted[j];
                                $scope.currentCustomerSequence = j + 1;
                            }
                        }


                        $cookies.putObject("currentCustomer", $scope.currentCustomer);


                        console.log("==customerListSorted===" + JSON.stringify($scope.customerListSorted));
                        var customerListSize = $scope.customerListSorted.length;
                        var completedListSize = $scope.customerListCompleted.length;

                        var averageCompletion = (completedListSize / customerListSize) * 100;
                        $scope.averageCompletionPercentage = averageCompletion;


                        $scope.centerPoint = $scope.currentCustomer.customer_location.latitude + ',' + $scope.currentCustomer.customer_location.longitude
                        $scope.centerLatitude = Number($scope.currentCustomer.customer_location.latitude);
                        $scope.centerLongitude = Number($scope.currentCustomer.customer_location.longitude);

                        $scope.truckLocation = "";
                     
                     //   if ($scope.currentCustomer.ETA.reason_code == 'ComputedETA') {
                        if (($scope.currentCustomer.ETA.reason_code == 'ComputedETA') ||( $scope.currentCustomer.ETA.reason_code == 'AlreadyServiced' && data.truck_location != "")) {
                            $scope.truckLocation = JSON.stringify(angular.copy(data.truck_location.coordinates[0].latitude +
                                ',' + data.truck_location.coordinates[0].longitude));
                            $scope.centerPoint = $scope.truckLocation;

                            $scope.centerLatitude = Number(data.truck_location.coordinates[0].latitude);
                            $scope.centerLongitude = Number(data.truck_location.coordinates[0].longitude);
                            /*if( $scope.currentCustomer.ETA.reason_code == 'AlreadyServiced'){
                             $scope.currentCustomerServiceStatus = $scope.currentCustomer.ETA.reason_code;
                            }*/
                            if( $scope.currentCustomer.ETA.reason_code == 'ComputedETA'){
                                $scope.currentCustomerServiceStatus = 'Truck On The Way';
                            }else{
                                $scope.currentCustomerServiceStatus = $scope.currentCustomer.ETA.reason_code;
                            }
                        } else {
                            $scope.currentCustomerServiceStatus = $scope.currentCustomer.ETA.reason_code;
                        }

                        $scope.searched_customer = data.searched_customer;
                        $scope.customerListCompletedOrigin = "";
                        $scope.customerListCompletedDestination = "";
                        $scope.customerListCompletedWaypoints = [];

                        if ($scope.customerListCompleted.length > 0) {
                            $scope.customerListCompletedOrigin = $scope.customerListCompleted[0].customer_location.latitude
                                + ',' + $scope.customerListCompleted[0].customer_location.longitude;
                            $scope.customerListCompletedDestination = $scope.truckLocation;
                            for (var i = 0; i < $scope.customerListCompleted.length; i++) {
                                if (i != 0) {
                                    $scope.customerListCompletedWaypoints.push(
                                        {
                                            location: new google.maps.LatLng($scope.customerListCompleted[i].customer_location.latitude,
                                                $scope.customerListCompleted[i].customer_location.longitude),
                                            stopover: true
                                        }
                                    );
                                }
                            }
                        }


                        $scope.customerListPendingOrigin = "";
                        $scope.customerListPendingDestination = "";
                        $scope.customerListPendingWaypoints = [];

                        var length = $scope.customerListPending.length;
                        if (length > 0) {

                            if ($scope.truckLocation != "") {
                                $scope.customerListPendingOrigin = $scope.truckLocation;
                            } else {
                                $scope.customerListPendingOrigin = $scope.customerListPending[0].customer_location.latitude + ',' +
                                    $scope.customerListPending[0].customer_location.longitude;
                            }

                            $scope.customerListPendingDestination = $scope.customerListPending[length - 1].customer_location.latitude
                                + ',' + $scope.customerListPending[length - 1].customer_location.longitude;

                            for (var i = 0; i < $scope.customerListPending.length - 1; i++) {

                                if ($scope.truckLocation == "") {
                                    if (i != 0) {
                                        $scope.customerListPendingWaypoints.push(
                                            {
                                                location: new google.maps.LatLng($scope.customerListPending[i].customer_location.latitude,
                                                    $scope.customerListPending[i].customer_location.longitude),
                                                stopover: true
                                            }
                                        );
                                    }
                                } else {
                                    $scope.customerListPendingWaypoints.push(
                                        {
                                            location: new google.maps.LatLng($scope.customerListPending[i].customer_location.latitude,
                                                $scope.customerListPending[i].customer_location.longitude),
                                            stopover: true
                                        }
                                    );
                                }

                            }
                        }

                        console.log("====currentCustomer===" + JSON.stringify($scope.currentCustomer));


                        console.log("====truck===" + JSON.stringify($scope.truckLocation));

                        console.log("====completed===" + JSON.stringify($scope.customerListCompleted));
                        console.log("====customerListCompletedOrigin===" + JSON.stringify($scope.customerListCompletedOrigin));
                        console.log("====customerListCompletedDestination===" + JSON.stringify($scope.customerListCompletedDestination));
                        console.log("====customerListCompletedWaypoints===" + JSON.stringify($scope.customerListCompletedWaypoints));

                        console.log("====customerListPending===" + JSON.stringify($scope.customerListPending));
                        console.log("====customerListPendingOrigin===" + JSON.stringify($scope.customerListPendingOrigin));
                        console.log("====customerListPendingDestination===" + JSON.stringify($scope.customerListPendingDestination));
                        console.log("====customerListPendingWaypoints===" + JSON.stringify($scope.customerListPendingWaypoints));


                        var request = {};
                        if ($scope.truckLocation == "") {
                            request = {
                                origin: $scope.customerListSorted[0].customer_location.latitude + ',' + $scope.customerListSorted[0].customer_location.longitude,
                                destination: $scope.currentCustomer.customer_location.latitude + ',' + $scope.currentCustomer.customer_location.longitude,
                                travelMode: google.maps.DirectionsTravelMode.DRIVING
                            };
                        } else {
                            request = {
                                origin: $scope.currentCustomer.customer_location.latitude + ',' + $scope.currentCustomer.customer_location.longitude,
                                destination: $scope.truckLocation,
                                travelMode: google.maps.DirectionsTravelMode.DRIVING
                            };
                        }


                        directionsDisplay.setOptions({suppressMarkers: true});

                        directionsService.route(request, function (response, status) {
                            if (status == google.maps.DirectionsStatus.OK) {
                                var numberofWaypoints = response.routes[0].overview_path.length;
                                var midPoint = response.routes[0].overview_path[parseInt(numberofWaypoints / 2)];
                                $scope.centerPoint = midPoint.lat() + "," + midPoint.lng();

                                $scope.centerLatitude = midPoint.lat();
                                $scope.centerLongitude = midPoint.lng();
                            }
                        });

                        $scope.searchEmployee = true;
                        
                        
                        $scope.isFirstZoom = true;

                        console.log("==$scope.refresh==="+$scope.refresh);

                        window.setTimeout(function(){
                            $scope.$apply();
                        },100);

                        $timeout(function(){
                            $scope.refresh=true;
                            console.log("==$scope.refresh=in=="+$scope.refresh);

                        },1);

                        console.log("==$scope.refresh=2=="+$scope.refresh);                                              
                        document.getElementById("demo").style.display = "none";

                    }

                    else {


                        $scope.searchEmployee = false;
                        document.getElementById("demo1").style.display = "block";
                        document.getElementById("demo").style.display = "block";                        
                        document.getElementById("demo").innerHTML = "There is no service for this address today";                                      
                        var modal = document.getElementsByClassName('myModal'); 
                        var span = document.getElementsByClassName("close1")[0];
                        span.onclick = function() {
                           document.getElementById("demo1").style.display = "none";
                        }                                           




                    }
                }
            );

        }

    }
    ;
   
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

        } else if (etaInCustomer.reason_code == 'ComputedETA') {
            return $scope.convertDate(etaInCustomer.etaDateTime);
        }
        return '';
    }

    $scope.getRowClass = function (customer) {

        if (customer.masUnique == $scope.currentCustomer.masUnique) {
            return "warning"
        } else if (customer.ETA.reason_code == 'AlreadyServiced') {
            return "success";
        } else {
            return "default";
        }

    }
     $scope.showPlus = true;
     $scope.searchEmployee2 = true;

     $scope.hideCurrentCustomer = function (index) {
        console.log("===hide====");

        var showVar = 'show_' ;
        $scope[showVar] = false;
        var  showPlus ='showPlus_';
        $scope[showPlus] = false;
        $scope.searchEmployee = true;
        $scope.searchEmployee1 = false;
        $scope.searchEmployee2 = true;


    };

    $scope.showCurrentCustomer = function (index) {

       var  showPlus ='showPlus_';
        var showVar = 'show_' ;
        $scope[showVar] = true;
        $scope[showPlus] = true;
         $scope.searchEmployee = true;
         $scope.searchEmployee1 = true;
         $scope.searchEmployee2 = false;

    };

    

    



})
;

















