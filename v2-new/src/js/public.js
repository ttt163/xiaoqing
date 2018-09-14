/**
 * Author：zhoushuanglong
 * Time：2018-01-09 16:18
 * Description：public
 */

import {pageLoadingHide} from '../../libs/js/utils'

$(function () {
    pageLoadingHide()

    $('body').on('click', function (e) {
        if (!$(e.target).closest('.xq-WeChat').length) {
            $('.nav-box .gzh-ewm').css({'display': 'none'})
        } else {
            $('.nav-box .gzh-ewm').css({'display': 'block'})
        }
    })

    // 导航
    $('.xq-nav-btn').on('click', function () {
        $('.xq-top nav').css({'display': 'block'})
    })

    $('.xq-top .close').on('click', function () {
        $('.xq-top nav').css({'display': 'none'})
    })

    $('.share span').on('click', function () {
        $(this).children('div').toggle()
    })

    $('.buy-now').on('click', function (event) {
        event.preventDefault()
        // alert('暂未开售！')
        $('.buy').addClass('show')
        $('.shade').addClass('show')
        return false
    })

    $('.shade').on('click', function () {
        $('.buy').removeClass('show')
        $('.shade').removeClass('show')
    })
})
