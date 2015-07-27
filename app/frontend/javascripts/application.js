// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require requestAnimationFrame
//= require modernizrAdditions
//= require underscore
//= require angular
//= require matchmedia-ng
//= require angular-route
//= require angular-resource
//= require angular-animate
//= require angular-touch
//= require angular-cache
//= require angular-carousel
//= require angular-loading-bar
//= require bootstrap
//= require bootstrap-select
//= require_tree ./templates
//= require main
//= require_tree ./services
//= require_tree ./controllers
//= require_tree ./directives
//= require appConfiguration
//= require  fbInit

$(document).ready(function () {
    $(document).click(function (event) {
        var clickover = $(event.target);
        var _opened = $(".navbar-collapse").hasClass("collapsing") || $('.navbar-collapse').hasClass("collapse in");
        if (_opened === true && !clickover.hasClass("navbar-toggle")) {
            $("button.navbar-toggle").click();
        }
    });
});