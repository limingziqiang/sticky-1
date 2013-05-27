define("arale/sticky/1.1.0/sticky",["$","arale/events/1.1.0/events","./utils"],function(e,t,i){function o(e){var t=this;t.options=e}function r(e){var t=this;t.options=e}function n(e,t){var i=p.checkPositionStickySupported()?r:o;return new i({element:e,marginTop:t})}var s=e("$"),d=e("arale/events/1.1.0/events"),p=e("./utils"),a=s(document);d.mixTo(o),o.prototype.render=function(){var e=this,t=e.elem=s(e.options.element);if(t.length&&!t.data("bind-fixed")){e._originTop=t.offset().top,e.marginTop=s.isNumeric(e.options.marginTop)?Math.min(e.options.marginTop,e._originTop):e._originTop,e._originStyles={position:null,top:null};for(var i in e._originStyles)e._originStyles.hasOwnProperty(i)&&(e._originStyles[i]=t.css(i));var o=p.checkPositionFixedSupported(),r=o?s.proxy(e._supportFixed,e):s.proxy(e._supportAbsolute,e);if(r(),o)s(window).on("scroll",function(){t.is(":visible")&&r()});else{var n=null;s(window).on("scroll",function(){n&&clearTimeout(n),n=setTimeout(function(){t.is(":visible")&&(r(),n=null)},100)})}return t.data("bind-fixed",!0),e}},o.prototype._supportFixed=function(){var e=this,t=e.elem,i=e._originTop,o=e.marginTop,r=i-a.scrollTop();!t.data("_fixed")&&o>=r?(e._addPlaceholder(),t.css({position:"fixed",top:o}),t.data("_fixed",!0),e.trigger("stick",t)):t.data("_fixed")&&r>o&&e._restore()},o.prototype._supportAbsolute=function(){var e=this,t=e.elem,i=e._originTop,o=e.marginTop,r=i-a.scrollTop();o>=r?(e._addPlaceholder(),t.css({position:"absolute",top:o+a.scrollTop()}),t.data("_fixed",!0),e.trigger("stick",t)):t.data("_fixed")&&r>o&&e._restore()},o.prototype._restore=function(){var e=this,t=e.elem;e._removePlaceholder(),t.css(e._originStyles),t.data("_fixed",!1),e.trigger("restored",t)},o.prototype._addPlaceholder=function(){var e=this,t=e.elem,i=!1,o=t.css("float"),r=t.css("position"),n=t.css("display");-1!==p.indexOf(["static","relative"],r)&&(i=!0),"block"!==n&&(i=!1),i&&(e._placeholder=s('<div style="visibility: hidden;margin:0;padding:0;"></div>'),e._placeholder.width(t.outerWidth(!0)).height(t.outerHeight(!0)).css("float",o).insertAfter(t))},o.prototype._removePlaceholder=function(){var e=this;e._placeholder&&e._placeholder.remove()},o.prototype.destory=function(){var e=this;e.off(),e._removePlaceholder()},d.mixTo(r),r.prototype.render=function(){var e=this,t=e.elem=s(e.options.element),i="";if(t.length&&!t.data("bind-fixed")){e._originTop=t.offset().top,e.marginTop=s.isNumeric(e.options.marginTop)?Math.min(e.options.marginTop,e._originTop):e._originTop;for(var o=0;p.stickyPrefix.length>o;o++)i+="position:"+p.stickyPrefix[o]+"sticky;";return t[0].style.cssText+=i+"top: "+e.marginTop+"px;",e._supportSticky(),s(window).on("scroll",function(){t.is(":visible")&&e._supportSticky()}),t.data("bind-fixed",!0),e}},r.prototype._supportSticky=function(){var e=this,t=e.elem,i=e._originTop,o=e.marginTop,r=i-a.scrollTop();!t.data("_fixed")&&o>=r?(t.data("_fixed",!0),e.trigger("stick",t)):t.data("_fixed")&&r>o&&(t.data("_fixed",!1),e.trigger("restored",t))},r.prototype.destory=function(){this.off()},n.stick=n,n.fix=function(e){return new o({element:e}).render()},n.utils=p,i.exports=n}),define("arale/sticky/1.1.0/utils",["$"],function(e){var t=(e("$"),document),i=["-webkit-","-ms-","-o-","-moz-",""],o=(window.navigator.userAgent||"").toLowerCase(),r=-1!==o.indexOf("msie"),n=-1!==o.indexOf("msie 6");return{checkPositionFixedSupported:function(){if(n)return!1;var e,t=document.createElement("div"),i=t.cloneNode(!1),o=document.body,r=o.style.cssText;return o.style.cssText="padding:0;margin:0",t.style.cssText="position:fixed;top:42px",o.appendChild(t),o.appendChild(i),e=t.offsetTop!==i.offsetTop,t.parentNode.removeChild(t),i.parentNode.removeChild(i),o.style.cssText=r,e},checkPositionStickySupported:function(){if(r)return!1;var e=t.body;if(t.createElement&&e&&e.appendChild&&e.removeChild){var o,n=t.createElement("div"),s=function(e){return window.getComputedStyle?window.getComputedStyle(n).getPropertyValue(e):n.currentStyle.getAttribute(e)};e.appendChild(n);for(var d=0;i.length>d&&(n.style.cssText="position:"+i[d]+"sticky;visibility:hidden;",!(o=-1!==s("position").indexOf("sticky")));d++);return n.parentNode.removeChild(n),o}return!1},indexOf:function(e,t){if(null==e)return-1;var i=Array.prototype.indexOf;if(i&&e.indexOf===i)return e.indexOf(t);for(var o=0;e.length>o;o++)if(e[o]===t)return o;return-1},stickyPrefix:i}});
