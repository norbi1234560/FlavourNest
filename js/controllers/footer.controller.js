;(function(window, angular) {
  'use strict';

  angular.module('app')
  .controller('footerController', [
    '$scope',
    function($scope) {
      $scope.menuItems=[
        {url:"home",label:"Kezdőlap"},
        {url:"recipes",label:"Receptek"},
        {url:"",label:""},
        {url:"",label:""},
        {url:"",label:""},
      ];
    }
  ]);

})(window, angular);
