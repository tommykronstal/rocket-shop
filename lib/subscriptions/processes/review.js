var Emitter = require("events").EventEmitter;
var util = require("util");

var ReviewProcess = function(args) {
    // make sure the application is valid
    var callback;

    this.ensureAppValid = function(app) {
        if (app.isValid()) {
            this.emit("validated", app);
        } else {
            this.emit("invalid", app.validationMessage());
        }
    };

    // find the next mission
    this.findNextMission = function(app) {
        app.mission = {
            commander: null,
            pilot: null,
            MAVPilot: null,
            passengers: []
        };

        this.emit("mission-selected", app);
    };

    // make sure role selected is available
    this.roleIsAvailable = function(app) {
        // TODO: Need to know more about role
        this.emit("role-available", app);
    };

    // accept the application with a message
    this.acceptApplication = function(app) {
        // TODO: What do we do?
        callback(null, {
            success: true,
            message: "Welcome to the Mars program!"
        })
    };

    // deny the app with a message
    this.denyApplication = function(message) {
        callback(null, {
            success: false,
            message: message
        })
    };

    this.processApplication = function(app, next) {
        callback = next;
        this.emit("application-received", app);
    };


    this.ensureRoleCompatability = function (app) {
        this.emit("role-compatible", app);
    };


    this.on("application-received", this.ensureAppValid);
    this.on("validated", this.findNextMission);
    this.on("mission-selected", this.roleIsAvailable);
    this.on("role-available", this.ensureRoleCompatability);
    this.on("role-compatible", this.acceptApplication);

    this.on("invalid", this.denyApplication);

};

util.inherits(ReviewProcess, Emitter);
module.exports = ReviewProcess;