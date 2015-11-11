
exports.forLib = function (LIB) {
    var ccjson = this;

    const TWILIO = require("twilio");

    return LIB.Promise.resolve({
        forConfig: function (defaultConfig) {

            var Entity = function (instanceConfig) {
                var self = this;

                var config = {};
                LIB._.merge(config, defaultConfig);
                LIB._.merge(config, instanceConfig);

                self.AspectInstance = function (aspectConfig) {

                    return LIB.Promise.resolve({

                        getConfig: function () {
                            return config;
                        },

                        send: function () {

                            return LIB.Promise.resolve(
                                ccjson.makeDetachedFunction(
                            		function (messageOverrides) {

                            			return LIB.Promise.promisify(function (callback) {

console.log("twilio config", config);
                            				if (config.enabled === false) {
                            					console.log("Skip sending twilio sms message due to 'enabled === false'");
                            					return callback(null);
                            				}

                            				LIB.assert(typeof config.twilio.credentials.accountSid, "string");
                            				LIB.assert(typeof config.twilio.credentials.authToken, "string");

                            				var client = TWILIO(config.twilio.credentials.accountSid, config.twilio.credentials.authToken);

                            				var defaultMessage = LIB._.merge({
                            				    body: "<REPLACE>",
                            				    to: "<REPLACE>",
                            				    from: "<REPLACE>"
                            				}, config.twilio.message || {});
                            
                            				var message = LIB._.merge(defaultMessage, messageOverrides || {});
                            
                            console.log("SMS message", message);
                            
                            				return client.messages.create(message, function (err, result) {
                            					if (err) {
                            						if (!err.stack) {
                            							var _err = new Error();
                            							for (var name in err) {
                            								_err[name] = err[name];
                            							}
                            							err = _err;
                            						}
                            						return callback(err);
                            					}
                            
                            console.log("SMS send result", result);
                            
                            					return callback(null);
                            				});
                            			})();
                            		}
                                )
                            );
                        }
                    });
                }
            }
            Entity.prototype.config = defaultConfig;

            return Entity;
        }
    });
}
