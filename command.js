Fiber = Npm.require('fibers');

var _commands = {};
var fs = Npm.require('fs'),
    os = Npm.require('os'),
    path = Npm.require('path');

Commands = function (commands) {

    _.each(commands, function(command, name){
        if (_commands[name])
            throw new Error("Cannot have two commands with the same name");

        _commands[name] = command;
    });
};

Commands.isMirror = false;

Commands.run = function (cmd) {
    if (!_commands[cmd])
        return console.error("Command not found:", cmd);
    var args = Array.prototype.slice.call(arguments);
    args = args.slice(1,args.length);
    _commands[cmd].apply(null, args);
};

Commands.apply = function (cmd, args) {
    if (!_commands[cmd])
        return console.error("Command not found:", cmd);
    Fiber(function() {
        _commands[cmd].apply(null, args);
    }).run();
};

var root = process.cwd().split("/.meteor")[0],
    file = path.join(root, ".meteor", "local", "build", "._meteor_commands_");

fs.watchFile(file, function(curr, prev) {
    if (!fs.existsSync(file)) return;

    // Parse commands in file
    var commands = fs.readFileSync(file).toString().split("\n");
    _.each(commands, function(command){
        command = EJSON.parse(command);
        Commands.apply(command.cmd, command.args);
    });

    // Clear file
    fs.unlinkSync(file);
});


//
// // Ok, so
// var mirror;
// Meteor.startup(function(){
//     mirror = new Mirror('commands');
//     mirror.startup(function(){
//         Commands.isMirror = mirror.isMirror;
//         if (mirror.isMirror) {
//             console.log("I'm mirror");
//
//             // Listen for messages from the main app
//             mirror.subscribe(function(msg){
//                 var options = EJSON.parse(msg);
//                 console.log(msg, options);
//                 Commands.run(options.cmd, options.args);
//             });
//         } else {
//             console.log("I'm main");
//
//             // Listen for messages from the mirror
//             mirror.subscribe(function(msg){
//                 console.log("Main app recieved a message from the mirror: " + msg);
//             });
//
//             // Send a message to the mirror
//             // mirror.publish('ping')
//         }
//     });
//
//     if (!mirror.isMirror) {
//         mirror.start(function(err) { // Runs ONCE after main app mirror.startup (or error)
//             if (err)
//                 return console.log('There was an error starting the mirror') ;
//             console.log("Mirror started successfully");
//         });
//
//         // // Kill the mirror after a little while
//         // Meteor.setTimeout(function(){
//         //     console.log("Stopping the mirror");
//         //     mirror.stop()
//         // }, 10000);
//     }
//
// });
//
//
// Commands.run = function (cmd, args) {
//     if (!mirror.isMirror) {
//         args = Array.prototype.slice.call(arguments);
//         args = args.slice(1,args.length);
//         mirror.publish(EJSON.stringify({cmd: cmd, args: args}));
//     } else {
//         _commands[cmd].send(args);
//     }
// };
