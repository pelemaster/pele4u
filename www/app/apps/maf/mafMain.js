angular.module('pele')
  .controller('mafMainCtrl', ['ApiGateway', '$scope', 'PelApi', 
  function(ApiGateway, $scope, PelApi) {
      $scope.title = "MAF - Main";
      
      $scope.progsInRange = function(prog) {
        return (prog.actual_processes > prog.to_up_processes)||(prog.actual_processes < prog.from_up_processes);
      }

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
