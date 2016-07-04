app.controller("temperaturController", function ($scope, $http, $interval) {
	
	$http.get("http://localhost:8081/v1/temperatursensor").then(function (response) {
		var data = response.data;
		$scope.sensores = data;
	});   
	
	$interval(function() {
		$http.get("http://localhost:8081/v1/temperatursensor").then(function (response) {
			var data = response.data;
			$scope.sensores = data;
		});        
    }, 60000);
	
    $scope.title = "Temperatur";  
});
app.controller("relaisController", function ($scope, $http, $timeout, $log) {
	$http.get("http://localhost:8081/v1/relais").then(function (response) {
		var data = response.data;
		
		angular.forEach(data, function(value, key) {
			if(value.status == 'ON') {
				value.status = true;
			} else {
				value.status = false;
			}
		});
		
		$scope.relaises = data;
	});
	
    $scope.title = "Relais";
    
    $scope.toggle = function (relais, index) {
    	$log.info(relais.relaisId + ": " + relais.status)
    	if(relais.status) {
    		$http.post("http://localhost:8081/v1/relais/" + relais.relaisId + "/off")
    		.then(function (response) {});
    		relais.status = !relais.status;
    	} else {
    		$http.post("http://localhost:8081/v1/relais/" + relais.relaisId + "/on")
    		.then(function (response) {});
    		relais.status = !relais.status;
    	}
    	
    	$scope.relaises[index] = relais;
    }
});