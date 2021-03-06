/**
 * Config/Repository form Umbraco related methods and objects payload to Marketo
 * customSFNames.names will map the SFID value on umbraco forms and will be replaced with its coorosponding value
 * customSFNames.delete will be removed from payload
 * 
 * This is necessary as Marketo will reject leads that have unrecognized fields
 */

var customSFNames = {
    // inputs matching items in names array will be transformed from their salesforce value to their marketo value
    names: [
        ['00N6100000DVxVA','American_Dental_Association_Member__c'],
        ['00N6100000DVxV9','American_Dental_Association_Member_No__c'],
        ['00N6100000DVxVz','Interactive_Advertising_Bureau_Member__c'],
        ['00N6100000DVxVM','Business_Email__c'],
        ['00N4B000000HPiu',''],
        ['00N6100000DVxVu','Group_Opportunity__c'],
        ['00N6100000DVxVv','Highest_Level_of_Education__c'],
        ['00N6100000DVxW1','International_Student__c'],
        ['00N6100000DVxXC','Registered_Nurse__c'],
        ['00N6100000DVxVF','Best_Time_to_Contact__c'],
        ['00N6100000DVxVp','Enrollment_Timeframe__c'],
        ['00N6100000DVxWs','Occupation_Level__c'],
        ['00N6100000DVxWt','Online_Education_Experience__c'],
        ['00N6100000DVxVJ','Brief_Profile_Summary__c'],
        ['00N6100000DVxVf','Current_Community_College__c'],
        ['00N6100000DVxVR','Business_Phone__c'],
        ['00N6100000DVxVW','Concern__c'],
        ['00N6100000DVxXm','Time_Zone__c'],
        ['00N6100000DVxVE','Best_Day_to_Contact__c'],
        ['00N6100000DVxVU','Company_Website__c'],
        ['00N6100000DVxVT','Company_Address__c'],
        ['00N6100000DVxVO','Business_Fax__c'],
        ['00N6100000DVxVn','Employed__c'],
        ['00N6100000DVxWr','Number_of_Potential_Students__c'],
        ['00N6100000DVxWi','Military_Branch__c'],
        ['00N6100000DVxWn','Military_Status__c'],
        ['00N6100000DVxWo','Military_Tuition_Benefits__c'],
        ['00N6100000DVxWm','Military_Relationship__c'],
        ['00N6100000DVxWl','Military_Rank__c'],
        ['00N6100000DVxWk','Military_Pay_Grade__c'],
        ['00N6100000DVxVS','Certified_Teacher__c'],
        ['00N6100000DVxVS',''],
        ['00N6100000DVxXh','TCPA__c'],
        ['00N6100000DVxV6','Advertiser__c'],
        ['00N6100000DVxWP','Landing_Page_URL__c'],
        ['00N6100000DVxWU','Lead_Source_ID__c'],
        ['00N6100000DVxX6','Promotion_Code__c'],
        ['00N6100000DVxXc','TCPA_Consent_ID__c'],
        ['00N6100000DVxXd','TCPA_Date_Time_Consent__c'],
        ['00N6100000DVxXe','TCPA_Disclosure_Version_ID__c'],
        ['00N6100000DVxXf','TCPA_IP_Address__c'],
        ['00N6100000DVxVy','Interactive_Advertising_Bureau_Member_No__c'],
        ['00N6100000DVxY7','Workforce_Voucher__c'],
        ['00N6100000DVxVi','Daily_Internet_Access__c'],
        ['00N6100000DVxXg','TCPA_Notice__c'],
        ['00N6100000DVxXU','Student_Age__c'],
        ['00N6100000DVxVD','Back_Balance__c'],
        ['00N6100000DVxXY','Student_Loan_Default__c'],
        ['00N6100000DVxVV','Company__c'],
        ['00N6100000DVxY6','WTL_Ready_to_Register__c'],
        ['00N6100000DVxVd','Count_of_Sessions__c'],
        ['00N6100000DVxVc','Count_of_Page_Views__c'],
        ['00N6100000DVxXp','US_Citizen2__c'],
        ['00N6100000DVxVD','Back_Balance__c'],        
        ['00N6100000DVxY3','Visitor_ID__c'],
        ['00N6100000DVxWh','Medium__c'],
        ['00N6100000DVxXS','Source__c'],
        ['00N6100000DVxVY','Content__c'],
        ['00N6100000DVxXi','Term__c'],
        ['00N6100000F1VS0','W2L_CountryCode__c'],
        ['first_name','FirstName'],
        ['last_name','LastName'],
        ['email','Email'],
        ['phone','Phone'],
        ['lead_source','LeadSource'],
        ['Salesforce University ID','University_Institution__c'],
        ['Campaign_ID','mktoCampaign'],
        ['00N6100000DVxY4','Program_of_Interest__c'],
        ['00N6100000DVxX5','Program_of_Interest__c'],
        ['00N5B000000ONUC', 'W2L_CountryCode__c']
    ],
    // inputs matching items in remove array will be removed from request body to marketo
    remove: [
          'oid'
        , 'retURL'
        , 'W2L_Program_of_Interest__c'
        , 'Visitor_ID__c'
        , 'Content__c'
        , 'Term__c'
        , ''
        , 'Campaign'
        , 'areaOfStudy'
        , 'Program'
        , 'List'
        , 'dupcheck__dc3Web2Lead__c'
    ],
    // inputs matching items in the save array will not be in the request body to marketo, but will be persisted via the requestObject.save object to be used outside of the marketo request object
    save: [
        'retURL'
        , 'Program'
        , 'List'
    ]
};

module.exports = customSFNames;