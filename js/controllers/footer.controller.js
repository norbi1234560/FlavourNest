;(function(window, angular) {
  'use strict';

  angular.module('app')
  .controller('footerController', [
    '$scope',
    '$state',
    '$rootScope',
    function($scope, $state, $rootScope) {
      
      $scope.hyperlinkClick=(item)=>{

        if (item.url=="recipeUpload") {
          $rootScope.goToRecipeUpload();
        }
        else{
          $state.go(item.url);
        }
      }
    }
  ]);

})(window, angular);
