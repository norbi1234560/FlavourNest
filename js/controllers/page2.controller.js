;(function(window, angular) {
  'use strict';

  angular.module('app')
  .controller('page2Controller', [
    '$scope',
    '$state',
    function($scope,$state) {
      console.log($state.current.name);
    }
  ]);

})(window, angular);