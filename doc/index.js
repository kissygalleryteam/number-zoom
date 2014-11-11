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
            var str= S.trim($target.val());
            if(str.length >0 ){
                self.show();
            }else{
                popup && popup.hide();
            }
        });
        $target.on('focusout',function(){
            var popup = self.get('popup');
            popup && popup.set('visible',false);
        })
    },
    show: function(price){
        var self = this;
        var $target = self.get('$target');
        price = price || S.trim($target.val());
        if(self.get('filter')) price = self.get('filter')(price);
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
    //获取弹出层的html结构
    _html : function(money){
        var unit = ["元", "十", "百", "千", "万", "十", "百", "千", "亿", "十", "百", "千"];
        var html = '<section class="number-zoom">';
        for (var i = money.length; i >= 0; i--) {
            var n = money.charAt(money.length - 1 - i);
            html += '<div class="number-zoom-unit"><span class="number-zoom-cn">'+unit[i]+'</span>';
            if (i === money.length) {
                html += '<span>￥</span>';
            } else {
                html += '<span class="number-zoom-number">'+n+'</span>';
            }
            html += '</div>';
        }
        html += '</section>';
        return html;
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



