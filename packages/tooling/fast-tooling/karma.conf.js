/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

const basePath = path.resolve(__dirname);

const commonChromeFlags = [
    "--no-default-browser-check",
    "--no-first-run",
    "--no-sandbox",
    "--no-managed-user-acknowledgment-check",
    "--disable-background-timer-throttling",
    "--disable-backing-store-limit",
    "--disable-boot-animation",
    "--disable-cloud-import",
    "--disable-contextual-search",
    "--disable-default-apps",
    "--disable-extensions",
    "--disable-infobars",
    "--disable-translate",
];

module.exports = function (config) {
    let browsers;
    if (process.env.BROWSERS) {
        browsers = [process.env.BROWSERS];
    } else if (config.browsers) {
        browsers = config.browsers;
    } else {
        browsers = ["Chrome"];
    }

    const setup = "setup-browser" + (config.package ? "-" + config.package : "");
    const options = {
        basePath,
        browserDisconnectTimeout: 10000,
        processKillTimeout: 10000,
        frameworks: ["source-map-support", "mocha"],
        plugins: [
            require("karma-mocha"),
            require("karma-mocha-reporter"),
            require("karma-webpack"),
            require("karma-source-map-support"),
            require("karma-sourcemap-loader"),
            require("karma-coverage-istanbul-reporter"),
            require("karma-chrome-launcher"),
            require("karma-firefox-launcher"),
        ],
        files: [`dist/esm/__test__/${setup}.js`],
        preprocessors: {
            [`dist/esm/__test__/${setup}.js`]: ["webpack", "sourcemap"],
        },
        webpackMiddleware: {
            // webpack-dev-middleware configuration
            // i. e.
            stats: "errors-only",
        },
        webpack: {
            mode: "none",
            resolve: {
                extensions: [".js", ".json"],
                modules: ["node_modules"],
                mainFields: ["module", "main"],
                alias: {
                    "@microsoft/fast-components": path.resolve(
                        __dirname,
                        "./node_modules/@microsoft/fast-components"
                    ),
                    "@microsoft/fast-foundation": path.resolve(
                        __dirname,
                        "./node_modules/@microsoft/fast-foundation"
                    ),
                    "@microsoft/fast-element": path.resolve(
                        __dirname,
                        "./node_modules/@microsoft/fast-element"
                    ),
                },
            },
            devtool: "inline-source-map",
            performance: {
                hints: false,
            },
            optimization: {
                namedModules: false,
                namedChunks: false,
                nodeEnv: false,
                usedExports: true,
                flagIncludedChunks: false,
                occurrenceOrder: false,
                sideEffects: true,
                concatenateModules: true,
                splitChunks: {
                    name: false,
                },
                runtimeChunk: false,
                noEmitOnErrors: false,
                checkWasmTypes: false,
                minimize: false,
            },
            module: {
                rules: [
                    {
                        test: /\.js\.map$/,
                        use: ["ignore-loader"],
                    },
                    {
                        test: /\.js$/,
                        use: [
                            {
                                loader: "source-map-loader",
                                options: {
                                    enforce: "pre",
                                },
                            },
                        ],
                    },
                    {
                        test: /message\-system\.min\.js/,
                        use: {
                            loader: "worker-loader",
                        },
                    },
                ],
            },
        },
        mime: {
            "text/x-typescript": ["ts"],
        },
        reporters: [config.reporter || (process.env.CI ? "min" : "progress")],
        browsers: browsers,
        customLaunchers: {
            ChromeDebugging: {
                base: "Chrome",
                flags: [...commonChromeFlags, "--remote-debugging-port=9333"],
                debug: true,
            },
            ChromeHeadlessOpt: {
                base: "ChromeHeadless",
                flags: [...commonChromeFlags],
            },
        },
        client: {
            captureConsole: true,
            mocha: {
                bail: config["bail"],
                ui: "bdd",
                timeout: 5000,
            },
        },
        logLevel: config.LOG_ERROR, // to disable the WARN 404 for image requests
    };

    if (config.coverage) {
        options.webpack.module.rules.push({
            enforce: "post",
            exclude: /(message-system\.service\.[tj]s|monaco-adapter\.service\.[tj]s|shortcuts\.service\.[tj]s|ajv-validation\.service\.[tj]s|monaco-adapter\.service\.[tj]s|__tests__|testing|node_modules|web-worker\.[tj]s|\.spec\.[tj]s$)/,
            loader: "istanbul-instrumenter-loader",
            options: { esModules: true },
            test: /\.[tj]s$/,
            include: path.resolve(__dirname, "./dist/"),
        });
        options.reporters = ["coverage-istanbul", ...options.reporters];
        options.coverageIstanbulReporter = {
            reports: ["html", "text-summary", "json", "lcovonly", "cobertura"],
            dir: "coverage",
            verbose: true,
            thresholds: {
                emitWarning: false,
                global: {
                    statements: 90,
                    lines: 90,
                    branches: 90,
                    functions: 90,
                },
            },
        };
        options.junitReporter = {
            outputDir: "coverage",
            outputFile: "test-results.xml",
            useBrowserName: false,
        };
    }

    config.set(options);
};
