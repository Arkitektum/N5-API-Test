/// <reference path="Scripts/jasmine.js"/>
/// <reference path="lib/superagent/superagent.js"/>

//var request = require('lib/superagent');
//var rootApi = "http://localhost:49708/api";

console.log("ApiUrl: " + n5rootApiUrl)

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

    console.log(document.getElementById("report"));
    var htmlReporter = new jasmine.HtmlReporter(null, document.getElementById("report"));

    jasmineEnv.addReporter(htmlReporter);

    jasmineEnv.specFilter = function (spec) {
        return htmlReporter.specFilter(spec);
    };

    jasmineEnv.execute();

}

function test(rootApi) {

    describe("arkivstruktur", function () {

        it("søk etter arkiv", function () {

            var doneFn = jasmine.createSpy("success");
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function (arguments) {
                if (this.readyState == this.DONE) {
                    doneFn(this.responseText);
                    console.log(this.responseText);
                }
            };
            xhr.open("GET", rootApi + "/arkivstruktur/arkiv/", false);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.send();
            expect(doneFn).toHaveBeenCalled();
            expect(xhr.status).toBe(200);
            var xhr2 = new XMLHttpRequest();
            var postmsg = '';
            xhr2.onreadystatechange = function (arguments) {
                if (this.readyState == this.DONE) {
                    doneFn(this.responseText);
                    console.log(this.responseText);
                    postmsg = this.responseText;
                }
            };

        });


        it("søk etter top 3 arkiv", function () {

            var doneFn = jasmine.createSpy("success");
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function (arguments) {
                if (this.readyState == this.DONE) {
                    doneFn(this.responseText);
                    console.log(this.responseText);
                }
            };
            xhr.open("GET", rootApi + "/arkivstruktur/arkiv/?$top=3", false);
            
            
            xhr.setRequestHeader("Content-type", "application/json");
            
            xhr.send();
            expect(doneFn).toHaveBeenCalled();
            expect(xhr.status).toBe(200);
            var arkivListe = JSON.parse(xhr.responseText);
            expect(arkivListe.length).toBe(3);
            var xhr2 = new XMLHttpRequest();
            var postmsg = '';
            xhr2.onreadystatechange = function (arguments) {
                if (this.readyState == this.DONE) {
                    doneFn(this.responseText);
                    console.log(this.responseText);
                    postmsg = this.responseText;
                }
            };

        });


        it("søk etter top 5 arkiv", function () {

            var doneFn = jasmine.createSpy("success");
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function (arguments) {
                if (this.readyState == this.DONE) {
                    doneFn(this.responseText);
                    console.log(this.responseText);
                }
            };
            xhr.open("GET", rootApi + "/arkivstruktur/arkiv/?$top=5", false);


            xhr.setRequestHeader("Content-type", "application/json");

            xhr.send();
            expect(doneFn).toHaveBeenCalled();
            expect(xhr.status).toBe(200);
            var arkivListe = JSON.parse(xhr.responseText);
            expect(arkivListe.length).toBe(5);
            var xhr2 = new XMLHttpRequest();
            var postmsg = '';
            xhr2.onreadystatechange = function (arguments) {
                if (this.readyState == this.DONE) {
                    doneFn(this.responseText);
                    console.log(this.responseText);
                    postmsg = this.responseText;
                }
            };

        });



        it("søk etter arkiv med tittel filter 'arkiv 234'", function () {

            var doneFn = jasmine.createSpy("success");
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function (arguments) {
                if (this.readyState == this.DONE) {
                    doneFn(this.responseText);
                    console.log(this.responseText);
                }
            };
            xhr.open("GET", rootApi + "/arkivstruktur/arkiv/?$filter=tittel eq 'arkiv 234'", false);


            xhr.setRequestHeader("Content-type", "application/json");

            xhr.send();
            expect(doneFn).toHaveBeenCalled();
            expect(xhr.status).toBe(200);
            var arkivListe = JSON.parse(xhr.responseText);
            for (var i = 0; i < arkivListe.length; i++) {
                console.log("\n\n nummer " + i + " i lista er " + arkivListe[i] + "\n\n");
                expect(arkivListe[i].tittel).toContain("arkiv 234");
                
            };
            var xhr2 = new XMLHttpRequest();
            var postmsg = '';
            xhr2.onreadystatechange = function (arguments) {
                if (this.readyState == this.DONE) {
                    doneFn(this.responseText);
                    console.log(this.responseText);
                    postmsg = this.responseText;
                }
            };

        });



        it("registrere registrering", function () {
            var doneFn = jasmine.createSpy("success_get");
            var doneFn2 = jasmine.createSpy("success_post");
            var xhr = new XMLHttpRequest();
            var postmsg = '';
            xhr.onreadystatechange = function (arguments) {
                if (this.readyState == this.DONE) {
                    doneFn(this.responseText);
                    console.log(this.responseText);
                    postmsg = this.responseText;
                }
            };
            xhr.open("GET", rootApi + "/arkivstruktur/ny-registrering", false);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.send();
            expect(doneFn).toHaveBeenCalled();
            var xhr2 = new XMLHttpRequest();
            xhr2.onreadystatechange = function (arguments) {
                if (this.readyState == this.DONE) {
                    doneFn2(this.responseText);
                    console.log(this.responseText);
                }
            };
            xhr2.open("POST", rootApi + "/arkivstruktur/ny-registrering", false)
            xhr2.setRequestHeader("Content-type", "application/json");
            xhr2.send(postmsg);
            expect(doneFn2).toHaveBeenCalled();
            expect(xhr2.status).toBe(201);
        });


    });

}