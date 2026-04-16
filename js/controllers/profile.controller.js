;(function(window, angular) {
  'use strict';

  angular.module('app')
  .controller('profileController', [
    '$scope',
    '$state',
    'http',
    '$rootScope',
    function($scope, $state, http, $rootScope) {
      console.log($state.current.name)
      
      //check if user logged in
      if (!$rootScope.user) {
        $state.go("home");
      }

      //delete account
      $scope.deleteAccountClick=()=>{
        if (confirm("biztos kiakarod törölni?")) {
          http.request({
            url:"./php/deleteAccount.php",
            data:$rootScope.user,
          })
          .then(response=>{
            console.log(response);
            $rootScope.user=null;
            $rootScope.$applyAsync();
            alert("sikeres fiók törlés");
            $state.go("home");
          })
          
          .catch(e=>console.error(e));

        }
      }

      //change password
      $scope.changePasswordClick=()=>{
        http.request({
          url:"./php/changePassword.php",
          data: {id:$rootScope.user.id,password:$scope.password}
        })
        .then(response=>{
          console.log(response);
          $rootScope.user.password=$scope.password
          $scope.password=null;
          $scope.passwordConfirm=null;
          $scope.currentPassword=null;
          $rootScope.$applyAsync();
          $scope.$applyAsync();
        })
        .catch(e=> console.error(e));
      }

      $scope.clickOnImage=(user)=>{
        http.request({
          url:"./php/changeProfilePicture.php",
          data: {id:$rootScope.user.id,avatar:$rootScope.user.avatar}
        })
        .then(response=>{
          console.log(response);
          $rootScope.$applyAsync();
          $scope.$applyAsync();
        })
        .catch(e=> console.error(e));
      }
    }
  ]);

})(window, angular);