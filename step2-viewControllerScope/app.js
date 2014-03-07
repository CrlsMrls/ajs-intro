'use strict';

angular.module('pizzaApp', []).
	controller('shopListController', function($scope, $http) {
		
		$http({method: 'GET', url: '/pizzas.json'}).
			success(function(data) {
				$scope.pizzaList = data;
			}
		);

		$scope.orderValue = 'name';

	}).
	controller('shopCartController', function($scope){

		$scope.shopCartList = [{name: 'test1', price:1},
			{name: 'test2', price: 2},
			{name: 'test3', price: 3}];

		$scope.totalPrice = function () {
			var total = 0;
			angular.forEach($scope.shopCartList, function (pizza){
				total += pizza.price;
			});
			return total;
		};

		$scope.removeFromCart = function (idx){
			$scope.shopCartList.splice(idx,1);
		};

	});
