;(function(window, angular) {
  'use strict';

  angular.module('app')
  .controller('headerController', [
    '$scope',
    '$rootScope',
    function($scope,$rootScope) {
      //ideiglenes csak azért van hogy ne kelljen folyton bejelentkezni így könnyebb volt a profile html designját megnézni
      $scope.searchClick=()=>{
        $rootScope.user={
          "id": 1,
          "username": "admin",
          "email": "admin@aa.com",
          "password": "adminadmin",
          "created_at": "2025-11-11 06:30:36",
          "avatar": "speed-ishowspeed.gif"
        }
        $rootScope.$applyAsync();
      }
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
