import { lirioConfig } from "lirio/stackbit";

export default { 
    stackbitVersion: '~0.6.0',
    nodeVersion: '18',
    ssgName: 'custom',
    devCommand: './node_modules/.bin/vite --port {PORT}',
    experimental: {
        ssg: {
            name: 'sveltekit',
            logPatterns: {
                up: [' ready in '],
            },
            passthrough: ['/vite-hmr/**'],
        },
    },
    ...lirioConfig(__dirname), 
    useESM: true
};