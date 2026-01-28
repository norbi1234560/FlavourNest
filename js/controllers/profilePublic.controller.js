;(function(window, angular) {
  'use strict';

  angular.module('app')
  .controller('profilePublicController', [
    '$scope',
    '$stateParams',
    'http',
    function($scope, $stateParams, http) {w3s3 
      $scope.user=$stateParams.author_username;
      console.log($scope.user);
      
      $scope.$applyAsync();
    }
  ]);

})(window, angular);
