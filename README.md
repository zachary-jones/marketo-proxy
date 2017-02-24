# marketo-proxy
repository marketo related api calls and scripts  
also functions as cdn  

Dependencies:  
  Express  

npm install  
npm start  

Default branch: development  

Push/Sync:  
  Development: Code edits, local testing  
  Staging: QA/testing/approval  
    Staging should only be updated via merging from Development  
  Production: QA approved updates can only get to production via heroku promotion  
  
Env:  
  development: localhost:3000  
  staging: https://bisk-marketo-proxy-staging.herokuapp.com/  
  production: https://bisk-marketo-proxy.herokuapp.com/  
  
Heroku Pipeline: https://dashboard.heroku.com/pipelines/21cc4d8c-b74f-4928-9532-874756d2a0c9
