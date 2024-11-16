
const SummaryApi={
    signUP:{
        url:'http://localhost:8080/api/signup',
        method : "post"
    },
    signIN:{
        url:'http://localhost:8080/api/signin',
        method : "post"
    },
    current_user :{
        url:'http://localhost:8080/api/user-details',
        method : "get"

    },
    logout_user : {
        url :"http://localhost:8080/api//userLogut",
        method : "get"

    }
    

}
export default SummaryApi