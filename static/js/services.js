/**
 * Created by ruanzr on 3/21/15.
 */
angular.module('fundServices', ['ngResource']);

angular.module('fundServices').factory('Fund', queryFunds);

queryFunds.$inject = ['$resource'];

function queryFunds($resource) {
    return $resource('/funds/:which', {}, {
        query: {method: 'GET', params: {which: ''}}
    });
}