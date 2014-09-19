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

    $scope.posts = [
      {'nid': 1, 'title': 'Post 1 Subject', 'body': 'Post 1 body'},
      {'nid': 2, 'title': 'Post 2 Subject', 'body': 'Post 2 body'},
      {'nid': 3, 'title': 'Post 3 Subject', 'body': 'Post 3 body'},
      {'nid': 4, 'title': 'Post 4 Subject', 'body': 'Post 4 body'},
      {'nid': 5, 'title': 'Post 5 Subject', 'body': 'Post 5 body'},
    ];

  }]);
