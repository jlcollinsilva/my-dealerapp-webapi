namespace MyDealerApp {

    angular.module('MyDealerApp', ['ui.router', 'ngResource', 'ui.bootstrap', 'ngMaterial', 'ngMessages']).config((
        $stateProvider: ng.ui.IStateProvider,
        $urlRouterProvider: ng.ui.IUrlRouterProvider,
        $locationProvider: ng.ILocationProvider
    ) => {
        // Define routes
        $stateProvider
            .state('ByMakers', {
                url: '/',
                templateUrl: '/ngApp/views/makers.html',
                controller: MyDealerApp.Controllers.CarsController,
                controllerAs: 'controller'
            })
            .state('opensearch', {
                url: '/opensearch',
                templateUrl: '/ngApp/views/opensearch.html',
                controller: MyDealerApp.Controllers.CarsController,
                controllerAs: 'controller'
            })
            .state('notFound', {
                url: '/notFound',
                templateUrl: '/ngApp/views/notFound.html'
            });

        // Handle request for non-existent route
        $urlRouterProvider.otherwise('/notFound');

        // Enable HTML5 navigation
        $locationProvider.html5Mode(true);
    });

}
