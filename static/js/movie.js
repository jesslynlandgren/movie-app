var app = angular.module('movies', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state({
            name: 'now_playing',
            url: '/now_playing',
            templateUrl: 'now_playing.html',
            controller: 'HomeController'
        })

        .state({
            name: 'popular',
            url: '/popular',
            templateUrl: 'popular.html',
            controller: 'PopularController'
        })

        .state({
            name: 'search_results',
            url: '/search/{query}',
            templateUrl: 'search.html',
            controller: 'SearchResultsController'
        })

        .state({
            name: 'movie_details',
            url: '/detail/{id}',
            templateUrl: 'movie_details.html',
            controller: 'MovieDetailsController'
        })

    $urlRouterProvider.otherwise('/now_playing');
});

app.factory('MovieService', function($http) {

    var service = {};
    var API_KEY = '967e378bf8396ff7e038620453f7bafc';

    service.nowPlaying = function() {
        var url = 'http://api.themoviedb.org/3/movie/now_playing';
        return $http({
            method: 'GET',
            url: url,
            params: {
                api_key: API_KEY
            }
        });
    };

    service.popular = function() {
        var url = 'http://api.themoviedb.org/3/movie/popular';
        return $http({
            method: 'GET',
            url: url,
            params: {
                api_key: API_KEY
            }
        });
    };

    service.searchMovies = function(query) {
        var url = 'http://api.themoviedb.org/3/search/movie';
        return $http({
            method: 'GET',
            url: url,
            params: {
                api_key: API_KEY,
                query: query
            }
        });
    };

    service.movieDetails = function(movieId) {
        var url = 'http://api.themoviedb.org/3/movie/' + movieId;
        return $http({
            method: 'GET',
            url: url,
            params: {
                api_key: API_KEY
            }
        });
    };
    return service;
});

var queryGlobal = '';

app.controller('HomeController', function($scope, $state, MovieService){
    MovieService.nowPlaying()
        .success(function(movieResults) {
            $scope.results = movieResults.results;
        });

    $scope.search = function(){
        console.log('Search Query: ', $scope.query);
        $state.go('search_results', {
            query: $scope.query
        });
        // if ($scope.query.length > 0){
        //     console.log('Query to StateGO: ', $scope.query);
        //     $state.go('search_results', {
        //         query: $scope.query
        //     });
        // }
    };
});

app.controller('SearchResultsController', function($scope, $state, $stateParams, MovieService){
    $scope.searchQuery = $stateParams.query;
    console.log('Search Results Query: ', $scope.searchQuery);
    console.log('Search Results Query Length: ', $scope.searchQuery.length);
    if ($scope.searchQuery.length > 0){
    MovieService.searchMovies($stateParams.query)
        .success(function(movieResults) {
            $scope.results = movieResults.results;
        });
    } else {
        $scope.results = [];
    }
});

app.controller('PopularController', function($scope, $stateParams, MovieService) {
    MovieService.popular($stateParams.id)
        .success(function(movieResults) {
            $scope.results = movieResults.results;
        });
});

app.controller('MovieDetailsController', function($scope, $stateParams, MovieService) {
    MovieService.movieDetails($stateParams.id)
        .success(function(movie) {
            $scope.movie = movie;
        });
});
