'use strict';

/**
 * @ngdoc overview
 * @name wallApp
 * @description
 * # wallApp
 *
 * Main module of the application.
 */
angular
  .module('wallApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ActiveResource'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/wall', {
        templateUrl: 'views/wall.html',
        controller: 'WallCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

  })
  .factory('Post', ['ActiveResource', function(ActiveResource) {
    function Post() {
      this.number('nid');
      this.string('title');
      this.string('body');
      this.hasMany('comments', {foreignKey: 'cid'});
      this.belongsTo('author');
    }
    Post.inherits(ActiveResource.Base);
    Post.api.set('http://api.example.com/');
    Post.primaryKey = 'nid';
    Post.dependentDestroy('comments');

    return Post;
  }])
  .factory('Comment', ['ActiveResource', function(ActiveResource) {
    function Comment() {
      this.number('cid');
      this.number('nid');
      this.string('subject');
      this.string('body');

      this.belongsTo('post', {foreignKey:'nid'});
      this.belongsTo('author', {foreignKey:'uid'});
    }
    Comment.inherits(ActiveResource.Base);
    Comment.api.set('http://api.example.com/');
    Comment.primaryKey = 'cid';

    return Comment;
  }])
  .factory('Author', ['ActiveResource', function(ActiveResource) {
    function Author() {
      this.number('id');
      this.string('username');
      this.string('realname');
      this.string('picture_url');
      this.string('profile_url');
    }
    Author.inherits(ActiveResource.Base);
    Author.api.set('http://api.example.com/');
    Author.primaryKey = 'uid';

    return Author;
  }])
;

