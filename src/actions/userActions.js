import {GET_USER, USER_LOGOUT} from './types';

export const userLogin = () => dispatch => {
    let empty_user = {}
    fetch("http://localhost:3000/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true
        }
      })
        .then(res => res.json())
        .then(data =>{
        //    console.log(data.user);
            dispatch({
                type: GET_USER,
                payload: data.user || empty_user
            })}
        );
};

export const userLogout = () => dispatch => {
    fetch('http://localhost:3000/logout')
        .then(res => res.json())
        .then(data =>
            dispatch({
                type: USER_LOGOUT,
                payload: data.user
            })
        );
};

export const showAuthWindow = (options) => {

  
        const left = (window.screen.width/2)-250;
        const top = (window.screen.height/2)-300;
        options.windowName = options.windowName ||  'ConnectWithOAuth'; // should not include space for IE
        options.windowOptions = options.windowOptions || `location=0,status=0,width=500,height=600, top=${top}, left=${left}`;
        options.callback = options.callback || function(){ window.location.reload(); };
        // var that = this;
        let oauthWindow = window.open(options.path, options.windowName, options.windowOptions);
        let oauthInterval = window.setInterval(async function(){
            let json = await fetch("http://localhost:3000/auth/login/success", {
                method: "GET",
                credentials: "include",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  "Access-Control-Allow-Credentials": true
                }
              })
            let result = await json.json()
            if(result.user) {
                window.clearInterval(oauthInterval);
                options.callback();   
                return  oauthWindow.close()
            }
           if(oauthWindow.closed){
            
            options.callback();   
           }

        }, 1000);
    
}
