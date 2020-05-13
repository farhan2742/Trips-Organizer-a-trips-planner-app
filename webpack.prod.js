const path = require("path");
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');
const precss = require('precss');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
//const WorkboxPlugin = require('workbox-webpack-plugin');


module.exports = {
	node: {
        fs: 'empty'
    },
    output: {
        libraryTarget: 'var',
        library: 'Client',
        publicPath: '/'
    },
	mode: 'production',
	entry: './src/client/index.js',
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
             				 // Prefer `dart-sass`
              				implementation: require('sass'),
        				},
					}
        		]
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
            filename: "./index.html"
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
            template: '!!ejs-webpack-loader!src/client/views/trip.ejs',
            filename: "./edit.html"
        }),
        
        
        
    	        
    	new CleanWebpackPlugin({
                // Simulate the removal of files
                dry: true,
                // Write Logs to Console
                verbose: true,
                // Automatically remove all unused webpack assets on rebuild
                cleanStaleWebpackAssets: true,
                protectWebpackAssets: false
        }),
        new MiniCssExtractPlugin({ filename: '[name].css'}),
       // new WorkboxPlugin.GenerateSW()
	]
}