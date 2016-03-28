'use strict';

angular.module('core')
    .factory('sitterFactory', function($http) {
      function getSitters() {
        return $http.get('/modules/core/client/views/sitter.json');
      }
      return {
        getSitters: getSitters
      };
    })
    .controller('SearchpgController', ['$scope', 'Authentication','sitterFactory',
      function ($scope, Authentication, sitterFactory) {
        // This provides Authentication context.
        $scope.authentication = Authentication;
        // $scope.sitters;
        sitterFactory.getSitters().success(function(data) {
          $scope.sitters = data;
        }).error(function(error) {
          console.log(error);
        });
      }
    ]);
//    .controller('SearchpgController', ['$scope',
//  function ($scope) {
//    // Controller Logic
//    // ...
//  }
//]);
