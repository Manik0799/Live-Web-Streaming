import React from "react";
import { connect } from "react-redux";
import Modal from "../components/modal";
import history from "../history";
import  { Link }  from "react-router-dom";
import { fetchStream, deleteStream } from "../actions";


class StreamDelete extends React.Component{

    componentDidMount(){
        this.props.fetchStream(this.props.match.params.id);
    }

    renderContent(){
        if(!this.props.stream){
            return "Are you sure you want to delete the stream ?"
        }
        return `Are you sure you want to delete the stream with title - ${this.props.stream.title}?`
    }

    renderActionButtons(){
        return( 
            <React.Fragment>

                <button 
                    onClick = {() => this.props.deleteStream(this.props.match.params.id)} 
                    className= "ui button negative"
                >
                Delete
                </button>

                <Link to ="/" className= "ui button">Cancel</Link>

            </React.Fragment>
        );
    }
    

    render(){
        return(
                <Modal 
                    title ="Delete Stream"
                    content ={this.renderContent()}
                    actions = {this.renderActionButtons()}
                    onDismiss= {()=> history.push("/")}
                />
        )
    }
}

const mapStateToProps= (state, ownProps) => {
    return { stream : state.streams[ownProps.match.params.id] }
}

export default connect(
    mapStateToProps,
    { fetchStream, deleteStream }
)(StreamDelete);