var assert = require("assert");
var MemberShipApplication = require("../membership_application");

describe("Membership application requirements", function() {
    var validApp;

    before(function() {
        validApp = new MemberShipApplication({
            first: "Test",
            last: "User",
            email: "test@test.com",
            age: 30,
            height: 187,
            weight: 85
        })
    });

   describe("Application valid if...", function() {
       it("Application is valid if all validators return true", function() {
           assert(validApp.isValid(), "Not valid");
       });

       it("email is more than 4 characters and include an @", function() {
           assert(validApp.emailIsValid(), "Not valid email");
       });

       it("height is between 120 and 200", function() {
           assert(validApp.heightIsValid(), "Not valid height");
       });

       it("age is between 18 and 99", function() {
           assert(validApp.ageIsValid(), "Not valid age");
       });

       it("weight is between 50 and 119", function() {
           assert(validApp.weightIsValid(), "Not valid weight");
       });

       it("first and last name is provided", function() {
           assert(validApp.nameIsValid(), "Not valid name");
       });
   });

   describe("Application invalid if...", function() {

       it("email is 4 characters or less", function() {
           var app = new MemberShipApplication({email:"dd"});
           assert(!app.emailIsValid());
        });

       it("email does not contain an @", function() {
           var app = new MemberShipApplication({email:"ddhapplahopp:thing.com"});
           assert(!app.emailIsValid());
       });
   });

});