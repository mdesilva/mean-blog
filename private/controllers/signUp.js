angular.module('blog').controller('signUpController', ['$scope', '$http', function($scope, $http){

  $scope.createUser = function(){
    $http.post("/api/createUser", $scope.newUser).then(function(response){
      var response = response.data.message;
      if(response === "User created"){
        $scope.successMessage = "User successfully registered!"
      }
      else{
        $scope.errorMessage = response;
      }
    })
  };
}]);
