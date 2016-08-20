var request = require('request');
var url = require('url');

var apiKey;
var apiInUrl = 'http://2captcha.com/in.php';
var apiResUrl = 'http://2captcha.com/res.php';
var apiMethod = 'base64';

var defaultOptions = {
    pollingInterval: 2000,
	maxPollTime: 200000,
	key: '',
};

module.exports = {
	options: defaultOptions,
	solve: function (opts, cb) {
		return request({
			url: apiInUrl,
			qs: {
				key: defaultOptions.key,
				method: 'userrecaptcha',
				googlekey: opts.key,
				pageurl: opts.url,
				json: 1,
			},
		}, function (err, result) {
			if (err) return cb(err);
			var firstPollTime = new Date().getTime();
			var pollNow = function () {
				var now = new Date().getTime();
				if (now - firstPollTime > defaultOptions.maxPollTime) {
					return cb('Max poll time exceeded');
				}
				return request({
					url: apiResUrl,
					qs: {
						key: 'ea1de4eb81487b51b5f8236c7139c79c',
						action: 'get',
						id: JSON.parse(result.body).request,
					},
				}, function (err, result) {
					if (err) return cb(err);
					if (result.body.indexOf('OK|') !== 0) {
						return setTimeout(function () {
							return pollNow();
						}, defaultOptions.pollingInterval);
					}
					return cb(null, result.body.substring(3));
				});
			};
			pollNow();
		});
	},
};
