'use strict';
angular.module('App.services', [])

    .factory('dbService', function ($q) {

        function getData() {
            var dfd = $q.defer();
            dfd.resolve('New Data');
            return dfd.promise;
        }
        return {
            getData: getData
        }
    })

    .factory('validation', function () {

        function isValidValue(givenData) {
            if(typeof(givenData) !== 'undefined' && givenData !== null && givenData !== ''){
                return true;
            }
            return false;
        }
        return {
            isValidValue: isValidValue
        }
    })

    .factory('loadingIndicator', function ($ionicLoading) {

        function show() {
            $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true
            });
        }

        function hide(){
            $ionicLoading.hide();
        }
        return {
            show: show,
            hide:hide
        }
    });