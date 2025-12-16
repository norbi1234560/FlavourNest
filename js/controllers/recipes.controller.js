;(function(window, angular) {
  'use strict';

  angular.module('app')
  .controller('recipesController', [
    '$scope',
    '$state',
    '$timeout',
    '$rootScope',
    function($scope, $state, $timeout, $rootScope) {
      console.log($state.current.name);
      
    }
  ]);

})(window, angular);