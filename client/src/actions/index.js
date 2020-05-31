import streams from "../api/streams";
import history from "../history";

export const signIn = (userId) =>{
    return{
        type: "SIGN_IN",
        payload : userId
    }
}

export const signOut = () =>{
    return{
        type: "SIGN_OUT"
    }
}



// Axios is being used for making request to our API server running on port 3001

// Create a stream from the data submitted in the form 
export const createStream = (formValues) =>{
    
    return async (dispatch, getState) =>{

        // Getstate is being used for attaching userId with each stream created
        const {userId}= getState().auth;

        const response = await streams.post("/streams", {...formValues, userId});

        dispatch({type : "CREATE_STREAM", payload : response.data});

        //Programmatic Navigation : to get the user to home route when stream has been successfully created
        // We are using the history object
        history.push("/");
    }
}
// To get all the streams
export const fetchStreams = () =>{

    return async (dispatch) =>{
        const response = await streams.get("/streams");
        
        dispatch({type : "FETCH_STREAMS", payload : response.data});
    }
}
// To get a particular stream
export const fetchStream = (id) =>{

    return async (dispatch) =>{
        const response = await streams.get(`/streams/${id}`);

        dispatch({type : "FETCH_STREAM", payload : response.data});
    }
}
// Update the details of a stream
export const editStream = (id, newFormValues) =>{

    return async (dispatch) =>{
        const response = await streams.patch(`/streams/${id}`, newFormValues);

        dispatch({type : "EDIT_STREAM", payload : response.data});

        //Programmatic Navigation
        history.push("/");
    }
}
// Delete a stream
export const deleteStream = (id) =>{

    return async (dispatch) =>{
        await streams.delete(`/streams/${id}`);

        dispatch({type : "DELETE_STREAM", payload : id});
        
        //Programmatic Navigation
        history.push("/");
    }
}