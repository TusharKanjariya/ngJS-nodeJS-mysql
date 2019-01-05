
var app = angular.module('myApp',['ngRoute','toastr']);

app.config(function($routeProvider){
    $routeProvider
    .when('/',{
        templateUrl : 'main.html',
        controller : 'details'
    })
    .when('/update/:id',{
        templateUrl : 'update.html',
        controller : 'update'
    })
    .when('/add',{
        templateUrl : 'add.html',
        controller : 'insert'
    })
})

app.controller('details',function($scope,$http,toastr){
    function getEMP(){
        $http.get("/getUsers").then(function(response){
            $scope.data = response.data;
            console.log($scope.data);
            if($scope.data.length > 0){
                $scope.display = true;
            }else{
                $scope.display = false;
            }
        });
    }

    getEMP();

    $scope.remove = function(id){
        $http.get("/deleteUser",{params:{eid : id}}).then(function(response){
            console.log(response.data);
            toastr.success('','Delete Successfully');
        });
        getEMP();
    }
});

app.controller('update',function($scope,$routeParams,$http,toastr){
    $scope.id = $routeParams.id;
    $http.get('/singleRow',{params : {eid : $scope.id}}).then(function(response){
        var result = response.data;
        $scope.name = result[0].name;
        $scope.pwd = result[0].password;
    });

    $scope.update = function(id){
        
        $http.get('/updateData',{params : {eid : id,name : $scope.name,password : $scope.pwd}})
        .then(function(response){
            toastr.success('',response.data.affectedRows + ' Rows Updated Successfully');
        });
    }
});

app.controller('insert',function($scope,$http,toastr){
    $scope.add = function(){
        
        $http.get('/addData',{params : {name : $scope.name,password : $scope.pwd}})
        .then(function(response){
            console.log(response.data);
            toastr.success('',response.data.affectedRows + ' Data Recorded Successfully');
        });
    }
})