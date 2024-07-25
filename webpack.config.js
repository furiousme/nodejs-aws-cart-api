module.exports = function (options, webpack) {
    return {
      ...options,
      entry: ['./src/lambda.ts'],
      externals: [],
      output: {
        ...options.output,
        libraryTarget: 'commonjs2',
      },
      plugins: [
        ...options.plugins,
        new webpack.IgnorePlugin({
          checkResource(resource) {
            const lazyImports = [
              '@nestjs/microservices',
              '@nestjs/websockets/socket-module',
              '@nestjs/microservices/microservices-module',
            ];
            if (!lazyImports.includes(resource)) {
              return false;
            }
            try {
              require.resolve(resource, {
                paths: [process.cwd()],
              });
            } catch (err) {
              return true;
            }
            return false;
          },
        }),
      ],
    };
  };