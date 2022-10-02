'use strict';
const request = require(`${__dirname}/request`);

request.execute('http://localhost/login', 
                {"Content-Type" : 'application/json'}, 
                'POST', 
                '{"username":"harsh@rawat.com","password":"maapaa1995"}')
.then((response)=>{
    console.log(response.response.headers['set-cookie']);
	let requestBody = {
		branch : "dummy_branch",
		consumerKey: "3MVG9fe4g9fhX0E6kcopvWInnuBJxpZc1Niht_PenbEv4hgc3_.nYiM3dPSbqk7lq3JC2i0iecHSLHHjiBYkh",
		instanceURL: "https://login.salesforce.com",
		username: "harsh.rawat@absyz.com.deplyment",
		testLevel: "1",
		testClasses: "TestClass1,TestClass2"
	}
    request.execute('http://localhost/deploy', 
                    {"Content-Type" : 'application/json', 'Cookie': response.response.headers['set-cookie']}, 
                    'POST', 
                    JSON.stringify(requestBody))
    .then((response)=>{
        console.log(response.data)
    })
    .catch((error) => {
        console.log(error.data)
    })
})
.catch((error) => {
    console.log(error)
})