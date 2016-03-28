'use strict';

// Customers controller

angular.module('customers').controller('CustomersController', ['$scope', '$stateParams', 'Authentication', 'Customers', '$uibModal', '$log',
  function($scope, $stateParams, Authentication, Customers, $uibModal, $log) {

    this.authentication = Authentication;

    // Find a list of Customers
    this.customers = Customers.query();


    // Open a modal window to Create a single customer record
    this.modalCreate = function (size) {

      var modalInstance = $uibModal.open({
        templateUrl: 'modules/customers/client/views/create-customer.modal.view.html',
        controller: function ($scope, $uibModalInstance) {


          $scope.ok = function (isValid) {
            console.log(isValid);
            $uibModalInstance.close();
          };

          $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
          };
        },
        size: size
      });

      modalInstance.result.then(function (selectedItem) {
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };



    // Open a modal window to Update a single customer record
    this.modalUpdate = function (size, selectedCustomer) {

      var modalInstance = $uibModal.open({
        templateUrl: 'modules/customers/client/views/update-customer.modal.view.html',
        controller: function ($scope, $uibModalInstance, aCustomer) {

          $scope.theCustomer = {};

          $scope.theCustomer = angular.copy(aCustomer);


          $scope.ok = function () {
            $uibModalInstance.close();
          };

          $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
          };
        },
        size: size,
        resolve: {
          aCustomer: function () {
            return selectedCustomer;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };



    // Remove existing Customer
    this.remove = function (customer) {
      if (customer) { customer.$remove();

        for (var i in this.customers) {
          if (this.customers [i] === customer) {
            this.customers.splice(i, 1);
          }
        }
      } else {
        this.customer.$remove(function() {
        });
      }
    };

  }
]);
