/**
 * @type {import('vite').UserConfig}
 */
const config = {
  root: 'src',
  publicDir:"public",
  build: {
    minify:true,
    outDir: './../dist/htdocs',
    emptyOutDir: true
  }
}

export default config