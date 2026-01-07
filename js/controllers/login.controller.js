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
      $scope.loginClick=()=>{
        http.request({
          url:"./php/login.php",
          data:$scope.user,
        })
        .then(response=>{
          if (response==null) {
            alert("helytelen jelszó vagy email cím");
          }
          else{
            $rootScope.user=response[0];
            $rootScope.$applyAsync();
            $state.go("home");
          }
        })
        .catch(e=> console.error(e));
      }
    }
  ]);

})(window, angular);
