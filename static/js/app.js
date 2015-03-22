/**
 * Created by ruanzr on 3/17/15.
 */
angular.module('app', ['ui.router', 'fundServices']);

angular.module('app').config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('');
    $stateProvider
        .state('all', {
        url: '',
        templateUrl: 'pages/funds.html',
        controller: 'SummaryCtrl',
        controllerAs: 'sc'
    })
        .state('ali', {
            url: '/ali',
            templateUrl: 'pages/funds.html',
            controller: 'SummaryCtrl',
            controllerAs: 'sc'
        })
        .state('jd', {
            url: '/jd',
            templateUrl: 'pages/funds.html',
            controller: 'SummaryCtrl',
            controllerAs: 'sc'
        });
})