# AFRA = Automated Fixture and Referee Assignment
Link to Heroku Deploy => https://coolafra.herokuapp.com


## What is AFRA ?
  AFRA is a web application that is designed to facilitate the burden of TFF by reducing human error in assigning fixtures and referees. It also incorporates a user friendly design and has a simple structured interface. That way the users can find everything they wish for and more, in a single webpage.

## Why AFRA ?
  Our server has many useful features for many different actors such as: The admins, the users, referees and journalists.

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

#### Verified Professions
- [x] Referees and Journalists can apply for verifying their occupations [#15](https://github.com/SU-CS308-22FA/Team8-AFRA/issues/15)

#### The Admins
- [x] Admins can approve or reject the requests for occupation verification [#34](https://github.com/SU-CS308-22FA/Team8-AFRA/issues/34)
- [x] Admins can fetch the match data using an API thereby it is automatic [#16](https://github.com/SU-CS308-22FA/Team8-AFRA/issues/16)
- [x] Admins can see the report requests and ban the users which also sends a notification email to the banned user, banned users cannot login and if they are already logged in they get kicked to main page. [#47](https://github.com/SU-CS308-22FA/Team8-AFRA/issues/47)

- [] Users can verify their emails by typing the code they received in their email. [#55](https://github.com/SU-CS308-22FA/Team8-AFRA/issues/55)
- [] Users can report the owners of comments that has bad words. [#54](https://github.com/SU-CS308-22FA/Team8-AFRA/issues/54)
- [] Users can display detailed match information. [#53](https://github.com/SU-CS308-22FA/Team8-AFRA/issues/53)
- [] Users can filter the comments in many different ways [#52](https://github.com/SU-CS308-22FA/Team8-AFRA/issues/52)
- [] Users can reply to other comments [#56](https://github.com/SU-CS308-22FA/Team8-AFRA/issues/56)


## Repository and Code Structure

The project is made using MERN stack.
- [React JS](https://reactjs.org/)
- [Node JS](https://nodejs.org/) 
- [Express JS](https://expressjs.com/)
- [Mongo DB](https://www.mongodb.com/)
- [Bootstrap](http://getbootstrap.com/)

Here is our backlog => https://github.com/orgs/SU-CS308-22FA/projects/40
All the source code is in one repository, we have seperate directories for the frontend and the backend.
Frontend -> Has all the screens the user can display
Backend -> Includes everything that happens behind the scenes.

## How to use AFRA ?

### Using the deployed server
Simply click the link to our Heroku Deploy => https://coolafra.herokuapp.com
You can create an account and get all the benefits!

### Set it up on your local machine

1. Download an IDE
2. Clone the repo
   ```sh
   git clone https://github.com/SU-CS308-22FA/Team8-AFRA.git
   ```
3. Install NPM packages both for frontend and the backend
   ```sh
   npm install
   ```
    ```sh
   cd frontend && npm install
   ```
4. Change the REACT_APP_URL in the env variables as -> 'http://localhost:4000'
5. Change other env variables according to your preferences
6. To start the application
   ```sh
   npm run dev
   ```

## How to report a bug ?
## Known bugs



## Developer Documentation
