

var arkivstrukturUri;


    describe("Nivå 0 - Basistester", function () {
        var rootApi;

        beforeEach(function () {
            rootApi = document.getElementById("rootApiUrl").value;
        });

        it(" - CORS Cross-origin resource sharing", function () {
            var doneFn = jasmine.createSpy("success");
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function (arguments) {
                if (this.readyState == this.DONE) {
                    doneFn(this.responseText);
                }
            };
            xhr.open("GET", rootApi, false);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.send();
            expect(doneFn).toHaveBeenCalled();
            expect(xhr.status).toBe(200);
        });

        it(" - krav om autentisering", function () {
            expect(true).toBe(false);
        });
        
        it(" - formatstøtte - json", function () {
            var doneFn = jasmine.createSpy("success");
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function (arguments) {
                if (this.readyState == this.DONE) {
                    doneFn(this.responseText);
                }
            };
            xhr.open("GET", rootApi, false);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.send();
            expect(doneFn).toHaveBeenCalled();
            expect(xhr.status).toBe(200);
            // application/vnd.noark5-v4+json og application/vnd.noark5-v4+xml
        });
        it(" - formatstøtte - xml", function () {
            var doneFn = jasmine.createSpy("success");
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function (arguments) {
                if (this.readyState == this.DONE) {
                    doneFn(this.responseText);
                }
            };
            xhr.open("GET", rootApi, false);
            xhr.setRequestHeader("Content-type", "application/xml");
            xhr.send();
            expect(doneFn).toHaveBeenCalled();
            expect(xhr.status).toBe(200);
            //TODO application/vnd.noark5-v4+json og application/vnd.noark5-v4+xml
            //TODO kontroll mot xsd skjema
        });
    });

    describe("Nivå 1 - Arkivstruktur forenklet(5.1.3) uten valgfrie krav", function () {
        var rootApi;
        var arkivSystemID;

        beforeEach(function () {
            rootApi = document.getElementById("rootApiUrl").value;
            arkivSystemID = document.getElementById("arkivId").value;
        });
        it(" - sjekk om støtter arkivstruktur", function () {
            var doneFn = jasmine.createSpy("success");
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function (arguments) {
                if (this.readyState == this.DONE) {
                    doneFn(this.responseText);
                }
            };
            xhr.open("GET", rootApi, false);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.send();
            expect(doneFn).toHaveBeenCalled();
            var href = finnLinkRel("http://rel.kxml.no/noark5/v4/api/arkivstruktur", xhr.responseText);
            expect(href).toBeDefined();
            expect(href.length).toBeGreaterThan(0);
            arkivstrukturUri = href;
        });

        it(" - søk etter arkiv (5.1.4, )", function () {

            var doneFn = jasmine.createSpy("success");

            var link = getLinkressurs(arkivstrukturUri, "http://rel.kxml.no/noark5/v4/api/arkivstruktur/arkiv");
            link = link.replace("{?$filter&$orderby&$top&$skip&$search}", "?$filter=systemID eq '123456789'");
                        
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function (arguments) {
                if (this.readyState == this.DONE) {
                    doneFn(this.responseText);
                }
            };
            xhr.open("GET", link, false);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.send();
            expect(doneFn).toHaveBeenCalled();
            expect(xhr.status).toBe(200);
            var arkivListe = JSON.parse(xhr.responseText);
            expect(arkivListe.length).toBe(1);

        });


        it(" - søk etter top 3 arkiv", function () {
            var doneFn = jasmine.createSpy("success");
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function (arguments) {
                if (this.readyState == this.DONE) {
                    doneFn(this.responseText);
                }
            };
            xhr.open("GET", rootApi + "/arkivstruktur/arkiv/?$top=3", false);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.send();
            expect(doneFn).toHaveBeenCalled();
            expect(xhr.status).toBe(200);
            var arkivListe = JSON.parse(xhr.responseText);
            expect(arkivListe.length).toBe(3);
        });


        it(" - søk etter top 5 arkiv", function () {
            var doneFn = jasmine.createSpy("success");
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function (arguments) {
                if (this.readyState == this.DONE) {
                    doneFn(this.responseText);
                }
            };
            xhr.open("GET", rootApi + "/arkivstruktur/arkiv/?$top=5", false);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.send();
            expect(doneFn).toHaveBeenCalled();
            expect(xhr.status).toBe(200);
            var arkivListe = JSON.parse(xhr.responseText);
            expect(arkivListe.length).toBe(5);
        });



        it(" - eksakt søk etter arkiv med tittel filter 'arkiv 234' (5.9.1)", function () {

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
            }

        });


        it(" - fritekst søk etter arkiv med search 'test' (5.9.6)", function () {
            var searchString = "test";
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
                //Sjekker at tittel eller beskrivelse er indeksert
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
            }

        });

        it(" - søk etter arkivdel (5.1.4)", function () {
            var doneFn = jasmine.createSpy("success");
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function (arguments) {
                if (this.readyState == this.DONE) {
                    doneFn(this.responseText);
                    jsonToConsole(this.responseText);
                }
            };
            xhr.open("GET", rootApi + "/arkivstruktur/arkivdel/?$filter=tittel eq 'arkiv 234'", false);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.send();
            expect(doneFn).toHaveBeenCalled();
            expect(xhr.status).toBe(200);
            var arkivListe = JSON.parse(xhr.responseText);
            for (var i = 0; i < arkivListe.length; i++) {
                expect(arkivListe[i].tittel).toBe("arkiv 234");
            }
        });
        it(" - søk etter arkivskaper (5.1.4)", function () {
            expect(true).toBe(false);
        });
        it(" - søk etter registrering (5.1.4)", function () {
            //expect(true).toBe(false);
            var doneFn = jasmine.createSpy("success");
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function (arguments) {
                if (this.readyState == this.DONE) {
                    doneFn(this.responseText);
                }
            };
            xhr.open("GET", rootApi + "/arkivstruktur/registrering/", false);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.send();
            expect(doneFn).toHaveBeenCalled();
            expect(xhr.status).toBe(200);
        });
        it(" - søk etter registrering mellom datoer (5.9.4)", function () {
            var doneFn = jasmine.createSpy("success");
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function (arguments) {
                if (this.readyState == this.DONE) {
                    doneFn(this.responseText);
                    jsonToConsole(this.responseText);
                }
            };
            xhr.open("GET", rootApi + "/arkivstruktur/registrering/?$StartTime eq mindatetime(01.04.14) and EndTime eq maxdatetime(07.04.14)", false);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.send();
            expect(doneFn).toHaveBeenCalled();
            expect(xhr.status).toBe(200);
            var resultat = false;
            var arkivListe = JSON.parse(xhr.responseText);
            for (var i = 0; i < arkivListe.length; i++) {
                resultat  = false;
                if (arkivListe[i].oppdatertDato > Date('01.04.14') && arkivListe[i].oppdatertDato < Date('07.04.14')){
                    resultat = true;
                }
                expect(resultat).toBe(true);
            }
        });
        it(" - søk etter registrering før dato (5.9.5)", function () {
            var doneFn = jasmine.createSpy("success");
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function (arguments) {
                if (this.readyState == this.DONE) {
                    doneFn(this.responseText);
                    jsonToConsole(this.responseText);
                }
            };
            xhr.open("GET", rootApi + "/arkivstruktur/registrering/?$EndTime eq maxdatetime(07.04.14)", false);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.send();
            expect(doneFn).toHaveBeenCalled();
            expect(xhr.status).toBe(200);
            var resultat = false;
            var arkivListe = JSON.parse(xhr.responseText);
            for (var i = 0; i < arkivListe.length; i++) {
                resultat = false;
                if (arkivListe[i].oppdatertDato <= Date('07.04.14')) {
                    resultat = true;
                }
                expect(resultat).toBe(true);
            }
        });
        it(" - søk etter registrering etter dato (5.9.6)", function () {
            var doneFn = jasmine.createSpy("success");
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function (arguments) {
                if (this.readyState == this.DONE) {
                    doneFn(this.responseText);
                    jsonToConsole(this.responseText);
                }
            };
            xhr.open("GET", rootApi + "/arkivstruktur/registrering/?$StartTime eq mindatetime(01.04.14)", false);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.send();
            expect(doneFn).toHaveBeenCalled();
            expect(xhr.status).toBe(200);
            var resultat = false;
            var arkivListe = JSON.parse(xhr.responseText);
            for (var i = 0; i < arkivListe.length; i++) {
                resultat = false;
                if (arkivListe[i].oppdatertDato > Date('01.04.14')) {
                    resultat = true;
                }
                //expect(resultat).toBe(true);
                expect(arkivListe[i].oppdatertDato).toBeGreaterThan(Date('01.04.14'));
            }
        });
        it(" - søk etter dokumentbeskrivelse (5.1.4)", function () {
            expect(true).toBe(false);
        });
        it(" - søk etter dokumentobjekt (5.1.4, 5.9.8, 5.9.9)", function () {
            expect(true).toBe(false);
        });
        it(" - fritekstsøk etter dokumentobjekt + filinnhold (5.9.10)", function () {
            expect(true).toBe(false);
        });
        it(" - søk etter registrering uten tilgang (5.9.11)", function () {
            expect(true).toBe(false);
            //skal få innsyn med bruker x
            //skal ikke få innsyn med bruker y
        });
        it(" - søk etter registrering med skjermet innhold (5.9.12)", function () {
            expect(true).toBe(false);
            //skal få innsyn med bruker x
            //skal ikke få innsyn med bruker y
        });
        it(" - søk etter registrering med store/små bokstaver (5.9.13)", function () {
            expect(true).toBe(false);
            //skal håndteres likt
        });

        it(" - registrere registrering (5.1.4)", function () {
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
            //
            xhr2.send(postmsg); //Bruker initiert objekt fra server som input til registrering
            expect(doneFn2).toHaveBeenCalled();
            expect(xhr2.status).toBe(201);
            //Sjekke at systemid, opprettetAv og opprettetDato er registrert

        });
        it(" - registrere registrering på mappe, klasse og arkivdel (Krav 5.5.2, 5.5.3, 5.5.4)", function () {
            //Forventer at den skal feile når flere referanser legges til
            expect(true).toBe(false);
        });

        it(" - oppdatere registrering (5.1.4)", function () {
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

            var registrering = JSON.parse(xhr.responseText);
            expect(registrering.systemID).toBe("12345");
            registrering.arkivertAv = "Oppdatereren";

                var xhr2 = new XMLHttpRequest();
                var postmsg = '';
                xhr2.onreadystatechange = function (arguments) {
                    if (this.readyState == this.DONE) {
                        doneFn2(arkivListe);
                        jsonToConsole(JSON.stringify(registrering));
                    }
                };

                xhr2.open("POST", rootApi + "/arkivstruktur/registrering/12345", false)
                xhr2.setRequestHeader("Content-type", "application/json");
                xhr2.send(JSON.stringify(registrering));
                expect(doneFn2).toHaveBeenCalled();
                expect(xhr2.status).toBe(200);
            
        });
        it(" - utvide registrering til basisregistrering (5.5.6)", function () {
            expect(true).toBe(false);
        });
        it(" - oppdatere basisregistrering (5.1.4, 5.7.4)", function () {
            expect(true).toBe(false);
            //nøkkelord
        });
        it(" - oppdatere basisregistrering med merknad (5.7.18)", function () {
            expect(true).toBe(false);
        });
        it(" - registrere dokumentbeskrivelse (5.1.4, 5.6.2, 5.6.10)", function () {
            expect(true).toBe(false);
            //typer
            //uten elektronisk dok

        });
        it(" - oppdatere dokumentbeskrivelse (5.1.4)", function () {
            expect(true).toBe(false);
        });
        it(" - registrere dokumentobjekt (5.1.4, 5.6.9, 5.6.11)", function () {
            expect(true).toBe(false);
            //knytte til dokumentbeskrivelse
        });
        it(" - oppdatere dokumentobjekt (5.1.4)", function () {
            expect(true).toBe(false);
        });
        it(" - opplasting av fil", function () {
            expect(true).toBe(false);
        });
        it(" - ikke sletting av dokument (5.6.12)", function () {
            expect(true).toBe(false);
        });
        it(" - TODO skjerming", function () {
            expect(true).toBe(false);
        });


        it(" - registrere kassasjon på arkivdel (5.10.1, 5.10.8, 5.10.9, 5.10.10, 5.10.16, 5.10.17)", function () {
            expect(true).toBe(false);
        });
        it(" - oppdatere kassasjon på arkivdel (5.10.1, 5.10.8, 5.10.9, 5.10.10, 5.10.16, 5.10.17)", function () {
            expect(true).toBe(false);
        });
        it(" - registrere kassasjon på klasse (5.10.2, 5.10.6, , 5.10.7, 5.10.16, 5.10.17)", function () {
            expect(true).toBe(false);
        });
        it(" - oppdatere kassasjon på klasse (5.10.2, 5.10.6, 5.10.7, 5.10.16, 5.10.17)", function () {
            expect(true).toBe(false);
        });
        it(" - registrere kassasjon på mappe (5.10.3, 5.10.11, 5.10.12, 5.10.13, 5.10.15, 5.10.18)", function () {
            expect(true).toBe(false);
        });
        it(" - oppdatere kassasjon på mappe (5.10.3, 5.10.11, 5.10.12, 5.10.13, 5.10.18)", function () {
            expect(true).toBe(false);
        });
        it(" - registrere kassasjon på registrering (5.10.4, 5.10.11, 5.10.12, 5.10.13, 5.10.18)", function () {
            expect(true).toBe(false);
        });
        it(" - oppdatere kassasjon på registrering (5.10.4, 5.10.11, 5.10.12, 5.10.13, 5.10.18)", function () {
            expect(true).toBe(false);
        });
        it(" - registrere kassasjon på dokumentbeskrivelse (5.10.5, 5.10.7, 5.10.12, 5.10.13, 5.10.18)", function () {
            expect(true).toBe(false);
        });
        it(" - oppdatere kassasjon på dokumentbeskrivelse (5.10.5, 5.10.7, 5.10.12, 5.10.13, 5.10.18)", function () {
            expect(true).toBe(false);
        });
        

    });

    describe("Nivå 1.1 - Arkivstruktur med valgfrie krav", function () {
        var rootApi;

        beforeEach(function () {
            rootApi = document.getElementById("rootApiUrl").value;
        });
        it(" - søk etter klassifikasjonssystem", function () {
            expect(true).toBe(false);
        });
        it(" - søk etter klasse", function () {
            expect(true).toBe(false);
        });
        it(" - søk etter mapper", function () {
            expect(true).toBe(false);
        });
        it(" - registrere mappe (5.4.2, 5.4.3, 5.4.14)", function () {
            expect(true).toBe(false);
            //skal arkivdel, klasse
            //hvis klassifikasjonssystem på arkivdel så skal mappe ha klasse innenfor denne.

        });
        it(" - registrere undermappe (5.4.5, 5.4.19)", function () {
            expect(true).toBe(false);
        });
        it(" - oppdatere mappe (5.7.4)", function () {
            expect(true).toBe(false);
            //nøkkelord
        });
        it(" - oppdatere mappe med sakspart (5.4.18)", function () {
            expect(true).toBe(false);
            //ajourholde sakspart
        });
        it(" - oppdatere mappe med merknad (5.7.18)", function () {
            expect(true).toBe(false);
        });
        it(" - avslutte mappe", function () {
            expect(true).toBe(false);
        });
        it(" - registrere mappe med virksomhetsspesifikke metadata", function () {
            expect(true).toBe(false);
        });
        it(" - oppdater mappe med virksomhetsspesifikke metadata", function () {
            expect(true).toBe(false);
        });
        
        it(" - søk etter mapper med virksomhetsspesifikke metadata", function () {
            expect(true).toBe(false);
        });
        it(" - søk etter mapper med sakspart", function () {
            expect(true).toBe(false);
        });
        it(" - søk etter mapper med plan", function () {
            expect(true).toBe(false);
        });
        it(" - søk etter mapper med bygg", function () {
            expect(true).toBe(false);
        });
        it(" - søk etter mapper med eiendom (0..*)", function () {
            expect(true).toBe(false);
        });
        it(" - søk etter mapper med gradering (0..1)", function () {
            var doneFn = jasmine.createSpy("success");
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function (arguments) {
                if (this.readyState == this.DONE) {
                    doneFn(this.responseText);
                }
            };
            xhr.open("GET", rootApi + "/arkivstruktur/mappe/?$filter=gradering/graderingskode/kode eq 'B'", false);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.send();
            expect(doneFn).toHaveBeenCalled();
            expect(xhr.status).toBe(200);
            var resultatListe = JSON.parse(xhr.responseText);
            for (var i = 0; i < resultatListe.length; i++) {
                expect(resultatListe[i].gradering.graderingskode.kode).toBe("B");
            }
        });
        it(" - søk etter mapper med en merknad med merknadstype B (expand brukes) (0..*)", function () {
            var doneFn = jasmine.createSpy("success");
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function (arguments) {
                if (this.readyState == this.DONE) {
                    doneFn(this.responseText);
                }
            };
            xhr.open("GET", rootApi + "/arkivstruktur/mappe/?$expand=merknad&$filter=merknad/any(m: m/merknadstype/kode eq 'B')", false);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.send();
            expect(doneFn).toHaveBeenCalled();
            expect(xhr.status).toBe(200);
            var resultatListe = JSON.parse(xhr.responseText);
            for (var i = 0; i < resultatListe.length; i++) {
                for (var j = 0; j < resultatListe[i].merknad.length; j++) {
                    expect(resultatListe[i].merknad[j].merknadstype.kode).toBe("B");
                }
            }
        });
        it(" - søk etter mapper med posisjon", function () {
            expect(true).toBe(false);
        });
        it(" - søk etter mapper innenfor en arkivdel", function () {
            var doneFn = jasmine.createSpy("success");
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function (arguments) {
                if (this.readyState == this.DONE) {
                    doneFn(this.responseText);
                }
            };
            xhr.open("GET", rootApi + "/arkivstruktur/arkivdel/2/mappe/?$filter=tittel eq 'test'", false);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.send();
            expect(doneFn).toHaveBeenCalled();
            expect(xhr.status).toBe(200);
            var resultatListe = JSON.parse(xhr.responseText);
            for (var i = 0; i < resultatListe.length; i++) {
                expect(resultatListe[i].tittel).toContain("test");
            }
        });
        it(" - søk etter mapper innenfor en klasse", function () {
            expect(true).toBe(false);
        });
        it(" - registrere klasse (5.3.12,5.3.13?,5.3.16)", function () {
            expect(true).toBe(false);
        });
        it(" - oppdater klasse (5.7.4)", function () {
            expect(true).toBe(false);
            //nøkkelord
        });
        it(" - avslutt klasse (5.3.17)", function () {
            expect(true).toBe(false);
            //forvente logging og autorisert personale
        });
        it(" - flytt registrering til annen mappe", function () {
            expect(true).toBe(false);
        });
        it(" - registrere kryssreferanse (5.7.13, 5.7.14)", function () {
            expect(true).toBe(false);
            //mapper og basisregistreringer
            //klasser
        });
        it(" - oppdatere kryssreferanse (5.7.13, 5.7.14)", function () {
            expect(true).toBe(false);
        });
        it(" - slette kryssreferanse (5.7.13, 5.7.14)", function () {
            expect(true).toBe(false);
        });
    });

