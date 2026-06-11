import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import wasm from 'vite-plugin-wasm';
import topLevelAwait from 'vite-plugin-top-level-await';

export default defineConfig({
	plugins: [
		wasm(),
		topLevelAwait(),
		react(),
		nodePolyfills({
			include: [ 'buffer', 'crypto', 'stream', 'util' ],
			globals: {
				Buffer: true,
			},
		} ),
	],
	base: '/wp-content/plugins/cardano-connect/react/build/',
	build: {
		outDir: 'build',
		emptyOutDir: true,
		manifest: true,
		rollupOptions: {
			output: {
				entryFileNames: 'static/js/[name].[hash].js',
				chunkFileNames: 'static/js/[name].[hash].js',
				assetFileNames: ( assetInfo ) => {
					const name = assetInfo.names?.[ 0 ] ?? assetInfo.name ?? '';

					if ( name.endsWith( '.css' ) ) {
						return 'static/css/[name].[hash][extname]';
					}

					if ( name.endsWith( '.wasm' ) ) {
						return '[name].[hash][extname]';
					}

					return 'assets/[name].[hash][extname]';
				},
			},
		},
	},
	server: {
		port: 3000,
		open: true,
	},
});
