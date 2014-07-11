
    describe("Nivå 2c - Administrasjon uten valgfrie krav", function () {
        var rootApi;

        beforeEach(function () {
            rootApi = document.getElementById("rootApiUrl").value;
        });

        it(" - sjekke om støtter administrasjon", function () {
            var doneFn = jasmine.createSpy("success");
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function (arguments) {
                if (this.readyState == this.DONE) {
                    doneFn(this.responseText);
                }
            };
            xhr.open("GET", rootApi, false);
            xhr.send();
            expect(doneFn).toHaveBeenCalled();
            var href = finnLinkRel("http://rel.kxml.no/noark5/v4/api/administrasjon", xhr.responseText);
            expect(href).toBeDefined();
            expect(href.length).toBeGreaterThan(0);

        });


        it(" - registrere arkiv (5.2.9)", function () {
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

        it(" - endre dato for arkiv", function () {
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
        it(" - endre opprettetdato for arkiv (5.2.6, 5.2.7)", function () {
            //forventer feil
            expect(true).toBe(false);
        });
        it(" - endre avsluttetdato for arkiv (5.2.8)", function () {
            //forventer feil
            expect(true).toBe(false);
        });

        it(" - registrere arkivdel (5.2.20, 5.2.21, 5.2.23)", function () {
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
            //Skal inneholde status og startdato og om dokumenter er fysiske eller elekt.
        });
        it(" - registrere arkivdel på avsluttet arkiv (5.2.4)", function () {
            //forventer feil
            expect(true).toBe(false);
        });
        it(" - slette arkiv (5.2.5)", function () {
            //forventer logging i retur
            expect(true).toBe(false);
        });
        it(" - slette arkivdel (5.2.17)", function () {
            //forventer logging i retur
            expect(true).toBe(false);
        });
        it(" - avslutte arkivdel (5.2.22)", function () {
            //forvente avsluttet dato
            expect(true).toBe(false);
        });
        it(" - registrere klassifikasjonssystem (5.3.8, 5.3.9,5.3.10,5.3.11)", function () {
            //forvente ..
            expect(true).toBe(false);
        });
        it(" - oppdatere klassifikasjonssystem ()", function () {
            //forvente ..
            expect(true).toBe(false);
        });
        it(" - slette klassifikasjonssystem ()", function () {
            //forvente logging
            expect(true).toBe(false);
        });
    });

    describe("Nivå 2.1c - Administrasjon med valgfrie krav", function () {
        var rootApi;

        beforeEach(function () {
            rootApi = document.getElementById("rootApiUrl").value;
        });
        it(" - registrere underarkiv (5.2.10,5.2.11,5.2.12)", function () {
            expect(true).toBe(false);
        });
    });