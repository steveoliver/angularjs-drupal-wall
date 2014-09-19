'use strict';

/**
 * @ngdoc function
 * @name wallApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the wallApp
 */
angular.module('wallApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
