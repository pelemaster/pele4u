angular.module('pele')
  .controller('packagedetailsCtrl', ['ApiGateway', '$scope', '$state', 'PelApi',
  function(ApiGateway, $scope, $state, PelApi) {
      $scope.title = "CC - Package details";
      $scope.package = $state.params.pkg;
      $scope.state = $state.params.stat;

      function callEAILauncher(eaipath) {
        PelApi.showLoading();
        ApiGateway.post(eaipath, {
            environment:$state.params.env,
            state:$state.params.stat,
            package:$state.params.pkg,
        }).success(function(data) {
        console.log('Data from EAI:');
        console.log(data);
        //let retpath='#/app/ccApp/packagelist/' + state.params.env + "/" + new Date().getTime();
        //window.location.href = retpath;
          /*
          $state.go("app.cc.packagelist", {
              env: $state.params.env,
	            timestamp: new Date().getTime()
            }, {
              reload: true
          })
          */
        }).error(function(error, httpStatus, headers, config) {
          //ApiGateway.reauthOnForbidden(httpStatus, "Unauthorized getnext api", config);
          //PelApi.throwError("api", "get new Lead seq", "httpStatus : " + httpStatus + " " + JSON.stringify(error) + "(MS:" + config.ms + ")")
          ApiGateway.throwError(httpStatus, eaipath, config);
        }).finally(function() {
          PelApi.hideLoading();
        });
      }

      $scope.promote = function() {
        callEAILauncher("cc/promotepackage");
      }

      $scope.demote = function() {
        callEAILauncher("cc/demotepackage");
    }
  }]);
