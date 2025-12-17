;(function(window, angular) {
  'use strict';

  angular.module('app')
  .controller('headerController', [
    '$scope',
    '$rootScope',
    function($scope,$rootScope) {
      //ideiglenes csak azért van hogy ne kelljen folyton bejelentkezni így könnyebb a bugfixelés
      $scope.searchClick=()=>{
        $rootScope.user={
          "id": 1,
          "username": "admin",
          "email": "admin@aa.com",
          "password": "adminadmin",
          "created_at": "2025-11-11 06:30:36",
          "avatar": "batman1teeth.webp"
        }
        $rootScope.$applyAsync();
      }
    }
  ]);

})(window, angular);
