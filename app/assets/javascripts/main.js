// інійіалізація моодулю ангулар GameTracker - angular.module('Ім'я модулю'', [зовнішні модулі, тут їх немає]);
// у application.html.erb в тега html є атрибут ng-app="GameTracker" - так відбувається ініціалізація цього модулю в HTML
var GameTracker = angular.module('GameTracker', []);

// конфігурація Сервісу $http потрібно що запити відбувались у форматі json
GameTracker.config(['$httpProvider', function ($httpProvider) {

    // Заголовок Accepts дозволяє браузеру повідомити серверу, який формат він хоче для отримання ресурсу.
    $httpProvider.defaults.headers.common['Accept'] = 'application/json, text/javascript';

    // Заголовок Content-Type використовується для позначення типу даних, яка очікується у відповідь.
    $httpProvider.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8';
}]);


// у application.html.erb є тег <div class="container" ng-controller="MainCtrl"> ...
// це означає що все, що всередині нього котролюється котролером MainCtrl

// GameTracker.controller('MainCtrl', ['$scope', '$http', function ($scope, $http)
// Це просто так записуєтсья реєстрація конролеру.
// в нього є dependencies (залежності - $scope, $http)
// $scope - це ніби область видимості цього контролеру,
// наприклад $scope.games - в шаблоні позначається просто як games.
// тобто все, що лежить в цьому контролері в об'єкті $scope доступне в
// шаблоні (без слова $scope, в нашому випадку шаблоном є application.html.erb)
GameTracker.controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {

  //ініціалізуємо змінну в об'єкті $scope games. Для відображення цих даних у шаблоні
  $scope.games = []; // [] - масив пустий

  //ініціалізуємо змінну в об'єкті $scope game. Для відображення цих даних у шаблоні
  // використвується для моделей інпутів в HTML
  $scope.game = {name: '', store: ''}; // {name: '', store: ''} - об'єкт із ключами name і store, які мають значення ''


  // За допомогою сервісу в angualr так робиться GET запит. Так як ми зназходимось в нашій же прілажухі то це запит до
  // localhost:3000/games
  $http.get('/games').then(function (resp) {
    // отримуємо дані із серверу
    // для перевірки того що прийшло можна зайти в хромі в DevTools (F12 на вінді вроді) у вкладку Networks
    // і побачити, що пішов запит і що прийшло у відповідь
    // а через console.log(resp) можна побачити безпосередньо в консолі хрома (F12 на вінді вроді - вкладка Console)

    console.log(resp)
    // присвоюємо $scope.games масив ігор, що прийшов із сервера
    $scope.games = resp.data.games;
  })


  // Метод createGame який також використвується в шаблоні, який оброблє відправку форми для створення нової гри
  // приймає як аргумент форму - це об'єкт який має кучу значеб
  $scope.createGame = function (form) {

    // За допомогою сервісу в angualr так робиться POST запит.
    // перший аргумент '/games' - адреса endpoint-у
    // друший значення які ми ввели в HTML, див. тут рядок 33
    $http.post('/games', $scope.game).then(function (resp) {

      // метод push в js вставляє в кінець масиву значення.
      // В даному випадку сервер поверне нам у відповідь створену гру
      $scope.games.push(resp.data.game);

      //Очищаємо форму
      $scope.game = {name: '', store: ''};
    })
  };
}]);
