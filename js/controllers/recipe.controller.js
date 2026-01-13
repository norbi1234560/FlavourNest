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
        
        r.ingredients = JSON.parse(r.ingredients || '[]');
        r.steps       = JSON.parse(r.steps || '[]');
        r.tags        = JSON.parse(r.tags || '[]');
        r.comments    = JSON.parse(r.comments || '[]');

        $scope.recipe = r;
        $scope.$applyAsync();
      })
      .catch(e=> console.error(e));
    }
  ]);

})(window, angular);
