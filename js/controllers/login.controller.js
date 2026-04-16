;(function(window, angular) {
  'use strict';

  angular.module('app')
  .controller('loginController', [
    '$scope',
    'http',
    '$state',
    '$rootScope',
    function($scope, http, $state, $rootScope) {
      console.log($state.current.name);
      
      //login
      $scope.loginClick = () => {

        $scope.emailBool = false;
        $scope.passwordBool = false;

        if ($scope.loginForm.$valid) {
          http.request({
            url: "./php/login.php",
            data: $scope.user,
          })
          .then(response => {
            $rootScope.user = response;
            console.log($rootScope.user);
            
            $state.go("home");
          })
          .catch(e => alert(e));
        
        } 
        else{
        
          if ($scope.loginForm.emailName.$invalid) {
            $scope.emailBool = true;
          }
        
          if ($scope.loginForm.passwordName.$invalid) {
            $scope.passwordBool = true;
          }
        }
      };
    }
  ]);

})(window, angular);
