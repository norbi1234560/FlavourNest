;(function(window, angular) {
  'use strict';

  angular.module('app')
  .controller('homeController', [
    '$state',
    function($state) {
      console.log($state.current.name);

    }
  ]);

})(window, angular);
