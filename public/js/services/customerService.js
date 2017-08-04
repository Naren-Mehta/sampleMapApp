app.service('customerService', function ($http, applicationContextURL) {

    return {
        getCustomerDetails: function (address) {
            console.log("===get customer details=="+ applicationContextURL + "/customer/" + address);

            return $http.get(applicationContextURL + "/customer/" + address).then(function (success) {
                console.log("===get customer details=="+JSON.stringify(success));
                return success;
            }, function (error) {
                console.error('Error while adding new driver'+error);
            });

        }
    }

});
