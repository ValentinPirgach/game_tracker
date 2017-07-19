var GameTracker = angular.module('GameTracker', []);

GameTracker.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.headers.common['Accept'] = 'application/json, text/javascript';
    $httpProvider.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8';
}]);

GameTracker.controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {
  $scope.games = [];
  $scope.game = {name: '', store: ''};

  $http.get('/games').then(function (resp) {
    $scope.games = resp.data.games;
  })

  $scope.createGame = function (form) {
    $http.post('/games', $scope.game).then(function (resp) {
      $scope.games.push(resp.data.game);
      $scope.game = {name: '', store: ''};
    })
  };
}]);
