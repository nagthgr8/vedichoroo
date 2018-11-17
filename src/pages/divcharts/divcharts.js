var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Renderer2, ViewChild, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { AppRate } from '@ionic-native/app-rate';
import { HoroscopeService } from '../../app/horoscope.service';
import { ShareService } from '../../app/share.service';
import { ChartAnalysisPage } from '../chart-analysis/chart-analysis';
import * as signs from '../horoscope/signs.json';
import * as o_signs from '../horoscope/o_signs.json';
import * as o_rashis from '../horoscope/o_rashis.json';
/**
 * Generated class for the DivchartsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var DivchartsPage = /** @class */ (function () {
    function DivchartsPage(platform, navCtrl, navParams, appRate, shareService, horoService, renderer) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.appRate = appRate;
        this.shareService = shareService;
        this.horoService = horoService;
        this.renderer = renderer;
        this.device_width = 0;
        this.device_height = 0;
        this.chartanls = '';
        this.asc_sign = '';
        platform.ready().then(function () {
            console.log('Width: ' + platform.width());
            _this.device_width = platform.width();
            console.log('Height: ' + platform.height());
            _this.device_height = platform.height();
            _this.appRate.preferences = {
                displayAppName: '126 Astrology',
                usesUntilPrompt: 2,
                simpleMode: true,
                promptAgainForEachNewVersion: false,
                storeAppURL: {
                    ios: '1216856883',
                    android: 'market://details?id=com.mypubz.eportal'
                },
                customLocale: {
                    title: 'Do you enjoy %@?',
                    message: 'If you enjoy using %@, would you mind taking a moment to rate it? Thanks so much!',
                    cancelButtonLabel: 'No, Thanks',
                    laterButtonLabel: 'Remind Me Later',
                    rateButtonLabel: 'Rate It Now',
                    yesButtonLabel: 'Yes!',
                    noButtonLabel: 'No!'
                },
                callbacks: {
                    onRateDialogShow: function (callback) {
                        console.log('rate dialog shown!');
                    },
                    onButtonClicked: function (buttonIndex) {
                        console.log('Selected index: -> ' + buttonIndex);
                    }
                }
            };
            // Opens the rating immediately no matter what preferences you set
            _this.appRate.promptForRating(true);
            _this.updateNodePos();
            _this.chart = "1";
            //this.calcDivChart(Number(this.chart));
            _this.loadHoro(_this.shareService.getPLPOS(), _this.divChart.nativeElement, 'RASHI', 'D1');
            var oP = [];
            oP = _this.calcHoraChart();
            _this.loadHoro(oP, _this.divChart.nativeElement, 'HORA', 'D2');
            oP = _this.calcDivChart(3);
            _this.loadHoro(oP, _this.divChart.nativeElement, 'DRESHKANA', 'D3');
            oP = _this.calcDivChart(4);
            _this.loadHoro(oP, _this.divChart.nativeElement, 'CHATHURTHAMSA', 'D4');
            oP = _this.calcDivChart(7);
            _this.loadHoro(oP, _this.divChart.nativeElement, 'SAPTAMSA', 'D7');
            oP = _this.calcDivChart(9);
            _this.loadHoro(oP, _this.divChart.nativeElement, 'NAVAMSA', 'D9');
            oP = _this.calcDivChart(10);
            _this.loadHoro(oP, _this.divChart.nativeElement, 'DASAMSA', 'D10');
            oP = _this.calcDivChart(12);
            _this.loadHoro(oP, _this.divChart.nativeElement, 'DWADASAMSA', 'D12');
            oP = _this.calcDivChart(16);
            _this.loadHoro(oP, _this.divChart.nativeElement, 'SHODASAMSA', 'D16');
            oP = _this.calcDivChart(20);
            _this.loadHoro(oP, _this.divChart.nativeElement, 'VIMSAMSA', 'D20');
            oP = _this.calcDivChart(24);
            _this.loadHoro(oP, _this.divChart.nativeElement, 'CHATURVIMSAMSA', 'D24');
            oP = _this.calcDivChart(27);
            _this.loadHoro(oP, _this.divChart.nativeElement, 'SAPTAVIMSAMSA', 'D27');
            oP = _this.calcDivChart(30);
            _this.loadHoro(oP, _this.divChart.nativeElement, 'TRIMASAMSA', 'D30');
            oP = _this.calcDivChart(40);
            _this.loadHoro(oP, _this.divChart.nativeElement, 'KHAVEDAMSA', 'D40');
            oP = _this.calcDivChart(45);
            _this.loadHoro(oP, _this.divChart.nativeElement, 'AKSHAVEDAMSA', 'D45');
            oP = _this.calcDivChart(60);
            _this.loadHoro(oP, _this.divChart.nativeElement, 'SHASTAMSA', 'D60');
            if (_this.shareService.getLANG() == 'en') {
                _this.chartanls = '<span> TAP on each chart to reveal more information</span>';
            }
            else if (_this.shareService.getLANG() == 'te') {
                _this.chartanls = 'మరిన్ని వివరాలకు చార్ట్ ని ట్టాప్ చేయండి';
            }
            else if (_this.shareService.getLANG() == 'hi') {
                _this.chartanls = 'अधिक जानकारी के लिए प्रत्येक चार्ट पर टैप करें';
            }
            else if (_this.shareService.getLANG() == 'ta') {
                _this.chartanls = 'ஒவ்வொரு விளக்கப்படத்தையும் மேலும் வெளிப்படுத்த';
            }
        });
    }
    DivchartsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad DivchartsPage');
    };
    DivchartsPage.prototype.ngOnDestroy = function () {
        this.lstnr_D1();
        this.lstnr_D2();
        this.lstnr_D3();
        this.lstnr_D4();
        this.lstnr_D9();
        this.lstnr_D10();
        this.lstnr_D12();
        this.lstnr_D16();
        this.lstnr_D20();
        this.lstnr_D24();
        this.lstnr_D27();
        this.lstnr_D30();
        this.lstnr_D40();
        this.lstnr_D45();
        this.lstnr_D60();
    };
    DivchartsPage.prototype.calcHoraChart = function () {
        var navPls = [];
        var plPos = this.shareService.getPLPOS();
        var sgns = ["ar", "ta", "ge", "cn", "le", "vi", "li", "sc", "sa", "cp", "aq", "pi"];
        for (var i = 0; i < 12; i++) {
            var sign = sgns[i];
            var hora_sign = '';
            if (plPos.hasOwnProperty(sign)) {
                var pls = plPos[sign].split('\|');
                for (var k = 0; k < pls.length; k++) {
                    console.log('pl=' + pls[k]);
                    var pl = pls[k].split(' ')[1];
                    if (pl != 'Ur' && pl != 'Pl' && pl != 'me' && pl != 'os' && pl != 'Ne' && pl != 'TRUE_NODE') { //consider only true planets
                        var po = Number(pls[k].split(' ')[0]);
                        switch (sign) {
                            case 'ar':
                            case 'ge':
                            case 'le':
                            case 'li':
                            case 'sa':
                            case 'aq':
                                (po <= 15) ? hora_sign = 'le' : hora_sign = 'cn';
                                break;
                            case 'ta':
                            case 'cn':
                            case 'vi':
                            case 'sc':
                            case 'cp':
                            case 'pi':
                                (po <= 15) ? hora_sign = 'cn' : hora_sign = 'le';
                                break;
                            default:
                                break;
                        }
                        if (!navPls.hasOwnProperty(hora_sign))
                            navPls[hora_sign] = pls[k];
                        else
                            navPls[hora_sign] += '|' + pls[k];
                    }
                }
            }
        }
        return navPls;
    };
    DivchartsPage.prototype.calcDivChart = function (ndivs) {
        var navPls = [];
        console.log('calcDivChart' + ndivs.toString());
        var sec = 30 / ndivs, secp = 0;
        console.log('no. of divs=' + sec.toString());
        var plPos = this.shareService.getPLPOS();
        var sgns = ["ar", "ta", "ge", "cn", "le", "vi", "li", "sc", "sa", "cp", "aq", "pi"];
        var divs = [];
        var n = 1;
        while ((secp = sec * n++) <= 30) {
            divs.push(secp);
        }
        console.log('part complete..');
        console.log(divs);
        for (var i = 0; i < 12; i++) {
            var sign = sgns[i];
            if (plPos.hasOwnProperty(sign)) {
                var pls = plPos[sign].split('\|');
                for (var k = 0; k < pls.length; k++) {
                    console.log('pl=' + pls[k]);
                    var pl = pls[k].split(' ')[1];
                    //if (pl != 'Ur' && pl != 'Pl' && pl != 'me' && pl != 'os' && pl != 'Ne' && pl != 'TRUE_NODE') {  //consider only true planets
                    if (pl == 'AC')
                        this.asc_sign = sign;
                    var po = Number(pls[k].split(' ')[0]);
                    console.log(sign);
                    console.log(pl);
                    console.log(po);
                    var spos = void 0;
                    n = 0;
                    for (var dp = 0; dp < Object.keys(divs).length; dp++) {
                        if (po >= n && po <= divs[dp])
                            spos = dp + 1;
                        n = divs[dp];
                    }
                    while (spos > 12)
                        spos -= 12;
                    console.log('spos=' + spos.toString());
                    var sord = void 0;
                    var spnt = ndivs, x = 1;
                    console.log('spnt=', ndivs + 1);
                    switch (sign) {
                        case 'ar':
                            sord = 1;
                            break;
                        case 'ta':
                            spnt = ndivs + 1;
                            while (spnt > 12)
                                spnt -= 12;
                            sord = spnt;
                            break;
                        case 'ge':
                            spnt = 2 * ndivs + 1;
                            while (spnt > 12)
                                spnt -= 12;
                            sord = spnt;
                            break;
                        case 'cn':
                            spnt = 3 * ndivs + 1;
                            while (spnt > 12)
                                spnt -= 12;
                            sord = spnt;
                            break;
                        case 'le':
                            spnt = 4 * ndivs + 1;
                            while (spnt > 12)
                                spnt -= 12;
                            sord = spnt;
                            break;
                        case 'vi':
                            spnt = 5 * ndivs + 1;
                            while (spnt > 12)
                                spnt -= 12;
                            sord = spnt;
                            break;
                        case 'li':
                            spnt = 6 * ndivs + 1;
                            while (spnt > 12)
                                spnt -= 12;
                            sord = spnt;
                            break;
                        case 'sc':
                            spnt = 7 * ndivs + 1;
                            while (spnt > 12)
                                spnt -= 12;
                            sord = spnt;
                            break;
                        case 'sa':
                            spnt = 8 * ndivs + 1;
                            while (spnt > 12)
                                spnt -= 12;
                            sord = spnt;
                            break;
                        case 'cp':
                            spnt = 9 * ndivs + 1;
                            while (spnt > 12)
                                spnt -= 12;
                            sord = spnt;
                            break;
                        case 'aq':
                            spnt = 10 * ndivs + 1;
                            while (spnt > 12)
                                spnt -= 12;
                            sord = spnt;
                            break;
                        case 'pi':
                            spnt = 11 * ndivs + 1;
                            while (spnt > 12)
                                spnt -= 12;
                            sord = spnt;
                            break;
                        default:
                            break;
                    }
                    console.log('sord=' + sord.toString());
                    //}
                    var navp = sord + (spos - 1);
                    navp = (navp > 12) ? navp - 12 : navp;
                    console.log(navp);
                    switch (navp) {
                        case 1:
                            if (!navPls.hasOwnProperty('ar'))
                                navPls['ar'] = pls[k];
                            else
                                navPls['ar'] += '|' + pls[k];
                            break;
                        case 2:
                            if (!navPls.hasOwnProperty('ta'))
                                navPls['ta'] = pls[k];
                            else
                                navPls['ta'] += '|' + pls[k];
                            break;
                        case 3:
                            if (!navPls.hasOwnProperty('ge'))
                                navPls['ge'] = pls[k];
                            else
                                navPls['ge'] += '|' + pls[k];
                            break;
                        case 4:
                            if (!navPls.hasOwnProperty('cn'))
                                navPls['cn'] = pls[k];
                            else
                                navPls['cn'] += '|' + pls[k];
                            break;
                        case 5:
                            if (!navPls.hasOwnProperty('le'))
                                navPls['le'] = pls[k];
                            else
                                navPls['le'] += '|' + pls[k];
                            break;
                        case 6:
                            if (!navPls.hasOwnProperty('vi'))
                                navPls['vi'] = pls[k];
                            else
                                navPls['vi'] += '|' + pls[k];
                            break;
                        case 7:
                            if (!navPls.hasOwnProperty('li'))
                                navPls['li'] = pls[k];
                            else
                                navPls['li'] += '|' + pls[k];
                            break;
                        case 8:
                            if (!navPls.hasOwnProperty('sc'))
                                navPls['sc'] = pls[k];
                            else
                                navPls['sc'] += '|' + pls[k];
                            break;
                        case 9:
                            if (!navPls.hasOwnProperty('sa'))
                                navPls['sa'] = pls[k];
                            else
                                navPls['sa'] += '|' + pls[k];
                            break;
                        case 10:
                            if (!navPls.hasOwnProperty('cp'))
                                navPls['cp'] = pls[k];
                            else
                                navPls['cp'] += '|' + pls[k];
                            break;
                        case 11:
                            if (!navPls.hasOwnProperty('aq'))
                                navPls['aq'] = pls[k];
                            else
                                navPls['aq'] += '|' + pls[k];
                            break;
                        case 12:
                            if (!navPls.hasOwnProperty('pi'))
                                navPls['pi'] = pls[k];
                            else
                                navPls['pi'] += '|' + pls[k];
                            break;
                        default:
                            break;
                    }
                    console.log(navPls);
                }
            }
        }
        return navPls;
    };
    DivchartsPage.prototype.updateNodePos = function () {
        var plPos = this.shareService.getPLPOS();
        for (var i = 0; i < 16; i++) {
            var sign = signs[i];
            if (plPos.hasOwnProperty(sign)) {
                var pls = plPos[sign].split('\|');
                for (var k = 0; k < pls.length; k++) {
                    if (pls[k].split(' ')[1] == 'MEAN_NODE') {
                        var rpos = o_rashis[sign].split('\|')[0];
                        var kpos = parseInt(rpos, 10) + 6;
                        if (kpos > 12)
                            kpos = (kpos - 12);
                        if (plPos.hasOwnProperty(o_signs[kpos - 1])) {
                            var eP = plPos[o_signs[kpos - 1]];
                            plPos[o_signs[kpos - 1]] = eP + '|' + pls[k].split(' ')[0] + ' ' + 'Ke';
                        }
                        else {
                            plPos[o_signs[kpos - 1]] = pls[k].split(' ')[0] + ' ' + 'Ke';
                        }
                        plPos[sign] = plPos[sign].replace('MEAN_NODE', 'Ra');
                    }
                    else if (pls[k].split(' ')[1] == 'AC') {
                        this.asc_sign = sign;
                        //this.asc_deg = Number(pls[k].split(' ')[0]);
                        console.log('ASCENDENT is ' + this.asc_sign);
                    }
                }
            }
        }
    };
    DivchartsPage.prototype.updateAsc = function (plPos) {
        for (var i = 0; i < 16; i++) {
            var sign = signs[i];
            if (plPos.hasOwnProperty(sign)) {
                var pls = plPos[sign].split('\|');
                for (var k = 0; k < pls.length; k++) {
                    if (pls[k].split(' ')[1] == 'AC') {
                        this.asc_sign = sign;
                        //this.asc_deg = Number(pls[k].split(' ')[0]);
                        console.log('ASCENDENT is ' + this.asc_sign);
                    }
                }
            }
        }
    };
    DivchartsPage.prototype.loadHoro = function (plPos, ele, title, id) {
        //console.log('loadHoro' + title);
        //console.log(plPos);
        //var plPos = this.shareService.getPLPOS();
        //const dv = this.renderer.createElement('div');
        //this.renderer.setProperty(dv, 'id', id);
        //this.renderer.setStyle(dv, 'float', 'left');
        //this.renderer.addClass(dv, 'divchart');
        this.updateAsc(plPos);
        this.renderer.appendChild(ele, this.grid(4, this.device_width / 8, this.device_width / 2, plPos, title, id));
        //this.renderer.appendChild(ele, dv);
        //this['lstnr_' + id] = this.renderer.listen(dv, 'click', this.logElement);
    };
    DivchartsPage.prototype.grid = function (numberPerSide, size, pixelsPerSide, plps, title, id) {
        var _this = this;
        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.renderer.setAttribute(svg, "width", pixelsPerSide);
        this.renderer.setAttribute(svg, "height", pixelsPerSide);
        this.renderer.setProperty(svg, "id", id);
        //this.renderer.setAttribute(svg, "stroke", "#000000");
        //this.renderer.setAttribute(svg, "stroke-width", "3");
        //this.renderer.setAttribute(svg, "fill", "none");
        this.renderer.setAttribute(svg, "viewBox", [0, 0, numberPerSide * size, numberPerSide * size].join(" "));
        var border = 1;
        var s2 = size * 2;
        var s3 = size;
        var s4 = 12;
        var s5 = size * 2 / 2;
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
                        this.renderer.setAttribute(box, "stroke", "black");
                        this.renderer.setAttribute(box, "fill", "#ffffff"); //"#f4a460");
                        this.renderer.setAttribute(box, "id", "b" + number);
                        this.renderer.appendChild(g, box);
                        var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
                        this.renderer.appendChild(text, document.createTextNode(title.toUpperCase()));
                        this.renderer.setAttribute(text, "fill", "#000000");
                        this.renderer.setAttribute(text, "font-size", (title.length > 10) ? (10).toString() : s4.toString());
                        this.renderer.setAttribute(text, "font-weight", 'bold');
                        this.renderer.setAttribute(text, "x", s3.toString());
                        this.renderer.setAttribute(text, "y", s3.toString());
                        this.renderer.setAttribute(text, "alignment-baseline", "middle");
                        this.renderer.setAttribute(text, "text-anchor", "middle");
                        this.renderer.setAttribute(text, "id", "t" + number);
                        g.appendChild(text);
                        svg.appendChild(g);
                    }
                    continue;
                }
                // var zodiac1 = zodiacs[(i + j) % zodiacs.length];
                // var zodiac2 = zodiacs[(i + j + 1) % zodiacs.length];
                g = document.createElementNS("http://www.w3.org/2000/svg", "g");
                this.renderer.setAttribute(g, "transform", ["translate(", i * size, ",", j * size, ")"].join(""));
                number = numberPerSide * i + j;
                box = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                //var sign = "url(#sign-" + number.toString() + ")";
                this.renderer.setAttribute(box, "width", size.toString());
                this.renderer.setAttribute(box, "height", size.toString());
                //this.renderer.setAttribute(box, "border", border.toString());
                this.renderer.setAttribute(box, "stroke", (signs[number] == this.asc_sign) ? "#FF5733" : "#000000");
                this.renderer.setAttribute(box, "stroke-width", (signs[number] == this.asc_sign) ? (border + 2).toString() : border.toString());
                this.renderer.setAttribute(box, "fill", "none");
                this.renderer.setAttribute(box, "id", "b" + number.toString());
                this.renderer.appendChild(g, box);
                var sign = signs[number];
                if (plps.hasOwnProperty(sign)) {
                    //var pls = replaceAll(plps[sign], '\|', '');
                    //var pls = plps[sign].replace(/\|/g, ' ');
                    var pls = plps[sign].split('\|');
                    var pcnt = 0;
                    var s6 = 10;
                    var s7 = 5;
                    for (var k = 0; k < pls.length; k++) {
                        if (pls[k].split(' ')[1] == 'me' || pls[k].split(' ')[1] == 'os')
                            continue;
                        //if (pls[k].split(' ')[1] == 'AC') this.asc_sign = sign;
                        else if (pls[k].split(' ')[1] == 'Mo') {
                            //							this.moon_sign = sign;
                            //							this.moon_deg = Number(pls[k].split(' ')[0]);
                        }
                        pcnt++;
                        text = document.createElementNS("http://www.w3.org/2000/svg", "text");
                        this.renderer.appendChild(text, document.createTextNode(pls[k]));
                        //text.setAttribute("fill", zodiac2);
                        this.renderer.setAttribute(text, "font-size", s6.toString());
                        this.renderer.setAttribute(text, "font-weight", "bold");
                        if (pls[k].split(' ')[1] == 'AC')
                            this.renderer.addClass(text, "redText");
                        else if (pls[k].split(' ')[1] == 'Mo')
                            this.renderer.addClass(text, "blueText");
                        this.renderer.setAttribute(text, "x", s7.toString());
                        var s8 = 10 * pcnt;
                        this.renderer.setAttribute(text, "y", s8.toString());
                        this.renderer.setAttribute(text, "id", "t" + number.toString());
                        g.appendChild(text);
                    }
                }
                svg.appendChild(g);
            }
        }
        g = document.createElementNS("http://www.w3.org/2000/svg", "g");
        this.renderer.setAttribute(g, "transform", ["translate(", i * size, ",", j * size, ")"].join(""));
        box = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        this.renderer.setAttribute(box, "width", size.toString());
        this.renderer.setAttribute(box, "height", size.toString());
        this.renderer.setAttribute(box, "stroke", "#000000");
        this.renderer.setAttribute(box, "stroke-width", "4");
        this.renderer.setAttribute(box, "fill", "none");
        g.appendChild(box);
        svg.appendChild(g);
        number = numberPerSide * i + j;
        this['lstnr_' + id] = this.renderer.listen(svg, 'click', function (event) {
            // Do something with 'event'
            console.log('clicked ', event.path);
            console.log('clicked ', event.path[2]);
            _this.navCtrl.push(ChartAnalysisPage, { ID: event.path[2].id });
        });
        return svg;
    };
    ;
    DivchartsPage.prototype.logElement = function (_a) {
        var target = _a.target;
        if (target) {
            console.log('Target: ', target);
            // Add Business Logic here
        }
    };
    __decorate([
        ViewChild('divChart'),
        __metadata("design:type", Object)
    ], DivchartsPage.prototype, "divChart", void 0);
    DivchartsPage = __decorate([
        NgModule({
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }),
        Component({
            selector: 'page-divcharts',
            templateUrl: 'divcharts.html',
        }),
        __metadata("design:paramtypes", [Platform, NavController, NavParams, AppRate, ShareService, HoroscopeService, Renderer2])
    ], DivchartsPage);
    return DivchartsPage;
}());
export { DivchartsPage };
//# sourceMappingURL=divcharts.js.map