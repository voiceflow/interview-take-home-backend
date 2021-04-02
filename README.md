# Voiceflow Interview API Project 💬

Welcome to Voiceflow's API Project!

Congrats on making it to this part of the interview process. 🥳 

The goal of this project is to create a local Node.js server that interfaces a Voiceflow project with another service.

It’ll help you gain a much better understanding of how conversational interfaces work and how Voiceflow plugs into that flow.  

## Setup 📦
Make sure you have [Node.js](https://nodejs.org/) and [yarn](https://yarnpkg.com/) on your computer.

Fork this repository.

| to install all dependencies (node_modules) :

```
yarn install
```

| to start the server on http://localhost:4000 :

```
yarn start
```

_if your http://localhost automatically resolves to https://localhost - try on incognito mode or a different browser_

Go on http://localhost:4000, you should see a chat window like this:

![Screen Shot 2021-04-01 at 10 15 55 PM](https://user-images.githubusercontent.com/5643574/113372982-d589e300-9337-11eb-9cf8-5ed825028169.png)

If you try typing something, it will always respond back with "hello world!" and "goodbye". This is because the backend hasn't been fully implemented.

# Overview ℹ️
Login/sign up for [Voiceflow Creator](https://creator.voiceflow.com), and build a simple `Custom Assistant` project. If you need inspiration you can check out the [Templates Workspace](https://creator.voiceflow.com/workspace/D8nag5Vko2).

In your `app.ts` we can see that there is a `app.post('/message', (req, res) => {` Express endpoint.

Read the Voiceflow Dialog Management API documentation:
> 🚨 **make sure to use the stateless API** ⚠️

https://raw.githack.com/voiceflow/general-runtime/master/backend/docs/index.html

Use the Voiceflow API to hook up your Voiceflow Project to the `POST /message` endpoint.

Whenever you send something on the frontend you will notice that it logs the `req.body` - containing a `message` and `userID`.
The `userID` is unique per tab. If you open a new tab of http://localhost:4000 you will get a different userID.

> Ensure that distinct users have distinct conversations

## Alternative Option 👑
Here we are using an HTML/CSS/Jquery frontend to display the conversation. Instead you can pick a conversational platform where people can converse back and forth with a bot, such as (but not limited to) - discord, slack, messenger, teams, alexa, google.

You can this platform as your frontend instead, and set up your backend to interface your Voiceflow project with this platform. Ensure that this platform has an API or SDK that allows a Node.js server to receive a webhook request, and reply back. 

If you are looking for something easy and quick to set up, try telegram:
[https://core.telegram.org/bots](https://core.telegram.org/bots) *(you need to install the app and message the "Botfather")*

These platforms will always send a unique userID/sessionID per request
> Ensure that distinct users have distinct conversations

# Tips 📝
* use Typescript proficiently
* use repeatable, scalable patterns
* make your backend structure go beyond just `app.ts`
* account for edge cases
* manage API keys securely

# Submission
Send the link to your working forked repository
