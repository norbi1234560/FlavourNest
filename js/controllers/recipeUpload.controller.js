;(function (window, angular) {
  'use strict';

  angular.module('app')
    .controller('recipeUploadController', [
      '$scope',
      'http',
      '$rootScope',
      '$state',
      function ($scope, http, $rootScope, $state) {
        // if (!$rootScope.user) {
        //   $state.go("login") 
        // }
        //get all ingredient
        http.request("./php/getAllIngredientAndTags.php")
        .then(response=>{
          $scope.ingredientOptions=response.ingredients;
          $scope.tagOptions=response.tags;
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
          $scope.recipeUpload.author_id=$rootScope.user.id;
          
          for (let index = 0; index < $scope.steps.length; index++) {
            $scope.steps[index]["position"]=index+1;
          }

          let completeRecipe = {
            recipe: $scope.recipeUpload,
            ingredients: $scope.ingredients,
            steps: $scope.steps
          };
          console.log(completeRecipe);
          

          //delete not required keys
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
    ])

    .directive("fileInput", [
    () => {
      return {
        require: "ngModel",
        scope: false,
        compile: () => {
          return {
            post: (scope, element, attrs, ngModel) => {
              element[0].addEventListener("change", () => {
                if (!element[0].files.length) {
                        element[0].setAttribute('data-file-choice-cancel', true);
                        ngModel.$setViewValue(null);          
                } else  ngModel.$setViewValue(element[0].files[0]);
                ngModel.$render();
                scope.$applyAsync();
              });
            }
          };
        }
      }
    }
  ])
})(window, angular);
