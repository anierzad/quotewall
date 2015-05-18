(function() {

	var module = angular.module('QuoteWall');

	module.controller('HomeQuotesController', ['$scope', '$interval', 'DataService', 
		function($scope, $interval, DataService) {

			$scope.quotes;

			var getData = function() {
				console.log("Getting data.");
				DataService.getQuotes().then(
					function(data) {
						if(data.length) {
							if(!$scope.quotes || $scope.quotes.length != data.length )

							$scope.quotes = data;
						}
					});
			};

			getData();

			var dataInterval = $interval(getData, 1000);
			
			$scope.$on('destroy', function() {
				$interval.cancel(dataInterval);
			});
		}]);
})();
