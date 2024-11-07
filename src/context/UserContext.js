import React from 'react';

// context object = store information, prop available for all pages to access
// For everyone to use  
// But this is just as storage 
const UserContext = React.createContext();


// The Provider component allows other components to consume/use context object and suuply informatipn to other information
// The Provider is a bridge to allow access to storage
export const UserProvider = UserContext.Provider;


export default UserContext;


