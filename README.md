# ThatWordGame
ThatWordGame done by team 4 for the Security LevelUp

Main website: https://www.tomsportfolio.co.za/home/
ID server: https://www.id.tomsportfolio.co.za/

WELCOME (This App Possibly Works...No Guarentees)

YOU WILL HAVE TO RUN THE Identity Server as a separate instance from main (It be like that fr)
Navigate to feature/identity_server and Instructions Below...

--
#How To Start The Main Website
Once you have cloned and opened the folder->

1. Set Up DB
2. -> ..\ThatWordGame\db\scripts
3. -> Run both scripts in you DBMS of choice

RDS_HOSTNAME=* (Your server)
RDS_PORT=1433
RDS_USERNAME=*
RDS_PASSWORD=*
NODE_ENV=development
PORT=* (THIS PORT CAN BE SET TO ANYTHNG AS LONG AS IT IS NOT THE SAME AS THE ID SERVER)
GOOGLE_CLIENT_ID="949155605311-ls16k86anjqp0kjqc74inen3dr0bf351.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="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"
GITHUB_CLIENT_ID="6916a76f653c7d5d064b"
GITHUB_CLIENT_SECRET="cbcd9a2e05f2b4326aba5e6fec74f93c7731e6e1"
ID_SERVER_URI=https://id.tomsportfolio.co.za/
ID_SERVER_LOGIN=login
ID_SERVER_REGISTER=ID_SERVER_REGISTER
ID_SERVER_REFRESH=token
ID_SERVER_LOGOUT=logout
ID_SERVER_VALID=valid
ACCESS_TOKEN=*
REFRESH_TOKEN=*

3. Set the Access and Refresh Tokens Secrets for the JWT

To Do This:
1. Open up a terminal
2. Type Node and hit Enter
3. run this command 'require('crypto').randomBytes(64).toString('hex')'

This will return a random hex string used to sign and verify the JWT
Generate a new hex string for each variable (just run the command twice..) E.G. 17fd5b89bed3cd19e166c4b5fee65531411ea4921620b91cc2186c895c69ffe3eb257da643123cd08a160b06c8f19765418afc9fa909b86cfbb9a51ecccf09dc
REFRESH_TOKEN=*
ACCESS_TOKEN=*


--
# How To Start The ID Server
Once you have opened up the project folder ->

1. Set Up The DB
-> In the /Database folder there is a script IdentityDB.sql to run in order to create the USER table

2.Set the environment variables as below:
-> SERVER NAME (e.g. NAME/SQLEXPRESS ) => RDS_HOSTNAME=*
RDS_USERNAME=*
RDS_PASSWORD=*
RDS_PORT=* (1433 IN MOST CASES)

3. Set the Access and Refresh Tokens Secrets for the JWT

To Do This:
1. Open up a terminal
2. Type Node and hit Enter
3. run this command 'require('crypto').randomBytes(64).toString('hex')'

This will return a random hex string used to sign and verify the JWT
Generate a new hex string for each variable (just run the command twice..)
REFRESH_TOKEN=*
ACCESS_TOKEN=*

3. Run 'npm i' to install the required packaged

4. Start the server by runnin npm run devStartAuth
