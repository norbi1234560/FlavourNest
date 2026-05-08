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
          $state.go("login");
        }

        // get data
        http.request("./php/getAllIngredientAndTags.php")
          .then(response => {
            $scope.ingredientOptions = response.ingredients;
            $scope.tagOptions = response.tags;
            $scope.$applyAsync();
          });

        // recipe model
        $scope.recipeUpload = {
          title: '',
          description: '',
          servings: null,
          prep_time_minutes: null,
        };

        // validation
        $scope.recipeValidation = {
          title: false,
          description: false,
          servings: false,
          prep_time_minutes: false,
          image: false,
          ingredients: false,
          steps: false,
          tags: false
        };

        // ingredients
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

        // steps
        $scope.steps = [];

        $scope.buttonAddStep = () => {
          $scope.steps.push({
            instruction: ''
          });
        };

        $scope.deleteStep = (index) => {
          $scope.steps.splice(index, 1);
        };

        // init
        $scope.buttonAddIngredient();
        $scope.buttonAddStep();

        // tags
        $scope.selectedTags = [];

        $scope.selectTag = (tag) => {
          $scope.selectedTags.push(tag);
          $scope.tagOptions = $scope.tagOptions.filter(t => t.id !== tag.id);
        };

        $scope.deleteTag = (tagId) => {

          let tag = $scope.selectedTags.find(t => t.id === tagId);

          if (tag) {
            $scope.tagOptions.push(tag);
          }

          $scope.selectedTags =
            $scope.selectedTags.filter(t => t.id !== tagId);
        };

        // VALIDATION
        $scope.validateRecipeForm = () => {

          Object.keys($scope.recipeValidation).forEach(key => {
            $scope.recipeValidation[key] = false;
          });

          let valid = true;

          if (!$scope.recipeUpload.title?.trim()) {
            $scope.recipeValidation.title = true;
            valid = false;
          }

          if (!$scope.recipeUpload.description?.trim()) {
            $scope.recipeValidation.description = true;
            valid = false;
          }

          if (
            !$scope.recipeUpload.servings ||
            $scope.recipeUpload.servings < 1
          ) {
            $scope.recipeValidation.servings = true;
            valid = false;
          }

          if (
            !$scope.recipeUpload.prep_time_minutes ||
            $scope.recipeUpload.prep_time_minutes < 1
          ) {
            $scope.recipeValidation.prep_time_minutes = true;
            valid = false;
          }

          if (!$scope.recipeUpload.image) {
            $scope.recipeValidation.image = true;
            valid = false;
          }

          const invalidIngredient = $scope.ingredients.some(i =>
            !i.ingredient_id ||
            !i.quantity ||
            i.quantity <= 0 ||
            !i.unit?.trim()
          );

          if (invalidIngredient) {
            $scope.recipeValidation.ingredients = true;
            valid = false;
          }

          const invalidStep = $scope.steps.some(step =>
            !step.instruction?.trim()
          );

          if (invalidStep) {
            $scope.recipeValidation.steps = true;
            valid = false;
          }

          if ($scope.selectedTags.length === 0) {
            $scope.recipeValidation.tags = true;
            valid = false;
          }

          return valid;
        };

        // submit
        $scope.recipeUploadClick = async () => {

          if (!$scope.validateRecipeForm()) {
            $scope.$applyAsync();
            return;
          }

          try {

            let imageBase64 = null;

            if ($scope.recipeUpload.image) {

              imageBase64 = await new Promise((resolve, reject) => {

                const reader = new FileReader();

                reader.onload = (e) => {
                  resolve(e.target.result.split(',')[1]);
                };

                reader.onerror = reject;

                reader.readAsDataURL($scope.recipeUpload.image);
              });
            }

            $scope.recipeUpload.author_id = $rootScope.user.id;
            $scope.recipeUpload.image = imageBase64;

            // step positions
            $scope.steps.forEach((step, index) => {
              step.position = index + 1;
            });

            // cleanup ingredients
            $scope.ingredients.forEach(ingredient => {
              delete ingredient.showList;
              delete ingredient.searchText;
            });

            // tags
            $scope.selectedTags.forEach(tag => {
              tag["tag_id"] = tag.id;
            });

            $scope.selectedTags.forEach(tag => {
              delete tag.name;
              delete tag.$$hashKey;
              delete tag.id;
            });

            const completeRecipe = {
              recipe: $scope.recipeUpload,
              ingredients: $scope.ingredients,
              steps: $scope.steps,
              tags: $scope.selectedTags
            };

            const response = await http.request({
              url: "./php/uploadRecipe.php",
              data: completeRecipe,
              method: 'POST'
            });

            console.log(response);
            alert("Sikeres recept feltöltés");
            $state.go("home");

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

                    alert("Túl nagy a választott kép! Maximum 5MB.");

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
    ]);

})(window, angular);
