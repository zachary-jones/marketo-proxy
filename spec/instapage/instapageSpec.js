var instapage = require('./../../repositories/instapage/instapage')();

describe("Instapage tests: ", function() {
  it("determineSalesforceId should return 1234567890", function() {
    instapage.determineSalesforceId('localhost', function(salesforceInstitutionId) {
        expect(salesforceInstitutionId).toBe("0016100000TWYsZAAX");
    });
  });
  it("getPrepopOptions should have standard options", function() {
    var standardOptions = instapage.standardOptions();
    expect(standardOptions).isNot === undefined || null;
    expect(standardOptions.countries).isNot === undefined || null;
    expect(standardOptions.militaryRelationship).isNot === undefined || null;
  });  
});