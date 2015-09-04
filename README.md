# datetimetranslator
DateTime translation with respective to browser locale

This angular based component will display the datetime based on browser locale(language) or language set by User.

As it is dependent on angular translation of date using $translate.use() for now.

And it is fully configurable at the time angular config.


Installation :
```bash
$bower install datetimetranslator
```
Config :

```
var datetranslationConfig = {
  SupportedLanguages: ['en-us', 'ja-jp'],
  TranslationsInLocale: {
    "EN-US": {
      "Weeks": ["Monday", ..., "Sunday"],
      ...
      ...
    },
    "JA-JP": {
      "Weeks": ["月曜", ..., "日曜"],
      ...
      ...
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
```


Usage :

configurable Translation Strings
```
{{ datetimeStamp | datetimetranslator}} 
```

```
{{ datetimeStamp | datetimetranslator:'fullDate':true}}
```

Suggestions : 
1) maintain timestamp for datetime across website, it is best practise to have.
