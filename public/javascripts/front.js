var userManagementApp = angular.module('userManagementApp' , ['ngRoute']);

userManagementApp.controller("usersCtrl", ['$scope','$http','$window',
  function($scope, $http, $window) {
    $http.get('/api/users').
    success(function(data, status, headers, config) {
      $scope.users = data.users;
    });
}]);

userManagementApp.controller("addCtrl", ['$scope','$http','$window','$location',
  function($scope, $http, $window, $location) {
    $scope.post = function () {
      $http.post('/api/users', $scope.form).
        success(function(data) {
          console.log(data);
          if (data.message == "User created")
            $location.path('/users');
          else
            window.alert("Username already taken");
        });
    };
}]);

userManagementApp.controller("userCtrl", ['$scope','$http','$routeParams',
  function($scope, $http, $routeParams) {
    $http.get('api/user/' + $routeParams.name).
    success(function(data,status,headers,config) {
      $scope.user = data.user;
    });
}]);

userManagementApp.controller("deleteCtrl", ['$scope','$http', '$routeParams', '$location',
  function($scope, $http, $routeParams, $location) {
    $http.get('api/user/' + $routeParams.name).
    success(function(data,status,headers,config) {
      $scope.user = data.user;
    });

    $scope.yes = function () {
      $http.delete('api/user/' + $routeParams.name).
      success(function(data,status,headers,config) {
        $location.url('/users');
      });
    };

    $scope.no = function () {
      $location.url('/users');
    };
}]);

userManagementApp.controller("loginCtrl", ['$scope','$http','$window','$location',
  function($scope, $http, $window, $location) {
    $scope.post = function () {
      $http.post('/api/auth', $scope.form).
        success(function(data) {
          $window.localStorage.token = data.token;
          $location.url('/users');
        }).
        error(function(data) {
          window.alert(data.message);
        });
    };
}]);

userManagementApp.controller("indexCtrl", ['$scope','$http',
  function($scope, $http) {
}]);

userManagementApp.config(['$routeProvider','$httpProvider',
  function($routeProvider,$httpProvider) {
      $routeProvider
          .when('/', {
            templateUrl: 'partials/index',
            controller: 'indexCtrl'
          })
          .when('/users', {
            templateUrl: 'partials/users',
            controller: 'usersCtrl'
          })
          .when('/user/:name', {
            templateUrl: 'partials/user',
            controller: 'userCtrl'
          })
          .when('/add', {
            templateUrl: 'partials/add',
            controller: 'addCtrl'
          })
          .when('/delete/:name', {
            templateUrl: 'partials/delete',
            controller: 'deleteCtrl'
          })
          .when('/login', {
            templateUrl: 'partials/login',
            controller: 'loginCtrl'
          })
          .otherwise({
              redirectTo: '/'
          });

          $httpProvider.interceptors.push(['$q', '$location', '$window', function ($q, $location, $window) {
             return {
                 'request': function (config) {
                     config.headers = config.headers || {};
                     if ($window.localStorage.token) {
                         config.headers.Authorization = 'Bearer ' + $window.localStorage.token;
                     }
                     return config;
                 },
                 'responseError': function (response) {
                     if (response.status === 401 || response.status === 403) {
                         $location.path('/login');
                     }
                     return $q.reject(response);
                 }
             };
          }]);
}]);
