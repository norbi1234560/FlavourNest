;(function(window, angular) {
  'use strict';

  angular.module('app')
  .controller('recipeController', [
    '$state',
    'http',
    '$scope',
    '$stateParams',
    '$rootScope',
    function($state, http, $scope, $stateParams,$rootScope) {

      
      console.log("Recipe controller runing...")
      let originalServings;
      
      //servings minus button click
      $scope.servingMinus=()=>{
        if ($scope.recipe.servings > 1) {
          $scope.recipe.servings -= 1;
          calculateServings();
          $scope.$applyAsync();  
        }
      }

      //servings plus button click
      $scope.servingPlus=()=>{
        $scope.recipe.servings += 1;
        calculateServings();
        $scope.$applyAsync();
      }

        $scope.data={
          comment:"",
          rating:null
        }      

      //comment click
      $scope.commentClick=()=>{
        console.log($scope.data.comment);
        http.request({
          url:"./php/commentUpload.php",
          data:{
            content:$scope.data.comment,
            recipe_id:$scope.recipe.id,
            user_id:$rootScope.user.id
          }})
        .then(response=>{
          alert("sikeres hozzászólás");
          $scope.data.comment="";
          $scope.$applyAsync();
        })
        .catch(e=> console.error(e))
      }

      //calculate servings(- / +)
      function calculateServings() {
        let factor = $scope.recipe.servings / originalServings;

        $scope.recipe.ingredients.forEach(i => {
          i.quantity = i.originalQuantity * factor;
        });
      }

      //single recipe data fetch
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
      })
      .catch(e => console.error(e));
      }
  ]);

})(window, angular);
