;(function(window, angular) {
  'use strict';

  angular.module('app')
  .controller('homeController', [
    '$scope',
    '$state',
    '$timeout',
    'http',
    function($scope, $state, $timeout,http) {
      console.log($state.current.name);

    }
  ]);

})(window, angular);
