var fs = Meteor.npmRequire('fs'),
    path = Meteor.npmRequire('path');

var runner = "#!/usr/bin/env node\n\
\n\
var fs = require('fs'),\n\
    os = require('os'),\n\
    path = require('path');\n\
\n\
var tmpdir = os.tmpdir() || process.env.TMPDIR || \"/tmp\";\n\
\n\
var file = path.join(__dirname, \".meteor\", \"local\", \"build\", \"._meteor_commands_\");\n\
\n\
var args = process.argv.slice(2,process.argv.length),\n\
    cmd = args[0],\n\
    args = args.slice(1, args.length);\n\
\n\
fs.writeFileSync(file, JSON.stringify({cmd:cmd, args:args}));"


var root = process.cwd().split("/.meteor")[0],
    file = path.join(root, "commands"),
    gitfile = path.join(root, ".gitignore");

Meteor.startup(function(){
    if (fs.existsSync(file)) return;
    fs.writeFileSync(file, runner);
    fs.chmodSync(file, 0550);
    fs.appendFile(gitfile, "\ncommands\n");
});
