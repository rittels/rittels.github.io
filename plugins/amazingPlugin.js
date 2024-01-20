//  CODE FOR MY AIRSPACE PLUGIN

W.loadPlugin({"name":"windy-plugin-airspaces","version":"0.5.46","author":"rittels","repository":{"type":"git","url":"https://github.com/rittels/windy-plugins/tree/master/_plugins"},"description":"openAIP airspaces","displayName":"airspaces","hook":"contextmenu","className":"plugin-lhpane","classNameMobile":"plugin-mobile-bottom-slide top-border","addMobileSlider":true,"dependencies":["https://unpkg.com/windy-plugin-picker2","https://www.flymap.org.za/common_modules/infobox/infobox.js?1705762042723","https://www.flymap.org.za/common_modules/pickerTools/pickerTools.js?1705762042723","https://www.flymap.org.za/common_modules/airspaces/airspaces.js?1705762042723"],"exclusive":"lhpane"}, ['picker', 'broadcast', 'rootScope', '@plugins/windy-plugin-picker2', '@plugins/pickerTools', '@plugins/airspaces', '@plugins/infobox', 'plugins'], function(__exports, __dep_lijwupiu, bcast, rootScope, __dep_sdlgazch, __dep_qbihkbej, __dep_teuf, __dep_wpysyreok, plugins) {
var infobox = __dep_wpysyreok.infobox;
var airspaces = __dep_teuf.airspaces;
var pickerTools = __dep_qbihkbej.pickerTools;
var whichPicker = __dep_sdlgazch.whichPicker;
var emitter = __dep_lijwupiu.emitter;
var pluginsNeeded = ['infobox', 'pickerTools', 'airspaces'];
var ident;
var hasHooks = false;
function initModules() {
  airspaces === null || airspaces === void 0 ? void 0 : airspaces.appendAspListToDiv("airspace-plugin-airspace-container");
  console.log("about to remove", pickerTools.getActivePlugin(), ident);
  if (pickerTools.getActivePlugin() != ident) {
    console.log("removing");
    pickerTools.removeElements();
    pickerTools.setActivePlugin(ident);
  }
  if (pickerTools !== null && pickerTools !== void 0 && pickerTools.isOpen()) {
    pickerOpenOrMoved(pickerTools.getParams());
  }
  if (infobox) ibox = infobox("<div id='open-airspace-plugin' style='display:inline-block; padding:3px; background-color:rgba(0,0,0,0.5); border:1px solid black; border-radius:4px'>Show Airspaces</div>", "open-airspace-plugin", ident, true);
}
var everythingMounted = Promise;
var onmount = function onmount(node, refs) {
  ident = node.id;
  everythingMounted = Promise.all(pluginsNeeded.map(function (p) {
    return plugins[p].open();
  })).then(function () {
    initModules();
    if (hasHooks) return;
    emitter.on('pickerOpened', pickerOpenOrMoved);
    emitter.on('pickerMoved', pickerOpenOrMoved);
    emitter.on('pickerClosed', airspaces.clearAsp);
    pickerTools.drag(pickerOpenOrMoved, 350);
    bcast.on("pluginOpened", onPluginOpened);
    initModules();
    hasHooks = true;
    return;
  });
};
var onopen = function onopen(params) {
  if (params.query) {
    everythingMounted.then(function () {
      console.log("everthing now mounted after open,   the params can now be used");
      airspaces.getCountries().then(function (cs) {
        var _loop = function _loop() {
          var queryAsp = "_" + params.query[p].toLowerCase();
          var ix = cs.findIndex(function (c) {
            return c.name.includes(queryAsp);
          });
          if (ix >= 0) airspaces.fetchAsp(ix);
        };
        for (var p in params.query) {
          _loop();
        }
      });
    });
  }
};
var ondestroy = function ondestroy(message) {
  console.log(message);
  if (!message || !message.ev) return;
  console.log("close completely");
  bcast.fire("rqstClose", "pickerTools");
  bcast.fire("rqstClose", "infobox");
  emitter.off("pickerOpened", pickerOpenOrMoved);
  emitter.off("pickerMoved", pickerOpenOrMoved);
  pickerTools.dragOff(pickerOpenOrMoved);
  bcast.on("pluginOpened", onPluginOpened);
  airspaces.removeAllAsp();
  hasHooks = false;
};
function onPluginOpened(p) {
  if (p.includes("windy-plugin") && p !== ident) {
    airspaces.clearAsp();
  }
}
function pickerOpenOrMoved(c) {
  if (!c) return;
  if (pickerTools.getActivePlugin() != ident) {
    console.log("not active plugin, but:  ", pickerTools.getActivePlugin());
    return;
  }
  pickerTools[whichPicker() == 'picker-mobile' ? 'fillLeftDiv' : 'fillRightDiv'](airspaces.findAsp(c).txt);
}

__exports.ondestroy = ondestroy;
__exports.onmount = onmount;
__exports.onopen = onopen;
},
'<div class="mobile-header" style="pointer-events:auto"><div class="mh-closing-x iconfont clickable" onclick="W.plugins[\'windy-plugin-airspaces\'].close()">}</div>openAIP Airspaces:</div><div id="airspace-plugin-airspace-container" class="plugin-content" style="overflow-y:hidden"></div><div class="closing-x collapse-pane" onclick="W.plugins[this.parentElement.id].close()"></div>',
'.onwindy-plugin-airspaces .left-border{left:300px}.onwindy-plugin-airspaces #search{display:none}.onwindy-plugin-airspaces.moooving .shy{opacity:.5 !important}#device-mobile .onwindy-plugin-airspaces #map-container{transform:scale(.97) translateY(34px);border-radius:10px;transform-origin:top center}#device-mobile .onwindy-plugin-airspaces #plugin-picker-mobile{display:none !important}#device-mobile .onwindy-plugin-airspaces #search,#device-tablet .onwindy-plugin-airspaces #search,#device-mobile .onwindy-plugin-airspaces #share,#device-tablet .onwindy-plugin-airspaces #share,#device-mobile .onwindy-plugin-airspaces #open-in-app,#device-tablet .onwindy-plugin-airspaces #open-in-app,#device-mobile .onwindy-plugin-airspaces #logo-wrapper,#device-tablet .onwindy-plugin-airspaces #logo-wrapper,#device-mobile .onwindy-plugin-airspaces #go-premium-mobile,#device-tablet .onwindy-plugin-airspaces #go-premium-mobile{display:none !important}.onwindy-plugin-airspaces #open-in-app{display:none}#windy-plugin-airspaces{position:absolute;width:300px;height:100%}#windy-plugin-airspaces .plugin-content{border-radius:5px;margin:1px;color:white;background-color:rgba(0,0,0,0.7)}#windy-plugin-airspaces .closing-x.collapse-pane{top:50px}#windy-plugin-airspaces .closing-x.collapse-pane::before{content:"}";position:relative;top:-2px}#device-mobile #windy-plugin-airspaces .closing-x.collapse-pane{top:-3px;right:25px}#device-mobile #bottom{left:0px !important}#device-tablet #logo{left:100%;margin-left:150px}#open-in-app{display:none}');
