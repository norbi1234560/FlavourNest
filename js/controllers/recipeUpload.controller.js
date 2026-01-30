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
          prep_time_minutes: null
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
            instruction: ''
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
          for (let index = 0; index < $scope.steps.length; index++) {
            $scope.steps[index]["postition"]=index+1;
          }

          let completeRecipe = {
            recipe: $scope.recipeUpload,
            ingredients: $scope.ingredients,
            steps: $scope.steps
          };

          //delete not important keys
          $scope.ingredients.forEach(ingredient=>{
            delete ingredient.showList;
            delete ingredient.searchText;  
          });

          http.request({
            url:"./php/uploadRecipe.php",
            data: completeRecipe
          })
          .then(response=>{
            console.log(response);
          })
          .catch(e=> console.error(e)); 

        };

      }
    ]);

})(window, angular);
