angular.module('pele')
  .controller('mafMainCtrl', ['ApiGateway', '$scope', 'PelApi', 
  function(ApiGateway, $scope, PelApi) {
      $scope.title = "MAF - Main";

      $scope.progsInRange = function(prog) {
        if((Number(prog.actual_processes) > Number(prog.to_up_processes))||
          (Number(prog.actual_processes) < Number(prog.from_up_processes))) 
          return "badge badge-assertive";
        else 
          return "badge badge-calm";
      };

      PelApi.showLoading();
      ApiGateway.get("maf/backlog", {
      }).success(function(data) {
        $scope.backLog = data.services;
      }).error(function(error, httpStatus, headers, config) {
        ApiGateway.throwError(httpStatus, "Maf get maf/backlog", config);
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
