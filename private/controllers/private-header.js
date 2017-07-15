angular.module('blog').controller('privateHeaderController', ['$scope', '$http', function($scope,$http){
  $http.get("/api/loggedIn").then(function(response){
    $scope.user = response.data.user;
    $scope.blogTitle = $scope.user.blogTitle;
  })
}])
