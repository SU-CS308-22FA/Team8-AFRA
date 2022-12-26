import Referee from "../models/refereeModel.js";
import RefereeRankedBy from "../models/refereeRankedByModel.js";
import asyncHandler from "express-async-handler";

/* 
// @route     GET /api/referees
// @desc      Get all the referees from the database, sort them according to their match count descendingly
// @response  Send a json array consisting of:
   the match count, number of yellow cards, number of yellow cards that returned into red card, 
   number of red cards, number of penalties, date of birth, place of birth, first Super League match, short biography 
*/
const getAllReferees = asyncHandler(async (req, res) => {
  const referees = await Referee.find().sort({ matchCount: -1 });
  res.json(referees);
});

/* 
// @route     GET /api/referees/sortbyname
// @desc      Get all the referees from the database, sort them according to their name in alphabetical order (A to Z)
// @response  Send a json array consisting of:
   the match count, number of yellow cards, number of yellow cards that returned into red card, 
   number of red cards, number of penalties, date of birth, place of birth, first Super League match, short biography
*/
const getRefereeNameSorted = asyncHandler(async (req, res) => {
  const referee = await Referee.find().sort({ name: 1 });
  res.json(referee);
});

/* 
// @route     GET /api/referees/sortbyrank
// @desc      Get all the referees from the database, sort them according to their rank descendingly (A to Z)
// @response  Send a json array consisting of:
   the match count, number of yellow cards, number of yellow cards that returned into red card, 
   number of red cards, number of penalties, date of birth, place of birth, first Super League match, short biography
*/
const getRefereeRankSorted = asyncHandler(async (req, res) => {
  const referee = await Referee.find().sort({ rank: -1 });
  res.json(referee);
});

/* 
// @route     GET /api/referees/sortbymatchcount
// @desc      Get all the referees from the database, sort them according to their match count (A to Z)
// @response  Send a json array consisting of:
   the match count, number of yellow cards, number of yellow cards that returned into red card, 
   number of red cards, number of penalties, date of birth, place of birth, first Super League match, short biography
*/
const getRefereeMatchCountSorted = asyncHandler(async (req, res) => {
  const referee = await Referee.find().sort({ matchCount: -1 });
  res.json(referee);
});

// @route     PUT /api/referees/updaterankofreferee
const putNewRankForReferee = asyncHandler(async (req, res) => {

  console.log("body of request");
  console.log(req.body);
  
  const givenRank= req.body.selectedRefereeRank;
  const nameOfJournalist= req.body.nameOfJournalist;
  const selectedReferee = req.body.selectedReferee;

  const referee = await Referee.findOne({name:selectedReferee});

  
  var arrayLength =referee.rankedBy.length;
  let check=true;
  let idxOfJournalist;

  for(let i=0; i< arrayLength;i++){
   let currentJournalistName= referee.rankedBy[i].nameOfJournalist;

   if(nameOfJournalist===currentJournalistName){
    console.log("This journalist already give a rank");
    check=false;
    idxOfJournalist=i;
    i=arrayLength;
    
   }
  }

  const rankedBy= new RefereeRankedBy({
    givenRank:givenRank,
    nameOfJournalist:nameOfJournalist,
    nameOfReferee:selectedReferee,
  }); 
  const createdRankedBy = await rankedBy.save();

  if(check){
    
    referee.rankedBy.push(createdRankedBy);
    referee.totalVotes++;
    let sumNew =parseInt(referee.sumOfRanks);
    sumNew= parseInt(sumNew)+parseInt(givenRank);
    referee.sumOfRanks=sumNew;
    let updatedRank = parseInt(referee.sumOfRanks)/parseInt(referee.totalVotes);
    console.log("updatedRank");
    console.log(parseInt(updatedRank));
    referee.rank=parseInt(updatedRank);
    await referee.save();
    
  }

  else{
    
    //console.log(referee.rankedBy[idxOfJournalist].givenRank);

    
    
    let idOfRankedBy=referee.rankedBy[idxOfJournalist]._id;
    const filter = { _id:idOfRankedBy };
    
    await RefereeRankedBy.findOneAndDelete(filter);

    
    let oldRank = referee.rankedBy[idxOfJournalist].givenRank;
    referee.rankedBy.splice(idxOfJournalist,1);
    //console.log(referee.rankedBy);
    referee.rankedBy.push(createdRankedBy);
    

    let newSumOfRanks = parseInt(referee.sumOfRanks)-parseInt(oldRank)+parseInt(givenRank);

    referee.sumOfRanks=newSumOfRanks;
    //console.log(referee.sumOfRanks);
    let updatedRank = parseInt(referee.sumOfRanks)/parseInt(referee.totalVotes);
    //console.log(parseInt(updatedRank));
    referee.rank=parseInt(updatedRank);
    //console.log(referee.rank)
    
    await referee.save();
    
  }
  console.log("end");
  res.status(200).send("Rank updated successfully");
  
 
  //console.log("createdRankedBy")
  //console.log(createdRankedBy);

  




  
});

export {
  getAllReferees,
  getRefereeNameSorted,
  getRefereeRankSorted,
  getRefereeMatchCountSorted,
  putNewRankForReferee,
};