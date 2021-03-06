//数字放大器，同时会显示中文单位
// by 剑平（明河）
var $ = require('node').all;
var Base = require('base');
var O = require('overlay');
var NumberZoom = Base.extend({
    initializer:function(){
        var self = this;
        var $target = self.get('$target');

        $target.on('focusin valuechange',function(e){
            var popup = self.get('popup');
            var str = S.trim(e.target.value);
            var negative = /^\-.*$/.test(str);
            if(str.length > 0 ){
                self.set('maxLen', self.get('autoFormat') ? 14 : 11);
                self.set('maxLen', str.indexOf('.') > -1 ? 17 : 14);
                if (negative) {
                    self.set('maxLen', self.get('maxLen') + 1);
                }
                self.show();
            }else{
                popup && popup.hide();
            }
        });
        $target.on('focusout',function(){
            var popup = self.get('popup');
            popup && popup.set('visible',false);
        });
        if ($target.val() !== '-') {
            self._dealPrice($target.val());
        }
    },
    show: function(price){
        var self = this;
        var $target = self.get('$target');
        price = price || S.trim($target.val());
        // 为空时输入'-'时不做任何处理
        if (price === '-') {
            return;
        }
        if(self.get('filter')) price = self.get('filter')(price);
        var maxLen = self.get('maxLen');
        if(price.length > maxLen) {
            price = price.substr(0, maxLen);
        }
        var content = self._html(price);
        var popup = self.get('popup');
        if(!popup){
            var width = self.get('width') && self.get('width') || $target.outerWidth();
            popup= new O({
                prefixCls:self.get('prefixCls'),
                content:content,
                closable:false,
                effect: {
                    effect:"fade",
                    duration:0.3
                }
            });
            self.set('popup',popup);
            popup.render();
        }else{
            var $el = popup.$el;
            $el.all('.number-zoom-overlay-content').html(content);
        }
        popup.set('visible',true);
        popup.align($target,self.get('align') == "top" && ['tl', 'bl'] || ['bl', 'tl']);
    },
    hide: function(){
        var self = this;
        var popup = self.get('popup');
        popup && popup.set('visible',false);
    },
    //获取弹出层的html结构
    _html : function(money){
        var self = this;
        var moneyArr = self._dealPrice(money);
        var negative = /^\-.*$/.test(money);
        var zheng = moneyArr[0];
        var ling = moneyArr[1];

        var unit = ["元", "十", "百", "千", "万", "十", "百", "千", "亿", "十", "百", "千"];
        var unitDot = ['角','分'];
        var html = '<div class="number-zoom">';
        for (var i = zheng.length; i >= 0; i--) {
            var n = zheng.charAt(zheng.length - 1 - i);
            html += '<div class="number-zoom-unit"><span class="number-zoom-cn">'+(i === zheng.length && negative ? '负' : unit[i])+'</span>';
            if (i === zheng.length) {
                html += '<span>￥</span>';
            } else {
                html += '<span class="number-zoom-number">'+n+'</span>';
            }
            html += '</div>';
        }
        if (ling) {
            if (ling.length) {
                html += '<div class="number-zoom-sep"></div>';
            }
            for (var j = 0; j < ling.length ; j++) {
                var m = ling.charAt(j);
                html += '<div class="number-zoom-unit"><span class="number-zoom-cn">'+unitDot[j]+'</span>';
                html += '<span class="number-zoom-number">'+m+'</span>';
                html += '</div>';
            }
        }
        html += '</div>';
        return html;
    },
    _dealPrice : function(money){
        var ling, origin;
        var self = this;
        var $target = self.get('$target');
        //去掉逗号分隔符
        money = money.replace(/,/g,'');
        origin = money; //记录下此时的money
        money = origin < 0 ? money.substr(1) : money;
        ling = money.split('.')[1] || '';
        if (ling.length > 2) {
            money = parseFloat(Number(money)).toFixed(2);
        }
        //写入target
        $target.val(self._addCommas(origin < 0 ? '-' + money : money));

        return money.split('.');
    },
    /**
     * 转换成带逗号分割的字符串
     * @return {String}
     */
    _addCommas:function(num){
        if(!num){
            return '';
        }
        var negative = num < 0 ? '-' : '';
        num = num < 0 ? num.toString().substr(1) : num.toString();
        var arr = num.split('.');
        var before = arr[0],
            after = arr.length > 1 ? '.' + arr[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(before)) {
            before = before.replace(rgx, '$1' + ',' + '$2');
        }
        return negative + before + after;
    }
},{
    ATTRS:{
        $target:{
            value:'',
            getter:function(v){
                return $(v);
            }
        },
        //当设置为false，不会自动隐藏
        autoHideTime:{
            value: false
        },
        //自动格式化价格
        autoFormat:{
            value: true
        },
        //最大长度
        maxLen:{
            value: ''
        },
        tpl:{
            value: ''
        },
        //弹出层实例
        popup:{
            value:''
        },
        //对齐方式，默认顶上对齐
        align:{
            value:'top'
        },
        prefixCls:{
            value:'number-zoom-'
        },
        filter:{value:''}
    }
});

module.exports = NumberZoom;


/*
 * 1.1.2 by yuesong
 * 1.增加对负数的支持
 *
 * 1.1.1 by yuesong
 * 1.有bug，勿用
 *
 * 1.1.0 by yuesong
 * 1.弃用section
 * 
 * 1.0.4 by yuesong
 * 1.自动格式化价格
 * 2.支持角和分，现在最大的位数是17了
 * 
 *  1.0.3 by yuesong
 * 1.输入框输入非数字时不显示
 * 2.输入框最大位数为11位（最大支持百亿级别）
 */