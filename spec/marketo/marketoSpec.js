var request = require('request');
var base_url = "http://localhost:3000/";

function makeRandomEmail()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    for( var i=0; i < 7; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    text += text + "@test.com";
    console.log(text)
    return text;
}

var fakeEmailsGeneratedToDelete = [];

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
        request.post({url: base_url + 'mkto/leads/upsertLead/', form: {"Program_of_Interest__c":"a0361000008wRTWAA2","firstName":"test","lastName":"test","email": makeRandomEmail(),"phone":"5612223333","mktoCampaign":1234567890}}, function (error, response, body) {
            fakeEmailsGeneratedToDelete.push(JSON.parse(body).result[0].id);
            expect(JSON.parse(body).success).toBeTruthy();
            done();
        });
    });
    it("pushLead should succeed", function (done) {
        request.post({url: base_url + 'mkto/leads/upsertLead/', form: {"Program_of_Interest__c":"a0361000008wRTWAA2","firstName":"test","lastName":"test","email": makeRandomEmail(),"phone":"5612223333", "mktoCampaign":1234567890}}, function (error, response, body) {
            fakeEmailsGeneratedToDelete.push(JSON.parse(body).result[0].id);
            expect(JSON.parse(body).success).toBeTruthy();
            done();
        });
    });    
    it("removeLead should succeed", function (done) {
        fakeEmailsGeneratedToDelete.forEach(function(id) {
            request.post({url: base_url + 'mkto/leads/removeLead/', form: { "id": id }}, function (error, response, body) {
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