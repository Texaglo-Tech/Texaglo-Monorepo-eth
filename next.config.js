/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  /* config options here */
  env: {
    REACT_APP_LOG_LEVEL: "warn",
    REACT_APP_SC_ATTR: "data-styled",
    REACT_APP_SC_DISABLE_SPEEDY: "false",
  },
  webpack: (config) => {
    config.resolve = {
      ...config.resolve,
      fallback: {
        fs: false,
        path: false,
        os: false,
        process: false,
        crypto: false,
        assert: false,
        util: false,
        querystring: false,
      },
    };
    return config;
  },
  images: {
    domains: ["your s3"],
  },
};

module.exports = nextConfig;
