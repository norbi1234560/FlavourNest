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
      console.log($state.current.name)
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
      $scope.commentSendClick=()=>{
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
          loadRecipe()
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

      $scope.hoveredRating = null;

      $scope.setRating = function(rating) {
        $scope.data.rating = rating;
        $scope.$applyAsync();
      };

      $scope.hoverRating = function(rating) {
        $scope.hoveredRating = rating;
      };

      $scope.uploadRatingClick=()=>{

        http.request({
          url:"./php/ratingUpload.php",
          data:{recipe_id:$scope.recipe.id,
                user_id:$rootScope.user.id,
                score:$scope.data.rating,
          }
        })
        .then(response=>{
          console.log(response);
          
        })
        .catch(e=> console.error(e));
      }
      //load in recipe when site is opened
      loadRecipe()

      //single recipe data fetch function
      function loadRecipe() {
        http.request({
          url: "./php/recipe.php",
          data: { 
            id: $stateParams.id ,
          }
        })
        .then(response => {
          if (response=="hiba") {
            $state.go("error404");
            return
          }
          
          let r = response[0];
          ['ingredients','steps','tags','comments','ratings'].
          forEach(key => r[key] = JSON.parse(r[key]));

          r.ingredients.forEach(i => {
            i.originalQuantity = i.quantity;
          });
          
          $scope.recipe = r;
          originalServings = r.servings;
          let averageRatingRounded
          
          //average rating/average rounded rating calculating
          if ($scope.recipe.ratings) { 
            $scope.recipe.averageRating=null;
            $scope.recipe.ratings.forEach(x=>$scope.recipe.averageRating+=x);
            $scope.recipe.averageRating/=$scope.recipe.ratings.length;
            averageRatingRounded=Math.round($scope.recipe.averageRating*2)/2;
          }
          else{
            $scope.recipe.averageRating=null;
          }

          //stars array upload
          $scope.recipe.stars=[];
          for (let i = 1; i <= 5; i++) {
            if (averageRatingRounded >= i) {
                $scope.recipe.stars.push('full');
            } 
            else if (averageRatingRounded >= i - 0.5) {
                $scope.recipe.stars.push('half');
            } 
            else {
                $scope.recipe.stars.push('empty');
            }
          }
          console.log($scope.recipe);
          
          $scope.$applyAsync();
        })
        .catch(e => console.error(e));
        }
      }
  ]);

})(window, angular);
