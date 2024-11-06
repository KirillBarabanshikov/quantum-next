module.exports = {
    apps: [
        {
            name: 'rubot',
            exec_mode: 'cluster',
            instances: 'max',
            script: 'node_modules/next/dist/bin/next',
            args: 'start',
        },
    ],
};
