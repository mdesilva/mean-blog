var app = angular.module('blog', ['ui.router','textAngular']);

app.config(function($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise('/')

  var checkLoggedIn = function($q, $http, $rootScope, $state){
    var deferred = $q.defer(); //set up the promise
    $http.get('/api/loggedIn').then(function(response){
      if(response.data.status === true){
        $rootScope.user = response.data.user; //store user in $rootScope object if they are logged in so it can be accessed to by the relevant controller
        deferred.resolve(); //resolve the promise succesfully
      }
      else{
        deferred.reject(); //resolve the promise with an error
        $state.go('login');
      }
    });
    return deferred.promise;
  }

  $stateProvider
  .state({
    name: 'signUp',
    url: '/sign-up',
    templateUrl: '/private/views/signUp.html',
    controller: 'signUpController',
  })
  .state({
    name: 'dashboard',
    url: '/dashboard',
    templateUrl: 'private/views/dashboard.html',
    controller: 'dashboardController',
    resolve: { //this will run first before the state is loaded.
      loginCheck: checkLoggedIn //only allow access to user object if they are signed in
    }
  })
  .state({
    name: 'editBlog',
    url: '/editBlog',
    templateUrl: 'private/views/editBlog.html',
    controller: 'editBlogController',
     resolve: {
      loginCheck: checkLoggedIn
    }
  })
  .state({ //PUBLIC STATE...ACCESSED VIA publicBlog.html
    name: 'blog',
    url: '/viewBlog/:username',
    templateUrl: '/private/views/publicBlogView.html',
    controller: 'publicBlogController'
  })
  .state({
    name: 'main',
    url: '/',
    templateUrl: 'private/views/main.html'
  })
  .state({
    name: "viewPost",
    url: '/viewPost/:username/:postId',
    templateUrl: 'private/views/viewPost.html',
    controller: 'viewPostController'
  })

})
