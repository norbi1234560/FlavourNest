(function(window, angular) {

  'use strict';

  // Application module
  angular.module('app', [
    'ui.router',
    'app.common'
  ])

  // Application config
  .config([
    '$stateProvider', 
    '$urlRouterProvider', 
    function($stateProvider, $urlRouterProvider) {

      $stateProvider
      .state('root', {
        abstract: true,
        views: {
          '@': {
            templateUrl: './html/root.html'
          },
          'header@root': {
            templateUrl: './html/header.html'
          },
          'footer@root': {
            templateUrl: './html/footer.html'
          }
        }
      })
      .state('home', {
        url: '/',
        parent: 'root',
        templateUrl: './html/home.html',
        controller: 'homeController'
      })
      .state('home2', {
        url: '/',
        parent: 'root',
        templateUrl: './html/home2.html',
        controller: 'home2Controller'
      })

      $urlRouterProvider.otherwise('/');
    }
  ])

  // Application run
  .run([
    '$rootScope',
    function($rootScope) {
      $rootScope.user = {id: null};
      console.log('Run...');
    }
  ])
  
  //home controller
  .controller('homeController', [
    '$scope',
    '$state',
    '$timeout',
    function($scope, $state, $timeout) {
      console.log("asd")
    }
  ])
  //home controller
  .controller('home2Controller', [
    '$scope',
    '$state',
    '$timeout',
    function($scope, $state, $timeout) {
      console.log("asd2")
    }
  ])




})(window, angular);
