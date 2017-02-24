var config = {
    local: {
        mode: 'local',
        port: 3000
    },
    dev: {
        mode: 'dev',
        port: 3000
    },    
    staging: {
        mode: 'staging',
        port: 4000
    },
    production: {
        mode: 'production',
        port: 5000
    }
}

module.exports = function(mode) {
    return config[process.env.mode || mode || process.argv[2] || 'local'] || config.local;
}