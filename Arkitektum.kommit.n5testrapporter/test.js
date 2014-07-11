/// <reference path="tester_arkivstruktur.js"/>
/// <reference path="tester_sakarkiv.js"/>
/// <reference path="tester_admin.js"/>

function executeTests() {
    var n5rootApiUrl = document.getElementById("rootApiUrl").value;

    if (n5rootApiUrl) {

        var jasmineEnv = jasmine.getEnv();
        jasmineEnv.updateInterval = 1000;
        var htmlReporter = new jasmine.HtmlReporter(null, document.getElementById("report"));
        jasmineEnv.addReporter(htmlReporter);
        jasmineEnv.specFilter = function (spec) {
            return htmlReporter.specFilter(spec);
        };
        jasmineEnv.execute();


    }
}

function jsonToConsole(data) {
    return console.log(JSON.parse(data));
}

function finnLinkRel(rel, responseText) {
    var linkListe = JSON.parse(responseText);
    for (var i = 0; i < linkListe.link.length; i++) {
        if (linkListe.link[i].rel == rel) {
            return linkListe.link[i].href;
        }
    }
}