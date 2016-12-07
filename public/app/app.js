var app = angular.module('RetraceSalesApp', ['ngRoute', 'mm.foundation', 'OppCtrls', 'oppService', 'ui.router']);

	app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){

		$routeProvider
		.when('/', {
			templateUrl: 'app/views/opportunities.html',
			controller: 'HomeCtrl'
		})
		.when('/opportunities', {
			templateUrl: 'app/views/opportunities.html',
			controller: 'HomeCtrl'
		})
		.when('/newOpportunity', {
			templateUrl: 'app/views/newOpportunity.html',
			controller: 'NewCtrl'
		})
		.when('/matches', {
			templateUrl: 'app/views/matches.html',
			controller: 'MatchCtrl'
		})
		;

		$locationProvider.html5Mode(true);

	}]);