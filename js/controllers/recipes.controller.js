;(function(window, angular) {
  'use strict';

  angular.module('app')
  .controller('recipesController', [
    '$state',
    'http',
    '$scope',
    function($state, http, $scope) {
      console.log($state.current.name);
      
      $scope.searchName = '';
      $scope.minRating = 0;
      $scope.maxTime = null;
      
      http.request("./php/allRecipe.php")
      .then(response => {
        $scope.allRecipes = response;
        console.log($scope.allRecipes);
        $scope.$applyAsync();
      });

      $scope.filterByName = function(recipe) {
        if (!$scope.searchName) return true;
        return recipe.title.toLowerCase().includes($scope.searchName.toLowerCase()) ||
               (recipe.description && recipe.description.toLowerCase().includes($scope.searchName.toLowerCase()));
      };
      
      $scope.filterByRating = function(recipe) {
        if ($scope.minRating == 0) return true;
        var rating = recipe.average_rating || 0;
        return rating >= parseFloat($scope.minRating);
      };
      
      $scope.filterByTime = function(recipe) {
        if (!$scope.maxTime) return true;
        return recipe.prep_time_minutes <= $scope.maxTime;
      };
      
      $scope.clearFilters = function() {
        $scope.searchName = '';
        $scope.minRating = 0;
        $scope.maxTime = null;
      };
    }
  ]);
})(window, angular);