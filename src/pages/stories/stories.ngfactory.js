/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
import * as i0 from "@angular/core";
import * as i1 from "../../../node_modules/ionic-angular/umd/components/item/item.ngfactory";
import * as i2 from "ionic-angular/umd/components/item/item";
import * as i3 from "ionic-angular/umd/util/form";
import * as i4 from "ionic-angular/umd/config/config";
import * as i5 from "ionic-angular/umd/components/item/item-reorder";
import * as i6 from "ionic-angular/umd/components/item/item-content";
import * as i7 from "ionic-angular/umd/components/thumbnail/thumbnail";
import * as i8 from "ionic-angular/umd/components/list/list";
import * as i9 from "ionic-angular/umd/platform/platform";
import * as i10 from "ionic-angular/umd/gestures/gesture-controller";
import * as i11 from "ionic-angular/umd/platform/dom-controller";
import * as i12 from "ionic-angular/umd/components/typography/typography";
import * as i13 from "@angular/common";
import * as i14 from "ionic-angular/umd/components/card/card";
import * as i15 from "ionic-angular/umd/components/card/card-content";
import * as i16 from "ionic-angular/umd/components/toolbar/toolbar-header";
import * as i17 from "ionic-angular/umd/navigation/view-controller";
import * as i18 from "../../../node_modules/ionic-angular/umd/components/toolbar/toolbar.ngfactory";
import * as i19 from "ionic-angular/umd/components/toolbar/toolbar";
import * as i20 from "ionic-angular/umd/components/menu/menu-toggle";
import * as i21 from "ionic-angular/umd/components/app/menu-controller";
import * as i22 from "ionic-angular/umd/components/button/button";
import * as i23 from "ionic-angular/umd/components/toolbar/navbar";
import * as i24 from "ionic-angular/umd/components/toolbar/toolbar-item";
import * as i25 from "ionic-angular/umd/components/icon/icon";
import * as i26 from "../../../node_modules/ionic-angular/umd/components/toolbar/toolbar-title.ngfactory";
import * as i27 from "ionic-angular/umd/components/toolbar/toolbar-title";
import * as i28 from "../../../node_modules/ionic-angular/umd/components/content/content.ngfactory";
import * as i29 from "ionic-angular/umd/components/content/content";
import * as i30 from "ionic-angular/umd/components/app/app";
import * as i31 from "ionic-angular/umd/platform/keyboard";
import * as i32 from "ionic-angular/umd/navigation/nav-controller";
import * as i33 from "./stories";
import * as i34 from "../../app/horoscope.service";
import * as i35 from "ionic-angular/umd/components/alert/alert-controller";
import * as i36 from "ionic-angular/umd/components/loading/loading-controller";
var styles_StoriesPage = [];
var RenderType_StoriesPage = i0.ɵcrt({ encapsulation: 2, styles: styles_StoriesPage, data: {} });
export { RenderType_StoriesPage as RenderType_StoriesPage };
function View_StoriesPage_2(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 13, "ion-item", [["class", "item item-block"]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.detail(_v.context.$implicit) !== false);
        ad = (pd_0 && ad);
    } return ad; }, i1.View_Item_0, i1.RenderType_Item)), i0.ɵdid(1, 1097728, null, 3, i2.Item, [i3.Form, i4.Config, i0.ElementRef, i0.Renderer, [2, i5.ItemReorder]], null, null), i0.ɵqud(335544320, 2, { contentLabel: 0 }), i0.ɵqud(603979776, 3, { _buttons: 1 }), i0.ɵqud(603979776, 4, { _icons: 1 }), i0.ɵdid(5, 16384, null, 0, i6.ItemContent, [], null, null), (_l()(), i0.ɵeld(6, 0, null, 4, 2, "ion-thumbnail", [["item-right", ""]], null, null, null, null, null)), i0.ɵdid(7, 16384, null, 0, i7.Thumbnail, [], null, null), (_l()(), i0.ɵeld(8, 0, null, null, 0, "img", [], [[8, "src", 4]], null, null, null, null)), (_l()(), i0.ɵeld(9, 0, null, 2, 1, "span", [["class", "category"]], null, null, null, null, null)), (_l()(), i0.ɵted(10, null, ["", ""])), (_l()(), i0.ɵeld(11, 0, null, 2, 2, "h2", [["class", "title"]], null, null, null, null, null)), (_l()(), i0.ɵeld(12, 0, null, null, 1, "b", [], null, null, null, null, null)), (_l()(), i0.ɵted(13, null, ["", ""]))], null, function (_ck, _v) { var currVal_0 = _v.context.$implicit.image; _ck(_v, 8, 0, currVal_0); var currVal_1 = _v.context.$implicit.pubDate; _ck(_v, 10, 0, currVal_1); var currVal_2 = _v.context.$implicit.title; _ck(_v, 13, 0, currVal_2); }); }
