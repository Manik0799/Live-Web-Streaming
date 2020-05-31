import React from "react";
import {connect} from "react-redux";
import {signIn, signOut} from "../actions";


class GoogleAuth extends React.Component{

    componentDidMount(){
        // Initialising the google Auth JS library
        // Scope tells us what part of user account we want to access
        window.gapi.load('client:auth2' , () =>{

            window.gapi.client.init({
                clientId : "287169302421-iupbvcl9jtf6mh108r2n6opklh9ql0po.apps.googleusercontent.com",
                scope : "email"
            }).then(() =>{

                this.auth = window.gapi.auth2.getAuthInstance();

                // code at initialisation
                this.OnAuthChanged(this.auth.isSignedIn.get());

                // To keep changing the values of Buttons whether signed in or not
                this.auth.isSignedIn.listen(this.OnAuthChanged);
            })
        });
    }

    // Checking the state in Redux Store - mapStateToProps
    OnAuthChanged = (isSignedIn) => {
        if(isSignedIn){
            this.props.signIn(this.auth.currentUser.get().getId());
        } else{
            this.props.signOut();
        }
    }

    // on Click Event Handlers for signIn and signOut buttons
    onSignInClick = () =>{
        this.auth.signIn();
    }
    onSignOutClick = () =>{
        this.auth.signOut();
    }


    renderAuthButton(){
        
        if(this.props.isSignedIn === null){

            return null;

        } else if(this.props.isSignedIn){

            return (
                <button className = "ui google red button" onClick = {this.onSignOutClick}>
                    <i className = "google icon"></i>
                    Sign Out
                </button>
            )
        } else{

            return (
                <button className = "ui google red button" onClick = {this.onSignInClick}>
                    <i className = "google icon"></i>
                    Sign in with Google
                </button>
            )
        
        }
    }


    render(){
        return(
            <div>
                {this.renderAuthButton()}
            </div>
        )
    }
}

// Being referenced to the object inside our reducer
const mapStateToProps = (state) =>{
    return {isSignedIn : state.auth.isSignedIn}
}

// imported the actions from the file ES-6 Syntax benefit
export default connect(
    mapStateToProps , 
    { signIn, signOut }
)(GoogleAuth);