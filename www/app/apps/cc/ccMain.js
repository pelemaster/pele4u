angular.module('pele')
  .controller('ccMainCtrl', ['ApiGateway', '$scope', '$state', 'PelApi',
  function(ApiGateway, $scope, $state, PelApi) {
      $scope.title = "CC - Main";
      alert('In ccMain controller');
      PelApi.showLoading();
      ApiGateway.get("cc/getenv", {
      }).success(function(data) {
        alert('ApiGateway returned');
        $scope.envList = data.EnvList;
        $scope.envList = _.filter($scope.envList, function(e) { return  e.Environment != null; });
      }).error(function(error, httpStatus, headers, config) {
        //ApiGateway.reauthOnForbidden(httpStatus, "Unauthorized getnext api", config);
        //PelApi.throwError("api", "get new Lead seq", "httpStatus : " + httpStatus + " " + JSON.stringify(error) + "(MS:" + config.ms + ")")
        ApiGateway.throwError(httpStatus, "CC get Environments List", config);
      }).finally(function() {
        PelApi.hideLoading();
      });
    }
  ]);
