const path = require('path');

const { NODE_ENV = 'production' } = process.env

module.exports = {
    mode: NODE_ENV,
    entry: path.resolve(__dirname, 'src', 'index.js'),
    target: 'node',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
        clean: true,
    },
    resolve: {
        extensions: ['.js']
    },
    module: {
    },
    node: {
        __dirname: true
    }
};