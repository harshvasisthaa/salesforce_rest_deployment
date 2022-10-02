'use strict';
const service = require(`${__dirname}/service.js`);

const login_post = (req, res) => {
    service.validateArgs(req.body)
        .then((result) => {
            service.login(req.body)
                .then((result) => {
                    service.setCookies(res, req.body.username, result.session, result.type);
                    service.respond(res, '/');
                })
                .catch((err) => { handle_error(err, res); })
        })
        .catch((err) => { handle_error(err, res); })
}

const validate_logged_session = (req, res, next) => {
    let cookies = service.readCookies(req.cookies);
    if (!cookies.session) {
        if (req.originalUrl.startsWith('/login')) {
            next();
        } else {
            service.respond(res, '/login');
        }
    } else {
        service.validateSession(cookies)
            .then((result) => {
                next();
            })
            .catch((err) => {
                service.clearCookie(res);
                handle_error(err, res);
            })
    }
}

const logout_session = (req, res, next) => {
    service.clearCookie(res);
    service.respond(res, '/login');
}

const handle_error = (error, res) => {
	if(!error.isSuccess && error.redirect){
        service.respond(res, error);
	}
}

module.exports = {
    login: login_post,
    validate: validate_logged_session,
    logout: logout_session
};