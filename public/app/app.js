var app = angular.module('RetraceSalesApp', ['ngRoute', 'ui.bootstrap', 'OppCtrls', 'oppService', 'ui.router', 'angular.filter']);

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
		.when('/navbar', {
			templateUrl: 'app/view/navbar.html',
			controller: 'NavCtrl'
		})
		;

		$locationProvider.html5Mode(true);

	}]);