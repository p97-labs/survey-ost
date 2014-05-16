//'use strict';

var app = {};

app.server = window.location.protocol + '//' + window.location.host;
app.viewPath = app.server + '/static/survey/';
angular.module('askApp', ['ngRoute', 'mgcrea.ngStrap.datepicker', 'mgcrea.ngStrap.tooltip',
    'mgcrea.ngStrap.button', "ui.bootstrap.tpls", "ui.bootstrap.modal", "ui.directives", 'nvd3ChartDirectives']) //'ui', 'ui.bootstrap',
    .config(function($routeProvider, $httpProvider) {

    $httpProvider.defaults.headers.post['Content-Type'] = 'application/json';
    $httpProvider.defaults.headers.patch = {
        'Content-Type': 'application/json;charset=utf-8'
    };
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    
    $routeProvider.when('/author/:surveySlug', {
        templateUrl: '/static/survey/views/author.html',
        controller: 'AuthorCtrl',
        reloadOnSearch: false
    })
    .when('/author', {
        templateUrl: '/static/survey/views/author.html',
        controller: 'AuthorCtrl',
        reloadOnSearch: false
    })
    .when('/surveys', {
        templateUrl: '/static/survey/views/SurveyList.html',
        controller: 'SurveyListCtrl'
    })
    .when('/survey/:surveySlug/complete/:uuidSlug', {
        templateUrl: '/static/survey/views/complete.html',
        controller: 'CompleteCtrl'
    })
    .when('/survey/:surveySlug/complete/:uuidSlug/:action/:questionSlug', {
        templateUrl: '/static/survey/views/complete.html',
        controller: 'CompleteCtrl'
    })
    .when('/survey/:surveySlug/:questionSlug/:uuidSlug', {
        templateUrl: '/static/survey/views/SurveyDetail.html',
        controller: 'SurveyDetailCtrl'
    })
    .when('/survey/:surveySlug/:uuidSlug', {
        templateUrl: '/static/survey/views/landing.html',
        controller: 'SurveyDetailCtrl'
    })
    .when('/agency-dash/:surveySlug', {
        templateUrl: '/static/survey/views/agency-dash.html',
        controller: 'AgencyDashCtrl'
    })

    /* Survey authoring */
    .when('/admin', {
        templateUrl: '/static/survey/views/survey-list.html',
        controller: 'SurveyListMenuCtrl'
    })

    /* Routes for dashboard side nav */
    .when('/welcome/:surveySlug', {
        templateUrl: '/static/survey/views/ost/dash-welcome.html',
        controller: 'DashWelcomeCtrl',
        reloadOnSearch: false
    })
    .when('/explore/:surveySlug', {
        templateUrl: '/static/survey/views/ost/dash-explore.html',
        controller: 'DashExploreCtrl',
        reloadOnSearch: false
    })
    .when('/RespondantList/:surveySlug', {
        templateUrl: '/static/survey/views/RespondantList.html',
        controller: 'RespondantListCtrl',
        reloadOnSearch: false
    })
    .when('/responses/:surveySlug', {
        templateUrl: '/static/survey/views/RespondantList.html',
        controller: 'RespondantListCtrl',
        reloadOnSearch: false
    })
    .when('/RespondantDetail/:surveySlug/:uuidSlug', {
        templateUrl: '/static/survey/views/ost/dash-respondent-detail.html',
        controller: 'RespondentDetailCtrl'
    })
    .when('/responses/:surveySlug/:uuidSlug', {
        templateUrl: '/static/survey/views/ost/dash-respondent-detail.html',
        controller: 'RespondentDetailCtrl',
    })
    .when('/ecosystems/:surveySlug', {
        templateUrl: '/static/survey/views/ost/dash-ecosystems.html',
        controller: 'DashEcosystemsCtrl'
    })
    .when('/project-overview/:surveySlug', {
        templateUrl: '/static/survey/views/ost/dash-project-overview.html',
        controller: 'DashProjectOverviewCtrl'
    })
    .when('/project-info/:surveySlug/:id', {
        templateUrl: '/static/survey/views/ost/dash-project-info-detail.html',
        controller: 'DashProjectInfoDetailCtrl'
    })

    // .when('/download/:surveySlug', {
    //     templateUrl: '/static/survey/views/ost/dash-download.html',
    //     controller: 'DashDownloadCtrl',
    // })
    .otherwise({
        redirectTo: '/welcome/monitoring-project'
    });
});
