angular.module('blog').controller('dashboardController', ['$scope', '$http', '$rootScope', '$state', '$timeout', function($scope, $http, $rootScope, $state,$timeout){
  var user = $rootScope.user;
  $scope.username = user.username;
  $scope.name = user.firstname;
  $scope.editPost = {};
  $scope.showNewPost;
  $scope.showExistingPosts;
  $scope.message;
  var refresh = function(){ //refresh the main dashboard view after the user executes an action to create, update, or delete a post
    var posts = [];
    var dismissMessage = function(){
      $scope.message = false;
      console.log("The message has been removed")
    }
    if($scope.message){ //if an alert message exists, remove it after 5 seconds
      $timeout(dismissMessage, 5000);
    }

    $http.post("/api/getPosts", request = {username: user.username}).then(function(response){
      if(response.data.length === 0){
        $scope.message = "You have no posts yet!"
      }
      else{
      var response = response.data;
      response.forEach(function(post){
        posts.push(post.posts); //push each post into a sorted array
      })
      $scope.posts = posts;
    }
    })

  }

  refresh();

  $scope.createNewPost = function(){
    $scope.showNewPost = !$scope.showNewPost; //toggle true or false
  }

  $scope.submitNewPost = function() {
    var request = {
      username: user.username,
      title: $scope.newPost.title,
      content: $scope.newPost.content
    };
    $http.post("/api/createPost", request).then(function(response){
      $scope.message = response.data.message;
      $scope.showNewPost = false;
      refresh();
    })
  }

  $scope.editPost = function(postId){
    $scope.showEditor = !$scope.showEditor;

    var request = {
      username: user.username,
      postId: postId
    }

    $http.post("/api/getPostById", request).then(function(response){
      $scope.post = response.data[0];
      $scope.editPost.title = $scope.post.title;
      $scope.editPost.content = $scope.post.content;
    })

    $scope.updatePost = function() {
    var request = {
    username: user.username,
    postId: postId,
    title: $scope.editPost.title,
    content: $scope.editPost.content
    }

    console.log(request);
    $http.post("/api/updatePost",request).then(function(response){
      $scope.message = response.data.message;
      refresh()
    })
  }
}

  $scope.deletePost = function(postId) {
    var request = {
      username: user.username,
      postId: postId
    }

    $http.post("/api/deletePost", request).then(function(response){
      $scope.message = response.data.message;
      refresh();
    })
  }

  $scope.cancel = function() {
    $scope.showNewPost = false;
    $scope.showEditor = false;
  }

}])
