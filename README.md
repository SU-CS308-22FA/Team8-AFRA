[![coolafra](https://user-images.githubusercontent.com/75041108/209647017-31b7f620-eae6-44ff-8e24-dd957ddb5a7e.png)][1]
# AFRA = Automated Fixture and Referee Assignment
Click the logo to access our webpage!

## Note about SPRINT 1 -> you can make this repo public to see our wiki page. We wanted to keep our code private for the last sprint. Thanks for understanding :) 

## :soccer: What is AFRA ?
  AFRA is a web application that is designed to facilitate the burden of TFF by reducing human error in assigning fixtures and referees. Our vision was to include everything the users want from a football website and MORE for the best user experience. It also incorporates a user friendly design and has a simple structured interface. That way the users can find everything they need in a single efficient webpage!

## Why AFRA ?
  Our server has many different functionalities and we always improve it for the better. AFRA presents users with many useful features for many different actors such as: The admins, the users, referees and journalists. 

#### All users
- [x] AFRA has a login/register system that allows the users to get all the benefits.[#8](https://github.com/SU-CS308-22FA/Team8-AFRA/issues/8) [#9](https://github.com/SU-CS308-22FA/Team8-AFRA/issues/9)
- [x] Login is done via tokens so the users does not have to login each time. [#23](https://github.com/SU-CS308-22FA/Team8-AFRA/issues/23)
- [x] Users can display the matches in the selected season and week [#18](https://github.com/SU-CS308-22FA/Team8-AFRA/issues/18)
- [x] Users can display the standings of the teams [#13](https://github.com/SU-CS308-22FA/Team8-AFRA/issues/13)
- [x] Users can add comments to matches and express their opinions [#19](https://github.com/SU-CS308-22FA/Team8-AFRA/issues/19)
- [x] Users can sort the comments to see them the way they wish [#20](https://github.com/SU-CS308-22FA/Team8-AFRA/issues/20)
- [x] Each user has a profile that they can edit their information in [#10](https://github.com/SU-CS308-22FA/Team8-AFRA/issues/10) [#11](https://github.com/SU-CS308-22FA/Team8-AFRA/issues/11)
- [x] Users can select any match they want from upcoming matches and add it to their Google Calendar [#46](https://github.com/SU-CS308-22FA/Team8-AFRA/issues/46)
- [x] Users can display detailed referee information [#49](https://github.com/SU-CS308-22FA/Team8-AFRA/issues/49)
- [x] Users can verify their emails by typing the code they received in their email. [#55](https://github.com/SU-CS308-22FA/Team8-AFRA/issues/55)
- [x] Users can report the owners of comments that has bad words. [#54](https://github.com/SU-CS308-22FA/Team8-AFRA/issues/54)
- [x] Users can display detailed match information. [#53](https://github.com/SU-CS308-22FA/Team8-AFRA/issues/53)
- [x] Users can filter the comments in many different ways [#52](https://github.com/SU-CS308-22FA/Team8-AFRA/issues/52)
- [x] Users can reply to other comments [#56](https://github.com/SU-CS308-22FA/Team8-AFRA/issues/56)
- [x] Users can appeal for an unban so they can get a chance of redemption. [#76](https://github.com/SU-CS308-22FA/Team8-AFRA/issues/76)
- [x] Users can see the most asked questions with the FAQ page. [#112](https://github.com/SU-CS308-22FA/Team8-AFRA/issues/112)
- [x] Users can receive emails/notifications about the latest news from AFRA. [#84](https://github.com/SU-CS308-22FA/Team8-AFRA/issues/84)
- [x] Users can see the detailed information about the teams. [#82](https://github.com/SU-CS308-22FA/Team8-AFRA/issues/82)
- [x] Users can see details of top scorers, asists, yellow and red cards. [#79](https://github.com/SU-CS308-22FA/Team8-AFRA/issues/79)

#### Verified Professions
- [x] Referees and Journalists can apply for verifying their occupations [#15](https://github.com/SU-CS308-22FA/Team8-AFRA/issues/15)
- [x] Journalists can use the rating system for referees and have an influence on their assignments. [#81](https://github.com/SU-CS308-22FA/Team8-AFRA/issues/81)

#### The Admins
- [x] Admins can approve or reject the requests for occupation verification [#34](https://github.com/SU-CS308-22FA/Team8-AFRA/issues/34)
- [x] Admins can fetch the match data using an API thereby it is automatic [#16](https://github.com/SU-CS308-22FA/Team8-AFRA/issues/16)
- [x] Admins can see the report requests and ban the users which also sends a notification email to the banned user, banned users cannot login and if they are already logged in, they get kicked to main page. [#47](https://github.com/SU-CS308-22FA/Team8-AFRA/issues/47)
- [x] Admins have a dedicated page to unban the users. [#76](https://github.com/SU-CS308-22FA/Team8-AFRA/issues/76)
- [x] Admins can add and remove FAQ so that the users can reach them easily. [#112](https://github.com/SU-CS308-22FA/Team8-AFRA/issues/112)
- [x] Admins can manually edit the fixture in case of cancellation or a delay. [#80](https://github.com/SU-CS308-22FA/Team8-AFRA/issues/80)
- [x] Admins can send notifications/mails to the users with ease. [#84](https://github.com/SU-CS308-22FA/Team8-AFRA/issues/84)
- [ ] Admins can assign referees to the matches accordingly to their rank. [#78](https://github.com/SU-CS308-22FA/Team8-AFRA/issues/78)
- [ ] Admins can generate fixtures for the upcoming matches. [#83](https://github.com/SU-CS308-22FA/Team8-AFRA/issues/83)

## Repository and Code Structure

The project is made using MERN stack.
- [React JS](https://reactjs.org/)
- [Node JS](https://nodejs.org/) 
- [Express JS](https://expressjs.com/)
- [Mongo DB](https://www.mongodb.com/)
- [Bootstrap](http://getbootstrap.com/)

Here is our documentation
- The backlog => [`BACKLOG`](https://github.com/orgs/SU-CS308-22FA/projects/40)
- Code documentation => [`CODE DOCUMENTATION`](https://docs.google.com/document/d/1et_x-6B5ka5RlvvPosqfY9qxL8VcAu5Ao8sHZtJNW9M/edit?usp=sharing)
- API documentation => [`SWAGGER UI`](https://coolafra.herokuapp.com/doc)

### :card_index_dividers: File structure
##### `frontend` - Holds the client application
- ##### `public` - This holds all of our static files
- ##### `src`
    - ##### `actions` - This folder holds actions done for comments and users deals with axios requests and setting local storage
    - ##### `constants` - This folder holds the constants that the reducers use
    - ##### `reducers` - This folder holds the actions that switches depending on the state
    - ##### `components` - This folder holds all of the different components that will be a part of the different screens
    - ##### `screens` - These represent a unique page on the website i.e. Profile, Calendar, Standings... These are normal react components.
    - ##### `App.js` - This is what renders all of our browser routes and different views
    - ##### `index.js` - This is what renders the react app by rendering App.js
- ##### `package.json` - Defines npm behaviors and packages for the frontend
##### `backend` - Holds the server application
- ##### `config` - This holds our configuration files, like mongoDB configuration
- ##### `controllers` - These hold all of the callback functions that each route will call
- ##### `googledrive` - These hold all the callback functions for google drive api
- ##### `models` - This holds all of our data models for mongo
- ##### `routes` - This holds all of our HTTP to URL path associations for each unique url
- ##### `utils` - This holds all the utilities we use such as: generating tokens
- ##### `server.js` - Defines all the behaviours of the backend application
- ##### `swagger.js` - Holds the codes to generate API documentation
- ##### `swagger_output.json` - Holds the information generated by swagger
- ##### `key.json` - Holds the key information for Google Drive API
##### `package.json` - Defines npm behaviors and holds the scripts to start the application
##### `.gitignore` - Tells git which files to ignore
##### `README` - This file!

## How to use AFRA ?

### Using the deployed server
Simply click the link to our Heroku Deploy => https://coolafra.herokuapp.com
You can create an account and get all the benefits! 
Some Notes:
* Some pages are accesible without needing to Register
  - Such as displaying the standings, seeing the referee information and fixture information
* To benefit from other features you will need to have an account and following the community guidelines
  - Such as respecting the other users and not using mean words in the comment section, or you will get banned.
* After registering you need to verify your email adress in order to add comments
* If you are a user with a verified profession you can upload your licence in the verification page and wait for the admins to verify it.
* After these steps you can use all our features
  - Setting up your Calendar with the matches you wish, adding/liking comments to express your opinions...


## Set up instructions for developers
### :computer: For your local machine

1. Download an IDE
2. Clone the repo
   ```sh
   $ git clone https://github.com/SU-CS308-22FA/Team8-AFRA.git
   ```
3. Install NPM packages both for frontend and the backend
   ```sh
   $ npm install && cd frontend && npm install
   ```
4. Setting the env variables
   - `MONGO_URI` = the uri string for your database
   - `REACT_APP_URL` = backend url that axios requests are sent to
   - `REDIRECT_URL` = the frontent URL you will be redirected to after using OAuth2 by Google
   - `JWT_SECRET` = to generate and decode JWT
   - `X_RAPIDAPI_KEY` = key for the API for data collection
   - `GOOGLE_CLIENT_ID` = used for OAuth2, you can set it up from here [Google Console](https://console.cloud.google.com/getting-started)
   - `GOOGLE_CLIENT_SECRET` = same as above
   - `MAIL` = the email adress that will send the emails for the verification and notify when you are banned
   - `MAIL_PASS` = the dedicaded password for the above email (Important Note = Gmail no longer supports regular passwords, you need to set up an APP password)
5. To start the application
   ```sh
   $ npm run dev
   ```

### :rocket: For deploying the app to Heroku
The code has all the necessary scripts for heroku deployment. All thats necessary is to set the env variables (as described above) from your heroku app settings!

## :warning: How to report bugs? 
After finding a bug, here are some steps you should follow...

1. Write down what happened, and your thoughts on what you think caused it. 
2. Try to reproduce it by understanding what happened and when the bug happened. At this step documenting the action is key, you can do it by taking a video or screenshots. 
3. If it can be reproduced -> Simply explain what happens when it occurs and what triggers it.
4. If it can't be reproduced -> Try to explain as much as you can so we can try to find a testing scenario to see the bug in action.
5. Here is a template to make things simpler for you => [Template](https://docs.google.com/document/d/1nIhCb6WBJm_DoLVL-eXjm0CvYocSIvEVLZNPki6TEkI/edit?usp=sharing)
6. Send an email with the documentation to => afra.project.308@gmail.com 


### :lady_beetle: Known bugs 
Currently there are no known bugs :tada: :tada:

[1]: https://coolafra.herokuapp.com
