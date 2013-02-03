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
  $scope.tab = _.find(OrderService.Tab, function(e) { return e.id === $scope.table.tab });

  // load tab items
  // this is a very stupid way to map record ids to records. but works for now
  $scope.tab.tabItems = _.map($scope.tab.tabItems, function(tabItemId){
    var tabItem = _.find(OrderService.TabItem, function(e){
      return tabItemId === e.id || tabItemId === e;
    });
    if (tabItem) {
      tabItem.food = _.find(OrderService.Food, function(e){
        return tabItem.food === e.id || tabItem.food === e; 
      });
    }
    return tabItem;
  })

  // add tab item
  $scope.addFood = function(food) {
    $scope.tab.tabItems.push(
    {
      food: food,
      cents: food.cents
    });
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
  Fixtures.Table = [
    {
      id: 1,
      tab: 1
    }, {
      id: 2,
      tab: 2
    }, {
      id: 3,
      tab: 3
    }, {
      id: 4,
      tab: 4
    }, {
      id: 5,
      tab: 5
    }, {
      id: 6,
      tab: 6
  }];

  Fixtures.Tab = [
    {
      id: 1,
      tabItems: []
    }, {
      id: 2,
      tabItems: []
    }, {
      id: 3,
      tabItems: []
    }, {
      id: 4,
      tabItems: [400, 401, 402, 403, 404]
    }, {
      id: 5,
      tabItems: []
    }, {
      id: 6,
      tabItems: []
    }
  ];

  Fixtures.TabItem = [
    {
      id: 400,
      cents: 1500,
      food: 1
    }, {
      id: 401,
      cents: 300,
      food: 2
    }, {
      id: 402,
      cents: 700,
      food: 3
    }, {
      id: 403,
      cents: 950,
      food: 4
    }, {
      id: 404,
      cents: 2000,
      food: 5
    }
  ];

  Fixtures.Food = [
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

  return Fixtures;
});