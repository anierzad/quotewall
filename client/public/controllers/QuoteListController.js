(function() {

	var module = angular.module('QuoteWall');

	module.controller('QuoteListController', ["$scope", "DataService", 
		function($scope, DataService) {

			DataService.getQuotes().then(
				function(data) {
					$scope.quotes = data;
				});
		}]);
})();
