/// <reference path="../dts/angular.d.ts"/>
/// <reference path="../dts/es6.d.ts"/>
var jsonResult = {
  Enabled: true,
  TemplateName: "DEFAULT",
  BackgroundImageUrl: "/media/27803/mazda3-ver-2.jpg",
  BackgroundColor: "#d02929",
  PopupIntervalInSeconds: 20,
  StagingEnabledOnly: false,
  ModelClistID: 650,
  ModelName: "מאזדה 3",
  Fields: [
    {
      DisplayName: "שם פרטי",
      TagNameAttribute: "Fname",
      TagIDAttribute: "txtFirstName",
      HtmlControlType: 1,
      HtmlControlTypeName: "Textbox",
      FieldItems: {}
    },
    {
      DisplayName: "שם משפחה",
      TagNameAttribute: "lname",
      TagIDAttribute: "txtLastName",
      HtmlControlType: 1,
      HtmlControlTypeName: "Textbox",
      FieldItems: {}
    },
    {
      DisplayName: "סלולרי",
      TagNameAttribute: "mobile",
      TagIDAttribute: "txtPhone",
      HtmlControlType: 1,
      HtmlControlTypeName: "Textbox",
      FieldItems: {}
    },
    {
      DisplayName: "דוא\"ל",
      TagNameAttribute: "email",
      TagIDAttribute: "txtEmail",
      HtmlControlType: 1,
      HtmlControlTypeName: "Textbox",
      FieldItems: {}
    },
    {
      DisplayName: "אולם תצוגה",
      TagNameAttribute: "branch",
      TagIDAttribute: "ddlBranches",
      HtmlControlType: 3,
      HtmlControlTypeName: "DropdownList",
      FieldItems: {
        A: "תל אביב",
        B: "ירושלים",
        C: "רעננה",
        E: "חיפה – רח' יפו",
        D: "חיפה - הסתדרות",
        I: "אשדוד",
        G: "נצרת",
        H: "נתניה"
      }
    },
    {
      DisplayName: "ניוזלטר וחומר פרסומי",
      TagNameAttribute: "mailinglist",
      TagIDAttribute: "chkNewsletter",
      HtmlControlType: 2,
      HtmlControlTypeName: "Checkbox",
      FieldItems: {}
    },
    {
      DisplayName: "קליינט אייפי",
      TagNameAttribute: "clientIp",
      TagIDAttribute: "hiddenClientIP",
      HtmlControlType: 6,
      HtmlControlTypeName: "HiddenField",
      FieldItems: {}
    },
    {
      DisplayName: "כתובת מקור ליד",
      TagNameAttribute: "leadSourceUrl",
      TagIDAttribute: "hdnLeadSourceUrl",
      HtmlControlType: 6,
      HtmlControlTypeName: "HiddenField",
      FieldItems: {}
    },
    {
      DisplayName: "מקור הגעה (DESKTOP או MOBILE)",
      TagNameAttribute: "source",
      TagIDAttribute: "hiddenSource",
      HtmlControlType: 6,
      HtmlControlTypeName: "HiddenField",
      FieldItems: {}
    }
  ],
  RelatedCarsList: [
    {
      Key: null,
      Value: "613"
    },
    {
      Key: null,
      Value: "1645"
    },
    {
      Key: null,
      Value: "1498"
    },
    {
      Key: null,
      Value: "737"
    },
    {
      Key: null,
      Value: "614"
    },
    {
      Key: null,
      Value: "1291"
    },
    {
      Key: null,
      Value: "597"
    }
  ]
}

class DynamicPopup {
  static $inject = ['$http']
  constructor(private $http: angular.IHttpService) {
  }
  getResult(modelId) {
    //return this.$http.get(`http://campaign.auto.co.il//umbraco/api/PopupsCampaignsApi/GetMobilePopupData?id=${modelId}`);
    return Promise.resolve(jsonResult); //TODO: remove mock
  }
}

angular.module('autoServices').service('dynamicPopupService',DynamicPopup)
