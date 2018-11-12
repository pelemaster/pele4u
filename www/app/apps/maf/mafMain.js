angular.module('pele')
  .controller('mafMainCtrl', ['ApiGateway', '$scope', 'PelApi', 
  function(ApiGateway, $scope, PelApi) {
      $scope.title = "MAF - Main";
      PelApi.showLoading();
      ApiGateway.get("maf/backlog", {
      }).success(function(data) {
        $scope.backLog = data.services;
      }).error(function(error, httpStatus, headers, config) {
        ApiGateway.throwError(httpStatus, "Maf get maf/proc", config);
      })
      ApiGateway.get("maf/proc", {
      }).success(function(data) {
        $scope.progList = data.processes;
      }).error(function(error, httpStatus, headers, config) {
        ApiGateway.throwError(httpStatus, "Maf get maf/proc", config);
      }).finally(function() {
        PelApi.hideLoading();
      });
    }
  ]);
