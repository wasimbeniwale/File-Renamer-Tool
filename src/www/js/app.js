'use strict';

var app = angular.module('App', ['ionic', 'App.controllers', 'App.services']);

app.run(function ($ionicPlatform) {

});

app.config(function ($stateProvider, $urlRouterProvider, $compileProvider) {
	$stateProvider

		.state('app', {
			url: '/app',
			abstract: true,
			templateUrl: 'templates/menu.html',
			controller: 'AppCtrl'
		})

		.state('app.home', {
			url: '/home',
			views: {
				'menuContent': {
					templateUrl: 'templates/home.html',
					controller: 'HomeCtrl'
				}
			}
		})

		.state('app.about', {
			url: '/about',
			views: {
				'menuContent': {
					templateUrl: 'templates/about.html'
				}
			}
		});

	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/app/home');
});
