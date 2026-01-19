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
        .state('recipe', {
          url: '/recipe/:id-:titleUrl',
          parent: 'root',
          templateUrl: './html/pages/recipe.html',
          controller: 'recipeController',
          params: {
					  id: null,
            titleUrl: null
				  }
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
        })
        .state('recipeUpload', {
          url: '/recipes',       
          parent: 'root',
          templateUrl: './html/pages/recipeUpload.html',
          controller: 'recipeUploadController'
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

      $rootScope.user = null;
      console.log('Run...');

      $rootScope.roundNumber=(num,decimal)=>{
        return Math.round(num*(decimal*10))/(decimal*10);
      }
    }
  ]);

})(window, angular);
