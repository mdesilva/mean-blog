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
    $scope.stateName = $state.current.name;
    if($scope.showLogin){
      $http.post('/api/loginUser', $scope.login).then(function(response){ //attempt to authenticate the user
        $scope.loggedIn = true;
        if($scope.stateName === "viewPost"){
          $state.reload() //reload the post page if the user wanted to comment and is now logging in
        }
        else{
          $state.go('dashboard'); //else go to their dashboard
        }
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
    $scope.stateName = $state.current.name;
    $http.get("/api/logOut").then(function(response){
      $scope.loggedIn = false;
      if($scope.stateName === "viewPost"){
        $state.reload()
      }
      else{
        $state.go('main')
      }
      $scope.loginStatusMessage = "Successfully logged out"
    })
  }

}])
