
angular.module('askApp').controller('DashWelcomeCtrl', function($scope, $http, $routeParams, $location, surveyFactory, dashData, chartUtils) {
    
    $scope.activePage = 'welcome';
    $scope.filters = {};
    $scope.filtersJson = '';

    surveyFactory.getSurvey(function (data) {
        data.questions.reverse();
        $scope.survey = data;
    });

});
