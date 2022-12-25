import axios from "axios";

const CheckNotification = (userInfo) => {
    axios.post(`${process.env.REACT_APP_URL}/api/users/checkseen`,{ id: userInfo._id
      }).then(res => {
        if(res.data === "new")
        { 
          localStorage.setItem("notification", "new");
        }
        else{
          localStorage.removeItem("notification");
        }
    })
    .catch(err => console.log(err))
}

export default CheckNotification;