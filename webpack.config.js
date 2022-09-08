const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const CopyPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const Dotenv = require("dotenv-webpack");

// creamos un objeto que exportaremos con la configuracion
module.exports = {
  // punto de entrada de la aplicacion
  entry: "./src/index.js",
  // punto de salida de la aplicacion
  output: {
    // usaremos path para tener resolve, que nos permite saber donde
    //esta nuestro proyecto para no tener problemas con el nombre de
    // la carpeta
    path: path.resolve(__dirname, "dist"),
    // Nombre del archivo resultante
    // filename: 'main.js',
    filename: "[name].[contenthash].js",
    //mover las imagenes a la carpeta
    // assetModuleFilename: 'assets/images/[hash][ext][query]',
    // limpiar la carpeta dist
    clean: true,
  },
  resolve: {
    // con que extensiones vamos a trabajar .js, react, svelte
    extensions: [".js"],
    alias: {
      "@utils": path.resolve(__dirname, "src/utils/"),
      "@templates": path.resolve(__dirname, "src/templates/"),
      "@styles": path.resolve(__dirname, "src/styles/"),
      "@images": path.resolve(__dirname, "src/assets/images/"),
    },
  },
  module: {
    // reglas que vamos a establecer de como vamos a trabajar
    // con archivos y elementos
    rules: [
      {
        // permite saber que tipo de extension vamos a utilizar
        test: /\.m?js$/,
        // excluimos para no usar cosas que no queremos
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css|.styl$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "stylus-loader"],
      },
      {
        // las extensiones de las imagenes a usar
        test: /\.png/,
        // el tipo de recurso que estamos trabajando
        type: "asset/resource",
        // en que carpeta de salida deseamos dejar
        generator: {
          filename: "assets/images/[hash][ext][query]",
        },
      },
      {
        test: /\.(woff|woff2)$/,
        type: "asset/resource",
        generator: {
          filename: "assets/fonts/[hash][ext][query]",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      // permitirle insertar los elementos
      inject: true,
      // archivo de origen
      template: "./public/index.html",
      // archivo de salida directamente en la carpeta dist
      filename: "./index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "styles/[name].[contenthash].css",
    }),
    /* new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src', 'assets/images'),
                    to: 'assets/images'
                }
            ]
        }), */
    new Dotenv(),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      // Optimizamos el css
      new CssMinimizerPlugin(),
      // Optimizamos el js
      new TerserPlugin(),
    ],
  },
};