function View_StoriesPage_1(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 5, "ion-list", [["text-wrap", ""]], null, null, null, null, null)), i0.ɵdid(1, 16384, null, 0, i8.List, [i4.Config, i0.ElementRef, i0.Renderer, i9.Platform, i10.GestureController, i11.DomController], null, null), (_l()(), i0.ɵeld(2, 0, null, null, 1, "p", [["class", "info"], ["color", "primary"], ["ion-text", ""]], [[8, "innerHTML", 1]], null, null, null, null)), i0.ɵdid(3, 16384, null, 0, i12.Typography, [i4.Config, i0.ElementRef, i0.Renderer], { color: [0, "color"] }, null), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_StoriesPage_2)), i0.ɵdid(5, 278528, null, 0, i13.NgForOf, [i0.ViewContainerRef, i0.TemplateRef, i0.IterableDiffers], { ngForOf: [0, "ngForOf"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_1 = "primary"; _ck(_v, 3, 0, currVal_1); var currVal_2 = _co.articles; _ck(_v, 5, 0, currVal_2); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.info; _ck(_v, 2, 0, currVal_0); }); }
function View_StoriesPage_4(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 17, "ion-card", [], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.detail(_v.context.$implicit) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), i0.ɵdid(1, 16384, null, 0, i14.Card, [i4.Config, i0.ElementRef, i0.Renderer], null, null), (_l()(), i0.ɵeld(2, 0, null, null, 10, "ion-item", [["class", "item item-block"]], null, null, null, i1.View_Item_0, i1.RenderType_Item)), i0.ɵdid(3, 1097728, null, 3, i2.Item, [i3.Form, i4.Config, i0.ElementRef, i0.Renderer, [2, i5.ItemReorder]], null, null), i0.ɵqud(335544320, 5, { contentLabel: 0 }), i0.ɵqud(603979776, 6, { _buttons: 1 }), i0.ɵqud(603979776, 7, { _icons: 1 }), i0.ɵdid(7, 16384, null, 0, i6.ItemContent, [], null, null), (_l()(), i0.ɵeld(8, 0, null, 2, 1, "span", [["class", "positive"]], null, null, null, null, null)), (_l()(), i0.ɵted(-1, null, ["Astrology"])), (_l()(), i0.ɵeld(10, 0, null, 2, 2, "h2", [["class", "title"]], null, null, null, null, null)), (_l()(), i0.ɵeld(11, 0, null, null, 1, "b", [], null, null, null, null, null)), (_l()(), i0.ɵted(12, null, ["", ""])), (_l()(), i0.ɵeld(13, 0, null, null, 4, "ion-card-content", [], null, null, null, null, null)), i0.ɵdid(14, 16384, null, 0, i15.CardContent, [i4.Config, i0.ElementRef, i0.Renderer], null, null), (_l()(), i0.ɵeld(15, 0, null, null, 0, "img", [["class", "img-card"]], [[8, "src", 4]], null, null, null, null)), (_l()(), i0.ɵeld(16, 0, null, null, 1, "p", [["class", "details"]], null, null, null, null, null)), (_l()(), i0.ɵted(17, null, ["", ""]))], null, function (_ck, _v) { var currVal_0 = _v.context.$implicit.title; _ck(_v, 12, 0, currVal_0); var currVal_1 = _v.context.$implicit.image; _ck(_v, 15, 0, currVal_1); var currVal_2 = _v.context.$implicit.content; _ck(_v, 17, 0, currVal_2); }); }
function View_StoriesPage_3(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 3, "ion-list", [], null, null, null, null, null)), i0.ɵdid(1, 16384, null, 0, i8.List, [i4.Config, i0.ElementRef, i0.Renderer, i9.Platform, i10.GestureController, i11.DomController], null, null), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_StoriesPage_4)), i0.ɵdid(3, 278528, null, 0, i13.NgForOf, [i0.ViewContainerRef, i0.TemplateRef, i0.IterableDiffers], { ngForOf: [0, "ngForOf"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.articles; _ck(_v, 3, 0, currVal_0); }, null); }
export function View_StoriesPage_0(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 12, "ion-header", [], null, null, null, null, null)), i0.ɵdid(1, 16384, null, 0, i16.Header, [i4.Config, i0.ElementRef, i0.Renderer, [2, i17.ViewController]], null, null), (_l()(), i0.ɵeld(2, 0, null, null, 10, "ion-toolbar", [["class", "toolbar"]], [[2, "statusbar-padding", null]], null, null, i18.View_Toolbar_0, i18.RenderType_Toolbar)), i0.ɵdid(3, 49152, null, 0, i19.Toolbar, [i4.Config, i0.ElementRef, i0.Renderer], null, null), (_l()(), i0.ɵeld(4, 0, null, 0, 5, "ion-button", [["left", ""], ["menuToggle", ""]], [[8, "hidden", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; if (("click" === en)) {
        var pd_0 = (i0.ɵnov(_v, 5).toggle() !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), i0.ɵdid(5, 1064960, null, 0, i20.MenuToggle, [i21.MenuController, [2, i17.ViewController], [2, i22.Button], [2, i23.Navbar]], { menuToggle: [0, "menuToggle"] }, null), i0.ɵdid(6, 16384, null, 1, i24.ToolbarItem, [i4.Config, i0.ElementRef, i0.Renderer, [2, i19.Toolbar], [2, i23.Navbar]], null, null), i0.ɵqud(603979776, 1, { _buttons: 1 }), (_l()(), i0.ɵeld(8, 0, null, null, 1, "ion-icon", [["name", "menu"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), i0.ɵdid(9, 147456, null, 0, i25.Icon, [i4.Config, i0.ElementRef, i0.Renderer], { name: [0, "name"] }, null), (_l()(), i0.ɵeld(10, 0, null, 3, 2, "ion-title", [], null, null, null, i26.View_ToolbarTitle_0, i26.RenderType_ToolbarTitle)), i0.ɵdid(11, 49152, null, 0, i27.ToolbarTitle, [i4.Config, i0.ElementRef, i0.Renderer, [2, i19.Toolbar], [2, i23.Navbar]], null, null), (_l()(), i0.ɵeld(12, 0, null, 0, 0, "img", [["alt", "logo"], ["height", "24"], ["src", "https://78.media.tumblr.com/f068e2426e16157aba924763fabd6234/tumblr_pbdnjgGRLE1xp0noco1_250.png"]], null, null, null, null, null)), (_l()(), i0.ɵeld(13, 0, null, null, 5, "ion-content", [["padding", ""]], [[2, "statusbar-padding", null], [2, "has-refresher", null]], null, null, i28.View_Content_0, i28.RenderType_Content)), i0.ɵdid(14, 4374528, null, 0, i29.Content, [i4.Config, i9.Platform, i11.DomController, i0.ElementRef, i0.Renderer, i30.App, i31.Keyboard, i0.NgZone, [2, i17.ViewController], [2, i32.NavController]], null, null), (_l()(), i0.ɵand(16777216, null, 1, 1, null, View_StoriesPage_1)), i0.ɵdid(16, 16384, null, 0, i13.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵand(16777216, null, 1, 1, null, View_StoriesPage_3)), i0.ɵdid(18, 16384, null, 0, i13.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_2 = ""; _ck(_v, 5, 0, currVal_2); var currVal_4 = "menu"; _ck(_v, 9, 0, currVal_4); var currVal_7 = (_co.mode === "list"); _ck(_v, 16, 0, currVal_7); var currVal_8 = (_co.mode === "card"); _ck(_v, 18, 0, currVal_8); }, function (_ck, _v) { var currVal_0 = i0.ɵnov(_v, 3)._sbPadding; _ck(_v, 2, 0, currVal_0); var currVal_1 = i0.ɵnov(_v, 5).isHidden; _ck(_v, 4, 0, currVal_1); var currVal_3 = i0.ɵnov(_v, 9)._hidden; _ck(_v, 8, 0, currVal_3); var currVal_5 = i0.ɵnov(_v, 14).statusbarPadding; var currVal_6 = i0.ɵnov(_v, 14)._hasRefresher; _ck(_v, 13, 0, currVal_5, currVal_6); }); }
export function View_StoriesPage_Host_0(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, "page-stories", [], null, null, null, View_StoriesPage_0, RenderType_StoriesPage)), i0.ɵdid(1, 49152, null, 0, i33.StoriesPage, [i32.NavController, i34.HoroscopeService, i35.AlertController, i36.LoadingController], null, null)], null, null); }
var StoriesPageNgFactory = i0.ɵccf("page-stories", i33.StoriesPage, View_StoriesPage_Host_0, {}, {}, []);
export { StoriesPageNgFactory as StoriesPageNgFactory };
//# sourceMappingURL=stories.ngfactory.js.map