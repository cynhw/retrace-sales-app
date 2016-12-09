angular.module('OppCtrls', ['oppService', 'angular-toArrayFilter'])

.controller('HomeCtrl', ['$scope', '$routeParams', '$route', 'Opportunities', function($scope, $routeParams, $route, Opportunities) {

		$scope.opportunity = [];
		$scope.activeMenu= "View All";

		Opportunities.query({id : $routeParams.id}, function success(data) {
			$scope.opportunity = data;

		$scope.q = [];
		$scope.queryBy = '$';

		}, function error(data) {
			console.log(data);
		});

		$scope.viewAllOpps = function(){
			$route.reload();
			console.log($scope.opportunity[0].type);
		}

	}])

.filter('searchFilter', function($filter) {

    return function(inputArray, searchText, booleanOp) {
        booleanOp = booleanOp || 'AND';

        var searchTerms = (searchText || '').toLowerCase().split(/\s+/);

        if (booleanOp === 'AND') {
            var result = inputArray;
            searchTerms.forEach(function(searchTerm) {
                result = $filter('filter')(result, searchTerm);
            });

        } else {
            var result = [];
            searchTerms.forEach(function(searchTerm) {
                result = result.concat($filter('filter')(inputArray, searchTerm));
            });
        }

        return result;
    };
})

.controller('MatchCtrl', ['$scope', 'Opportunities', '$routeParams', '$http', '$filter', function($scope, Opportunities, $routeParams, $http, $filter){

		Opportunities.query({id : $routeParams.id}, function success(data) {
			$scope.matches = data;
			$scope.matched = [];
			$scope.matched2 = [];

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
			
			sellers.forEach(function(seller) {
				buyers.forEach(function(buyer) {
					if (buyer.model === seller.model) {
						$scope.matchedSeller = seller;
						$scope.matchedBuyer = buyer;

						$scope.matched2.push(seller);
						$scope.matched.push(buyer);
						
					}
				});
			});

			console.log($scope.matched);
			console.log($scope.matched2);

		}, function error(data) {
			console.log(data);
		});

}])

.controller('NavCtrl', ['$scope', '$route', '$location', function($scope, $route, $location){
			$scope.toggled = function(open) {
    	$log.log('Dropdown is now: ', open);
  		};

  		$scope.toggleDropdown = function($event) {
    		$event.preventDefault();
    		$event.stopPropagation();
    		$scope.status.isopen = !$scope.status.isopen;
  		};
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

			Opportunities.save($scope.opportunity, function success(data) {
				$location.path('/opportunities');
			}, function error(data) {
				console.log(data);
			});

			$route.reload();
			
			console.log("Checking to see if I/'m alive!");

		}

	}]);