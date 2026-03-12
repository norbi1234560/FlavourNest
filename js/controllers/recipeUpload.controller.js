;(function (window, angular) {
  'use strict';

  angular.module('app')
    .controller('recipeUploadController', [
      '$scope',
      'http',
      '$rootScope',
      '$state',
      function ($scope, http, $rootScope, $state) {
        if (!$rootScope.user) {
          $state.go("login") 
        }
        
        // get all ingredient
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
          prep_time_minutes: null,
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
        $scope.recipeUploadClick = async () => {
          try {
            let imageBase64 = null;

            if ($scope.recipeUpload.image) {
              imageBase64 = await new Promise((resolve, reject) => {
                const reader = new FileReader();

                reader.onload = (e) => {
                  const base64 = e.target.result.split(',')[1];
                  resolve(base64);
                };

                reader.onerror = reject;
                reader.readAsDataURL($scope.recipeUpload.image);
              });
            }

            $scope.recipeUpload.author_id = $rootScope.user.id;
            $scope.recipeUpload.image = imageBase64;

            // add step positions
            $scope.steps.forEach((step, index) => {
              step.position = index + 1;
            });

            // remove unnecessary keys
            $scope.ingredients.forEach(ingredient => {
              delete ingredient.showList;
              delete ingredient.searchText;
            });

            const completeRecipe = {
              recipe: $scope.recipeUpload,
              ingredients: $scope.ingredients,
              steps: $scope.steps
            };

            const response = await http.request({
              url: "./php/uploadRecipe.php",
              data: completeRecipe,
              method:'POST'
            });

            console.log(response);

          } catch (err) {
            console.error(err);
          }
        };

      }
    ])

    .directive("fileInput", [
      () => {
        const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
      
        return {
          require: "ngModel",
          scope: false,
          compile: () => {
            return {
              post: (scope, element, attrs, ngModel) => {
                element[0].addEventListener("change", () => {
                  const file = element[0].files[0];
                
                  if (!file) {
                    ngModel.$setViewValue(null);
                  } else if (file.size > MAX_IMAGE_SIZE) {
                    alert("Túl nagy a választott kép 5 MB a megengedett.");
                    element[0].value = "";
                    ngModel.$setViewValue(null);
                  } else {
                    ngModel.$setViewValue(file);
                  }
                
                  ngModel.$render();
                  scope.$applyAsync();
                });
              }
            };
          }
        };
      }
])
})(window, angular);
