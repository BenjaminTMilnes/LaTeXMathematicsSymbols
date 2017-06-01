var application = angular.module("LaTeXMathematicsSymbols", []);

application.filter("symbolsNotNull", function () {
    return function (symbols) {
        var symbolsNotNull = [];

        for (var i = 0; i < symbols.length; i++) {
            if (symbols[i].LaTeXCommand != "") {
                symbolsNotNull.push(symbols[i]);
            }
        }

        return symbolsNotNull;
    };
});

application.filter("tagsNotNull", function () {
    return function (tags) {
        var tagsNotNull = [];

        for (var i = 0; i < tags.length; i++) {
            if (tags[i] != "") {
                tagsNotNull.push(tags[i]);
            }
        }

        return tagsNotNull;
    };
});

application.controller("SearchController", ["$scope", "$http", function SearchController($scope, $http) {
    $http.get("symbols.json").then(function (data) {
        $scope.symbols = data.data;
    });
}])