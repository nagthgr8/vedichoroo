var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Renderer2, ViewChild, NgModule, ViewEncapsulation, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { ShareService } from '../../app/share.service';
import { HoroscopeService } from '../../app/horoscope.service';
import * as signs from '../horoscope/signs.json';
import * as signs_pos from '../horoscope/signs_pos.json';
import * as o_signs from '../horoscope/o_signs.json';
import * as rashis from '../horoscope/rashis.json';
import * as o_rashis from '../horoscope/o_rashis.json';
import * as ruler_name from '../horoscope/ruler_name.json';
import * as sublords from '../horoscope/sublords.json';
import * as dashas from '../horoscope/dashas.json';
import * as nakshatras from '../horoscope/nakshatras.json';
import * as nakshatra_order from '../horoscope/nakshatra_order.json';
import * as venus_das from '../horoscope/venus_das.json';
import * as sun_das from '../horoscope/sun_das.json';
import * as ketu_das from '../horoscope/ketu_das.json';
import * as moon_das from '../horoscope/moon_das.json';
import * as mars_das from '../horoscope/mars_das.json';
import * as rahu_das from '../horoscope/rahu_das.json';
import * as jupiter_das from '../horoscope/jupiter_das.json';
import * as saturn_das from '../horoscope/saturn_das.json';
import * as mercury_das from '../horoscope/mercury_das.json';
import * as venus from '../horoscope/venus.json';
import * as sun from '../horoscope/sun.json';
import * as moon from '../horoscope/moon.json';
import * as mars from '../horoscope/mars.json';
import * as jupiter from '../horoscope/jupiter.json';
import * as saturn from '../horoscope/saturn.json';
import * as mercury from '../horoscope/mercury.json';
import * as house_groups from '../horoscope/house_groups.json';
import * as aspects from '../horoscope/aspects.json';
import * as mon_weeks from '../horoscope/mon_weeks.json';
/**
 * Generated class for the KpAstroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var KpAstroPage = /** @class */ (function () {
    function KpAstroPage(navCtrl, shareService, navParams, platform, renderer, horoService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.shareService = shareService;
        this.navParams = navParams;
        this.platform = platform;
        this.renderer = renderer;
        this.horoService = horoService;
        this.pnam1 = '';
        this.pnam2 = '';
        this.pnam3 = '';
        this.pnam4 = '';
        this.pnam5 = '';
        this.pnam6 = '';
        this.pnam7 = '';
        this.pnam8 = '';
        this.pnam9 = '';
        this.ppos1 = '';
        this.ppos2 = '';
        this.ppos3 = '';
        this.ppos4 = '';
        this.ppos5 = '';
        this.ppos6 = '';
        this.ppos7 = '';
        this.ppos8 = '';
        this.ppos9 = '';
        this.pras1 = '';
        this.pras2 = '';
        this.pras3 = '';
        this.pras4 = '';
        this.pras5 = '';
        this.pras6 = '';
        this.pras7 = '';
        this.pras8 = '';
        this.pras9 = '';
        this.pnak1 = '';
        this.pnak2 = '';
        this.pnak3 = '';
        this.pnak4 = '';
        this.pnak5 = '';
        this.pnak6 = '';
        this.pnak7 = '';
        this.pnak8 = '';
        this.pnak9 = '';
        this.nakl1 = '';
        this.nakl2 = '';
        this.nakl3 = '';
        this.nakl4 = '';
        this.nakl5 = '';
        this.nakl6 = '';
        this.nakl7 = '';
        this.nakl8 = '';
        this.nakl9 = '';
        this.pn1 = '';
        this.pn2 = '';
        this.pn3 = '';
        this.pn4 = '';
        this.pn5 = '';
        this.pn6 = '';
        this.pn7 = '';
        this.pn8 = '';
        this.pn9 = '';
        this.hnam1 = '';
        this.hnam2 = '';
        this.hnam3 = '';
        this.hnam4 = '';
        this.hnam5 = '';
        this.hnam6 = '';
        this.hnam7 = '';
        this.hnam8 = '';
        this.hnam9 = '';
        this.hnam10 = '';
        this.hnam11 = '';
        this.hnam12 = '';
        this.hpos1 = '';
        this.hpos2 = '';
        this.hpos3 = '';
        this.hpos4 = '';
        this.hpos5 = '';
        this.hpos6 = '';
        this.hpos7 = '';
        this.hpos8 = '';
        this.hpos9 = '';
        this.hpos10 = '';
        this.hpos11 = '';
        this.hpos12 = '';
        this.hras1 = '';
        this.hras2 = '';
        this.hras3 = '';
        this.hras4 = '';
        this.hras5 = '';
        this.hras6 = '';
        this.hras7 = '';
        this.hras8 = '';
        this.hras9 = '';
        this.hras10 = '';
        this.hras11 = '';
        this.hras12 = '';
        this.hnak1 = '';
        this.hnak2 = '';
        this.hnak3 = '';
        this.hnak4 = '';
        this.hnak5 = '';
        this.hnak6 = '';
        this.hnak7 = '';
        this.hnak8 = '';
        this.hnak9 = '';
        this.hnak10 = '';
        this.hnak11 = '';
        this.hnak12 = '';
        this.hsub1 = '';
        this.hsub2 = '';
        this.hsub3 = '';
        this.hsub4 = '';
        this.hsub5 = '';
        this.hsub6 = '';
        this.hsub7 = '';
        this.hsub8 = '';
        this.hsub9 = '';
        this.hsub10 = '';
        this.hsub11 = '';
        this.hsub12 = '';
        this.hn1 = '';
        this.hn2 = '';
        this.hn3 = '';
        this.hn4 = '';
        this.hn5 = '';
        this.hn6 = '';
        this.hn7 = '';
        this.hn8 = '';
        this.hn9 = '';
        this.hn10 = '';
        this.hn11 = '';
        this.hn12 = '';
        this.L1ps1 = '';
        this.L1ps2 = '';
        this.L1ps3 = '';
        this.L1ps4 = '';
        this.L1ps5 = '';
        this.L1ps6 = '';
        this.L1ps7 = '';
        this.L1ps8 = '';
        this.L1ps9 = '';
        this.L2ps1 = '';
        this.L2ps2 = '';
        this.L2ps3 = '';
        this.L2ps4 = '';
        this.L2ps5 = '';
        this.L2ps6 = '';
        this.L2ps7 = '';
        this.L2ps8 = '';
        this.L2ps9 = '';
        this.L3ps1 = '';
        this.L3ps2 = '';
        this.L3ps3 = '';
        this.L3ps4 = '';
        this.L3ps5 = '';
        this.L3ps6 = '';
        this.L3ps7 = '';
        this.L3ps8 = '';
        this.L3ps9 = '';
        this.L4ps1 = '';
        this.L4ps2 = '';
        this.L4ps3 = '';
        this.L4ps4 = '';
        this.L4ps5 = '';
        this.L4ps6 = '';
        this.L4ps7 = '';
        this.L4ps8 = '';
        this.L4ps9 = '';
        this.L1hs1 = '';
        this.L1hs2 = '';
        this.L1hs3 = '';
        this.L1hs4 = '';
        this.L1hs5 = '';
        this.L1hs6 = '';
        this.L1hs7 = '';
        this.L1hs8 = '';
        this.L1hs9 = '';
        this.L1hs10 = '';
        this.L1hs11 = '';
        this.L1hs12 = '';
        this.L2hs1 = '';
        this.L2hs2 = '';
        this.L2hs3 = '';
        this.L2hs4 = '';
        this.L2hs5 = '';
        this.L2hs6 = '';
        this.L2hs7 = '';
        this.L2hs8 = '';
        this.L2hs9 = '';
        this.L2hs10 = '';
        this.L2hs11 = '';
        this.L2hs12 = '';
        this.L3hs1 = '';
        this.L3hs2 = '';
        this.L3hs3 = '';
        this.L3hs4 = '';
        this.L3hs5 = '';
        this.L3hs6 = '';
        this.L3hs7 = '';
        this.L3hs8 = '';
        this.L3hs9 = '';
        this.L3hs10 = '';
        this.L3hs11 = '';
        this.L3hs12 = '';
        this.L4hs1 = '';
        this.L4hs2 = '';
        this.L4hs3 = '';
        this.L4hs4 = '';
        this.L4hs5 = '';
        this.L4hs6 = '';
        this.L4hs7 = '';
        this.L4hs8 = '';
        this.L4hs9 = '';
        this.L4hs10 = '';
        this.L4hs11 = '';
        this.L4hs12 = '';
        this.krk1 = '';
        this.krk2 = '';
        this.krk3 = '';
        this.krk4 = '';
        this.krk5 = '';
        this.krk6 = '';
        this.krk7 = '';
        this.krk8 = '';
        this.krk9 = '';
        this.oPlanet = [];
        this.oHouse = [];
        this.objectKeys = Object.keys;
        this.device_width = 0;
        this.device_height = 0;
        this.moon_sign = '';
        this.moon_deg = 0;
        this.asc_sign = '';
        this.asc_deg = 0;
        this.mdas1 = '';
        this.adas1 = '';
        this.pdas1 = '';
        this.pend1 = '';
        this.showNote = false;
        this.showSubscr = false;
        this.showTrans = false;
        this.showBN = false;
        this.recfyBT = '';
        this.mprd1 = '';
        this.mprd2 = '';
        this.mprd3 = '';
        this.mprd4 = '';
        this.mon = '';
        this.yer = '';
        this.mcnt = 0;
        this.showLS = false;
        this.tvisits = [];
        platform.ready().then(function (readySource) {
            console.log('Width: ' + platform.width());
            _this.device_width = platform.width();
            console.log('Height: ' + platform.height());
            _this.device_height = platform.height();
            _this.showGrid = false;
            _this.showNote = false;
            //this.showSubscr = true;
            _this.showTrans = true;
            _this.showLS = true;
            _this.mcnt = 0;
            _this.loadHoro();
            _this.horoService.recfyBT(_this.shareService.getLAT(), _this.shareService.getLNG(), _this.shareService.getDOB(), _this.shareService.getTimezone())
                .subscribe(function (res) {
                if (res['recfyDOB'] != '') {
                    _this.showBN = true;
                    _this.recfyBT = '<span><strong>' + res['rem'] + '</strong></span><br/>';
                }
            }, function (err) {
                //this.info = err;
            });
        });
    }
    KpAstroPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad KpAstroPage');
    };
    KpAstroPage.prototype.ngAfterViewInit = function () {
    };
    KpAstroPage.prototype.calcStar = function (mins) {
        //console.log(mins);
        for (var i = 0; i < Object.keys(sublords).length; i++) {
            var nak = sublords[i];
            var degs = sublords[i].deg;
            var s_mins = parseInt(degs.split('-')[0].split('.')[0], 10) * 60 + parseInt(degs.split('-')[0].split('.')[1]);
            var e_mins = parseInt(degs.split('-')[1].split('.')[0], 10) * 60 + parseInt(degs.split('-')[1].split('.')[1]);
            //var deg_s = parseFloat(degs.split('-')[0].split('.')[0] + '.' + degs.split('-')[0].split('.')[1]);
            //var deg_e = parseFloat(degs.split('-')[1].split('.')[0] + '.' + degs.split('-')[1].split('.')[1]);
            //console.log(s_mins);
            //console.log(e_mins);
            if (mins >= s_mins && mins <= e_mins) {
                //console.log(s_mins);
                //console.log(e_mins);
                return nak.sign + '|' + nak.star + '|' + nak.sub;
            }
        }
        return '-1';
    };
    KpAstroPage.prototype.grid = function (numberPerSide, size, pixelsPerSide, plps) {
        var roms = ['I', 'II', 'III', 'IV', 'V', 'V1', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.renderer.setAttribute(svg, "width", pixelsPerSide);
        this.renderer.setAttribute(svg, "height", pixelsPerSide);
        this.renderer.setAttribute(svg, "viewBox", [0, 0, numberPerSide * size, numberPerSide * size].join(" "));
        var defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
        var s1 = 24;
        var xp = size - 24;
        var pattern = document.createElementNS("http://www.w3.org/2000/svg", "pattern");
        this.renderer.setAttribute(pattern, "id", "sign-0");
        this.renderer.setAttribute(pattern, "patternUnits", "userSpaceOnUse");
        this.renderer.setAttribute(pattern, "height", size.toString());
        this.renderer.setAttribute(pattern, "width", size.toString());
        var image = document.createElementNS("http://www.w3.org/2000/svg", "image");
        this.renderer.setAttribute(image, "x", xp.toString());
        this.renderer.setAttribute(image, "y", "0");
        this.renderer.setAttribute(image, "height", s1.toString());
        this.renderer.setAttribute(image, "width", s1.toString());
        image.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "https://66.media.tumblr.com/b18d7fb614523f423cfcdf445a2dabda/tumblr_pg26xre6z91xp0noco1_75sq.png");
        this.renderer.appendChild(pattern, image);
        this.renderer.appendChild(defs, pattern);
        pattern = document.createElementNS("http://www.w3.org/2000/svg", "pattern");
        this.renderer.setAttribute(pattern, "id", "sign-1");
        this.renderer.setAttribute(pattern, "patternUnits", "userSpaceOnUse");
        this.renderer.setAttribute(pattern, "height", size.toString());
        this.renderer.setAttribute(pattern, "width", size.toString());
        image = document.createElementNS("http://www.w3.org/2000/svg", "image");
        this.renderer.setAttribute(image, "x", xp.toString());
        this.renderer.setAttribute(image, "y", "0");
        this.renderer.setAttribute(image, "height", s1.toString());
        this.renderer.setAttribute(image, "width", s1.toString());
        image.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "https://66.media.tumblr.com/4f93cc3f670bb2e55fce4d217dc9c5f3/tumblr_pg26x0KznG1xp0noco1_75sq.png");
        this.renderer.appendChild(pattern, image);
        this.renderer.appendChild(defs, pattern);
        pattern = document.createElementNS("http://www.w3.org/2000/svg", "pattern");
        this.renderer.setAttribute(pattern, "id", "sign-2");
        this.renderer.setAttribute(pattern, "patternUnits", "userSpaceOnUse");
        this.renderer.setAttribute(pattern, "height", size.toString());
        this.renderer.setAttribute(pattern, "width", size.toString());
        image = document.createElementNS("http://www.w3.org/2000/svg", "image");
        this.renderer.setAttribute(image, "x", xp.toString());
        this.renderer.setAttribute(image, "y", "0");
        this.renderer.setAttribute(image, "height", s1.toString());
        this.renderer.setAttribute(image, "width", s1.toString());
        image.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "https://66.media.tumblr.com/b8207752e62efd28059f2d5e62e1fbb8/tumblr_pg26w8YAAz1xp0noco1_75sq.png");
        this.renderer.appendChild(pattern, image);
        this.renderer.appendChild(defs, pattern);
        pattern = document.createElementNS("http://www.w3.org/2000/svg", "pattern");
        this.renderer.setAttribute(pattern, "id", "sign-3");
        this.renderer.setAttribute(pattern, "patternUnits", "userSpaceOnUse");
        this.renderer.setAttribute(pattern, "height", size.toString());
        this.renderer.setAttribute(pattern, "width", size.toString());
        image = document.createElementNS("http://www.w3.org/2000/svg", "image");
        this.renderer.setAttribute(image, "x", xp.toString());
        this.renderer.setAttribute(image, "y", "0");
        this.renderer.setAttribute(image, "height", s1.toString());
        this.renderer.setAttribute(image, "width", s1.toString());
        image.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "https://66.media.tumblr.com/750f019326f62f174fb514cb0b79232e/tumblr_pg26vedaAD1xp0noco1_75sq.png");
        this.renderer.appendChild(pattern, image);
        this.renderer.appendChild(defs, pattern);
        pattern = document.createElementNS("http://www.w3.org/2000/svg", "pattern");
        this.renderer.setAttribute(pattern, "id", "sign-4");
        this.renderer.setAttribute(pattern, "patternUnits", "userSpaceOnUse");
        this.renderer.setAttribute(pattern, "height", size.toString());
        this.renderer.setAttribute(pattern, "width", size.toString());
        image = document.createElementNS("http://www.w3.org/2000/svg", "image");
        this.renderer.setAttribute(image, "x", xp.toString());
        this.renderer.setAttribute(image, "y", "0");
        this.renderer.setAttribute(image, "height", s1.toString());
        this.renderer.setAttribute(image, "width", s1.toString());
        image.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "https://66.media.tumblr.com/36037c0cad990e4b04e46cd3a1ec1975/tumblr_pg26nlIb3z1xp0noco1_75sq.png");
        this.renderer.appendChild(pattern, image);
        this.renderer.appendChild(defs, pattern);
        pattern = document.createElementNS("http://www.w3.org/2000/svg", "pattern");
        this.renderer.setAttribute(pattern, "id", "sign-7");
        this.renderer.setAttribute(pattern, "patternUnits", "userSpaceOnUse");
        this.renderer.setAttribute(pattern, "height", size.toString());
        this.renderer.setAttribute(pattern, "width", size.toString());
        image = document.createElementNS("http://www.w3.org/2000/svg", "image");
        this.renderer.setAttribute(image, "x", xp.toString());
        this.renderer.setAttribute(image, "y", "0");
        this.renderer.setAttribute(image, "height", s1.toString());
        this.renderer.setAttribute(image, "width", s1.toString());
        image.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "https://66.media.tumblr.com/1aff51efa3ed79ddf9b68cd366959e0d/tumblr_pg26uarJnj1xp0noco1_75sq.png");
        this.renderer.appendChild(pattern, image);
        this.renderer.appendChild(defs, pattern);
        pattern = document.createElementNS("http://www.w3.org/2000/svg", "pattern");
        this.renderer.setAttribute(pattern, "id", "sign-8");
        this.renderer.setAttribute(pattern, "patternUnits", "userSpaceOnUse");
        this.renderer.setAttribute(pattern, "height", size.toString());
        this.renderer.setAttribute(pattern, "width", size.toString());
        image = document.createElementNS("http://www.w3.org/2000/svg", "image");
        this.renderer.setAttribute(image, "x", xp.toString());
        this.renderer.setAttribute(image, "y", "0");
        this.renderer.setAttribute(image, "height", s1.toString());
        this.renderer.setAttribute(image, "width", s1.toString());
        image.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "https://66.media.tumblr.com/68f3a3c2cb4e9122783c5629df911b5a/tumblr_pg26oqqubW1xp0noco1_75sq.png");
        this.renderer.appendChild(pattern, image);
        this.renderer.appendChild(defs, pattern);
        pattern = document.createElementNS("http://www.w3.org/2000/svg", "pattern");
        this.renderer.setAttribute(pattern, "id", "sign-11");
        this.renderer.setAttribute(pattern, "patternUnits", "userSpaceOnUse");
        this.renderer.setAttribute(pattern, "height", size.toString());
        this.renderer.setAttribute(pattern, "width", size.toString());
        image = document.createElementNS("http://www.w3.org/2000/svg", "image");
        this.renderer.setAttribute(image, "x", xp.toString());
        this.renderer.setAttribute(image, "y", "0");
        this.renderer.setAttribute(image, "height", s1.toString());
        this.renderer.setAttribute(image, "width", s1.toString());
        image.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "https://66.media.tumblr.com/3cbefe595ea9a652917a227e948c81c7/tumblr_pg26tgkrYj1xp0noco1_75sq.png");
        this.renderer.appendChild(pattern, image);
        this.renderer.appendChild(defs, pattern);
        pattern = document.createElementNS("http://www.w3.org/2000/svg", "pattern");
        this.renderer.setAttribute(pattern, "id", "sign-12");
        this.renderer.setAttribute(pattern, "patternUnits", "userSpaceOnUse");
        this.renderer.setAttribute(pattern, "height", size.toString());
        this.renderer.setAttribute(pattern, "width", size.toString());
        image = document.createElementNS("http://www.w3.org/2000/svg", "image");
        this.renderer.setAttribute(image, "x", xp.toString());
        this.renderer.setAttribute(image, "y", "0");
        this.renderer.setAttribute(image, "height", s1.toString());
        this.renderer.setAttribute(image, "width", s1.toString());
        image.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "https://66.media.tumblr.com/e5363d15ee528c55c229455a30e7c08e/tumblr_pg26ptGPpi1xp0noco1_75sq.png");
        this.renderer.appendChild(pattern, image);
        this.renderer.appendChild(defs, pattern);
        pattern = document.createElementNS("http://www.w3.org/2000/svg", "pattern");
        this.renderer.setAttribute(pattern, "id", "sign-13");
        this.renderer.setAttribute(pattern, "patternUnits", "userSpaceOnUse");
        this.renderer.setAttribute(pattern, "height", size.toString());
        this.renderer.setAttribute(pattern, "width", size.toString());
        image = document.createElementNS("http://www.w3.org/2000/svg", "image");
        this.renderer.setAttribute(image, "x", xp.toString());
        this.renderer.setAttribute(image, "y", "0");
        this.renderer.setAttribute(image, "height", s1.toString());
        this.renderer.setAttribute(image, "width", s1.toString());
        image.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "https://66.media.tumblr.com/cec5baaba18d34716137819875ff6b6e/tumblr_pg26qqWSJh1xp0noco1_75sq.png");
        this.renderer.appendChild(pattern, image);
        this.renderer.appendChild(defs, pattern);
        pattern = document.createElementNS("http://www.w3.org/2000/svg", "pattern");
        this.renderer.setAttribute(pattern, "id", "sign-14");
        this.renderer.setAttribute(pattern, "patternUnits", "userSpaceOnUse");
        this.renderer.setAttribute(pattern, "height", size.toString());
        this.renderer.setAttribute(pattern, "width", size.toString());
        image = document.createElementNS("http://www.w3.org/2000/svg", "image");
        this.renderer.setAttribute(image, "x", xp.toString());
        this.renderer.setAttribute(image, "y", "0");
        this.renderer.setAttribute(image, "height", s1.toString());
        this.renderer.setAttribute(image, "width", s1.toString());
        image.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "https://66.media.tumblr.com/2a7d3aa2e249bb1d9805c22f1f1e10fe/tumblr_pg26rvRsjQ1xp0noco1_75sq.png");
        this.renderer.appendChild(pattern, image);
        this.renderer.appendChild(defs, pattern);
        pattern = document.createElementNS("http://www.w3.org/2000/svg", "pattern");
        this.renderer.setAttribute(pattern, "id", "sign-15");
        this.renderer.setAttribute(pattern, "patternUnits", "userSpaceOnUse");
        this.renderer.setAttribute(pattern, "height", size.toString());
        this.renderer.setAttribute(pattern, "width", size.toString());
        image = document.createElementNS("http://www.w3.org/2000/svg", "image");
        this.renderer.setAttribute(image, "x", xp.toString());
        this.renderer.setAttribute(image, "y", "0");
        this.renderer.setAttribute(image, "height", s1.toString());
        this.renderer.setAttribute(image, "width", s1.toString());
        image.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "https://66.media.tumblr.com/d66f5088be7fb4f3cbbbcdfa91c9aaa5/tumblr_pg26sq4Uag1xp0noco1_75sq.png");
        this.renderer.appendChild(pattern, image);
        this.renderer.appendChild(defs, pattern);
        this.renderer.appendChild(svg, defs);
        var border = 1;
        var s2 = size * 2;
        var s3 = size;
        var s4 = 15;
        var s5 = size * 2 / 2;
        var hPos = this.shareService.getHPOS();
        var once = false;
        for (var i = 0; i < numberPerSide; i++) {
            for (var j = 0; j < numberPerSide; j++) {
                if ((i * numberPerSide + j) == 5 || (i * numberPerSide + j) == 6 || (i * numberPerSide + j) == 9 || (i * numberPerSide + j) == 10) {
                    if ((i * numberPerSide + j) == 5) {
                        var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
                        this.renderer.setAttribute(g, "transform", ["translate(", i * size, ",", j * size, ")"].join(""));
                        var number = numberPerSide * i + j;
                        var box = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                        this.renderer.setAttribute(box, "width", s2.toString());
                        this.renderer.setAttribute(box, "height", s2.toString());
                        this.renderer.setAttribute(box, "border", border.toString());
                        this.renderer.setAttribute(box, "stroke", "#000000");
                        this.renderer.setAttribute(box, "fill", "#fffdf8");
                        this.renderer.setAttribute(box, "id", "b" + number);
                        this.renderer.appendChild(g, box);
                        var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
                        this.renderer.appendChild(text, document.createTextNode("BHAV CHART"));
                        this.renderer.setAttribute(text, "fill", "#000000");
                        this.renderer.setAttribute(text, "font-size", s4.toString());
                        this.renderer.setAttribute(text, "font-weight", "bold");
                        this.renderer.setAttribute(text, "alignment-baseline", "middle");
                        this.renderer.setAttribute(text, "text-anchor", "middle");
                        this.renderer.setAttribute(text, "x", s3.toString());
                        this.renderer.setAttribute(text, "y", s3.toString());
                        //this.renderer.setAttribute(text, "text-align", "center");
                        this.renderer.setAttribute(text, "id", "t" + number);
                        g.appendChild(text);
                        text = document.createElementNS("http://www.w3.org/2000/svg", "text");
                        this.renderer.appendChild(text, document.createTextNode(this.shareService.getDOB().split('T')[0].split('-')[2] + '/' + this.shareService.getDOB().split('T')[0].split('-')[1] + '/' + this.shareService.getDOB().split('T')[0].split('-')[0]));
                        this.renderer.setAttribute(text, "fill", "#000000");
                        this.renderer.setAttribute(text, "font-size", s4.toString());
                        this.renderer.setAttribute(text, "font-weight", "bold");
                        this.renderer.setAttribute(text, "alignment-baseline", "middle");
                        this.renderer.setAttribute(text, "text-anchor", "middle");
                        this.renderer.setAttribute(text, "x", s3.toString());
                        this.renderer.setAttribute(text, "y", (s3 + 12).toString());
                        //this.renderer.setAttribute(text, "text-align", "center");
                        this.renderer.setAttribute(text, "id", "st" + number);
                        g.appendChild(text);
                        svg.appendChild(g);
                        console.log('bhav chart');
                    }
                    continue;
                }
                // var zodiac1 = zodiacs[(i + j) % zodiacs.length];
                // var zodiac2 = zodiacs[(i + j + 1) % zodiacs.length];
                g = document.createElementNS("http://www.w3.org/2000/svg", "g");
                this.renderer.setAttribute(g, "transform", ["translate(", i * size, ",", j * size, ")"].join(""));
                number = numberPerSide * i + j;
                box = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                var sign = "url(#sign-" + number.toString() + ")";
                this.renderer.setAttribute(box, "width", size.toString());
                this.renderer.setAttribute(box, "height", size.toString());
                this.renderer.setAttribute(box, "stroke", (signs[number] == this.asc_sign) ? "#FF5733" : "#000000");
                this.renderer.setAttribute(box, "stroke-width", (signs[number] == this.asc_sign) ? (border + 2).toString() : border.toString());
                this.renderer.setAttribute(box, "fill", sign);
                this.renderer.setAttribute(box, "id", "b" + number.toString());
                this.renderer.appendChild(g, box);
                console.log(sign);
                sign = signs[number];
                var asc_mins = 0;
                if (this.asc_deg.toString().indexOf('.') > -1)
                    asc_mins = parseInt(this.asc_deg.toString().split('.')[0]) * 60 + parseInt(this.asc_deg.toString().split('.')[1]);
                else
                    asc_mins = this.asc_deg * 60;
                var arr = ["ar", "ta", "ge", "cn", "le", "vi", "li", "sc", "sa", "cp", "aq", "pi"];
                var v_iter = 0, v_start = 0;
                var pcnt = 0;
                for (var vi = 0, len = arr.length; vi < len; vi++) {
                    if (arr[vi] == this.asc_sign.toLowerCase() || v_start == 1) {
                        v_iter++;
                        if (arr[vi] == sign.toLowerCase()) {
                            var pcnt2 = 0;
                            //let min: number = (v_iter == 1) ? asc_mins : (asc_mins + (v_iter-1)*30*60);
                            //let max: number = (v_iter == 1) ? asc_mins + 180: (asc_mins + (v_iter-1)*30*60) + 180;
                            //console.log('House ' + v_iter.toString() + 'start ' + min.toString());
                            //console.log('House ' + v_iter.toString() + 'end ' + max.toString());
                            //for(var h=0; h < Object.keys(hPos).length; h++){
                            //let hmins: number = parseInt(hPos[h+1].split("°")[0], 10)*60 + parseInt(hPos[h+1].split("°")[1].split("'")[0], 10);
                            //console.log(hmins);
                            //if(hmins >= min && hmins <= max){
                            pcnt++;
                            var s6 = 10;
                            var s7 = 2;
                            var cur_h = (v_iter - 1 == 0) ? 12 : v_iter - 1;
                            var hnos = this.get_hno_by_sign(sign);
                            text = document.createElementNS("http://www.w3.org/2000/svg", "text");
                            //console.log('sign=' + sign + ' v_iter= ' + v_iter.toString() + 'roms = ' + hnos);
                            this.renderer.appendChild(text, document.createTextNode(hnos));
                            //text.setAttribute("fill", zodiac2);
                            this.renderer.setAttribute(text, "font-size", s6.toString());
                            this.renderer.setAttribute(text, "font-weight", "bold");
                            this.renderer.setAttribute(text, "x", s7.toString());
                            var s8 = 10 * pcnt;
                            this.renderer.setAttribute(text, "y", s8.toString());
                            this.renderer.setAttribute(text, "id", "h" + v_iter.toString());
                            g.appendChild(text);
                            //console.log(roms[v_iter-1]);
                            var h_cusp_e = parseInt(hPos[v_iter].split("°")[0], 10) * 60 + parseInt(hPos[v_iter].split("°")[1].split("'")[0], 10);
                            var h_cusp_b = parseInt(hPos[cur_h].split("°")[0], 10) * 60 + parseInt(hPos[cur_h].split("°")[1].split("'")[0], 10);
                            if (plps.hasOwnProperty(sign)) {
                                //console.log('The sign ' + sign + ' has ' + plps[sign].split('\|').length.toString() + ' planet(s), they are');
                                var pls = plps[sign].split('\|'); //this.get_pls_pos_in_hou_ex(h_cusp_b, h_cusp_e, sign);
                                //console.log('Planets in hou = ' + cur_h.toString()  + ' are' + pls);
                                //if(pls != '') {
                                //var pl_o = pls.split(',');
                                var top_ofset = 40;
                                for (var o = 0; o < pls.length; o++) {
                                    s7 = (size / 2) - 6;
                                    pcnt2++;
                                    text = document.createElementNS("http://www.w3.org/2000/svg", "text");
                                    this.renderer.appendChild(text, document.createTextNode(pls[o]));
                                    //text.setAttribute("fill", zodiac2);
                                    this.renderer.setAttribute(text, "font-size", s6.toString());
                                    this.renderer.setAttribute(text, "font-weight", "bold");
                                    this.renderer.setAttribute(text, "x", s7.toString());
                                    var s8 = top_ofset + (10 * pcnt2);
                                    this.renderer.setAttribute(text, "y", s8.toString());
                                    this.renderer.setAttribute(text, "id", "t" + number.toString());
                                    g.appendChild(text);
                                }
                                // }
                            }
                            else {
                                // console.log('The sign ' + sign + ' has no planets');
                            }
                            //}
                            //}
                        }
                        v_start = 1;
                    }
                    if (vi == 11)
                        vi = -1;
                    if (v_iter == 12)
                        break;
                }
                svg.appendChild(g);
            }
        }
        for (var i = 0; i < 12; i++) {
            if (o_signs[i] == this.asc_sign) {
                var as = 1;
                rashis[this.asc_sign] = '1|' + rashis[this.asc_sign].split('\|')[1];
                for (var j = i + 1; j < 12; j++) {
                    as++;
                    rashis[o_signs[j]] = (as).toString() + '|' + rashis[o_signs[j]].split('\|')[1];
                }
                for (var k = 0; k < i; k++) {
                    var hno = ((12 - i) + (k + 1));
                    rashis[o_signs[k]] = hno.toString() + '|' + rashis[o_signs[k]].split('\|')[1];
                }
            }
        }
        console.log(svg);
        return svg;
    };
    ;
    KpAstroPage.prototype.loadHoro = function () {
        // console.log(this.shareService.getDOB());
        //let yr: number = parseInt(this.shareService.getDOB().split('T')[0].split('-')[0], 10);
        //let ay_m: number = 0;
        //let a_d: number = 0;
        //let a_m: number = 0;
        //let a_s: number = 0;
        //if(yr >= 1900 && yr < 2053) {
        //   var aym_s = ayanmasa[yr.toString()];
        //  a_d = parseInt(aym_s.split('.')[0], 10);
        //  a_m = parseInt(aym_s.split('.')[1], 10);
        //  a_s = parseInt(aym_s.split('.')[2], 10);
        //  ay_m = a_d*60 + a_m + (a_s/60);
        //}
        //console.log(ay_m);
        var _this = this;
        var pcnt = 0;
        var plPos = this.shareService.getPLPOS();
        for (var _i = 0, _a = Object.keys(signs); _i < _a.length; _i++) {
            var key = _a[_i];
            if (signs[key] == 'na')
                continue;
            var sign = signs[key];
            if (plPos.hasOwnProperty(sign)) {
                var pls = plPos[sign].split('\|');
                for (var k = 0; k < pls.length; k++) {
                    if (pls[k].split(' ')[1] == 'MEAN_NODE') {
                        var rpos = o_rashis[sign].split('\|')[0];
                        var kpos = parseInt(rpos, 10) + 6;
                        if (kpos > 12)
                            kpos = (kpos - 12);
                        //var mn = i + 11;
                        //if (mn > 15) mn -= 15;
                        if (plPos.hasOwnProperty(o_signs[kpos - 1])) {
                            var eP = plPos[o_signs[kpos - 1]];
                            plPos[o_signs[kpos - 1]] = eP + '|' + pls[k].split(' ')[0] + ' ' + 'Ke';
                        }
                        else {
                            plPos[o_signs[kpos - 1]] = pls[k].split(' ')[0] + ' ' + 'Ke';
                        }
                        // plPos[sign] = ePls;
                        plPos[sign] = plPos[sign].replace('MEAN_NODE', 'Ra');
                    }
                    else if (pls[k].split(' ')[1] == 'AC') {
                        this.asc_sign = sign;
                        this.asc_deg = Number(pls[k].split(' ')[0]);
                        console.log('ASCENDENT is ' + this.asc_sign);
                    }
                    else if (pls[k].split(' ')[1] == 'Mo') {
                        this.moon_sign = sign;
                        this.moon_deg = Number(pls[k].split(' ')[0]);
                    }
                }
            }
        }
        console.log('publishing planet & house positions');
        for (var _b = 0, _c = Object.keys(signs); _b < _c.length; _b++) {
            var key = _c[_b];
            if (signs[key] == 'na')
                continue;
            var sign = signs[key];
            if (plPos.hasOwnProperty(sign)) {
                var pls = plPos[sign].split('\|');
                //console.log(pls);
                for (var k = 0; k < pls.length; k++) {
                    var pl = pls[k].split(' ')[1];
                    var pos = pls[k].split(' ')[0].trim();
                    //console.log('pos len=' + pos.split('.').length.toString());
                    var mins = 0;
                    if (pos.indexOf('.') > -1 && pos.split('.')[1] != '')
                        mins = (signs_pos[sign] + parseInt(pls[k].split(' ')[0].split('.')[0], 10)) * 60 + parseInt(pls[k].split(' ')[0].split('.')[1], 10);
                    else
                        mins = (signs_pos[sign] + parseInt(pls[k].split(' ')[0].split('.')[0], 10)) * 60;
                    if (pl != 'Ra' && pl != 'Ke' && pl != 'Ur' && pl != 'Pl' && pl != 'me' && pl != 'os' && pl != 'Ne' && pl != 'AC' && pl != 'TRUE_NODE') { //consider only true planets
                        pcnt++;
                        //console.log('finding star at ' + (mins - ay_m).toString());
                        var star = this.calcStar(mins);
                        //console.log(star);
                        //console.log(pl);
                        this['pnam' + pcnt.toString()] = this.translate(ruler_name[pl.toLowerCase()].toUpperCase());
                        //console.log(star.split('|')[0]);
                        this['pras' + pcnt.toString()] = this.translate(star.split('|')[0]);
                        //console.log(pls[k].split(' ')[0]);
                        if (pos.indexOf('.') > -1 && pos.split('.')[1] != '') {
                            //let min_l: number = parseInt(pls[k].split(' ')[0].split('.')[1], 10);
                            //let deg_l: number = parseInt(pls[k].split(' ')[0].split('.')[0], 10);
                            //let sec_l: number = 0; 
                            //if(a_s > 0 && min_l > 0) {
                            // 	sec_l = 60 - a_s;						
                            // min_l--;
                            //} else if (a_s > 0){
                            //deg_l--;
                            //min_l = 59;
                            //sec_l = 60 - a_s;						
                            //}
                            this['ppos' + pcnt.toString()] = pls[k].split(' ')[0].split('.')[0] + '\xB0' + pls[k].split(' ')[0].split('.')[1] + '\u2032';
                            //this['ppos' +pcnt.toString()] = deg_l.toString() + '\xB0' + min_l.toString() + '\u2032' + sec_l + '\u2033';
                        }
                        else {
                            this['ppos' + pcnt.toString()] = pls[k].split(' ')[0].split('.')[0] + '\xB0';
                        }
                        var planetPos = {
                            pos: mins,
                            sign: star.split('|')[0],
                            star: star.split('|')[1],
                            sub: star.split('|')[2],
                            sig: '',
                            lif_e: '',
                            inds: ''
                        };
                        this.oPlanet[ruler_name[pl.toLowerCase()].toLowerCase()] = planetPos;
                        //console.log(star.split('|')[1]);
                        this['pnak' + pcnt.toString()] = this.translate(star.split('|')[1]);
                        //console.log(star.split('|')[2]);
                        this['nakl' + pcnt.toString()] = this.translate(star.split('|')[2]);
                    }
                    else if (pl == 'Ra') { //consder Rahu
                        //h_code += 'Rahu ';
                        pcnt++;
                        //console.log(pl);
                        //console.log(pls[k].split(' ')[0]);
                        var star = this.calcStar(mins);
                        //console.log(star);
                        this['pnam' + pcnt.toString()] = this.translate('RAHU');
                        //console.log(star.split('|')[0]);
                        this['pras' + pcnt.toString()] = this.translate(star.split('|')[0]);
                        if (pos.indexOf('.') > -1 && pos.split('.')[1] != '') {
                            this['ppos' + pcnt.toString()] = pls[k].split(' ')[0].split('.')[0] + '\xB0' + pls[k].split(' ')[0].split('.')[1] + '\u2032';
                        }
                        else {
                            this['ppos' + pcnt.toString()] = pls[k].split(' ')[0].split('.')[0] + '\xB0';
                        }
                        var planetPos = {
                            pos: mins,
                            sign: star.split('|')[0],
                            star: star.split('|')[1],
                            sub: star.split('|')[2],
                            sig: '',
                            lif_e: '',
                            inds: ''
                        };
                        this.oPlanet['rahu'] = planetPos;
                        //console.log(star.split('|')[1]);
                        this['pnak' + pcnt.toString()] = this.translate(star.split('|')[1]);
                        //console.log(star.split('|')[2]);
                        this['nakl' + pcnt.toString()] = this.translate(star.split('|')[2]);
                    }
                    else if (pl == 'Ke') {
                        //h_code += 'Ketu ';
                        pcnt++;
                        //console.log(pl);
                        //console.log(pls[k].split(' ')[0]);
                        var star = this.calcStar(mins);
                        //console.log(star);
                        this['pnam' + pcnt.toString()] = this.translate('KETU');
                        //console.log(star.split('|')[0]);
                        this['pras' + pcnt.toString()] = this.translate(star.split('|')[0]);
                        if (pos.indexOf('.') > -1 && pos.split('.')[1] != '') {
                            this['ppos' + pcnt.toString()] = pls[k].split(' ')[0].split('.')[0] + '\xB0' + pls[k].split(' ')[0].split('.')[1] + '\u2032';
                        }
                        else {
                            this['ppos' + pcnt.toString()] = pls[k].split(' ')[0].split('.')[0] + '\xB0';
                        }
                        var planetPos = {
                            pos: mins,
                            sign: star.split('|')[0],
                            star: star.split('|')[1],
                            sub: star.split('|')[2],
                            sig: '',
                            lif_e: '',
                            inds: ''
                        };
                        this.oPlanet['ketu'] = planetPos;
                        //console.log(star.split('|')[1]);
                        this['pnak' + pcnt.toString()] = this.translate(star.split('|')[1]);
                        //console.log(star.split('|')[2]);
                        this['nakl' + pcnt.toString()] = this.translate(star.split('|')[2]);
                    }
                }
            }
        }
        var hPos = this.shareService.getHPOS();
        pcnt = 0;
        //for(var i=0; i < Object.keys(hPos).length; i++)
        for (var _d = 0, _e = Object.keys(hPos); _d < _e.length; _d++) {
            var key = _e[_d];
            var v_iter_1 = Number(key);
            //let cur_h: number = (v_iter-1 == 0) ? 12: v_iter-1;
            var mins = 0;
            pcnt++;
            var dmslat = hPos[v_iter_1];
            //console.log(dmslat);
            //console.log(dmslat.split("°")[0] + '.' + dmslat.split("°")[1].split("'")[0]);
            //console.log(parseFloat(dmslat.split("°")[0] + '.' + dmslat.split("°")[1].split("'")[0]));
            mins = parseInt(dmslat.split("°")[0], 10) * 60 + parseInt(dmslat.split("°")[1].split("'")[0], 10);
            //console.log(mins);
            var star = this.calcStar(mins);
            //console.log(star);
            this['hnam' + pcnt.toString()] = (v_iter_1).toString();
            this['hpos' + pcnt.toString()] = dmslat.split("°")[0] + '\xB0' + dmslat.split("°")[1].split("'")[0] + '\u2032';
            this['hras' + pcnt.toString()] = this.translate(star.split('|')[0]);
            this['hnak' + pcnt.toString()] = this.translate(star.split('|')[1]);
            //console.log(star.split('|')[2]);
            this['hsub' + pcnt.toString()] = this.translate(star.split('|')[2]);
            var housePos = {
                pos: mins,
                sign: star.split('|')[0],
                star: star.split('|')[1],
                sub: star.split('|')[2],
                sig: ''
            };
            this.oHouse[(v_iter_1).toString()] = housePos;
        }
        //console.log('Total planets=' + Object.keys(this.oPlanet).length.toString());
        //console.log('Total houses=' + Object.keys(this.oHouse).length.toString());
        //for(let key of Object.keys(this.oPlanet)) {
        // console.log(key);
        //}
        //console.log(this.oPlanet);
        //console.log(this.oHouse);
        //find planet significators
        var arr = ["sun", "moon", "mars", "rahu", "jupiter", "saturn", "mercury", "ketu", "venus"];
        var pL1 = '';
        var pL2 = '';
        var pL3 = '';
        for (var vi = 0, len = arr.length; vi < len; vi++) {
            var psig = [];
            var sigs = 0;
            var obj = this.oPlanet[arr[vi]];
            //console.log(obj);
            var sl_hno = this.get_hno_by_pos(this.oPlanet[obj.star].pos);
            var hno = this.get_hno_by_pos(obj.pos);
            var sl_own_hnos = this.get_own_houses(obj.star);
            var pl_own_hnos = this.get_own_houses(arr[vi]);
            //let t_owns: string = '';
            this['pn' + (vi + 1).toString()] = this.translate(arr[vi]);
            this['L1ps' + (vi + 1).toString()] = sl_hno + ',';
            psig[sigs++] = Number(sl_hno);
            //console.log('Total significators of ' + arr[vi] + ' = ' + sigs.toString());
            //var hnums = sl_hno.split(',');
            //for(var s = 0; s < hnums.length; s++) {
            //	psig[sigs++] = Number(hnums[s]);
            //}
            var bf = false;
            for (var s = 0; s < sigs; s++) {
                if (psig[s] == Number(hno)) {
                    bf = true;
                }
            }
            bf = false;
            if (!bf)
                psig[sigs++] = Number(hno);
            //console.log('Total significators of ' + arr[vi] + ' = ' + sigs.toString());
            this['L2ps' + (vi + 1).toString()] = hno.toString() + ',';
            this['L3ps' + (vi + 1).toString()] = sl_own_hnos;
            var hnums = sl_own_hnos.split(',');
            for (var s = 0; s < hnums.length; s++) {
                if (hnums[s] == '')
                    continue;
                bf = false;
                for (var s1 = 0; s1 < sigs; s1++) {
                    if (psig[s1] == Number(hnums[s])) {
                        bf = true;
                    }
                }
                if (!bf)
                    psig[sigs++] = Number(hnums[s]);
                //console.log('Total significators of ' + arr[vi] + ' = ' + sigs.toString());
            }
            this['L4ps' + (vi + 1).toString()] = pl_own_hnos;
            hnums = pl_own_hnos.split(',');
            for (var s = 0; s < hnums.length; s++) {
                if (hnums[s] == '')
                    continue;
                bf = false;
                //var hno = hnums[s];
                for (var s1 = 0; s1 < sigs; s1++) {
                    if (psig[s1] == Number(hnums[s])) {
                        bf = true;
                    }
                }
                if (!bf)
                    psig[sigs++] = Number(hnums[s]);
                //console.log('Total significators of ' + arr[vi] + ' = ' + sigs.toString());
            }
            for (var i = 0; i < sigs; ++i) {
                for (var j = i + 1; j < sigs; ++j) {
                    if (psig[i] > psig[j]) {
                        var a = psig[i];
                        psig[i] = psig[j];
                        psig[j] = a;
                    }
                }
            }
            //console.log('Total significators of ' + arr[vi] + ' = ' + sigs.toString());
            var p_sigs = '';
            for (var s = 0; s < sigs; s++) {
                p_sigs += psig[s].toString() + ',';
            }
            // console.log('Significators of ' + arr[vi] + '= ' + p_sigs);
            this.oPlanet[arr[vi]].sig = p_sigs;
            this.oPlanet[arr[vi]].lif_e = this.analyze_life_evts(arr[vi], p_sigs);
            if (arr[vi] != 'rahu' && arr[vi] != 'ketu') {
                var hos = this.get_own_houses(arr[vi].toLowerCase());
                //console.log('get_indicators ' +  arr[vi].toLowerCase() + hos);
                var anls = 'In your horoscope ' + arr[vi].toUpperCase() + ' is the LORD of ' + hos + ' HOUSES. ';
                var inds = this.get_indicators2(arr[vi].toLowerCase(), hos);
                anls += inds;
                //console.log(inds);
                this.oPlanet[arr[vi]].inds = anls;
            }
            this['krk' + (vi + 1).toString()] = this.oPlanet[arr[vi]].lif_e;
            //t_owns = sl_hno + ',';
            //if(hno.toString() != sl_hno.toString()) {
            //	this['L2ps' + (vi+1).toString()] = hno.toString() + ',';
            //t_owns += hno.toString() + ',';
            // }
            //var oHs = sl_own_hnos.split(',');
            //let owns: string = '';
            //for(var o = 0; o < oHs.length; o++) {
            //   if(oHs[o] != hno.toString() && oHs[o] != sl_hno.toString())
            //     owns += oHs[o] + ',';
            //}
            //if(owns != '') {
            //	this['L3ps' + (vi+1).toString()] = owns;
            //	t_owns += owns;
            //}
            //owns = '';
            //var oPs = t_owns.split(',');
            //for(var o = 0; o < oHs.length; o++) {
            //  if(oPs[o] != hno.toString() && oHs[o] != sl_hno.toString())
            //     owns += oHs[o] + ',';
            // }
            //if(owns != '') {
            //  this['L4ps' + (vi+1).toString()] = owns;
            //}
        }
        //find house significators
        for (var _f = 0, _g = Object.keys(hPos); _f < _g.length; _f++) {
            var key = _g[_f];
            var hsig = [];
            var sigs = 0;
            //console.log(this.oHouse[key]);
            var v_iter_2 = Number(key);
            var cur_h = (v_iter_2 == 12) ? 1 : v_iter_2 + 1;
            var pls_in_h = this.get_pls_in_hou_ex(this.oHouse[v_iter_2].pos, this.oHouse[cur_h].pos);
            if (pls_in_h != '') {
            }
            else {
            }
            //var str_in_h = this.get_str_in_h(
            var pls_in_str = this.get_pls_in_star_occ(pls_in_h);
            var pls_in_str_o = this.get_pls_in_star(this.oHouse[v_iter_2].sign);
            var hou_owner = this.oHouse[v_iter_2].sign;
            this['hn' + (v_iter_2).toString()] = (v_iter_2).toString();
            this['L1hs' + (v_iter_2).toString()] = pls_in_str;
            for (var s = 0; s < pls_in_str.split(',').length; s++) {
                hsig[sigs++] = pls_in_str.split(',')[s];
            }
            this['L2hs' + (v_iter_2).toString()] = this.translate(pls_in_h);
            var bf = false;
            var pnets = pls_in_h.split(',');
            for (var s = 0; s < pnets.length; s++) {
                bf = false;
                for (var s1 = 0; s1 < sigs; s1++) {
                    if (hsig[s1] == pnets[s]) {
                        bf = true;
                    }
                }
                if (!bf)
                    hsig[sigs++] = pnets[s];
            }
            this['L3hs' + (v_iter_2).toString()] = pls_in_str_o;
            pnets = pls_in_str_o.split(',');
            for (var s = 0; s < pnets.length; s++) {
                bf = false;
                for (var s1 = 0; s1 < sigs; s1++) {
                    if (hsig[s1] == pnets[s]) {
                        bf = true;
                    }
                }
                if (!bf)
                    hsig[sigs++] = pnets[s];
            }
            this['L4hs' + (v_iter_2).toString()] = hou_owner;
            bf = false;
            for (var s = 0; s < sigs; s++) {
                if (hsig[s] == hou_owner) {
                    bf = true;
                }
            }
            if (!bf)
                hsig[sigs++] = hou_owner;
            //let h_sigs: string = '';
            for (var h = 0; h < sigs; h++)
                this.oHouse[v_iter_2].sig += hsig[h] + ',';
            //var oPS = pls_in_str.split(',');
            //var oPH = pls_in_h.split(',');
            //let pls: string = '';
            //let t_pls: string = pls_in_str;
            //for(var h = 0; h < oPH.length; h++) {
            // let found: boolean = false;
            //for(var p = 0; p < oPS.length; p++) {
            //   if(oPS[p] == oPH[h]) found = true;
            //}
            //if(found == false)
            //	pls += oPH[h] + ',';
            //}
            //if(pls != '') {
            //this['L2hs' + (i+1).toString()] = pls;
            //t_pls = pls;
            //}
            //var oTPLs = t_pls.split(',');
            //var oPSo = pls_in_str_o.split(',');
            //pls = '';
            //for(var t = 0; t < oTPLs.length; t++) {
            //  let found: boolean = false;
            //for(var p = 0; p < oPSo.length; p++) {
            // if(oPS[p] == oTPLs[t]) found = true;
            //}
            //if(found == false)
            //	pls += oPH[h] + ',';
            //}
            //if(pls != '') {
            //this['L3hs' + (i+1).toString()] = pls;
            //t_pls += pls;
            //}
            //oTPLs = t_pls.split(',');
            //pls = '';
            //let fou: boolean = false;
            //for(var t = 0; t < oTPLs.length; t++) {
            // if(hou_owner == oTPLs[t]) fou = true;
            //}
            //if(fou == false)
            //this['L4hs' + (i+1).toString()] = hou_owner; 
        }
        this.renderer.appendChild(this.birthChart.nativeElement, this.grid(4, this.device_width / 4, this.device_width, plPos));
        var bstar = this.calcBirthStar(this.moon_sign, this.moon_deg);
        console.log(bstar);
        this.shareService.setBirthStar(bstar.split('|')[0]);
        //balance dasha calculation
        var m_dy = 30.436875;
        var d_yr = 365.2425;
        //let vim_c: number = (parseInt(dasha_conv[this.moon_sign], 10) + this.moon_deg) / 120;
        //var vim_s = vim_c.toString();
        //var vim_b = '0.' + vim_s.split('.')[1];
        //var vim_a = parseFloat(vim_b) * 9;
        //vim_b = vim_a.toString();
        //var cosl = Math.floor(vim_a);
        //var rul = const_ruler[cosl.toString()];
        //var das = dashas[rul];
        //var ela = parseFloat('.' + vim_b.split('.')[1]) * parseInt(das, 10);
        //var rem = parseInt(das, 10) - ela;
        var rem_days = 0;
        var ras_num = Number(o_rashis[this.moon_sign].split('\|')[0]);
        var mon_crs = (ras_num - 1) * 30;
        var moon_ela = (this.moon_deg.toString().indexOf('.') > -1) ? mon_crs + Number(this.moon_deg.toString().split('.')[0]) : mon_crs + this.moon_deg;
        if (this.moon_deg.toString().indexOf('.') > -1) {
            moon_ela = Number(moon_ela.toString() + '.' + this.moon_deg.toString().split('.')[1]);
        }
        if (moon_ela.toString().indexOf('.') > -1) {
            if (moon_ela.toString().split('.')[1].length > 2)
                moon_ela = Number(moon_ela.toFixed(2));
        }
        if (moon_ela.toString().indexOf('.') > -1) {
            var rem1 = Number(moon_ela.toString().split('.')[0]) * 60 + Number(moon_ela.toString().split('.')[1]);
            rem1 = rem1 / 800;
            //rem1 = Number(das)*rem1;
            if (rem1.toString().indexOf('.') > -1) {
                //if(rem1.toString().split('.')[1].length > 2)
                //rem1 = rem1.toFixed(2);
                rem1 = Number('0.' + rem1.toString().split('.')[1]) * 800;
            }
            var das = dashas[bstar.split('|')[2].substring(0, 2).toLowerCase()];
            var m_bal = 800 - rem1;
            var tot_das = Number(das) * d_yr;
            var bal_das = (tot_das * m_bal) / 800;
            var bal_y = bal_das / d_yr;
            var rem_s = bal_y.toString();
            if (rem_s.indexOf('.') > -1) {
                var rem_y = Number(rem_s.split('.')[0]);
                if (Number(rem_s.split('.')[1]) > 0) {
                    var rem_m = parseFloat('0.' + rem_s.split('.')[1]) * d_yr;
                    rem_m = rem_m / m_dy;
                    if (rem_m.toString().indexOf('.') > -1) {
                        //if(rem_m.toString().split('.')[1].length > 1)
                        // rem_m = Number(rem_m.toFixed(1));
                        var rem_d = Number('0.' + rem_m.toString().split('.')[1]) * m_dy;
                        rem_m = Number(rem_m.toString().split('.')[0]);
                        rem_days = rem_y * d_yr + rem_m * m_dy + rem_d;
                    }
                }
            }
            else {
                rem_days = Number(rem_s) * d_yr;
            }
        }
        else {
            var rem1 = moon_ela * 60;
            rem1 = rem1 / 800;
            var rem_s = rem1.toString();
            rem_days = rem1 * d_yr;
        }
        console.log(rem_days);
        //build vimsottara dasha table
        var dob_c = new Date(this.shareService.getDOB());
        console.log(dob_c.toString());
        dob_c.setDate(dob_c.getDate() + rem_days);
        console.log(dob_c.toString());
        console.log('Antar' + bstar.split('|')[2] + this.shareService.getDOB() + rem_days.toString());
        this.buildAntarDasha(bstar.split('|')[2], 1, new Date(this.shareService.getDOB()), rem_days);
        var arr = ["sun", "moon", "mars", "rahu", "jupiter", "saturn", "mercury", "ketu", "venus"];
        var v_start = 0;
        var v_iter = 0;
        for (var vi = 0, len = arr.length; vi < len; vi++) {
            if (v_start) {
                v_iter++;
                var startdt = new Date(dob_c.getTime());
                var m = (dob_c.getMonth() + 1).toString();
                var dd = dob_c.getDate().toString();
                var y = dob_c.getFullYear().toString();
                dob_c.setDate(dob_c.getDate() + Number(dashas[arr[vi].substring(0, 2).toLowerCase()]) * d_yr);
                console.log('Antar' + arr[vi]);
                console.log(startdt.toString());
                this.buildAntarDasha(arr[vi], v_iter + 1, startdt, 0);
            }
            if (arr[vi] == bstar.split('|')[2]) {
                v_start = 1;
            }
            if (vi == 8)
                vi = -1;
            if (v_iter == 8)
                break;
        }
        //PREDICTIONS
        this.horoService.getDashTrans(this.mdas1, this.adas1, this.pdas1, this.pend1)
            .subscribe(function (res) {
            _this.publishReport(res);
        }, function (err) {
        });
    };
    KpAstroPage.prototype.get_h_from_h = function (s_h, d_h) {
        var h = s_h;
        for (var i = h; i < d_h; i++) {
            if (i > 12)
                i = 1;
            if (i == d_h)
                return i;
        }
        return -1;
    };
    KpAstroPage.prototype.analyze_life_evts = function (lord, lsig) {
        console.log('analyze_life_evts ' + lord + ' sigs=' + lsig);
        var lif_e = '';
        for (var _i = 0, _a = Object.keys(house_groups); _i < _a.length; _i++) {
            var key = _a[_i];
            //console.log(key);
            var h_g = '';
            var sigs = key.split('-');
            //console.log(sigs[0]);
            var idx = sigs[0].indexOf('(');
            //console.log('Index=' + idx.toString());
            if (idx != -1) {
                var s_h = Number(sigs[0].match(/\(([^)]+)\)/)[1]);
                //console.log(s_h);
                var hno = (idx == -1) ? sigs[0] : sigs[0].substring(0, idx + 1);
                //console.log(hno);
                var d_h = Number(hno);
                //console.log(d_h);
                //if(idx != -1)
                sigs[0] = this.get_h_from_h(s_h, d_h).toString();
            }
            //console.log(sigs[0]);
            var sig_c = 0;
            if (lsig.split(',')[0] == sigs[0]) { //primary house satisfied
                // console.log('Primary house ' + sigs[0] + ' is satisfied');
                h_g += sigs[0] + '-';
                sig_c++;
                var lsigs = lsig.split(',');
                for (var i = 1; i < sigs.length; i++) {
                    if (sigs[i].indexOf('(') != -1) {
                        var s_h = Number(sigs[i].match(/\(([^)]+)\)/)[1]);
                        //console.log(s_h);
                        idx = sigs.indexOf('(');
                        //console.log('Index=' + idx.toString());
                        hno = (idx == -1) ? sigs[0] : sigs[0].substring(0, idx + 1);
                        //console.log(hno);
                        var d_h = Number(hno);
                        //console.log(d_h);
                        sigs[i] = this.get_h_from_h(s_h, d_h).toString();
                    }
                    else if (sigs[i] == 'BADH' || signs[i] == 'CUSP') {
                        continue;
                    }
                    else if (sigs[i] == 'MARS' && sigs[i].toLowerCase() != lord) {
                        continue;
                    }
                    for (var j = i; j < lsigs.length; j++) {
                        if (lsigs[j] == sigs[i]) { //supporting house satisfied
                            h_g += sigs[i] + '-';
                            sig_c++;
                        }
                    }
                }
                if (sigs.length == sig_c) { //life event statisfied
                    console.log('life event satisfied ' + house_groups[key]);
                    lif_e += h_g + '|' + house_groups[key] + ';';
                }
            }
        }
        return lif_e;
    };
    KpAstroPage.prototype.get_sub_neg = function (t_h, lif_e) {
        var sub_n = '';
        var lifs = lif_e.split(';');
        for (var i = 0; i < lifs.length; i++) {
            if (lifs[i] == '')
                continue;
            var hgs = lifs[i].split('|')[0];
            var ths = t_h.split(',');
            for (var j = 0; j < ths.length; j++) {
                if (Number(hgs.split('-')[0]) == Number(ths[j]))
                    sub_n += lifs[i].split('|')[1];
            }
        }
        return sub_n;
    };
    KpAstroPage.prototype.get_sub_neg2 = function (s_h, lif_e) {
        var sub_n = '';
        var lifs = lif_e.split(';');
        for (var i = 0; i < lifs.length; i++) {
            if (lifs[i] == '')
                continue;
            var hgs = lifs[i].split('|')[0];
            var ths = s_h.split(',');
            var sub = '';
            for (var j = 0; j < ths.length; j++) {
                if (Number(hgs.split('-')[0]) == Number(ths[j]))
                    sub = (this.shareService.getLANG() == 'en') ? ' FAVOURS ' + lifs[i] : (this.shareService.getLANG() == 'te') ? lifs[i] + ' అనుకూలంగా  ఉంది ' : lifs[i] + ' अनुमति  है ';
                else {
                    var h12 = (Number(hgs.split('-')[0]) - 1 == 0) ? 12 : Number(hgs.split('-')[0]) - 1;
                    if (Number(ths[j]) == h12) {
                        sub = (this.shareService.getLANG() == 'en') ? ' OPPOSES ' + lifs[i] : (this.shareService.getLANG() == 'te') ? lifs[i] + ' అనుకూలంగా లేదు ' : lifs[i] + ' पक्ष नहीं है ';
                        break;
                    }
                }
            }
            if (sub != '') {
                sub_n += sub;
            }
        }
        if (sub_n == '') {
            sub_n = (this.shareService.getLANG() == 'en') ? ' FAVOURS this event ' : (this.shareService.getLANG() == 'te') ? ' అనుకూలంగా  ఉంది ' : ' अनुमति  है ';
        }
        return sub_n;
    };
    KpAstroPage.prototype.get_sub_neg3 = function (s_h, l_h) {
        var sub_n = '';
        var lhs = l_h.split(',');
        for (var i = 0; i < lhs.length; i++) {
            if (lhs[i] == '')
                continue;
            var ths = s_h.split(',');
            var bf = true;
            for (var j = 0; j < ths.length; j++) {
                var h12 = (Number(lhs[i]) - 1 == 0) ? 12 : Number(lhs[i]) - 1;
                if (Number(ths[j]) == h12) {
                    bf = false;
                    break;
                }
            }
            if (bf) {
                sub_n += lhs[i] + ',';
            }
        }
        return sub_n;
    };
    KpAstroPage.prototype.check_aspects = function (sign) {
        var plPos = this.shareService.getPLPOS();
        var chk_asp = '';
        var seven_asp = '';
        var sign_7 = aspects[sign + '-7'];
        if (plPos.hasOwnProperty(sign_7)) {
            var pls = plPos[sign_7].split('\|');
            for (var k = 0; k < pls.length; k++) {
                if (pls[k].split(' ')[1] != 'me' && pls[k].split(' ')[1].toLowerCase() != 'ra' && pls[k].split(' ')[1].toLowerCase() != 'ke' && ruler_name.hasOwnProperty(pls[k].split(' ')[1].toLowerCase())) {
                    seven_asp += ruler_name[pls[k].split(' ')[1].toLowerCase()] + ' ';
                }
            }
        }
        var five_asp = '';
        var sign_5 = aspects[sign + '-5'].split('\|')[1];
        if (plPos.hasOwnProperty(sign_5)) {
            pls = plPos[sign_5].split('\|');
            for (k = 0; k < pls.length; k++) {
                if (pls[k].split(' ')[1].toLowerCase() == 'ju' && ruler_name.hasOwnProperty(pls[k].split(' ')[1].toLowerCase())) {
                    five_asp += ruler_name[pls[k].split(' ')[1].toLowerCase()] + ' ';
                }
            }
        }
        var nine_asp = '';
        var sign_9 = aspects[sign + '-9'].split('\|')[1];
        if (plPos.hasOwnProperty(sign_9)) {
            pls = plPos[sign_9].split('\|');
            for (k = 0; k < pls.length; k++) {
                if (pls[k].split(' ')[1].toLowerCase() == 'ju') {
                    nine_asp += ruler_name[pls[k].split(' ')[1].toLowerCase()] + ' ';
                }
            }
        }
        var ten_asp = '';
        var sign_10 = aspects[sign + '-10'].split('\|')[1];
        if (plPos.hasOwnProperty(sign_10)) {
            pls = plPos[sign_10].split('\|');
            for (k = 0; k < pls.length; k++) {
                if (pls[k].split(' ')[1].toLowerCase() == 'sa' && ruler_name.hasOwnProperty(pls[k].split(' ')[1].toLowerCase())) {
                    ten_asp += ruler_name[pls[k].split(' ')[1].toLowerCase()] + ' ';
                }
            }
        }
        var three_asp = '';
        var sign_3 = aspects[sign + '-3'].split('\|')[1];
        if (plPos.hasOwnProperty(sign_3)) {
            pls = plPos[sign_3].split('\|');
            for (k = 0; k < pls.length; k++) {
                if (pls[k].split(' ')[1].toLowerCase() == 'sa' && ruler_name.hasOwnProperty(pls[k].split(' ')[1].toLowerCase())) {
                    three_asp += ruler_name[pls[k].split(' ')[1].toLowerCase()] + ' ';
                }
            }
        }
        //if (seven_asp.length > 0 || five_asp.length > 0 || three_asp.length > 0 || nine_asp.length > 0 || ten_asp.length > 0) {
        //chk_asp += '<h3>This house has</h3>';
        //}
        if (seven_asp.length > 0) {
            chk_asp += '7|' + seven_asp + ';'; //'<span><strong> 7th aspect from ' + seven_asp + '. </strong></span>';
        }
        if (five_asp.length > 0) {
            chk_asp += '5|' + five_asp + ';'; //'<span><strong> 5th aspect from ' + five_asp + '. </strong></span>';
        }
        if (nine_asp.length > 0) {
            chk_asp += '9|' + nine_asp + ';'; //'<span><strong> 9th aspect from ' + nine_asp + '. </strong></span>';
        }
        if (three_asp.length > 0) {
            chk_asp += '3|' + three_asp + ';'; //'<span><strong> 3rd aspect from ' + three_asp + '. </strong></span>';
        }
        if (ten_asp.length > 0) {
            chk_asp += '10|' + ten_asp + ';'; //'<span><strong> 10th aspect from ' + ten_asp + '. </strong></span>';
        }
        return chk_asp;
    };
    KpAstroPage.prototype.get_indicators2 = function (lord, houses) {
        var ind = '';
        var das = '';
        if (lord == "venus")
            das = venus;
        else if (lord == "sun")
            das = sun;
        else if (lord == "moon")
            das = moon;
        else if (lord == "mars")
            das = mars;
        else if (lord == "jupiter")
            das = jupiter;
        else if (lord == "saturn")
            das = saturn;
        else if (lord == "mercury")
            das = mercury;
        //else if(lord == "rahu" || lord == "ketu") {   //in case rahu/ketu need to consider the lord conjoined or aspecting or sign lord or constellation lord
        //das = ketu;
        //}
        var hou = houses.split(',');
        for (var h = 0; h < hou.length; h++) {
            if (hou[h].trim() == '')
                continue;
            ind += (h > 0) ? ' and ' + lord.toUpperCase() + ' as ' + hou[h] + ' house lord offers ' : lord.toUpperCase() + ' as ' + hou[h] + ' house lord offers ';
            ind += das[hou[h].trim()] + ',';
        }
        return ind;
    };
    KpAstroPage.prototype.get_indicators = function (lord, houses) {
        var ind = '';
        var das = '';
        if (lord == "venus")
            das = venus;
        else if (lord == "sun")
            das = sun;
        else if (lord == "moon")
            das = moon;
        else if (lord == "mars")
            das = mars;
        else if (lord == "jupiter")
            das = jupiter;
        else if (lord == "saturn")
            das = saturn;
        else if (lord == "mercury")
            das = mercury;
        //else if(lord == "rahu" || lord == "ketu") {   //in case rahu/ketu need to consider the lord conjoined or aspecting or sign lord or constellation lord
        //das = ketu;
        //}
        var hou = houses.split(',');
        for (var h = 0; h < hou.length; h++) {
            if (hou[h].trim() == '')
                continue;
            ind += das[hou[h].trim()] + ',';
        }
        return ind;
    };
    KpAstroPage.prototype.publishReport = function (stars) {
        this.showGrid = true;
        var cur_sssl = '';
        var cur_trans_l = '';
        var cur_star = '';
        var ntrans = 0;
        var visited = '';
        console.log(stars);
        this.mon = stars[0].date.split(',')[0].split(' ')[1];
        this.yer = stars[0].date.split(',')[1].split(' ')[0];
        //	(stars[0].date.indexOf(',') > -1) ?	this.mon = Number(stars[0]date.split(',')[0].split('-')[1]) : this.mon = Number(stars[0].date.split('-')[1]);
        this.mcnt++;
        this.renderer.appendChild(this.cal1.nativeElement, this.drawCal(6, this.device_width / 6, this.device_width, stars));
        var c = false;
        for (var i = 0; i < stars.length; i++) {
            if (this.mon != stars[i].date.split(',')[0].split(' ')[1]) {
                this.mon = stars[i].date.split(',')[0].split(' ')[1];
                this.yer = stars[i].date.split(',')[1].split(' ')[0];
                c = true;
                break;
            }
        }
        if (c) {
            //this.showCal2 = true;
            this.mcnt++;
            this.renderer.appendChild(this.cal2.nativeElement, this.drawCal(6, this.device_width / 6, this.device_width, stars));
        }
        c = false;
        for (var j = i; j < stars.length; j++) {
            if (this.mon != stars[j].date.split(',')[0].split(' ')[1]) {
                this.mon = stars[j].date.split(',')[0].split(' ')[1];
                this.yer = stars[j].date.split(',')[1].split(' ')[0];
                c = true;
                break;
            }
        }
        if (c) {
            //this.showCal2 = true;
            this.mcnt++;
            this.renderer.appendChild(this.cal3.nativeElement, this.drawCal(6, this.device_width / 6, this.device_width, stars));
        }
        c = false;
        for (var k = j; k < stars.length; k++) {
            if (this.mon != stars[k].date.split(',')[0].split(' ')[1]) {
                this.mon = stars[k].date.split(',')[0].split(' ')[1];
                this.yer = stars[k].date.split(',')[1].split(' ')[0];
                c = true;
                break;
            }
        }
        if (c) {
            //this.showCal2 = true;
            this.mcnt++;
            this.renderer.appendChild(this.cal4.nativeElement, this.drawCal(6, this.device_width / 6, this.device_width, stars));
        }
    };
    KpAstroPage.prototype.drawCal = function (numberPerSide, size, pixelsPerSide, naks) {
        var wks = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.renderer.setAttribute(svg, "width", pixelsPerSide);
        this.renderer.setAttribute(svg, "height", pixelsPerSide + 25);
        this.renderer.setAttribute(svg, "viewBox", [0, 0, numberPerSide * size, 25 + (numberPerSide + 1) * size].join(" "));
        var gm = document.createElementNS("http://www.w3.org/2000/svg", "g");
        var bt = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        this.renderer.setAttribute(bt, "width", pixelsPerSide.toString());
        this.renderer.setAttribute(bt, "height", "25");
        this.renderer.setAttribute(bt, "border", "1");
        this.renderer.setAttribute(bt, "stroke", "#000000");
        this.renderer.setAttribute(bt, "fill", "#f9d35c");
        this.renderer.setAttribute(bt, "id", "b999");
        this.renderer.appendChild(gm, bt);
        var my = (this.shareService.getLANG() == 'en') ? mon_weeks[this.mon.toLowerCase()].split('|')[0] + ' ' + this.yer : (this.shareService.getLANG() == 'te') ? mon_weeks[this.mon.toLowerCase()].split('|')[1] + ' ' + this.yer : mon_weeks[this.mon.toLowerCase()].split('|')[2] + ' ' + this.yer;
        var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        this.renderer.appendChild(text, document.createTextNode(my));
        this.renderer.setAttribute(text, "font-size", "15px");
        this.renderer.setAttribute(text, "font-weight", "bold");
        this.renderer.setAttribute(text, "x", "50%");
        this.renderer.setAttribute(text, "y", "12");
        this.renderer.setAttribute(text, "alignment-baseline", "middle");
        this.renderer.setAttribute(text, "text-anchor", "middle");
        this.renderer.setAttribute(text, "id", "t999");
        this.renderer.appendChild(gm, text);
        var bh = 25;
        //let cal: any = null;
        var pday = 0;
        var oTDs = [];
        for (var k = 0; k < 7; k++) {
            bt = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            this.renderer.setAttribute(bt, "width", size.toString());
            this.renderer.setAttribute(bt, "height", size.toString());
            this.renderer.setAttribute(bt, "y", bh.toString());
            this.renderer.setAttribute(bt, "border", "1");
            this.renderer.setAttribute(bt, "stroke", "#000000");
            this.renderer.setAttribute(bt, "fill", "#f9d35c");
            this.renderer.setAttribute(bt, "id", "b999");
            this.renderer.appendChild(gm, bt);
            text = document.createElementNS("http://www.w3.org/2000/svg", "text");
            this.renderer.appendChild(text, document.createTextNode((this.shareService.getLANG() == 'en') ? wks[k] : (this.shareService.getLANG() == 'te') ? mon_weeks[wks[k]].split('|')[1] : mon_weeks[wks[k]].split('|')[2]));
            this.renderer.setAttribute(text, "font-size", "15px");
            this.renderer.setAttribute(text, "font-weight", "bold");
            this.renderer.setAttribute(text, "alignment-baseline", "middle");
            this.renderer.setAttribute(text, "text-anchor", "middle");
            this.renderer.setAttribute(text, "x", (size / 2).toString());
            this.renderer.setAttribute(text, "y", (size / 2 + bh).toString());
            this.renderer.setAttribute(text, "id", "t999");
            bh += size;
            this.renderer.appendChild(gm, text);
            svg.appendChild(gm);
            var oW = [];
            oW = this.getWeekDays(naks, wks[k]);
            var dx = 0;
            for (var _i = 0, _a = Object.keys(oW); _i < _a.length; _i++) {
                var key = _a[_i];
                dx++;
                if (dx == 1 && wks[k] == 'SUN' && oW[key].dmon > 1) {
                    dx++;
                }
                else if (dx == 1 && wks[k] == 'MON' && oW[key].dmon > 2) {
                    dx++;
                }
                else if (dx == 1 && wks[k] == 'TUE' && oW[key].dmon > 3) {
                    dx++;
                }
                else if (dx == 1 && wks[k] == 'WED' && oW[key].dmon > 4) {
                    dx++;
                }
                else if (dx == 1 && wks[k] == 'THU' && oW[key].dmon > 5) {
                    dx++;
                }
                else if (dx == 1 && wks[k] == 'FRI' && oW[key].dmon > 6) {
                    dx++;
                }
                else if (dx == 1 && wks[k] == 'SAT' && oW[key].dmon > 7) {
                    dx++;
                }
                var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
                var box = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                this.renderer.setAttribute(box, "width", size.toString());
                this.renderer.setAttribute(box, "height", size.toString());
                this.renderer.setAttribute(box, "border", "1");
                this.renderer.setAttribute(box, "stroke", "#000000");
                this.renderer.setAttribute(box, "fill", "#ffffff");
                this.renderer.setAttribute(box, "id", "b" + k.toString() + dx.toString());
                this.renderer.setAttribute(box, "x", (size * dx).toString());
                this.renderer.setAttribute(box, "y", (size * k + 25).toString());
                this.renderer.appendChild(g, box);
                var text1 = document.createElementNS("http://www.w3.org/2000/svg", "text");
                this.renderer.appendChild(text1, document.createTextNode(naks[key].date.split(',')[0].split(' ')[2]));
                this.renderer.setAttribute(text1, "font-size", "15px");
                this.renderer.setAttribute(text1, "font-weight", "bold");
                this.renderer.setAttribute(text1, "alignment-baseline", "middle");
                this.renderer.setAttribute(text1, "text-anchor", "middle");
                this.renderer.setAttribute(text1, "x", (size * dx + size / 2).toString());
                this.renderer.setAttribute(text1, "y", (size * k + 25 + size / 2).toString());
                this.renderer.setAttribute(text1, "id", "t1" + k.toString() + dx.toString());
                //var br = document.createElement("br");
                //this.renderer.appendChild(text1, document.createElement("br"));
                g.appendChild(text1);
                //oPl :PlanetPos[] = [];
                //oPl = get_pl_trans(key);
                var pcx = dx * size + size / 2;
                var pn = 0;
                //let trk: string = '';
                var pls = '';
                //for(let wk of Object.keys(oW)) {
                if (oW[key].sssl != '') {
                    console.log(oW[key].sssl);
                    var sls = oW[key].sssl.split(',');
                    for (var s = 0; s < sls.length; s++) {
                        console.log(sls[s]);
                        if (sls[s].indexOf('|') < 0)
                            continue;
                        var pl = sls[s].split('|')[1].split('-')[2].split(' ')[1];
                        pls += pl + ' ';
                        var trk_d = oW[key].date.split(',')[0].split(' ')[2];
                        //string = ruler_name[pl.toLowerCase()] + '-' + sls[s].split('|')[1].split('-')[0] + '-' + sls[s].split('|')[0].split('-')[2];
                        if (oTDs.hasOwnProperty(trk_d)) {
                            var trns = oTDs[trk_d];
                            trns += ',' + ruler_name[pl.toLowerCase()] + '-' + sls[s].split('|')[1].split('-')[0] + '-' + sls[s].split('|')[0].split('-')[2];
                            console.log(trns + ' on ' + trk_d);
                            oTDs[trk_d] = trns;
                        }
                        else {
                            //let tday: TransitDays = {
                            //	days: oW[key].dmon
                            //};
                            console.log(ruler_name[pl.toLowerCase()] + '-' + sls[s].split('|')[1].split('-')[0] + '-' + sls[s].split('|')[0].split('-')[2] + ' on ' + trk_d);
                            oTDs[trk_d] = ruler_name[pl.toLowerCase()] + '-' + sls[s].split('|')[1].split('-')[0] + '-' + sls[s].split('|')[0].split('-')[2];
                        }
                    }
                }
                //}
                if (pls != '') {
                    var text2 = document.createElementNS("http://www.w3.org/2000/svg", "text");
                    this.renderer.appendChild(text2, document.createTextNode(pls));
                    this.renderer.setAttribute(text2, "font-size", "10px");
                    this.renderer.setAttribute(text2, "font-weight", "bold");
                    this.renderer.setAttribute(text2, "x", (size * dx + size / 2).toString());
                    this.renderer.setAttribute(text2, "y", (size * k + 25 + size / 2 + 10).toString());
                    this.renderer.setAttribute(text2, "alignment-baseline", "middle");
                    this.renderer.setAttribute(text2, "text-anchor", "middle");
                    this.renderer.setAttribute(text2, "id", "t2" + k.toString() + dx.toString());
                    g.appendChild(text2);
                }
                //var br = document.createElement("br");
                //var crc = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                //pcx += 8;
                svg.appendChild(g);
            }
        }
        console.log('Transit days are :' + Object.keys(oTDs).length.toString());
        console.log(oTDs);
        if (Object.keys(oTDs).length > 0) {
            console.log('showing pred ' + this.mcnt.toString());
            this.pubTransRep(oTDs, this.mon);
        }
        console.log(svg);
        return svg;
    };
    KpAstroPage.prototype.getWeekDays = function (strs, wday) {
        var oWDays = [];
        var dmon = 0;
        for (var _i = 0, _a = Object.keys(strs); _i < _a.length; _i++) {
            var key = _a[_i];
            if (this.mon && strs[key].date.split(',')[0].split(' ')[1] != this.mon)
                continue;
            dmon++;
            if (strs[key].date.indexOf(wday) > -1) {
                var weekDay = {
                    dmon: dmon,
                    sssl: strs[key].sssl,
                    date: strs[key].date
                };
                console.log(key);
                console.log(strs[key].sssl);
                oWDays[key] = weekDay;
            }
        }
        return oWDays;
    };
    KpAstroPage.prototype.pubTransRep = function (trns, mon) {
        console.log('pubTransRep');
        // var mnths = ['JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE','JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER']
        var ptrns = [];
        var desc = '';
        var bvsted = false;
        desc += '<span><h2>PREDICTIONS FOR ' + mon_weeks[mon.toLowerCase()].split('|')[0] + '</h2></span>';
        var oPTs = [];
        for (var da = 1; da < 32; da++) {
            var pkey = '';
            (da < 10) ? pkey = '0' + da.toString() : pkey = da.toString();
            if (trns.hasOwnProperty(pkey)) {
                var tns = trns[pkey].split(',');
                for (var t = 0; t < tns.length; t++) {
                    if (tns[t] != '') {
                        (oPTs.hasOwnProperty(tns[t]) == true) ? oPTs[tns[t]] += ',' + da.toString() : oPTs[tns[t]] = da.toString();
                    }
                }
            }
        }
        for (var _i = 0, _a = Object.keys(oPTs); _i < _a.length; _i++) {
            var key = _a[_i];
            console.log(key);
            console.log(oPTs[key]);
            console.log(this.tvisits);
            var pnak = key.split('-')[0] + '-' + key.split('-')[1];
            bvsted = (this.tvisits.indexOf(pnak) < 0) ? false : true;
            console.log('bvsted=' + bvsted.toString());
            //if(unq.indexOf(key.split('-')[0] + '-' + key.split('-')[1]) < 0) {
            var dys = oPTs[key].toString().split(',');
            //sort
            //for(var i = 0; i < dys.length; i++)
            //{
            //for (var j = i + 1; j < dys.length; j++)
            //{
            //if (Number(dys[j]) < Number(dys[i]))
            //{
            //let tmp: string = dys[i];
            //dys[i] = dys[j];
            //dys[j] = tmp;
            //}
            //}
            //}
            var dts = '';
            var nd = 0;
            var seq = [];
            var inds = [];
            var d = 0;
            var t_dys = '';
            console.log('Normalizing..');
            while (dys.length) {
                console.log(' while ' + dys);
                if (d + 1 < dys.length) {
                    if (Number(dys[d + 1]) - Number(dys[d]) == 1) {
                        seq.push(Number(dys[d]));
                        seq.push(Number(dys[d + 1]));
                        dys.splice(d, 2); //clear 2 dys
                        //d = 0; //reset;
                    }
                    else {
                        console.log('no of items in seq=' + seq.length.toString());
                        //seq broke
                        if (seq.length) {
                            console.log(seq);
                            t_dys += (t_dys == '') ? seq[0].toString() + this.get_day_posix(seq[0]) + '-' + seq[seq.length - 1].toString() + this.get_day_posix(seq[seq.length - 1]) : ' & ' + seq[0].toString() + this.get_day_posix(seq[0]) + '-' + seq[seq.length - 1].toString() + this.get_day_posix(seq[seq.length - 1]);
                            seq.splice(0, seq.length); //clear all seq
                        }
                        else {
                            //no seq
                            t_dys += (t_dys == '') ? 'On ' + dys[d] + this.get_day_posix(Number(dys[d])) : ',' + dys[d] + this.get_day_posix(Number(dys[d]));
                            dys.splice(d, 1); //clear 1 dys
                            //d = 0; //reset
                        }
                    }
                }
                else {
                    //there is one element
                    console.log('there is 1 element, no of items in seq=' + seq.length.toString() + ' d=' + d.toString());
                    if (seq.length) {
                        console.log(seq);
                        console.log(dys);
                        if (Number(dys[d]) - seq[seq.length - 1] == 1) { //seq
                            t_dys += (t_dys == '') ? seq[0].toString() + this.get_day_posix(seq[0]) + '-' + dys[d].toString() + this.get_day_posix(Number(dys[d])) : ' & ' + seq[0].toString() + this.get_day_posix(seq[0]) + '-' + seq[seq.length - 1].toString() + this.get_day_posix(seq[seq.length - 1]);
                            seq.splice(0, seq.length); //clear all seq
                            dys.splice(d, 2); //clear 2 dys
                        }
                        else {
                            t_dys += (t_dys == '') ? seq[0].toString() + this.get_day_posix(seq[0]) + '-' + seq[seq.length - 1].toString() + this.get_day_posix(seq[seq.length - 1]) : ' & ' + seq[0].toString() + this.get_day_posix(seq[0]) + '-' + seq[seq.length - 1].toString() + this.get_day_posix(seq[seq.length - 1]);
                            seq.splice(0, seq.length); //clear all seq
                            t_dys += (t_dys == '') ? 'On ' + dys[d] + this.get_day_posix(Number(dys[d])) : ',' + dys[d] + this.get_day_posix(Number(dys[d]));
                            dys.splice(d, 1); //clear 1 dys
                            //d = 0; //reset
                        }
                    }
                    else {
                        console.log(dys);
                        console.log('d=' + d.toString());
                        t_dys += (t_dys == '') ? 'On ' + dys[d] + this.get_day_posix(Number(dys[d])) : ',' + dys[d] + this.get_day_posix(Number(dys[d]));
                        dys.splice(d, 1); //clear 1 dys
                        //d = 0;  //reset
                    }
                }
                //d++;
                //(d >= dys.length) ? d = 0 : d += 1;
            }
            console.log('sssl=', key);
            var star_lord = nakshatra_order[key.split('-')[1]].ruler;
            console.log('star lord=' + star_lord);
            var const_lord = this.oPlanet[star_lord].star;
            console.log('const lord=' + const_lord);
            var das_l = '';
            if (star_lord == this.mdas1.toLowerCase()) {
                das_l = (this.shareService.getLANG() == 'en') ? 'Maha Dasha' : (this.shareService.getLANG() == 'te') ? ' మహా దశ' : 'महा दशा';
            }
            else if (star_lord == this.adas1.toLowerCase()) {
                das_l = (this.shareService.getLANG() == 'en') ? 'Antar Dasha' : (this.shareService.getLANG() == 'te') ? ' అంతర్ దశ' : 'अन्तर दशा';
            }
            else if (star_lord == this.pdas1.toLowerCase()) {
                das_l = (this.shareService.getLANG() == 'en') ? 'Pratyantar Dasha' : (this.shareService.getLANG() == 'te') ? ' ప్రత్యాంతర దశ' : 'प्रत्यंतर दशा';
            }
            if (this.shareService.getLANG() == 'te') {
                if (!bvsted) {
                    desc += '<span>' + t_dys + 'తేదీలలో<span class="blueText"> ' + this.translate(ruler_name[key.split('-')[0].substring(0, 2).toLowerCase().toLowerCase()]) + ' </span> <span class="color:#greenText">' + this.translate(key.split('-')[1]) + '</span> నక్షత్రము  లో  గోచరించ  నుంది  <span class="blueText"> ' + this.translate(ruler_name[key.split('-')[0].substring(0, 2).toLowerCase().toLowerCase()]) + '</span><span class="redText"> ' + this.translate(key.split('-')[2]) + '</span> సబ్ లో  గోచరించ  నుంది ఈ నక్షత్రానికి ప్రభువు  <span class="brownText">' + this.translate(star_lord) + '</span>' + ' ప్రస్తుత  <span class="boldText"' > +das_l + '</span> ప్రభువు </span>';
                    // పుట్టిన చార్టు లో ఈ గ్రహం' + this.translate(const_lord)  + ' ప్రభువు యొక్క నక్షత్రం లో ఉంది</span>';
                }
                else {
                    desc += '<span>' + t_dys + 'తేదీలలో<span class="blueText"> ' + this.translate(ruler_name[key.split('-')[0].substring(0, 2).toLowerCase().toLowerCase()]) + '</span><span class="redText"> ' + this.translate(key.split('-')[2]) + '</span> సబ్ లో కి ప్రవేశిస్తుంది';
                }
            }
            else if (this.shareService.getLANG() == 'hi') {
                if (!bvsted) {
                    desc += '<span>' + t_dys + 'तिथियों में<span class="blueText"> ' + this.translate(ruler_name[key.split('-')[0].substring(0, 2).toLowerCase().toLowerCase()]) + ' </span> <span class="greenText">' + this.translate(key.split('-')[1]) + '</span>' + ' तारा  में  गोचर  होने वाला है ,  <span class="blueText">' + this.translate(ruler_name[key.split('-')[0].substring(0, 2).toLowerCase().toLowerCase()]) + '</span><span class="redText"> ' + this.translate(key.split('-')[2]) + '</span> सब  में  गोचर  होने वाला है  इस तारा के भगवान  <span class="brownText"> ' + this.translate(star_lord) + '</span>' + ' वर्तमान में सत्तारूढ़  <span class="boldText">' + das_l + '</span>भगवान  है </span>';
                    //जिन्होने  आपके कुंडली में  ' + this.translate(const_lord) +'  भगवान के तारे में है</span>';
                }
                else {
                    desc += '<span>' + t_dys + 'तिथियों में<span style="color:blue"> ' + this.translate(ruler_name[key.split('-')[0].substring(0, 2).toLowerCase().toLowerCase()]) + ' </span> <span style="color:#008000">' + this.translate(key.split('-')[1]) + '</span>' + ' ' + this.translate(key.split('-')[2]) + ' सब  में  में प्रवेश होगा </span>';
                }
            }
            else {
                if (!bvsted) {
                    desc += '<span> ' + t_dys + '<span class="blueText"> ' + ruler_name[key.split('-')[0].substring(0, 2).toLowerCase().toLowerCase()].toUpperCase() + ' </span> transits into the star <span class="greenText">' + key.split('-')[1].toUpperCase() + '</span> and in the SUB of <span class="redText">' + key.split('-')[2].toUpperCase() + ',</span> star lord <span class="brownText">' + star_lord.toUpperCase() + '</span> is your current <span class="boldText">' + das_l.toUpperCase() + '</span> lord</span>';
                    // who is in the star of lord ' + const_lord + ' in your birth chart .</span>';
                }
                else {
                    desc += '<span> ' + t_dys + '<span class="blueText"> ' + ruler_name[key.split('-')[0].substring(0, 2).toLowerCase().toLowerCase()] + ' </span> moves to <span class="redText">' + key.split('-')[2].toUpperCase() + ' </span> SUB </span>';
                }
            }
            if (this.oPlanet[star_lord].lif_e != '') {
                var neg = this.get_sub_neg2(this.oPlanet[key.split('-')[2]].sig, this.oPlanet[star_lord].lif_e);
                if (!bvsted) {
                    if (this.shareService.getLANG() == 'te') {
                        desc += '<span>. పుట్టిన చార్టు ఆధారంగా <span class="brownText">' + this.translate(star_lord) + '</span>  ' + this.oPlanet[star_lord].lif_e + ' ఇస్తుంది.  సుబ్ల్ర్డ్ <span class="redText"> ' + this.translate(key.split('-')[2]) + '</span>' + ' ' + neg + '</span>';
                    }
                    else if (this.shareService.getLANG() == 'hi') {
                        desc += '<span>. आपके कुंडली के अनुसार <span class="brownText"> ' + this.translate(star_lord) + '</span>  ' + this.oPlanet[star_lord].lif_e + ' दे देंगे.  सबलॉर्ड <span class="redText"> ' + this.translate(key.split('-')[2]) + '</span>' + ' ' + neg + '</span>';
                    }
                    else {
                        desc += '<span class="brownText">' + star_lord.toUpperCase() + '</span> in your horoscope causes ' + this.oPlanet[star_lord].lif_e;
                        desc += ' and the sub lord <span class="redText">' + key.split('-')[2].toUpperCase() + '</span>' + neg + '</span>';
                    }
                }
                else {
                    if (this.shareService.getLANG() == 'te') {
                        desc += ' ఎవరైతే  ' + neg + '</span>';
                    }
                    else if (this.shareService.getLANG() == 'hi') {
                        desc += '<span> जिन्हो ' + neg + '</span>';
                    }
                    else {
                        desc += ' who ' + neg + '</span>';
                    }
                }
            } //else {
            var neg2 = this.get_sub_neg3(this.oPlanet[key.split('-')[2]].sig, this.oPlanet[star_lord].sig);
            if (neg2 != '') {
                if (this.shareService.getLANG() == 'te') {
                    desc += '<span>. ఈ సమయంలో <span class="brownText"> ' + this.translate(star_lord) + ' </span>సిగ్నిఫికేటర్స్ అయిన  ' + neg2 + ' హౌస్ విషయాలు <span class="blueText"> ' + this.translate(key.split('-')[2]) + '</span> సిగ్నిఫికేటర్స్ అయిన  ' + this.oPlanet[key.split('-')[2]].sig + ' హౌస్ విషయాల ద్వారా  నెరవేరగలవు </span>';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    desc += '<span>. इस समय के दौरान <span class="brownText"> ' + this.translate(star_lord) + '</span> सिग्रिफिकेटर  ' + neg2 + ' घर के मामले  <span class="blueText">' + this.translate(key.split('-')[2]) + '</span> सिग्रिफिकेटर  ' + this.oPlanet[key.split('-')[2]].sig + ' घर के मामले  के द्वारा  सफल  हो सकता है</span>';
                }
                else {
                    desc += '<span>. During this time <span class="brownText">' + star_lord.toUpperCase() + '</span> significators ' + neg2 + ' house matters can get fulfilled through <span class="blueText">' + key.split('-')[2].toUpperCase() + '</span> significators ' + this.oPlanet[key.split('-')[2]].sig + ' house matters.</span>';
                }
            }
            //}
            desc += '<br/><br/>';
            if (this.tvisits.indexOf(pnak) < 0) {
                console.log('adding ' + key.split('-')[0] + '-' + key.split('-')[1] + ' to tvisits ');
                this.tvisits.push(key.split('-')[0] + '-' + key.split('-')[1]);
            }
            //unq.push(key.split('-')[0] + '-' + key.split('-')[1]);
            //} else {
            //}
        }
        this['mprd' + this.mcnt.toString()] = desc;
    };
    KpAstroPage.prototype.get_day_posix = function (d) {
        var px = '';
        switch (d) {
            case 1:
            case 21:
            case 31:
                px = "st";
                break;
            case 2:
            case 22:
                px = "nd";
                break;
            case 3:
            case 23:
                px = "rd";
                break;
            default:
                px = "th";
                break;
        }
        return (px);
    };
    KpAstroPage.prototype.get_pls_in_star = function (lord) {
        var pls = '';
        for (var _i = 0, _a = Object.keys(this.oPlanet); _i < _a.length; _i++) {
            var key = _a[_i];
            if (this.oPlanet[key].star == lord)
                pls += this.translate(key) + ',';
        }
        return pls;
    };
    KpAstroPage.prototype.get_pls_in_star_occ = function (o_pls) {
        var pls = '';
        var o_p = o_pls.split(',');
        for (var p = 0; p < o_p.length; p++) {
            for (var _i = 0, _a = Object.keys(this.oPlanet); _i < _a.length; _i++) {
                var key = _a[_i];
                if (this.oPlanet[key].star == o_p[p])
                    pls += this.translate(key) + ',';
            }
        }
        return pls;
    };
    //get_pls_in_hou(mins1: number, mins2: number)
    //{
    //  let pls: string = '';
    //  for(let key of Object.keys(this.oPlanet)) {
    //    console.log('Planet = ' + key + 'Planet pos = ' + this.oPlanet[key].pos + ' H start = ' + mins1.toString() + ' H end = ' + mins2.toString());
    //	if(mins1 < mins2)
    //		if(this.oPlanet[key].pos >= mins1 && this.oPlanet[key].pos <= mins2) pls += key + ',';
    //	else {		//360 case
    //		if((this.oPlanet[key].pos >= mins1 && this.oPlanet[key].pos <= 360*60) || (this.oPlanet[key].pos >= 0 && this.oPlanet[key].pos <= mins2)) pls += //key + ',';
    //	}
    //		
    //		
    //  }
    //  return pls;
    //}
    KpAstroPage.prototype.get_pls_in_hou_ex = function (mins1, mins2) {
        var pls = '';
        for (var _i = 0, _a = Object.keys(this.oPlanet); _i < _a.length; _i++) {
            var key = _a[_i];
            // console.log('Planet = ' + key + 'Planet pos = ' + this.oPlanet[key].pos + ' H start = ' + mins1.toString() + ' H end = ' + mins2.toString());
            if (this.oPlanet[key].pos >= mins1 && this.oPlanet[key].pos <= mins2)
                pls += this.translate(key) + ',';
            else if ((mins1 > mins2) && ((this.oPlanet[key].pos >= mins1 && this.oPlanet[key].pos <= 360 * 60) || (this.oPlanet[key].pos >= 0 && this.oPlanet[key].pos <= mins2))) {
                pls += this.translate(key) + ',';
                //console.log(key + ' is at ' + this.oPlanet[key].pos.toString() + ' which is between ' + mins1.toString() + ' and ' + mins2.toString());
            }
        }
        return pls;
    };
    KpAstroPage.prototype.get_pls_pos_in_hou_ex = function (mins1, mins2, sign) {
        var pls = '';
        for (var _i = 0, _a = Object.keys(this.oPlanet); _i < _a.length; _i++) {
            var key = _a[_i];
            console.log('Planet = ' + key + 'Planet pos = ' + this.oPlanet[key].pos + ' H start = ' + mins1.toString() + ' H end = ' + mins2.toString());
            if (this.oPlanet[key].pos >= mins1 && this.oPlanet[key].pos <= mins2)
                pls += key + ',';
            else if ((mins1 > mins2) && ((this.oPlanet[key].pos >= mins1 && this.oPlanet[key].pos <= 360 * 60) || (this.oPlanet[key].pos >= 0 && this.oPlanet[key].pos <= mins2))) {
                var pc = key.substring(0, 2);
                pc = pc.charAt(0).toUpperCase() + pc.slice(1);
                var pspos = (this.oPlanet[key].pos - signs_pos[sign]) / 60;
                pls += pc + ' ' + pspos.toString() + ',';
                console.log(key + ' is at ' + this.oPlanet[key].pos.toString() + ' which is between ' + mins1.toString() + ' and ' + mins2.toString());
            }
        }
        return pls;
    };
    KpAstroPage.prototype.get_hno_by_pos = function (mins) {
        //console.log(mins);
        for (var _i = 0, _a = Object.keys(this.oHouse); _i < _a.length; _i++) {
            var key = _a[_i];
            // console.log('key=' + key);
            var v_iter = Number(key);
            var cur_h = (v_iter == 12) ? 1 : v_iter + 1;
            var mins1 = this.oHouse[v_iter].pos;
            var mins2 = this.oHouse[cur_h].pos;
            if (mins >= mins1 && mins <= mins2)
                return v_iter;
            else if ((mins1 > mins2) && ((this.oHouse[key].pos >= mins1 && this.oHouse[key].pos <= 360 * 60) || (this.oHouse[key].pos >= 0 && this.oHouse[key].pos <= mins2)))
                return v_iter;
        }
        return (12);
    };
    KpAstroPage.prototype.get_hno_by_sign = function (sign) {
        var roms = ['I', 'II', 'III', 'IV', 'V', 'V1', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
        var spos_s = signs_pos[sign] * 60;
        var spos_e = (signs_pos[sign] + 30) * 60;
        var hno = '';
        //console.log('get_hno_by_sign ' + sign + ' spos_s ' + spos_s.toString() + ' spos_e ' + spos_e.toString());
        for (var _i = 0, _a = Object.keys(this.oHouse); _i < _a.length; _i++) {
            var key = _a[_i];
            var key_n = Number(key);
            // console.log('hno=' + key + ' pos=' + this.oHouse[key].pos.toString());
            if (this.oHouse[key].pos >= spos_s && this.oHouse[key].pos <= spos_e)
                hno += roms[key_n - 1] + ',';
        }
        // console.log(hno);
        //this.replaceAt(hno, ',', '', hno.length-1, hno.length-1); //remove extra coma
        return hno.substring(0, hno.length - 1);
    };
    KpAstroPage.prototype.replaceAt = function (input, search, replace, start, end) {
        return input.slice(0, start)
            + input.slice(start, end).replace(search, replace)
            + input.slice(end);
    };
    KpAstroPage.prototype.get_own_houses = function (lord) {
        var hno = '';
        for (var i = 0; i < Object.keys(this.oHouse).length; i++) {
            if (this.oHouse[i + 1].sign == lord)
                hno += (i + 1).toString() + ',';
        }
        return hno;
    };
    KpAstroPage.prototype.getDms = function (val) {
        // Required variables
        var valDeg, valMin, valSec, result;
        // Here you'll convert the value received in the parameter to an absolute value.
        // Conversion of negative to positive.
        // In this step it does not matter if it's North, South, East or West,
        // such verification was performed earlier.
        val = Math.abs(val); // -40.601203 = 40.601203
        // ---- Degrees ----
        // Stores the integer of DD for the Degrees value in DMS
        valDeg = Math.floor(val); // 40.601203 = 40
        // Add the degrees value to the result by adding the degrees symbol "º".
        result = valDeg + "º"; // 40º
        // ---- Minutes ----
        // Removing the integer of the initial value you get the decimal portion.
        // Multiply the decimal portion by 60.
        // Math.floor returns an integer discarding the decimal portion.
        // ((40.601203 - 40 = 0.601203) * 60 = 36.07218) = 36
        valMin = Math.floor((val - valDeg) * 60); // 36.07218 = 36
        // Add minutes to the result, adding the symbol minutes "'".
        result += valMin + "'"; // 40º36'
        // ---- Seconds ----
        // To get the value in seconds is required:
        // 1º - removing the degree value to the initial value: 40 - 40.601203 = 0.601203;
        // 2º - convert the value minutes (36') in decimal ( valMin/60 = 0.6) so
        // you can subtract the previous value: 0.601203 - 0.6 = 0.001203;
        // 3º - now that you have the seconds value in decimal,
        // you need to convert it into seconds of degree.
        // To do so multiply this value (0.001203) by 3600, which is
        // the number of seconds in a degree.
        // You get 0.001203 * 3600 = 4.3308
        // As you are using the function Math.round(),
        // which rounds a value to the next unit,
        // you can control the number of decimal places
        // by multiplying by 1000 before Math.round
        // and subsequent division by 1000 after Math.round function.
        // You get 4.3308 * 1000 = 4330.8 -> Math.round = 4331 -> 4331 / 1000 = 4.331
        // In this case the final value will have three decimal places.
        // If you only want two decimal places
        // just replace the value 1000 by 100.
        valSec = Math.round((val - valDeg - valMin / 60) * 3600 * 1000) / 1000; // 40.601203 = 4.331 
        // Add the seconds value to the result,
        // adding the seconds symbol " " ".
        result += valSec + '"'; // 40º36'4.331"
        // Returns the resulting string.
        return result;
    };
    KpAstroPage.prototype.buildPratyantarDasha = function (mainlord, sublord, order, suborder, startdt) {
        var m_dy = 30.436875;
        var d_yr = 365.2425;
        var e_dys = 0;
        var arr = ["su", "mo", "ma", "ra", "ju", "sa", "me", "ke", "ve"];
        var v_start = 0;
        var v_iter = 0;
        var a_per = 0;
        var s_dt = new Date(startdt.getTime());
        var cd = new Date();
        for (var vi = 0, len = arr.length; vi < len; vi++) {
            if (arr[vi] == sublord || v_start == 1) {
                v_iter++;
                var s_d = new Date(s_dt.getTime());
                var m = (s_dt.getMonth() + 1).toString();
                var dd = s_dt.getDate().toString();
                var y = s_dt.getFullYear().toString();
                var p_yrs = Number(dashas[mainlord]) * Number(dashas[sublord]) * Number(dashas[arr[vi]]) / (120 * 120);
                s_dt.setDate(s_dt.getDate() + p_yrs * d_yr);
                //console.log(s_d.toString());
                //console.log(s_dt.toString());
                if (cd.getTime() >= s_d.getTime() && cd.getTime() <= s_dt.getTime()) {
                    console.log('current dasha identified');
                    console.log(mainlord);
                    console.log(sublord);
                    console.log(arr[vi]);
                    this['mdas1'] = ruler_name[mainlord];
                    this['adas1'] = ruler_name[sublord];
                    this['pdas1'] = ruler_name[arr[vi]];
                    this['pend1'] = s_dt.getDate().toString() + '-' + (s_dt.getMonth() + 1).toString() + '-' + s_dt.getFullYear().toString();
                }
                this.shareService.addVIM(dd + '-' + m + '-' + y + '|' + s_dt.getDate().toString() + '-' + (s_dt.getMonth() + 1).toString() + '-' + s_dt.getFullYear().toString(), mainlord, sublord, arr[vi]);
                v_start = 1;
            }
            if (vi == 8)
                vi = -1;
            if (v_iter == 9)
                break;
        }
    };
    KpAstroPage.prototype.buildAntarDasha = function (lord, order, startdt, remdays) {
        var m_dy = 30.436875;
        var d_yr = 365.2425;
        var e_dys = 0;
        var das = '';
        if (lord == "venus")
            das = venus_das;
        else if (lord == "ketu")
            das = ketu_das;
        else if (lord == "sun")
            das = sun_das;
        else if (lord == "moon")
            das = moon_das;
        else if (lord == "mars")
            das = mars_das;
        else if (lord == "rahu")
            das = rahu_das;
        else if (lord == "jupiter")
            das = jupiter_das;
        else if (lord == "saturn")
            das = saturn_das;
        else if (lord == "mercury")
            das = mercury_das;
        console.log(lord);
        console.log(das);
        if (remdays > 0) {
            var s_dt = new Date(startdt.getTime());
            var tot_dys = Number(dashas[lord.substring(0, 2).toLowerCase()]) * d_yr;
            e_dys = tot_dys - remdays;
            var ffd = 0;
            var a_per = 0;
            var r_dys = 0;
            for (var _i = 0, _a = Object.keys(das); _i < _a.length; _i++) {
                var key = _a[_i];
                //var e_dt = s_dt;
                //console.log(key);
                var ads = das[key];
                //console.log(ads);
                var a_dys = Number(ads.split('|')[0]) * d_yr + Number(ads.split('|')[1]) * m_dy + Number(ads.split('|')[2]);
                ffd += a_dys;
                if (ffd >= e_dys) {
                    if (r_dys >= remdays)
                        break;
                    r_dys += a_dys;
                    var start_das = new Date(s_dt.getTime());
                    var m = (s_dt.getMonth() + 1).toString();
                    var dd = s_dt.getDate().toString();
                    var y = s_dt.getFullYear().toString();
                    s_dt.setDate(s_dt.getDate() + a_dys);
                    //var cur_date = new Date();
                    //if(cur_date >= start_das && cur_date <= s_dt) {
                    //this.cur_m_das = lord;
                    //this.cur_a_das = key;
                    //}
                    a_per++;
                    console.log('Pratyantar' + lord.substring(0, 2).toLowerCase() + key);
                    this.buildPratyantarDasha(lord.substring(0, 2).toLowerCase(), key, order, a_per, new Date(start_das.getTime()));
                }
            }
        }
        else {
            var a_per = 0;
            var s_dt = new Date(startdt.getTime());
            console.log(s_dt.toString());
            //var tot_dys = Number(dashas[lord.substring(0,2)])*d_yr;
            //e_dys = tot_dys - remdays;
            //var ffd = 0;
            for (var _b = 0, _c = Object.keys(das); _b < _c.length; _b++) {
                var key = _c[_b];
                a_per++;
                var start_das = new Date(s_dt.getTime());
                var m = (s_dt.getMonth() + 1).toString();
                var dd = s_dt.getDate().toString();
                var y = s_dt.getFullYear().toString();
                console.log(key);
                var ads = das[key];
                console.log(ads);
                var a_dys = Number(ads.split('|')[0]) * d_yr + Number(ads.split('|')[1]) * m_dy + Number(ads.split('|')[2]);
                s_dt.setDate(s_dt.getDate() + a_dys);
                //var cur_date = new Date();
                //if(cur_date >= start_das && cur_date <= s_dt) {
                //this.cur_m_das = lord;
                //this.cur_a_das = key;
                //}
                console.log('Pratyantar' + lord.substring(0, 2).toLowerCase() + key);
                this.buildPratyantarDasha(lord.substring(0, 2).toLowerCase(), key, order, a_per, new Date(start_das.getTime()));
            }
        }
    };
    KpAstroPage.prototype.calcBirthStar = function (moonsign, moondeg) {
        //convert deg & mins to mins
        var md_s = moondeg.toString();
        var moonmins = 0;
        if (md_s.indexOf('.') > -1 && md_s.split('.')[1] != '')
            moonmins = parseInt(md_s.split('.')[0], 10) * 60 + parseInt(md_s.split('.')[1], 10);
        else if (md_s.indexOf('.') > -1 && md_s.split('.')[1] == '')
            moonmins = parseInt(md_s.split('.')[0], 10) * 60;
        else
            moonmins = parseInt(md_s, 10) * 60;
        for (var i = 0; i < Object.keys(nakshatras).length; i++) {
            var nak = nakshatras[i];
            var nak_s = 0;
            var nak_e = 0;
            if (nak.location.start.split(',')[0].indexOf('.') > -1 && nak.location.start.split(',')[0].split('.')[1] != '')
                nak_s = parseInt(nak.location.start.split(',')[0].split('.')[0], 10) * 60 + parseInt(nak.location.start.split(',')[0].split('.')[1], 10);
            else if (nak.location.start.split(',')[0].indexOf('.') > -1 && nak.location.start.split(',')[0].split('.')[1] == '')
                nak_s = parseInt(nak.location.start.split(',')[0].split('.')[0], 10) * 60;
            else
                nak_s = parseInt(nak.location.start.split(',')[0], 10) * 60;
            if (nak.location.end.split(',')[0].indexOf('.') > -1 && nak.location.end.split(',')[0].split('.')[1] != '')
                nak_e = parseInt(nak.location.end.split(',')[0].split('.')[0], 10) * 60 + parseInt(nak.location.end.split(',')[0].split('.')[1], 10);
            else if (nak.location.end.split(',')[0].indexOf('.') > -1 && nak.location.end.split(',')[0].split('.')[1] == '')
                nak_e = parseInt(nak.location.end.split(',')[0].split('.')[0], 10) * 60;
            else
                nak_e = parseInt(nak.location.end.split(',')[0], 10) * 60;
            if (nak.location.start.split(',')[1] == moonsign.toLowerCase() && nak.location.end.split(',')[1] == moonsign.toLowerCase()) {
                if (moonmins >= nak_s && moonmins <= nak_e) {
                    return nak.name + '|' + nak.location.start.split(',')[0] + '|' + nak.ruler;
                }
            }
            else if (nak.location.start.split(',')[1] == moonsign.toLowerCase()) {
                if (moonmins >= nak_s)
                    return nak.name + '|' + nak.location.start.split(',')[0] + '|' + nak.ruler;
            }
            else if (nak.location.end.split(',')[1] == moonsign.toLowerCase()) {
                if (moonmins <= nak_e)
                    return nak.name + '|' + nak.location.start.split(',')[0] + '|' + nak.ruler;
            }
        }
    };
    KpAstroPage.prototype.translate = function (lord) {
        if (this.shareService.getLANG() == 'en')
            return lord;
        var trn = lord;
        switch (lord.toLowerCase()) {
            case 'sun':
            case 'su':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'సూర్యుడు';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'रवि ग्रह';
                }
                else if (this.shareService.getLANG() == 'ta') {
                    trn = 'சூரியன்';
                }
                break;
            case 'moon':
            case 'mo':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'చంద్రుడు';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'चांद ग्रह';
                }
                else if (this.shareService.getLANG() == 'ta') {
                    trn = 'சந்திரன்';
                }
                break;
            case 'jupiter':
            case 'ju':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'బృహస్పతి';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'बृहस्पति';
                }
                else if (this.shareService.getLANG() == 'ta') {
                    trn = 'குரு';
                }
                break;
            case 'mercury':
            case 'me':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'బుధుడు';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'बुध गृह';
                }
                else if (this.shareService.getLANG() == 'ta') {
                    trn = 'புதன்';
                }
                break;
            case 'mars':
            case 'ma':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'కుజుడు';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'मंगल ग्रह';
                }
                else if (this.shareService.getLANG() == 'ta') {
                    trn = 'செவ்வாய்';
                }
                break;
            case 'venus':
            case 've':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'శుక్రుడు';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'शुक्र ग्रह';
                }
                else if (this.shareService.getLANG() == 'ta') {
                    trn = 'சுக்கிரன்';
                }
                break;
            case 'saturn':
            case 'sa':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'శనిగ్రహము';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'शनि ग्रह';
                }
                else if (this.shareService.getLANG() == 'ta') {
                    trn = 'சனி';
                }
                break;
            case 'rahu':
            case 'ra':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'రాహు';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'राहु ग्रह';
                }
                else if (this.shareService.getLANG() == 'ta') {
                    trn = 'ராகு';
                }
                break;
            case 'ketu':
            case 'ke':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'కేతు';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'केतु ग्रह';
                }
                else if (this.shareService.getLANG() == 'ta') {
                    trn = 'கேது';
                }
                break;
            case 'aries':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'మేషరాశి';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'मेष राशि';
                }
                else if (this.shareService.getLANG() == 'ta') {
                    trn = 'மேஷம்';
                }
                break;
            case 'taurus':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'వృషభరాశి';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'वृषभ राशि';
                }
                else if (this.shareService.getLANG() == 'ta') {
                    trn = 'ரிஷபம்';
                }
                break;
            case 'gemini':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'మిధునరాశి';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'மிதுனம்';
                }
                break;
            case 'cancer':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'కర్కాటకరాశి';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'कर्क राशि';
                }
                else if (this.shareService.getLANG() == 'ta') {
                    trn = 'கடகம்';
                }
                break;
            case 'leo':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'సిమ్హరాశి';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'सिंह राशि';
                }
                else if (this.shareService.getLANG() == 'ta') {
                    trn = 'சிம்மம்';
                }
                break;
            case 'virgo':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'కన్యరాశి';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'कन्या राशि';
                }
                else if (this.shareService.getLANG() == 'ta') {
                    trn = 'கன்னி';
                }
                break;
            case 'libra':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'తులారాసి';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'तुला राशि';
                }
                else if (this.shareService.getLANG() == 'ta') {
                    trn = 'துலாம்';
                }
                break;
            case 'scorpio':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'వృశ్చికరాసి';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'वृश्चिक राशि';
                }
                else if (this.shareService.getLANG() == 'ta') {
                    trn = 'விருச்சிகம்';
                }
                break;
            case 'saggitarius':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'ధనుస్సురాసి';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'धनु राशि';
                }
                else if (this.shareService.getLANG() == 'ta') {
                    trn = 'தனுசு';
                }
                break;
            case 'capricorn':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'మకరరాసి';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'மகரம்';
                }
                break;
            case 'aquarius':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'కుంభరాసి';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'कुंभ राशि';
                }
                else if (this.shareService.getLANG() == 'ta') {
                    trn = 'கும்பம்';
                }
                break;
            case 'pisces':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'మీనరాసి';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'मीन राशि';
                }
                else if (this.shareService.getLANG() == 'ta') {
                    trn = 'மீனம்';
                }
                break;
            case 'ashwini':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'అశ్వినీ';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'अश्विनी';
                }
                else if (this.shareService.getLANG() == 'ta') {
                    trn = 'அஸ்வினி';
                }
                break;
            case 'bharani':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'భరణి';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'भरणी';
                }
                else if (this.shareService.getLANG() == 'ta') {
                    trn = 'பரணி';
                }
                break;
            case 'krittika':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'కృత్తికా';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'कृत्तिका';
                }
                else if (this.shareService.getLANG() == 'ta') {
                    trn = 'கிருத்திகை';
                }
                break;
            case 'rohini':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'రోహిణి';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'रोहिणी';
                }
                else if (this.shareService.getLANG() == 'ta') {
                    trn = 'ரோகிணி';
                }
                break;
            case 'mrigashira':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'మ్రిగశిర';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'मृगशिरा';
                }
                else if (this.shareService.getLANG() == 'ta') {
                    trn = 'மிருகசிரீடம்';
                }
                break;
            case 'ardra':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'ఆర్ద్ర';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'आर्द्र';
                }
                else if (this.shareService.getLANG() == 'ta') {
                    trn = 'திருவாதிரை';
                }
                break;
            case 'punarvasu':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'పునర్వసు';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'पुनर्वसु';
                }
                else if (this.shareService.getLANG() == 'ta') {
                    trn = 'புனர்பூசம்';
                }
                break;
            case 'pushya':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'పుష్య';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'पुष्य';
                }
                else if (this.shareService.getLANG() == 'ta') {
                    trn = 'பூசம்';
                }
                break;
            case 'ashlesha':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'ఆశ్లేష';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'अश्लेषा';
                }
                else if (this.shareService.getLANG() == 'ta') {
                    trn = 'ஆயில்யம்';
                }
                break;
            case 'magha':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'మఘ';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'मघा';
                }
                else if (this.shareService.getLANG() == 'ta') {
                    trn = 'மகம்';
                }
                break;
            case 'purvaphalguni':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'పూర్వఫల్గుణి';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'पूर्वाफाल्गुनी';
                }
                else if (this.shareService.getLANG() == 'ta') {
                    trn = 'பூரம்';
                }
                break;
            case 'uttaraaphalguni':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'ఉత్తరాఫల్గుణి';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'उत्तराफाल्गुनी';
                }
                else if (this.shareService.getLANG() == 'ta') {
                    trn = 'உத்திரம்';
                }
                break;
            case 'hastha':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'హస్త';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'हस्ता';
                }
                else if (this.shareService.getLANG() == 'ta') {
                    trn = 'அஸ்தம்';
                }
                break;
            case 'chitra':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'చిత్ర';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'चित्र';
                }
                else if (this.shareService.getLANG() == 'ta') {
                    trn = 'சித்திரை';
                }
                break;
            case 'swati':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'స్వాతి';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'स्वाति';
                }
                else if (this.shareService.getLANG() == 'ta') {
                    trn = 'ஸ்வாதி';
                }
                break;
            case 'vishakha':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'విశాఖ';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'विशाखा';
                }
                else if (this.shareService.getLANG() == 'ta') {
                    trn = 'விசாகம்';
                }
                break;
            case 'anuradha':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'అనురాధ';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'अनुराधा';
                }
                else if (this.shareService.getLANG() == 'ta') {
                    trn = 'அனுஷம்';
                }
                break;
            case 'jyestha':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'జ్యేష్ఠా';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'जयस्था';
                }
                else if (this.shareService.getLANG() == 'ta') {
                    trn = 'கேட்டை';
                }
                break;
            case 'mula':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'మూల';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'मूल';
                }
                else if (this.shareService.getLANG() == 'ta') {
                    trn = 'மூலம்';
                }
                break;
            case 'purvaashada':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'పూర్వాషాఢ';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'पूर्वाषाढ़ा';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'பூராடம்';
                }
                break;
            case 'uttaraashada':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'ఉత్తరాషాఢ';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'उत्तराषाढ़ा';
                }
                else if (this.shareService.getLANG() == 'ta') {
                    trn = 'உத்திராடம்';
                }
                break;
            case 'shravana':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'శ్రావణ';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'श्रवण';
                }
                else if (this.shareService.getLANG() == 'ta') {
                    trn = 'திருவோணம்';
                }
                break;
            case 'danishta':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'ధనిష్ఠ';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'धनिष्ठा';
                }
                else if (this.shareService.getLANG() == 'ta') {
                    trn = 'அவிட்டம்';
                }
                break;
            case 'shatabhisha':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'శతభిషా';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'शतभिषा';
                }
                else if (this.shareService.getLANG() == 'ta') {
                    trn = 'சதயம்';
                }
                break;
            case 'purvabhadra':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'పూర్వాభాద్ర';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'पूर्वभाद्र';
                }
                else if (this.shareService.getLANG() == 'ta') {
                    trn = 'பூரட்டாதி';
                }
                break;
            case 'uttarabhadra':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'ఉత్తరాభాద్ర';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'உத்திரட்டாதி';
                }
                break;
            case 'revati':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'రేవతి';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'रेवती';
                }
                else if (this.shareService.getLANG() == 'ta') {
                    trn = 'ரேவதி';
                }
                break;
            default:
                trn = lord;
                break;
        }
        return trn;
    };
    KpAstroPage.prototype.getdashatransit = function () {
    };
    __decorate([
        ViewChild('birthChart'),
        __metadata("design:type", Object)
    ], KpAstroPage.prototype, "birthChart", void 0);
    __decorate([
        ViewChild('cal1'),
        __metadata("design:type", Object)
    ], KpAstroPage.prototype, "cal1", void 0);
    __decorate([
        ViewChild('cal2'),
        __metadata("design:type", Object)
    ], KpAstroPage.prototype, "cal2", void 0);
    __decorate([
        ViewChild('cal3'),
        __metadata("design:type", Object)
    ], KpAstroPage.prototype, "cal3", void 0);
    __decorate([
        ViewChild('cal4'),
        __metadata("design:type", Object)
    ], KpAstroPage.prototype, "cal4", void 0);
    KpAstroPage = __decorate([
        NgModule({
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }),
        Component({
            selector: 'page-kp-astro',
            templateUrl: 'kp-astro.html',
            encapsulation: ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [NavController, ShareService, NavParams, Platform, Renderer2, HoroscopeService])
    ], KpAstroPage);
    return KpAstroPage;
}());
export { KpAstroPage };
//# sourceMappingURL=kp-astro.js.map