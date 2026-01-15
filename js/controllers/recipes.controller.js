;(function(window, angular) {
  'use strict';

  angular.module('app')
  .controller('recipesController', [
    '$state',
    'http',
    '$scope',
    function($state,http,$scope) {
      console.log($state.current.name);
      http.request("./php/allRecipe.php")
      .then(response=>{
        $scope.allRecipes=response;
        $scope.$applyAsync(); 
      })
    }
  ]);

})(window, angular);