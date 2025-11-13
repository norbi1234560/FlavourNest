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
      .state('page1', {
        url: '/',
        parent: 'root',
        templateUrl: './html/page1.html',
        controller: 'page1Controller'
      })
      .state('page2', {
        url: '/',
        parent: 'root',
        templateUrl: './html/page2.html',
        controller: 'page2Controller'
      })

      $urlRouterProvider.otherwise('/');
    }
  ])

  // Application run
  .run([
    '$rootScope',
    function($rootScope) {
      console.log('Run...');
    }
  ])
  
  //home controller
  .controller('homeController', [
    '$scope',
    '$state',
    '$timeout',
    'http',
    function($scope, $state, $timeout,http) {
      console.log("Home")

      http.request("./php/base.php")
      .then(response=>{
        console.log(response);
        let keys=Object.keys(response[0]);
        let thead=document.querySelector("thead tr");
        let tbody=document.querySelector("tbody");
        keys.forEach(x=>{
          let th=document.createElement("th");
          thead.append(th);
          th.innerText=x;
        })
        response.forEach(row=>{
          let tr=document.createElement("tr");
          tbody.append(tr);
          keys.forEach(key=>{
            let td=document.createElement("td");
            tr.append(td);
            td.innerText=row[key];
          })
        })
      })
      .catch(e=> error.log(e));
    }
  ])

  //page1 controller
  .controller('page1Controller', [
    '$scope',
    '$state',
    '$timeout',
    function($scope, $state, $timeout) {
      console.log("page1");
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




})(window, angular);
