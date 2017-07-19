angular.module('blog').controller('publicBlogController', ['$scope', '$http', '$state', '$stateParams', function($scope, $http, $state, $stateParams){
  var request = {
    username: $stateParams.username
  };

  var posts = [];
  if(request.username != null){
  $http.post("/api/getPosts", request).then(function(response){
    var response = response.data;
    response.forEach(function(post){
      posts.push(post.posts); //push each post into a sorted array
    })
    $scope.posts = posts;
  })

  $http.post("/api/getBlogInfo", request).then(function(response){
    $scope.title = response.data.blogTitle;
    $scope.blogBio = response.data.blogBio;
    $scope.userBio = response.data.userBio;
    $scope.fullName = response.data.fullname;
  })
    $scope.codeSnippet = "<script>This is some code here </script>"
  }


  else{
    $scope.message = "This is the public view for users who are browsing other blogs"
  }


}])
