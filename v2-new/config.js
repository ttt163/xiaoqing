const proxy = require('http-proxy-middleware')

/**
 * 不添加hash的图片 src/img-not-hash
 * 不进行代码检测与压缩的JS src/js-not-lint
 * ESLint忽略文件 .eslintignore
 * Stylelint忽略文件 .stylelintrc -> ignoreFiles
 * publicPath (1:此处publicPath;   2:libs/scss/util-pc或libs/scss/util-m;   3:自定义JS中加载的图片--src/js/public/public)
 */
module.exports = {
    host: '192.168.84.25',
    port: '8023',
    publicPath: '..',
    vendors: [],
    proxy: [
        proxy('/community/login/createtoken.do', {
            target: 'http://play.linekong.com',
            changeOrigin: true
        }),
        proxy('/otherServer', {
            target: 'http://IP:Port',
            changeOrigin: true
        })
    ]
}
