module.exports = {
    apps: [
        {
            name: 'rubot',
            exec_mode: 'cluster',
            instances: 2,
            script: 'node_modules/next/dist/bin/next',
            args: 'start',
            max_memory_restart: '500M',
        },
    ],
};
