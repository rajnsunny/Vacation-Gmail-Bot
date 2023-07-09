# Vacation-Gmail-Bot
Welcome to the Vacation Gmail Bot repository! This repository contains a NodeJS script that automates email response for your Gmail account when you're on vacation.
A Bot that can send some messages on behalf of your presence for only unreplied mails.

## Required Features
- [x] Login With Google using Google API
- [x] Checks for only unseen or unresponded Mails
- [x] send mails using Gmail APIs.
- [x] After sending the Reply mails are tagged in the new label i.e. created before.
- [x] It checks for new mails as in interval of randomly in rangle of `45-120 secs`


## Local Setup

To set up the Vacation Gmail Bot locally, follow these steps:

1. Clone the repository to your local machine or download the source code as a ZIP file.
2. Install NodeJS environment on your machine if you haven't already. You can download it from the official NodeJS site: https://nodejs.org/en
3. Install the required dependencies by running the following command in the root directory of the repository:
   ```
   npm i
   ```
4. Setup The ENV file as below:
   ```
   PORT: <PORT_NUMBER>
   LABEL_NAME: <LABEL_NAME>
   MESSAGE: <MESSAGE>(`Hello I am on Vacation`)
   ```
6. Make sure you have enabled the Gmail API for your Google account. You can follow the instructions in the [Gmail API Quickstart guide](https://developers.google.com/gmail/api/guides) to enable the API and obtain the necessary credentials file.
5. Save the credentials file (`credentials.json`) in the root directory of the repository.

## Usage

To use the Vacation Gmail Bot, follow these steps:

1. Open a terminal or command prompt and navigate to the root directory of the repository.
2. Run the script using the following command:
   ```
   npm start
   ```
3. Open the localhost:${PORT}
4. It will automatically redirect to the Google Authentication. Login through Google and return on the Localhost.
5. After Login, the script is authenticated with your Gmail account and automatically set up auto email response.

## API Setup

If you want to integrate the Vacation Gmail Bot into your own application or system, you can use above docs and add the `credentials.json`.

### Scopes
1. https://www.googleapis.com/auth/gmail.readonly
2. https://www.googleapis.com/auth/gmail.send
3. https://www.googleapis.com/auth/gmail.labels
4. https://mail.google.com/

### Example

Here is an example of message:

```
`Content-Type: text/plain; charset="UTF-8\r\n` + 
`Content-Transfer-Encoding: 7bit\\r\n\r\n` +
MESSAGE                                      
```

## Improvements
1. `Start Date` and `End Date` can be used to automate overall system as Anyone can setup before going to the vacation.
2. Can be develop some GUI to process this auto-response system so that they can trace it.
3. They can get some notification when they got some mail from their company or by some specific domain. From: `EMAIL`  can be checked for urgent mails.


## License

The Vacation Gmail Bot is open-source and released under the [MIT License](LICENSE).

## Disclaimer

This script interacts with your Gmail account and modifies your email settings. Please use it responsibly and ensure that you have the necessary permissions to access and modify your Gmail account.

## Contact

If you have any questions or need further assistance, you can contact the repository owner at [rajnsunny](mailto:test.rajnsunny@gmail.com).
