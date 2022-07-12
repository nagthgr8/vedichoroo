import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
const routes: Routes = [

  {
    path: 'horoscope',
    loadChildren: () => import('./horoscope/horoscope.module').then( m => m.HoroscopePageModule)
  },
  {
    path: 'personal-details',
    loadChildren: () => import('./personal-details/personal-details.module').then( m => m.PersonalDetailsPageModule)
  },
  {
    path: 'star-const',
    loadChildren: () => import('./star-const/star-const.module').then( m => m.StarConstPageModule)
  },
  {
    path: 'kp-astro',
    loadChildren: () => import('./kp-astro/kp-astro.module').then( m => m.KpAstroPageModule)
  },
  {
    path: 'daily-forecast',
    loadChildren: () => import('./daily-forecast/daily-forecast.module').then( m => m.DailyForecastPageModule)
  },
  {
    path: 'careerhoro',
    loadChildren: () => import('./careerhoro/careerhoro.module').then( m => m.CareerhoroPageModule)
  },
  {
    path: 'transit-predictions',
    loadChildren: () => import('./transit-predictions/transit-predictions.module').then( m => m.TransitPredictionsPageModule)
  },
  {
    path: 'yoga-info',
    loadChildren: () => import('./yoga-info/yoga-info.module').then( m => m.YogaInfoPageModule)
  },
  {
    path: 'divcharts',
    loadChildren: () => import('./divcharts/divcharts.module').then( m => m.DivchartsPageModule)
  },
  {
    path: 'subscribe',
    loadChildren: () => import('./subscribe/subscribe.module').then( m => m.SubscribePageModule)
  },
  {
    path: 'credits',
    loadChildren: () => import('./credits/credits.module').then( m => m.CreditsPageModule)
  },
  {
    path: 'btr-info',
    loadChildren: () => import('./btr-info/btr-info.module').then( m => m.BtrInfoPageModule)
  },
  {
    path: 'house-info',
    loadChildren: () => import('./house-info/house-info.module').then( m => m.HouseInfoPageModule)
  },
  {
    path: 'chart-settings',
    loadChildren: () => import('./chart-settings/chart-settings.module').then( m => m.ChartSettingsPageModule)
  },
  {
    path: 'shad-bala',
    loadChildren: () => import('./shad-bala/shad-bala.module').then( m => m.ShadBalaPageModule)
  },
  {
    path: 'astakvarga',
    loadChildren: () => import('./astakvarga/astakvarga.module').then( m => m.AstakvargaPageModule)
  },
  {
    path: 'astrologer',
    loadChildren: () => import('./astrologer/astrologer.module').then( m => m.AstrologerPageModule)
  },
  {
    path: 'astrologers',
    loadChildren: () => import('./astrologers/astrologers.module').then( m => m.AstrologersPageModule)
  },
  {
    path: 'about-app',
    loadChildren: () => import('./about-app/about-app.module').then( m => m.AboutAppPageModule)
  },
  {
    path: 'article',
    loadChildren: () => import('./article/article.module').then( m => m.ArticlePageModule)
  },
  {
    path: 'chart-analysis',
    loadChildren: () => import('./chart-analysis/chart-analysis.module').then( m => m.ChartAnalysisPageModule)
  },
  {
    path: 'help-desk',
    loadChildren: () => import('./help-desk/help-desk.module').then( m => m.HelpDeskPageModule)
  },
  {
    path: 'marriage-horo',
    loadChildren: () => import('./marriage-horo/marriage-horo.module').then( m => m.MarriageHoroPageModule)
  },
  {
    path: 'mypubz-resp',
    loadChildren: () => import('./mypubz-resp/mypubz-resp.module').then( m => m.MypubzRespPageModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./notifications/notifications.module').then( m => m.NotificationsPageModule)
  },
  {
    path: 'panchang',
    loadChildren: () => import('./panchang/panchang.module').then( m => m.PanchangPageModule)
  },
  {
    path: 'prashna-jyotish',
    loadChildren: () => import('./prashna-jyotish/prashna-jyotish.module').then( m => m.PrashnaJyotishPageModule)
  },
  {
    path: 'privacy',
    loadChildren: () => import('./privacy/privacy.module').then( m => m.PrivacyPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'publish-blog',
    loadChildren: () => import('./publish-blog/publish-blog.module').then( m => m.PublishBlogPageModule)
  },
  {
    path: 'stories',
    loadChildren: () => import('./stories/stories.module').then( m => m.StoriesPageModule)
  },
  {
    path: 'rajayoga',
    loadChildren: () => import('./rajayoga/rajayoga.module').then( m => m.RajayogaPageModule)
  },
  {
    path: 'moneyhoro',
    loadChildren: () => import('./moneyhoro/moneyhoro.module').then( m => m.MoneyhoroPageModule)
  },
  {
    path: 'dash-trans',
    loadChildren: () => import('./dash-trans/dash-trans.module').then( m => m.DashTransPageModule)
  },
  {
    path: 'planet-sig',
    loadChildren: () => import('./planet-sig/planet-sig.module').then( m => m.PlanetSigPageModule)
  },
  {
    path: 'lif-event',
    loadChildren: () => import('./lif-event/lif-event.module').then( m => m.LifEventPageModule)
  },
  {
    path: 'hindu-cal',
    loadChildren: () => import('./hindu-cal/hindu-cal.module').then( m => m.HinduCalPageModule)
  },
  {
    path: 'kp-event',
    loadChildren: () => import('./kp-event/kp-event.module').then( m => m.KpEventPageModule)
  },
  {
    path: 'reports',
    loadChildren: () => import('./reports/reports.module').then( m => m.ReportsPageModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('./orders/orders.module').then( m => m.OrdersPageModule)
  },
  {
    path: 'order-detail',
    loadChildren: () => import('./order-detail/order-detail.module').then( m => m.OrderDetailPageModule)
  },
  {
    path: 'ask-question',
    loadChildren: () => import('./ask-question/ask-question.module').then( m => m.AskQuestionPageModule)
  },
  {
    path: 'nak-info',
    loadChildren: () => import('./nak-info/nak-info.module').then( m => m.NakInfoPageModule)
  },
  {
    path: 'dosha-info',
    loadChildren: () => import('./dosha-info/dosha-info.module').then( m => m.DoshaInfoPageModule)
  },
  {
    path: 'btr',
    loadChildren: () => import('./btr/btr.module').then( m => m.BtrPageModule)
  },
  {
    path: 'btr-details',
    loadChildren: () => import('./btr-details/btr-details.module').then( m => m.BtrDetailsPageModule)
  },
  {
    path: 'btr-report',
    loadChildren: () => import('./btr-report/btr-report.module').then( m => m.BtrReportPageModule)
  },
  {
    path: 'btr-detail-rel',
    loadChildren: () => import('./btr-detail-rel/btr-detail-rel.module').then( m => m.BtrDetailRelPageModule)
  },
  {
    path: 'reg-ast',
    loadChildren: () => import('./reg-ast/reg-ast.module').then( m => m.RegAstPageModule)
  },
  {
    path: 'pujalist',
    loadChildren: () => import('./pujalist/pujalist.module').then( m => m.PujalistPageModule)
  },
  {
    path: 'puja-booking',
    loadChildren: () => import('./puja-booking/puja-booking.module').then( m => m.PujaBookingPageModule)
  },
  {
    path: 'tickets',
    loadChildren: () => import('./tickets/tickets.module').then( m => m.TicketsPageModule)
  },
  {
    path: 'ticket-detail',
    loadChildren: () => import('./ticket-detail/ticket-detail.module').then( m => m.TicketDetailPageModule)
  },
  {
    path: 'ratings',
    loadChildren: () => import('./ratings/ratings.module').then( m => m.RatingsPageModule)
  },
  {
    path: 'app-update',
    loadChildren: () => import('./app-update/app-update.module').then( m => m.AppUpdatePageModule)
  },
  {
    path: 'report',
    loadChildren: () => import('./report/report.module').then( m => m.ReportPageModule)
  },
  {
    path: 'gemstone-astro',
    loadChildren: () => import('./gemstone-astro/gemstone-astro.module').then( m => m.GemstoneAstroPageModule)
  },
  {
    path: 'messenger',
    loadChildren: () => import('./messenger/messenger.module').then( m => m.MessengerPageModule)
  },
  {
    path: 'varga-info',
    loadChildren: () => import('./varga-info/varga-info.module').then( m => m.VargaInfoPageModule)
  },
  {
    path: 'kp-transit',
    loadChildren: () => import('./kp-transit/kp-transit.module').then( m => m.KpTransitPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'astro-call',
    loadChildren: () => import('./astro-call/astro-call.module').then( m => m.AstroCallPageModule)
  },
  {
    path: 'astro-chat',
    loadChildren: () => import('./astro-chat/astro-chat.module').then( m => m.AstroChatPageModule)
  },
  {
    path: 'my-earnings',
    loadChildren: () => import('./my-earnings/my-earnings.module').then( m => m.MyEarningsPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
	TranslateModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
