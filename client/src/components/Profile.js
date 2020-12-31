import react,{useState,useEffect} from 'react';
import {connect} from 'react-redux';
const Profile = (props) => {

    const [userdata,setUserdata] = useState({
        name:"loading",
        picture:""
    });
    //equivalent to componentDidMount
    useEffect(()=>{
        
    //if anyone wants to access profile without user being logged in,
    //set props.user null
        if(props.user){

        
        setUserdata({
            name:props.user.username,
            picture:props.user.picture
        });
    }
    },[])

    //if prps.user null redirect to home page
    if(!props.user) {
        props.history.push('/')
    }
    return (
        <div>
           
            <div className="card" style={{margin:"10%",padding:"10px",textAlign:"center"}}>
                <h3> you r {userdata.name}</h3>
                <img className="circle" width="450" src={userdata.picture}/>
            </div>
        </div>

    )
}
const mapStateToProps = state => ({
    user: state.auth
})
export default connect(mapStateToProps)(Profile)
      