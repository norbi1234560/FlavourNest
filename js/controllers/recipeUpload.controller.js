;(function (window, angular) {
  'use strict';

  angular.module('app')
    .controller('recipeUploadController', [
      '$scope',
      'http',
      '$rootScope',
      '$state',
      function ($scope, http, $rootScope, $state) {
        http.request("./php/getAllIngredientAndTags.php")
          .then(response => {
            $scope.ingredientOptions = response.ingredients;
            $scope.tagOptions = response.tags;
            $scope.$applyAsync();
          })
          .catch(e => console.error(e));

        $scope.recipeUpload = {
          title: '',
          description: '',
          servings: null,
          prep_time_minutes: null,
          image: null
        };

        $scope.ingredients = [];

        $scope.buttonAddIngredient = () => {
          $scope.ingredients.push({
            ingredient_id: '',
            quantity: '',
            unit: ''
          });
        };

        $scope.deleteIngredient = (index) => {
          $scope.ingredients.splice(index, 1);
        };

        $scope.steps = [];

        $scope.buttonAddStep = () => {
          $scope.steps.push({
            instruction: ''
          });
        };

        $scope.deleteStep = (index) => {
          $scope.steps.splice(index, 1);
        };

        $scope.buttonAddIngredient();
        $scope.buttonAddStep();

        $scope.recipeUploadClick = () => {

          if (!$scope.recipeUpload.image) {
            alert("Please select an image!");
            return;
          }

          if (!($scope.recipeUpload.image instanceof File)) {
            console.error("Image is not a File:", $scope.recipeUpload.image);
            return;
          }

          const reader = new FileReader();

          reader.onload = (e) => {

            $scope.recipeUpload.image = e.target.result.split(',')[1];
            $scope.recipeUpload.author_id = $rootScope.user.id;

            // STEP POSITIONS
            $scope.steps.forEach((step, index) => {
              step.position = index + 1;
            });

            // CLEAN INGREDIENT OBJECTS
            $scope.ingredients.forEach(ingredient => {
              delete ingredient.showList;
              delete ingredient.searchText;
            });

            // FINAL PAYLOAD
            const completeRecipe = {
              recipe: $scope.recipeUpload,
              ingredients: $scope.ingredients,
              steps: $scope.steps
            };

            // SEND TO BACKEND
            http.request({
              url: "./php/uploadRecipe.php",
              data: completeRecipe
            })
            .then(response => {
              console.log("Upload success:", response);
            })
            .catch(error => console.error(error));
          };

          reader.onerror = (err) => {
            console.error("FileReader error:", err);
          };

          reader.readAsDataURL($scope.recipeUpload.image);
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
                    ngModel.$setViewValue(null);
                  } else {
                    ngModel.$setViewValue(element[0].files[0]);
                  }

                  ngModel.$render();
                  scope.$applyAsync();
                });
              }
            };
          }
        };
      }
    ]);

})(window, angular);
