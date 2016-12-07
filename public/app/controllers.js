angular.module('OppCtrls', ['oppService', 'angular-toArrayFilter'])

.controller('HomeCtrl', ['$scope', '$routeParams', '$route', 'Opportunities', function($scope, $routeParams, $route, Opportunities) {

		$scope.opportunity = {};
		$scope.activeMenu= "View All";

		Opportunities.query({id : $routeParams.id}, function success(data) {
			$scope.opportunity = data;
		}, function error(data) {
			console.log(data);
		});

		$scope.viewAllOpps = function(){
			$route.reload();
			console.log($scope.opportunity[0].type);
		}

	}])

.controller('MatchCtrl', ['$scope', 'Opportunities', '$routeParams', '$http', function($scope, Opportunities, $routeParams, $http){

		Opportunities.query({id : $routeParams.id}, function success(data) {
			$scope.matches = data;
			$scope.matched = [];

			$scope.buyerHeader = 'Buyer';
			$scope.sellerHeader = 'Seller';
			
			// Filter only buyer-type opportunities 

			$scope.buyers = data.filter(function(product) {
				return product.type === 'Buyer';
			});
			var buyers = $scope.buyers;

			// Filter only seller-type opportunities

			$scope.sellers = data.filter(function(product) {
				return product.type === 'Seller';
			})
			var sellers = $scope.sellers;
			
			buyers.forEach(function(buyer) {
				sellers.forEach(function(seller) {
					if (buyer.condition === seller.condition && buyer.price === seller.price) {
						$scope.matchedSeller = seller;
						$scope.matchedBuyer = buyer;
						// console.log($scope.matchedSeller);
						$scope.matched.push(seller);
						$scope.matched.push(buyer);
						
					}
				});
			});

			console.log($scope.matchedBuyer);

		}, function error(data) {
			console.log(data);
		});

}])

.controller('NewCtrl', ['$scope', '$location', '$route', 'Opportunities', function($scope, $location, $route, Opportunities) {
		$scope.opportunity = {
			manufacturer: '',
			model : '',
			storage : '',
			condition : '',
			color : '',
			country : '',
			quantity : 0,
			price : 0,
			salesRep : ['Emil', 'Ernie', 'Zee', 'Robert'],
			type : ['Buyer', 'Seller']
		};

		$scope.createOpportunity = function() {

			$scope.opportunity.salesRep = $scope.salesRep;
			$scope.opportunity.type = $scope.bs;

			// Opportunities.save($scope.opportunity, function success(data) {
			// 	$location.path('/opportunities');
			// }, function error(data) {
			// 	console.log(data);
			// });

			$route.reload();
			
			console.log("Checking to see if I/'m alive!");

		}

	}]);