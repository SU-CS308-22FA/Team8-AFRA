//google drive stuff
import express from "express";
import {google} from "googleapis";
const router = express.Router();
import User from "../models/userModel.js";
import Fixture from "../models/matchModel.js";

const GOOGLE_CLIENT_ID = '930549873699-q4im77aiuv2m72mqkup5nn8vf7puf2bt.apps.googleusercontent.com'
const GOOGLE_CLIENT_SECRET = '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'
var busy = [];

const oauth2Client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    'http://localhost:3000'
)
function addHoursToDate(date, hours) {
  return new Date(new Date(date).setHours(date.getHours() + hours));
}

router.post("/", async(req, res, next) => {
    const {code} = req.body
    const {tokens} = await oauth2Client.getToken(code);
    res.send(tokens.refresh_token)
})

router.post("/create-event", async(req, res, next) => {
  const user = await User.findById(req.body.userInfo._id);
  let cal = req.body.cal;
  let busy = "";
  let color = req.body.color || 6;
  oauth2Client.setCredentials({refresh_token: user.refresh_token})
  const calendar = google.calendar({version: "v3", auth: oauth2Client})

  for(let i= 0; i < cal.length; i++)
  {
    const docs = await Fixture.findById(cal[i])
      const referee = docs.referee||"Not yet assigned"
      let endTime = new Date()
      endTime = addHoursToDate(docs.date,2);
      const event = {
        'summary': docs.home + " vs " + docs.visitor,
        'location': "Home Base = " + docs.home,
        'description': "Referee = "  + referee,
        'start': {
          'dateTime': docs.date
        },
        'end': {
          'dateTime': endTime 
        },
        'reminders': {
          'useDefault': false,
          'overrides': [
            {'method': 'email', 'minutes': 24 * 60},
            {'method': 'popup', 'minutes': 10},
          ],
        },
        'colorId': color
      };

      var the = await calendar.freebusy.query(
        {
          resource: {
            timeMin: docs.date,
            timeMax: endTime,
            items: [{ id: 'primary' }],
          },
        })
      if(the.data.calendars.primary.busy.length !== 0)
        busy = busy + event.summary + ", ";
      else
      {
        await calendar.events.insert(
          {  calendarId: 'primary', resource: event })
      }
  }
  const me = busy.slice(0, -2);
  console.log(me)
  if(me !== "")
      res.status(200).send("Failed to add = " + me + " because you are busy!")
  else
      res.status(200).send("Everything was added succesfully!")
})



router.get('/team',  async(req, res, next) => {
  console.log("Im in get request team")
  const { team } = req.query;
  console.log ("Here is the input you gave me " + team)
  let current =  new Date(new Date().getTime()-60*5*1000).toISOString()
  console.log(current)
  Fixture.find({
      '$or': [
          { 'date': {$gte: current}, 'home': {'$regex': team, '$options': 'i'} }, 
          { 'date': {$gte: current}, 'visitor': {'$regex': team, '$options': 'i'}}
      ]}, function(err, docs){
        res.status(200).json(docs);
      })
  res.status(400)
})

export default router;