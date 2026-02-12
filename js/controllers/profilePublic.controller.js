;(function(window, angular) {
  'use strict';

  angular.module('app')
  .controller('profilePublicController', [
    '$scope',
    '$stateParams',
    'http',
    '$state',
    function($scope, $stateParams, http, $state) {
      $scope.user=$stateParams.author_username;
      http.request({
        url:"./php/publicProfile.php",
        data:{username:$stateParams.author_username}
      })
      .then(response=>{
        if (response) {
          console.log(response);
        }
        else{
          $state.go("error404");
        }
      })
      .catch(e=> console.error(e));
      console.log($scope.user);
      
      $scope.$applyAsync();
    }
  ]);

})(window, angular);
