;(function (window, angular) {
  'use strict';

  angular.module('app')
    .controller('recipeUploadController', [
      '$scope',
      'http',
      function ($scope, http) {
        $scope.clickedIng=(e)=>{
          console.log(e);
          
        }
        //get all ingredient
        http.request("./php/getAllIngredient.php")
        .then(response=>{
          console.log(response);
          $scope.ingredientOptions=response;
          $scope.$applyAsync();
        })
        .catch(e=> console.error(e));

        //scope recipeUpload variable
        $scope.recipeUpload = {
          title: '',
          description: '',
          servings: null,
          preptime: null
        };

        $scope.ingredients = [];

        //add ingridient click
        $scope.buttonAddIngredient=()=> {
          $scope.ingredients.push({
            ingredient_id: '',
            quantity: '',
            unit: ''
          });
        };

        $scope.deleteIngredient=(index)=> {
          $scope.ingredients.splice(index, 1);
        };

        $scope.steps = [];

        //add steps click
        $scope.buttonAddStep=()=> {
          $scope.steps.push({
            description: ''
          });
        };

        //delete step
        $scope.deleteStep=(index)=> {
          $scope.steps.splice(index, 1);
        };

        //base init
        $scope.buttonAddIngredient();
        $scope.buttonAddStep();

        //submit
        $scope.recipeUploadClick=()=> {
          let completeRecipe = {
            recipe: $scope.recipeUpload,
            ingredients: $scope.ingredients,
            steps: $scope.steps
          };

          console.log(completeRecipe);
        };

      }
    ]);

})(window, angular);
