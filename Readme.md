#*Commands* for Meteor.js

Define commands that run within the app's environment.

Dead simple way to run arbitrary commands within your **running** Meteor app.

Installs a script in the root of you app and when you run that with args it passes that to the running app that executes the commands.

##Usage

Anywhere in the server side code, define commands:

    Commands({
        "bootstrap": function () {
            // insert data
        },
        "upload": function (some, arg) {
            // do stuff
        },
        "test": function () {
            // run special test
        }
    });

Commands() can be called any number of times, like Meteor.methods, but no two commands can have the same name.

The package will generate a commands file at the root of your app, to run a command:

    ./commands bootstrap
    ./commands upload file.png inline

Your app must already be running for commands to run.

##How it works

To make clear how simple this solution is, here's how it works.

The command line writes a file in .meteor/local/build with the input command and arguments. The running app watches that file and runs the commands as the are written to the file. The running app clears the file each time it runs commands. Any rebuild of the app will clear the file.
