var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { ShareService } from '../../app/share.service';
import { HoroscopeService } from '../../app/horoscope.service';
import * as signs from '../horoscope/signs.json';
import * as signs_pos from '../horoscope/signs_pos.json';
import * as ruler_name from '../horoscope/ruler_name.json';
import * as nakshatra_order from '../horoscope/nakshatra_order.json';
import * as venus from '../horoscope/venus.json';
import * as sun from '../horoscope/sun.json';
import * as moon from '../horoscope/moon.json';
import * as mars from '../horoscope/mars.json';
import * as jupiter from '../horoscope/jupiter.json';
import * as saturn from '../horoscope/saturn.json';
import * as mercury from '../horoscope/mercury.json';
import * as aspects from '../horoscope/aspects.json';
/**
 * Generated class for the PredictionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PredictionsPage = /** @class */ (function () {
    function PredictionsPage(navCtrl, navParams, platform, shareService, horoService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.platform = platform;
        this.shareService = shareService;
        this.horoService = horoService;
        this.das1 = '';
        this.das2 = '';
        this.das3 = '';
        this.das4 = '';
        this.das5 = '';
        this.das6 = '';
        this.das7 = '';
        this.das8 = '';
        this.das9 = '';
        this.das10 = '';
        this.das11 = '';
        this.das12 = '';
        this.das13 = '';
        this.das14 = '';
        this.das15 = '';
        this.das16 = '';
        this.das17 = '';
        this.das18 = '';
        this.das19 = '';
        this.das20 = '';
        this.das21 = '';
        this.das22 = '';
        this.das23 = '';
        this.das24 = '';
        this.das25 = '';
        this.das26 = '';
        this.das27 = '';
        this.das28 = '';
        this.das29 = '';
        this.das30 = '';
        this.das31 = '';
        this.das32 = '';
        this.das33 = '';
        this.das34 = '';
        this.das35 = '';
        this.das36 = '';
        this.das37 = '';
        this.das38 = '';
        this.das39 = '';
        this.das40 = '';
        this.das41 = '';
        this.das42 = '';
        this.das43 = '';
        this.das44 = '';
        this.das45 = '';
        this.das46 = '';
        this.das47 = '';
        this.das48 = '';
        this.das49 = '';
        this.das50 = '';
        this.das51 = '';
        this.das52 = '';
        this.das53 = '';
        this.das54 = '';
        this.das55 = '';
        this.das56 = '';
        this.das57 = '';
        this.das58 = '';
        this.das59 = '';
        this.das60 = '';
        this.das61 = '';
        this.das62 = '';
        this.das63 = '';
        this.das64 = '';
        this.das65 = '';
        this.das66 = '';
        this.das67 = '';
        this.das68 = '';
        this.das69 = '';
        this.das70 = '';
        this.das71 = '';
        this.das72 = '';
        this.das73 = '';
        this.das74 = '';
        this.das75 = '';
        this.das76 = '';
        this.das77 = '';
        this.das78 = '';
        this.das79 = '';
        this.das80 = '';
        this.das81 = '';
        this.das82 = '';
        this.das83 = '';
        this.das84 = '';
        this.das85 = '';
        this.das86 = '';
        this.das87 = '';
        this.das88 = '';
        this.das89 = '';
        this.das90 = '';
        this.das91 = '';
        this.das92 = '';
        this.das93 = '';
        this.das94 = '';
        this.das95 = '';
        this.das96 = '';
        this.das97 = '';
        this.das98 = '';
        this.das99 = '';
        this.das100 = '';
        this.das101 = '';
        this.das102 = '';
        this.das103 = '';
        this.das104 = '';
        this.das105 = '';
        this.das106 = '';
        this.das107 = '';
        this.das108 = '';
        this.das109 = '';
        this.das110 = '';
        this.das111 = '';
        this.das112 = '';
        this.das113 = '';
        this.das114 = '';
        this.das115 = '';
        this.das116 = '';
        this.das117 = '';
        this.das118 = '';
        this.das119 = '';
        this.das120 = '';
        this.das121 = '';
        this.das122 = '';
        this.das123 = '';
        this.das124 = '';
        this.das125 = '';
        this.das126 = '';
        this.das127 = '';
        this.das128 = '';
        this.das129 = '';
        this.das130 = '';
        this.das131 = '';
        this.das132 = '';
        this.das133 = '';
        this.das134 = '';
        this.das135 = '';
        this.das136 = '';
        this.das137 = '';
        this.das138 = '';
        this.das139 = '';
        this.das140 = '';
        this.das141 = '';
        this.das142 = '';
        this.das143 = '';
        this.das144 = '';
        this.das145 = '';
        this.das146 = '';
        this.das147 = '';
        this.das148 = '';
        this.das149 = '';
        this.das150 = '';
        this.das151 = '';
        this.das152 = '';
        this.das153 = '';
        this.das154 = '';
        this.das155 = '';
        this.das156 = '';
        this.das157 = '';
        this.das158 = '';
        this.das159 = '';
        this.das160 = '';
        this.das161 = '';
        this.das162 = '';
        this.das163 = '';
        this.das164 = '';
        this.das165 = '';
        this.das166 = '';
        this.das167 = '';
        this.das168 = '';
        this.das169 = '';
        this.das170 = '';
        this.das171 = '';
        this.das172 = '';
        this.das173 = '';
        this.das174 = '';
        this.das175 = '';
        this.das176 = '';
        this.das177 = '';
        this.das178 = '';
        this.das179 = '';
        this.das180 = '';
        this.das181 = '';
        this.das182 = '';
        this.das183 = '';
        this.das184 = '';
        this.das185 = '';
        this.das186 = '';
        this.das187 = '';
        this.das188 = '';
        this.das189 = '';
        this.das190 = '';
        this.das191 = '';
        this.das192 = '';
        this.das193 = '';
        this.das194 = '';
        this.das195 = '';
        this.das196 = '';
        this.das197 = '';
        this.das198 = '';
        this.das199 = '';
        this.das200 = '';
        this.das201 = '';
        this.das202 = '';
        this.das203 = '';
        this.das204 = '';
        this.das205 = '';
        this.das206 = '';
        this.das207 = '';
        this.das208 = '';
        this.das209 = '';
        this.das210 = '';
        this.das211 = '';
        this.das212 = '';
        this.das213 = '';
        this.das214 = '';
        this.das215 = '';
        this.das216 = '';
        this.das217 = '';
        this.das218 = '';
        this.das219 = '';
        this.das220 = '';
        this.das221 = '';
        this.das222 = '';
        this.das223 = '';
        this.das224 = '';
        this.das225 = '';
        this.das226 = '';
        this.das227 = '';
        this.das228 = '';
        this.das229 = '';
        this.das230 = '';
        this.das231 = '';
        this.das232 = '';
        this.das233 = '';
        this.das234 = '';
        this.das235 = '';
        this.das236 = '';
        this.das237 = '';
        this.das238 = '';
        this.das239 = '';
        this.das240 = '';
        this.das241 = '';
        this.das242 = '';
        this.das243 = '';
        this.das244 = '';
        this.das245 = '';
        this.das246 = '';
        this.das247 = '';
        this.das248 = '';
        this.das249 = '';
        this.das250 = '';
        this.das251 = '';
        this.das252 = '';
        this.das253 = '';
        this.das254 = '';
        this.das255 = '';
        this.das256 = '';
        this.das257 = '';
        this.das258 = '';
        this.das259 = '';
        this.das260 = '';
        this.das261 = '';
        this.das262 = '';
        this.das263 = '';
        this.das264 = '';
        this.das265 = '';
        this.das266 = '';
        this.das267 = '';
        this.das268 = '';
        this.das269 = '';
        this.das270 = '';
        this.das271 = '';
        this.das272 = '';
        this.das273 = '';
        this.das274 = '';
        this.das275 = '';
        this.das276 = '';
        this.das277 = '';
        this.das278 = '';
        this.das279 = '';
        this.das280 = '';
        this.das281 = '';
        this.das282 = '';
        this.das283 = '';
        this.das284 = '';
        this.das285 = '';
        this.das286 = '';
        this.das287 = '';
        this.das288 = '';
        this.das289 = '';
        this.das290 = '';
        this.das291 = '';
        this.das292 = '';
        this.das293 = '';
        this.das294 = '';
        this.das295 = '';
        this.das296 = '';
        this.das297 = '';
        this.das298 = '';
        this.das299 = '';
        this.das300 = '';
        this.das301 = '';
        this.das302 = '';
        this.das303 = '';
        this.das304 = '';
        this.das305 = '';
        this.das306 = '';
        this.das307 = '';
        this.das308 = '';
        this.das309 = '';
        this.das310 = '';
        this.das311 = '';
        this.das312 = '';
        this.das313 = '';
        this.das314 = '';
        this.das315 = '';
        this.das316 = '';
        this.das317 = '';
        this.das318 = '';
        this.das319 = '';
        this.das320 = '';
        this.das321 = '';
        this.das322 = '';
        this.das323 = '';
        this.das324 = '';
        this.das325 = '';
        this.das326 = '';
        this.das327 = '';
        this.das328 = '';
        this.das329 = '';
        this.das330 = '';
        this.das331 = '';
        this.das332 = '';
        this.das333 = '';
        this.das334 = '';
        this.das335 = '';
        this.das336 = '';
        this.das337 = '';
        this.das338 = '';
        this.das339 = '';
        this.das340 = '';
        this.das341 = '';
        this.das342 = '';
        this.das343 = '';
        this.das344 = '';
        this.das345 = '';
        this.das346 = '';
        this.das347 = '';
        this.das348 = '';
        this.das349 = '';
        this.das350 = '';
        this.das351 = '';
        this.das352 = '';
        this.das353 = '';
        this.das354 = '';
        this.das355 = '';
        this.das356 = '';
        this.das357 = '';
        this.das358 = '';
        this.das359 = '';
        this.das360 = '';
        this.das361 = '';
        this.das362 = '';
        this.das363 = '';
        this.das364 = '';
        this.das365 = '';
        this.pevt1 = '';
        this.pevt2 = '';
        this.pevt3 = '';
        this.pevt4 = '';
        this.pevt5 = '';
        this.pevt6 = '';
        this.pevt7 = '';
        this.pevt8 = '';
        this.pevt9 = '';
        this.pevt10 = '';
        this.pevt11 = '';
        this.pevt12 = '';
        this.pevt13 = '';
        this.pevt14 = '';
        this.pevt15 = '';
        this.pevt16 = '';
        this.pevt17 = '';
        this.pevt18 = '';
        this.pevt19 = '';
        this.pevt20 = '';
        this.pevt21 = '';
        this.pevt22 = '';
        this.pevt23 = '';
        this.pevt24 = '';
        this.pevt25 = '';
        this.pevt26 = '';
        this.pevt27 = '';
        this.pevt28 = '';
        this.pevt29 = '';
        this.pevt30 = '';
        this.pevt31 = '';
        this.pevt32 = '';
        this.pevt33 = '';
        this.pevt34 = '';
        this.pevt35 = '';
        this.pevt36 = '';
        this.pevt37 = '';
        this.pevt38 = '';
        this.pevt39 = '';
        this.pevt40 = '';
        this.pevt41 = '';
        this.pevt42 = '';
        this.pevt43 = '';
        this.pevt44 = '';
        this.pevt45 = '';
        this.pevt46 = '';
        this.pevt47 = '';
        this.pevt48 = '';
        this.pevt49 = '';
        this.pevt50 = '';
        this.pevt51 = '';
        this.pevt52 = '';
        this.pevt53 = '';
        this.pevt54 = '';
        this.pevt55 = '';
        this.pevt56 = '';
        this.pevt57 = '';
        this.pevt58 = '';
        this.pevt59 = '';
        this.pevt60 = '';
        this.pevt61 = '';
        this.pevt62 = '';
        this.pevt63 = '';
        this.pevt64 = '';
        this.pevt65 = '';
        this.pevt66 = '';
        this.pevt67 = '';
        this.pevt68 = '';
        this.pevt69 = '';
        this.pevt70 = '';
        this.pevt71 = '';
        this.pevt72 = '';
        this.pevt73 = '';
        this.pevt74 = '';
        this.pevt75 = '';
        this.pevt76 = '';
        this.pevt77 = '';
        this.pevt78 = '';
        this.pevt79 = '';
        this.pevt80 = '';
        this.pevt81 = '';
        this.pevt82 = '';
        this.pevt83 = '';
        this.pevt84 = '';
        this.pevt85 = '';
        this.pevt86 = '';
        this.pevt87 = '';
        this.pevt88 = '';
        this.pevt89 = '';
        this.pevt90 = '';
        this.pevt91 = '';
        this.pevt92 = '';
        this.pevt93 = '';
        this.pevt94 = '';
        this.pevt95 = '';
        this.pevt96 = '';
        this.pevt97 = '';
        this.pevt98 = '';
        this.pevt99 = '';
        this.pevt100 = '';
        this.pevt101 = '';
        this.pevt102 = '';
        this.pevt103 = '';
        this.pevt104 = '';
        this.pevt105 = '';
        this.pevt106 = '';
        this.pevt107 = '';
        this.pevt108 = '';
        this.pevt109 = '';
        this.pevt110 = '';
        this.pevt111 = '';
        this.pevt112 = '';
        this.pevt113 = '';
        this.pevt114 = '';
        this.pevt115 = '';
        this.pevt116 = '';
        this.pevt117 = '';
        this.pevt118 = '';
        this.pevt119 = '';
        this.pevt120 = '';
        this.pevt121 = '';
        this.pevt122 = '';
        this.pevt123 = '';
        this.pevt124 = '';
        this.pevt125 = '';
        this.pevt126 = '';
        this.pevt127 = '';
        this.pevt128 = '';
        this.pevt129 = '';
        this.pevt130 = '';
        this.pevt131 = '';
        this.pevt132 = '';
        this.pevt133 = '';
        this.pevt134 = '';
        this.pevt135 = '';
        this.pevt136 = '';
        this.pevt137 = '';
        this.pevt138 = '';
        this.pevt139 = '';
        this.pevt140 = '';
        this.pevt141 = '';
        this.pevt142 = '';
        this.pevt143 = '';
        this.pevt144 = '';
        this.pevt145 = '';
        this.pevt146 = '';
        this.pevt147 = '';
        this.pevt148 = '';
        this.pevt149 = '';
        this.pevt150 = '';
        this.pevt151 = '';
        this.pevt152 = '';
        this.pevt153 = '';
        this.pevt154 = '';
        this.pevt155 = '';
        this.pevt156 = '';
        this.pevt157 = '';
        this.pevt158 = '';
        this.pevt159 = '';
        this.pevt160 = '';
        this.pevt161 = '';
        this.pevt162 = '';
        this.pevt163 = '';
        this.pevt164 = '';
        this.pevt165 = '';
        this.pevt166 = '';
        this.pevt167 = '';
        this.pevt168 = '';
        this.pevt169 = '';
        this.pevt170 = '';
        this.pevt171 = '';
        this.pevt172 = '';
        this.pevt173 = '';
        this.pevt174 = '';
        this.pevt175 = '';
        this.pevt176 = '';
        this.pevt177 = '';
        this.pevt178 = '';
        this.pevt179 = '';
        this.pevt180 = '';
        this.pevt181 = '';
        this.pevt182 = '';
        this.pevt183 = '';
        this.pevt184 = '';
        this.pevt185 = '';
        this.pevt186 = '';
        this.pevt187 = '';
        this.pevt188 = '';
        this.pevt189 = '';
        this.pevt190 = '';
        this.pevt191 = '';
        this.pevt192 = '';
        this.pevt193 = '';
        this.pevt194 = '';
        this.pevt195 = '';
        this.pevt196 = '';
        this.pevt197 = '';
        this.pevt198 = '';
        this.pevt199 = '';
        this.pevt200 = '';
        this.pevt201 = '';
        this.pevt202 = '';
        this.pevt203 = '';
        this.pevt204 = '';
        this.pevt205 = '';
        this.pevt206 = '';
        this.pevt207 = '';
        this.pevt208 = '';
        this.pevt209 = '';
        this.pevt210 = '';
        this.pevt211 = '';
        this.pevt212 = '';
        this.pevt213 = '';
        this.pevt214 = '';
        this.pevt215 = '';
        this.pevt216 = '';
        this.pevt217 = '';
        this.pevt218 = '';
        this.pevt219 = '';
        this.pevt220 = '';
        this.pevt221 = '';
        this.pevt222 = '';
        this.pevt223 = '';
        this.pevt224 = '';
        this.pevt225 = '';
        this.pevt226 = '';
        this.pevt227 = '';
        this.pevt228 = '';
        this.pevt229 = '';
        this.pevt230 = '';
        this.pevt231 = '';
        this.pevt232 = '';
        this.pevt233 = '';
        this.pevt234 = '';
        this.pevt235 = '';
        this.pevt236 = '';
        this.pevt237 = '';
        this.pevt238 = '';
        this.pevt239 = '';
        this.pevt240 = '';
        this.pevt241 = '';
        this.pevt242 = '';
        this.pevt243 = '';
        this.pevt244 = '';
        this.pevt245 = '';
        this.pevt246 = '';
        this.pevt247 = '';
        this.pevt248 = '';
        this.pevt249 = '';
        this.pevt250 = '';
        this.pevt251 = '';
        this.pevt252 = '';
        this.pevt253 = '';
        this.pevt254 = '';
        this.pevt255 = '';
        this.pevt256 = '';
        this.pevt257 = '';
        this.pevt258 = '';
        this.pevt259 = '';
        this.pevt260 = '';
        this.pevt261 = '';
        this.pevt262 = '';
        this.pevt263 = '';
        this.pevt264 = '';
        this.pevt265 = '';
        this.pevt266 = '';
        this.pevt267 = '';
        this.pevt268 = '';
        this.pevt269 = '';
        this.pevt270 = '';
        this.pevt271 = '';
        this.pevt272 = '';
        this.pevt273 = '';
        this.pevt274 = '';
        this.pevt275 = '';
        this.pevt276 = '';
        this.pevt277 = '';
        this.pevt278 = '';
        this.pevt279 = '';
        this.pevt280 = '';
        this.pevt281 = '';
        this.pevt282 = '';
        this.pevt283 = '';
        this.pevt284 = '';
        this.pevt285 = '';
        this.pevt286 = '';
        this.pevt287 = '';
        this.pevt288 = '';
        this.pevt289 = '';
        this.pevt290 = '';
        this.pevt291 = '';
        this.pevt292 = '';
        this.pevt293 = '';
        this.pevt294 = '';
        this.pevt295 = '';
        this.pevt296 = '';
        this.pevt297 = '';
        this.pevt298 = '';
        this.pevt299 = '';
        this.pevt300 = '';
        this.pevt301 = '';
        this.pevt302 = '';
        this.pevt303 = '';
        this.pevt304 = '';
        this.pevt305 = '';
        this.pevt306 = '';
        this.pevt307 = '';
        this.pevt308 = '';
        this.pevt309 = '';
        this.pevt310 = '';
        this.pevt311 = '';
        this.pevt312 = '';
        this.pevt313 = '';
        this.pevt314 = '';
        this.pevt315 = '';
        this.pevt316 = '';
        this.pevt317 = '';
        this.pevt318 = '';
        this.pevt319 = '';
        this.pevt320 = '';
        this.pevt321 = '';
        this.pevt322 = '';
        this.pevt323 = '';
        this.pevt324 = '';
        this.pevt325 = '';
        this.pevt326 = '';
        this.pevt327 = '';
        this.pevt328 = '';
        this.pevt329 = '';
        this.pevt330 = '';
        this.pevt331 = '';
        this.pevt332 = '';
        this.pevt333 = '';
        this.pevt334 = '';
        this.pevt335 = '';
        this.pevt336 = '';
        this.pevt337 = '';
        this.pevt338 = '';
        this.pevt339 = '';
        this.pevt340 = '';
        this.pevt341 = '';
        this.pevt342 = '';
        this.pevt343 = '';
        this.pevt344 = '';
        this.pevt345 = '';
        this.pevt346 = '';
        this.pevt347 = '';
        this.pevt348 = '';
        this.pevt349 = '';
        this.pevt350 = '';
        this.pevt351 = '';
        this.pevt352 = '';
        this.pevt353 = '';
        this.pevt354 = '';
        this.pevt355 = '';
        this.pevt356 = '';
        this.pevt357 = '';
        this.pevt358 = '';
        this.pevt359 = '';
        this.pevt360 = '';
        this.pevt361 = '';
        this.pevt362 = '';
        this.pevt363 = '';
        this.pevt364 = '';
        this.pevt365 = '';
        this.dt1 = '';
        this.dt2 = '';
        this.dt3 = '';
        this.dt4 = '';
        this.dt5 = '';
        this.dt6 = '';
        this.dt7 = '';
        this.dt8 = '';
        this.dt9 = '';
        this.dt10 = '';
        this.dt11 = '';
        this.dt12 = '';
        this.dt13 = '';
        this.dt14 = '';
        this.dt15 = '';
        this.dt16 = '';
        this.dt17 = '';
        this.dt18 = '';
        this.dt19 = '';
        this.dt20 = '';
        this.dt21 = '';
        this.dt22 = '';
        this.dt23 = '';
        this.dt24 = '';
        this.dt25 = '';
        this.dt26 = '';
        this.dt27 = '';
        this.dt28 = '';
        this.dt29 = '';
        this.dt30 = '';
        this.dt31 = '';
        this.dt32 = '';
        this.dt33 = '';
        this.dt34 = '';
        this.dt35 = '';
        this.dt36 = '';
        this.dt37 = '';
        this.dt38 = '';
        this.dt39 = '';
        this.dt40 = '';
        this.dt41 = '';
        this.dt42 = '';
        this.dt43 = '';
        this.dt44 = '';
        this.dt45 = '';
        this.dt46 = '';
        this.dt47 = '';
        this.dt48 = '';
        this.dt49 = '';
        this.dt50 = '';
        this.dt51 = '';
        this.dt52 = '';
        this.dt53 = '';
        this.dt54 = '';
        this.dt55 = '';
        this.dt56 = '';
        this.dt57 = '';
        this.dt58 = '';
        this.dt59 = '';
        this.dt60 = '';
        this.dt61 = '';
        this.dt62 = '';
        this.dt63 = '';
        this.dt64 = '';
        this.dt65 = '';
        this.dt66 = '';
        this.dt67 = '';
        this.dt68 = '';
        this.dt69 = '';
        this.dt70 = '';
        this.dt71 = '';
        this.dt72 = '';
        this.dt73 = '';
        this.dt74 = '';
        this.dt75 = '';
        this.dt76 = '';
        this.dt77 = '';
        this.dt78 = '';
        this.dt79 = '';
        this.dt80 = '';
        this.dt81 = '';
        this.dt82 = '';
        this.dt83 = '';
        this.dt84 = '';
        this.dt85 = '';
        this.dt86 = '';
        this.dt87 = '';
        this.dt88 = '';
        this.dt89 = '';
        this.dt90 = '';
        this.dt91 = '';
        this.dt92 = '';
        this.dt93 = '';
        this.dt94 = '';
        this.dt95 = '';
        this.dt96 = '';
        this.dt97 = '';
        this.dt98 = '';
        this.dt99 = '';
        this.dt100 = '';
        this.dt101 = '';
        this.dt102 = '';
        this.dt103 = '';
        this.dt104 = '';
        this.dt105 = '';
        this.dt106 = '';
        this.dt107 = '';
        this.dt108 = '';
        this.dt109 = '';
        this.dt110 = '';
        this.dt111 = '';
        this.dt112 = '';
        this.dt113 = '';
        this.dt114 = '';
        this.dt115 = '';
        this.dt116 = '';
        this.dt117 = '';
        this.dt118 = '';
        this.dt119 = '';
        this.dt120 = '';
        this.dt121 = '';
        this.dt122 = '';
        this.dt123 = '';
        this.dt124 = '';
        this.dt125 = '';
        this.dt126 = '';
        this.dt127 = '';
        this.dt128 = '';
        this.dt129 = '';
        this.dt130 = '';
        this.dt131 = '';
        this.dt132 = '';
        this.dt133 = '';
        this.dt134 = '';
        this.dt135 = '';
        this.dt136 = '';
        this.dt137 = '';
        this.dt138 = '';
        this.dt139 = '';
        this.dt140 = '';
        this.dt141 = '';
        this.dt142 = '';
        this.dt143 = '';
        this.dt144 = '';
        this.dt145 = '';
        this.dt146 = '';
        this.dt147 = '';
        this.dt148 = '';
        this.dt149 = '';
        this.dt150 = '';
        this.dt151 = '';
        this.dt152 = '';
        this.dt153 = '';
        this.dt154 = '';
        this.dt155 = '';
        this.dt156 = '';
        this.dt157 = '';
        this.dt158 = '';
        this.dt159 = '';
        this.dt160 = '';
        this.dt161 = '';
        this.dt162 = '';
        this.dt163 = '';
        this.dt164 = '';
        this.dt165 = '';
        this.dt166 = '';
        this.dt167 = '';
        this.dt168 = '';
        this.dt169 = '';
        this.dt170 = '';
        this.dt171 = '';
        this.dt172 = '';
        this.dt173 = '';
        this.dt174 = '';
        this.dt175 = '';
        this.dt176 = '';
        this.dt177 = '';
        this.dt178 = '';
        this.dt179 = '';
        this.dt180 = '';
        this.dt181 = '';
        this.dt182 = '';
        this.dt183 = '';
        this.dt184 = '';
        this.dt185 = '';
        this.dt186 = '';
        this.dt187 = '';
        this.dt188 = '';
        this.dt189 = '';
        this.dt190 = '';
        this.dt191 = '';
        this.dt192 = '';
        this.dt193 = '';
        this.dt194 = '';
        this.dt195 = '';
        this.dt196 = '';
        this.dt197 = '';
        this.dt198 = '';
        this.dt199 = '';
        this.dt200 = '';
        this.dt201 = '';
        this.dt202 = '';
        this.dt203 = '';
        this.dt204 = '';
        this.dt205 = '';
        this.dt206 = '';
        this.dt207 = '';
        this.dt208 = '';
        this.dt209 = '';
        this.dt210 = '';
        this.dt211 = '';
        this.dt212 = '';
        this.dt213 = '';
        this.dt214 = '';
        this.dt215 = '';
        this.dt216 = '';
        this.dt217 = '';
        this.dt218 = '';
        this.dt219 = '';
        this.dt220 = '';
        this.dt221 = '';
        this.dt222 = '';
        this.dt223 = '';
        this.dt224 = '';
        this.dt225 = '';
        this.dt226 = '';
        this.dt227 = '';
        this.dt228 = '';
        this.dt229 = '';
        this.dt230 = '';
        this.dt231 = '';
        this.dt232 = '';
        this.dt233 = '';
        this.dt234 = '';
        this.dt235 = '';
        this.dt236 = '';
        this.dt237 = '';
        this.dt238 = '';
        this.dt239 = '';
        this.dt240 = '';
        this.dt241 = '';
        this.dt242 = '';
        this.dt243 = '';
        this.dt244 = '';
        this.dt245 = '';
        this.dt246 = '';
        this.dt247 = '';
        this.dt248 = '';
        this.dt249 = '';
        this.dt250 = '';
        this.dt251 = '';
        this.dt252 = '';
        this.dt253 = '';
        this.dt254 = '';
        this.dt255 = '';
        this.dt256 = '';
        this.dt257 = '';
        this.dt258 = '';
        this.dt259 = '';
        this.dt260 = '';
        this.dt261 = '';
        this.dt262 = '';
        this.dt263 = '';
        this.dt264 = '';
        this.dt265 = '';
        this.dt266 = '';
        this.dt267 = '';
        this.dt268 = '';
        this.dt269 = '';
        this.dt270 = '';
        this.dt271 = '';
        this.dt272 = '';
        this.dt273 = '';
        this.dt274 = '';
        this.dt275 = '';
        this.dt276 = '';
        this.dt277 = '';
        this.dt278 = '';
        this.dt279 = '';
        this.dt280 = '';
        this.dt281 = '';
        this.dt282 = '';
        this.dt283 = '';
        this.dt284 = '';
        this.dt285 = '';
        this.dt286 = '';
        this.dt287 = '';
        this.dt288 = '';
        this.dt289 = '';
        this.dt290 = '';
        this.dt291 = '';
        this.dt292 = '';
        this.dt293 = '';
        this.dt294 = '';
        this.dt295 = '';
        this.dt296 = '';
        this.dt297 = '';
        this.dt298 = '';
        this.dt299 = '';
        this.dt300 = '';
        this.dt301 = '';
        this.dt302 = '';
        this.dt303 = '';
        this.dt304 = '';
        this.dt305 = '';
        this.dt306 = '';
        this.dt307 = '';
        this.dt308 = '';
        this.dt309 = '';
        this.dt310 = '';
        this.dt311 = '';
        this.dt312 = '';
        this.dt313 = '';
        this.dt314 = '';
        this.dt315 = '';
        this.dt316 = '';
        this.dt317 = '';
        this.dt318 = '';
        this.dt319 = '';
        this.dt320 = '';
        this.dt321 = '';
        this.dt322 = '';
        this.dt323 = '';
        this.dt324 = '';
        this.dt325 = '';
        this.dt326 = '';
        this.dt327 = '';
        this.dt328 = '';
        this.dt329 = '';
        this.dt330 = '';
        this.dt331 = '';
        this.dt332 = '';
        this.dt333 = '';
        this.dt334 = '';
        this.dt335 = '';
        this.dt336 = '';
        this.dt337 = '';
        this.dt338 = '';
        this.dt339 = '';
        this.dt340 = '';
        this.dt341 = '';
        this.dt342 = '';
        this.dt343 = '';
        this.dt344 = '';
        this.dt345 = '';
        this.dt346 = '';
        this.dt347 = '';
        this.dt348 = '';
        this.dt349 = '';
        this.dt350 = '';
        this.dt351 = '';
        this.dt352 = '';
        this.dt353 = '';
        this.dt354 = '';
        this.dt355 = '';
        this.dt356 = '';
        this.dt357 = '';
        this.dt358 = '';
        this.dt359 = '';
        this.dt360 = '';
        this.dt361 = '';
        this.dt362 = '';
        this.dt363 = '';
        this.dt364 = '';
        this.dt365 = '';
        this.str1 = '';
        this.str2 = '';
        this.str3 = '';
        this.str4 = '';
        this.str5 = '';
        this.str6 = '';
        this.str7 = '';
        this.str8 = '';
        this.str9 = '';
        this.str10 = '';
        this.str11 = '';
        this.str12 = '';
        this.str13 = '';
        this.str14 = '';
        this.str15 = '';
        this.str16 = '';
        this.str17 = '';
        this.str18 = '';
        this.str19 = '';
        this.str20 = '';
        this.str21 = '';
        this.str22 = '';
        this.str23 = '';
        this.str24 = '';
        this.str25 = '';
        this.str26 = '';
        this.str27 = '';
        this.str28 = '';
        this.str29 = '';
        this.str30 = '';
        this.str31 = '';
        this.str32 = '';
        this.str33 = '';
        this.str34 = '';
        this.str35 = '';
        this.str36 = '';
        this.str37 = '';
        this.str38 = '';
        this.str39 = '';
        this.str40 = '';
        this.str41 = '';
        this.str42 = '';
        this.str43 = '';
        this.str44 = '';
        this.str45 = '';
        this.str46 = '';
        this.str47 = '';
        this.str48 = '';
        this.str49 = '';
        this.str50 = '';
        this.str51 = '';
        this.str52 = '';
        this.str53 = '';
        this.str54 = '';
        this.str55 = '';
        this.str56 = '';
        this.str57 = '';
        this.str58 = '';
        this.str59 = '';
        this.str60 = '';
        this.str61 = '';
        this.str62 = '';
        this.str63 = '';
        this.str64 = '';
        this.str65 = '';
        this.str66 = '';
        this.str67 = '';
        this.str68 = '';
        this.str69 = '';
        this.str70 = '';
        this.str71 = '';
        this.str72 = '';
        this.str73 = '';
        this.str74 = '';
        this.str75 = '';
        this.str76 = '';
        this.str77 = '';
        this.str78 = '';
        this.str79 = '';
        this.str80 = '';
        this.str81 = '';
        this.str82 = '';
        this.str83 = '';
        this.str84 = '';
        this.str85 = '';
        this.str86 = '';
        this.str87 = '';
        this.str88 = '';
        this.str89 = '';
        this.str90 = '';
        this.str91 = '';
        this.str92 = '';
        this.str93 = '';
        this.str94 = '';
        this.str95 = '';
        this.str96 = '';
        this.str97 = '';
        this.str98 = '';
        this.str99 = '';
        this.str100 = '';
        this.str101 = '';
        this.str102 = '';
        this.str103 = '';
        this.str104 = '';
        this.str105 = '';
        this.str106 = '';
        this.str107 = '';
        this.str108 = '';
        this.str109 = '';
        this.str110 = '';
        this.str111 = '';
        this.str112 = '';
        this.str113 = '';
        this.str114 = '';
        this.str115 = '';
        this.str116 = '';
        this.str117 = '';
        this.str118 = '';
        this.str119 = '';
        this.str120 = '';
        this.str121 = '';
        this.str122 = '';
        this.str123 = '';
        this.str124 = '';
        this.str125 = '';
        this.str126 = '';
        this.str127 = '';
        this.str128 = '';
        this.str129 = '';
        this.str130 = '';
        this.str131 = '';
        this.str132 = '';
        this.str133 = '';
        this.str134 = '';
        this.str135 = '';
        this.str136 = '';
        this.str137 = '';
        this.str138 = '';
        this.str139 = '';
        this.str140 = '';
        this.str141 = '';
        this.str142 = '';
        this.str143 = '';
        this.str144 = '';
        this.str145 = '';
        this.str146 = '';
        this.str147 = '';
        this.str148 = '';
        this.str149 = '';
        this.str150 = '';
        this.str151 = '';
        this.str152 = '';
        this.str153 = '';
        this.str154 = '';
        this.str155 = '';
        this.str156 = '';
        this.str157 = '';
        this.str158 = '';
        this.str159 = '';
        this.str160 = '';
        this.str161 = '';
        this.str162 = '';
        this.str163 = '';
        this.str164 = '';
        this.str165 = '';
        this.str166 = '';
        this.str167 = '';
        this.str168 = '';
        this.str169 = '';
        this.str170 = '';
        this.str171 = '';
        this.str172 = '';
        this.str173 = '';
        this.str174 = '';
        this.str175 = '';
        this.str176 = '';
        this.str177 = '';
        this.str178 = '';
        this.str179 = '';
        this.str180 = '';
        this.str181 = '';
        this.str182 = '';
        this.str183 = '';
        this.str184 = '';
        this.str185 = '';
        this.str186 = '';
        this.str187 = '';
        this.str188 = '';
        this.str189 = '';
        this.str190 = '';
        this.str191 = '';
        this.str192 = '';
        this.str193 = '';
        this.str194 = '';
        this.str195 = '';
        this.str196 = '';
        this.str197 = '';
        this.str198 = '';
        this.str199 = '';
        this.str200 = '';
        this.str201 = '';
        this.str202 = '';
        this.str203 = '';
        this.str204 = '';
        this.str205 = '';
        this.str206 = '';
        this.str207 = '';
        this.str208 = '';
        this.str209 = '';
        this.str210 = '';
        this.str211 = '';
        this.str212 = '';
        this.str213 = '';
        this.str214 = '';
        this.str215 = '';
        this.str216 = '';
        this.str217 = '';
        this.str218 = '';
        this.str219 = '';
        this.str220 = '';
        this.str221 = '';
        this.str222 = '';
        this.str223 = '';
        this.str224 = '';
        this.str225 = '';
        this.str226 = '';
        this.str227 = '';
        this.str228 = '';
        this.str229 = '';
        this.str230 = '';
        this.str231 = '';
        this.str232 = '';
        this.str233 = '';
        this.str234 = '';
        this.str235 = '';
        this.str236 = '';
        this.str237 = '';
        this.str238 = '';
        this.str239 = '';
        this.str240 = '';
        this.str241 = '';
        this.str242 = '';
        this.str243 = '';
        this.str244 = '';
        this.str245 = '';
        this.str246 = '';
        this.str247 = '';
        this.str248 = '';
        this.str249 = '';
        this.str250 = '';
        this.str251 = '';
        this.str252 = '';
        this.str253 = '';
        this.str254 = '';
        this.str255 = '';
        this.str256 = '';
        this.str257 = '';
        this.str258 = '';
        this.str259 = '';
        this.str260 = '';
        this.str261 = '';
        this.str262 = '';
        this.str263 = '';
        this.str264 = '';
        this.str265 = '';
        this.str266 = '';
        this.str267 = '';
        this.str268 = '';
        this.str269 = '';
        this.str270 = '';
        this.str271 = '';
        this.str272 = '';
        this.str273 = '';
        this.str274 = '';
        this.str275 = '';
        this.str276 = '';
        this.str277 = '';
        this.str278 = '';
        this.str279 = '';
        this.str280 = '';
        this.str281 = '';
        this.str282 = '';
        this.str283 = '';
        this.str284 = '';
        this.str285 = '';
        this.str286 = '';
        this.str287 = '';
        this.str288 = '';
        this.str289 = '';
        this.str290 = '';
        this.str291 = '';
        this.str292 = '';
        this.str293 = '';
        this.str294 = '';
        this.str295 = '';
        this.str296 = '';
        this.str297 = '';
        this.str298 = '';
        this.str299 = '';
        this.str300 = '';
        this.str301 = '';
        this.str302 = '';
        this.str303 = '';
        this.str304 = '';
        this.str305 = '';
        this.str306 = '';
        this.str307 = '';
        this.str308 = '';
        this.str309 = '';
        this.str310 = '';
        this.str311 = '';
        this.str312 = '';
        this.str313 = '';
        this.str314 = '';
        this.str315 = '';
        this.str316 = '';
        this.str317 = '';
        this.str318 = '';
        this.str319 = '';
        this.str320 = '';
        this.str321 = '';
        this.str322 = '';
        this.str323 = '';
        this.str324 = '';
        this.str325 = '';
        this.str326 = '';
        this.str327 = '';
        this.str328 = '';
        this.str329 = '';
        this.str330 = '';
        this.str331 = '';
        this.str332 = '';
        this.str333 = '';
        this.str334 = '';
        this.str335 = '';
        this.str336 = '';
        this.str337 = '';
        this.str338 = '';
        this.str339 = '';
        this.str340 = '';
        this.str341 = '';
        this.str342 = '';
        this.str343 = '';
        this.str344 = '';
        this.str345 = '';
        this.str346 = '';
        this.str347 = '';
        this.str348 = '';
        this.str349 = '';
        this.str350 = '';
        this.str351 = '';
        this.str352 = '';
        this.str353 = '';
        this.str354 = '';
        this.str355 = '';
        this.str356 = '';
        this.str357 = '';
        this.str358 = '';
        this.str359 = '';
        this.str360 = '';
        this.str361 = '';
        this.str362 = '';
        this.str363 = '';
        this.str364 = '';
        this.str365 = '';
        this.strL1 = '';
        this.strL2 = '';
        this.strL3 = '';
        this.strL4 = '';
        this.strL5 = '';
        this.strL6 = '';
        this.strL7 = '';
        this.strL8 = '';
        this.strL9 = '';
        this.strL10 = '';
        this.strL11 = '';
        this.strL12 = '';
        this.strL13 = '';
        this.strL14 = '';
        this.strL15 = '';
        this.strL16 = '';
        this.strL17 = '';
        this.strL18 = '';
        this.strL19 = '';
        this.strL20 = '';
        this.strL21 = '';
        this.strL22 = '';
        this.strL23 = '';
        this.strL24 = '';
        this.strL25 = '';
        this.strL26 = '';
        this.strL27 = '';
        this.strL28 = '';
        this.strL29 = '';
        this.strL30 = '';
        this.strL31 = '';
        this.strL32 = '';
        this.strL33 = '';
        this.strL34 = '';
        this.strL35 = '';
        this.strL36 = '';
        this.strL37 = '';
        this.strL38 = '';
        this.strL39 = '';
        this.strL40 = '';
        this.strL41 = '';
        this.strL42 = '';
        this.strL43 = '';
        this.strL44 = '';
        this.strL45 = '';
        this.strL46 = '';
        this.strL47 = '';
        this.strL48 = '';
        this.strL49 = '';
        this.strL50 = '';
        this.strL51 = '';
        this.strL52 = '';
        this.strL53 = '';
        this.strL54 = '';
        this.strL55 = '';
        this.strL56 = '';
        this.strL57 = '';
        this.strL58 = '';
        this.strL59 = '';
        this.strL60 = '';
        this.strL61 = '';
        this.strL62 = '';
        this.strL63 = '';
        this.strL64 = '';
        this.strL65 = '';
        this.strL66 = '';
        this.strL67 = '';
        this.strL68 = '';
        this.strL69 = '';
        this.strL70 = '';
        this.strL71 = '';
        this.strL72 = '';
        this.strL73 = '';
        this.strL74 = '';
        this.strL75 = '';
        this.strL76 = '';
        this.strL77 = '';
        this.strL78 = '';
        this.strL79 = '';
        this.strL80 = '';
        this.strL81 = '';
        this.strL82 = '';
        this.strL83 = '';
        this.strL84 = '';
        this.strL85 = '';
        this.strL86 = '';
        this.strL87 = '';
        this.strL88 = '';
        this.strL89 = '';
        this.strL90 = '';
        this.strL91 = '';
        this.strL92 = '';
        this.strL93 = '';
        this.strL94 = '';
        this.strL95 = '';
        this.strL96 = '';
        this.strL97 = '';
        this.strL98 = '';
        this.strL99 = '';
        this.strL100 = '';
        this.strL101 = '';
        this.strL102 = '';
        this.strL103 = '';
        this.strL104 = '';
        this.strL105 = '';
        this.strL106 = '';
        this.strL107 = '';
        this.strL108 = '';
        this.strL109 = '';
        this.strL110 = '';
        this.strL111 = '';
        this.strL112 = '';
        this.strL113 = '';
        this.strL114 = '';
        this.strL115 = '';
        this.strL116 = '';
        this.strL117 = '';
        this.strL118 = '';
        this.strL119 = '';
        this.strL120 = '';
        this.strL121 = '';
        this.strL122 = '';
        this.strL123 = '';
        this.strL124 = '';
        this.strL125 = '';
        this.strL126 = '';
        this.strL127 = '';
        this.strL128 = '';
        this.strL129 = '';
        this.strL130 = '';
        this.strL131 = '';
        this.strL132 = '';
        this.strL133 = '';
        this.strL134 = '';
        this.strL135 = '';
        this.strL136 = '';
        this.strL137 = '';
        this.strL138 = '';
        this.strL139 = '';
        this.strL140 = '';
        this.strL141 = '';
        this.strL142 = '';
        this.strL143 = '';
        this.strL144 = '';
        this.strL145 = '';
        this.strL146 = '';
        this.strL147 = '';
        this.strL148 = '';
        this.strL149 = '';
        this.strL150 = '';
        this.strL151 = '';
        this.strL152 = '';
        this.strL153 = '';
        this.strL154 = '';
        this.strL155 = '';
        this.strL156 = '';
        this.strL157 = '';
        this.strL158 = '';
        this.strL159 = '';
        this.strL160 = '';
        this.strL161 = '';
        this.strL162 = '';
        this.strL163 = '';
        this.strL164 = '';
        this.strL165 = '';
        this.strL166 = '';
        this.strL167 = '';
        this.strL168 = '';
        this.strL169 = '';
        this.strL170 = '';
        this.strL171 = '';
        this.strL172 = '';
        this.strL173 = '';
        this.strL174 = '';
        this.strL175 = '';
        this.strL176 = '';
        this.strL177 = '';
        this.strL178 = '';
        this.strL179 = '';
        this.strL180 = '';
        this.strL181 = '';
        this.strL182 = '';
        this.strL183 = '';
        this.strL184 = '';
        this.strL185 = '';
        this.strL186 = '';
        this.strL187 = '';
        this.strL188 = '';
        this.strL189 = '';
        this.strL190 = '';
        this.strL191 = '';
        this.strL192 = '';
        this.strL193 = '';
        this.strL194 = '';
        this.strL195 = '';
        this.strL196 = '';
        this.strL197 = '';
        this.strL198 = '';
        this.strL199 = '';
        this.strL200 = '';
        this.strL201 = '';
        this.strL202 = '';
        this.strL203 = '';
        this.strL204 = '';
        this.strL205 = '';
        this.strL206 = '';
        this.strL207 = '';
        this.strL208 = '';
        this.strL209 = '';
        this.strL210 = '';
        this.strL211 = '';
        this.strL212 = '';
        this.strL213 = '';
        this.strL214 = '';
        this.strL215 = '';
        this.strL216 = '';
        this.strL217 = '';
        this.strL218 = '';
        this.strL219 = '';
        this.strL220 = '';
        this.strL221 = '';
        this.strL222 = '';
        this.strL223 = '';
        this.strL224 = '';
        this.strL225 = '';
        this.strL226 = '';
        this.strL227 = '';
        this.strL228 = '';
        this.strL229 = '';
        this.strL230 = '';
        this.strL231 = '';
        this.strL232 = '';
        this.strL233 = '';
        this.strL234 = '';
        this.strL235 = '';
        this.strL236 = '';
        this.strL237 = '';
        this.strL238 = '';
        this.strL239 = '';
        this.strL240 = '';
        this.strL241 = '';
        this.strL242 = '';
        this.strL243 = '';
        this.strL244 = '';
        this.strL245 = '';
        this.strL246 = '';
        this.strL247 = '';
        this.strL248 = '';
        this.strL249 = '';
        this.strL250 = '';
        this.strL251 = '';
        this.strL252 = '';
        this.strL253 = '';
        this.strL254 = '';
        this.strL255 = '';
        this.strL256 = '';
        this.strL257 = '';
        this.strL258 = '';
        this.strL259 = '';
        this.strL260 = '';
        this.strL261 = '';
        this.strL262 = '';
        this.strL263 = '';
        this.strL264 = '';
        this.strL265 = '';
        this.strL266 = '';
        this.strL267 = '';
        this.strL268 = '';
        this.strL269 = '';
        this.strL270 = '';
        this.strL271 = '';
        this.strL272 = '';
        this.strL273 = '';
        this.strL274 = '';
        this.strL275 = '';
        this.strL276 = '';
        this.strL277 = '';
        this.strL278 = '';
        this.strL279 = '';
        this.strL280 = '';
        this.strL281 = '';
        this.strL282 = '';
        this.strL283 = '';
        this.strL284 = '';
        this.strL285 = '';
        this.strL286 = '';
        this.strL287 = '';
        this.strL288 = '';
        this.strL289 = '';
        this.strL290 = '';
        this.strL291 = '';
        this.strL292 = '';
        this.strL293 = '';
        this.strL294 = '';
        this.strL295 = '';
        this.strL296 = '';
        this.strL297 = '';
        this.strL298 = '';
        this.strL299 = '';
        this.strL300 = '';
        this.strL301 = '';
        this.strL302 = '';
        this.strL303 = '';
        this.strL304 = '';
        this.strL305 = '';
        this.strL306 = '';
        this.strL307 = '';
        this.strL308 = '';
        this.strL309 = '';
        this.strL310 = '';
        this.strL311 = '';
        this.strL312 = '';
        this.strL313 = '';
        this.strL314 = '';
        this.strL315 = '';
        this.strL316 = '';
        this.strL317 = '';
        this.strL318 = '';
        this.strL319 = '';
        this.strL320 = '';
        this.strL321 = '';
        this.strL322 = '';
        this.strL323 = '';
        this.strL324 = '';
        this.strL325 = '';
        this.strL326 = '';
        this.strL327 = '';
        this.strL328 = '';
        this.strL329 = '';
        this.strL330 = '';
        this.strL331 = '';
        this.strL332 = '';
        this.strL333 = '';
        this.strL334 = '';
        this.strL335 = '';
        this.strL336 = '';
        this.strL337 = '';
        this.strL338 = '';
        this.strL339 = '';
        this.strL340 = '';
        this.strL341 = '';
        this.strL342 = '';
        this.strL343 = '';
        this.strL344 = '';
        this.strL345 = '';
        this.strL346 = '';
        this.strL347 = '';
        this.strL348 = '';
        this.strL349 = '';
        this.strL350 = '';
        this.strL351 = '';
        this.strL352 = '';
        this.strL353 = '';
        this.strL354 = '';
        this.strL355 = '';
        this.strL356 = '';
        this.strL357 = '';
        this.strL358 = '';
        this.strL359 = '';
        this.strL360 = '';
        this.strL361 = '';
        this.strL362 = '';
        this.strL363 = '';
        this.strL364 = '';
        this.strL365 = '';
        this.oPlanet = [];
        this.oHouse = [];
        this.showGrid = false;
        this.oPlanet = navParams.get('oplanet');
        this.oHouse = navParams.get('ohou');
        platform.ready().then(function (readySource) {
            console.log('Width: ' + platform.width());
            //this.device_width = platform.width();
            console.log('Height: ' + platform.height());
            //this.device_height = platform.height();
            //PREDICTIONS
            _this.horoService.getDashaTransits(_this.shareService.getVIM())
                .subscribe(function (res) {
                _this.publishReport(res);
            }, function (err) {
            });
        });
    }
    PredictionsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PredictionsPage');
    };
    PredictionsPage.prototype.publishReport = function (stars) {
        var cur_sssl = '';
        var cur_trans_l = '';
        var cur_star = '';
        var cur_mdas = '';
        var cur_adas = '';
        var cur_pdas = '';
        var cur_pend = null;
        for (var i = 0; i < Object.keys(stars).length; i++) {
            var vim;
            var c_dt = (stars[i].date.indexOf(',') != -1) ? stars[i].date.split(',')[0] : stars[i].date;
            var utc_d = c_dt.split('-')[2] + '-' + c_dt.split('-')[1] + '-' + c_dt.split('-')[0] + 'T' + '00:00:00Z';
            var cDt = new Date(utc_d);
            if (cur_pend == null || cDt > cur_pend) {
                vim = this.getVimDasha(cDt);
                cur_mdas = vim.split('|')[0];
                cur_adas = vim.split('|')[1];
                cur_pdas = vim.split('|')[2];
                cur_pend = new Date(vim.split('|')[3]);
                this['das' + (i + 1).toString()] = '<span>Main Dasa: </span><span>' + cur_mdas + '</span><span> Antar Dasa: </span><span>' + cur_adas + '</span><span> Pratyantar Dasa: </span><span>' + cur_pdas + '</span>';
            }
            this['dt' + (i + 1).toString()] = '<span>' + stars[i].date + '</span>';
            this['strL' + (i + 1).toString()] = '<span>' + this.translate(stars[i].signL) + '-' + this.translate(stars[i].starL) + '-' + this.translate(stars[i].subL) + '</span>';
            this['str' + (i + 1).toString()] = '<span>' + this.translate(stars[i].star) + '</span>';
            if (stars[i].date.indexOf(',') != -1) {
                //there is a planet transiting on this day
                var pl = stars[i].date.split(',')[1].split(' ')[1];
                var sssl = stars[i].signL + '-' + stars[i].starL + '-' + stars[i].subL;
                if (ruler_name[pl.toLowerCase()] == cur_trans_l && sssl == cur_sssl && stars[i].star == cur_star) {
                    this['pevt' + (i + 1).toString()] = '<span>' + this.translate(ruler_name[pl.toLowerCase()]) + ' transit continues..' + '</span>';
                    continue;
                }
                console.log('Transiting planet=' + pl);
                var star = stars[i].star;
                console.log(star);
                var nak = nakshatra_order[star];
                var const_lord = nak.ruler;
                var mins = 0;
                var pos = stars[i].date.split(',')[1].split(' ')[0];
                if (pos.indexOf('.') > -1 && pos.split('.')[1] != '')
                    mins = (signs_pos[stars[i].sign.toLowerCase()] + parseInt(pos.split('.')[0], 10)) * 60 + parseInt(pos.split('.')[1], 10);
                else
                    mins = (signs_pos[stars[i].sign.toLowerCase()] + parseInt(pos.split('.')[0], 10)) * 60;
                var asp_lord = '';
                var cnj_lord = '';
                var node_c_lord = '';
                var node_s_lord = '';
                if (const_lord == 'rahu' || const_lord == 'ketu') { //rahu/ketu acts as agents to the lords who are conjoined, aspected, const lord, sign lord predominantly
                    var plPos = this.shareService.getPLPOS();
                    var brahu_res = false;
                    var bketu_res = false;
                    var node_sign = '';
                    for (var _i = 0, _a = Object.keys(signs); _i < _a.length; _i++) {
                        var key = _a[_i];
                        if (signs[key] == 'na')
                            continue;
                        var sign = signs[key];
                        if (plPos.hasOwnProperty(sign)) {
                            var p_con = '';
                            var brahu = false;
                            var bketu = false;
                            var pls = plPos[sign].split('\|');
                            for (var k = 0; k < pls.length; k++) {
                                if (const_lord == 'rahu' && pls.split(' ')[1].toLowerCase() == 'ra') {
                                    brahu = true;
                                    node_sign = sign;
                                }
                                else if (const_lord == 'ketu' && pls.split(' ')[1].toLowerCase() == 'ke') {
                                    bketu = true;
                                    node_sign = sign;
                                }
                                else {
                                    p_con += pls.split(' ')[1].toLowerCase() + ',';
                                }
                            }
                            if (const_lord == 'rahu' && brahu && p_con != '') { //a planet conjoined with rahu
                                cnj_lord = ruler_name[p_con.split(',')[0].toLowerCase()];
                                brahu_res = true;
                                break;
                            }
                            else if (const_lord == 'ketu' && bketu && p_con != '') { //a planet conjoined with ketu
                                cnj_lord = ruler_name[p_con.split(',')[0].toLowerCase()];
                                bketu_res = true;
                                break;
                            }
                        }
                    }
                    if (const_lord == 'rahu' && brahu_res == false) { //no planet conjoined with rahu
                        var a_ls = this.check_aspects(node_sign.toLowerCase());
                        asp_lord = ruler_name[a_ls.split(';')[0].split('|')[1].toLowerCase()];
                        if (asp_lord != '')
                            brahu_res = true;
                    }
                    else if (const_lord == 'ketu' && bketu_res == false) { //no planet conjoined with ketu
                        var a_ls = this.check_aspects(node_sign.toLowerCase());
                        asp_lord = ruler_name[a_ls.split(';')[0].split('|')[1].toLowerCase()];
                        if (asp_lord != '')
                            bketu_res = true;
                    }
                    if (const_lord == 'rahu' && brahu_res == false) { //no planet is aspecting rahu
                        node_s_lord = this.oPlanet[const_lord].sign;
                        node_c_lord = this.oPlanet[const_lord].star;
                    }
                    else if (const_lord == 'ketu' && bketu_res == false) { //no planet is aspecting ketu
                        node_s_lord = this.oPlanet[const_lord].sign;
                        node_c_lord = this.oPlanet[const_lord].star;
                    }
                }
                var t_lord_h = this.get_own_houses(ruler_name[pl.toLowerCase()].toLowerCase());
                console.log('calling get_sub_neg const lord houses=' + t_lord_h.toString() + ' const lord lif evts=' + this.oPlanet[const_lord].lif_e);
                var sub_neg = this.get_sub_neg(t_lord_h, this.oPlanet[const_lord].lif_e);
                console.log('sublord contradicts ' + sub_neg);
                var desc = ruler_name[pl.toLowerCase()] + ' the lord of ' + t_lord_h.toString() + ' house(s).';
                var inds = '';
                if (const_lord == 'rahu' || const_lord == 'ketu') {
                    if (cnj_lord != '') {
                        desc += ' Conjoined by ' + cnj_lord;
                        t_lord_h = this.get_own_houses(cnj_lord);
                        inds = this.get_indicators(cnj_lord.toLowerCase(), t_lord_h.toString());
                    }
                    else if (asp_lord != '') {
                        desc += ' Aspected by ' + asp_lord;
                        t_lord_h = this.get_own_houses(asp_lord);
                        inds = this.get_indicators(asp_lord.toLowerCase(), t_lord_h.toString());
                    }
                    else {
                        desc += ' Which is in the house owned by ' + node_s_lord;
                        t_lord_h = this.get_own_houses(node_s_lord);
                        inds = this.get_indicators(node_s_lord.toLowerCase(), t_lord_h.toString());
                    }
                }
                else {
                    inds = this.get_indicators(ruler_name[pl.toLowerCase()].toLowerCase(), t_lord_h.toString());
                }
                desc += ' which indicates ' + inds + ' ' + this.translate(ruler_name[pl.toLowerCase()]) + ' transits in star ' + this.translate(star) + '. Lord of this star is ' + this.translate(const_lord) + ' ';
                desc += 'who is the significator of ' + this.oPlanet[const_lord].sig + ' houses gets fulfilled through one of indicators above.';
                desc += (this.oPlanet[const_lord].lif_e != '') ? ' Based on placement of ' + this.translate(const_lord) + ' in your horoscope causes ' + this.oPlanet[const_lord].lif_e : '';
                desc += (sub_neg != '') ? ' However the subloard ' + this.translate(stars[i].subL) + ' of this transit contradicts ' + this.translate(sub_neg) : '';
                this['pevt' + (i + 1).toString()] = '<span>' + desc + '</span>';
                cur_trans_l = ruler_name[pl.toLowerCase()];
                cur_sssl = stars[i].signL + '-' + stars[i].starL + '-' + stars[i].subL;
                cur_star = stars[i].star;
            }
        }
    };
    PredictionsPage.prototype.translate = function (lord) {
        if (this.shareService.getLANG().toLowerCase() == 'en')
            return lord;
        var trn = '';
        switch (lord.toLowerCase()) {
            case 'sun':
            case 'su':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'సూర్యుడు';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'रवि ग्रह';
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
                break;
            case 'jupiter':
            case 'ju':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'బృహస్పతి';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'बृहस्पति';
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
                break;
            case 'mars':
            case 'ma':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'కుజుడు';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'मंगल ग्रह';
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
                break;
            case 'saturn':
            case 'sa':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'శనిగ్రహము';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'शनि ग्रह';
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
                break;
            case 'ketu':
            case 'ke':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'కేతు';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'केतु ग्रह';
                }
                break;
            case 'aries':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'మేషరాశి';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'मेष राशि';
                }
                break;
            case 'taurus':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'వృషభరాశి';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'वृषभ राशि';
                }
                break;
            case 'gemini':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'మిధునరాశి';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'मिथुन राशि';
                }
                break;
            case 'cancer':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'కర్కాటకరాశి';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'कर्क राशि';
                }
                break;
            case 'leo':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'సిమ్హరాశి';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'सिंह राशि';
                }
                break;
            case 'virgo':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'కన్యరాశి';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'कन्या राशि';
                }
                break;
            case 'libra':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'తులారాసి';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'तुला राशि';
                }
                break;
            case 'scorpio':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'వృశ్చికరాసి';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'वृश्चिक राशि';
                }
                break;
            case 'saggitarius':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'ధనుస్సురాసి';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'धनु राशि';
                }
                break;
            case 'capricorn':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'మకరరాసి';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'मकर राशि';
                }
                break;
            case 'aquarius':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'కుంభరాసి';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'कुंभ राशि';
                }
                break;
            case 'pisces':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'మీనరాసి';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'मीन राशि';
                }
                break;
            case 'ashwini':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'అశ్వినీ';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'अश्विनी';
                }
                break;
            case 'bharani':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'భరణి';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'भरणी';
                }
                break;
            case 'krittika':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'కృత్తికా';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'कृत्तिका';
                }
                break;
            case 'rohini':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'రోహిణి';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'रोहिणी';
                }
                break;
            case 'mrigashira':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'మ్రిగశిర';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'मृगशिरा';
                }
                break;
            case 'ardra':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'ఆర్ద్ర';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'आर्द्र';
                }
                break;
            case 'ardra':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'ఆర్ద్ర';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'आर्द्र';
                }
                break;
            case 'punarvasu':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'పునర్వసు';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'पुनर्वसु';
                }
                break;
            case 'pushya':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'పుష్య';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'पुष्य';
                }
                break;
            case 'ashlesha':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'ఆశ్లేష';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'अश्लेषा';
                }
                break;
            case 'magha':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'మఘ';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'मघा';
                }
                break;
            case 'purvaphalguni':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'పూర్వఫల్గుణి';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'पूर्वाफाल्गुनी';
                }
                break;
            case 'uttaraaphalguni':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'ఉత్తరాఫల్గుణి';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'उत्तराफाल्गुनी';
                }
                break;
            case 'hastha':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'హస్త';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'हस्ता';
                }
                break;
            case 'chitra':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'చిత్ర';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'चित्र';
                }
                break;
            case 'swati':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'స్వాతి';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'स्वाति';
                }
                break;
            case 'vishakha':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'విశాఖ';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'विशाखा';
                }
                break;
            case 'anuradha':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'అనురాధ';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'अनुराधा';
                }
                break;
            case 'jyestha':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'జ్యేష్ఠా';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'जयस्था';
                }
                break;
            case 'mula':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'మూల';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'मूल';
                }
                break;
            case 'purvaashada':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'పూర్వాషాఢ';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'पूर्वाषाढ़ा';
                }
                break;
            case 'uttaraashada':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'ఉత్తరాషాఢ';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'उत्तराषाढ़ा';
                }
                break;
            case 'shravana':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'శ్రావణ';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'श्रवण';
                }
                break;
            case 'danishta':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'ధనిష్ఠ';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'धनिष्ठा';
                }
                break;
            case 'shatabhisha':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'శతభిషా';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'शतभिषा';
                }
                break;
            case 'purvabhadra':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'పూర్వాభాద్ర';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'पूर्वभाद्र';
                }
                break;
            case 'uttarabhadra':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'ఉత్తరాభాద్ర';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'उत्तरभाद्र';
                }
                break;
            case 'revati':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'రేవతి';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'रेवती';
                }
                break;
            default:
                trn = lord;
                break;
        }
        return trn;
    };
    PredictionsPage.prototype.get_sub_neg = function (t_h, lif_e) {
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
    PredictionsPage.prototype.check_aspects = function (sign) {
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
    PredictionsPage.prototype.get_indicators = function (lord, houses) {
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
    PredictionsPage.prototype.get_own_houses = function (lord) {
        var hno = '';
        for (var i = 0; i < Object.keys(this.oHouse).length; i++) {
            if (this.oHouse[i + 1].sign == lord)
                hno += (i + 1).toString() + ',';
        }
        return hno;
    };
    PredictionsPage.prototype.getVimDasha = function (dt) {
        var vim = this.shareService.getVIM();
        for (var _i = 0, _a = Object.keys(vim); _i < _a.length; _i++) {
            var key = _a[_i];
            var frm_d = vim[key].split('|')[0];
            var utc_frm_d = frm_d.split('-')[2] + '-' + frm_d.split('-')[1] + '-' + frm_d.split('-')[0] + 'T' + '00:00:00Z';
            var dtFrm = new Date(utc_frm_d);
            var to_d = vim[key].split('|')[1];
            var utc_to_d = to_d.split('-')[2] + '-' + to_d.split('-')[1] + '-' + to_d.split('-')[0] + 'T' + '00:00:00Z';
            var dtTo = new Date(utc_to_d);
            if (dt >= dtFrm && dt <= dtTo) {
                return vim[key].mdas + '|' + vim[key].adas + '|' + vim[key].pdas + '|' + utc_to_d;
            }
        }
    };
    PredictionsPage = __decorate([
        NgModule({
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }),
        Component({
            selector: 'page-predictions',
            templateUrl: 'predictions.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, Platform, ShareService, HoroscopeService])
    ], PredictionsPage);
    return PredictionsPage;
}());
export { PredictionsPage };
//# sourceMappingURL=predictions.js.map