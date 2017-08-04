app.controller('Employee_MobController', function (UserService, $rootScope, customerService, $log, $document, $cookies, $cookieStore, $scope) {

    $scope.customerList = $cookies.getObject("customerList");
$scope.currentCustomer = $cookies.getObject("currentCustomer");
    $scope.search = true;
    $scope.showPlus = true;

    $scope.showCurrentCustomer = function (index) {

       var  showPlus ='showPlus_'+index;
        var showVar = 'show_' + index;
        $scope[showVar] = true;
        $scope[showPlus] = true;

    };

    $scope.hideCurrentCustomer = function (index) {
        console.log("===hide====");

        var showVar = 'show_' + index;
        $scope[showVar] = false;
        var  showPlus ='showPlus_'+index;
        $scope[showPlus] = false;


    };

    $scope.getRowClass=function(customer){


console.log("==="+customer.reason_text)
console.log("==="+customer.reason_text)


if(customer.masUnique == $scope.currentCustomer.masUnique){
return "warning"
}else if(customer.ETA.reason_code == 'AlreadyServiced'){
    return "success";
}else{
    return "default";
}

        }


});

















