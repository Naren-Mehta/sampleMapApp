app.service('employeeService', function ($http, applicationContextURL) {

    return {
        getCustomerDetails: function (address) {
            return $http.get(applicationContextURL + "/employee/" + address).then(function (success) {
                console.log("===get employee details=="+JSON.stringify(success));
                return success;
            }, function (error) {
                console.error('Error while getting employ details '+error);
            });

        }
    }

});
