var $EmTee = $EmTee || angular.module('EmTee360', ['EmTee360.Calendar']);
angular.module('EmTee360.Calendar', ['EmTee360.Calendar.Translator']);
var $EmTeeTranslator = angular.module('EmTee360.Calendar.Translator', ['pascalprecht.translate']);

$EmTeeTranslator.provider('datetranslator', [function () {
  var Name = "";
  var DateTimeTranslatorConfig = {
    defaults: {
      dateTimeFormat: 'fullDateTime',
      prefferedLang: 'en-us',
      fallBackLang: 'en-us',
      timeAgoDefaultDays: 2
    }
  };
  var FallbackTranslationData = {
    TranslationsInLocale: {
      FallBackLanguageName: {
        "Weeks": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "ShortWeeks": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        "Months": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        "ShortMonths": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        "TimeAgo": ["just now", "one minute ago", "{{min}}minutes ago", "an hour ago", "{{hours}}hours ago", "one day ago", "{{days}}days ago"],
        "ShortTimeAgo": ["just now", "1m ago", "{{min}}m ago", "1h ago", "{{hours}}h ago", "1d ago", "{{days}}d ago"],
      }
    },
    DateTimeFormats: {
      FallBackLanguageName: {
        "fullDate": "{{day}} {{monthname}}, {{year}}",
        "fullDateTime": "{{weekname}}, {{hrs}}:{{min}} {{apm}} {{monthname}} {{day}}, {{year}}"
      }
    }
  };
  var TranslationData = {
    SupportedLanguages: ["en-us", "ja-jp"],
    TranslationsInLocale: {

    },
    DateTimeFormats: {

    }
  };
  var getBrowserSupportedLanguages = function () {
    var nav = window.navigator;
    var browserLanguagePropertyKeys = ['language', 'browserLanguage', 'systemLanguage', 'userLanguage'];
    if (nav.languages) {
      return nav.languages;
    }
    for (var langIndex = 0; langIndex < browserLanguagePropertyKeys.length; langIndex++) {
      if (nav[browserLanguagePropertyKeys[langIndex]]) {
        return [nav[browserLanguagePropertyKeys[langIndex].toLowerCase()]];
      }
    }
  };


  var providerME = {};
  providerME.setConfig = function (config) {
    if (config) {
      TranslationData.SupportedLanguages = config.SupportedLanguages || TranslationData.SupportedLanguages;
      TranslationData.TranslationsInLocale = config.TranslationsInLocale || TranslationData.TranslationsInLocale;
      TranslationData.DateTimeFormats = config.DateTimeFormats || TranslationData.DateTimeFormats;
      DateTimeTranslatorConfig.defaults.preferredLanguage = config.preferredLanguage || DateTimeTranslatorConfig.defaults.preferredLanguage;
      DateTimeTranslatorConfig.defaults.fallBackLang = config.preferredLang || DateTimeTranslatorConfig.defaults.fallBackLang;
    }
  };
  providerME.$get = function ($translate) {
    var ServiceInjector = {};
    ServiceInjector.checkMe = function () {
      return Name + ", Im Good"
    };
    ServiceInjector.Defaults = DateTimeTranslatorConfig.defaults;

    ServiceInjector.parseDate = function (inputDate, dateFormat, isTimeAgo) {
      var outputDate = null;
      if (!isNaN(inputDate) && !isNaN(parseInt(inputDate))) {
        //Timestamp 1441343008453
        outputDate = new Date(parseInt(inputDate));
      } else if (!isNaN(inputDate) && isNaN(parseInt(inputDate))) {
        //Fri Sep 04 2015 10:33:28 GMT+0530 (IST)
        outputDate = new Date(inputDate.toString());
      } else if (isNaN(inputDate) && !isNaN(parseInt(inputDate))) {
        //10/10/2014
        outputDate = new Date(inputDate.toString());
      } else if (isNaN(inputDate) && isNaN(parseInt(inputDate))) {
        outputDate = new Date(inputDate.toString());
      }
      if (outputDate.toString() === 'Invalid Date') {
        return "";
      }
      if (outputDate) {
        var currentDateTimeStamp = new Date().getTime();
        var timeSince = currentDateTimeStamp - parseInt(outputDate.getTime(), 10);
        console.log(new Date(currentDateTimeStamp), outputDate);
        if (isTimeAgo) {
          var secondsAgo = Math.floor(timeSince / 1000);
          if (secondsAgo < 60) {
            return TranslationData.TranslationsInLocale[ServiceInjector.getLocale().toUpperCase()] ? (TranslationData.TranslationsInLocale[ServiceInjector.getLocale().toUpperCase()]["TimeAgo"] ? TranslationData.TranslationsInLocale[ServiceInjector.getLocale().toUpperCase()]["TimeAgo"][0] : FallbackTranslationData.TranslationsInLocale.FallBackLanguageName.TimeAgo[0] ) : FallbackTranslationData.TranslationsInLocale.FallBackLanguageName.TimeAgo[0] ;
          }
          var minutesAgo = Math.floor(secondsAgo / 60);
          if (minutesAgo < 60) {
            if (minutesAgo < 2) {
              return TranslationData.TranslationsInLocale[ServiceInjector.getLocale().toUpperCase()] ? TranslationData.TranslationsInLocale[ServiceInjector.getLocale().toUpperCase()]["TimeAgo"][1] : FallbackTranslationData.TranslationsInLocale.FallBackLanguageName.TimeAgo[1] ;
            }
            var returnString = TranslationData.TranslationsInLocale[ServiceInjector.getLocale().toUpperCase()] ? TranslationData.TranslationsInLocale[ServiceInjector.getLocale().toUpperCase()]["TimeAgo"][2] : FallbackTranslationData.TranslationsInLocale.FallBackLanguageName.TimeAgo[2];
            return returnString.replace('{{min}}', minutesAgo);
          }

          var hoursAgo = Math.floor(minutesAgo / 60);
          if (hoursAgo < 24) {
            if (hoursAgo < 2) {
              return TranslationData.TranslationsInLocale[ServiceInjector.getLocale().toUpperCase()] ? TranslationData.TranslationsInLocale[ServiceInjector.getLocale().toUpperCase()]["TimeAgo"][3] : FallbackTranslationData.TranslationsInLocale.FallBackLanguageName.TimeAgo[3];
            }
            var returnString = TranslationData.TranslationsInLocale[ServiceInjector.getLocale().toUpperCase()] ? TranslationData.TranslationsInLocale[ServiceInjector.getLocale().toUpperCase()]["TimeAgo"][4] : FallbackTranslationData.TranslationsInLocale.FallBackLanguageName.TimeAgo[4];
            return returnString.replace('{{hours}}', hoursAgo);
          }

          var daysAgo = Math.floor(hoursAgo / 24);
          if (daysAgo < 2) {
            return TranslationData.TranslationsInLocale[ServiceInjector.getLocale().toUpperCase()] ? TranslationData.TranslationsInLocale[ServiceInjector.getLocale().toUpperCase()]["TimeAgo"][5] : FallbackTranslationData.TranslationsInLocale.FallBackLanguageName.TimeAgo[5];
          }
          var resturnString = TranslationData.TranslationsInLocale[ServiceInjector.getLocale().toUpperCase()] ? TranslationData.TranslationsInLocale[ServiceInjector.getLocale().toUpperCase()]["TimeAgo"][6] : FallbackTranslationData.TranslationsInLocale.FallBackLanguageName.TimeAgo[6];
          return  resturnString.replace('{{days}}', daysAgo);;
        }

        var hours = outputDate.getHours();
        var minutes = outputDate.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;

        var fallBackDateFormat = null;
        var selectedDateTimeFormat = null;
        for (var formatKey in TranslationData.DateTimeFormats) {
          if (formatKey.toUpperCase() === ServiceInjector.getLocale().toUpperCase()) {
            selectedDateTimeFormat = TranslationData.DateTimeFormats[formatKey][dateFormat] || TranslationData.DateTimeFormats[formatKey][DateTimeTranslatorConfig.defaults.dateTimeFormat];
            break;
          }

          if (formatKey.toUpperCase() === DateTimeTranslatorConfig.defaults.fallBackLang.toUpperCase()) {
            fallBackDateFormat = TranslationData.DateTimeFormats[formatKey][dateFormat] || TranslationData.DateTimeFormats[formatKey][DateTimeTranslatorConfig.defaults.dateTimeFormat];
          }
        }
        selectedDateTimeFormat = selectedDateTimeFormat || fallBackDateFormat || FallbackTranslationData.DateTimeFormats.FallBackLanguageName[DateTimeTranslatorConfig.defaults.dateTimeFormat];
        var monthNames = [],
          fallBackMonthNames = [],
          shortMonthNames = [],
          fallbackShortMonthNames = [];
        var weekNames = [],
          shortWeekNames = [];
        var fallBackWeekNames = [],
          fallBackShortWeekNames = [];
        for (var langKey in TranslationData.TranslationsInLocale) {
          if (langKey.toUpperCase() === ServiceInjector.getLocale(DateTimeTranslatorConfig.defaults.fallBackLang).toUpperCase()) {
            monthNames = TranslationData.TranslationsInLocale[langKey]["Months"];
            shortMonthNames = TranslationData.TranslationsInLocale[langKey]["ShortMonths"];
            weekNames = TranslationData.TranslationsInLocale[langKey]["Weeks"];
            shortWeekNames = TranslationData.TranslationsInLocale[langKey]["ShortWeeks"];
            break;
          }

          if (langKey.toUpperCase() === DateTimeTranslatorConfig.defaults.fallBackLang.toUpperCase()) {
            fallBackMonthNames = TranslationData.TranslationsInLocale[langKey]["Months"];
            fallbackShortMonthNames = TranslationData.TranslationsInLocale[langKey]["ShortMonths"];
            fallBackWeekNames = TranslationData.TranslationsInLocale[langKey]["Weeks"];
            fallBackShortWeekNames = TranslationData.TranslationsInLocale[langKey]["ShortWeeks"];
          }
        }
        monthNames = monthNames.length > 0 ? monthNames : (fallBackMonthNames.length > 0 ? fallBackMonthNames : FallbackTranslationData.TranslationsInLocale.FallBackLanguageName.Months);
        shortMonthNames = shortMonthNames.length > 0 ? shortMonthNames : (fallbackShortMonthNames.length > 0 ? fallbackShortMonthNames : FallbackTranslationData.TranslationsInLocale.FallBackLanguageName.ShortMonths);
        weekNames = weekNames.length > 0 ? weekNames : (fallBackWeekNames.length > 0 ? fallBackWeekNames : FallbackTranslationData.TranslationsInLocale.FallBackLanguageName.Weeks);
        shortWeekNames = shortWeekNames.length > 0 ? shortWeekNames : (fallBackShortWeekNames.length > 0 ? fallBackShortWeekNames : FallbackTranslationData.TranslationsInLocale.FallBackLanguageName.ShortWeeks);
        var compiledDate = selectedDateTimeFormat.replace('{{year}}', outputDate.getFullYear())
          .replace('{{monthname}}', monthNames[outputDate.getMonth()])
          .replace('{{shortmonthname}}', shortMonthNames[outputDate.getMonth()])
          .replace('{{month}}', (outputDate.getMonth() + 1))
          .replace('{{weekname}}', weekNames[outputDate.getDay()])
          .replace('{{shortweekname}}', shortWeekNames[outputDate.getDay()])
          .replace('{{hrs}}', hours)
          .replace('{{min}}', minutes)
          .replace('{{HRS}}', outputDate.getHours())
          .replace('{{MIN}}', outputDate.getMinutes())
          .replace('{{apm}}', ampm)
          .replace('{{day}}', outputDate.getDate());
        return compiledDate;
      }
      return outputDate || "";
    };

    ServiceInjector.getAppSupportedLanguages = function () {
      return TranslationData.SupportedLanguages;
    };
    ServiceInjector.getLocale = function (fallBackLang) {
      return $translate.use() || fallBackLang;
    };

    ServiceInjector.setLocale = function (fallBackLang) {
      var supportedLanguages = (TranslationData.SupportedLanguages || []) || ['en-us'];
      var browserLanguages = getBrowserSupportedLanguages();
      var foundLanguage = null;
      for (var langIndex = 0; langIndex < browserLanguages.length; langIndex++) {
        for (var supLangIndex = 0; supLangIndex < supportedLanguages.length; supLangIndex++) {
          if (supportedLanguages[supLangIndex].toLocaleLowerCase().indexOf(browserLanguages[langIndex].toLowerCase()) >= 0) {
            foundLanguage = supportedLanguages[supLangIndex].toLocaleLowerCase();
            break;
          }
        }
      }
      foundLanguage = foundLanguage || fallBackLang;
      $translate.use(foundLanguage);
    };

    return ServiceInjector;
  };
  return providerME;
      }]);


$EmTeeTranslator.filter('datetimeTranslator', ['$translate', 'datetranslator', function ($translate, datetranslator) {
  return function (input, format, isTimeAgo) {
    format = format || datetranslator.Defaults.dateTimeFormat;
    var isTimeAgoEnabled = isTimeAgo ? true : false;
    return datetranslator.parseDate(input || "", format, isTimeAgo) || "";
  };
      }]);
