var _ = require("underscore")._;

var MembershipApplication  = function(args) {

    _.extend(this, args);

    this.emailIsValid = function() {
        return this.email && this.email.length > 3 && this.email.indexOf("@") > -1
    };

    this.heightIsValid = function() {
        return this.height && this.height > 120 && this.height < 201;
    };

    this.ageIsValid = function() {
        return this.age && this.age > 18 && this.age < 99;
    };

    this.weightIsValid = function() {
        return this.weight && this.weight > 50 && this.weight < 120;
    };

    this.nameIsValid = function() {
        return this.first && this.last;
    }

    this.isValid = function() {
        return this.emailIsValid() &&
            this.heightIsValid() &&
            this.ageIsValid() &&
            this.weightIsValid()
    };

};

module.exports = MembershipApplication;