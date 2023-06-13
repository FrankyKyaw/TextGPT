# TextGPT
TextGPT is a chat application powered by GPT-3 model where users can join rooms and message each other. They can also use the suggestion tool which will automatically suggest a respose based on the last mesasge you received. It is built using React JS, Socket.io, Node.js and OpenAI API. 

## How to use it
- Enter your name and click a room number to join.
- Send a message to the room.
- Click on the three dot button to suggest a response.

## Setup and run
Download both the client and server folder to your local machine. In both of the directories, run the following code, 

Installing the dependencies
```
$ npm install
```
Run the frontend and backend 
```
$ npm start
```
Create a .env file inside the server directory and enter your OpenAi api key for the suggestion to work.

## Goals:
1. Speech to Text messaging:
   - Add an audio capture tool and use Whisper API to transcribe into text.

2. User Authentication:
   - Add a user authentication system to manage user accounts. This could involve:
     - Simple username/password authentication.
     - Incorporating OAuth to allow users to authenticate with existing accounts like Google.

3. Real-time Translation:
   - Incorporate translation API to translate messages in real-time. This would enable users from different language backgrounds to communicate more effectively with each other.


https://user-images.githubusercontent.com/73188846/227807051-0137e683-20c2-4cd4-9337-ca1e3e69a705.mov

