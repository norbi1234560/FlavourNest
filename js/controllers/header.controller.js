;(function(window, angular) {
  'use strict';

  angular.module('app')
  .controller('headerController', [
    '$scope',
    '$rootScope',
    '$state',
    function($scope,$rootScope,$state) {
      
      //logout
      $rootScope.logoutClick=()=>{
        $rootScope.user=null;
        $rootScope.$applyAsync();
        setTimeout(() => {
          alert("sikeres kijentkezés");
          $state.go("home");
        }, 50);
      }

      
    }
  ]);

})(window, angular);
