describe("Nivå 2b - Møte og utvalgsbehandling uten valgfrie krav", function () {
    var rootApi;

    beforeEach(function () {
        rootApi = document.getElementById("rootApiUrl").value;
    });

    it(" - sjekke om støtter møte og utvalgsbehandling", function () {
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
        var href = finnLinkRel("http://rel.kxml.no/noark5/v4/api/moeteogutvalgsbehandling", xhr.responseText);
        expect(href).toBeDefined();
        expect(href.length).toBeGreaterThan(0);

    });
    it(" - utvide mappe til møtemappe", function () {
        expect(true).toBe(false);
    });
});