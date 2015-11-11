
exports.forLib = function (LIB) {

    var exports = {};

    exports.spin = function (context) {
        
        var SMS = function () {
            var self = this;
    
    
            self.send = function (message) {
    
console.log("send SMS!!!!!!!!", message);

                    if (testMode) {
                        message.body = "[TEST] " + (message.body || "");
                    }
        
                
                
            }
        }
    
        return new SMS(context);
    }

    return exports;
}
