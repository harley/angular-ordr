var app = angular.module('ordr', []);

app.config(['$routeProvider', function($routeProvider){
  $routeProvider.when('/tables', {
    templateUrl: 'partials/tables.html', 
    controller: 'TablesCtrl'
  }).
  when('/tables/:tableId', {
    templateUrl: 'partials/table.html', 
    controller: 'TableCtrl'
  }).
  otherwise({redirectTo: '/tables'});
}]);

app.filter('money', function(){
  return function(value) {
    if (isNaN(value)) { return "$0.00"; }
    return '$' + (value % 100 === 0 ?
                 (value / 100 + ".00") : 
                 (parseInt(value/100, 10) + '.' + value % 100));
  }
});

app.controller("TablesCtrl", function ($scope, OrderService) {
  $scope.tables = OrderService.Table;
  $scope.tablePage = "partials/table.html";
});

app.controller("TableCtrl",  function ($scope, $routeParams, OrderService) {
  $scope.id = $routeParams.tableId;

  // load table
  $scope.table = _.find(OrderService.Table, function(e) { return String(e.id) === $scope.id; });

  // load tab
  $scope.tab = $scope.table.tab;

  // add tab item
  $scope.addFood = function(food) {
    $scope.tab.tabItems.push(food);
  }
})

app.controller("FoodCtrl", function($scope, OrderService) {
  $scope.foods = OrderService.Food;
})

app.controller("TabCtrl", function($scope) {
  $scope.totalCents = function(tabItems) {
    var total = 0;
    if (tabItems) {
      for (var i = 0; i < tabItems.length; i++) {
        total += tabItems[i].cents;
      }
    }
    return total;
  }
})

app.factory("OrderService", function(){
  var Fixtures = {};
  
  var tableFactory = function(id){
    return {
      'id': id,
      'tab': {
        'tabItems': []
      } 
    }
  }

  Fixtures.Table = [
    tableFactory(1),
    tableFactory(2),
    tableFactory(3),
    tableFactory(4),
    tableFactory(5),
    tableFactory(6),
  ];

  var Food = [
    {
      id: 1,
      name: 'Pizza',
      imageUrl: 'img/pizza.png',
      cents: 1500
    }, {
      id: 2,
      name: 'Pancakes',
      imageUrl: 'img/pancakes.png',
      cents: 300
    }, {
      id: 3,
      name: 'Fries',
      imageUrl: 'img/fries.png',
      cents: 700
    }, {
      id: 4,
      name: 'Hot Dog',
      imageUrl: 'img/hotdog.png',
      cents: 950
    }, {
      id: 5,
      name: 'Birthday Cake',
      imageUrl: 'img/birthdaycake.png',
      cents: 2000
    }
  ];

  Fixtures.Table[3].tab.tabItems = [Food[0],Food[1],Food[2],Food[3],Food[4]];

  Fixtures.Food = Food;

  return Fixtures;
});