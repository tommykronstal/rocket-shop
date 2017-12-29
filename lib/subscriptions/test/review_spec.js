var assert = require("assert");
var MembershipApplication = require("../models/membership_application");
var ReviewProcess = require("../processes/review");
var sinon = require("sinon");

describe("The review process", function() {
    describe("Receiving a valid application", function() {
        var decision;
        var validApp = new MembershipApplication({
            first: "Test",
            last: "User",
            email: "test@test.com",
            age:  30,
            height: 180,
            weight: 80
        });

        var review = new ReviewProcess();
        var validationSpy = sinon.spy();
        var missionSpy = sinon.spy();
        var roleAvailableSpy = sinon.spy();
        var roleCompatibleSpy = sinon.spy();

        before(function(done) {
            review.on("validated", validationSpy);
            review.on("mission-selected", missionSpy);
            review.on("role-available", roleAvailableSpy);
            review.on("role-compatible", roleCompatibleSpy);
            review.processApplication(validApp, function(err, result) {
                decision = result;
                done();
            });

        });


        it("returns success", function() {
            assert(decision.success, decision.message);
        });

        it("ensure valid is called", function() {
            assert(validationSpy.called);
        });

        it("ensure valid is called", function() {
            assert(missionSpy.called);
        });

        it("ensure valid is called", function() {
            assert(roleAvailableSpy.called);
        });

        it("ensure valid is called", function() {
            assert(roleCompatibleSpy.called);
        });



    });

});