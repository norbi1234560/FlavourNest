;(function(window, angular) {
  'use strict';

  angular.module('app')
  .controller('recipeUploadController', [
    '$state',
    '$scope',
    function($state, $scope) {
      console.log($state.current.name);
      $scope.recipeUploadClick=()=>{
        console.log("asd");
        console.log($scope.recipeUpload)
        
      }
    }
  ]);

})(window, angular);
