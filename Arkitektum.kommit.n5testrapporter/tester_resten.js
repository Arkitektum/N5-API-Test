describe("Nivå 2d - Periodisering", function () {
    var rootApi;

    beforeEach(function () {
        rootApi = document.getElementById("rootApiUrl").value;
    });

    it(" - sjekke om støtter periodisering", function () {

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
        var href = finnLinkRel("http://rel.kxml.no/noark5/v4/api/periodisering", xhr.responseText);
        expect(href).toBeDefined();
        expect(href.length).toBeGreaterThan(0);

    });
    it(" - TODO", function () {
        expect(true).toBe(false);
    });
});

describe("Nivå 2e - Logging og sporing", function () {
    var rootApi;

    beforeEach(function () {
        rootApi = document.getElementById("rootApiUrl").value;
    });

    it(" - sjekke om støtter logging og sporing", function () {
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
        var href = finnLinkRel("http://rel.kxml.no/noark5/v4/api/loggingogsporing", xhr.responseText);
        expect(href).toBeDefined();
        expect(href.length).toBeGreaterThan(0);

    });
    it(" - TODO", function () {
        expect(true).toBe(false);
    });
});
describe("Nivå 2f - Rapporter", function () {
    var rootApi;

    beforeEach(function () {
        rootApi = document.getElementById("rootApiUrl").value;
    });

    it(" - sjekke om støtter rapporter", function () {

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
        var href = finnLinkRel("http://rel.kxml.no/noark5/v4/api/rapporter", xhr.responseText);
        expect(href).toBeDefined();
        expect(href.length).toBeGreaterThan(0);

    });
    it(" - oversikt over dokumenter til kassasjon (5.10.22)", function () {
        expect(true).toBe(false);
    });
    it(" - oversikt over dokumenter til ny vurdering til kassasjon (5.10.23)", function () {
        expect(true).toBe(false);
    });
    it(" - TODO", function () {
        expect(true).toBe(false);
    });
});