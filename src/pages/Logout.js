// s63
import { useEffect, useContext } from 'react';

import { Navigate } from 'react-router-dom';

//s63
import UserContext from '../context/UserContext';

export default function Logout() {

	const {setUser, unsetUser} = useContext(UserContext);

	// localStorage.clear();
	unsetUser();

	useEffect(() => {
		setUser({
			id:null,
			isAdmin: null
		})
	})

	return(
		<Navigate to="/login" />

		)
}
