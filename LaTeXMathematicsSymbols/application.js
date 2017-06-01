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

application.directive("katex", function () {
    return {
        restrict: "E",
        link: function (scope, element) {
            var latex = element.html();
            if (typeof (katex) === "undefined") {
                require(["katex"], function (katex) {
                    katex.render(latex, element[0]);
                });
            }
            else {
                katex.render(latex, element[0]);
            }
        }
    }
});

application.controller("SearchController", ["$scope", "$http", function SearchController($scope, $http) {
    $http.get("symbols.json").then(function (data) {
        $scope.symbols = data.data;
    });
}])