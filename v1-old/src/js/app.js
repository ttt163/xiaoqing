/**
 * Author：zhoushuanglong
 * Time：2017-08-29 19:27
 * Description：ndex
 */
// import {isIos} from '../../libs/js/utils'
import {isAndroid, isWeixin} from '../../libs/js/utils'
$(function () {
    let iosUrl = `https://itunes.apple.com/cn/app/小青ai/id1354329139?mt=8`
    let androidUrl = `https://tdl01.8864.com/lkcps/xiaoQingAI.apk`
    // pc下载app
    $('.lDownload p').on('click', function () {
        let _type = $(this).data('type')
        downloadApp(_type)
    })
    // 手机下载app
    $('.sDownload').on('click', function () {
        let _type = isAndroid() ? 'android' : 'ios'
        // ? 'ios' : 'android'
        if (isWeixin() && isAndroid()) {
            alert('微信无法下载，请用自带浏览器打开！')
        } else {
            downloadApp(_type)
        }
    })
    function downloadApp(type) {
        let url = ''
        if (type.toLowerCase().indexOf('ios') !== -1) {
            url = iosUrl
            window.open(url)
        } else {
            url = androidUrl
            location.href = url
        }
        // location.href = url
        // window.open(url)
    }
})
