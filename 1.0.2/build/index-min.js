KISSY.add('kg/number-zoom/1.0.2/index',["node","base","overlay"],function(S ,require, exports, module) {var e=require("node").all,t=require("base"),n=require("overlay"),l=t.extend({initializer:function(){var e=this,t=e.get("$target");t.on("focusin valuechange",function(){var n=e.get("popup"),l=S.trim(t.val());l.length>0?e.show():n&&n.hide()}),t.on("focusout",function(){var t=e.get("popup");t&&t.set("visible",!1)})},show:function(e){var t=this,l=t.get("$target");e=e||S.trim(l.val()),t.get("filter")&&(e=t.get("filter")(e));var i=t._html(e),r=t.get("popup");if(r){var a=r.$el;a.all(".number-zoom-overlay-content").html(i)}else{{t.get("width")&&t.get("width")||l.outerWidth()}r=new n({prefixCls:t.get("prefixCls"),content:i,closable:!1,effect:{effect:"fade",duration:.3}}),t.set("popup",r),r.render()}r.set("visible",!0),r.align(l,"top"==t.get("align")&&["tl","bl"]||["bl","tl"])},hide:function(){var e=this,t=e.get("popup");t&&t.set("visible",!1)},_html:function(e){e=e.replace(",",""),e=e.split(".")[0];for(var t=["元","十","百","千","万","十","百","千","亿","十","百","千"],n='<section class="number-zoom">',l=e.length;l>=0;l--){var i=e.charAt(e.length-1-l);n+='<div class="number-zoom-unit"><span class="number-zoom-cn">'+t[l]+"</span>",n+=l===e.length?"<span>￥</span>":'<span class="number-zoom-number">'+i+"</span>",n+="</div>"}return n+="</section>"}},{ATTRS:{$target:{value:"",getter:function(t){return e(t)}},autoHideTime:{value:!1},tpl:{value:""},popup:{value:""},align:{value:"top"},prefixCls:{value:"number-zoom-"},filter:{value:""}}});module.exports=l;});