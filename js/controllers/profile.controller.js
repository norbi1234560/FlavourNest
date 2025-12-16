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
      //delete account
      $scope.deleteAccountClick=()=>{
        let question=confirm("biztos kiakarod törölni?")
        if (question) {
          //account delete
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
          
        })
        .catch(e=> console.error(e));
      }
    }
  ]);

})(window, angular);