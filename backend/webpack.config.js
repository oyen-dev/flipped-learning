const path = require('path');

const { NODE_ENV = 'production' } = process.env

module.exports = {
    mode: NODE_ENV,
    entry: path.resolve(__dirname, 'src', 'index.ts'),
    target: 'node',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
        clean: true,
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.ts$/i,
                use: [
                    'ts-loader',
                ]
            },
        ],
    },
};