var test = {
    munchkin_id: "946-FDM-410",
    client_id: "9c07b886-fad1-443c-ab3e-c2be573c2521",
    client_secret: "tkI6eXTGjzWifsJRL8RugYE0DNf83HV9",
    grant_type: "client_credentials"
}
var prod = {
    munchkin_id: "058-NIT-467",
    client_id: "50966f4b-ce8b-425b-b9c1-282676733428",
    client_secret: "AfO3Ck7BETd5JGsikenPeimpj9fdfgEY",
    grant_type: "client_credentials"
}

module.exports = function(mode) {
    // mode=production npm start
    if (process.env.mode === "production" || mode === "production") { 
        return prod;
    } else {
        return test;
    }
}