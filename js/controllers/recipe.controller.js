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
      console.log($stateParams.id);

      http.request({
        url: "./php/recipe.php",
        data: { id: $stateParams.id }
      })
      .then(response => {
        let r = response[0];

        ['ingredients','steps','tags'].forEach(
          key => r[key] = JSON.parse(r[key])
        );

        let originalServings = r.servings;

        r.ingredients.forEach(i => {
          i.originalQuantity = i.quantity;
        });

        $scope.recipe = r;
        $scope.$applyAsync();

        $scope.servingMinus = () => {
          if ($scope.recipe.servings > 1) {
            $scope.recipe.servings -= 1;
            calculateServings();
            $scope.$applyAsync();
          }
        };

        $scope.servingPlus = () => {
          $scope.recipe.servings += 1;
          calculateServings();
          $scope.$applyAsync();
        };

        function calculateServings() {
          let factor = $scope.recipe.servings / originalServings;

          r.ingredients.forEach(i => {
            i.quantity = i.originalQuantity * factor;
          });
        }

      })
      .catch(e => console.error(e));
    }
  ]);

})(window, angular);
