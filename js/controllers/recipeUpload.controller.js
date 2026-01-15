;(function(window, angular) {
  'use strict';

  angular.module('app')
  .controller('recipeUploadController', [
    '$state',
    function($state) {
      console.log($state.current.name);
    }
  ]);

})(window, angular);
