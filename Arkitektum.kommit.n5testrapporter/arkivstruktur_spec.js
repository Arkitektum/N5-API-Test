/// <reference path="Scripts/jasmine.js"/>
/// <reference path="lib/superagent/superagent.js"/>

//var request = require('lib/superagent');
//var rootApi = "http://localhost:49708/api";


function jsonToConsole(data){
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

    describe("Nivå 1 - Arkivstruktur forenklet uten valgfrie krav", function () {

        it("søk etter arkiv", function () {

            var doneFn = jasmine.createSpy("success");
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function (arguments) {
                if (this.readyState == this.DONE) {
                    doneFn(this.responseText);
                    jsonToConsole(this.responseText);
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
                    jsonToConsole(this.responseText);
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
                    jsonToConsole(this.responseText);
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
                    jsonToConsole(this.responseText);
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
                    jsonToConsole(this.responseText);
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
                    jsonToConsole(this.responseText);
                    postmsg = this.responseText;
                }
            };

        });



        it("eksakt søk etter arkiv med tittel filter 'arkiv 234'", function () {

            var doneFn = jasmine.createSpy("success");
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function (arguments) {
                if (this.readyState == this.DONE) {
                    doneFn(this.responseText);
                    jsonToConsole(this.responseText);
                }
            };
            xhr.open("GET", rootApi + "/arkivstruktur/arkiv/?$filter=tittel eq 'arkiv 234'", false);
            xhr.setRequestHeader("Content-type", "application/json");

            xhr.send();
            expect(doneFn).toHaveBeenCalled();
            expect(xhr.status).toBe(200);
            var arkivListe = JSON.parse(xhr.responseText);
            for (var i = 0; i < arkivListe.length; i++) {
                    expect(arkivListe[i].tittel).toBe("arkiv 234");
            };
            var xhr2 = new XMLHttpRequest();
            var postmsg = '';
            xhr2.onreadystatechange = function (arguments) {
                if (this.readyState == this.DONE) {
                    doneFn(this.responseText);
                    jsonToConsole(this.responseText);
                    postmsg = this.responseText;
                }
            };

        });


        it("fritekst søk etter arkiv med search 'test arkiv 0'", function () {


            var searchString = "test arkiv 0";
            var doneFn = jasmine.createSpy("success");
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function (arguments) {
                if (this.readyState == this.DONE) {
                    doneFn(this.responseText);
                    jsonToConsole(this.responseText);
                }
            };
            xhr.open("GET", rootApi + "/arkivstruktur/arkiv?$search='" + searchString + "'", false);


            xhr.setRequestHeader("Content-type", "application/json");

            xhr.send();
            expect(doneFn).toHaveBeenCalled();
            expect(xhr.status).toBe(200);
            var arkivListe = JSON.parse(xhr.responseText);
            for (var i = 0; i < arkivListe.length; i++) {

                var resultat = false;
                var tittel = '';
                var beskrivelse = '';

                if (arkivListe[i].tittel != null)
                    tittel = arkivListe[i].tittel;

                if (arkivListe[i].beskrivelse != null)
                    beskrivelse = arkivListe[i].beskrivelse;

                if (tittel.indexOf(searchString) > -1 || beskrivelse.indexOf(searchString) > -1 ) {
                    resultat = true;
                }
                expect(resultat).toBe(true);
            };

            var xhr2 = new XMLHttpRequest();
            var postmsg = '';
            xhr2.onreadystatechange = function (arguments) {
                if (this.readyState == this.DONE) {
                    doneFn(this.responseText);
                    jsonToConsole(this.responseText);
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
                    jsonToConsole(this.responseText);
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
                    jsonToConsole(this.responseText);
                }
            };
            xhr2.open("POST", rootApi + "/arkivstruktur/ny-registrering", false)
            xhr2.setRequestHeader("Content-type", "application/json");
            xhr2.send(postmsg);
            expect(doneFn2).toHaveBeenCalled();
            expect(xhr2.status).toBe(201);
        });


        it("oppdatere registrering", function () {
            var doneFn = jasmine.createSpy("success");
            var doneFn2 = jasmine.createSpy("success_post");
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function (arguments) {
                if (this.readyState == this.DONE) {
                    doneFn(this.responseText);
                    jsonToConsole(this.responseText);
                }
            };
            xhr.open("GET", rootApi + "/arkivstruktur/registrering/12345", false);
            xhr.setRequestHeader("Content-type", "application/json");

            xhr.send();
            expect(doneFn).toHaveBeenCalled();
            expect(xhr.status).toBe(200);

            var arkivListe = JSON.parse(xhr.responseText);
                    expect(arkivListe.systemID).toBe("12345");
                    arkivListe.arkivertAv = ("Oppdatereren");
                    //oppdatertRegistrering += JSON.stringify(arkivListe[i]);
                var xhr2 = new XMLHttpRequest();
                var postmsg = '';
                xhr2.onreadystatechange = function (arguments) {
                    if (this.readyState == this.DONE) {
                        doneFn2(arkivListe);
                        jsonToConsole(JSON.stringify(arkivListe));
                    }
                };

                xhr2.open("POST", rootApi + "/arkivstruktur/registrering/12345", false)
                xhr2.setRequestHeader("Content-type", "application/json");
                xhr2.send(JSON.stringify(arkivListe));
                expect(doneFn2).toHaveBeenCalled();
                expect(xhr2.status).toBe(200);
            
        });

        

        it("endre dato for arkiv", function () {
            var systemID = '12345';
            var doneFn = jasmine.createSpy("success");
            var doneFn2 = jasmine.createSpy("success_post");
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function (arguments) {
                if (this.readyState == this.DONE) {
                    doneFn(this.responseText);
                    jsonToConsole(this.responseText);
                }
            };
            xhr.open("GET", rootApi + "/arkivstruktur/arkiv/" + systemID, false);
            xhr.setRequestHeader("Content-type", "application/json");

            xhr.send();
            expect(doneFn).toHaveBeenCalled();
            expect(xhr.status).toBe(200);

            var arkivListe = JSON.parse(xhr.responseText);
            if (arkivListe != null) {
                    expect(arkivListe.systemID).toBe(systemID);
                    arkivListe.opprettetDatoSpecified = true;
                    arkivListe.beskrivelse = "testbeskrivelse";
                    arkivListe.opprettetDato = "10.05.13";
                var xhr2 = new XMLHttpRequest();
                xhr2.onreadystatechange = function (arguments) {
                    if (this.readyState == this.DONE) {
                        doneFn2(arkivListe);
                        jsonToConsole(JSON.stringify(arkivListe));
                        //postmsg = oppdatertRegistrering;
                    }
                };

                xhr2.open("POST", rootApi + "/arkivstruktur/arkiv/" + systemID, false)
                xhr2.setRequestHeader("Content-type", "application/json");
                xhr2.send(JSON.stringify(arkivListe));
                expect(doneFn2).toHaveBeenCalled();
                expect(xhr2.status).toBe(200);
            }
        });
        

    });

}