(function() {

	var module = angular.module("QuoteWall");
	var apiBaseUrl = "http://localhost:8000/api/";

	module.factory("DataService", ["$http", "$q", function($http, $q) {

		// Users API.
		var getUsers = function() {
			return $http.get(apiBaseUrl + "users");
		};

		var getUser = function(userId) {
			return $http.get(apiBaseUrl + "users/" + userId);
		};

		// Quotes API.
		// These should eventually build out the whole quote from it's parts to save effort later.
		var getQuotes = function() {
			
			var quotes;

			var promises = [];

			return $http.get(apiBaseUrl + "quotes").then(function(response) {

				quotes = response.data;

				angular.forEach(quotes, function(quote) {
					promises.push(
						$http.get(apiBaseUrl + "quoteparts?quoteid=" + quote._id).then(function(response) {
							quote.quoteParts = response.data;

							angular.forEach(quote.quoteParts, function(quotePart) {
									promises.push(
										$http.get(apiBaseUrl + "users/" + quotePart.author_id).then(function(response) {
											quotePart.author = response.data;
										}));
								});
						}));
				});
				return $q.all(promises).then(
					function() {
						return quotes;
					});
				});
		};

		var getQuote = function(quoteId) {
			return $http.get(apiBaseUrl + "quotes/" + quoteId);
		};

		return {
			getUsers: getUsers,
			getUser: getUser,

			getQuotes: getQuotes,
			getQuote: getQuote
		};
	}]);

})();
