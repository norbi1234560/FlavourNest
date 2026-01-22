;(function(window, angular) {
  'use strict';

  angular.module('app')
  .controller('profilePublicController', [
    '$scope',
    '$stateParams',
    function($scope, $stateParams) {
      console.log($stateParams);
    }
  ]);

})(window, angular);
