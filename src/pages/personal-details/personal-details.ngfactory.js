/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
import * as i0 from "@angular/core";
import * as i1 from "ionic-angular/umd/components/card/card";
import * as i2 from "ionic-angular/umd/config/config";
import * as i3 from "ionic-angular/umd/components/typography/typography";
import * as i4 from "ionic-angular/umd/components/badge/badge";
import * as i5 from "../../../node_modules/ionic-angular/umd/components/button/button.ngfactory";
import * as i6 from "ionic-angular/umd/components/button/button";
import * as i7 from "ionic-angular/umd/components/toolbar/toolbar-header";
import * as i8 from "ionic-angular/umd/navigation/view-controller";
import * as i9 from "../../../node_modules/ionic-angular/umd/components/toolbar/toolbar.ngfactory";
import * as i10 from "ionic-angular/umd/components/toolbar/toolbar";
import * as i11 from "ionic-angular/umd/components/menu/menu-toggle";
import * as i12 from "ionic-angular/umd/components/app/menu-controller";
import * as i13 from "ionic-angular/umd/components/toolbar/navbar";
import * as i14 from "ionic-angular/umd/components/toolbar/toolbar-item";
import * as i15 from "ionic-angular/umd/components/icon/icon";
import * as i16 from "../../../node_modules/ionic-angular/umd/components/toolbar/toolbar-title.ngfactory";
import * as i17 from "ionic-angular/umd/components/toolbar/toolbar-title";
import * as i18 from "../../../node_modules/ionic-angular/umd/components/content/content.ngfactory";
import * as i19 from "ionic-angular/umd/components/content/content";
import * as i20 from "ionic-angular/umd/platform/platform";
import * as i21 from "ionic-angular/umd/platform/dom-controller";
import * as i22 from "ionic-angular/umd/components/app/app";
import * as i23 from "ionic-angular/umd/platform/keyboard";
import * as i24 from "ionic-angular/umd/navigation/nav-controller";
import * as i25 from "@angular/common";
import * as i26 from "ionic-angular/umd/components/list/list";
import * as i27 from "ionic-angular/umd/gestures/gesture-controller";
import * as i28 from "@angular/forms";
import * as i29 from "../../../node_modules/ionic-angular/umd/components/item/item.ngfactory";
import * as i30 from "ionic-angular/umd/components/item/item";
import * as i31 from "ionic-angular/umd/util/form";
import * as i32 from "ionic-angular/umd/components/item/item-reorder";
import * as i33 from "ionic-angular/umd/components/item/item-content";
import * as i34 from "ionic-angular/umd/components/label/label";
import * as i35 from "../../../node_modules/ionic-angular/umd/components/datetime/datetime.ngfactory";
import * as i36 from "ionic-angular/umd/components/datetime/datetime";
import * as i37 from "ionic-angular/umd/components/picker/picker-controller";
import * as i38 from "../../../node_modules/ionic-angular/umd/components/input/input.ngfactory";
import * as i39 from "ionic-angular/umd/components/input/input";
import * as i40 from "./personal-details";
import * as i41 from "ionic-angular/umd/navigation/nav-params";
import * as i42 from "ionic-angular/umd/components/modal/modal-controller";
import * as i43 from "../../app/share.service";
import * as i44 from "../../app/horoscope.service";
import * as i45 from "@ionic-native/device";
import * as i46 from "@ionic-native/in-app-purchase-2";
var styles_PersonalDetailsPage = [];
var RenderType_PersonalDetailsPage = i0.ɵcrt({ encapsulation: 2, styles: styles_PersonalDetailsPage, data: {} });
export { RenderType_PersonalDetailsPage as RenderType_PersonalDetailsPage };
function View_PersonalDetailsPage_1(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 6, "ion-card", [], null, null, null, null, null)), i0.ɵdid(1, 16384, null, 0, i1.Card, [i2.Config, i0.ElementRef, i0.Renderer], null, null), (_l()(), i0.ɵeld(2, 0, null, null, 0, "img", [["src", "https://66.media.tumblr.com/e0822e2ae927b41ef9199c67b0d8ece1/tumblr_pgt7oisucw1xp0noco1_540.png"]], null, null, null, null, null)), (_l()(), i0.ɵeld(3, 0, null, null, 3, "div", [["class", "adv"]], null, null, null, null, null)), (_l()(), i0.ɵted(-1, null, [" Astrologers can make your own App for just Rs. 999. "])), (_l()(), i0.ɵeld(5, 0, null, null, 1, "span", [["class", "more"], ["tappable", ""]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.more() !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), i0.ɵted(-1, null, ["Know more.."]))], null, null); }
function View_PersonalDetailsPage_2(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 24, "div", [["padding", ""]], null, null, null, null, null)), (_l()(), i0.ɵeld(1, 0, null, null, 6, "p", [["class", "adtxt1"], ["ion-text", ""]], null, null, null, null, null)), i0.ɵdid(2, 16384, null, 0, i3.Typography, [i2.Config, i0.ElementRef, i0.Renderer], null, null), (_l()(), i0.ɵted(-1, null, ["You have used up your "])), (_l()(), i0.ɵeld(4, 0, null, null, 2, "ion-badge", [["color", "secondary"]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.morecred() !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), i0.ɵdid(5, 16384, null, 0, i4.Badge, [i2.Config, i0.ElementRef, i0.Renderer], { color: [0, "color"] }, null), (_l()(), i0.ɵted(-1, null, ["credits"])), (_l()(), i0.ɵted(-1, null, [" Add more credits and enjoy uninterrupted service."])), (_l()(), i0.ɵeld(8, 0, null, null, 2, "button", [["full", ""], ["ion-button", ""], ["tappable", ""]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.buy5() !== false);
        ad = (pd_0 && ad);
    } return ad; }, i5.View_Button_0, i5.RenderType_Button)), i0.ɵdid(9, 1097728, null, 0, i6.Button, [[8, ""], i2.Config, i0.ElementRef, i0.Renderer], { full: [0, "full"] }, null), (_l()(), i0.ɵted(-1, 0, ["Buy 5 Credits for just Rs. 40"])), (_l()(), i0.ɵeld(11, 0, null, null, 0, "br", [], null, null, null, null, null)), (_l()(), i0.ɵeld(12, 0, null, null, 2, "button", [["full", ""], ["ion-button", ""], ["tappable", ""]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.buy() !== false);
        ad = (pd_0 && ad);
    } return ad; }, i5.View_Button_0, i5.RenderType_Button)), i0.ɵdid(13, 1097728, null, 0, i6.Button, [[8, ""], i2.Config, i0.ElementRef, i0.Renderer], { full: [0, "full"] }, null), (_l()(), i0.ɵted(-1, 0, ["Buy One for just Rs. 10"])), (_l()(), i0.ɵeld(15, 0, null, null, 0, "br", [], null, null, null, null, null)), (_l()(), i0.ɵeld(16, 0, null, null, 8, "p", [["class", "adtxt2"], ["ion-text", ""]], null, null, null, null, null)), i0.ɵdid(17, 16384, null, 0, i3.Typography, [i2.Config, i0.ElementRef, i0.Renderer], null, null), (_l()(), i0.ɵted(-1, null, ["If you are an Astrologer can "])), (_l()(), i0.ɵeld(19, 0, null, null, 2, "ion-badge", [["tappable", ""]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.more() !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), i0.ɵdid(20, 16384, null, 0, i4.Badge, [i2.Config, i0.ElementRef, i0.Renderer], null, null), (_l()(), i0.ɵted(-1, null, ["subscribe"])), (_l()(), i0.ɵted(-1, null, [" & get unlimited horoscope readings, you can also customize this App as per your choice. "])), (_l()(), i0.ɵeld(23, 0, null, null, 1, "span", [["class", "more"], ["tappable", ""]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.more() !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), i0.ɵted(-1, null, ["Know more.."]))], function (_ck, _v) { var currVal_0 = "secondary"; _ck(_v, 5, 0, currVal_0); var currVal_1 = ""; _ck(_v, 9, 0, currVal_1); var currVal_2 = ""; _ck(_v, 13, 0, currVal_2); }, null); }
