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

    // ----------------------------------------
    // set current / is current
    // ----------------------------------------
    
    function setCurrentPost(post) {
      $scope.currentPost = post;
    }
   
    function isCurrentPost(post) {
      return ($scope.currentPost == post);
    }

    $scope.setCurrentPost = setCurrentPost;
    $scope.isCurrentPost = isCurrentPost;


    // ----------------------------------------
    // States: Creating and Editing Posts
    // ----------------------------------------

    $scope.isCreatingPost = false;
    $scope.isEditingPost = false;

    function startCreatingPost() {
      $scope.isCreatingPost = true;
      $scope.isEditingPost = false;
    }

    function cancelCreatingPost() {
      $scope.isCreatingPost = false;
    }

    function startEditingPost() {
      $scope.isCreatingPost = false;
      $scope.isEditingPost = true;
    }

    function cancelEditingPost() {
      $scope.isEditingPost = false;
    }

    $scope.startCreatingPost = startCreatingPost;
    $scope.cancelCreatingPost = cancelCreatingPost;
    $scope.startEditingPost = startEditingPost;
    $scope.cancelEditingPost = cancelEditingPost;

    // ---------------------------------
    // States: Creating and Editing Comments
    // ---------------------------------

    $scope.isCreatingComment = false;
    $scope.isEditingComment = false;

    function startCreatingComment() {
      $scope.isCreatingComment = true;
      $scope.isEditingComment = false;
    }

    function cancelCreatingComment() {
      $scope.isCreatingComment = false;
    }

    function startEditingComment() {
      $scope.isCreatingComment = false;
      $scope.isEditingComment = true;
    }

    function cancelEditingComment() {
      $scope.isEditingComment = false;
    }

    $scope.startCreatingComment = startCreatingComment;
    $scope.cancelCreatingComment = cancelCreatingComment;
    $scope.startEditingComment = startEditingComment;
    $scope.cancelEditingComment = cancelEditingComment;




  }]);
