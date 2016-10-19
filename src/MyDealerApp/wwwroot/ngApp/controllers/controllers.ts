namespace MyDealerApp.Controllers {

    //General controller for data manipulation of the main views.
    export class CarsController {
        public selectedMaker; //store the maker seleted by the user
        public makers; //store objects for each Maker
        public makeCars; //store the cars for one maker selected
        public cars; //store all the cars
        public car; //content data of one specific car
        public searchText; //store the input text enter by the user

        //function for retrieve all the cars of the Dealer (system).
        public getAllCars() {
            this.$http.get('/api/cars/').success
                ((results: any) => {
                    this.cars = results;
                });
        }

        //function for to get all the cars of one Maker given
        public getCars() {
            this.makeCars = this.cars.filter((car) => car.carMakeId == this.selectedMaker.id);
        };


        //function for to show the modal with details about the car selected by the user
        public showmodal(carData: any) {
            this.$uibModal.open({
                templateUrl: '/ngApp/views/cardetail.html',
                controller: 'DetailController', //See definition and details ahead (below)
                controllerAs: 'modal',
                resolve: {
                    carData: () => carData
                },
                size: 'md'
            })
         }

        //Function for to get detail data of the car selected by the user
        public carDetail(id) {
            this.$http.get('/api/cars/' + id).success
                ((results: any) => {
                    this.car = results
                    this.showmodal(this.car);
                });
        }

        //Constructor of the CarsController class.
        constructor(private $http: ng.IHttpService, private $uibModal: angular.ui.bootstrap.IModalService) {
            $http.get('/api/makes').success((results) => {
                this.makers = results; //To get all the makers
            }
            )
            this.getAllCars(); //To get all the cars.
        }

    } //End of the controller: "CarsController"

    //Registration in the application of the Controller associated to the main view.
    angular.module('MyDealerApp').controller('CarsController', CarsController);


    //Controller specific for the Modal view/instance/scope
    class DetailController {
        constructor(public carData: any, private $uibModal: angular.ui.bootstrap.IModalService,
                        private $uibModalInstance: angular.ui.bootstrap.IModalServiceInstance) { }

        public closeDialog($uibModalInstance) {
            this.$uibModalInstance.close(); //Just for to close the Modal view.
        }
    } //End of the Controller: "DetailController"

    //Registration in the application of the Controller associated to the Modal.
    angular.module('MyDealerApp').controller('DetailController', DetailController);

}
