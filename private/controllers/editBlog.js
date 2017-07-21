angular.module('blog').controller('editBlogController', ['$scope', '$http', '$state', '$rootScope', function($scope,$http,$state, $rootScope){
  var user = $rootScope.user;

  $http.post("/api/getBlogInfo", request={username: user.username}).then(function(response){
    $scope.blogTitle = response.data.blogTitle;
    $scope.blogBio = response.data.blogBio;
    $scope.userBio = response.data.userBio;
  })

  $scope.editBlog = function(){
    var request = {
      username: user.username,
      blogTitle: $scope.blogTitle,
      blogBio: $scope.blogBio
    };
    $http.post("/api/editBlogInfo", request).then(function(response){
      if(response.data.status === 200){
        $scope.editBlogStatus = response.data.message;
      }
      else{
        $scope.editBlogStatus = "There was an error processing your request"
      }
    })
  };

  $scope.editUser = function() {
    var request = {
      username: user.username,
      userBio: $scope.userBio
    }

    $http.post("/api/editUserInfo", request).then(function(response){
      if(response.data.status === 200){
        $scope.editUserStatus = response.data.message;
      }
      else{
        $scope.editUserStatus = "There was an error processing your request"
      }
    })
  }

  $scope.deleteUser = function() {
    $http.post("/api/deleteUser", request= {username: user.username}).then(function(response){
      $scope.message = response.data.message;
    })
  }


}])
