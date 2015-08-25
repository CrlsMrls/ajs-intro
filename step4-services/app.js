'use strict';

angular.module('pizzaApp', [])
	.factory('shopCartService', function(){

		var factoryInstance = {};
		var pizzaListCart = [];

		factoryInstance.addPizzaToCart = function(pizza) {
			pizzaListCart.push({name: pizza.name, price: pizza.price});
		};
		factoryInstance.getCart = function(){
			return pizzaListCart;
		};

		return factoryInstance;
	})
	.controller('shopListController', function($scope, $http, shopCartService) {
		
		$scope.buy = function ( pizza ) {
			shopCartService.addPizzaToCart(pizza);
		};

		$http({method: 'GET', url: '/pizzas.json'}).
			success(function(data) {
				$scope.pizzaList = data;
			}
		);

		$scope.orderValue = 'name';

	})
	.controller('shopCartController', function($scope, shopCartService){

		$scope.shopCartList = shopCartService.getCart();

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
