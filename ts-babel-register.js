require('ts-node/register');
require('@babel/register')({
    ignore: [],
    only: [
        /src[\\\/].*\.ts/,
        /node_modules[\\\/]date-fns/
    ],
    extensions: ['.ts','.js'],
    presets: ['@babel/preset-env'],
    plugins: [
        '@babel/plugin-transform-runtime',
        'babel-plugin-dynamic-import-node'
    ]
});