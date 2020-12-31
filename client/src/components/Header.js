import react from 'react';
import {connect} from 'react-redux';
//Link component doesnt create request but a tag does
//so in profile and logo we will use Link tag 
import {Link} from 'react-router-dom'
const Header = (props) => {

    const renderContent = () =>{
        switch (props.user) {
            case null:
                return <li><a href="/">profile</a></li>
            case false:
                return <li><a href="/auth/google">signup</a></li>
            default:
                return(
                    <>
                    <li><a href="/api/logout">logout</a></li>
                    <li><Link to="/profile">profile</Link></li>
                    </>
                )

        }
    }
    return (
        <nav>
        <div className="nav-wrapper deep-purple darken-2">
          <Link to={props.user?'/profile':'/'} className="brand-logo">Logo</Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
           
            {renderContent()}
          </ul>
        </div>
      </nav>

    )
}
const mapStateToProps = (state) => ({
    user:state.auth
})
export default connect(mapStateToProps)(Header)
      