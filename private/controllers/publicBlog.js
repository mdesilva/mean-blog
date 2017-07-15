angular.module('blog').controller('publicBlogController', ['$scope', '$http', '$state', '$stateParams', function($scope, $http, $state, $stateParams){
  var request = {
    username: $stateParams.username
  };

  console.log(request.username)
  if(request.username != null){
  $http.post("/api/getPosts", request).then(function(response){
    console.log(response.data);
    $scope.posts = response.data;
  })

  $http.post("/api/getBlogInfo", request).then(function(response){
    $scope.title = response.data.blogTitle;
    $scope.blogBio = response.data.blogBio;
    $scope.userBio = response.data.userBio;
    $scope.fullName = response.data.fullname;
  })
  }

  else{
    $scope.message = "This is the public view for users who are browsing other blogs"
  }


}])
