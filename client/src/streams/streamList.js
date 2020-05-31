import React from "react";
import {connect} from "react-redux";
import { Link } from "react-router-dom";
import {fetchStreams} from "../actions";

class StreamList extends React.Component{

    componentDidMount(){
        this.props.fetchStreams();
    }

    renderCreateStreamButton(){
        if(this.props.isSignedIn){
            return(
                <div>
                    <Link to="/streams/new" className="ui button primary" >Create a Stream</Link>
                </div>
            ) 
        }
    }

    renderAdminActions(stream){

        // Checking the userId if the current user signed in and each stream component's Linked Id
        if(stream.userId === this.props.currentUserId){
            return(
                <div style={{marginLeft: "5px", marginBottom: "5px"}}>

                    <Link to={`/streams/edit/${stream.id}`} className= "ui button small primary">Edit</Link>
                    <Link to={`/streams/delete/${stream.id}`} className= "ui button small negative">Delete</Link>
                    
                </div>
            );
        }
    }

    renderListOfStreams(){
        return (this.props.streams).map((stream) => {
            return(
                    <div className="card" key= {stream.id}>
                        <div className="content">
                            <div className="header">
                                <i className= "large middle aligned icon play"></i>
                                    <Link to={`/streams/show/${stream.id}`} className= "header">
                                        {stream.title}
                                    </Link>
                            </div>
                            <div className="description">
                                {stream.description}
                            </div>
                        </div>
                        {this.renderAdminActions(stream)}
                    </div>
            );
        });
    }
    
    render(){        
        return(
            <div className= "ui container">
                <h3>Streams</h3>
                {this.renderCreateStreamButton()}
                <br></br>
                <br></br>
                    <div className= "ui cards">
                        {this.renderListOfStreams()}
                    </div>
            </div>
        );
    }
}

// We will convert the state.streams object to array for easy mapping of the list
const mapStateToProps = (state) =>{
    return {
        streams : Object.values(state.streams),
        currentUserId : state.auth.userId, // This gives us the Id of the user currently signed in 
        isSignedIn : state.auth.isSignedIn
    };
}

export default connect(
    mapStateToProps,
    {fetchStreams}
)(StreamList);