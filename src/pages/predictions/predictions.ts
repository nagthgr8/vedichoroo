import { Component, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform   } from 'ionic-angular';
import { ShareService } from '../../app/share.service';
import { HoroscopeService } from '../../app/horoscope.service';
import { PlanetPos } from '../../app/planet-pos';
import { HousePos } from '../../app/house-pos';
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
import * as ketu from '../horoscope/ketu.json';
import * as moon from '../horoscope/moon.json';
import * as mars from '../horoscope/mars.json';
import * as rahu from '../horoscope/rahu.json';
import * as jupiter from '../horoscope/jupiter.json';
import * as saturn from '../horoscope/saturn.json';
import * as mercury from '../horoscope/mercury.json';
import * as house_groups from '../horoscope/house_groups.json';
import * as aspects from '../horoscope/aspects.json';

/**
 * Generated class for the PredictionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@NgModule({
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
@Component({
  selector: 'page-predictions',
  templateUrl: 'predictions.html',
})
export class PredictionsPage {
das1: string = '';das2: string = '';das3: string = '';das4: string = '';das5: string = '';das6: string = '';das7: string = '';das8: string = '';das9: string = '';das10: string = '';das11: string = '';das12: string = '';das13: string = '';das14: string = '';das15: string = '';das16: string = '';das17: string = '';das18: string = '';das19: string = '';das20: string = '';das21: string = '';das22: string = '';das23: string = '';das24: string = '';das25: string = '';das26: string = '';das27: string = '';das28: string = '';das29: string = '';das30: string = '';das31: string = '';das32: string = '';das33: string = '';das34: string = '';das35: string = '';das36: string = '';das37: string = '';das38: string = '';das39: string = '';das40: string = '';das41: string = '';das42: string = '';das43: string = '';das44: string = '';das45: string = '';das46: string = '';das47: string = '';das48: string = '';das49: string = '';das50: string = '';das51: string = '';das52: string = '';das53: string = '';das54: string = '';das55: string = '';das56: string = '';das57: string = '';das58: string = '';das59: string = '';das60: string = '';das61: string = '';das62: string = '';das63: string = '';das64: string = '';das65: string = '';das66: string = '';das67: string = '';das68: string = '';das69: string = '';das70: string = '';das71: string = '';das72: string = '';das73: string = '';das74: string = '';das75: string = '';das76: string = '';das77: string = '';das78: string = '';das79: string = '';das80: string = '';das81: string = '';das82: string = '';das83: string = '';das84: string = '';das85: string = '';das86: string = '';das87: string = '';das88: string = '';das89: string = '';das90: string = '';das91: string = '';das92: string = '';das93: string = '';das94: string = '';das95: string = '';das96: string = '';das97: string = '';das98: string = '';das99: string = '';das100: string = '';das101: string = '';das102: string = '';das103: string = '';das104: string = '';das105: string = '';das106: string = '';das107: string = '';das108: string = '';das109: string = '';das110: string = '';das111: string = '';das112: string = '';das113: string = '';das114: string = '';das115: string = '';das116: string = '';das117: string = '';das118: string = '';das119: string = '';das120: string = '';das121: string = '';das122: string = '';das123: string = '';das124: string = '';das125: string = '';das126: string = '';das127: string = '';das128: string = '';das129: string = '';das130: string = '';das131: string = '';das132: string = '';das133: string = '';das134: string = '';das135: string = '';das136: string = '';das137: string = '';das138: string = '';das139: string = '';das140: string = '';das141: string = '';das142: string = '';das143: string = '';das144: string = '';das145: string = '';das146: string = '';das147: string = '';das148: string = '';das149: string = '';das150: string = '';das151: string = '';das152: string = '';das153: string = '';das154: string = '';das155: string = '';das156: string = '';das157: string = '';das158: string = '';das159: string = '';das160: string = '';das161: string = '';das162: string = '';das163: string = '';das164: string = '';das165: string = '';das166: string = '';das167: string = '';das168: string = '';das169: string = '';das170: string = '';das171: string = '';das172: string = '';das173: string = '';das174: string = '';das175: string = '';das176: string = '';das177: string = '';das178: string = '';das179: string = '';das180: string = '';das181: string = '';das182: string = '';das183: string = '';das184: string = '';das185: string = '';das186: string = '';das187: string = '';das188: string = '';das189: string = '';das190: string = '';das191: string = '';das192: string = '';das193: string = '';das194: string = '';das195: string = '';das196: string = '';das197: string = '';das198: string = '';das199: string = '';das200: string = '';das201: string = '';das202: string = '';das203: string = '';das204: string = '';das205: string = '';das206: string = '';das207: string = '';das208: string = '';das209: string = '';das210: string = '';das211: string = '';das212: string = '';das213: string = '';das214: string = '';das215: string = '';das216: string = '';das217: string = '';das218: string = '';das219: string = '';das220: string = '';das221: string = '';das222: string = '';das223: string = '';das224: string = '';das225: string = '';das226: string = '';das227: string = '';das228: string = '';das229: string = '';das230: string = '';das231: string = '';das232: string = '';das233: string = '';das234: string = '';das235: string = '';das236: string = '';das237: string = '';das238: string = '';das239: string = '';das240: string = '';das241: string = '';das242: string = '';das243: string = '';das244: string = '';das245: string = '';das246: string = '';das247: string = '';das248: string = '';das249: string = '';das250: string = '';das251: string = '';das252: string = '';das253: string = '';das254: string = '';das255: string = '';das256: string = '';das257: string = '';das258: string = '';das259: string = '';das260: string = '';das261: string = '';das262: string = '';das263: string = '';das264: string = '';das265: string = '';das266: string = '';das267: string = '';das268: string = '';das269: string = '';das270: string = '';das271: string = '';das272: string = '';das273: string = '';das274: string = '';das275: string = '';das276: string = '';das277: string = '';das278: string = '';das279: string = '';das280: string = '';das281: string = '';das282: string = '';das283: string = '';das284: string = '';das285: string = '';das286: string = '';das287: string = '';das288: string = '';das289: string = '';das290: string = '';das291: string = '';das292: string = '';das293: string = '';das294: string = '';das295: string = '';das296: string = '';das297: string = '';das298: string = '';das299: string = '';das300: string = '';das301: string = '';das302: string = '';das303: string = '';das304: string = '';das305: string = '';das306: string = '';das307: string = '';das308: string = '';das309: string = '';das310: string = '';das311: string = '';das312: string = '';das313: string = '';das314: string = '';das315: string = '';das316: string = '';das317: string = '';das318: string = '';das319: string = '';das320: string = '';das321: string = '';das322: string = '';das323: string = '';das324: string = '';das325: string = '';das326: string = '';das327: string = '';das328: string = '';das329: string = '';das330: string = '';das331: string = '';das332: string = '';das333: string = '';das334: string = '';das335: string = '';das336: string = '';das337: string = '';das338: string = '';das339: string = '';das340: string = '';das341: string = '';das342: string = '';das343: string = '';das344: string = '';das345: string = '';das346: string = '';das347: string = '';das348: string = '';das349: string = '';das350: string = '';das351: string = '';das352: string = '';das353: string = '';das354: string = '';das355: string = '';das356: string = '';das357: string = '';das358: string = '';das359: string = '';das360: string = '';das361: string = '';das362: string = '';das363: string = '';das364: string = '';das365: string = '';
pevt1: string = '';pevt2: string = '';pevt3: string = '';pevt4: string = '';pevt5: string = '';pevt6: string = '';pevt7: string = '';pevt8: string = '';pevt9: string = '';pevt10: string = '';pevt11: string = '';pevt12: string = '';pevt13: string = '';pevt14: string = '';pevt15: string = '';pevt16: string = '';pevt17: string = '';pevt18: string = '';pevt19: string = '';pevt20: string = '';pevt21: string = '';pevt22: string = '';pevt23: string = '';pevt24: string = '';pevt25: string = '';pevt26: string = '';pevt27: string = '';pevt28: string = '';pevt29: string = '';pevt30: string = '';pevt31: string = '';pevt32: string = '';pevt33: string = '';pevt34: string = '';pevt35: string = '';pevt36: string = '';pevt37: string = '';pevt38: string = '';pevt39: string = '';pevt40: string = '';pevt41: string = '';pevt42: string = '';pevt43: string = '';pevt44: string = '';pevt45: string = '';pevt46: string = '';pevt47: string = '';pevt48: string = '';pevt49: string = '';pevt50: string = '';pevt51: string = '';pevt52: string = '';pevt53: string = '';pevt54: string = '';pevt55: string = '';pevt56: string = '';pevt57: string = '';pevt58: string = '';pevt59: string = '';pevt60: string = '';pevt61: string = '';pevt62: string = '';pevt63: string = '';pevt64: string = '';pevt65: string = '';pevt66: string = '';pevt67: string = '';pevt68: string = '';pevt69: string = '';pevt70: string = '';pevt71: string = '';pevt72: string = '';pevt73: string = '';pevt74: string = '';pevt75: string = '';pevt76: string = '';pevt77: string = '';pevt78: string = '';pevt79: string = '';pevt80: string = '';pevt81: string = '';pevt82: string = '';pevt83: string = '';pevt84: string = '';pevt85: string = '';pevt86: string = '';pevt87: string = '';pevt88: string = '';pevt89: string = '';pevt90: string = '';pevt91: string = '';pevt92: string = '';pevt93: string = '';pevt94: string = '';pevt95: string = '';pevt96: string = '';pevt97: string = '';pevt98: string = '';pevt99: string = '';pevt100: string = '';pevt101: string = '';pevt102: string = '';pevt103: string = '';pevt104: string = '';pevt105: string = '';pevt106: string = '';pevt107: string = '';pevt108: string = '';pevt109: string = '';pevt110: string = '';pevt111: string = '';pevt112: string = '';pevt113: string = '';pevt114: string = '';pevt115: string = '';pevt116: string = '';pevt117: string = '';pevt118: string = '';pevt119: string = '';pevt120: string = '';pevt121: string = '';pevt122: string = '';pevt123: string = '';pevt124: string = '';pevt125: string = '';pevt126: string = '';pevt127: string = '';pevt128: string = '';pevt129: string = '';pevt130: string = '';pevt131: string = '';pevt132: string = '';pevt133: string = '';pevt134: string = '';pevt135: string = '';pevt136: string = '';pevt137: string = '';pevt138: string = '';pevt139: string = '';pevt140: string = '';pevt141: string = '';pevt142: string = '';pevt143: string = '';pevt144: string = '';pevt145: string = '';pevt146: string = '';pevt147: string = '';pevt148: string = '';pevt149: string = '';pevt150: string = '';pevt151: string = '';pevt152: string = '';pevt153: string = '';pevt154: string = '';pevt155: string = '';pevt156: string = '';pevt157: string = '';pevt158: string = '';pevt159: string = '';pevt160: string = '';pevt161: string = '';pevt162: string = '';pevt163: string = '';pevt164: string = '';pevt165: string = '';pevt166: string = '';pevt167: string = '';pevt168: string = '';pevt169: string = '';pevt170: string = '';pevt171: string = '';pevt172: string = '';pevt173: string = '';pevt174: string = '';pevt175: string = '';pevt176: string = '';pevt177: string = '';pevt178: string = '';pevt179: string = '';pevt180: string = '';pevt181: string = '';pevt182: string = '';pevt183: string = '';pevt184: string = '';pevt185: string = '';pevt186: string = '';pevt187: string = '';pevt188: string = '';pevt189: string = '';pevt190: string = '';pevt191: string = '';pevt192: string = '';pevt193: string = '';pevt194: string = '';pevt195: string = '';pevt196: string = '';pevt197: string = '';pevt198: string = '';pevt199: string = '';pevt200: string = '';pevt201: string = '';pevt202: string = '';pevt203: string = '';pevt204: string = '';pevt205: string = '';pevt206: string = '';pevt207: string = '';pevt208: string = '';pevt209: string = '';pevt210: string = '';pevt211: string = '';pevt212: string = '';pevt213: string = '';pevt214: string = '';pevt215: string = '';pevt216: string = '';pevt217: string = '';pevt218: string = '';pevt219: string = '';pevt220: string = '';pevt221: string = '';pevt222: string = '';pevt223: string = '';pevt224: string = '';pevt225: string = '';pevt226: string = '';pevt227: string = '';pevt228: string = '';pevt229: string = '';pevt230: string = '';pevt231: string = '';pevt232: string = '';pevt233: string = '';pevt234: string = '';pevt235: string = '';pevt236: string = '';pevt237: string = '';pevt238: string = '';pevt239: string = '';pevt240: string = '';pevt241: string = '';pevt242: string = '';pevt243: string = '';pevt244: string = '';pevt245: string = '';pevt246: string = '';pevt247: string = '';pevt248: string = '';pevt249: string = '';pevt250: string = '';pevt251: string = '';pevt252: string = '';pevt253: string = '';pevt254: string = '';pevt255: string = '';pevt256: string = '';pevt257: string = '';pevt258: string = '';pevt259: string = '';pevt260: string = '';pevt261: string = '';pevt262: string = '';pevt263: string = '';pevt264: string = '';pevt265: string = '';pevt266: string = '';pevt267: string = '';pevt268: string = '';pevt269: string = '';pevt270: string = '';pevt271: string = '';pevt272: string = '';pevt273: string = '';pevt274: string = '';pevt275: string = '';pevt276: string = '';pevt277: string = '';pevt278: string = '';pevt279: string = '';pevt280: string = '';pevt281: string = '';pevt282: string = '';pevt283: string = '';pevt284: string = '';pevt285: string = '';pevt286: string = '';pevt287: string = '';pevt288: string = '';pevt289: string = '';pevt290: string = '';pevt291: string = '';pevt292: string = '';pevt293: string = '';pevt294: string = '';pevt295: string = '';pevt296: string = '';pevt297: string = '';pevt298: string = '';pevt299: string = '';pevt300: string = '';pevt301: string = '';pevt302: string = '';pevt303: string = '';pevt304: string = '';pevt305: string = '';pevt306: string = '';pevt307: string = '';pevt308: string = '';pevt309: string = '';pevt310: string = '';pevt311: string = '';pevt312: string = '';pevt313: string = '';pevt314: string = '';pevt315: string = '';pevt316: string = '';pevt317: string = '';pevt318: string = '';pevt319: string = '';pevt320: string = '';pevt321: string = '';pevt322: string = '';pevt323: string = '';pevt324: string = '';pevt325: string = '';pevt326: string = '';pevt327: string = '';pevt328: string = '';pevt329: string = '';pevt330: string = '';pevt331: string = '';pevt332: string = '';pevt333: string = '';pevt334: string = '';pevt335: string = '';pevt336: string = '';pevt337: string = '';pevt338: string = '';pevt339: string = '';pevt340: string = '';pevt341: string = '';pevt342: string = '';pevt343: string = '';pevt344: string = '';pevt345: string = '';pevt346: string = '';pevt347: string = '';pevt348: string = '';pevt349: string = '';pevt350: string = '';pevt351: string = '';pevt352: string = '';pevt353: string = '';pevt354: string = '';pevt355: string = '';pevt356: string = '';pevt357: string = '';pevt358: string = '';pevt359: string = '';pevt360: string = '';pevt361: string = '';pevt362: string = '';pevt363: string = '';pevt364: string = '';pevt365: string = '';
dt1: string = '';dt2: string = '';dt3: string = '';dt4: string = '';dt5: string = '';dt6: string = '';dt7: string = '';dt8: string = '';dt9: string = '';dt10: string = '';dt11: string = '';dt12: string = '';dt13: string = '';dt14: string = '';dt15: string = '';dt16: string = '';dt17: string = '';dt18: string = '';dt19: string = '';dt20: string = '';dt21: string = '';dt22: string = '';dt23: string = '';dt24: string = '';dt25: string = '';dt26: string = '';dt27: string = '';dt28: string = '';dt29: string = '';dt30: string = '';dt31: string = '';dt32: string = '';dt33: string = '';dt34: string = '';dt35: string = '';dt36: string = '';dt37: string = '';dt38: string = '';dt39: string = '';dt40: string = '';dt41: string = '';dt42: string = '';dt43: string = '';dt44: string = '';dt45: string = '';dt46: string = '';dt47: string = '';dt48: string = '';dt49: string = '';dt50: string = '';dt51: string = '';dt52: string = '';dt53: string = '';dt54: string = '';dt55: string = '';dt56: string = '';dt57: string = '';dt58: string = '';dt59: string = '';dt60: string = '';dt61: string = '';dt62: string = '';dt63: string = '';dt64: string = '';dt65: string = '';dt66: string = '';dt67: string = '';dt68: string = '';dt69: string = '';dt70: string = '';dt71: string = '';dt72: string = '';dt73: string = '';dt74: string = '';dt75: string = '';dt76: string = '';dt77: string = '';dt78: string = '';dt79: string = '';dt80: string = '';dt81: string = '';dt82: string = '';dt83: string = '';dt84: string = '';dt85: string = '';dt86: string = '';dt87: string = '';dt88: string = '';dt89: string = '';dt90: string = '';dt91: string = '';dt92: string = '';dt93: string = '';dt94: string = '';dt95: string = '';dt96: string = '';dt97: string = '';dt98: string = '';dt99: string = '';dt100: string = '';dt101: string = '';dt102: string = '';dt103: string = '';dt104: string = '';dt105: string = '';dt106: string = '';dt107: string = '';dt108: string = '';dt109: string = '';dt110: string = '';dt111: string = '';dt112: string = '';dt113: string = '';dt114: string = '';dt115: string = '';dt116: string = '';dt117: string = '';dt118: string = '';dt119: string = '';dt120: string = '';dt121: string = '';dt122: string = '';dt123: string = '';dt124: string = '';dt125: string = '';dt126: string = '';dt127: string = '';dt128: string = '';dt129: string = '';dt130: string = '';dt131: string = '';dt132: string = '';dt133: string = '';dt134: string = '';dt135: string = '';dt136: string = '';dt137: string = '';dt138: string = '';dt139: string = '';dt140: string = '';dt141: string = '';dt142: string = '';dt143: string = '';dt144: string = '';dt145: string = '';dt146: string = '';dt147: string = '';dt148: string = '';dt149: string = '';dt150: string = '';dt151: string = '';dt152: string = '';dt153: string = '';dt154: string = '';dt155: string = '';dt156: string = '';dt157: string = '';dt158: string = '';dt159: string = '';dt160: string = '';dt161: string = '';dt162: string = '';dt163: string = '';dt164: string = '';dt165: string = '';dt166: string = '';dt167: string = '';dt168: string = '';dt169: string = '';dt170: string = '';dt171: string = '';dt172: string = '';dt173: string = '';dt174: string = '';dt175: string = '';dt176: string = '';dt177: string = '';dt178: string = '';dt179: string = '';dt180: string = '';dt181: string = '';dt182: string = '';dt183: string = '';dt184: string = '';dt185: string = '';dt186: string = '';dt187: string = '';dt188: string = '';dt189: string = '';dt190: string = '';dt191: string = '';dt192: string = '';dt193: string = '';dt194: string = '';dt195: string = '';dt196: string = '';dt197: string = '';dt198: string = '';dt199: string = '';dt200: string = '';dt201: string = '';dt202: string = '';dt203: string = '';dt204: string = '';dt205: string = '';dt206: string = '';dt207: string = '';dt208: string = '';dt209: string = '';dt210: string = '';dt211: string = '';dt212: string = '';dt213: string = '';dt214: string = '';dt215: string = '';dt216: string = '';dt217: string = '';dt218: string = '';dt219: string = '';dt220: string = '';dt221: string = '';dt222: string = '';dt223: string = '';dt224: string = '';dt225: string = '';dt226: string = '';dt227: string = '';dt228: string = '';dt229: string = '';dt230: string = '';dt231: string = '';dt232: string = '';dt233: string = '';dt234: string = '';dt235: string = '';dt236: string = '';dt237: string = '';dt238: string = '';dt239: string = '';dt240: string = '';dt241: string = '';dt242: string = '';dt243: string = '';dt244: string = '';dt245: string = '';dt246: string = '';dt247: string = '';dt248: string = '';dt249: string = '';dt250: string = '';dt251: string = '';dt252: string = '';dt253: string = '';dt254: string = '';dt255: string = '';dt256: string = '';dt257: string = '';dt258: string = '';dt259: string = '';dt260: string = '';dt261: string = '';dt262: string = '';dt263: string = '';dt264: string = '';dt265: string = '';dt266: string = '';dt267: string = '';dt268: string = '';dt269: string = '';dt270: string = '';dt271: string = '';dt272: string = '';dt273: string = '';dt274: string = '';dt275: string = '';dt276: string = '';dt277: string = '';dt278: string = '';dt279: string = '';dt280: string = '';dt281: string = '';dt282: string = '';dt283: string = '';dt284: string = '';dt285: string = '';dt286: string = '';dt287: string = '';dt288: string = '';dt289: string = '';dt290: string = '';dt291: string = '';dt292: string = '';dt293: string = '';dt294: string = '';dt295: string = '';dt296: string = '';dt297: string = '';dt298: string = '';dt299: string = '';dt300: string = '';dt301: string = '';dt302: string = '';dt303: string = '';dt304: string = '';dt305: string = '';dt306: string = '';dt307: string = '';dt308: string = '';dt309: string = '';dt310: string = '';dt311: string = '';dt312: string = '';dt313: string = '';dt314: string = '';dt315: string = '';dt316: string = '';dt317: string = '';dt318: string = '';dt319: string = '';dt320: string = '';dt321: string = '';dt322: string = '';dt323: string = '';dt324: string = '';dt325: string = '';dt326: string = '';dt327: string = '';dt328: string = '';dt329: string = '';dt330: string = '';dt331: string = '';dt332: string = '';dt333: string = '';dt334: string = '';dt335: string = '';dt336: string = '';dt337: string = '';dt338: string = '';dt339: string = '';dt340: string = '';dt341: string = '';dt342: string = '';dt343: string = '';dt344: string = '';dt345: string = '';dt346: string = '';dt347: string = '';dt348: string = '';dt349: string = '';dt350: string = '';dt351: string = '';dt352: string = '';dt353: string = '';dt354: string = '';dt355: string = '';dt356: string = '';dt357: string = '';dt358: string = '';dt359: string = '';dt360: string = '';dt361: string = '';dt362: string = '';dt363: string = '';dt364: string = '';dt365: string = '';
str1: string = '';str2: string = '';str3: string = '';str4: string = '';str5: string = '';str6: string = '';str7: string = '';str8: string = '';str9: string = '';str10: string = '';str11: string = '';str12: string = '';str13: string = '';str14: string = '';str15: string = '';str16: string = '';str17: string = '';str18: string = '';str19: string = '';str20: string = '';str21: string = '';str22: string = '';str23: string = '';str24: string = '';str25: string = '';str26: string = '';str27: string = '';str28: string = '';str29: string = '';str30: string = '';str31: string = '';str32: string = '';str33: string = '';str34: string = '';str35: string = '';str36: string = '';str37: string = '';str38: string = '';str39: string = '';str40: string = '';str41: string = '';str42: string = '';str43: string = '';str44: string = '';str45: string = '';str46: string = '';str47: string = '';str48: string = '';str49: string = '';str50: string = '';str51: string = '';str52: string = '';str53: string = '';str54: string = '';str55: string = '';str56: string = '';str57: string = '';str58: string = '';str59: string = '';str60: string = '';str61: string = '';str62: string = '';str63: string = '';str64: string = '';str65: string = '';str66: string = '';str67: string = '';str68: string = '';str69: string = '';str70: string = '';str71: string = '';str72: string = '';str73: string = '';str74: string = '';str75: string = '';str76: string = '';str77: string = '';str78: string = '';str79: string = '';str80: string = '';str81: string = '';str82: string = '';str83: string = '';str84: string = '';str85: string = '';str86: string = '';str87: string = '';str88: string = '';str89: string = '';str90: string = '';str91: string = '';str92: string = '';str93: string = '';str94: string = '';str95: string = '';str96: string = '';str97: string = '';str98: string = '';str99: string = '';str100: string = '';str101: string = '';str102: string = '';str103: string = '';str104: string = '';str105: string = '';str106: string = '';str107: string = '';str108: string = '';str109: string = '';str110: string = '';str111: string = '';str112: string = '';str113: string = '';str114: string = '';str115: string = '';str116: string = '';str117: string = '';str118: string = '';str119: string = '';str120: string = '';str121: string = '';str122: string = '';str123: string = '';str124: string = '';str125: string = '';str126: string = '';str127: string = '';str128: string = '';str129: string = '';str130: string = '';str131: string = '';str132: string = '';str133: string = '';str134: string = '';str135: string = '';str136: string = '';str137: string = '';str138: string = '';str139: string = '';str140: string = '';str141: string = '';str142: string = '';str143: string = '';str144: string = '';str145: string = '';str146: string = '';str147: string = '';str148: string = '';str149: string = '';str150: string = '';str151: string = '';str152: string = '';str153: string = '';str154: string = '';str155: string = '';str156: string = '';str157: string = '';str158: string = '';str159: string = '';str160: string = '';str161: string = '';str162: string = '';str163: string = '';str164: string = '';str165: string = '';str166: string = '';str167: string = '';str168: string = '';str169: string = '';str170: string = '';str171: string = '';str172: string = '';str173: string = '';str174: string = '';str175: string = '';str176: string = '';str177: string = '';str178: string = '';str179: string = '';str180: string = '';str181: string = '';str182: string = '';str183: string = '';str184: string = '';str185: string = '';str186: string = '';str187: string = '';str188: string = '';str189: string = '';str190: string = '';str191: string = '';str192: string = '';str193: string = '';str194: string = '';str195: string = '';str196: string = '';str197: string = '';str198: string = '';str199: string = '';str200: string = '';str201: string = '';str202: string = '';str203: string = '';str204: string = '';str205: string = '';str206: string = '';str207: string = '';str208: string = '';str209: string = '';str210: string = '';str211: string = '';str212: string = '';str213: string = '';str214: string = '';str215: string = '';str216: string = '';str217: string = '';str218: string = '';str219: string = '';str220: string = '';str221: string = '';str222: string = '';str223: string = '';str224: string = '';str225: string = '';str226: string = '';str227: string = '';str228: string = '';str229: string = '';str230: string = '';str231: string = '';str232: string = '';str233: string = '';str234: string = '';str235: string = '';str236: string = '';str237: string = '';str238: string = '';str239: string = '';str240: string = '';str241: string = '';str242: string = '';str243: string = '';str244: string = '';str245: string = '';str246: string = '';str247: string = '';str248: string = '';str249: string = '';str250: string = '';str251: string = '';str252: string = '';str253: string = '';str254: string = '';str255: string = '';str256: string = '';str257: string = '';str258: string = '';str259: string = '';str260: string = '';str261: string = '';str262: string = '';str263: string = '';str264: string = '';str265: string = '';str266: string = '';str267: string = '';str268: string = '';str269: string = '';str270: string = '';str271: string = '';str272: string = '';str273: string = '';str274: string = '';str275: string = '';str276: string = '';str277: string = '';str278: string = '';str279: string = '';str280: string = '';str281: string = '';str282: string = '';str283: string = '';str284: string = '';str285: string = '';str286: string = '';str287: string = '';str288: string = '';str289: string = '';str290: string = '';str291: string = '';str292: string = '';str293: string = '';str294: string = '';str295: string = '';str296: string = '';str297: string = '';str298: string = '';str299: string = '';str300: string = '';str301: string = '';str302: string = '';str303: string = '';str304: string = '';str305: string = '';str306: string = '';str307: string = '';str308: string = '';str309: string = '';str310: string = '';str311: string = '';str312: string = '';str313: string = '';str314: string = '';str315: string = '';str316: string = '';str317: string = '';str318: string = '';str319: string = '';str320: string = '';str321: string = '';str322: string = '';str323: string = '';str324: string = '';str325: string = '';str326: string = '';str327: string = '';str328: string = '';str329: string = '';str330: string = '';str331: string = '';str332: string = '';str333: string = '';str334: string = '';str335: string = '';str336: string = '';str337: string = '';str338: string = '';str339: string = '';str340: string = '';str341: string = '';str342: string = '';str343: string = '';str344: string = '';str345: string = '';str346: string = '';str347: string = '';str348: string = '';str349: string = '';str350: string = '';str351: string = '';str352: string = '';str353: string = '';str354: string = '';str355: string = '';str356: string = '';str357: string = '';str358: string = '';str359: string = '';str360: string = '';str361: string = '';str362: string = '';str363: string = '';str364: string = '';str365: string = '';
strL1: string = '';strL2: string = '';strL3: string = '';strL4: string = '';strL5: string = '';strL6: string = '';strL7: string = '';strL8: string = '';strL9: string = '';strL10: string = '';strL11: string = '';strL12: string = '';strL13: string = '';strL14: string = '';strL15: string = '';strL16: string = '';strL17: string = '';strL18: string = '';strL19: string = '';strL20: string = '';strL21: string = '';strL22: string = '';strL23: string = '';strL24: string = '';strL25: string = '';strL26: string = '';strL27: string = '';strL28: string = '';strL29: string = '';strL30: string = '';strL31: string = '';strL32: string = '';strL33: string = '';strL34: string = '';strL35: string = '';strL36: string = '';strL37: string = '';strL38: string = '';strL39: string = '';strL40: string = '';strL41: string = '';strL42: string = '';strL43: string = '';strL44: string = '';strL45: string = '';strL46: string = '';strL47: string = '';strL48: string = '';strL49: string = '';strL50: string = '';strL51: string = '';strL52: string = '';strL53: string = '';strL54: string = '';strL55: string = '';strL56: string = '';strL57: string = '';strL58: string = '';strL59: string = '';strL60: string = '';strL61: string = '';strL62: string = '';strL63: string = '';strL64: string = '';strL65: string = '';strL66: string = '';strL67: string = '';strL68: string = '';strL69: string = '';strL70: string = '';strL71: string = '';strL72: string = '';strL73: string = '';strL74: string = '';strL75: string = '';strL76: string = '';strL77: string = '';strL78: string = '';strL79: string = '';strL80: string = '';strL81: string = '';strL82: string = '';strL83: string = '';strL84: string = '';strL85: string = '';strL86: string = '';strL87: string = '';strL88: string = '';strL89: string = '';strL90: string = '';strL91: string = '';strL92: string = '';strL93: string = '';strL94: string = '';strL95: string = '';strL96: string = '';strL97: string = '';strL98: string = '';strL99: string = '';strL100: string = '';strL101: string = '';strL102: string = '';strL103: string = '';strL104: string = '';strL105: string = '';strL106: string = '';strL107: string = '';strL108: string = '';strL109: string = '';strL110: string = '';strL111: string = '';strL112: string = '';strL113: string = '';strL114: string = '';strL115: string = '';strL116: string = '';strL117: string = '';strL118: string = '';strL119: string = '';strL120: string = '';strL121: string = '';strL122: string = '';strL123: string = '';strL124: string = '';strL125: string = '';strL126: string = '';strL127: string = '';strL128: string = '';strL129: string = '';strL130: string = '';strL131: string = '';strL132: string = '';strL133: string = '';strL134: string = '';strL135: string = '';strL136: string = '';strL137: string = '';strL138: string = '';strL139: string = '';strL140: string = '';strL141: string = '';strL142: string = '';strL143: string = '';strL144: string = '';strL145: string = '';strL146: string = '';strL147: string = '';strL148: string = '';strL149: string = '';strL150: string = '';strL151: string = '';strL152: string = '';strL153: string = '';strL154: string = '';strL155: string = '';strL156: string = '';strL157: string = '';strL158: string = '';strL159: string = '';strL160: string = '';strL161: string = '';strL162: string = '';strL163: string = '';strL164: string = '';strL165: string = '';strL166: string = '';strL167: string = '';strL168: string = '';strL169: string = '';strL170: string = '';strL171: string = '';strL172: string = '';strL173: string = '';strL174: string = '';strL175: string = '';strL176: string = '';strL177: string = '';strL178: string = '';strL179: string = '';strL180: string = '';strL181: string = '';strL182: string = '';strL183: string = '';strL184: string = '';strL185: string = '';strL186: string = '';strL187: string = '';strL188: string = '';strL189: string = '';strL190: string = '';strL191: string = '';strL192: string = '';strL193: string = '';strL194: string = '';strL195: string = '';strL196: string = '';strL197: string = '';strL198: string = '';strL199: string = '';strL200: string = '';strL201: string = '';strL202: string = '';strL203: string = '';strL204: string = '';strL205: string = '';strL206: string = '';strL207: string = '';strL208: string = '';strL209: string = '';strL210: string = '';strL211: string = '';strL212: string = '';strL213: string = '';strL214: string = '';strL215: string = '';strL216: string = '';strL217: string = '';strL218: string = '';strL219: string = '';strL220: string = '';strL221: string = '';strL222: string = '';strL223: string = '';strL224: string = '';strL225: string = '';strL226: string = '';strL227: string = '';strL228: string = '';strL229: string = '';strL230: string = '';strL231: string = '';strL232: string = '';strL233: string = '';strL234: string = '';strL235: string = '';strL236: string = '';strL237: string = '';strL238: string = '';strL239: string = '';strL240: string = '';strL241: string = '';strL242: string = '';strL243: string = '';strL244: string = '';strL245: string = '';strL246: string = '';strL247: string = '';strL248: string = '';strL249: string = '';strL250: string = '';strL251: string = '';strL252: string = '';strL253: string = '';strL254: string = '';strL255: string = '';strL256: string = '';strL257: string = '';strL258: string = '';strL259: string = '';strL260: string = '';strL261: string = '';strL262: string = '';strL263: string = '';strL264: string = '';strL265: string = '';strL266: string = '';strL267: string = '';strL268: string = '';strL269: string = '';strL270: string = '';strL271: string = '';strL272: string = '';strL273: string = '';strL274: string = '';strL275: string = '';strL276: string = '';strL277: string = '';strL278: string = '';strL279: string = '';strL280: string = '';strL281: string = '';strL282: string = '';strL283: string = '';strL284: string = '';strL285: string = '';strL286: string = '';strL287: string = '';strL288: string = '';strL289: string = '';strL290: string = '';strL291: string = '';strL292: string = '';strL293: string = '';strL294: string = '';strL295: string = '';strL296: string = '';strL297: string = '';strL298: string = '';strL299: string = '';strL300: string = '';strL301: string = '';strL302: string = '';strL303: string = '';strL304: string = '';strL305: string = '';strL306: string = '';strL307: string = '';strL308: string = '';strL309: string = '';strL310: string = '';strL311: string = '';strL312: string = '';strL313: string = '';strL314: string = '';strL315: string = '';strL316: string = '';strL317: string = '';strL318: string = '';strL319: string = '';strL320: string = '';strL321: string = '';strL322: string = '';strL323: string = '';strL324: string = '';strL325: string = '';strL326: string = '';strL327: string = '';strL328: string = '';strL329: string = '';strL330: string = '';strL331: string = '';strL332: string = '';strL333: string = '';strL334: string = '';strL335: string = '';strL336: string = '';strL337: string = '';strL338: string = '';strL339: string = '';strL340: string = '';strL341: string = '';strL342: string = '';strL343: string = '';strL344: string = '';strL345: string = '';strL346: string = '';strL347: string = '';strL348: string = '';strL349: string = '';strL350: string = '';strL351: string = '';strL352: string = '';strL353: string = '';strL354: string = '';strL355: string = '';strL356: string = '';strL357: string = '';strL358: string = '';strL359: string = '';strL360: string = '';strL361: string = '';strL362: string = '';strL363: string = '';strL364: string = '';strL365: string = '';
	oPlanet :PlanetPos[] = [];
	oHouse: HousePos[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, public shareService: ShareService,  public horoService: HoroscopeService) {
  this.oPlanet = navParams.get('oplanet');
  this.oHouse = navParams.get('ohou');
platform.ready().then((readySource) => {
		console.log('Width: ' + platform.width());
		//this.device_width = platform.width();
		console.log('Height: ' + platform.height());
		//this.device_height = platform.height();
 //PREDICTIONS
	  this.horoService.getDashaTransits(this.shareService.getVIM())
       .subscribe(res => {
	   this.publishReport(res);
      }, (err) => {
      }) ;	   
	});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PredictionsPage');
  }
  
  publishReport(stars: any)
  {
	let cur_sssl: string = '';
	let cur_trans_l: string = '';
	let cur_star: string = '';
	let cur_mdas: string = '';
	let cur_adas: string = '';
	let cur_pdas: string = '';
	let cur_pend: any = null;
	for(var i = 0; i < Object.keys(stars).length; i++) {
	  var vim;
	  var c_dt = (stars[i].date.indexOf(',') != -1) ? stars[i].date.split(',')[0] : stars[i].date;
	  var utc_d = c_dt.split('-')[2] + '-' + c_dt.split('-')[1] + '-' + c_dt.split('-')[0] + 'T' + '00:00:00Z';
	  var cDt = new Date(utc_d);
	  if(cur_pend == null || cDt > cur_pend) {
		vim = this.getVimDasha(cDt);
		cur_mdas = vim.split('|')[0];
		cur_adas = vim.split('|')[1];
		cur_pdas = vim.split('|')[2];
		cur_pend = new Date(vim.split('|')[3]);
	  
		this['das' + (i+1).toString()] = '<span>Main Dasa: </span><span>' + cur_mdas + '</span><span> Antar Dasa: </span><span>' + cur_adas + '</span><span> Pratyantar Dasa: </span><span>' + cur_pdas + '</span>';
	  }
	  this['dt' + (i+1).toString()] = '<span>' + stars[i].date + '</span>';
	  this['strL' + (i+1).toString()] = '<span>' + this.translate(stars[i].signL) + '-' + this.translate(stars[i].starL) + '-' + this.translate(stars[i].subL) + '</span>';
	  this['str' + (i+1).toString()] = '<span>' + this.translate(stars[i].star) + '</span>';
	  if(stars[i].date.indexOf(',') != -1) {
		//there is a planet transiting on this day
		var pl = stars[i].date.split(',')[1].split(' ')[1];
		var sssl = stars[i].signL + '-' + stars[i].starL + '-' + stars[i].subL;
		if(ruler_name[pl.toLowerCase()] == cur_trans_l &&  sssl == cur_sssl && stars[i].star == cur_star) {
			this['pevt' + (i+1).toString()] = '<span>' + this.translate(ruler_name[pl.toLowerCase()]) + ' transit continues..' + '</span>';
			continue;
		}
		console.log('Transiting planet=' + pl);
		var star = stars[i].star;
		console.log(star);
		var nak = nakshatra_order[star];
		var const_lord = nak.ruler;
		let mins: number = 0;
		var pos = stars[i].date.split(',')[1].split(' ')[0];
		if(pos.indexOf('.') > -1 && pos.split('.')[1] != '')
		  mins = (signs_pos[stars[i].sign.toLowerCase()] + parseInt(pos.split('.')[0], 10))*60 + parseInt(pos.split('.')[1], 10);
		else
		  mins = (signs_pos[stars[i].sign.toLowerCase()] + parseInt(pos.split('.')[0], 10))*60;
		let asp_lord: string = '';
		let cnj_lord: string = '';
		let node_c_lord: string = '';
		let node_s_lord: string = '';
		if(const_lord == 'rahu' || const_lord == 'ketu') {	//rahu/ketu acts as agents to the lords who are conjoined, aspected, const lord, sign lord predominantly
			
			var plPos = this.shareService.getPLPOS();
			let brahu_res: boolean = false;
			let bketu_res: boolean = false;
			let node_sign: string = '';
			for(let key of Object.keys(signs)) {
				if(signs[key] == 'na') continue;
				var sign = signs[key];
					if (plPos.hasOwnProperty(sign)) {
					    let p_con: string = '';
					    let brahu: boolean = false;
						let bketu: boolean = false;
						var pls = plPos[sign].split('\|');
						for (var k = 0; k < pls.length; k++) {
							if(const_lord == 'rahu' && pls.split(' ')[1].toLowerCase() == 'ra') {
								brahu = true;
								node_sign = sign;
							} else if(const_lord == 'ketu' && pls.split(' ')[1].toLowerCase() == 'ke'){
								bketu = true;
								node_sign = sign;
							} else {
							   p_con += pls.split(' ')[1].toLowerCase() + ',';
							}
						}
						if(const_lord == 'rahu' && brahu && p_con != '') {  //a planet conjoined with rahu
						    cnj_lord = ruler_name[p_con.split(',')[0].toLowerCase()];
							brahu_res = true;
							break;
						}
						else if(const_lord == 'ketu' && bketu && p_con != '') {  //a planet conjoined with ketu
						    cnj_lord = ruler_name[p_con.split(',')[0].toLowerCase()];
							bketu_res = true;
							break;
						}
					}
			}
			if(const_lord == 'rahu' && brahu_res == false) { //no planet conjoined with rahu
				var a_ls = this.check_aspects(node_sign.toLowerCase());
				asp_lord = ruler_name[a_ls.split(';')[0].split('|')[1].toLowerCase()];
				if(asp_lord != '') brahu_res = true;
			}
			else if(const_lord == 'ketu' && bketu_res == false) { //no planet conjoined with ketu
				var a_ls = this.check_aspects(node_sign.toLowerCase());
				asp_lord = ruler_name[a_ls.split(';')[0].split('|')[1].toLowerCase()];
				if(asp_lord != '') bketu_res = true;
			}
			if(const_lord == 'rahu' && brahu_res == false) { //no planet is aspecting rahu
				node_s_lord = this.oPlanet[const_lord].sign;
				node_c_lord = this.oPlanet[const_lord].star;
			}
			else if(const_lord == 'ketu' && bketu_res == false) { //no planet is aspecting ketu
				node_s_lord = this.oPlanet[const_lord].sign;
				node_c_lord = this.oPlanet[const_lord].star;
			}
		}
		var t_lord_h  = this.get_own_houses(ruler_name[pl.toLowerCase()].toLowerCase());
		console.log('calling get_sub_neg const lord houses=' + t_lord_h.toString() + ' const lord lif evts=' + this.oPlanet[const_lord].lif_e);
        var sub_neg = this.get_sub_neg(t_lord_h, this.oPlanet[const_lord].lif_e);
		console.log('sublord contradicts ' + sub_neg);
		var desc = ruler_name[pl.toLowerCase()] + ' the lord of ' + t_lord_h.toString() + ' house(s).'
		let inds: string = '';
		if(const_lord == 'rahu' || const_lord == 'ketu') {
			if(cnj_lord != '') {
				desc += ' Conjoined by ' + cnj_lord
				t_lord_h  = this.get_own_houses(cnj_lord);
				inds = this.get_indicators(cnj_lord.toLowerCase(), t_lord_h.toString());
			} else if(asp_lord != '') {
				desc += ' Aspected by ' + asp_lord
				t_lord_h  = this.get_own_houses(asp_lord);
				inds = this.get_indicators(asp_lord.toLowerCase(), t_lord_h.toString());
			} else {
			   desc += ' Which is in the house owned by ' + node_s_lord;
				t_lord_h  = this.get_own_houses(node_s_lord);
				inds = this.get_indicators(node_s_lord.toLowerCase(), t_lord_h.toString());
			}
		} else {
			inds = this.get_indicators(ruler_name[pl.toLowerCase()].toLowerCase(),t_lord_h.toString());
		}
		desc += ' which indicates ' + inds +  ' ' + this.translate(ruler_name[pl.toLowerCase()]) + ' transits in star ' + this.translate(star) + '. Lord of this star is ' + this.translate(const_lord) + ' ';		
		desc += 'who is the significator of ' + this.oPlanet[const_lord].sig + ' houses gets fulfilled through one of indicators above.';
		desc += (this.oPlanet[const_lord].lif_e != '') ?  ' Based on placement of ' + this.translate(const_lord) + ' in your horoscope causes ' + this.oPlanet[const_lord].lif_e : '';
		desc += (sub_neg != '') ?  ' However the subloard ' + this.translate(stars[i].subL) + ' of this transit contradicts ' + this.translate(sub_neg) : '';
		this['pevt' + (i+1).toString()] = '<span>' + desc + '</span>';
		cur_trans_l = ruler_name[pl.toLowerCase()];
	     cur_sssl = stars[i].signL + '-' + stars[i].starL + '-' + stars[i].subL;
		 cur_star = stars[i].star;
		
	  }
	 }
	}
	translate(lord: string)
	{
	  if(this.shareService.getLANG().toLowerCase() == 'en') return lord;
	  let trn: string = '';
		switch(lord.toLowerCase())
		{
			case 'sun':
			case 'su':
				if(this.shareService.getLANG() == 'te') {
					trn = 'సూర్యుడు';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'रवि ग्रह';
				}
				break;
			case 'moon':
			case 'mo':
				if(this.shareService.getLANG() == 'te') {
					trn = 'చంద్రుడు';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'चांद ग्रह';
				}
				break;
			case 'jupiter':
			case 'ju':
				if(this.shareService.getLANG() == 'te') {
					trn = 'బృహస్పతి';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'बृहस्पति';
				}
				break;
			case 'mercury':
			case 'me':
				if(this.shareService.getLANG() == 'te') {
					trn = 'బుధుడు';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'बुध गृह';
				}
				break;
			case 'mars':
			case 'ma':
				if(this.shareService.getLANG() == 'te') {
					trn = 'కుజుడు';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'मंगल ग्रह';
				}
				break;
			case 'venus':
			case 've':
				if(this.shareService.getLANG() == 'te') {
					trn = 'శుక్రుడు';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'शुक्र ग्रह';
				}
				break;
			case 'saturn':
			case 'sa':
				if(this.shareService.getLANG() == 'te') {
					trn = 'శనిగ్రహము';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'शनि ग्रह';
				}
				break;
			case 'rahu':
			case 'ra':
				if(this.shareService.getLANG() == 'te') {
					trn = 'రాహు';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'राहु ग्रह';
				}
				break;
			case 'ketu':
			case 'ke':
				if(this.shareService.getLANG() == 'te') {
					trn = 'కేతు';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'केतु ग्रह';
				}
				break;
			case 'aries':
				if(this.shareService.getLANG() == 'te') {
					trn = 'మేషరాశి';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'मेष राशि';
				}
				break;
			case 'taurus':
				if(this.shareService.getLANG() == 'te') {
					trn = 'వృషభరాశి';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'वृषभ राशि';
				}
				break;
			case 'gemini':
				if(this.shareService.getLANG() == 'te') {
					trn = 'మిధునరాశి';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'मिथुन राशि';
				}
				break;
			case 'cancer':
				if(this.shareService.getLANG() == 'te') {
					trn = 'కర్కాటకరాశి';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'कर्क राशि';
				}
				break;
			case 'leo':
				if(this.shareService.getLANG() == 'te') {
					trn = 'సిమ్హరాశి';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'सिंह राशि';
				}
				break;
			case 'virgo':
				if(this.shareService.getLANG() == 'te') {
					trn = 'కన్యరాశి';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'कन्या राशि';
				}
				break;
			case 'libra':
				if(this.shareService.getLANG() == 'te') {
					trn = 'తులారాసి';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'तुला राशि';
				}
				break;
			case 'scorpio':
				if(this.shareService.getLANG() == 'te') {
					trn = 'వృశ్చికరాసి';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'वृश्चिक राशि';
				}
				break;
			case 'saggitarius':
				if(this.shareService.getLANG() == 'te') {
					trn = 'ధనుస్సురాసి';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'धनु राशि';
				}
				break;
			case 'capricorn':
				if(this.shareService.getLANG() == 'te') {
					trn = 'మకరరాసి';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'मकर राशि';
				}
				break;
			case 'aquarius':
				if(this.shareService.getLANG() == 'te') {
					trn = 'కుంభరాసి';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'कुंभ राशि';
				}
				break;
			case 'pisces':
				if(this.shareService.getLANG() == 'te') {
					trn = 'మీనరాసి';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'मीन राशि';
				}
				break;
			case 'ashwini':
				if(this.shareService.getLANG() == 'te') {
					trn = 'అశ్వినీ';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'अश्विनी';
				}
				break;
			case 'bharani':
				if(this.shareService.getLANG() == 'te') {
					trn = 'భరణి';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'भरणी';
				}
				break;
			case 'krittika':
				if(this.shareService.getLANG() == 'te') {
					trn = 'కృత్తికా';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'कृत्तिका';
				}
				break;
			case 'rohini':
				if(this.shareService.getLANG() == 'te') {
					trn = 'రోహిణి';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'रोहिणी';
				}
				break;
			case 'mrigashira':
				if(this.shareService.getLANG() == 'te') {
					trn = 'మ్రిగశిర';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'मृगशिरा';
				}
				break;
			case 'ardra':
				if(this.shareService.getLANG() == 'te') {
					trn = 'ఆర్ద్ర';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'आर्द्र';
				}
				break;
			case 'ardra':
				if(this.shareService.getLANG() == 'te') {
					trn = 'ఆర్ద్ర';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'आर्द्र';
				}
				break;
			case 'punarvasu':
				if(this.shareService.getLANG() == 'te') {
					trn = 'పునర్వసు';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'पुनर्वसु';
				}
				break;
			case 'pushya':
				if(this.shareService.getLANG() == 'te') {
					trn = 'పుష్య';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'पुष्य';
				}
				break;
			case 'ashlesha':
				if(this.shareService.getLANG() == 'te') {
					trn = 'ఆశ్లేష';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'अश्लेषा';
				}
				break;
			case 'magha':
				if(this.shareService.getLANG() == 'te') {
					trn = 'మఘ';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'मघा';
				}
				break;
			case 'purvaphalguni':
				if(this.shareService.getLANG() == 'te') {
					trn = 'పూర్వఫల్గుణి';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'पूर्वाफाल्गुनी';
				}
				break;
			case 'uttaraaphalguni':
				if(this.shareService.getLANG() == 'te') {
					trn = 'ఉత్తరాఫల్గుణి';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'उत्तराफाल्गुनी';
				}
				break;
			case 'hastha':
				if(this.shareService.getLANG() == 'te') {
					trn = 'హస్త';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'हस्ता';
				}
				break;
			case 'chitra':
				if(this.shareService.getLANG() == 'te') {
					trn = 'చిత్ర';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'चित्र';
				}
				break;
			case 'swati':
				if(this.shareService.getLANG() == 'te') {
					trn = 'స్వాతి';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'स्वाति';
				}
				break;
			case 'vishakha':
				if(this.shareService.getLANG() == 'te') {
					trn = 'విశాఖ';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'विशाखा';
				}
				break;
			case 'anuradha':
				if(this.shareService.getLANG() == 'te') {
					trn = 'అనురాధ';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'अनुराधा';
				}
				break;
			case 'jyestha':
				if(this.shareService.getLANG() == 'te') {
					trn = 'జ్యేష్ఠా';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'जयस्था';
				}
				break;
			case 'mula':
				if(this.shareService.getLANG() == 'te') {
					trn = 'మూల';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'मूल';
				}
				break;
			case 'purvaashada':
				if(this.shareService.getLANG() == 'te') {
					trn = 'పూర్వాషాఢ';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'पूर्वाषाढ़ा';
				}
				break;
			case 'uttaraashada':
				if(this.shareService.getLANG() == 'te') {
					trn = 'ఉత్తరాషాఢ';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'उत्तराषाढ़ा';
				}
				break;
			case 'shravana':
				if(this.shareService.getLANG() == 'te') {
					trn = 'శ్రావణ';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'श्रवण';
				}
				break;
			case 'danishta':
				if(this.shareService.getLANG() == 'te') {
					trn = 'ధనిష్ఠ';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'धनिष्ठा';
				}
				break;
			case 'shatabhisha':
				if(this.shareService.getLANG() == 'te') {
					trn = 'శతభిషా';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'शतभिषा';
				}
				break;
			case 'purvabhadra':
				if(this.shareService.getLANG() == 'te') {
					trn = 'పూర్వాభాద్ర';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'पूर्वभाद्र';
				}
				break;
			case 'uttarabhadra':
				if(this.shareService.getLANG() == 'te') {
					trn = 'ఉత్తరాభాద్ర';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'उत्तरभाद्र';
				}
				break;
			case 'revati':
				if(this.shareService.getLANG() == 'te') {
					trn = 'రేవతి';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'रेवती';
				}
				break;
			default:
				trn = lord;
				break;
		}
		return trn;
	}
	get_sub_neg(t_h: string, lif_e: string)
	{
	  let sub_n: string = '';
	  let lifs: string[] = lif_e.split(';');
	  for(var i = 0; i < lifs.length; i++) {
	    if(lifs[i] == '') continue;
		let hgs: string = lifs[i].split('|')[0];
		let ths: string[] = t_h.split(',');
		for(var j = 0; j < ths.length; j++) {
			if(Number(hgs.split('-')[0]) == Number(ths[j])) sub_n += lifs[i].split('|')[1];
		}
	  }
	  return sub_n;
	}
 	check_aspects(sign) {
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
			chk_asp += '7|' + seven_asp + ';';//'<span><strong> 7th aspect from ' + seven_asp + '. </strong></span>';
		}
		if (five_asp.length > 0) {
			chk_asp += '5|' + five_asp + ';';//'<span><strong> 5th aspect from ' + five_asp + '. </strong></span>';
		}
		if (nine_asp.length > 0) {
			chk_asp += '9|' + nine_asp + ';';//'<span><strong> 9th aspect from ' + nine_asp + '. </strong></span>';
		}
		if (three_asp.length > 0) {
			chk_asp += '3|' + three_asp + ';';//'<span><strong> 3rd aspect from ' + three_asp + '. </strong></span>';
		}
		if (ten_asp.length > 0) {
			chk_asp += '10|' + ten_asp + ';';//'<span><strong> 10th aspect from ' + ten_asp + '. </strong></span>';
		}
		return chk_asp;
	}
	
	get_indicators(lord: string, houses: string)
	{
		let ind: string = '';
		let das :any = '';
		if(lord == "venus") das = venus;
		else if(lord == "sun") das = sun;
		else if(lord == "moon") das = moon;
		else if(lord == "mars") das = mars;
		else if(lord == "jupiter") das = jupiter;
		else if(lord == "saturn") das = saturn;
		else if(lord == "mercury") das = mercury;
		//else if(lord == "rahu" || lord == "ketu") {   //in case rahu/ketu need to consider the lord conjoined or aspecting or sign lord or constellation lord
			//das = ketu;
		//}
        var hou = houses.split(',');		
		for(var h=0; h < hou.length; h++) {
			if(hou[h].trim() == '') continue;
			ind += das[hou[h].trim()] + ',';
		}
		return ind;
	}
	get_own_houses(lord: string)
	{
	  let hno: string = '';
	  for(var i = 0; i < Object.keys(this.oHouse).length; i++) {
	    if(this.oHouse[i+1].sign == lord) hno += (i+1).toString() + ',';
	  }
	  return hno;
	}	
	getVimDasha(dt: any)
	{
		var vim = this.shareService.getVIM();
		for(let key of Object.keys(vim)) {
			var frm_d = vim[key].split('|')[0];
			var utc_frm_d = frm_d.split('-')[2] + '-' + frm_d.split('-')[1] + '-' + frm_d.split('-')[0] + 'T' + '00:00:00Z';
			var dtFrm = new Date(utc_frm_d);
			var to_d = vim[key].split('|')[1];
			var utc_to_d = to_d.split('-')[2] + '-' + to_d.split('-')[1] + '-' + to_d.split('-')[0] + 'T' + '00:00:00Z';
			var dtTo = new Date(utc_to_d);
			if(dt >= dtFrm && dt <= dtTo) {
			  return vim[key].mdas + '|' + vim[key].adas + '|' + vim[key].pdas + '|' + utc_to_d;
			}
		}
	}
}
