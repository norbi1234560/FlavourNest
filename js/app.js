;(function(window, angular) {
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
          views: {
            '': {
              templateUrl: './html/layouts/root.html',
              controller: 'headerController'
            },
            'header@root': {
              templateUrl: './html/components/header.html'
            },
            'footer@root': {
              templateUrl: './html/components/footer.html',
              controller: 'footerController'
            }
          }
        })
        .state('home', {
          url: '/',
          parent: 'root',
          templateUrl: './html/pages/home.html',
          controller: 'homeController'
        })
        .state('login', {
          url: '/login',       
          parent: 'root',
          templateUrl: './html/pages/login.html',
          controller: 'loginController'
        })
        .state('page2', {
          url: '/page2',       
          parent: 'root',
          templateUrl: './html/pages/page2.html',
          controller: 'page2Controller'
        })
        .state('profile', {
          url: '/profile',       
          parent: 'root',
          templateUrl: './html/pages/profile.html',
          controller: 'profileController'
        })
        .state('register', {
          url: '/register',       
          parent: 'root',
          templateUrl: './html/pages/register.html',
          controller: 'registerController'
        })
        .state('recipes', {
          url: '/recipes',       
          parent: 'root',
          templateUrl: './html/pages/recipes.html',
          controller: 'recipesController'
        });

      $urlRouterProvider.otherwise('/');
    }
  ])

  // Application run
  .run([
    '$rootScope',
    '$state',
    'http',
    function($rootScope,$state,http) {
      console.log('Run...');

      // http.request("./php/recipe.php")
      // .then(response => {

      //   $rootScope.recipes=response;
      //   $rootScope.$applyAsync();
      // });
      
    }
  ]);

})(window, angular);
