'use strict';

const exec = require('child_process').exec;

const deploy = (request) => {
	exec(`start deploy ${request.branch} ${request.consumerKey} ${request.instanceURL} ${request.username} ${request.testLevel} ${request.testClasses}`,
		(err, stdout, stderr) => {  
		  if (err) {  
			console.error(err);  
			return;  
		  }  
		  console.log(stdout);  
		}
	);
}

module.exports = {
	deploy: deploy
};

/*deploy({
		branch : "dummy_branch",
		consumerKey: "3MVG9fe4g9fhX0E6kcopvWInnuBJxpZc1Niht_PenbEv4hgc3_.nYiM3dPSbqk7lq3JC2i0iecHSLHHjiBYkh",
		instanceURL: "https://login.salesforce.com",
		username: "harsh.rawat@absyz.com.deplyment",
		testLevel: "1",
		testClasses: ""
	})*/