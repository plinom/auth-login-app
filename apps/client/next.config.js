//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  output: 'standalone',
  nx: {
    svgr: false,
  },
  env: {
    LS_HASH: process.env.NEXT_PUBLIC_CLIENT_LS_HASH,
  },
};

const plugins = [withNx];

module.exports = composePlugins(...plugins)(nextConfig);
