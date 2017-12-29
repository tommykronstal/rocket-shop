var assert = require("assert");
var MembershipApplication = require("../models/membership_application");

describe("Membership application requirements", function() {
    var validApp;

    before(function() {
        validApp = new MembershipApplication({
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

       it("is expired", function() {
           var app = new MembershipApplication({validUntil: Date.parse("01/01/2010")});
           assert(app.expired());
       });

       it("email is 4 characters or less", function () {
           var app = new MembershipApplication({email : "dd"});
           assert(!app.emailIsValid());
       });

       it("email does not contain an @", function () {
           var app = new MembershipApplication({email : "thingthingthing:thing.com"});
           assert(!app.emailIsValid());
       });

       it("email is omitted", function () {
           var app = new MembershipApplication();
           assert(!app.emailIsValid());
       });

       it("height is less than 160 cm", function () {
           var app = new MembershipApplication({height : 159});
           assert(!app.heightIsValid());
       });

       it("height is more than 200 cm", function () {
           var app = new MembershipApplication({height : 201});
           assert(!app.heightIsValid());
       });

       it("height is omitted", function () {
           var app = new MembershipApplication();
           assert(!app.heightIsValid());
       });

       it("age is more than 100", function () {
           var app = new MembershipApplication({age : 101});
           assert(!app.ageIsValid());
       });

       it("age less than 15", function () {
           var app = new MembershipApplication({age : 14});
           assert(!app.ageIsValid());
       });

       it("age is omitted", function () {
           var app = new MembershipApplication();
           assert(!app.ageIsValid());
       });

       it("weight less than 50", function () {
           var app = new MembershipApplication({weight : 49});
           assert(!app.weightIsValid());
       });

       it("weight more than 120", function () {
           var app = new MembershipApplication({weight : 121});
           assert(!app.weightIsValid());
       });

       it("weight is omitted", function () {
           var app = new MembershipApplication();
           assert(!app.weightIsValid());
       });

       it("first is omitted", function () {
           var app = new MembershipApplication();
           assert(!app.nameIsValid());
       });

       it("last is omitted", function () {
           var app = new MembershipApplication();
           assert(!app.nameIsValid());
       });
   });
});