import { config as baseConfig } from "./base.js";
import { perfectionistConfig } from "./plugins/perfectionist.config.js";

export const nestJsConfig = [...baseConfig, ...perfectionistConfig];
