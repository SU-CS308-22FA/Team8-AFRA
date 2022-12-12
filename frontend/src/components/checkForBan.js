import axios from "axios";

const CheckBanned = (userInfo) => {
    console.log("checking if you are banned...")
    axios.get(`${process.env.REACT_APP_URL}/api/users/check-banned`,{
        params: {
            user: userInfo._id,
          }
      }).then(res => {
        if(res.data === "banned")
        { //modify the local storage
          console.log("I saw that the user is banned")
          if(localStorage.getItem("userInfo"))
          {
            console.log("I set isBanned")
            localStorage.setItem("isBanned", "banned");
          }
        } 
    })
    .catch(err => console.log(err))
}

export default CheckBanned;