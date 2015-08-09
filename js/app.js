angular.module('crowdfund', ['firebase'])
    .controller('AppController', ['$scope', 'FirebaseRef', function ($scope, FirebaseRef) {
        FirebaseRef('campaignName').$bindTo($scope, 'campaignName');
        $scope.description = 'Be a part of helping hundreds of millions of children to read, write, and perform arithmetic.';
    }])
    .factory('FirebaseRef',['$firebaseObject', function ($firebaseObject) {
        return function (key) {
            var ref = new Firebase("https://incandescent-fire-2805.firebaseio.com/"+key);
            return $firebaseObject(ref);
        }
    }])
    .controller('StatusController', ['$scope', '$firebaseObject', 'FirebaseRef', function ($scope, $firebaseObject, FirebaseRef) {
        FirebaseRef('amountRaised').$bindTo($scope, "amountRaised");
        FirebaseRef('numPeople').$bindTo($scope, "numPeople");

    }])
    .controller('ContributeController', ['$scope', '$firebaseObject', 'FirebaseRef', function ($scope, $firebaseObject, FirebaseRef) {
        FirebaseRef('amountRaised').$bindTo($scope, "amountRaised");
        FirebaseRef('numPeople').$bindTo($scope, "numPeople");

        $scope.contribs = [
            100,
            400,
            1000,
            2500
        ];
        $scope.contribute = function (amount) {
            console.dir(FirebaseRef);
            var ref = FirebaseRef('amountRaised');
            ref.$loaded().then(function(data){
                data += amount;
                ref.$save();
            });
            console.log('You have contributed ' + amount);
        };

    }])
    .directive('cfContribute',function () {

    })
