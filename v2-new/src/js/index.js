/**
 * Author：zhoushuanglong
 * Time：2017-08-29 19:27
 * Description：ndex
 */

import {videoPlay, browserTips} from '../../libs/js/utils'

if (navigator.userAgent.match('MSIE') && window.ActiveXObject) {
    let u = window.navigator.userAgent.toLocaleLowerCase()
    let reg = /10\.0/
    let reg11 = /(trident)\/([\d.]+)/
    let str = navigator.userAgent
    if (!reg.test(str) || !u.match(reg11)) {
        browserTips()
    }
}

const light = () => {
    const $light = $('#breathLight span')
    const lightAll = $light.length
    const animateTime = 200
    $light.removeClass('active green')

    $light.each(function (i, d) {
        const $this = $(this)
        if (i <= 5) {
            setTimeout(function () {
                $this.addClass('active')
            }, animateTime + i * 80)
        } else {
            setTimeout(function () {
                $this.addClass('active')
            }, animateTime + (lightAll - i) * 80)
        }
    })

    setTimeout(function () {
        $light.removeClass('active green')

        $light.each(function (i, d) {
            const num = i + 1
            setTimeout(function () {
                if (i === 5) {
                    $light.eq(num - 1).addClass('active green')
                } else {
                    $light.eq(num - 1).addClass('active')
                }

                setTimeout(function () {
                    $light.eq(num - 1).removeClass('active')
                }, animateTime)
            }, animateTime + i * 80)
        })
    }, Math.ceil(lightAll / 2) * 80 + animateTime)
}

$(function () {
    // 灯效果
    light()
    setInterval(function () {
        light()
    }, 3000)

    $('.video-play').on('click', function () {
        if ($(this).data('src') === '') {
            alert('敬请期待')
        } else {
            videoPlay('.video-play')
        }
    })

    oAni('.animate', 'upward')
    $(window).on('scroll', function () {
        oAni('.animate', 'upward')
    })

    new SwiperText($('.skill-list')).init()
})

function oAni(obj, Class) {
    $(obj).each(function () {
        let fold = $(window).height() + $(window).scrollTop() - 100
        if ($(this).offset().top <= fold) {
            $(this).addClass(Class)
        }
    })
}

class SwiperText {
    constructor(warp) {
        this.warp = warp
        this.offset = !this.warp.find('.prev').height() ? 41 : this.warp.find('.prev').height()
        this.currIndex = 1
        this.startIndex = 1
        this.endIndex = 0
        this.time = 2000
    }

    init() {
        let $nodeList = this.warp.find('.skill-item')
        let len = $nodeList.length
        this.warp.prepend(`<li class="skill-item">${$nodeList.eq(len - 1).html()}</li>`)
        this.warp.append(`<li class="skill-item">${$nodeList.eq(0).html()}</li>`)
        this.currIndex = this.warp.find('.curr').index()
        this.endIndex = this.warp.find('.skill-item').length - 2
        setInterval(() => {
            this.currIndex++
            if (this.currIndex > this.endIndex) {
                this.currIndex = this.startIndex
            }
            this.warp.find('.prev').removeClass('prev')
            this.warp.find('.curr').removeClass('curr')
            this.warp.find('.next').removeClass('next')
            this.warp.find('.skill-item').eq(this.currIndex - 1).addClass('prev')
            this.warp.find('.skill-item').eq(this.currIndex).addClass('curr')
            this.warp.find('.skill-item').eq(this.currIndex + 1).addClass('next')
            this.warp.css({'transform': `translateY(-${(this.currIndex - 1) * this.offset}px)`})
        }, this.time)
    }
}
