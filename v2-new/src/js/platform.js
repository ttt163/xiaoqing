/**
 * Author：tantingting
 * Time：2018/7/9
 * Description：Description
 */
import {skillData} from './skillConfig'

$(function () {
    let mySwiper = new Swiper('.swiper-container', {
        autoplay: true // 可选选项，自动滑动
    })
    console.log(mySwiper)

    /* 瀑布流开始 */
    let container = $('.waterfull ul')
    let loading = $('#imloading')
    // 初始化loading状态
    loading.data('on', true)
    container.imagesLoaded(function () {
        container.masonry({
            columnWidth: $('#waterfull').find('.item').outerWidth(true),
            // columnWidth: 196,
            itemSelector: '.item',
            isFitWidth: false, // 是否根据浏览器窗口大小自动适应默认false
            isAnimated: false, // 是否采用jquery动画进行重拍版
            isRTL: false, // 设置布局的排列方式，即：定位砖块时，是从左向右排列还是从右向左排列。默认值为false，即从左向右
            isResizable: true // 是否自动布局默认true
        })
    })

    let count = 1 // 分页请求
    $(window).scroll(function () {
        if (!loading.data('on')) {
            return
        }
        // 计算所有瀑布流块中距离顶部最大，进而在滚动条滚动时，来进行ajax请求，方法很多这里只列举最简单一种，最易理解一种
        let itemNum = $('#waterfull').find('.item').length
        let itemArr = []
        itemArr[0] = $('#waterfull').find('.item').eq(itemNum - 1).offset().top + $('#waterfull').find('.item').eq(itemNum - 1)[0].offsetHeight
        itemArr[1] = $('#waterfull').find('.item').eq(itemNum - 2).offset().top + $('#waterfull').find('.item').eq(itemNum - 1)[0].offsetHeight
        itemArr[2] = $('#waterfull').find('.item').eq(itemNum - 3).offset().top + $('#waterfull').find('.item').eq(itemNum - 1)[0].offsetHeight
        let maxTop = Math.max.apply(null, itemArr)
        if (maxTop < $(window).height() + $(document).scrollTop()) {
            // 加载更多数据
            if (itemNum >= 48) {
                return
            }
            loading.data('on', false).fadeIn(800)
            /* 模拟从后台获取到的数据 */
            let sqlJson = getJsonData(count)
            loadingData(sqlJson)
            count++
        }

        function getJsonData(count) {
            let len = 3 * 2
            let startLen = 18 // 初始化长度
            let start = startLen + len * (count - 1)
            let end = startLen + len * count > skillData.length ? skillData.length : startLen + len * count
            return skillData.slice(start, end)
        }

        function loadingData(sqlJson) {
            /* 这里会根据后台返回的数据来判断是否你进行分页或者数据加载完毕这里假设大于30就不在加载数据 */
            if (itemNum >= 48) {
                loading.text('就有这么多了！')
            } else {
                let html = ''
                sqlJson.map((item) => {
                    html += `
                    <li class="item">
                        <div class="li-item">
                            <img src="${item.img}" alt="${item.label}">
                            <h4 class="li-title">${item.label}</h4>
                            <p class="desc">${item.desc}</p>
                        </div>
                    </li>`
                })
                /* 模拟ajax请求数据时延时800毫秒 */
                $(html).find('img').each(function (index) {
                    loadImage($(this).attr('src'))
                })
                let time = setTimeout(function () {
                    $(html).find('img').each(function (index) {
                        loadImage($(this).attr('src'))
                    })
                    let $newElems = $(html).css({opacity: 1}).appendTo(container)
                    $newElems.imagesLoaded(function () {
                        $newElems.animate({opacity: 1}, 800)
                        container.masonry('appended', $newElems, true)
                        loading.data('on', true).fadeOut()
                        clearTimeout(time)
                    })
                }, 300)
            }
        }
    })

    function loadImage(url) {
        let img = new Image()
        // 创建一个Image对象，实现图片的预下载
        img.src = url
        if (img.complete) {
            return img.src
        }
        img.onload = function () {
            return img.src
        }
    }
})
