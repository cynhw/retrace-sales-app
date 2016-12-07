angular.module('oppService', ['ngResource'])
	.factory('Opportunities', ['$resource', function($resource) {
		return $resource('http://localhost:3000/api/opportunities/:id');
	}])
	.factory('Data', ['$resource, $http, $routeParams', function($resource, $http, $routeParams) {
		
	}])