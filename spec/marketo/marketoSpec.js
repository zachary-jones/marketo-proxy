var request = require('request');
var base_url = "http://localhost:3000/";

var posyBody = function () {
    return {
        "Landing_Page_URL__c": "http://s6.villanovau.com/",
        "Program_of_Interest__c": "a0361000008wRXLAA2",
        "W2L_CountryCode__c": "AX",
        "Highest_Level_of_Education__c": "RN (Diploma Nurse)",
        "FirstName": makeRandomString(),
        "LastName": makeRandomString(),
        "Phone": "5612223333",
        "Email": makeRandomEmail(),
        "Military_Relationship__c": "None",
        "Group_Opportunity__c": "0",
        "TCPA__c": "Granted",
        "University_Institution__c": "0016100000TWYsXAAX",
        "TCPA_Consent_ID__c": "a0g61000001p22OAAQ",
        "TCPA_Disclosure_Version_ID__c": "1",
        "TCPA_IP_Address__c": "192.168.200.124",
        "TCPA_Notice__c": "By completing this form, I consent to receiving calls and/or emails from BISK regarding educational services and programs. I understand calls may be generated using an automated technology. Consent is needed to contact you, but is not a requirement to purchase goods or services.",
        "TCPA_Date_Time_Consent__c": "6/20/2017, 2:41:15 PM",
        "Medium__c": "(none)",
        "Source__c": "(direct)",
        "mktoCampaign": "70161000001Cqz6AAC",
        "Count_of_Sessions__c": "1",
        "Count_of_Page_Views__c": "3",
        "LeadSource": "Website"
    };
};

var fakeEmailsGeneratedToDelete = [];

function makeRandomEmail() {
    var text = makeRandomString();
    text += text + "@test.com";
    return text;
}

function makeRandomString() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    for (var i = 0; i < 7; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

describe("Marketo forms tests: ", function () {
    it("getAllForms should succeed", function (done) {
        request.get(base_url + 'mkto/forms/getAllForms/', function (error, response, body) {
            expect(JSON.parse(body).success).toBeTruthy();
            done();
        });
    });
    it("getFormByName should succeed", function (done) {
        request.get(base_url + 'mkto/forms/getFormByName/' + encodeURI('Test_Learn More Form - FT'), function (error, response, body) {
            expect(JSON.parse(body).success).toBeTruthy();
            done();
        });
    });
    it("getFormById should succeed", function (done) {
        request.get(base_url + 'mkto/forms/getFormById/1021', function (error, response, body) {
            expect(JSON.parse(body).success).toBeTruthy();
            done();
        });
    });
});

describe("Marketo leads tests: ", function () {
    it("getLeadsBy Id should succeed", function (done) {
        request.get(base_url + 'mkto/leads/getLeadsBy/id/118907', function (error, response, body) {
            expect(JSON.parse(body).success).toBeTruthy();
            done();
        });
    });
    it("getLeadsBy Cookie should succeed", function (done) {
        request.get(base_url + 'mkto/leads/getLeadsBy/cookie/' + encodeURI('id:797-LMZ-692&token:_mch-localhost-1497565690091-94163'), function (error, response, body) {
            expect(JSON.parse(body).success).toBeTruthy();
            done();
        });
    });
    it("getLeadsBy Email should succeed", function (done) {
        request.get(base_url + 'mkto/leads/getLeadsBy/email/test@test.com', function (error, response, body) {
            expect(JSON.parse(body).success).toBeTruthy();
            done();
        });
    });
    it("upsertLead should succeed", function (done) {
        request.post({
            url: base_url + 'mkto/leads/upsertLead/',
            form: posyBody()
        }, function (error, response, body) {
            fakeEmailsGeneratedToDelete.push(JSON.parse(body).result[0].id);
            expect(JSON.parse(body).success).toBeTruthy();
            done();
        });
    });
    it("pushLead should succeed", function (done) {
        request.post({
            url: base_url + 'mkto/leads/upsertLead/',
            form: posyBody()
        }, function (error, response, body) {
            fakeEmailsGeneratedToDelete.push(JSON.parse(body).result[0].id);
            expect(JSON.parse(body).success).toBeTruthy();
            done();
        });
    });
    it("removeLead should succeed", function (done) {
        fakeEmailsGeneratedToDelete.forEach(function (id) {
            request.post({
                url: base_url + 'mkto/leads/removeLead/',
                form: {
                    "id": id
                }
            }, function (error, response, body) {
                expect(JSON.parse(body).success).toBeTruthy();
                done();
            });
        }, this);
    });
});

describe("Marketo fields tests: ", function () {
    it("getFormFieldsByFormId should succeed", function (done) {
        request.get(base_url + 'mkto/fields/getFormFieldsByFormId/1249', function (error, response, body) {
            expect(JSON.parse(body).success).toBeTruthy();
            done();
        });
    });
});

describe("Marketo lists tests: ", function () {
    it("getLists should succeed", function (done) {
        request.get(base_url + 'mkto/lists/getLists/', function (error, response, body) {
            expect(JSON.parse(body).success).toBeTruthy();
            done();
        });
    });
});

describe("Marketo customFields tests: ", function () {
    it("customFields should succeed", function (done) {
        request.get(base_url + 'mkto/customFields/getCustomFields/', function (error, response, body) {
            expect(JSON.parse(body).success).toBeTruthy();
            done();
        });
    });
});