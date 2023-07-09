const {google} = require('googleapis');
const LABEL_NAME = process.env.LABEL_NAME
const MESSAGE = process.env.MESSAGE

/**
 * From this Method you can fetch all the unseen and unresponded mails 
 * 
 * @param {*} auth stores the details of the authentication after the Login conpleted
 * @returns It returns all the mails i.e. remains unseen or unresponded
 */
const getUnrepliesMessage = async (auth) => {                                                                           

  const gmail = google.gmail({version: "v1", auth});
  const response = await gmail.users.messages.list({
      userId:"me",
      labelIds: ["INBOX"],
      q: "is:unread",
  });

  return response.data.messages || [];
}



/**
 * It send the auto reply to the unseen or unresponded mails.
 * After that It modifies the mails into the specified label or that label has developed for the vacation.
 * 
 * @param {*} auth stores the details of the authentication after the Login conpleted
 * @param {*} message particular mail i.e. remains unseen.
 */
const sendReplytoEmail = async (auth,message) => {
    const gmail = google.gmail({version: "v1", auth});
    const messageData = await gmail.users.messages.get({
        auth,
        userId: "me",
        id: message.id,
    });

    const email = messageData.data;

    const hasReplied = email.payload.headers.some(
        (header) => header.name === "In-Reply-To"
    );

    if(!hasReplied){
        const replyMesage = {
            userId: "me",
            resource: {
                raw: Buffer.from(
                    `To: ${
                        email.payload.headers.find(
                            (header) => header.name === "From"                                                            //Update the Email address from where it came
                            ).value
                        }\r\n` + 
                    `Subject: Re: ${
                        email.payload.headers.find(                                                                       //Update the Subject of the mail i.e. processing
                            (header) => header.name === "Subject"
                            ).value
                        }\r\n` +
                    `Content-Type: text/plain; charset="UTF-8\r\n` + 
                    `Content-Transfer-Encoding: 7bit\\r\n\r\n` +
                    MESSAGE                                                                                                //Message to be send in the auto respond
                    ).toString("base64"),
                },
            };}
            
        await gmail.users.messages.send(replyMesage);                                                                      //Send the reply message to the mail came from.                                                                       


        await gmail.users.messages.modify({                                                                                //Add Emails in the label After the Reply.
            auth,
            userId:"me",
            id: message.id,
            resource:{
                addLabelIds: [labelId],
                removeLabelIds: ["INBOX"],
            },
        });
    }


/**
 * 
 * @param {*} auth stores the details of the authentication after the Login conpleted
 * @returns It returns the Id of the new made Labels or check for the requried labels i.e. present or not
 */
const createLabel = async (auth) => {                                                                                                        //Create Label in the Gmail.
  const gmail = google.gmail({version: "v1", auth});

  try{
      const response = await gmail.users.labels.create({
          userId: "me",
          requestBody:{
              name: LABEL_NAME,
              labelListVisibility: "labelShow",
              messageListVisibility: "show",
          },
      });

      return response.data.id;
  }
  catch(error){
      if(error.code === 409){
          const response = await gmail.users.labels.list({
              userId: "me",
          });

          const label = response.data.labels.find((label) => label.name === LABEL_NAME);

          return label.id;
      }
      else throw error;
  }
}



module.exports = {getUnrepliesMessage,sendReplytoEmail,createLabel};
