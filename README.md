# autoben - MS Teams Automation Bot in Node.js 🤖
The project is based on microsoft's [Playwright](https://playwright.dev/) library. It is capable of logging into your microsoft Team's account and join the current appropriate meeting. You will will be able to control this bot using another user friendly **Telegram Bot** 🎮

## Project Setup 🔧
1. After downloading the project on local system open terminal in `autoben` folder.
2. Use command `npm i package.json` to install the requirements of the project.
3. Add your email, password and _syncTeams=true_ to **config.env.example** file without <ins>quotations</ins> and <ins>spaces</ins>.
4. Rename the **config.env.example** to **config.env**
5. Start the bot with the command `node index.js`.
6. To toggle `Headless Mode` check _startBot() function_ inside `index.js`


<h3 align="center" > <=== Under Development ⚠ ===> </h3>

## Project Status 🛠
1. Log into Account
2. Search for Teams/Channels
3. Scan the meetings in all the teams.
