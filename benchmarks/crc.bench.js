const bench = require('micro-bmark');
const crc32 = require('..');
const zlib = require('node:zlib');

const smallBuffer = Buffer.from([0, 1, 2, 3, 4, 5]);
const largeBuffer = Buffer.alloc(100000);

// Do a few iterations first to get insight into the performance before JIT optimization.
bench.mark(' few iterations, small buffer, native', 10, () => zlib.crc32(smallBuffer));
bench.mark(' few iterations, small buffer, js    ', 10, () => crc32.unsigned(smallBuffer));
bench.mark(' few iterations, large buffer, native', 10, () => zlib.crc32(largeBuffer));
bench.mark(' few iterations, large buffer, js    ', 10, () => crc32.unsigned(largeBuffer));

// Run many iterations to warm up the JIT optimization.
bench.mark('(warm up. ignore)', 10000, () => zlib.crc32(smallBuffer));
bench.mark('(warm up. ignore)', 10000, () => crc32.unsigned(smallBuffer));
bench.mark('(warm up. ignore)', 10000, () => zlib.crc32(largeBuffer));
bench.mark('(warm up. ignore)', 10000, () => crc32.unsigned(largeBuffer));

// Then collect data once the optimization has presumably reached a steady state.
bench.mark('many iterations, small buffer, native', 20000, () => zlib.crc32(smallBuffer));
bench.mark('many iterations, small buffer, js    ', 20000, () => crc32.unsigned(smallBuffer));
bench.mark('many iterations, large buffer, native', 20000, () => zlib.crc32(largeBuffer));
bench.mark('many iterations, large buffer, js    ', 20000, () => crc32.unsigned(largeBuffer));
