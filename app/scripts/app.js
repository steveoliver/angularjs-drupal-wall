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
      this.number('id');
      this.string('title');
      this.string('subtitle');
      this.computedProperty('fullTitle', function() {
        return this.title + this.subtitle;
      }, ['title', 'subtitle']);
                                                                          this.hasMany('comments');
      this.belongsTo('author');
    }
    Post.inherits(ActiveResource.Base);
    Post.api.set('http://api.example.coM/');
    Post.dependentDestroy('comments');

    return Post;
  }])
  .factory('Comment', ['ActiveResource', function(ActiveResource) {
    function Comment() {
      this.number('id');
      this.number('post_id');
      this.string('subject');
      this.string('body');

      this.belongsTo('post');
      this.belongsTo('author');
    }
    Comment.inherits(ActiveResource.Base);
    Comment.api.set('http://api.example.com/');

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

    return Author;
  }])
;

