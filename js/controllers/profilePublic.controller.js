;(function(window, angular) {
  'use strict';

  angular.module('app')
  .controller('profilePublicController', [
    '$scope',
    '$stateParams',
    function($scope, $stateParams) {
      $scope.user=$stateParams.author_username;
      console.log($scope.user);
      
      $scope.$applyAsync();
    }
  ]);

})(window, angular);
