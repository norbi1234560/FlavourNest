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
        console.log($scope.allRecipes);
        $scope.$applyAsync(); 
      })
      
      window.addEventListener("resize",(e)=>{
        if (window.innerWidth<200) {
          for (let index = 0; index < $scope.allRecipes.length; index++) {
            $scope.allRecipes[index].image="t.png";
          }
          $scope.$applyAsync();
        }
      })
    }
  ]);

})(window, angular);