;(function(window, angular) {
  'use strict';

  angular.module('app')
  .controller('recipeController', [
    '$state',
    'http',
    '$scope',
    '$stateParams',
    function($state, http, $scope, $stateParams) {
      console.log($stateParams.id);

      let originalServings;
      
      //servings minus button click
      $scope.servingMinus = () => {
        if ($scope.recipe.servings > 1) {
          $scope.recipe.servings -= 1;
          calculateServings();
          $scope.$applyAsync();  
        }
      }
      //servings plus button click
      $scope.servingPlus = () => {
        $scope.recipe.servings += 1;
        calculateServings();
        $scope.$applyAsync();
      }

      //calculate servings(- / +)
      function calculateServings() {
        let factor = $scope.recipe.servings / originalServings;

        $scope.recipe.ingredients.forEach(i => {
          i.quantity = i.originalQuantity * factor;
        });
      }

      //single recipe complicated data fetch
      http.request({
        url: "./php/recipe.php",
        data: { id: $stateParams.id }
      })
      .then(response => {
        let r = response[0];
        ['ingredients','steps','tags','comments','ratings'].forEach(key => r[key] = JSON.parse(r[key]));

        r.ingredients.forEach(i => {
          i.originalQuantity = i.quantity;
        });

        $scope.recipe = r;
        originalServings = r.servings;
        $scope.$applyAsync();
        console.log(r);
        
      })
      .catch(e => console.error(e));
      }
  ]);

})(window, angular);
