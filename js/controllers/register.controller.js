;(function(window, angular) {
  'use strict';

  angular.module('app')
  .controller('registerController', [
    '$scope',
    '$state',
    'http',
    '$rootScope',
    function($scope, $state, http, $rootScope) {
      console.log($state.current.name)
      $scope.registerClick=()=>{
        http.request({
          url:"./php/register.php",
          data:$scope.user,
        })
        .then(response=>{
          console.log(response);
          alert("sikeres regisztráció");
          $rootScope.user=response[0];
          $rootScope.$applyAsync();
          $state.go("home");
        })
        .catch(e=> console.error(e))
        
      }
    }
  ]);

})(window, angular);