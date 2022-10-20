const path = require('path');

const WebpackBar = require('webpackbar');

module.exports = {
  plugins: [
  ],
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    plugins: {
      add:  [
            new WebpackBar()
          ]
    },
    configure: (webpackConfig) => {
      const scopePluginIndex = webpackConfig.resolve.plugins.findIndex(
        ({ constructor }) => constructor && constructor.name === 'ModuleScopePlugin',
      );
      webpackConfig.resolve.plugins.splice(scopePluginIndex, 1);
      // include dt graphic api utils
      const oneOfRule = webpackConfig.module.rules.find((rule) => rule.oneOf);
      if (oneOfRule) {
        const tsxRule = oneOfRule.oneOf.find(
          (rule) => rule.test && rule.test.toString().includes('tsx'),
        );

        const newIncludePaths = [
        ];
        if (tsxRule) {
          if (Array.isArray(tsxRule.include)) {
            tsxRule.include = [...tsxRule.include, ...newIncludePaths];
          } else {
            tsxRule.include = [tsxRule.include, ...newIncludePaths];
          }
        }
      }

      webpackConfig.resolve.modules = [
        path.resolve(__dirname, 'src'),
        ...webpackConfig.resolve.modules,
      ];

      webpackConfig.resolve.fallback = {
        events: require.resolve('events/'),
      };
      return webpackConfig;
    },
  },
  babel: {
    plugins: [
    ],
  },
  eslint: {
    mode: 'file',
    configure: (eslintConfig, { env, paths }) => {
      return eslintConfig;
    },
  },
};
