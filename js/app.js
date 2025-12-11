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
      .state('recipes', {
        url: '/',
        parent: 'root',
        templateUrl: './html/recipes.html',
        controller: 'recipesController'
      })
      .state('page2', {
        url: '/',
        parent: 'root',
        templateUrl: './html/page2.html',
        controller: 'page2Controller'
      })
      .state('login', {
        url: '/',
        parent: 'root',
        templateUrl: './html/login.html',
        controller: 'loginController'
      })
      .state('register', {
        url: '/',
        parent: 'root',
        templateUrl: './html/register.html',
        controller: 'registerController'
      })
      .state('profile', {
        url: '/',
        parent: 'root',
        templateUrl: './html/profile.html',
        controller: 'profileController'
      })

      $urlRouterProvider.otherwise('/');
    }
  ])

  // Application run
  .run([
    '$rootScope',
    '$state',
    function($rootScope,$state) {
      console.log('Run...');
      $rootScope.menuItems=[
        {url:"home",label:"Kezdőlap"},
        {url:"recipes",label:"Receptek"},
        {url:"",label:""},
        {url:"",label:""},
        {url:"",label:""},
      ];

      $rootScope.logoutClick=()=>{
        $rootScope.user=null;
        $rootScope.$applyAsync();
        setTimeout(() => {
          alert("sikeres kijentkezés");
          $state.go("home");
        }, 50);
      }

      $rootScope.searchClick=()=>{
        $rootScope.user={
          "id": 1,
          "username": "admin",
          "email": "admin@aa.com",
          "password": "adminadmin",
          "created_at": "2025-11-11 06:30:36",
          "avatar": "random.jpg"
        }
        $rootScope.$applyAsync();
      }
    }
  ])
  
  //home controller
  .controller('homeController', [
    '$scope',
    '$state',
    '$timeout',
    'http',
    function($scope, $state, $timeout,http) {
      console.log("Home");

    }
  ])

  //recipes controller
  .controller('recipesController', [
    '$scope',
    '$state',
    '$timeout',
    '$rootScope',
    function($scope, $state, $timeout, $rootScope) {
      console.log("recipes");
      
    }
  ])

  //page2 controller
  .controller('page2Controller', [
    '$scope',
    '$state',
    '$timeout',
    function($scope, $state, $timeout) {
      console.log("page2")
    }
  ])
  
  //Login controller
  .controller('loginController', [
    '$scope',
    'http',
    '$state',
    '$rootScope',
    function($scope, http, $state, $rootScope) {
      console.log("login")
      $scope.loginClick=()=>{
        http.request({
          url:"./php/login.php",
          data:$scope.user,
        })
        .then(response=>{
          if (response==null) {
            alert("helytelen jelszó vagy email cím");
          }
          else{
            $rootScope.user=response[0];
            $rootScope.$applyAsync();
            $state.go("home");
          }
        })
        .catch(e=> console.error(e));
      }
    }
  ])

  //register controller
  .controller('registerController', [
    '$scope',
    '$state',
    'http',
    '$rootScope',
    function($scope, $state, http, $rootScope) {
      console.log("register")
      $scope.registerClick=()=>{
        http.request({
          url:"./php/register.php",
          data:$scope.user,
        })
        .then(response=>{
          console.log(response);
          alert("sikeres regisztráció");
          $rootScope.user=response[0];
          $rootScope.$applyAsync();
          $state.go("home");
        })
        .catch(e=> console.error(e))
        
      }
    }
  ])

  //profile controller
  .controller('profileController', [
    '$scope',
    '$state',
    'http',
    '$rootScope',
    function($scope, $state, http, $rootScope) {
      console.log("profile")
      //delete account
      $scope.deleteAccountClick=()=>{
        let question=confirm("biztos kiakarod törölni?")
        if (question) {
          
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
        console.log("anyád");

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
  ])




})(window, angular);
