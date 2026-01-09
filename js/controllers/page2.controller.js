;(function(window, angular) {
  'use strict';

  angular.module('app')
  .controller('page2Controller', [
    '$state',
    'http',
    '$scope',
    function($state, http, $scope) {

      http.request("./php/recipe.php")
      .then(response => {

        let r = response[0];

        r.ingredients = JSON.parse(r.ingredients || '[]');
        r.steps       = JSON.parse(r.steps || '[]');
        r.tags        = JSON.parse(r.tags || '[]');
        r.comments    = JSON.parse(r.comments || '[]');

        $scope.recipe = r;
        $scope.$applyAsync();
        console.log($scope.recipe);
        
      });

    }
  ]);

})(window, angular);
