Package.describe({
    summary: "Run commands in the running meteor instance",
    description: "Define commands that run within the app's environment",
    git: 'https://github.com/npaton/meteor-commands.git',
    name: "npaton:commands"
});

Package.on_use(function(api) {
    api.use([
        'underscore',
        'ejson'
    ], "server");

    api.export('Commands', "server");

    api.add_files([
        'command.js',
        'runner.js'
    ], "server");
});
