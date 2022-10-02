'use strict';
const user_mgmt = require('user_mgmt');
const property_file = __dirname + '/properties/property.json';

const validate_login_params = (param) => {
    return new Promise((resolve, reject) => {
        if (param.username != undefined && param.password != undefined) {
            resolve({ isSuccess: true });
        }
        let prop = require(property_file);
        reject({ isSuccess: false, redirect: prop.redirect_urls.login_page_with_error + prop.error_msg.USERNAME_OR_PASSWORD_MISSING });
    });
}

const login_to_env = (param) => {
    return new Promise((resolve, reject) => {
        let prop = require(property_file);
        user_mgmt.login(param.username, param.password)
            .then((result) => {
                if (result.isSuccess) {
                    resolve({ isSuccess: true, session: result.session_key, type: result.session_type });
                } else {
                    reject({ isSuccess: false, redirect: prop.redirect_urls.login_page_with_error + result.msg });
                }
            })
            .catch((error) => {
                reject({ isSuccess: false, redirect: prop.redirect_urls.login_page_with_error + error.msg });
            })
    })
}

const validate_existing_session = (session_info) => {
    return new Promise((resolve, reject) => {
        let prop = require(property_file);
        user_mgmt.validate(session_info.session, session_info.username)
            .then((result) => {
                if (result.isSuccess) {
                    resolve({ isSuccess: true });
                } else {
                    reject({ isSuccess: false, redirect: prop.redirect_urls.login_page_with_error + result.msg });
                }
            })
            .catch((error) => {
                reject({ isSuccess: false, redirect: prop.redirect_urls.login_page_with_error + error.msg });
            })
    })
}

const set_session_cookies = (res, username, session_key, session_type) => {
    res.cookie('username', username);
    res.cookie('session', session_key, { expire: 900000 + Date.now() });
    res.cookie('type', session_type);
}

const delete_session_cookies = (res) => {
    res.clearCookie("username");
    res.clearCookie("session");
    res.clearCookie("type");
}

const get_session_cookies = (req_cookies) => {
    return {
        username: req_cookies.username,
        type: req_cookies.type,
        session: req_cookies.session
    };
}

const response = (res, msg) => {
    let prop = require(property_file);
    if(prop.response_type == 'API'){
		try{
			if(msg == undefined || msg.indexOf('/') != -1){
				res.statusCode = 202;
				res.send();
			}
			res.send(msg);
		}catch(ex){
			res.statsCode = 404;
			res.send(msg);
		}
    }else{
		res.redirect(msg);
    }
}

module.exports = {
    validateArgs: validate_login_params,
    login: login_to_env,
    validateSession: validate_existing_session,
    setCookies: set_session_cookies,
    readCookies: get_session_cookies,
    clearCookie: delete_session_cookies,
    respond: response
};