function View_PersonalDetailsPage_3(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 5, "div", [["padding", ""]], null, null, null, null, null)), (_l()(), i0.ɵeld(1, 0, null, null, 1, "p", [["class", "info"], ["color", "primary"], ["ion-text", ""]], [[8, "innerHTML", 1]], null, null, null, null)), i0.ɵdid(2, 16384, null, 0, i3.Typography, [i2.Config, i0.ElementRef, i0.Renderer], { color: [0, "color"] }, null), (_l()(), i0.ɵeld(3, 0, null, null, 2, "button", [["full", ""], ["ion-button", ""], ["tappable", ""]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.save() !== false);
        ad = (pd_0 && ad);
    } return ad; }, i5.View_Button_0, i5.RenderType_Button)), i0.ɵdid(4, 1097728, null, 0, i6.Button, [[8, ""], i2.Config, i0.ElementRef, i0.Renderer], { full: [0, "full"] }, null), (_l()(), i0.ɵted(-1, 0, ["Submit"]))], function (_ck, _v) { var currVal_1 = "primary"; _ck(_v, 2, 0, currVal_1); var currVal_2 = ""; _ck(_v, 4, 0, currVal_2); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.info; _ck(_v, 1, 0, currVal_0); }); }
export function View_PersonalDetailsPage_0(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 12, "ion-header", [], null, null, null, null, null)), i0.ɵdid(1, 16384, null, 0, i7.Header, [i2.Config, i0.ElementRef, i0.Renderer, [2, i8.ViewController]], null, null), (_l()(), i0.ɵeld(2, 0, null, null, 10, "ion-toolbar", [["class", "toolbar"]], [[2, "statusbar-padding", null]], null, null, i9.View_Toolbar_0, i9.RenderType_Toolbar)), i0.ɵdid(3, 49152, null, 0, i10.Toolbar, [i2.Config, i0.ElementRef, i0.Renderer], null, null), (_l()(), i0.ɵeld(4, 0, null, 0, 5, "ion-button", [["left", ""], ["menuToggle", ""]], [[8, "hidden", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; if (("click" === en)) {
        var pd_0 = (i0.ɵnov(_v, 5).toggle() !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), i0.ɵdid(5, 1064960, null, 0, i11.MenuToggle, [i12.MenuController, [2, i8.ViewController], [2, i6.Button], [2, i13.Navbar]], { menuToggle: [0, "menuToggle"] }, null), i0.ɵdid(6, 16384, null, 1, i14.ToolbarItem, [i2.Config, i0.ElementRef, i0.Renderer, [2, i10.Toolbar], [2, i13.Navbar]], null, null), i0.ɵqud(603979776, 1, { _buttons: 1 }), (_l()(), i0.ɵeld(8, 0, null, null, 1, "ion-icon", [["name", "menu"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), i0.ɵdid(9, 147456, null, 0, i15.Icon, [i2.Config, i0.ElementRef, i0.Renderer], { name: [0, "name"] }, null), (_l()(), i0.ɵeld(10, 0, null, 3, 2, "ion-title", [], null, null, null, i16.View_ToolbarTitle_0, i16.RenderType_ToolbarTitle)), i0.ɵdid(11, 49152, null, 0, i17.ToolbarTitle, [i2.Config, i0.ElementRef, i0.Renderer, [2, i10.Toolbar], [2, i13.Navbar]], null, null), (_l()(), i0.ɵeld(12, 0, null, 0, 0, "img", [["alt", "logo"], ["height", "24"], ["src", "https://78.media.tumblr.com/f068e2426e16157aba924763fabd6234/tumblr_pbdnjgGRLE1xp0noco1_250.png"]], null, null, null, null, null)), (_l()(), i0.ɵeld(13, 0, null, null, 45, "ion-content", [], [[2, "statusbar-padding", null], [2, "has-refresher", null]], null, null, i18.View_Content_0, i18.RenderType_Content)), i0.ɵdid(14, 4374528, null, 0, i19.Content, [i2.Config, i20.Platform, i21.DomController, i0.ElementRef, i0.Renderer, i22.App, i23.Keyboard, i0.NgZone, [2, i8.ViewController], [2, i24.NavController]], null, null), (_l()(), i0.ɵand(16777216, null, 1, 1, null, View_PersonalDetailsPage_1)), i0.ɵdid(16, 16384, null, 0, i25.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵeld(17, 0, null, 1, 41, "ion-list", [["padding", ""]], null, null, null, null, null)), i0.ɵdid(18, 16384, null, 0, i26.List, [i2.Config, i0.ElementRef, i0.Renderer, i20.Platform, i27.GestureController, i21.DomController], null, null), (_l()(), i0.ɵeld(19, 0, null, null, 39, "form", [["novalidate", ""]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "submit"], [null, "reset"]], function (_v, en, $event) { var ad = true; if (("submit" === en)) {
        var pd_0 = (i0.ɵnov(_v, 21).onSubmit($event) !== false);
        ad = (pd_0 && ad);
    } if (("reset" === en)) {
        var pd_1 = (i0.ɵnov(_v, 21).onReset() !== false);
        ad = (pd_1 && ad);
    } return ad; }, null, null)), i0.ɵdid(20, 16384, null, 0, i28.ɵangular_packages_forms_forms_bh, [], null, null), i0.ɵdid(21, 540672, null, 0, i28.FormGroupDirective, [[8, null], [8, null]], { form: [0, "form"] }, null), i0.ɵprd(2048, null, i28.ControlContainer, null, [i28.FormGroupDirective]), i0.ɵdid(23, 16384, null, 0, i28.NgControlStatusGroup, [[4, i28.ControlContainer]], null, null), (_l()(), i0.ɵeld(24, 0, null, null, 14, "ion-item", [["class", "item item-block"]], null, null, null, i29.View_Item_0, i29.RenderType_Item)), i0.ɵdid(25, 1097728, null, 3, i30.Item, [i31.Form, i2.Config, i0.ElementRef, i0.Renderer, [2, i32.ItemReorder]], null, null), i0.ɵqud(335544320, 2, { contentLabel: 0 }), i0.ɵqud(603979776, 3, { _buttons: 1 }), i0.ɵqud(603979776, 4, { _icons: 1 }), i0.ɵdid(29, 16384, null, 0, i33.ItemContent, [], null, null), (_l()(), i0.ɵeld(30, 0, null, 1, 2, "ion-label", [["floating", ""]], null, null, null, null, null)), i0.ɵdid(31, 16384, [[2, 4]], 0, i34.Label, [i2.Config, i0.ElementRef, i0.Renderer, [8, ""], [8, null], [8, null], [8, null]], null, null), (_l()(), i0.ɵted(-1, null, ["Date of Birth"])), (_l()(), i0.ɵeld(33, 0, null, 3, 5, "ion-datetime", [["displayFormat", "DD/MM/YYYY HH:mm"], ["formControlName", "dob"]], [[2, "datetime-disabled", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "click"], [null, "keyup.space"]], function (_v, en, $event) { var ad = true; if (("click" === en)) {
        var pd_0 = (i0.ɵnov(_v, 34)._click($event) !== false);
        ad = (pd_0 && ad);
    } if (("keyup.space" === en)) {
        var pd_1 = (i0.ɵnov(_v, 34)._keyup() !== false);
        ad = (pd_1 && ad);
    } return ad; }, i35.View_DateTime_0, i35.RenderType_DateTime)), i0.ɵdid(34, 1228800, null, 0, i36.DateTime, [i31.Form, i2.Config, i0.ElementRef, i0.Renderer, [2, i30.Item], [2, i37.PickerController]], { displayFormat: [0, "displayFormat"] }, null), i0.ɵprd(1024, null, i28.NG_VALUE_ACCESSOR, function (p0_0) { return [p0_0]; }, [i36.DateTime]), i0.ɵdid(36, 671744, null, 0, i28.FormControlName, [[3, i28.ControlContainer], [8, null], [8, null], [6, i28.NG_VALUE_ACCESSOR], [2, i28.ɵangular_packages_forms_forms_k]], { name: [0, "name"] }, null), i0.ɵprd(2048, null, i28.NgControl, null, [i28.FormControlName]), i0.ɵdid(38, 16384, null, 0, i28.NgControlStatus, [[4, i28.NgControl]], null, null), (_l()(), i0.ɵeld(39, 0, null, null, 13, "ion-item", [["class", "item item-block"]], null, null, null, i29.View_Item_0, i29.RenderType_Item)), i0.ɵdid(40, 1097728, null, 3, i30.Item, [i31.Form, i2.Config, i0.ElementRef, i0.Renderer, [2, i32.ItemReorder]], null, null), i0.ɵqud(335544320, 5, { contentLabel: 0 }), i0.ɵqud(603979776, 6, { _buttons: 1 }), i0.ɵqud(603979776, 7, { _icons: 1 }), i0.ɵdid(44, 16384, null, 0, i33.ItemContent, [], null, null), (_l()(), i0.ɵeld(45, 0, null, 1, 2, "ion-label", [["floating", ""]], null, null, null, null, null)), i0.ɵdid(46, 16384, [[5, 4]], 0, i34.Label, [i2.Config, i0.ElementRef, i0.Renderer, [8, ""], [8, null], [8, null], [8, null]], null, null), (_l()(), i0.ɵted(-1, null, ["Place of Birth"])), (_l()(), i0.ɵeld(48, 0, null, 3, 4, "ion-input", [["formControlName", "place"], ["id", "place"], ["type", "text"]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "focusin"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("focusin" === en)) {
        var pd_0 = (_co.showAddressModal() !== false);
        ad = (pd_0 && ad);
    } return ad; }, i38.View_TextInput_0, i38.RenderType_TextInput)), i0.ɵdid(49, 671744, null, 0, i28.FormControlName, [[3, i28.ControlContainer], [8, null], [8, null], [8, null], [2, i28.ɵangular_packages_forms_forms_k]], { name: [0, "name"] }, null), i0.ɵprd(2048, null, i28.NgControl, null, [i28.FormControlName]), i0.ɵdid(51, 16384, null, 0, i28.NgControlStatus, [[4, i28.NgControl]], null, null), i0.ɵdid(52, 5423104, null, 0, i39.TextInput, [i2.Config, i20.Platform, i31.Form, i22.App, i0.ElementRef, i0.Renderer, [2, i19.Content], [2, i30.Item], [2, i28.NgControl], i21.DomController], { type: [0, "type"] }, null), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_PersonalDetailsPage_2)), i0.ɵdid(54, 16384, null, 0, i25.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_PersonalDetailsPage_3)), i0.ɵdid(56, 16384, null, 0, i25.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵeld(57, 0, null, null, 1, "p", [["class", "info"], ["color", "primary"], ["ion-text", ""]], [[8, "innerHTML", 1]], null, null, null, null)), i0.ɵdid(58, 16384, null, 0, i3.Typography, [i2.Config, i0.ElementRef, i0.Renderer], { color: [0, "color"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_2 = ""; _ck(_v, 5, 0, currVal_2); var currVal_4 = "menu"; _ck(_v, 9, 0, currVal_4); var currVal_7 = _co.showASU; _ck(_v, 16, 0, currVal_7); var currVal_15 = _co.personalDetailsForm; _ck(_v, 21, 0, currVal_15); var currVal_24 = "DD/MM/YYYY HH:mm"; _ck(_v, 34, 0, currVal_24); var currVal_25 = "dob"; _ck(_v, 36, 0, currVal_25); var currVal_33 = "place"; _ck(_v, 49, 0, currVal_33); var currVal_34 = "text"; _ck(_v, 52, 0, currVal_34); var currVal_35 = _co.showCR; _ck(_v, 54, 0, currVal_35); var currVal_36 = _co.showSU; _ck(_v, 56, 0, currVal_36); var currVal_38 = "primary"; _ck(_v, 58, 0, currVal_38); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = i0.ɵnov(_v, 3)._sbPadding; _ck(_v, 2, 0, currVal_0); var currVal_1 = i0.ɵnov(_v, 5).isHidden; _ck(_v, 4, 0, currVal_1); var currVal_3 = i0.ɵnov(_v, 9)._hidden; _ck(_v, 8, 0, currVal_3); var currVal_5 = i0.ɵnov(_v, 14).statusbarPadding; var currVal_6 = i0.ɵnov(_v, 14)._hasRefresher; _ck(_v, 13, 0, currVal_5, currVal_6); var currVal_8 = i0.ɵnov(_v, 23).ngClassUntouched; var currVal_9 = i0.ɵnov(_v, 23).ngClassTouched; var currVal_10 = i0.ɵnov(_v, 23).ngClassPristine; var currVal_11 = i0.ɵnov(_v, 23).ngClassDirty; var currVal_12 = i0.ɵnov(_v, 23).ngClassValid; var currVal_13 = i0.ɵnov(_v, 23).ngClassInvalid; var currVal_14 = i0.ɵnov(_v, 23).ngClassPending; _ck(_v, 19, 0, currVal_8, currVal_9, currVal_10, currVal_11, currVal_12, currVal_13, currVal_14); var currVal_16 = i0.ɵnov(_v, 34)._disabled; var currVal_17 = i0.ɵnov(_v, 38).ngClassUntouched; var currVal_18 = i0.ɵnov(_v, 38).ngClassTouched; var currVal_19 = i0.ɵnov(_v, 38).ngClassPristine; var currVal_20 = i0.ɵnov(_v, 38).ngClassDirty; var currVal_21 = i0.ɵnov(_v, 38).ngClassValid; var currVal_22 = i0.ɵnov(_v, 38).ngClassInvalid; var currVal_23 = i0.ɵnov(_v, 38).ngClassPending; _ck(_v, 33, 0, currVal_16, currVal_17, currVal_18, currVal_19, currVal_20, currVal_21, currVal_22, currVal_23); var currVal_26 = i0.ɵnov(_v, 51).ngClassUntouched; var currVal_27 = i0.ɵnov(_v, 51).ngClassTouched; var currVal_28 = i0.ɵnov(_v, 51).ngClassPristine; var currVal_29 = i0.ɵnov(_v, 51).ngClassDirty; var currVal_30 = i0.ɵnov(_v, 51).ngClassValid; var currVal_31 = i0.ɵnov(_v, 51).ngClassInvalid; var currVal_32 = i0.ɵnov(_v, 51).ngClassPending; _ck(_v, 48, 0, currVal_26, currVal_27, currVal_28, currVal_29, currVal_30, currVal_31, currVal_32); var currVal_37 = _co.info2; _ck(_v, 57, 0, currVal_37); }); }
export function View_PersonalDetailsPage_Host_0(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, "page-personal-details", [], null, null, null, View_PersonalDetailsPage_0, RenderType_PersonalDetailsPage)), i0.ɵdid(1, 49152, null, 0, i40.PersonalDetailsPage, [i24.NavController, i41.NavParams, i42.ModalController, i43.ShareService, i28.FormBuilder, i44.HoroscopeService, i20.Platform, i45.Device, i46.InAppPurchase2], null, null)], null, null); }
var PersonalDetailsPageNgFactory = i0.ɵccf("page-personal-details", i40.PersonalDetailsPage, View_PersonalDetailsPage_Host_0, {}, {}, []);
export { PersonalDetailsPageNgFactory as PersonalDetailsPageNgFactory };
//# sourceMappingURL=personal-details.ngfactory.js.map