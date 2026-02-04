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
          url: '/recipe/{id:int}-{titleUrl}',
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
          url: '/recipeUpload',       
          parent: 'root',
          templateUrl: './html/pages/recipeUpload.html',
          controller: 'recipeUploadController'
        })
        .state('profilePublic', {
          url: '/profiles/:author_username',       
          parent: 'root',
          templateUrl: './html/pages/profilePublic.html',
          controller: 'profilePublicController',
          params: {
            author_username: null
				  }
        })
        .state('error404', {
          url: '/error404',       
          parent: 'root',
          templateUrl: './html/pages/error404.html',
          controller: 'error404Controller',
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

      //number rounder
      $rootScope.roundNumber=(num,decimal)=>{
        return Math.round(num*(decimal*10))/(decimal*10);
      }

      //fast login
      window.addEventListener("keydown",(e)=>{
        if (e.key=="ö") {
          $rootScope.user={
          id: 1,
          username: "admin",
          email: "admin@aa.com",
          password: "adminadmin",
          created_at: "2025-11-11 06:30:36",
          avatar: "flightgif.gif"
        }
        $rootScope.$applyAsync();
        }
      })

      $rootScope.goToRecipeUpload=()=>{
        if ($rootScope.user) {
          console.log("loggin in");
          $state.go("recipeUpload");
        }
        else{
          console.log("not logged in");
          $('#myModal').modal('show');
        }
      }
    }
  ]);

})(window, angular);
