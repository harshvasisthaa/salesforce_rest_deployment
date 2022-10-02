const execute = (requestURL, headers, method, body) => {
	if(requestURL == null){
		throw new Error('Request URL cannot be null');
	}
    var promise = new Promise(function (resolve, reject) {
        const URL = require('url');
        var actionURL = URL.parse(requestURL);

        const request = require(actionURL.protocol.substring(0, actionURL.protocol.length - 1));
        let options = {
            hostname: actionURL.host,
            method: method == null ? 'GET' : method,
            headers: headers == null ? {} : headers,
            path: actionURL.path
        };
        options.port = '3000';

        var dataValue;
        const req = request.request(options, (resp) => {
            let data = '';
            resp.on('data', (chunk) => {
                data += chunk;
            });
            resp.on('end', () => {
                dataValue = data;
                if(resp.statusCode == 200 || resp.statusCode == 202)
                    resolve({ 'data': dataValue, 'response': resp, 'error': null });
                else
                    reject({ 'data': dataValue, 'response': resp, 'error': null });
            });
        });

        req.on('error', (e) => {
            reject({ 'data': dataValue, 'response': null, 'error': e })
        });

        if (body != null) {
            req.end(body)
        } else {
            req.end();
        }
    });
    return promise;
}

module.exports = {
    execute: execute
}