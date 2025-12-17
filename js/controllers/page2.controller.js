;(function(window, angular) {
  'use strict';

  angular.module('app')
  .controller('page2Controller', [
    '$state',
    function($state) {
      console.log($state.current.name);
    }
  ]);

})(window, angular);