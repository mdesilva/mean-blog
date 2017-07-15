angular.module('blog').controller('navigationController',['$scope', '$http', '$rootScope', '$state', '$window', function($scope,$http, $rootScope, $state,$window){

  $http.get("api/loggedIn").then(function(response){
    if(response.data.status){
      $scope.loggedIn = true;
    }
    else{
      $scope.loggedIn = false;
    }
  })


  $scope.loginUser = function(){
    $scope.loginStatusMessage = "";
    if($scope.showLogin){
      $http.post('/api/loginUser', $scope.login).then(function(response){ //attempt to authenticate the user
        console.log(response.data)
        if(response.data.blogTitle != null){
          $scope.loggedInBlogTitle = response.data.blogTitle;
        };
        $scope.loggedIn = true;
        $state.go('dashboard');
        $scope.showLogin = false;
      }, function error(response){
        $scope.loginStatusMessage = "Incorrect username or password";
      })
    }
    else{
      $scope.showLogin = true; //show the login form
    }

  }

  $scope.logOut = function(){
    $http.get("/api/logOut").then(function(response){
      $scope.loggedIn = false;
      $scope.loggedInBlogTitle = "";
      $state.go('main')
      $scope.loginStatusMessage = "Successfully logged out"
    })
  }

}])
