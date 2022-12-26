import mongoose from "mongoose";

const refereeRankedBySchema = mongoose.Schema({
  
    givenRank: {
      type: Number,
      required: true,
    },
    nameOfJournalist: {
      type: String,
      required: true,
    },
    nameOfReferee:{
        type:String,
        required:true,
    }

});

const RefereeRankedBy = mongoose.model("refereeRankedBy", refereeRankedBySchema);
export default RefereeRankedBy;
