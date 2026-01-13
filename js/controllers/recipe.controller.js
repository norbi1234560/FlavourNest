;(function(window, angular) {
  'use strict';

  angular.module('app')
  .controller('recipeController', [
    '$state',
    'http',
    '$scope',
    '$stateParams',
    function($state, http, $scope, $stateParams) {
      console.log("hello");
      
      console.log($stateParams.id)
      http.request({url:"./php/recipe.php",data:{id:$stateParams.id}})
      .then(response=>{
        console.log(response);
        let r = response[0];
        let originalQuantity=r.servings;
        ['ingredients','steps','tags'].forEach(key => r[key] = JSON.parse(r[key]));

        $scope.recipe = r;
        $scope.$applyAsync();
        
        $scope.servingMinus=()=>{
          $scope.recipe.servings-=1;
          calculateServigns()
          $scope.$applyAsync();
        }

        $scope.servingPlus=()=>{
          $scope.recipe.servings+=1;
          calculateServigns()
          $scope.$applyAsync();
        }

        function calculateServigns() {
          let factor = $scope.recipe.servings / originalQuantity;
          r.ingredients.forEach(i => i.quantity *= factor);
        }
      })
      .catch(e=> console.error(e));
    }
  ]);

})(window, angular);
