(function ($) {
    // 私有方法
    var privateFun = function () {

    }
    var PageSwitch = (function () {
        function PageSwitch(element, options) {
            // 深拷贝，合并options和default
            this.settings = $.extend(true, $.fn.PageSwitch.default, options || {})
            this.element = element
            this.init()
        }

        // 公有方法
        PageSwitch.prototype = {
            /*说明：初始化插件*/
            /*实现：初始化dom结构，布局，分页及绑定事件*/
            init: function () {
                var me = this
                me.selectors = me.settings.selectors
                me.sections = me.selectors.sections
                me.section = me.sections.section

                me.direction = me.settings.direction == 'vertical' ? true : false
                me.pagesCount = me.pagesCount()
                me.index = (me.settings.index >= 0 && me.settings.index <= me.pagesCount) ? me.settings.index : 0

                if (!me.direction) {
                    me._initLayout()
                }

                if (me.pagination) {
                    me._initPaging()
                }

                me._initEvent()
            },
            /*说明：获取滑动页面数量*/
            pagesCount: function () {
                return this.section.length
            },
            /*说明：获取滑动的宽度（横屏滑动）或高度（竖屏滑动）*/
            switchLength: function () {
                return this.direction ? this.element.height() : this.element.width()
            },
            /*说明：主要针对横屏情况进行页面的重新布局*/
            _initLayout: function () {
                var me = this
                var width = (me.pagesCount * 100) + '%',
                    cellWidth = (100 / me.pagesCount).toFixed(2) + '%'
                me.sections.width(width)
                me.section.width(cellWidth).css('float', 'left')
            },
            /*说明：实现分页的dom结构及css样式*/
            _initPaging: function () {
                var me = this,
                    pagesClass = me.selectors.page.substring(1),
                    activeClass = me.selectors.active.substring(1)
                var pageHtml = '<ul class="' + pagesClass + '">'
                for (var i = 0; i < me.pagesCount; i++) {
                    pageHtml += '<li></li>'
                }
                me.element.append(pageHtml)
                var pages = me.element.find(me.selectors.page)
                me.pageItem = pages.find('li')
                me.pageItem.eq(me.index).addClass(activeClass)

                if (me.direction) {
                    pages.addClass('vertical')
                } else {
                    pages.addClass('horizontal')
                }
            },
            /*说明：初始化插件*/
            _initEvent: function () {

            }
        }
        return PageSwitch
    })()
    $.fn.PageSwitch = function (options) {
        return this.each(function () {
            var me = this,
                instance = me.data('PageSwitch')
            if (!instance) {
                instance = new PageSwitch(me, options)
                me.data('PageSwitch', instance)
            }
            // 执行函数
            // fixme ??
            if ($.type('options') === 'string') {
                return instance[options]()
            }
            // 例如调用init方法
            $('div').PageSwitch('init')
        })
    }
    $.fn.PageSwitch.default = {
        selectors: {
            sections: '.sections',
            section: 'section',
            page: '.pages',
            active: '.active'
        },
        index: 0,
        easing: 'ease',
        duration: 500,
        loop: false,
        pagination: true,
        keyboard: true,
        direction: 'vertical', //  horizontal
        callback: ''
    }
})(jquery)