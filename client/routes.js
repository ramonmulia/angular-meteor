(function() {
  "use strict";

  angular.module('socially')
    .config(function($urlRouterProvider, $stateProvider, $locationProvider) {
      $locationProvider.html5Mode(true);

      $stateProvider
        .state('parties', {
          url: '/parties',
          template: '<parties-list></parties-list>'
        })
        .state('partyDetails', {
          url: '/parties/:partyId',
          template: '<party-details></party-details>',
          resolve: {
            currentUser: function($q) {
              if (Meteor.userId() === null) {
                return $q.reject();
              } else {
                return $q.resolve();
              }
            }
          }
        });

      $urlRouterProvider.otherwise("/parties");
    })
    .run(function($rootScope, $state) {
      $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
        if (error === 'AUTH_REQUIRED') {
          $state.go('parties');
        }
      });
    });
})();
