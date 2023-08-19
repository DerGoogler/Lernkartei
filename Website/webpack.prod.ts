import { merge } from "webpack-merge";
import { defConfig, config } from "./webpack.config";
import TerserPlugin from "terser-webpack-plugin";

export default merge(config, {
  mode: "production",
  ...defConfig,
  devtool: false,
  optimization: {
    minimizer: [new TerserPlugin()],
  },
});
