KISSY.add('kg/number-zoom/1.1.2/index',["node","base","overlay"],function(S ,require, exports, module) {var e=require("node").all,t=require("base"),a=require("overlay"),n=t.extend({initializer:function(){var e=this,t=e.get("$target");t.on("focusin valuechange",function(t){var a=e.get("popup"),n=S.trim(t.target.value);n.length>0&&Number(n.replace(/,/g,""))>0?(e.set("maxLen",e.get("autoFormat")?14:11),e.set("maxLen",n.indexOf(".")>-1?17:14),e.show()):a&&a.hide()}),t.on("focusout",function(){var t=e.get("popup");t&&t.set("visible",!1)}),e._dealPrice(t.val())},show:function(e){var t=this,n=t.get("$target");e=e||S.trim(n.val()),t.get("filter")&&(e=t.get("filter")(e));var r=t.get("maxLen");e.length>r&&(e=e.substr(0,r));var l=t._html(e),i=t.get("popup");if(i){var o=i.$el;o.all(".number-zoom-overlay-content").html(l)}else{{t.get("width")&&t.get("width")||n.outerWidth()}i=new a({prefixCls:t.get("prefixCls"),content:l,closable:!1,effect:{effect:"fade",duration:.3}}),t.set("popup",i),i.render()}i.set("visible",!0),i.align(n,"top"==t.get("align")&&["tl","bl"]||["bl","tl"])},hide:function(){var e=this,t=e.get("popup");t&&t.set("visible",!1)},_html:function(e){for(var t=this,a=t._dealPrice(e),n=a[0],r=a[1],l=["元","十","百","千","万","十","百","千","亿","十","百","千"],i=["角","分"],o='<div class="number-zoom">',s=n.length;s>=0;s--){var u=n.charAt(n.length-1-s);o+='<div class="number-zoom-unit"><span class="number-zoom-cn">'+l[s]+"</span>",o+=s===n.length?"<span>￥</span>":'<span class="number-zoom-number">'+u+"</span>",o+="</div>"}if(r){r.length&&(o+='<div class="number-zoom-sep"></div>');for(var p=0;p<r.length;p++){var v=r.charAt(p);o+='<div class="number-zoom-unit"><span class="number-zoom-cn">'+i[p]+"</span>",o+='<span class="number-zoom-number">'+v+"</span>",o+="</div>"}}return o+="</div>"},_dealPrice:function(e){var t,a=this,n=a.get("$target");return e=e.replace(/,/g,""),t=e.split(".")[1]||"",t.length>2&&(e=parseFloat(Number(e)).toFixed(2)),n.val(a._addCommas(e)),e.split(".")},_addCommas:function(e){if(!e)return"";e+="";for(var t=e.split("."),a=t[0],n=t.length>1?"."+t[1]:"",r=/(\d+)(\d{3})/;r.test(a);)a=a.replace(r,"$1,$2");return a+n}},{ATTRS:{$target:{value:"",getter:function(t){return e(t)}},autoHideTime:{value:!1},autoFormat:{value:!0},maxLen:{value:""},tpl:{value:""},popup:{value:""},align:{value:"top"},prefixCls:{value:"number-zoom-"},filter:{value:""}}});module.exports=n;});