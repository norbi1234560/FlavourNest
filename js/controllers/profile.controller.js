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

      $scope.imageUpload=(element)=>{
        if (element.type.substr(0,6)!=="image/") {
          alert("nem képet küldtél töki");
        }
        let reader = new FileReader();
        reader.onload=()=>{
          http.request({
            url:"./php/changeProfilePicture.php",
            method:"POST",
            data:{
              id:$rootScope.user.id,
              avatar:reader.result.split(',')[1]
            }
          })
          .then(response=>{
            console.log(response);
            $scope.user=response[0];
            $scope.$applyAsync();
          })
          .catch(e=>console.error(e));
        }

        reader.onerror=()=>{
          alert("Hiba törént a kép feltöltéskor");
        }

        reader.readAsDataURL(element);
      }
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
    ]);
  
})(window, angular);