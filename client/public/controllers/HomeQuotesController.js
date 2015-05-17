(function() {

	var module = angular.module('QuoteWall');

	module.controller('HomeQuotesController', ["$scope", "DataService", 
		function($scope, DataService) {

			DataService.getQuotes().then(
				function(data) {
					if(data.length) {
						$scope.quotes = data;
					}
				});
		}]);
})();
