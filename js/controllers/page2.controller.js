;(function(window, angular) {
  'use strict';

  angular.module('app')
  .controller('page2Controller', [
    '$scope',
    function($scope) {
      console.log($state.current.name);
    }
  ]);

})(window, angular);