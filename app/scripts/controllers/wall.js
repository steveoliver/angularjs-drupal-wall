'use strict';

/**
 * @ngdoc function
 * @name wallApp.controller:WallCtrl
 * @description
 * # WallCtrl
 * Controller of the wallApp
 */
angular.module('wallApp')
  .controller('WallCtrl', ['$scope', 'Post', 'Comment', function ($scope, Post, Comment) {

    Comment.all().then(function(response) {
      $scope.comments = response;
    });

    $scope.postId = 1;
    var postId = $scope.postId;

    Post.find(postId).then(function(response) {
      $scope.post      = response;
      $scope.comment   = $scope.post.comments.new();
    
      Comment.after('$save', function() {
        $scope.comment = $scope.post.comments.new();
      });
    });

    // ---------------------------------
    // Setup (implement/move to Services)
    // ---------------------------------

    $scope.posts = [
      {'nid': 1, 'title': 'Post 1 Subject', 'body': 'Post 1 body'},
      {'nid': 2, 'title': 'Post 2 Subject', 'body': 'Post 2 body'},
      {'nid': 3, 'title': 'Post 3 Subject', 'body': 'Post 3 body'},
      {'nid': 4, 'title': 'Post 4 Subject', 'body': 'Post 4 body'},
      {'nid': 5, 'title': 'Post 5 Subject', 'body': 'Post 5 body'},
    ];

    $scope.currentPost = null;
    $scope.currentComment = null;

    // ----------------------------------------
    // New Post
    // ----------------------------------------
    $scope.newpost = {
      title: '',
      body: ''
    }

    function resetNewPost() {
      $scope.newpost = {
        title: '',
        body: ''
      };
    }

    function submitNewPost(post) {
      post.id = $scope.posts.length; // Validate that shit
      $scope.posts.push(post);
      $scope.currentPost = post; // Do this different probably

      resetNewPost();
    }

    $scope.submitNewPost = submitNewPost;

    // ----------------------------------------
    // Current Post
    // ----------------------------------------
    
    function isCurrentPost(post) {
      return $scope.currentPost !== null && post.id === $scope.currentPost.id;
    }
   
    function setCurrentPost(post) {
      $scope.currentPost = post;
    }

    $scope.setCurrentPost = setCurrentPost;
    $scope.isCurrentPost = isCurrentPost;

    // ----------------------------------------
    // Current Comment
    // ----------------------------------------

    function isCurrentComment(comment) {
      return $scope.currentComment !== null && comment.id === $scope.currentComment.id;
    }
   
    function setCurrentComment(comment) {
      $scope.currentComment = comment;
    }

    $scope.setCurrentComment = setCurrentComment;
    $scope.isCurrentComment = isCurrentComment;

    // ----------------------------------------
    // States: Creating and Editing Posts
    // ----------------------------------------

    $scope.isCreatingPost = false;
    $scope.isEditingPost = false;

    function shouldShowCreatingPost() {
      return $scope.isCreatingPost && !$scope.isEditingPost;
    }

    function startCreatingPost() {
      $scope.isCreatingPost = true;
      $scope.isEditingPost = false;
    }

    function cancelCreatingPost() {
      $scope.isCreatingPost = false;
      resetNewPost();
    }

    $scope.shouldShowCreatingPost = shouldShowCreatingPost;
    $scope.startCreatingPost = startCreatingPost;
    $scope.cancelCreatingPost = cancelCreatingPost;

    function shouldShowEditingPost() {
      return $scope.isEditingPost() && !$scope.isCreatingPost;
    }

    function startEditingPost() {
      $scope.isCreatingPost = false;
      $scope.isEditingPost = true;
    }

    function cancelEditingPost() {
      $scope.isEditingPost = false;
    }

    $scope.shouldShowEditingPost = shouldShowEditingPost;
    $scope.startEditingPost = startEditingPost;
    $scope.cancelEditingPost = cancelEditingPost;

    // ---------------------------------
    // States: Creating and Editing Comments
    // ---------------------------------

    $scope.isCreatingComment = false;
    $scope.isEditingComment = false;

    function shouldShowCreatingComment() {
      return $scope.currentPost && !$scope.isEditingComment;
    }

    function startCreatingComment() {
      $scope.isCreatingComment = true;
      $scope.isEditingComment = false;
    }

    function cancelCreatingComment() {
      $scope.isCreatingComment = false;
    }

    $scope.shouldShowCreatingComment = shouldShowCreatingComment;
    $scope.startCreatingComment = startCreatingComment;
    $scope.cancelCreatingComment = cancelCreatingComment;

    function shouldShowEditingComment() {
      return $scope.currentComment && !$scope.isCreatingComment;
    }

    function startEditingComment() {
      $scope.isCreatingComment = false;
      $scope.isEditingComment = true;
    }

    function cancelEditingComment() {
      $scope.isEditingComment = false;
    }

    $scope.shouldShowEditingComment = shouldShowEditingComment;
    $scope.startEditingComment = startEditingComment;
    $scope.cancelEditingComment = cancelEditingComment;

  }]);
