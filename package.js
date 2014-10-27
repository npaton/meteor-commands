Package.describe({
    summary: "Run commands in the running meteor instance",
    description: "Define commands that run within the app's environment",
    git: 'https://github.com/npaton/meteor-commands.git',
    version: '0.1.0',
    name: "npaton:commands"
});

Package.on_use(function(api) {
    api.use('underscore@1.0.0');
    api.use('ejson@1.0.3');

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
