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
            $rootScope.user=response;
            console.log(response);
            $rootScope.$applyAsync();
            $state.go("home");
        })
        .catch(e=> alert(e));
      }
    }
  ]);

})(window, angular);
