import React, { useContext } from 'react';
import { UserContext } from '../App';
import { Navigate } from 'react-router-dom';

const Editor = () => {


    const { userAuth: { access_token } } = useContext(UserContext);

    return (
        access_token === null ? <Navigate to="/signin" /> :
        <div>
            Editor
        </div>
    );
};

export default Editor;