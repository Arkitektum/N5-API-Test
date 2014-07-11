

    describe("Nivå 2a - Sakarkiv uten valgfrie krav", function () {
        var rootApi;

        beforeEach(function () {
            rootApi = document.getElementById("rootApiUrl").value;
        });

        it(" - sjekke om støtter sakarkiv", function () {
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
            var href = finnLinkRel("http://rel.kxml.no/noark5/v4/api/sakarkiv", xhr.responseText);
            expect(href).toBeDefined();
            expect(href.length).toBeGreaterThan(0);

        });
        it(" - utvide mappe til saksmappe", function () {
            expect(true).toBe(false);
        });
        it(" - registrere saksmappe (5.4.9)", function () {
            expect(true).toBe(false);
            //entydig identifisering
        });
        it(" - oppdatere saksmappe (5.4.16, 5.4.17)", function () {
            expect(true).toBe(false);
            //journalenhet
            //adm enhet
        });
        it(" - oppdatere saksmappe med sakspart (5.4.13, 5.4.18)", function () {
            expect(true).toBe(false);
        });
        it(" - oppdatere saksmappe med sekundærklassifikasjon (5.4.15)", function () {
            expect(true).toBe(false);
        });
        it(" - registrere inngående journalpost (5.5.8, 5.5.10, 5.5.11)", function () {
            expect(true).toBe(false);
            //Journalposttype
            //Saksansvar ?
            //minst en korrespondansepart
        });
        it(" - oppdatere journalpost med journalenhet og korrespondansepart (5.5.12, 5.5.14)", function () {
            expect(true).toBe(false);
        });
        it(" - finne restanser for saksbehandler", function () {
            expect(true).toBe(false);
        });
        it(" - avskrive med utgående journalpost (5.5.8, 5.5.10)", function () {
            expect(true).toBe(false);
        });
        it(" - utvide basisregistrering til journalpost (5.5.7)", function () {
            expect(true).toBe(false);
        });
    });
