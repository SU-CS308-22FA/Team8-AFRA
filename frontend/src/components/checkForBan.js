import axios from "axios";

const CheckBanned = (userInfo) => {
    axios.get(`${process.env.REACT_APP_URL}/api/users/check-banned`,{
        params: {
            user: userInfo._id,
          }
      }).then(res => {
        if(res.data === "banned")
        { //modify the local storage
          if(localStorage.getItem("userInfo"))
          {
            localStorage.setItem("isBanned", "banned");
          }
        } 
    })
    .catch(err => console.log(err))
}

export default CheckBanned;