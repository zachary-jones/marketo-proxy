/**
 * Configuration settings for Marketo Rest service
 */

var test = {
    munchkin_id: "797-LMZ-692",
    client_id: "c384a082-3877-41bf-a4ff-b8466889c2d1",
    client_secret: "snIMtJAbrdvn6n6fM51m8rQxWf1ZqNaT",
    grant_type: "client_credentials",
    formids: {
        testFormId: 1464,
        juRnBsn: 1515
    }
}
var prod = {
    munchkin_id: "058-NIT-467",
    client_id: "50966f4b-ce8b-425b-b9c1-282676733428",
    client_secret: "AfO3Ck7BETd5JGsikenPeimpj9fdfgEY",
    grant_type: "client_credentials",
    formids: {
        testFormId: 1464,
        juRnBsn: 1515
    }
}

module.exports = function(isProduction) {
    if (isProduction) { 
        return {
            default: prod,
            other: test
        };
    } else {
        return {
            default: test,
            other: prod
        };
    }
}
