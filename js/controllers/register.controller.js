;(function(window, angular) {
  'use strict';

  angular.module('app')
  .controller('registerController', [
    '$scope',
    '$state',
    'http',
    '$rootScope',
    function($scope, $state, http, $rootScope) {
      console.log($state.current.name);
      
      //register    
      $scope.registerClick=()=>{
        
        //current date
        let date=new Date(),
        dateYear=date.getFullYear(),
        dateMonth=date.getMonth(),
        dateDay=date.getDate(),
        created_at=`${dateYear}-${(dateMonth+1).toString().padStart(2,"0")}
        -${dateDay.toString().padStart(2,"0")}`; 
        
        http.request({
          url:"./php/register.php",
          data:{  username:$scope.user.username,
                  email:$scope.user.email,
                  password:$scope.user.password,
                  created_at:created_at
        }})
        .then(response=>{
          alert("sikeres regisztráció");
          $rootScope.user=$scope.user;
          $rootScope.user.id=response["lastInsertId"];
          $rootScope.user.created_at=created_at;
          $rootScope.user.avatar=null;
          delete $rootScope.user.passwordConfirm;
          $rootScope.$applyAsync();
          $state.go("home");
        })
        .catch(e=> alert(e))
        
      }
    }
  ]);

})(window, angular);