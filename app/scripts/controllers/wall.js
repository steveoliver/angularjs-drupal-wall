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
      {'nid': 1, 'title': 'Post 1 Subject', 'body': 'Post 1 body', 'comments': [{'cid': 11, 'nid': 1, 'subject': 'Comment Subject 1', 'body': 'Comment Body'}, {'cid': 12, 'nid': 1, 'subject': 'Comment Subject 2', 'body': 'Comment Body'}]},
      {'nid': 2, 'title': 'Post 2 Subject', 'body': 'Post 2 body', 'comments': []},
      {'nid': 3, 'title': 'Post 3 Subject', 'body': 'Post 3 body', 'comments': []},
      {'nid': 4, 'title': 'Post 4 Subject', 'body': 'Post 4 body', 'comments': []},
      {'nid': 5, 'title': 'Post 5 Subject', 'body': 'Post 5 body', 'comments': []},
    ];

    $scope.currentPost = null;
    $scope.currentComment = null;

    // ----------------------------------------
    // Create Post
    // ----------------------------------------

    $scope.newPost = {
      title: '',
      body: ''
    };

    function resetNewPost() {
      $scope.newPost = {
        title: '',
        body: ''
      };
    }

    function createPost(post) {
      post.nid = $scope.posts.length; // Validate that shit
      $scope.posts.push(post);
      $scope.currentPost = post; // Do this different probably

      resetNewPost();
      $scope.isCreatingPost = false;
    }

    $scope.createPost = createPost;

    // ----------------------------------------
    // Update Post
    // ----------------------------------------

    function updatePost(post) {
      var index = _.findIndex($scope.posts, function(p) {
        return p.nid === post.nid;
      });
      $scope.posts[index] = post;

      $scope.editedPost = null;
      $scope.isEditingPost = false;
    }

    $scope.updatePost = updatePost;

    // ----------------------------------------
    // Current Post
    // ----------------------------------------
    
    function isCurrentPost(post) {
      return $scope.currentPost !== null && post.nid === $scope.currentPost.nid;
    }
   
    function setCurrentPost(post) {
      $scope.currentPost = post;
    }

    $scope.setCurrentPost = setCurrentPost;
    $scope.isCurrentPost = isCurrentPost;

    // ----------------------------------------
    // States: Creating and Editing Posts
    // ----------------------------------------

    $scope.isCreatingPost = false;
    $scope.isEditingPost = false;
    $scope.editedPost = null;

    function setEditedPost(post) {
      $scope.editedPost = angular.copy(post);
    }

    $scope.setEditedPost = setEditedPost;

    function shouldShowCreatingPost() {
      return $scope.isCreatingPost && !$scope.isEditingPost && !$scope.isCreatingComment && !$scope.isEditingComment;
    }

    function startCreatingPost() {
      cancelEditingPost();
      cancelCreatingComment();
      cancelEditingComment();
      $scope.isCreatingPost = true;
    }

    function cancelCreatingPost() {
      $scope.isCreatingPost = false;
      resetNewPost();
    }

    $scope.shouldShowCreatingPost = shouldShowCreatingPost;
    $scope.startCreatingPost = startCreatingPost;
    $scope.cancelCreatingPost = cancelCreatingPost;

    function shouldShowEditingPost(post) {
      return $scope.isEditingPost && $scope.editedPost.nid == post.nid;
    }

    function startEditingPost() {
      cancelCreatingPost();
      cancelCreatingComment();
      cancelEditingComment();
      $scope.isEditingPost = true;
    }

    function cancelEditingPost() {
      $scope.editedPost = null;
      $scope.isEditingPost = false;
    }

    $scope.shouldShowEditingPost = shouldShowEditingPost;
    $scope.startEditingPost = startEditingPost;
    $scope.cancelEditingPost = cancelEditingPost;

    // ----------------------------------------
    // Create Comment
    // ----------------------------------------

    $scope.newComment = {
      nid: null,
      cid: null,
      subject: '',
      body: ''
    };

    function resetNewComment() {
      $scope.newComment = {
        nid: null,
        cid: null,
        subject: '',
        body: ''
      };
    }

    function createComment(comment) {
      var post = _.findIndex($scope.posts, function(p) {
        return p.nid == $scope.currentPost.nid;
      });
      comment.nid = $scope.currentPost.nid
      comment.cid = comment.nid + $scope.posts[post].comments.length; // LOL
      $scope.posts[post].comments.push(comment);

      resetNewComment();
      $scope.isCreatingComment = false;
    }

    $scope.createComment = createComment;

 
    // ----------------------------------------
    // Current Comment
    // ----------------------------------------

    function isCurrentComment(comment) {
      return $scope.currentComment !== null && comment.id === $scope.currentComment.id;
    }
   
    function setCurrentComment(comment) {
      $scope.currentComment = comment;
    }

    function hasComments(post) {
      return (post.comments.length);
    }

    $scope.hasComments = hasComments;

    $scope.setCurrentComment = setCurrentComment;
    $scope.isCurrentComment = isCurrentComment;


    // ---------------------------------
    // States: Creating and Editing Comments
    // ---------------------------------

    $scope.isCreatingComment = false;
    $scope.isEditingComment = false;
    $scope.editedComment = null;
    
    function setEditedComment(comment) {
      $scope.editedComment = angular.copy(comment);
    }

    $scope.setEditedComment = setEditedComment;

    function updateComment(comment) {
      var post = _.findIndex($scope.posts, function(p) {
        return p.nid === $scope.editedComment.nid;
      });
      var index = _.findIndex($scope.posts[post].comments, function(c) {
        return c.cid === comment.cid;
      });

      $scope.posts[post].comments[index] = comment;
      $scope.editedComment = null;
      $scope.isEditingComment = false;
    }

    $scope.updateComment = updateComment;

    function shouldShowCreatingComment(post) {
      return $scope.isCreatingComment && $scope.currentPost && $scope.currentPost.nid === post.nid && !$scope.isCreatingPost && !$scope.isEditingPost;
    }

    function startCreatingComment() {
      cancelCreatingPost();
      cancelEditingPost();
      cancelEditingComment();
      $scope.newComment.nid = $scope.currentPost.nid;
      $scope.isCreatingComment = true;
    }

    function resetNewComment() {
      $scope.newComment = {
        subject: '',
        body: ''
      };
    }

    function cancelCreatingComment() {
      $scope.isCreatingComment = false;
      resetNewComment();
    }

    $scope.shouldShowCreatingComment = shouldShowCreatingComment;
    $scope.startCreatingComment = startCreatingComment;
    $scope.cancelCreatingComment = cancelCreatingComment;

    function shouldShowEditingComment(comment) {
      return $scope.editedComment && !$scope.isCreatingComment && $scope.editedComment.cid === comment.cid && !$scope.isCreatingPost && !$scope.isEditingPost;
    }

    function startEditingComment() {
      cancelCreatingComment();
      cancelCreatingPost();
      cancelEditingPost();
      $scope.isEditingComment = true;
    }

    function cancelEditingComment() {
      $scope.editedComment = null;
      $scope.isEditingComment = false;
    }

    $scope.shouldShowEditingComment = shouldShowEditingComment;
    $scope.startEditingComment = startEditingComment;
    $scope.cancelEditingComment = cancelEditingComment;

  }]);
