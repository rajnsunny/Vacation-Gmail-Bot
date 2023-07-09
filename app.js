const express = require('express');


const app = express();                                                                                      // Create Express App.

require('dotenv').config();

const path = require('path');
const {authenticate} = require("@google-cloud/local-auth");
const fs = require("fs").promises;

const {getUnrepliesMessage,sendReplytoEmail,createLabel} = require('./Controllers/gmailMethods')

const { google } = require("googleapis");


const PORT = process.env.PORT;                                                                              //PORT Number from ENV.


const SCOPES = [                                                                                            //SCOPES OR Access of gmail API.
    "https://www.googleapis.com/auth/gmail.readonly",
    "https://www.googleapis.com/auth/gmail.send",
    "https://www.googleapis.com/auth/gmail.labels",
    "https://mail.google.com/",
];

const LABEL_NAME = process.env.LABEL_NAME;                                                                  //Label Name



app.get("/", async (req,res) => {

    const auth = await authenticate({                                                                       
        keyfilePath: path.join(__dirname,"credentials.json"),
        scopes: SCOPES,
    });

    const gmail = google.gmail({version: "v1", auth});                                                      //Give access to the Gmail Scope Features through APIS.

    const response = await gmail.users.labels.list({
        userId: "me",
    });

    async function main(){
        const labelId = await createLabel(auth);
        console.log(`label: ${labelId}`);

        setInterval(async () => {
            const messages = await getUnrepliesMessage(auth);
            console.log(`No of unrepplied messages : ${messages.length}`)
            if(messages && messages.length > 0){
                for(const message of messages){
                    await sendReplytoEmail(auth,message,labelId);
                }
                    
            }
        }, Math.floor(Math.random() * (120 - 45 + 1) + 45)*1000);
    }

    main().catch(console.error());

res.status(200).send("Bot is Working properly and check for  the Mails.");


})


app.listen(PORT,() => {
    console.log(`Server running on PORT: ${PORT}`)
})