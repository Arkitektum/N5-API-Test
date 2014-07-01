/// <reference path="Scripts/jasmine.js"/>
/// <reference path="lib/superagent/superagent.js"/>

//var request = require('lib/superagent');
//var rootApi = "http://localhost:49708/api";


function jsonToConsole(data) {
    return console.log(JSON.parse(data));
}

if (n5rootApiUrl) {

    var result = document.getElementsByClassName("jasmine_reporter");



    if (result != null) {

        var i = 0;
        for (i = 0; i < result.length; ++i) {
            var parent = result[i].parentNode;
            parent.removeChild(result[i]);
        }
    }

    test(n5rootApiUrl);


    // jasmine.Env = null;


    var jasmineEnv = jasmine.getEnv();

    jasmineEnv.clearReporters();

    jasmineEnv.updateInterval = 250;

    var htmlReporter = new jasmine.HtmlReporter(null, document.getElementById("report"));

    jasmineEnv.addReporter(htmlReporter);

    jasmineEnv.specFilter = function (spec) {
        return htmlReporter.specFilter(spec);
    };

    jasmineEnv.execute();

}

function test(rootApi) {

    describe("Nivå 2c - Administrasjon uten valgfrie krav", function () {

        it("sjekke om støtter administrasjon og arkivstruktur", function () {

            var doneFn = jasmine.createSpy("success");
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function (arguments) {
                if (this.readyState == this.DONE) {
                    doneFn(this.responseText);
                    jsonToConsole(this.responseText);
                }
            };
            xhr.open("GET", rootApi, false);
            xhr.send();
            expect(doneFn).toHaveBeenCalled();
            //expect(doneFn).toEqual(jasmine.objectContaining({
            //    "rel": "http://rel.kxml.no/noark5/v4/Arkivstruktur"
            //}));

        });


        it("registrere arkiv", function () {
            var doneFn = jasmine.createSpy("success_get");
            var doneFn2 = jasmine.createSpy("success_post");
            var xhr = new XMLHttpRequest();
            var postmsg = '';
            xhr.onreadystatechange = function (arguments) {
                if (this.readyState == this.DONE) {
                    doneFn(this.responseText);
                    jsonToConsole(this.responseText);
                    postmsg = this.responseText;
                }
            };
            xhr.open("GET", rootApi + "/arkivstruktur/nytt-arkiv", false);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.send();
            expect(doneFn).toHaveBeenCalled();
            var xhr2 = new XMLHttpRequest();
            xhr2.onreadystatechange = function (arguments) {
                if (this.readyState == this.DONE) {
                    doneFn2(this.responseText);
                    jsonToConsole(this.responseText);
                }
            };
            xhr2.open("POST", rootApi + "/arkivstruktur/nytt-arkiv", false)
            xhr2.setRequestHeader("Content-type", "application/json");
            xhr2.send(postmsg);
            expect(doneFn2).toHaveBeenCalled();
            expect(xhr2.status).toBe(201);
        });

        it("registrere arkivdel", function () {
            var doneFn = jasmine.createSpy("success_get");
            var doneFn2 = jasmine.createSpy("success_post");
            var xhr = new XMLHttpRequest();
            var postmsg = '';
            xhr.onreadystatechange = function (arguments) {
                if (this.readyState == this.DONE) {
                    doneFn(this.responseText);
                    jsonToConsole(this.responseText);
                    postmsg = this.responseText;
                }
            };
            xhr.open("GET", rootApi + "/arkivstruktur/ny-arkivdel", false);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.send();
            expect(doneFn).toHaveBeenCalled();
            var xhr2 = new XMLHttpRequest();
            xhr2.onreadystatechange = function (arguments) {
                if (this.readyState == this.DONE) {
                    doneFn2(this.responseText);
                    jsonToConsole(this.responseText);
                }
            };
            xhr2.open("POST", rootApi + "/arkivstruktur/ny-arkivdel", false)
            xhr2.setRequestHeader("Content-type", "application/json");
            xhr2.send(postmsg);
            expect(doneFn2).toHaveBeenCalled();
            expect(xhr2.status).toBe(201);
        });
    });

}