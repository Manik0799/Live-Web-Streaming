import React from "react";
import { fetchStream, editStream } from "../actions";
import StreamForm from "./streamForm";
import {connect} from "react-redux";


class StreamEdit extends React.Component{

    componentDidMount(){
        // Fetching the stream bcz we have the user Id from the props by React URL Navigation
        this.props.fetchStream(this.props.match.params.id);
    }

    onSubmit =(formValues) =>{

        // formValues contains just the changed properties of the object
        this.props.editStream( this.props.match.params.id , formValues );
    }
    
    render(){

        if(!this.props.stream){
            return <h3>Loading ... </h3>
        }
        return(
            <div className= "ui container">
                 <h3>Edit the Stream</h3>
                 {/* initialValues is a special prop redux-form */}
                 <StreamForm 
                    onSubmit= {this.onSubmit} 
                    initialValues= {
                        {   title : this.props.stream.title,
                            description : this.props.stream.description
                        }
                    }
                    
                />
            </div>
        );
    }
}
    

// Getting the stream object from our list of streams
const mapStateToProps = (state, ownProps) =>{
    return { stream : state.streams[ownProps.match.params.id] }
}

export default connect(
    mapStateToProps,
    { fetchStream, editStream }
)(StreamEdit);


