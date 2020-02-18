const path = require('path');

function resolve(dir) {
    return path.resolve(__dirname, dir);
}

module.exports = function override(config, env) {
    config.resolve.alias = {
        'components': resolve('src/components'),
        'api': resolve('src/api'),
        'decorations': resolve('src/decorations'),
    }
    return config;
}