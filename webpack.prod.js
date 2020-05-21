const path = require("path");
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');
const precss = require('precss');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const TransferWebpackPlugin = require('transfer-webpack-plugin');


module.exports = {
	node: {
        fs: 'empty'
    },
    entry: {
        app: './src/client/index.js'
    },
    output: {
        libraryTarget: 'var',
        library: 'Client',
        publicPath: '/',
        filename: '[name].js',
    },
    mode: 'production',
	optimization: {
		minimizer: [
			new TerserPlugin({}),
			new OptimizeCSSAssetsPlugin({})
		]
	},
	module: {
        rules: [
            {
                test: '/\.js$/',
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
		        test: /\.js$/,
		        use: ["source-map-loader"],
		        enforce: "pre"
		    },
		    {
                test: /\.css$/, 
                use: ['style-loader', 'css-loader', 'postcss-loader']
            },
		    {
		        test: /\.scss$/,
		        use: [ 
			        MiniCssExtractPlugin.loader, 'css-loader', 
                    {
                        loader: 'postcss-loader', // Run post css actions
                        options: 
                        {
                            plugins() 
                            {
                                return 
                                [
                                    precss,
                                    autoprefixer
                                ];
                            }
                        }
                    }, 
			        {
			            loader: 'sass-loader',
			            options: {
              				implementation: require('sass'),
        				},
					}
        		]
            },
            {
                test: /bootstrap\/dist\/js\/umd\//, 
                use: 'imports-loader?jQuery=jquery'
            },
    		{
                test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: 'url-loader?limit=10000',
            },
            {
                test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
                use: 'file-loader'
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    'file-loader?name=imgs/[name].[ext]',
                    'image-webpack-loader?bypassOnDebug'
                ]
            }
        ]
    },
	plugins: [
        new HtmlWebPackPlugin({
            page: 'index',
            template: '!!ejs-webpack-loader!src/client/views/index.ejs',
            filename: "./landing.html"
        }),
        new HtmlWebPackPlugin({
            page: 'register',
            template: '!!ejs-webpack-loader!src/client/views/register.ejs',
            filename: "./register.html"
        }),
        new HtmlWebPackPlugin({
            page: 'trips',
            template: '!!ejs-webpack-loader!src/client/views/trips.ejs',
            filename: "./trips.html"
        }),
        new HtmlWebPackPlugin({
            page: 'trip',
            template: '!!ejs-webpack-loader!src/client/views/trip.ejs',
            filename: "./trip.html"
        }),
        new HtmlWebPackPlugin({
            page: 'new',
            template: '!!ejs-webpack-loader!src/client/views/new.ejs',
            filename: "./new.html"
        }),
        new HtmlWebPackPlugin({
            page: 'edit',
            template: '!!ejs-webpack-loader!src/client/views/edit.ejs',
            filename: "./edit.html"
        }),
    	new CleanWebpackPlugin({
                // Write Logs to Console
                verbose: true,
                // Automatically remove all unused webpack assets on rebuild
                cleanStaleWebpackAssets: true,
                protectWebpackAssets: false
        }),
        new MiniCssExtractPlugin({ filename: '[name].css'}),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            Alert: 'exports-loader?Alert!bootstrap/js/dist/alert',
            Button: 'exports-loader?Button!bootstrap/js/dist/button',
            Carousel: 'exports-loader?Carousel!bootstrap/js/dist/carousel',
            Collapse: 'exports-loader?Collapse!bootstrap/js/dist/collapse',
            Dropdown: 'exports-loader?Dropdown!bootstrap/js/dist/dropdown',
            Modal: 'exports-loader?Modal!bootstrap/js/dist/modal',
            Popover: 'exports-loader?Popover!bootstrap/js/dist/popover',
            Scrollspy: 'exports-loader?Scrollspy!bootstrap/js/dist/scrollspy',
            Tab: 'exports-loader?Tab!bootstrap/js/dist/tab',
            Tooltip: "exports-loader?Tooltip!bootstrap/js/dist/tooltip",
            Util: 'exports-loader?Util!bootstrap/js/dist/util'
        }),
        new TransferWebpackPlugin([{ from: 'src/client/serviceWorker', to: '/' },]),
        new TransferWebpackPlugin([{ from: 'src/client/imgs/favicon', to: '/imgs/favicon' },])
	]
}