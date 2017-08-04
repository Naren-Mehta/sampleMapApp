var app = angular.module('app', ['ngRoute', 'ngCookies', 'ngAnimate', 'ngSanitize', 'ui.bootstrap', 'ngMap', 'angularUtils.directives.dirPagination']).constant('applicationContextURL','/api/v1');;

console.log("=======main======");

app.config(['$qProvider', function($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            controller: 'LandingController',
            templateUrl: '../views/landing.html',
            controllerAs: 'vm'
        })

        .when('/home', {
            controller: 'HomeController',
            templateUrl: '../views/home.view.html',
            controllerAs: 'vm'
        })
        .when('/login', {
            // controller: 'LoginController',
            templateUrl: '../views/login.view.html',
            controllerAs: 'vm'
        })

        .when('/register', {
            controller: 'RegisterController',
            templateUrl: '../views/register.view.html',
            controllerAs: 'vm'
        })
        .when('/employee', {
            controller: 'EmployeeController',
            templateUrl: '../views/employee.view.html',
            controllerAs: 'vm'
        })
        .when('/employee_mob', {
            controller: 'Employee_MobController',
            templateUrl: '../views/employee_mob.view.html',
            controllerAs: 'vm'
        })


        .otherwise({redirectTo: '/'});
});

