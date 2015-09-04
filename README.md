# datetimetranslator
DateTime translation with respective to browser locale

This angular based component will display the datetime and time ago format based on browser locale(language) or language set by User.

As it is dependent on angular translation of date using $translate.use() for now.

And it is fully configurable at the time angular config.


##Installation :
```bash
$bower install datetimetranslator
```
##Config :

```
var datetranslationConfig = {
  SupportedLanguages: ['en-us', 'ja-jp'],
  TranslationsInLocale: {
    "EN-US": {
      "Weeks": ["Monday", ..., "Sunday"],
      ...
      ...
      "TimeAgo": ["just now", "one minute ago", ..., "{{days}}days ago"]
    },
    "JA-JP": {
      "Weeks": ["月曜", ..., "日曜"],
      ...
      ...
      "TimeAgo": ["たった今", "1 分前", ..., "{{days}} 日前"]
    }
    .
    .
    ...
  },
  DateTimeFormats: {
          "EN-US": {
            "fullDate": "{{day}} {{monthname}}, {{year}}",
            "fullDateTime": "{{weekname}}, {{hrs}}:{{min}} {{apm}} {{monthname}} {{day}}, {{year}}"
          },
          "JA-JP": {
            "fullDate": "{{day}} {{monthname}}, {{year}}",
            "fullDateTime": "{{weekname}}, {{hrs}}:{{min}} {{apm}} {{monthname}} {{day}}, {{year}}"
          }
          .
          .
          ...
        }
};

angular.module("App1", ['pascalprecht.translate', 'EmTee360']).config(function(datetranslatorProvider, $translateProvider) {
 ....
 ...
 $translateProvider.preferredLanguage('en-us');
 
...
...

datetranslatorProvider.setConfig(datetranslationConfig);

});
```

As of now , should pass translated string with repective to languages as JSON format as showen in above code sample, we are working on better usage by using API for getting Week,Month names. It can be fully configurable at the stage of application config can set defaults of date format and default language.

##Usage :


```
{{ datetimeStamp | datetimetranslator}}  // Saturday, 6:06 PM September 4, 2015
```
Same as date filter ,it displays full Date time format as we mentioned in config JSON.

```
{{ datetimeStamp | datetimetranslator:'fullDate'}} //10 October, 2014
```

we can pass format name  as per provided format in config JSON, will render respective date format

```
{{ datetimeStamp | datetimetranslator:'fullDate':true}} //5 minutes ago
```

Pass second param of filter as 'true' it will display TimeAgo format as showen above... one min ago,4 hours ago,one day ago......etc.,

examples are provided in index.html under the package.




##Suggestions : 
1. maintain timestamp for datetime across website, it is best practise to have.


## Agile :
1. Providing much better configurable Options (Working).
2. executing every test case in every possible outcomes (Working).
3. Reduce Config Options by using existing APIs for getting translated Strings (Future Sprint).
 
