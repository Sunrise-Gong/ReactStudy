const path = require ('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
    name: 'minesearch-dev',
    mode: 'development',
    devtool:'inline-source-map',// 처음 보는 거다.
    
    resolve: { // 사전: 해결하다
        extensions: ['.js', '.jsx']
    },
    
    entry: {
        app: './client',
    },
    
    module: {
        rules: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',// loader : 짐을 싣는 사람
            options: {
                presets: [
                    ['@babel/preset-env', { // 사용자의 브라우저에 맞는 문법으로 변환시켜줌
                        targets: {browsers: ['last 2 chrome versions']},// 크롬 가장 마지막 버전 두가지를 지원
                        debug: true
                    }],
                    '@babel/preset-react', // jsx 문법이 지원됨
                ],
                plugins: ["react-refresh/babel"]
            },
            exclude: path.join(__dirname, 'node_modules') // exclude : 차단하다
        }],
    },

    plugins: [
        new ReactRefreshWebpackPlugin(),
    ],

    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: '/dist'
    },

    devServer: {
        publicPath: '/dist',
        hot: true
    }
}