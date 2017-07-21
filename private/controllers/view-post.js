angular.module('blog').controller('viewPostController', ['$scope', '$http', '$state', '$stateParams', function($scope,$http,$state,$stateParams){
  $scope.username = $stateParams.username;
  $scope.postId = $stateParams.postId;
  $scope.currentUsername;
  $scope.showComment = false;
  var request = {
    username: $scope.username,
    postId: $scope.postId
  };

  $http.post("/api/getPostById", request).then(function(response){
    var post = response.data[0];
    $scope.title = post.title;
    $scope.date = post.date;
    $scope.content = post.content;
  })

  $scope.addComment = function() {
    $http.get("/api/loggedIn").then(function(response){
      if(response.data.status === true){
        $scope.showComment = true;
      }
      else{
        $scope.message = "You must be logged in-order to comment"
      }
    })
  }
}])
