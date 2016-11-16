var app = angular.module('movies', []);

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
    return service;
});

app.controller('MainController', function($scope, MovieService) {

    $scope.getNowPlaying = function(){
        MovieService.nowPlaying()
            .success(function(movieResults) {
                // got movie results
                $scope.nowMovies = movieResults;
                console.log('Movie results', movieResults);
            });
    };

    $scope.getMovieDetails = function(id){
        MovieService.movieDetails($scope.movieID)
            .success(function(data) {
                // got movie results
                console.log('Movie Details', data);
            });
    };

    $scope.getSearchResults = function(query){
        MovieService.searchMovies($scope.query)
            .success(function(movieResults) {
                // got movie results
                console.log('Search Results', movieResults);
            });
    };

});
