angular.module('crowdfund', ['firebase'])
    .controller('AppController', ['$scope', 'campaign', '$firebaseObject', function ($scope, campaign, $firebaseObject) {
        $scope.campaignName = $firebaseObject(campaign.child('name'));
        $scope.tagline = $firebaseObject(campaign.child('tagline'));
        $scope.description = $firebaseObject(campaign.child('description'));
    }])
    .factory('campaign',['$firebaseObject', function ($firebaseObject) {
        var ref = new Firebase("https://incandescent-fire-2805.firebaseio.com");
        return ref.child('campaign');
    }])
    .controller('StatusController', ['$scope', '$firebaseObject', 'campaign', function ($scope, $firebaseObject, campaign) {

        $scope.amountRaised = $firebaseObject(campaign.child('amountRaised'));
        $scope.numPeople = $firebaseObject(campaign.child('numPeople'));
    }])
    .controller('ContributeController', ['$scope', '$firebaseObject', 'campaign', function ($scope, $firebaseObject, campaign) {
        $scope.amountRaised = 0;
        $scope.numPeople = 0;
        $scope.contribs = [
            100,
            400,
            1000,
            2500
        ];
        $firebaseObject(campaign.child('amountRaised')).$bindTo($scope, 'amountRaised');
        $firebaseObject(campaign.child('numPeople')).$bindTo($scope, 'numPeople');

        $scope.contribute = function (amount) {
            $scope.amountRaised.$value += amount;
            $scope.numPeople.$value += 1;
        };

    }])
    .directive('cfContribute',function () {

    })
