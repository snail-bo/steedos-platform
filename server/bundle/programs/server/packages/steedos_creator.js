(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var ReactiveVar = Package['reactive-var'].ReactiveVar;
var ReactiveDict = Package['reactive-dict'].ReactiveDict;
var ECMAScript = Package.ecmascript.ECMAScript;
var Random = Package.random.Random;
var DDP = Package['ddp-client'].DDP;
var DDPServer = Package['ddp-server'].DDPServer;
var check = Package.check.check;
var Match = Package.check.Match;
var DDPRateLimiter = Package['ddp-rate-limiter'].DDPRateLimiter;
var _ = Package.underscore._;
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var Blaze = Package.ui.Blaze;
var UI = Package.ui.UI;
var Handlebars = Package.ui.Handlebars;
var JsonRoutes = Package['simple:json-routes'].JsonRoutes;
var RestMiddleware = Package['simple:json-routes'].RestMiddleware;
var Restivus = Package['nimble:restivus'].Restivus;
var SimpleSchema = Package['aldeed:simple-schema'].SimpleSchema;
var MongoObject = Package['aldeed:simple-schema'].MongoObject;
var Tabular = Package['aldeed:tabular'].Tabular;
var CollectionHooks = Package['matb33:collection-hooks'].CollectionHooks;
var BlazeLayout = Package['kadira:blaze-layout'].BlazeLayout;
var FlowRouter = Package['kadira:flow-router'].FlowRouter;
var Template = Package['meteorhacks:ssr'].Template;
var SSR = Package['meteorhacks:ssr'].SSR;
var SubsManager = Package['meteorhacks:subs-manager'].SubsManager;
var WebApp = Package.webapp.WebApp;
var WebAppInternals = Package.webapp.WebAppInternals;
var main = Package.webapp.main;
var Accounts = Package['accounts-base'].Accounts;
var Selector = Package['steedos:base'].Selector;
var Steedos = Package['steedos:base'].Steedos;
var AjaxCollection = Package['steedos:base'].AjaxCollection;
var SteedosDataManager = Package['steedos:base'].SteedosDataManager;
var SteedosOffice = Package['steedos:base'].SteedosOffice;
var billingManager = Package['steedos:base'].billingManager;
var CFDataManager = Package['steedos:autoform'].CFDataManager;
var Push = Package['raix:push'].Push;
var Logger = Package['steedos:logger'].Logger;
var _i18n = Package['universe:i18n']._i18n;
var i18n = Package['universe:i18n'].i18n;
var Promise = Package.promise.Promise;
var meteorInstall = Package.modules.meteorInstall;
var HTML = Package.htmljs.HTML;
var Collection2 = Package['aldeed:collection2-core'].Collection2;
var FS = Package['steedos:cfs-base-package'].FS;
var Spacebars = Package.spacebars.Spacebars;
var MongoInternals = Package.mongo.MongoInternals;
var Mongo = Package.mongo.Mongo;

/* Package-scope variables */
var __coffeescriptShare, permissionManagerForInitApproval, uuflowManagerForInitApproval;

var require = meteorInstall({"node_modules":{"meteor":{"steedos:creator":{"checkNpm.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_creator/checkNpm.js                                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
let checkNpmVersions;
module.link("meteor/tmeasday:check-npm-versions", {
  checkNpmVersions(v) {
    checkNpmVersions = v;
  }

}, 0);
checkNpmVersions({
  busboy: "^0.2.13",
  "xml2js": "^0.4.19"
}, 'steedos:creator');

if (Meteor.settings && Meteor.settings.cfs && Meteor.settings.cfs.aliyun) {
  checkNpmVersions({
    "aliyun-sdk": "^1.11.12"
  }, 'steedos:creator');
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"core.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_creator/core.coffee                                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Creator.getSchema = function (object_name) {
  var ref;
  return (ref = Creator.getObject(object_name)) != null ? ref.schema : void 0;
};

Creator.getObjectHomeComponent = function (object_name) {
  if (Meteor.isClient) {
    return BuilderCreator.pluginComponentSelector(BuilderCreator.store.getState(), "ObjectHome", object_name);
  }
};

Creator.getObjectUrl = function (object_name, record_id, app_id) {
  var list_view, list_view_id;

  if (!app_id) {
    app_id = Session.get("app_id");
  }

  if (!object_name) {
    object_name = Session.get("object_name");
  }

  list_view = Creator.getListView(object_name, null);
  list_view_id = list_view != null ? list_view._id : void 0;

  if (record_id) {
    return Creator.getRelativeUrl("/app/" + app_id + "/" + object_name + "/view/" + record_id);
  } else {
    if (object_name === "meeting") {
      return Creator.getRelativeUrl("/app/" + app_id + "/" + object_name + "/calendar/");
    } else {
      if (Creator.getObjectHomeComponent(object_name)) {
        return Creator.getRelativeUrl("/app/" + app_id + "/" + object_name);
      } else {
        if (list_view_id) {
          return Creator.getRelativeUrl("/app/" + app_id + "/" + object_name + "/grid/" + list_view_id);
        } else {
          return Creator.getRelativeUrl("/app/" + app_id + "/" + object_name);
        }
      }
    }
  }
};

Creator.getObjectAbsoluteUrl = function (object_name, record_id, app_id) {
  var list_view, list_view_id;

  if (!app_id) {
    app_id = Session.get("app_id");
  }

  if (!object_name) {
    object_name = Session.get("object_name");
  }

  list_view = Creator.getListView(object_name, null);
  list_view_id = list_view != null ? list_view._id : void 0;

  if (record_id) {
    return Steedos.absoluteUrl("/app/" + app_id + "/" + object_name + "/view/" + record_id, true);
  } else {
    if (object_name === "meeting") {
      return Steedos.absoluteUrl("/app/" + app_id + "/" + object_name + "/calendar/", true);
    } else {
      return Steedos.absoluteUrl("/app/" + app_id + "/" + object_name + "/grid/" + list_view_id, true);
    }
  }
};

Creator.getObjectRouterUrl = function (object_name, record_id, app_id) {
  var list_view, list_view_id;

  if (!app_id) {
    app_id = Session.get("app_id");
  }

  if (!object_name) {
    object_name = Session.get("object_name");
  }

  list_view = Creator.getListView(object_name, null);
  list_view_id = list_view != null ? list_view._id : void 0;

  if (record_id) {
    return "/app/" + app_id + "/" + object_name + "/view/" + record_id;
  } else {
    if (object_name === "meeting") {
      return "/app/" + app_id + "/" + object_name + "/calendar/";
    } else {
      return "/app/" + app_id + "/" + object_name + "/grid/" + list_view_id;
    }
  }
};

Creator.getListViewUrl = function (object_name, app_id, list_view_id) {
  var url;
  url = Creator.getListViewRelativeUrl(object_name, app_id, list_view_id);
  return Creator.getRelativeUrl(url);
};

Creator.getListViewRelativeUrl = function (object_name, app_id, list_view_id) {
  if (list_view_id === "calendar") {
    return "/app/" + app_id + "/" + object_name + "/calendar/";
  } else {
    return "/app/" + app_id + "/" + object_name + "/grid/" + list_view_id;
  }
};

Creator.getSwitchListUrl = function (object_name, app_id, list_view_id) {
  if (list_view_id) {
    return Creator.getRelativeUrl("/app/" + app_id + "/" + object_name + "/" + list_view_id + "/list");
  } else {
    return Creator.getRelativeUrl("/app/" + app_id + "/" + object_name + "/list/switch");
  }
};

Creator.getRelatedObjectUrl = function (object_name, app_id, record_id, related_object_name, related_field_name) {
  if (related_field_name) {
    return Creator.getRelativeUrl("/app/" + app_id + "/" + object_name + "/" + record_id + "/" + related_object_name + "/grid?related_field_name=" + related_field_name);
  } else {
    return Creator.getRelativeUrl("/app/" + app_id + "/" + object_name + "/" + record_id + "/" + related_object_name + "/grid");
  }
};

Creator.getObjectLookupFieldOptions = function (object_name, is_deep, is_skip_hide, is_related) {
  var _object, _options, fields, icon, relatedObjects;

  _options = [];

  if (!object_name) {
    return _options;
  }

  _object = Creator.getObject(object_name);
  fields = _object != null ? _object.fields : void 0;
  icon = _object != null ? _object.icon : void 0;

  _.forEach(fields, function (f, k) {
    if (is_skip_hide && f.hidden) {
      return;
    }

    if (f.type === "select") {
      return _options.push({
        label: "" + (f.label || k),
        value: "" + k,
        icon: icon
      });
    } else {
      return _options.push({
        label: f.label || k,
        value: k,
        icon: icon
      });
    }
  });

  if (is_deep) {
    _.forEach(fields, function (f, k) {
      var r_object;

      if (is_skip_hide && f.hidden) {
        return;
      }

      if ((f.type === "lookup" || f.type === "master_detail") && f.reference_to && _.isString(f.reference_to)) {
        r_object = Creator.getObject(f.reference_to);

        if (r_object) {
          return _.forEach(r_object.fields, function (f2, k2) {
            return _options.push({
              label: (f.label || k) + "=>" + (f2.label || k2),
              value: k + "." + k2,
              icon: r_object != null ? r_object.icon : void 0
            });
          });
        }
      }
    });
  }

  if (is_related) {
    relatedObjects = Creator.getRelatedObjects(object_name);

    _.each(relatedObjects, function (_this) {
      return function (_relatedObject) {
        var relatedObject, relatedOptions;
        relatedOptions = Creator.getObjectLookupFieldOptions(_relatedObject.object_name, false, false, false);
        relatedObject = Creator.getObject(_relatedObject.object_name);
        return _.each(relatedOptions, function (relatedOption) {
          if (_relatedObject.foreign_key !== relatedOption.value) {
            return _options.push({
              label: (relatedObject.label || relatedObject.name) + "=>" + relatedOption.label,
              value: relatedObject.name + "." + relatedOption.value,
              icon: relatedObject != null ? relatedObject.icon : void 0
            });
          }
        });
      };
    }(this));
  }

  return _options;
};

Creator.getObjectFilterFieldOptions = function (object_name) {
  var _object, _options, fields, icon, permission_fields;

  _options = [];

  if (!object_name) {
    return _options;
  }

  _object = Creator.getObject(object_name);
  fields = _object != null ? _object.fields : void 0;
  permission_fields = Creator.getFields(object_name);
  icon = _object != null ? _object.icon : void 0;

  _.forEach(fields, function (f, k) {
    if (!_.include(["grid", "object", "[Object]", "[object]", "Object", "avatar", "image", "markdown", "html"], f.type) && !f.hidden) {
      if (!/\w+\./.test(k) && _.indexOf(permission_fields, k) > -1) {
        return _options.push({
          label: f.label || k,
          value: k,
          icon: icon
        });
      }
    }
  });

  return _options;
};

Creator.getObjectFieldOptions = function (object_name) {
  var _object, _options, fields, icon, permission_fields;

  _options = [];

  if (!object_name) {
    return _options;
  }

  _object = Creator.getObject(object_name);
  fields = _object != null ? _object.fields : void 0;
  permission_fields = Creator.getFields(object_name);
  icon = _object != null ? _object.icon : void 0;

  _.forEach(fields, function (f, k) {
    if (!_.include(["grid", "object", "[Object]", "[object]", "Object", "markdown", "html"], f.type)) {
      if (!/\w+\./.test(k) && _.indexOf(permission_fields, k) > -1) {
        return _options.push({
          label: f.label || k,
          value: k,
          icon: icon
        });
      }
    }
  });

  return _options;
}; /*
   filters: 要转换的filters
   fields: 对象字段
   filter_fields: 默认过滤字段，支持字符串数组和对象数组两种格式，如:['filed_name1','filed_name2'],[{field:'filed_name1',required:true}]
   处理逻辑: 把filters中存在于filter_fields的过滤条件增加每项的is_default、is_required属性，不存在于filter_fields的过滤条件对应的移除每项的相关属性
   返回结果: 处理后的filters
    */

Creator.getFiltersWithFilterFields = function (filters, fields, filter_fields) {
  if (!filters) {
    filters = [];
  }

  if (!filter_fields) {
    filter_fields = [];
  }

  if (filter_fields != null ? filter_fields.length : void 0) {
    filter_fields.forEach(function (n) {
      if (_.isString(n)) {
        n = {
          field: n,
          required: false
        };
      }

      if (fields[n.field] && !_.findWhere(filters, {
        field: n.field
      })) {
        return filters.push({
          field: n.field,
          is_default: true,
          is_required: n.required
        });
      }
    });
  }

  filters.forEach(function (filterItem) {
    var matchField;
    matchField = filter_fields.find(function (n) {
      return n === filterItem.field || n.field === filterItem.field;
    });

    if (_.isString(matchField)) {
      matchField = {
        field: matchField,
        required: false
      };
    }

    if (matchField) {
      filterItem.is_default = true;
      return filterItem.is_required = matchField.required;
    } else {
      delete filterItem.is_default;
      return delete filterItem.is_required;
    }
  });
  return filters;
};

Creator.getObjectRecord = function (object_name, record_id, select_fields, expand) {
  var collection, obj, record, ref, ref1, ref2;

  if (!object_name) {
    object_name = Session.get("object_name");
  }

  if (!record_id) {
    record_id = Session.get("record_id");
  }

  if (Meteor.isClient) {
    if (object_name === Session.get("object_name") && record_id === Session.get("record_id")) {
      if ((ref = Template.instance()) != null ? ref.record : void 0) {
        return (ref1 = Template.instance()) != null ? (ref2 = ref1.record) != null ? ref2.get() : void 0 : void 0;
      }
    } else {
      return Creator.odata.get(object_name, record_id, select_fields, expand);
    }
  }

  obj = Creator.getObject(object_name);

  if (obj.database_name === "meteor" || !obj.database_name) {
    collection = Creator.getCollection(object_name);

    if (collection) {
      record = collection.findOne(record_id);
      return record;
    }
  } else if (object_name && record_id) {
    return Creator.odata.get(object_name, record_id, select_fields, expand);
  }
};

Creator.getObjectRecordName = function (record, object_name) {
  var name_field_key, ref;

  if (!record) {
    record = Creator.getObjectRecord();
  }

  if (record) {
    name_field_key = object_name === "organizations" ? "name" : (ref = Creator.getObject(object_name)) != null ? ref.NAME_FIELD_KEY : void 0;

    if (record && name_field_key) {
      return record.label || record[name_field_key];
    }
  }
};

Creator.getApp = function (app_id) {
  var app, ref, ref1;

  if (!app_id) {
    app_id = Session.get("app_id");
  }

  app = Creator.Apps[app_id];

  if ((ref = Creator.deps) != null) {
    if ((ref1 = ref.app) != null) {
      ref1.depend();
    }
  }

  return app;
};

Creator.getAppDashboard = function (app_id) {
  var app, dashboard;
  app = Creator.getApp(app_id);

  if (!app) {
    return;
  }

  dashboard = null;

  _.each(Creator.Dashboards, function (v, k) {
    var ref;

    if (((ref = v.apps) != null ? ref.indexOf(app._id) : void 0) > -1) {
      return dashboard = v;
    }
  });

  return dashboard;
};

Creator.getAppDashboardComponent = function (app_id) {
  var app;
  app = Creator.getApp(app_id);

  if (!app) {
    return;
  }

  return BuilderCreator.pluginComponentSelector(BuilderCreator.store.getState(), "Dashboard", app._id);
};

Creator.getAppObjectNames = function (app_id) {
  var app, appObjects, isMobile, objects;
  app = Creator.getApp(app_id);

  if (!app) {
    return;
  }

  isMobile = Steedos.isMobile();
  appObjects = isMobile ? app.mobile_objects : app.objects;
  objects = [];

  if (app) {
    _.each(appObjects, function (v) {
      var obj;
      obj = Creator.getObject(v);

      if (obj != null ? obj.permissions.get().allowRead : void 0) {
        return objects.push(v);
      }
    });
  }

  return objects;
};

Creator.getUrlWithToken = function (url, expressionFormData) {
  var hasQuerySymbol, linkStr, params;
  params = {};
  params["X-Space-Id"] = Steedos.spaceId();
  params["X-User-Id"] = Steedos.userId();
  params["X-Company-Ids"] = Steedos.getUserCompanyIds();
  params["X-Auth-Token"] = Accounts._storedLoginToken();

  if (Steedos.isExpression(url)) {
    url = Steedos.parseSingleExpression(url, expressionFormData, "#", Creator.USER_CONTEXT);
  }

  hasQuerySymbol = /(\#.+\?)|(\?[^#]*$)/g.test(url);
  linkStr = hasQuerySymbol ? "&" : "?";
  return "" + url + linkStr + $.param(params);
};

Creator.getAppMenu = function (app_id, menu_id) {
  var menus;
  menus = Creator.getAppMenus(app_id);
  return menus && menus.find(function (menu) {
    return menu.id === menu_id;
  });
};

Creator.getAppMenuUrlForInternet = function (menu) {
  return Creator.getUrlWithToken(menu.path, menu);
};

Creator.getAppMenuUrl = function (menu) {
  var url;
  url = menu.path;

  if (menu.type === "url") {
    if (menu.target) {
      return Creator.getAppMenuUrlForInternet(menu);
    } else {
      return "/app/-/tab_iframe/" + menu.id;
    }
  } else {
    return menu.path;
  }
};

Creator.getAppMenus = function (app_id) {
  var app, appMenus, curentAppMenus;
  app = Creator.getApp(app_id);

  if (!app) {
    return [];
  }

  appMenus = Session.get("app_menus");

  if (!appMenus) {
    return [];
  }

  curentAppMenus = appMenus.find(function (menuItem) {
    return menuItem.id === app._id;
  });

  if (curentAppMenus) {
    return curentAppMenus.children;
  }
};

Creator.loadAppsMenus = function () {
  var data, isMobile, options;
  isMobile = Steedos.isMobile();
  data = {};

  if (isMobile) {
    data.mobile = isMobile;
  }

  options = {
    type: 'get',
    data: data,
    success: function (data) {
      return Session.set("app_menus", data);
    }
  };
  return Steedos.authRequest("/service/api/apps/menus", options);
};

Creator.getVisibleApps = function (includeAdmin) {
  var changeApp;
  changeApp = Creator._subApp.get();
  BuilderCreator.store.getState().entities.apps = Object.assign({}, BuilderCreator.store.getState().entities.apps, {
    apps: changeApp
  });
  return BuilderCreator.visibleAppsSelector(BuilderCreator.store.getState(), includeAdmin);
};

Creator.getVisibleAppsObjects = function () {
  var apps, objects, visibleObjectNames;
  apps = Creator.getVisibleApps();
  visibleObjectNames = _.flatten(_.pluck(apps, 'objects'));
  objects = _.filter(Creator.Objects, function (obj) {
    if (visibleObjectNames.indexOf(obj.name) < 0) {
      return false;
    } else {
      return true;
    }
  });
  objects = objects.sort(Creator.sortingMethod.bind({
    key: "label"
  }));
  objects = _.pluck(objects, 'name');
  return _.uniq(objects);
};

Creator.getAppsObjects = function () {
  var objects, tempObjects;
  objects = [];
  tempObjects = [];

  _.forEach(Creator.Apps, function (app) {
    tempObjects = _.filter(app.objects, function (obj) {
      return !obj.hidden;
    });
    return objects = objects.concat(tempObjects);
  });

  return _.uniq(objects);
};

Creator.validateFilters = function (filters, logic) {
  var e, errorMsg, filter_items, filter_length, flag, index, word;
  filter_items = _.map(filters, function (obj) {
    if (_.isEmpty(obj)) {
      return false;
    } else {
      return obj;
    }
  });
  filter_items = _.compact(filter_items);
  errorMsg = "";
  filter_length = filter_items.length;

  if (logic) {
    logic = logic.replace(/\n/g, "").replace(/\s+/g, " ");

    if (/[._\-!+]+/ig.test(logic)) {
      errorMsg = "含有特殊字符。";
    }

    if (!errorMsg) {
      index = logic.match(/\d+/ig);

      if (!index) {
        errorMsg = "有些筛选条件进行了定义，但未在高级筛选条件中被引用。";
      } else {
        index.forEach(function (i) {
          if (i < 1 || i > filter_length) {
            return errorMsg = "您的筛选条件引用了未定义的筛选器：" + i + "。";
          }
        });
        flag = 1;

        while (flag <= filter_length) {
          if (!index.includes("" + flag)) {
            errorMsg = "有些筛选条件进行了定义，但未在高级筛选条件中被引用。";
          }

          flag++;
        }
      }
    }

    if (!errorMsg) {
      word = logic.match(/[a-zA-Z]+/ig);

      if (word) {
        word.forEach(function (w) {
          if (!/^(and|or)$/ig.test(w)) {
            return errorMsg = "检查您的高级筛选条件中的拼写。";
          }
        });
      }
    }

    if (!errorMsg) {
      try {
        Creator["eval"](logic.replace(/and/ig, "&&").replace(/or/ig, "||"));
      } catch (error) {
        e = error;
        errorMsg = "您的筛选器中含有特殊字符";
      }

      if (/(AND)[^()]+(OR)/ig.test(logic) || /(OR)[^()]+(AND)/ig.test(logic)) {
        errorMsg = "您的筛选器必须在连续性的 AND 和 OR 表达式前后使用括号。";
      }
    }
  }

  if (errorMsg) {
    console.log("error", errorMsg);

    if (Meteor.isClient) {
      toastr.error(errorMsg);
    }

    return false;
  } else {
    return true;
  }
}; /*
   options参数：
   	extend-- 是否需要把当前用户基本信息加入公式，即让公式支持Creator.USER_CONTEXT中的值，默认为true
   	userId-- 当前登录用户
   	spaceId-- 当前所在工作区
   extend为true时，后端需要额外传入userId及spaceId用于抓取Creator.USER_CONTEXT对应的值
    */

Creator.formatFiltersToMongo = function (filters, options) {
  var selector;

  if (!(filters != null ? filters.length : void 0)) {
    return;
  }

  if (!(filters[0] instanceof Array)) {
    filters = _.map(filters, function (obj) {
      return [obj.field, obj.operation, obj.value];
    });
  }

  selector = [];

  _.each(filters, function (filter) {
    var field, option, reg, sub_selector, value;
    field = filter[0];
    option = filter[1];

    if (Meteor.isClient) {
      value = Creator.evaluateFormula(filter[2]);
    } else {
      value = Creator.evaluateFormula(filter[2], null, options);
    }

    sub_selector = {};
    sub_selector[field] = {};

    if (option === "=") {
      sub_selector[field]["$eq"] = value;
    } else if (option === "<>") {
      sub_selector[field]["$ne"] = value;
    } else if (option === ">") {
      sub_selector[field]["$gt"] = value;
    } else if (option === ">=") {
      sub_selector[field]["$gte"] = value;
    } else if (option === "<") {
      sub_selector[field]["$lt"] = value;
    } else if (option === "<=") {
      sub_selector[field]["$lte"] = value;
    } else if (option === "startswith") {
      reg = new RegExp("^" + value, "i");
      sub_selector[field]["$regex"] = reg;
    } else if (option === "contains") {
      reg = new RegExp(value, "i");
      sub_selector[field]["$regex"] = reg;
    } else if (option === "notcontains") {
      reg = new RegExp("^((?!" + value + ").)*$", "i");
      sub_selector[field]["$regex"] = reg;
    }

    return selector.push(sub_selector);
  });

  return selector;
};

Creator.isBetweenFilterOperation = function (operation) {
  var ref;
  return operation === "between" || !!((ref = Creator.getBetweenTimeBuiltinValues(true)) != null ? ref[operation] : void 0);
}; /*
   options参数：
   	extend-- 是否需要把当前用户基本信息加入公式，即让公式支持Creator.USER_CONTEXT中的值，默认为true
   	userId-- 当前登录用户
   	spaceId-- 当前所在工作区
   	extend为true时，后端需要额外传入userId及spaceId用于抓取Creator.USER_CONTEXT对应的值
    */

Creator.formatFiltersToDev = function (filters, object_name, options) {
  var logicTempFilters, selector;

  if (!filters.length) {
    return;
  }

  if (options != null ? options.is_logic_or : void 0) {
    logicTempFilters = [];
    filters.forEach(function (n) {
      logicTempFilters.push(n);
      return logicTempFilters.push("or");
    });
    logicTempFilters.pop();
    filters = logicTempFilters;
  }

  selector = SteedosFilters.formatFiltersToDev(filters, Creator.USER_CONTEXT);
  return selector;
}; /*
   options参数：
   	extend-- 是否需要把当前用户基本信息加入公式，即让公式支持Creator.USER_CONTEXT中的值，默认为true
   	userId-- 当前登录用户
   	spaceId-- 当前所在工作区
   extend为true时，后端需要额外传入userId及spaceId用于抓取Creator.USER_CONTEXT对应的值
    */

Creator.formatLogicFiltersToDev = function (filters, filter_logic, options) {
  var format_logic;
  format_logic = filter_logic.replace(/\(\s+/ig, "(").replace(/\s+\)/ig, ")").replace(/\(/g, "[").replace(/\)/g, "]").replace(/\s+/g, ",").replace(/(and|or)/ig, "'$1'");
  format_logic = format_logic.replace(/(\d)+/ig, function (x) {
    var _f, field, option, sub_selector, value;

    _f = filters[x - 1];
    field = _f.field;
    option = _f.operation;

    if (Meteor.isClient) {
      value = Creator.evaluateFormula(_f.value);
    } else {
      value = Creator.evaluateFormula(_f.value, null, options);
    }

    sub_selector = [];

    if (_.isArray(value) === true) {
      if (option === "=") {
        _.each(value, function (v) {
          return sub_selector.push([field, option, v], "or");
        });
      } else if (option === "<>") {
        _.each(value, function (v) {
          return sub_selector.push([field, option, v], "and");
        });
      } else {
        _.each(value, function (v) {
          return sub_selector.push([field, option, v], "or");
        });
      }

      if (sub_selector[sub_selector.length - 1] === "and" || sub_selector[sub_selector.length - 1] === "or") {
        sub_selector.pop();
      }
    } else {
      sub_selector = [field, option, value];
    }

    console.log("sub_selector", sub_selector);
    return JSON.stringify(sub_selector);
  });
  format_logic = "[" + format_logic + "]";
  return Creator["eval"](format_logic);
};

Creator.getRelatedObjects = function (object_name, spaceId, userId) {
  var _object, permissions, related_object_names, related_objects, unrelated_objects;

  if (Meteor.isClient) {
    if (!object_name) {
      object_name = Session.get("object_name");
    }

    if (!spaceId) {
      spaceId = Session.get("spaceId");
    }

    if (!userId) {
      userId = Meteor.userId();
    }
  }

  related_object_names = [];
  _object = Creator.getObject(object_name);

  if (!_object) {
    return related_object_names;
  }

  related_objects = Creator.getObjectRelateds(_object._collection_name);
  related_object_names = _.pluck(related_objects, "object_name");

  if ((related_object_names != null ? related_object_names.length : void 0) === 0) {
    return related_object_names;
  }

  permissions = Creator.getPermissions(object_name, spaceId, userId);
  unrelated_objects = permissions.unrelated_objects;
  related_object_names = _.difference(related_object_names, unrelated_objects);
  return _.filter(related_objects, function (related_object) {
    var allowRead, isActive, ref, related_object_name;
    related_object_name = related_object.object_name;
    isActive = related_object_names.indexOf(related_object_name) > -1;
    allowRead = (ref = Creator.getPermissions(related_object_name, spaceId, userId)) != null ? ref.allowRead : void 0;

    if (related_object_name === "cms_files") {
      allowRead = allowRead && permissions.allowReadFiles;
    }

    return isActive && allowRead;
  });
};

Creator.getRelatedObjectNames = function (object_name, spaceId, userId) {
  var related_objects;
  related_objects = Creator.getRelatedObjects(object_name, spaceId, userId);
  return _.pluck(related_objects, "object_name");
};

Creator.getRelatedObjectListActions = function (relatedObjectName, spaceId, userId) {
  var actions;
  actions = Creator.getActions(relatedObjectName, spaceId, userId);
  actions = _.filter(actions, function (action) {
    if (action.name === "standard_follow") {
      return false;
    }

    if (action.name === "standard_query") {
      return false;
    }

    if (action.on === "list") {
      if (typeof action.visible === "function") {
        return action.visible();
      } else {
        return action.visible;
      }
    } else {
      return false;
    }
  });
  return actions;
};

Creator.getActions = function (object_name, spaceId, userId) {
  var actions, disabled_actions, obj, permissions, ref, ref1;

  if (Meteor.isClient) {
    if (!object_name) {
      object_name = Session.get("object_name");
    }

    if (!spaceId) {
      spaceId = Session.get("spaceId");
    }

    if (!userId) {
      userId = Meteor.userId();
    }
  }

  obj = Creator.getObject(object_name);

  if (!obj) {
    return;
  }

  permissions = Creator.getPermissions(object_name, spaceId, userId);
  disabled_actions = permissions.disabled_actions;
  actions = _.sortBy(_.values(obj.actions), 'sort');

  if (_.has(obj, 'allow_customActions')) {
    actions = _.filter(actions, function (action) {
      return _.include(obj.allow_customActions, action.name) || _.include(_.keys(Creator.getObject('base').actions) || {}, action.name);
    });
  }

  if (_.has(obj, 'exclude_actions')) {
    actions = _.filter(actions, function (action) {
      return !_.include(obj.exclude_actions, action.name);
    });
  }

  _.each(actions, function (action) {
    if (Steedos.isMobile() && ["record", "record_only"].indexOf(action.on) > -1 && action.name !== 'standard_edit') {
      if (action.on === "record_only") {
        return action.on = 'record_only_more';
      } else {
        return action.on = 'record_more';
      }
    }
  });

  if (Steedos.isMobile() && ["cms_files", "cfs.files.filerecord"].indexOf(object_name) > -1) {
    if ((ref = actions.find(function (n) {
      return n.name === "standard_edit";
    })) != null) {
      ref.on = "record_more";
    }

    if ((ref1 = actions.find(function (n) {
      return n.name === "download";
    })) != null) {
      ref1.on = "record";
    }
  }

  actions = _.filter(actions, function (action) {
    return _.indexOf(disabled_actions, action.name) < 0;
  });
  return actions;
};

/返回当前用户有权限访问的所有list_view，包括分享的，用户自定义非分享的（除非owner变了），以及默认的其他视图注意Creator.getPermissions函数中是不会有用户自定义非分享的视图的，所以Creator.getPermissions函数中拿到的结果不全，并不是当前用户能看到所有视图/;

Creator.getListViews = function (object_name, spaceId, userId) {
  var disabled_list_views, isMobile, listViews, list_views, object, ref;

  if (Meteor.isClient) {
    if (!object_name) {
      object_name = Session.get("object_name");
    }

    if (!spaceId) {
      spaceId = Session.get("spaceId");
    }

    if (!userId) {
      userId = Meteor.userId();
    }
  }

  if (!object_name) {
    return;
  }

  object = Creator.getObject(object_name);

  if (!object) {
    return;
  }

  disabled_list_views = ((ref = Creator.getPermissions(object_name, spaceId, userId)) != null ? ref.disabled_list_views : void 0) || [];
  list_views = [];
  isMobile = Steedos.isMobile();

  _.each(object.list_views, function (item, item_name) {
    return item.name = item_name;
  });

  listViews = _.sortBy(_.values(object.list_views), 'sort_no');

  _.each(listViews, function (item) {
    var isDisabled;

    if (isMobile && item.type === "calendar") {
      return;
    }

    if (item.name !== "default") {
      isDisabled = _.indexOf(disabled_list_views, item.name) > -1 || item._id && _.indexOf(disabled_list_views, item._id) > -1;

      if (!isDisabled || item.owner === userId) {
        return list_views.push(item);
      }
    }
  });

  return list_views;
};

Creator.getFields = function (object_name, spaceId, userId) {
  var fieldsName, ref, unreadable_fields;

  if (Meteor.isClient) {
    if (!object_name) {
      object_name = Session.get("object_name");
    }

    if (!spaceId) {
      spaceId = Session.get("spaceId");
    }

    if (!userId) {
      userId = Meteor.userId();
    }
  }

  fieldsName = Creator.getObjectFieldsName(object_name);
  unreadable_fields = (ref = Creator.getPermissions(object_name, spaceId, userId)) != null ? ref.unreadable_fields : void 0;
  return _.difference(fieldsName, unreadable_fields);
};

Creator.isloading = function () {
  return !Creator.bootstrapLoaded.get();
};

Creator.convertSpecialCharacter = function (str) {
  return str.replace(/([\^\$\(\)\*\+\?\.\\\|\[\]\{\}])/g, "\\$1");
};

Creator.getDisabledFields = function (schema) {
  var fields;
  fields = _.map(schema, function (field, fieldName) {
    return field.autoform && field.autoform.disabled && !field.autoform.omit && fieldName;
  });
  fields = _.compact(fields);
  return fields;
};

Creator.getHiddenFields = function (schema) {
  var fields;
  fields = _.map(schema, function (field, fieldName) {
    return field.autoform && field.autoform.type === "hidden" && !field.autoform.omit && fieldName;
  });
  fields = _.compact(fields);
  return fields;
};

Creator.getFieldsWithNoGroup = function (schema) {
  var fields;
  fields = _.map(schema, function (field, fieldName) {
    return (!field.autoform || !field.autoform.group || field.autoform.group === "-") && (!field.autoform || field.autoform.type !== "hidden") && fieldName;
  });
  fields = _.compact(fields);
  return fields;
};

Creator.getSortedFieldGroupNames = function (schema) {
  var names;
  names = _.map(schema, function (field) {
    return field.autoform && field.autoform.group !== "-" && field.autoform.group;
  });
  names = _.compact(names);
  names = _.unique(names);
  return names;
};

Creator.getFieldsForGroup = function (schema, groupName) {
  var fields;
  fields = _.map(schema, function (field, fieldName) {
    return field.autoform && field.autoform.group === groupName && field.autoform.type !== "hidden" && fieldName;
  });
  fields = _.compact(fields);
  return fields;
};

Creator.getSystemBaseFields = function () {
  return ["created", "created_by", "modified", "modified_by"];
};

Creator.getFieldsWithoutSystemBase = function (keys) {
  return _.difference(keys, Creator.getSystemBaseFields());
};

Creator.getFieldsWithoutOmit = function (schema, keys) {
  keys = _.map(keys, function (key) {
    var field, ref;
    field = _.pick(schema, key);

    if ((ref = field[key].autoform) != null ? ref.omit : void 0) {
      return false;
    } else {
      return key;
    }
  });
  keys = _.compact(keys);
  return keys;
};

Creator.getFieldsInFirstLevel = function (firstLevelKeys, keys) {
  keys = _.map(keys, function (key) {
    if (_.indexOf(firstLevelKeys, key) > -1) {
      return key;
    } else {
      return false;
    }
  });
  keys = _.compact(keys);
  return keys;
};

Creator.getFieldsForReorder = function (schema, keys, isSingle) {
  var _keys, childKeys, fields, i, is_wide_1, is_wide_2, sc_1, sc_2;

  fields = [];
  i = 0;
  _keys = _.filter(keys, function (key) {
    return !key.endsWith('_endLine');
  });

  while (i < _keys.length) {
    sc_1 = _.pick(schema, _keys[i]);
    sc_2 = _.pick(schema, _keys[i + 1]);
    is_wide_1 = false;
    is_wide_2 = false;

    _.each(sc_1, function (value) {
      var ref, ref1;

      if (((ref = value.autoform) != null ? ref.is_wide : void 0) || ((ref1 = value.autoform) != null ? ref1.type : void 0) === "table") {
        return is_wide_1 = true;
      }
    });

    _.each(sc_2, function (value) {
      var ref, ref1;

      if (((ref = value.autoform) != null ? ref.is_wide : void 0) || ((ref1 = value.autoform) != null ? ref1.type : void 0) === "table") {
        return is_wide_2 = true;
      }
    });

    if (Steedos.isMobile()) {
      is_wide_1 = true;
      is_wide_2 = true;
    }

    if (isSingle) {
      fields.push(_keys.slice(i, i + 1));
      i += 1;
    } else {
      if (is_wide_1) {
        fields.push(_keys.slice(i, i + 1));
        i += 1;
      } else if (!is_wide_1 && is_wide_2) {
        childKeys = _keys.slice(i, i + 1);
        childKeys.push(void 0);
        fields.push(childKeys);
        i += 1;
      } else if (!is_wide_1 && !is_wide_2) {
        childKeys = _keys.slice(i, i + 1);

        if (_keys[i + 1]) {
          childKeys.push(_keys[i + 1]);
        } else {
          childKeys.push(void 0);
        }

        fields.push(childKeys);
        i += 2;
      }
    }
  }

  return fields;
};

Creator.isFilterValueEmpty = function (v) {
  return typeof v === "undefined" || v === null || Number.isNaN(v) || v.length === 0;
};

Creator.getFieldDataType = function (objectFields, key) {
  var ref, result;

  if (objectFields && key) {
    result = (ref = objectFields[key]) != null ? ref.type : void 0;

    if (["formula", "summary"].indexOf(result) > -1) {
      result = objectFields[key].data_type;
    }

    return result;
  } else {
    return "text";
  }
};

if (Meteor.isServer) {
  Creator.getAllRelatedObjects = function (object_name) {
    var related_object_names;
    related_object_names = [];

    _.each(Creator.Objects, function (related_object, related_object_name) {
      return _.each(related_object.fields, function (related_field, related_field_name) {
        if (related_field.type === "master_detail" && related_field.reference_to && related_field.reference_to === object_name) {
          return related_object_names.push(related_object_name);
        }
      });
    });

    if (Creator.getObject(object_name).enable_files) {
      related_object_names.push("cms_files");
    }

    return related_object_names;
  };
}

if (Meteor.isServer) {
  Steedos.formatIndex = function (array) {
    var indexName, isdocumentDB, object, ref, ref1, ref2;
    object = {
      background: true
    };
    isdocumentDB = ((ref = Meteor.settings) != null ? (ref1 = ref.datasources) != null ? (ref2 = ref1["default"]) != null ? ref2.documentDB : void 0 : void 0 : void 0) || false;

    if (isdocumentDB) {
      if (array.length > 0) {
        indexName = array.join(".");
        object.name = indexName;

        if (indexName.length > 52) {
          object.name = indexName.substring(0, 52);
        }
      }
    }

    return object;
  };
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"lib":{"apps.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_creator/lib/apps.coffee                                                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Creator.appsByName = {};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"server":{"methods":{"object_recent_viewed.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_creator/server/methods/object_recent_viewed.coffee                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.methods({
  "object_recent_viewed": function (object_name, record_id, space_id) {
    var collection_recent_viewed, current_recent_viewed, doc, filters;

    if (!this.userId) {
      return null;
    }

    if (object_name === "object_recent_viewed") {
      return;
    }

    if (object_name && record_id) {
      if (!space_id) {
        doc = Creator.getCollection(object_name).findOne({
          _id: record_id
        }, {
          fields: {
            space: 1
          }
        });
        space_id = doc != null ? doc.space : void 0;
      }

      collection_recent_viewed = Creator.getCollection("object_recent_viewed");
      filters = {
        owner: this.userId,
        space: space_id,
        'record.o': object_name,
        'record.ids': [record_id]
      };
      current_recent_viewed = collection_recent_viewed.findOne(filters);

      if (current_recent_viewed) {
        collection_recent_viewed.update(current_recent_viewed._id, {
          $inc: {
            count: 1
          },
          $set: {
            modified: new Date(),
            modified_by: this.userId
          }
        });
      } else {
        collection_recent_viewed.insert({
          _id: collection_recent_viewed._makeNewID(),
          owner: this.userId,
          space: space_id,
          record: {
            o: object_name,
            ids: [record_id]
          },
          count: 1,
          created: new Date(),
          created_by: this.userId,
          modified: new Date(),
          modified_by: this.userId
        });
      }
    }
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"object_recent_record.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_creator/server/methods/object_recent_record.coffee                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var async_recent_aggregate, recent_aggregate, search_object;

recent_aggregate = function (created_by, spaceId, _records, callback) {
  return Creator.Collections.object_recent_viewed.rawCollection().aggregate([{
    $match: {
      created_by: created_by,
      space: spaceId
    }
  }, {
    $group: {
      _id: {
        object_name: "$record.o",
        record_id: "$record.ids",
        space: "$space"
      },
      maxCreated: {
        $max: "$created"
      }
    }
  }, {
    $sort: {
      maxCreated: -1
    }
  }, {
    $limit: 10
  }]).toArray(function (err, data) {
    if (err) {
      throw new Error(err);
    }

    data.forEach(function (doc) {
      return _records.push(doc._id);
    });

    if (callback && _.isFunction(callback)) {
      callback();
    }
  });
};

async_recent_aggregate = Meteor.wrapAsync(recent_aggregate);

search_object = function (space, object_name, userId, searchText) {
  var _object, _object_collection, _object_name_key, data, fields, query, query_and, records, search_Keywords;

  data = new Array();

  if (searchText) {
    _object = Creator.getObject(object_name);
    _object_collection = Creator.getCollection(object_name);
    _object_name_key = _object != null ? _object.NAME_FIELD_KEY : void 0;

    if (_object && _object_collection && _object_name_key) {
      query = {};
      search_Keywords = searchText.split(" ");
      query_and = [];
      search_Keywords.forEach(function (keyword) {
        var subquery;
        subquery = {};
        subquery[_object_name_key] = {
          $regex: keyword.trim()
        };
        return query_and.push(subquery);
      });
      query.$and = query_and;
      query.space = {
        $in: [space]
      };
      fields = {
        _id: 1
      };
      fields[_object_name_key] = 1;
      records = _object_collection.find(query, {
        fields: fields,
        sort: {
          modified: 1
        },
        limit: 5
      });
      records.forEach(function (record) {
        return data.push({
          _id: record._id,
          _name: record[_object_name_key],
          _object_name: object_name
        });
      });
    }
  }

  return data;
};

Meteor.methods({
  'object_recent_record': function (spaceId) {
    var data, records;
    data = new Array();
    records = new Array();
    async_recent_aggregate(this.userId, spaceId, records);
    records.forEach(function (item) {
      var fields, record, record_object, record_object_collection;
      record_object = Creator.getObject(item.object_name, item.space);

      if (!record_object) {
        return;
      }

      record_object_collection = Creator.getCollection(item.object_name, item.space);

      if (record_object && record_object_collection) {
        fields = {
          _id: 1
        };
        fields[record_object.NAME_FIELD_KEY] = 1;
        record = record_object_collection.findOne(item.record_id[0], {
          fields: fields
        });

        if (record) {
          return data.push({
            _id: record._id,
            _name: record[record_object.NAME_FIELD_KEY],
            _object_name: item.object_name
          });
        }
      }
    });
    return data;
  },
  'object_record_search': function (options) {
    var data, searchText, self, space;
    self = this;
    data = new Array();
    searchText = options.searchText;
    space = options.space;

    _.forEach(Creator.objectsByName, function (_object, name) {
      var object_record;

      if (_object.enable_search) {
        object_record = search_object(space, _object.name, self.userId, searchText);
        return data = data.concat(object_record);
      }
    });

    return data;
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"object_listviews_options.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_creator/server/methods/object_listviews_options.coffee                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.methods({
  update_filters: function (listview_id, filters, filter_scope, filter_logic) {
    return Creator.Collections.object_listviews.direct.update({
      _id: listview_id
    }, {
      $set: {
        filters: filters,
        filter_scope: filter_scope,
        filter_logic: filter_logic
      }
    });
  },
  update_columns: function (listview_id, columns) {
    check(columns, Array);

    if (columns.length < 1) {
      throw new Meteor.Error(400, "Select at least one field to display");
    }

    return Creator.Collections.object_listviews.update({
      _id: listview_id
    }, {
      $set: {
        columns: columns
      }
    });
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"report_data.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_creator/server/methods/report_data.coffee                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.methods({
  'report_data': function (options) {
    var compoundFields, cursor, fields, filterFields, filter_scope, filters, objectFields, object_name, ref, result, selector, space, userId;
    check(options, Object);
    space = options.space;
    fields = options.fields;
    object_name = options.object_name;
    filter_scope = options.filter_scope;
    filters = options.filters;
    filterFields = {};
    compoundFields = [];
    objectFields = (ref = Creator.getObject(object_name)) != null ? ref.fields : void 0;

    _.each(fields, function (item, index) {
      var childKey, name, objectField, splits;
      splits = item.split(".");
      name = splits[0];
      objectField = objectFields[name];

      if (splits.length > 1 && objectField) {
        childKey = item.replace(name + ".", "");
        compoundFields.push({
          name: name,
          childKey: childKey,
          field: objectField
        });
      }

      return filterFields[name] = 1;
    });

    selector = {};
    userId = this.userId;
    selector.space = space;

    if (filter_scope === "spacex") {
      selector.space = {
        $in: [null, space]
      };
    } else if (filter_scope === "mine") {
      selector.owner = userId;
    }

    if (Creator.isCommonSpace(space) && Creator.isSpaceAdmin(space, this.userId)) {
      delete selector.space;
    }

    if (filters && filters.length > 0) {
      selector["$and"] = filters;
    }

    cursor = Creator.getCollection(object_name).find(selector, {
      fields: filterFields,
      skip: 0,
      limit: 10000
    });
    result = cursor.fetch();

    if (compoundFields.length) {
      result = result.map(function (item, index) {
        _.each(compoundFields, function (compoundFieldItem, index) {
          var compoundFilterFields, itemKey, itemValue, ref1, referenceItem, reference_to, type;
          itemKey = compoundFieldItem.name + "*%*" + compoundFieldItem.childKey.replace(/\./g, "*%*");
          itemValue = item[compoundFieldItem.name];
          type = compoundFieldItem.field.type;

          if (["lookup", "master_detail"].indexOf(type) > -1) {
            reference_to = compoundFieldItem.field.reference_to;
            compoundFilterFields = {};
            compoundFilterFields[compoundFieldItem.childKey] = 1;
            referenceItem = Creator.getCollection(reference_to).findOne({
              _id: itemValue
            }, {
              fields: compoundFilterFields
            });

            if (referenceItem) {
              item[itemKey] = referenceItem[compoundFieldItem.childKey];
            }
          } else if (type === "select") {
            options = compoundFieldItem.field.options;
            item[itemKey] = ((ref1 = _.findWhere(options, {
              value: itemValue
            })) != null ? ref1.label : void 0) || itemValue;
          } else {
            item[itemKey] = itemValue;
          }

          if (!item[itemKey]) {
            return item[itemKey] = "--";
          }
        });

        return item;
      });
      return result;
    } else {
      return result;
    }
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"user_tabular_settings.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_creator/server/methods/user_tabular_settings.coffee                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
/*
    type: "user"
    object_name: "object_listviews"
    record_id: "{object_name},{listview_id}"
    settings:
        column_width: { field_a: 100, field_2: 150 }
        sort: [["field_a", "desc"]]
    owner: {userId}
 */Meteor.methods({
  "tabular_sort_settings": function (object_name, list_view_id, sort) {
    var doc, obj, setting, userId;
    userId = this.userId;
    setting = Creator.Collections.settings.findOne({
      object_name: object_name,
      record_id: "object_listviews",
      owner: userId
    });

    if (setting) {
      return Creator.Collections.settings.update({
        _id: setting._id
      }, {
        $set: (obj = {}, obj["settings." + list_view_id + ".sort"] = sort, obj)
      });
    } else {
      doc = {
        type: "user",
        object_name: object_name,
        record_id: "object_listviews",
        settings: {},
        owner: userId
      };
      doc.settings[list_view_id] = {};
      doc.settings[list_view_id].sort = sort;
      return Creator.Collections.settings.insert(doc);
    }
  },
  "tabular_column_width_settings": function (object_name, list_view_id, column_width) {
    var doc, obj, setting, userId;
    userId = this.userId;
    setting = Creator.Collections.settings.findOne({
      object_name: object_name,
      record_id: "object_listviews",
      owner: userId
    });

    if (setting) {
      return Creator.Collections.settings.update({
        _id: setting._id
      }, {
        $set: (obj = {}, obj["settings." + list_view_id + ".column_width"] = column_width, obj)
      });
    } else {
      doc = {
        type: "user",
        object_name: object_name,
        record_id: "object_listviews",
        settings: {},
        owner: userId
      };
      doc.settings[list_view_id] = {};
      doc.settings[list_view_id].column_width = column_width;
      return Creator.Collections.settings.insert(doc);
    }
  },
  "grid_settings": function (object_name, list_view_id, column_width, sort) {
    var doc, obj, obj1, ref, ref1, setting, userId;
    userId = this.userId;
    setting = Creator.Collections.settings.findOne({
      object_name: object_name,
      record_id: "object_gridviews",
      owner: userId
    });

    if (setting) {
      column_width._id_actions = ((ref = setting.settings["" + list_view_id]) != null ? (ref1 = ref.column_width) != null ? ref1._id_actions : void 0 : void 0) === 46 ? 47 : 46;

      if (sort) {
        return Creator.Collections.settings.update({
          _id: setting._id
        }, {
          $set: (obj = {}, obj["settings." + list_view_id + ".sort"] = sort, obj["settings." + list_view_id + ".column_width"] = column_width, obj)
        });
      } else {
        return Creator.Collections.settings.update({
          _id: setting._id
        }, {
          $set: (obj1 = {}, obj1["settings." + list_view_id + ".column_width"] = column_width, obj1)
        });
      }
    } else {
      doc = {
        type: "user",
        object_name: object_name,
        record_id: "object_gridviews",
        settings: {},
        owner: userId
      };
      doc.settings[list_view_id] = {};
      doc.settings[list_view_id].column_width = column_width;
      doc.settings[list_view_id].sort = sort;
      return Creator.Collections.settings.insert(doc);
    }
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"object_export2xml.coffee":function module(require){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_creator/server/methods/object_export2xml.coffee                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var _mixFieldsData, _mixRelatedData, _writeXmlFile, fs, logger, mkdirp, path, xml2js;

xml2js = require('xml2js');
fs = require('fs');
path = require('path');
mkdirp = require('mkdirp');
logger = new Logger('Export_TO_XML');

_writeXmlFile = function (jsonObj, objName) {
  var builder, day, fileAddress, fileName, filePath, month, now, stream, xml, year;
  builder = new xml2js.Builder();
  xml = builder.buildObject(jsonObj);
  stream = new Buffer(xml);
  now = new Date();
  year = now.getFullYear();
  month = now.getMonth() + 1;
  day = now.getDate();
  filePath = path.join(__meteor_bootstrap__.serverDir, '../../../export/' + year + '/' + month + '/' + day + '/' + objName);
  fileName = (jsonObj != null ? jsonObj._id : void 0) + ".xml";
  fileAddress = path.join(filePath, fileName);

  if (!fs.existsSync(filePath)) {
    mkdirp.sync(filePath);
  }

  fs.writeFile(fileAddress, stream, function (err) {
    if (err) {
      return logger.error(jsonObj._id + "写入xml文件失败", err);
    }
  });
  return filePath;
};

_mixFieldsData = function (obj, objName) {
  var jsonObj, mixBool, mixDate, mixDefault, objFields, ref;
  jsonObj = {};
  objFields = typeof Creator !== "undefined" && Creator !== null ? (ref = Creator.getObject(objName)) != null ? ref.fields : void 0 : void 0;

  mixDefault = function (field_name) {
    return jsonObj[field_name] = obj[field_name] || "";
  };

  mixDate = function (field_name, type) {
    var date, dateStr, format;
    date = obj[field_name];

    if (type === "date") {
      format = "YYYY-MM-DD";
    } else {
      format = "YYYY-MM-DD HH:mm:ss";
    }

    if (date != null && format != null) {
      dateStr = moment(date).format(format);
    }

    return jsonObj[field_name] = dateStr || "";
  };

  mixBool = function (field_name) {
    if (obj[field_name] === true) {
      return jsonObj[field_name] = "是";
    } else if (obj[field_name] === false) {
      return jsonObj[field_name] = "否";
    } else {
      return jsonObj[field_name] = "";
    }
  };

  _.each(objFields, function (field, field_name) {
    switch (field != null ? field.type : void 0) {
      case "date":
      case "datetime":
        return mixDate(field_name, field.type);

      case "boolean":
        return mixBool(field_name);

      default:
        return mixDefault(field_name);
    }
  });

  return jsonObj;
};

_mixRelatedData = function (obj, objName) {
  var relatedObjNames, related_objects;
  related_objects = {};
  relatedObjNames = typeof Creator !== "undefined" && Creator !== null ? Creator.getAllRelatedObjects(objName) : void 0;
  relatedObjNames.forEach(function (relatedObjName) {
    var fields, obj1, ref, relatedCollection, relatedRecordList, relatedTableData, related_field_name;
    relatedTableData = [];

    if (relatedObjName === "cms_files") {
      related_field_name = "parent.ids";
    } else {
      fields = typeof Creator !== "undefined" && Creator !== null ? (ref = Creator.Objects[relatedObjName]) != null ? ref.fields : void 0 : void 0;
      related_field_name = "";

      _.each(fields, function (field, field_name) {
        if ((field != null ? field.reference_to : void 0) === objName) {
          return related_field_name = field_name;
        }
      });
    }

    if (related_field_name) {
      relatedCollection = Creator.getCollection(relatedObjName);
      relatedRecordList = relatedCollection.find((obj1 = {}, obj1["" + related_field_name] = obj._id, obj1)).fetch();
      relatedRecordList.forEach(function (relatedObj) {
        var fieldsData;
        fieldsData = _mixFieldsData(relatedObj, relatedObjName);
        return relatedTableData.push(fieldsData);
      });
    }

    return related_objects[relatedObjName] = relatedTableData;
  });
  return related_objects;
};

Creator.Export2xml = function (objName, recordList) {
  var collection;
  logger.info("Run Creator.Export2xml");
  console.time("Creator.Export2xml");
  collection = Creator.getCollection(objName);
  recordList = collection.find({}).fetch();
  recordList.forEach(function (recordObj) {
    var fieldsData, filePath, jsonObj, related_objects;
    jsonObj = {};
    jsonObj._id = recordObj._id;
    fieldsData = _mixFieldsData(recordObj, objName);
    jsonObj[objName] = fieldsData;
    related_objects = _mixRelatedData(recordObj, objName);
    jsonObj["related_objects"] = related_objects;
    return filePath = _writeXmlFile(jsonObj, objName);
  });
  console.timeEnd("Creator.Export2xml");
  return filePath;
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"related_objects_records.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_creator/server/methods/related_objects_records.coffee                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.methods({
  related_objects_records: function (object_name, related_object_name, related_field_name, record_id, spaceId) {
    var permissions, related_records, selector, userId;
    userId = this.userId;

    if (related_object_name === "cfs.files.filerecord") {
      selector = {
        "metadata.space": spaceId
      };
    } else {
      selector = {
        space: spaceId
      };
    }

    if (related_object_name === "cms_files") {
      selector["parent.o"] = object_name;
      selector["parent.ids"] = [record_id];
    } else {
      selector[related_field_name] = record_id;
    }

    permissions = Creator.getPermissions(related_object_name, spaceId, userId);

    if (!permissions.viewAllRecords && permissions.allowRead) {
      selector.owner = userId;
    }

    related_records = Creator.getCollection(related_object_name).find(selector);
    return related_records.count();
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"pending_space.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_creator/server/methods/pending_space.coffee                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.methods({
  getPendingSpaceInfo: function (inviterId, spaceId) {
    var inviterName, spaceName;
    inviterName = db.users.findOne({
      _id: inviterId
    }).name;
    spaceName = db.spaces.findOne({
      _id: spaceId
    }).name;
    return {
      inviter: inviterName,
      space: spaceName
    };
  },
  refuseJoinSpace: function (_id) {
    return db.space_users.direct.update({
      _id: _id
    }, {
      $set: {
        invite_state: "refused"
      }
    });
  },
  acceptJoinSpace: function (_id) {
    return db.space_users.direct.update({
      _id: _id
    }, {
      $set: {
        invite_state: "accepted",
        user_accepted: true
      }
    });
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"publications":{"object.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_creator/server/publications/object.coffee                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.publish("creator_object_record", function (object_name, id, space_id) {
  var collection;
  collection = Creator.getCollection(object_name, space_id);

  if (collection) {
    return collection.find({
      _id: id
    });
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"object_tabular.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_creator/server/publications/object_tabular.coffee                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.publishComposite("steedos_object_tabular", function (tableName, ids, fields, spaceId) {
  var _fields, _keys, _object, _object_name, data, keys, object_colleciton, reference_fields, self;

  if (!this.userId) {
    return this.ready();
  }

  check(tableName, String);
  check(ids, Array);
  check(fields, Match.Optional(Object));
  _object_name = tableName.replace("creator_", "");
  _object = Creator.getObject(_object_name, spaceId);

  if (spaceId) {
    _object_name = Creator.getObjectName(_object);
  }

  object_colleciton = Creator.getCollection(_object_name);
  _fields = _object != null ? _object.fields : void 0;

  if (!_fields || !object_colleciton) {
    return this.ready();
  }

  reference_fields = _.filter(_fields, function (f) {
    return _.isFunction(f.reference_to) || !_.isEmpty(f.reference_to);
  });
  self = this;
  self.unblock();

  if (reference_fields.length > 0) {
    data = {
      find: function () {
        var field_keys;
        self.unblock();
        field_keys = {};

        _.each(_.keys(fields), function (f) {
          if (!/\w+(\.\$){1}\w?/.test(f)) {
            return field_keys[f] = 1;
          }
        });

        return object_colleciton.find({
          _id: {
            $in: ids
          }
        }, {
          fields: field_keys
        });
      }
    };
    data.children = [];
    keys = _.keys(fields);

    if (keys.length < 1) {
      keys = _.keys(_fields);
    }

    _keys = [];
    keys.forEach(function (key) {
      if (_object.schema._objectKeys[key + '.']) {
        _keys = _keys.concat(_.map(_object.schema._objectKeys[key + '.'], function (k) {
          return key + '.' + k;
        }));
      }

      return _keys.push(key);
    });

    _keys.forEach(function (key) {
      var reference_field;
      reference_field = _fields[key];

      if (reference_field && (_.isFunction(reference_field.reference_to) || !_.isEmpty(reference_field.reference_to))) {
        return data.children.push({
          find: function (parent) {
            var children_fields, e, name_field_key, p_k, query, reference_ids, reference_to, reference_to_object, s_k;

            try {
              self.unblock();
              query = {};

              if (/\w+(\.\$\.){1}\w+/.test(key)) {
                p_k = key.replace(/(\w+)\.\$\.\w+/ig, "$1");
                s_k = key.replace(/\w+\.\$\.(\w+)/ig, "$1");
                reference_ids = parent[p_k].getProperty(s_k);
              } else {
                reference_ids = key.split('.').reduce(function (o, x) {
                  return o != null ? o[x] : void 0;
                }, parent);
              }

              reference_to = reference_field.reference_to;

              if (_.isFunction(reference_to)) {
                reference_to = reference_to();
              }

              if (_.isArray(reference_to)) {
                if (_.isObject(reference_ids) && !_.isArray(reference_ids)) {
                  reference_to = reference_ids.o;
                  reference_ids = reference_ids.ids || [];
                } else {
                  return [];
                }
              }

              if (_.isArray(reference_ids)) {
                query._id = {
                  $in: reference_ids
                };
              } else {
                query._id = reference_ids;
              }

              reference_to_object = Creator.getObject(reference_to, spaceId);
              name_field_key = reference_to_object.NAME_FIELD_KEY;
              children_fields = {
                _id: 1,
                space: 1
              };

              if (name_field_key) {
                children_fields[name_field_key] = 1;
              }

              return Creator.getCollection(reference_to, spaceId).find(query, {
                fields: children_fields
              });
            } catch (error) {
              e = error;
              console.log(reference_to, parent, e);
              return [];
            }
          }
        });
      }
    });

    return data;
  } else {
    return {
      find: function () {
        self.unblock();
        return object_colleciton.find({
          _id: {
            $in: ids
          }
        }, {
          fields: fields
        });
      }
    };
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"object_listviews.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_creator/server/publications/object_listviews.coffee                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.publish("object_listviews", function (object_name, spaceId) {
  var userId;
  userId = this.userId;
  return Creator.getCollection("object_listviews").find({
    object_name: object_name,
    space: spaceId,
    "$or": [{
      owner: userId
    }, {
      shared: true
    }]
  });
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"user_tabular_settings.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_creator/server/publications/user_tabular_settings.coffee                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.publish("user_tabular_settings", function (object_name) {
  var userId;
  userId = this.userId;
  return Creator.Collections.settings.find({
    object_name: {
      $in: object_name
    },
    record_id: {
      $in: ["object_listviews", "object_gridviews"]
    },
    owner: userId
  });
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"related_objects_records.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_creator/server/publications/related_objects_records.coffee                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.publish("related_objects_records", function (object_name, related_object_name, related_field_name, record_id, spaceId) {
  var permissions, selector, userId;
  userId = this.userId;

  if (related_object_name === "cfs.files.filerecord") {
    selector = {
      "metadata.space": spaceId
    };
  } else {
    selector = {
      space: spaceId
    };
  }

  if (related_object_name === "cms_files") {
    selector["parent.o"] = object_name;
    selector["parent.ids"] = [record_id];
  } else {
    selector[related_field_name] = record_id;
  }

  permissions = Creator.getPermissions(related_object_name, spaceId, userId);

  if (!permissions.viewAllRecords && permissions.allowRead) {
    selector.owner = userId;
  }

  return Creator.getCollection(related_object_name).find(selector);
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"space_user_info.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_creator/server/publications/space_user_info.coffee                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.publish('space_user_info', function (spaceId, userId) {
  return Creator.getCollection("space_users").find({
    space: spaceId,
    user: userId
  });
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"contacts_view_limits.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_creator/server/publications/contacts_view_limits.coffee                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
if (Meteor.isServer) {
  Meteor.publish('contacts_view_limits', function (spaceId) {
    var selector;

    if (!this.userId) {
      return this.ready();
    }

    if (!spaceId) {
      return this.ready();
    }

    selector = {
      space: spaceId,
      key: 'contacts_view_limits'
    };
    return db.space_settings.find(selector);
  });
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"contacts_no_force_phone_users.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_creator/server/publications/contacts_no_force_phone_users.coffee                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
if (Meteor.isServer) {
  Meteor.publish('contacts_no_force_phone_users', function (spaceId) {
    var selector;

    if (!this.userId) {
      return this.ready();
    }

    if (!spaceId) {
      return this.ready();
    }

    selector = {
      space: spaceId,
      key: 'contacts_no_force_phone_users'
    };
    return db.space_settings.find(selector);
  });
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"space_need_to_confirm.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_creator/server/publications/space_need_to_confirm.coffee                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
if (Meteor.isServer) {
  Meteor.publish('space_need_to_confirm', function () {
    var userId;
    userId = this.userId;
    return db.space_users.find({
      user: userId,
      invite_state: "pending"
    });
  });
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"lib":{"permission_manager.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_creator/server/lib/permission_manager.coffee                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
permissionManagerForInitApproval = {};

permissionManagerForInitApproval.getFlowPermissions = function (flow_id, user_id) {
  var flow, my_permissions, org_ids, organizations, orgs_can_add, orgs_can_admin, orgs_can_monitor, space_id, users_can_add, users_can_admin, users_can_monitor;
  flow = uuflowManagerForInitApproval.getFlow(flow_id);
  space_id = flow.space;
  org_ids = new Array();
  organizations = db.organizations.find({
    space: space_id,
    users: user_id
  }, {
    fields: {
      parents: 1
    }
  }).fetch();

  _.each(organizations, function (org) {
    org_ids.push(org._id);

    if (org.parents) {
      return _.each(org.parents, function (parent_id) {
        return org_ids.push(parent_id);
      });
    }
  });

  org_ids = _.uniq(org_ids);
  my_permissions = new Array();

  if (flow.perms) {
    if (flow.perms.users_can_add) {
      users_can_add = flow.perms.users_can_add;

      if (users_can_add.includes(user_id)) {
        my_permissions.push("add");
      }
    }

    if (flow.perms.orgs_can_add) {
      orgs_can_add = flow.perms.orgs_can_add;

      _.each(org_ids, function (org_id) {
        if (orgs_can_add.includes(org_id)) {
          return my_permissions.push("add");
        }
      });
    }

    if (flow.perms.users_can_monitor) {
      users_can_monitor = flow.perms.users_can_monitor;

      if (users_can_monitor.includes(user_id)) {
        my_permissions.push("monitor");
      }
    }

    if (flow.perms.orgs_can_monitor) {
      orgs_can_monitor = flow.perms.orgs_can_monitor;

      _.each(org_ids, function (org_id) {
        if (orgs_can_monitor.includes(org_id)) {
          return my_permissions.push("monitor");
        }
      });
    }

    if (flow.perms.users_can_admin) {
      users_can_admin = flow.perms.users_can_admin;

      if (users_can_admin.includes(user_id)) {
        my_permissions.push("admin");
      }
    }

    if (flow.perms.orgs_can_admin) {
      orgs_can_admin = flow.perms.orgs_can_admin;

      _.each(org_ids, function (org_id) {
        if (orgs_can_admin.includes(org_id)) {
          return my_permissions.push("admin");
        }
      });
    }
  }

  my_permissions = _.uniq(my_permissions);
  return my_permissions;
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"uuflowManagerForInitApproval.coffee":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_creator/server/lib/uuflowManagerForInitApproval.coffee                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var _eval, getObjectConfig, getObjectNameFieldKey, getRelateds, objectFind, objectFindOne, objectUpdate, objectql;

_eval = require('eval');
objectql = require('@steedos/objectql');

getObjectConfig = function (objectApiName) {
  return objectql.getObject(objectApiName).toConfig();
};

getObjectNameFieldKey = function (objectApiName) {
  return objectql.getObject(objectApiName).NAME_FIELD_KEY;
};

getRelateds = function (objectApiName) {
  return Meteor.wrapAsync(function (objectApiName, cb) {
    return objectql.getObject(objectApiName).getRelateds().then(function (resolve, reject) {
      return cb(reject, resolve);
    });
  })(objectApiName);
};

objectFindOne = function (objectApiName, query) {
  return Meteor.wrapAsync(function (objectApiName, query, cb) {
    return objectql.getObject(objectApiName).find(query).then(function (resolve, reject) {
      if (resolve && resolve.length > 0) {
        return cb(reject, resolve[0]);
      } else {
        return cb(reject, null);
      }
    });
  })(objectApiName, query);
};

objectFind = function (objectApiName, query) {
  return Meteor.wrapAsync(function (objectApiName, query, cb) {
    return objectql.getObject(objectApiName).find(query).then(function (resolve, reject) {
      return cb(reject, resolve);
    });
  })(objectApiName, query);
};

objectUpdate = function (objectApiName, id, data) {
  return Meteor.wrapAsync(function (objectApiName, id, data, cb) {
    return objectql.getObject(objectApiName).update(id, data).then(function (resolve, reject) {
      return cb(reject, resolve);
    });
  })(objectApiName, id, data);
};

uuflowManagerForInitApproval = {};

uuflowManagerForInitApproval.check_authorization = function (req) {
  var authToken, hashedToken, query, user, userId;
  query = req.query;
  userId = query["X-User-Id"];
  authToken = query["X-Auth-Token"];

  if (!userId || !authToken) {
    throw new Meteor.Error(401, 'Unauthorized');
  }

  hashedToken = Accounts._hashLoginToken(authToken);
  user = Meteor.users.findOne({
    _id: userId,
    "services.resume.loginTokens.hashedToken": hashedToken
  });

  if (!user) {
    throw new Meteor.Error(401, 'Unauthorized');
  }

  return user;
};

uuflowManagerForInitApproval.getSpace = function (space_id) {
  var space;
  space = Creator.Collections.spaces.findOne(space_id);

  if (!space) {
    throw new Meteor.Error('error!', "space_id有误或此space已经被删除");
  }

  return space;
};

uuflowManagerForInitApproval.getFlow = function (flow_id) {
  var flow;
  flow = Creator.Collections.flows.findOne(flow_id);

  if (!flow) {
    throw new Meteor.Error('error!', "id有误或此流程已经被删除");
  }

  return flow;
};

uuflowManagerForInitApproval.getSpaceUser = function (space_id, user_id) {
  var space_user;
  space_user = Creator.Collections.space_users.findOne({
    space: space_id,
    user: user_id
  });

  if (!space_user) {
    throw new Meteor.Error('error!', "user_id对应的用户不属于当前space");
  }

  return space_user;
};

uuflowManagerForInitApproval.getSpaceUserOrgInfo = function (space_user) {
  var info, org;
  info = new Object();
  info.organization = space_user.organization;
  org = Creator.Collections.organizations.findOne(space_user.organization, {
    fields: {
      name: 1,
      fullname: 1
    }
  });
  info.organization_name = org.name;
  info.organization_fullname = org.fullname;
  return info;
};

uuflowManagerForInitApproval.isFlowEnabled = function (flow) {
  if (flow.state !== "enabled") {
    throw new Meteor.Error('error!', "流程未启用,操作失败");
  }
};

uuflowManagerForInitApproval.isFlowSpaceMatched = function (flow, space_id) {
  if (flow.space !== space_id) {
    throw new Meteor.Error('error!', "流程和工作区ID不匹配");
  }
};

uuflowManagerForInitApproval.getForm = function (form_id) {
  var form;
  form = Creator.Collections.forms.findOne(form_id);

  if (!form) {
    throw new Meteor.Error('error!', '表单ID有误或此表单已经被删除');
  }

  return form;
};

uuflowManagerForInitApproval.getCategory = function (category_id) {
  return Creator.Collections.categories.findOne(category_id);
};

uuflowManagerForInitApproval.checkSyncDirection = function (object_name, flow_id) {
  var ow, syncDirection;
  ow = Creator.Collections.object_workflows.findOne({
    object_name: object_name,
    flow_id: flow_id
  });

  if (!ow) {
    throw new Meteor.Error('error!', '未找到对象流程映射记录。');
  }

  syncDirection = ow.sync_direction || 'both';

  if (!['both', 'obj_to_ins'].includes(syncDirection)) {
    throw new Meteor.Error('error!', '不支持的同步方向。');
  }
};

uuflowManagerForInitApproval.create_instance = function (instance_from_client, user_info) {
  var appr_obj, approve_from_client, category, flow, flow_id, form, ins_obj, new_ins_id, now, permissions, relatedTablesInfo, space, space_id, space_user, space_user_org_info, start_step, trace_from_client, trace_obj, user_id;
  check(instance_from_client["applicant"], String);
  check(instance_from_client["space"], String);
  check(instance_from_client["flow"], String);
  check(instance_from_client["record_ids"], [{
    o: String,
    ids: [String]
  }]);
  uuflowManagerForInitApproval.checkSyncDirection(instance_from_client["record_ids"][0].o, instance_from_client["flow"]);
  uuflowManagerForInitApproval.checkIsInApproval(instance_from_client["record_ids"][0], instance_from_client["space"]);
  space_id = instance_from_client["space"];
  flow_id = instance_from_client["flow"];
  user_id = user_info._id;
  trace_from_client = null;
  approve_from_client = null;

  if (instance_from_client["traces"] && instance_from_client["traces"][0]) {
    trace_from_client = instance_from_client["traces"][0];

    if (trace_from_client["approves"] && trace_from_client["approves"][0]) {
      approve_from_client = instance_from_client["traces"][0]["approves"][0];
    }
  }

  space = uuflowManagerForInitApproval.getSpace(space_id);
  flow = uuflowManagerForInitApproval.getFlow(flow_id);
  space_user = uuflowManagerForInitApproval.getSpaceUser(space_id, user_id);
  space_user_org_info = uuflowManagerForInitApproval.getSpaceUserOrgInfo(space_user);
  uuflowManagerForInitApproval.isFlowEnabled(flow);
  uuflowManagerForInitApproval.isFlowSpaceMatched(flow, space_id);
  form = uuflowManagerForInitApproval.getForm(flow.form);
  permissions = permissionManager.getFlowPermissions(flow_id, user_id);

  if (!permissions.includes("add")) {
    throw new Meteor.Error('error!', "当前用户没有此流程的新建权限");
  }

  now = new Date();
  ins_obj = {};
  ins_obj._id = Creator.Collections.instances._makeNewID();
  ins_obj.space = space_id;
  ins_obj.flow = flow_id;
  ins_obj.flow_version = flow.current._id;
  ins_obj.form = flow.form;
  ins_obj.form_version = flow.current.form_version;
  ins_obj.name = flow.name;
  ins_obj.submitter = user_id;
  ins_obj.submitter_name = user_info.name;
  ins_obj.applicant = instance_from_client["applicant"] ? instance_from_client["applicant"] : user_id;
  ins_obj.applicant_name = instance_from_client["applicant_name"] ? instance_from_client["applicant_name"] : user_info.name;
  ins_obj.applicant_organization = instance_from_client["applicant_organization"] ? instance_from_client["applicant_organization"] : space_user.organization;
  ins_obj.applicant_organization_name = instance_from_client["applicant_organization_name"] ? instance_from_client["applicant_organization_name"] : space_user_org_info.organization_name;
  ins_obj.applicant_organization_fullname = instance_from_client["applicant_organization_fullname"] ? instance_from_client["applicant_organization_fullname"] : space_user_org_info.organization_fullname;
  ins_obj.applicant_company = instance_from_client["applicant_company"] ? instance_from_client["applicant_company"] : space_user.company_id;
  ins_obj.state = 'draft';
  ins_obj.code = '';
  ins_obj.is_archived = false;
  ins_obj.is_deleted = false;
  ins_obj.created = now;
  ins_obj.created_by = user_id;
  ins_obj.modified = now;
  ins_obj.modified_by = user_id;
  ins_obj.record_ids = instance_from_client["record_ids"];

  if (space_user.company_id) {
    ins_obj.company_id = space_user.company_id;
  }

  trace_obj = {};
  trace_obj._id = new Mongo.ObjectID()._str;
  trace_obj.instance = ins_obj._id;
  trace_obj.is_finished = false;
  start_step = _.find(flow.current.steps, function (step) {
    return step.step_type === 'start';
  });
  trace_obj.step = start_step._id;
  trace_obj.name = start_step.name;
  trace_obj.start_date = now;
  appr_obj = {};
  appr_obj._id = new Mongo.ObjectID()._str;
  appr_obj.instance = ins_obj._id;
  appr_obj.trace = trace_obj._id;
  appr_obj.is_finished = false;
  appr_obj.user = instance_from_client["applicant"] ? instance_from_client["applicant"] : user_id;
  appr_obj.user_name = instance_from_client["applicant_name"] ? instance_from_client["applicant_name"] : user_info.name;
  appr_obj.handler = user_id;
  appr_obj.handler_name = user_info.name;
  appr_obj.handler_organization = space_user.organization;
  appr_obj.handler_organization_name = space_user_org_info.name;
  appr_obj.handler_organization_fullname = space_user_org_info.fullname;
  appr_obj.type = 'draft';
  appr_obj.start_date = now;
  appr_obj.read_date = now;
  appr_obj.is_read = true;
  appr_obj.is_error = false;
  appr_obj.description = '';
  relatedTablesInfo = {};
  appr_obj.values = uuflowManagerForInitApproval.initiateValues(ins_obj.record_ids[0], flow_id, space_id, form.current.fields, relatedTablesInfo);
  trace_obj.approves = [appr_obj];
  ins_obj.traces = [trace_obj];
  ins_obj.values = appr_obj.values;
  ins_obj.inbox_users = instance_from_client.inbox_users || [];
  ins_obj.current_step_name = start_step.name;

  if (flow.auto_remind === true) {
    ins_obj.auto_remind = true;
  }

  ins_obj.flow_name = flow.name;

  if (form.category) {
    category = uuflowManagerForInitApproval.getCategory(form.category);

    if (category) {
      ins_obj.category_name = category.name;
      ins_obj.category = category._id;
    }
  }

  new_ins_id = Creator.Collections.instances.insert(ins_obj);
  uuflowManagerForInitApproval.initiateRecordInstanceInfo(ins_obj.record_ids[0], new_ins_id, space_id);
  uuflowManagerForInitApproval.initiateAttach(ins_obj.record_ids[0], space_id, ins_obj._id, appr_obj._id);
  return new_ins_id;
};

uuflowManagerForInitApproval.initiateValues = function (recordIds, flowId, spaceId, fields, relatedTablesInfo) {
  var fieldCodes, filterValues, flow, form, formFields, formTableFields, formTableFieldsCode, getFieldOdataValue, getFormField, getFormTableField, getFormTableFieldCode, getFormTableSubField, getRelatedObjectFieldCode, getSelectOrgValue, getSelectOrgValues, getSelectUserValue, getSelectUserValues, object, objectName, ow, record, recordId, ref, relatedObjects, relatedObjectsKeys, tableFieldCodes, tableFieldMap, tableToRelatedMap, values;
  fieldCodes = [];

  _.each(fields, function (f) {
    if (f.type === 'section') {
      return _.each(f.fields, function (ff) {
        return fieldCodes.push(ff.code);
      });
    } else {
      return fieldCodes.push(f.code);
    }
  });

  values = {};
  objectName = recordIds.o;
  object = getObjectConfig(objectName);
  recordId = recordIds.ids[0];
  ow = Creator.Collections.object_workflows.findOne({
    object_name: objectName,
    flow_id: flowId
  });
  record = objectFindOne(objectName, {
    filters: [['_id', '=', recordId]]
  });
  flow = Creator.getCollection('flows').findOne(flowId, {
    fields: {
      form: 1
    }
  });

  if (ow && record) {
    form = Creator.getCollection("forms").findOne(flow.form);
    formFields = form.current.fields || [];
    relatedObjects = getRelateds(objectName);
    relatedObjectsKeys = _.pluck(relatedObjects, 'object_name');
    formTableFields = _.filter(formFields, function (formField) {
      return formField.type === 'table';
    });
    formTableFieldsCode = _.pluck(formTableFields, 'code');

    getRelatedObjectFieldCode = function (key) {
      return _.find(relatedObjectsKeys, function (relatedObjectsKey) {
        return key.startsWith(relatedObjectsKey + '.');
      });
    };

    getFormTableFieldCode = function (key) {
      return _.find(formTableFieldsCode, function (formTableFieldCode) {
        return key.startsWith(formTableFieldCode + '.');
      });
    };

    getFormTableField = function (key) {
      return _.find(formTableFields, function (f) {
        return f.code === key;
      });
    };

    getFormField = function (key) {
      var ff;
      ff = null;

      _.forEach(formFields, function (f) {
        if (ff) {
          return;
        }

        if (f.type === 'section') {
          return ff = _.find(f.fields, function (sf) {
            return sf.code === key;
          });
        } else if (f.code === key) {
          return ff = f;
        }
      });

      return ff;
    };

    getFormTableSubField = function (tableField, subFieldCode) {
      return _.find(tableField.fields, function (f) {
        return f.code === subFieldCode;
      });
    };

    getFieldOdataValue = function (objName, id) {
      var _record, _records, nameKey, obj;

      obj = objectql.getObject(objName);
      nameKey = getObjectNameFieldKey(objName);

      if (!obj) {
        return;
      }

      if (_.isString(id)) {
        _record = objectFindOne(objName, {
          filters: [['_id', '=', id]]
        });

        if (_record) {
          _record['@label'] = _record[nameKey];
          return _record;
        }
      } else if (_.isArray(id)) {
        _records = [];
        objectFind(objName, {
          filters: [['_id', 'in', id]]
        }).forEach(function (_record) {
          _record['@label'] = _record[nameKey];
          return _records.push(_record);
        });

        if (!_.isEmpty(_records)) {
          return _records;
        }
      }
    };

    getSelectUserValue = function (userId, spaceId) {
      var su;
      su = Creator.getCollection('space_users').findOne({
        space: spaceId,
        user: userId
      });
      su.id = userId;
      return su;
    };

    getSelectUserValues = function (userIds, spaceId) {
      var sus;
      sus = [];

      if (_.isArray(userIds)) {
        _.each(userIds, function (userId) {
          var su;
          su = getSelectUserValue(userId, spaceId);

          if (su) {
            return sus.push(su);
          }
        });
      }

      return sus;
    };

    getSelectOrgValue = function (orgId, spaceId) {
      var org;
      org = Creator.getCollection('organizations').findOne(orgId, {
        fields: {
          _id: 1,
          name: 1,
          fullname: 1
        }
      });
      org.id = orgId;
      return org;
    };

    getSelectOrgValues = function (orgIds, spaceId) {
      var orgs;
      orgs = [];

      if (_.isArray(orgIds)) {
        _.each(orgIds, function (orgId) {
          var org;
          org = getSelectOrgValue(orgId, spaceId);

          if (org) {
            return orgs.push(org);
          }
        });
      }

      return orgs;
    };

    tableFieldCodes = [];
    tableFieldMap = [];
    tableToRelatedMap = {};

    if ((ref = ow.field_map) != null) {
      ref.forEach(function (fm) {
        var formField, formTableFieldCode, gridCode, lookupFieldName, lookupFieldObj, lookupObjectRecord, lookupSelectFieldValue, oTableCode, oTableCodeReferenceField, oTableCodeReferenceFieldCode, oTableFieldCode, objField, objectField, objectFieldName, objectFieldObjectName, objectLookupField, object_field, odataFieldValue, referenceToDoc, referenceToFieldValue, referenceToObjectName, relatedObjectFieldCode, selectFieldValue, tableToRelatedMapKey, wTableCode, workflow_field;
        object_field = fm.object_field;
        workflow_field = fm.workflow_field;

        if (!object_field || !workflow_field) {
          throw new Meteor.Error(400, '未找到字段，请检查对象流程映射字段配置');
        }

        relatedObjectFieldCode = getRelatedObjectFieldCode(object_field);
        formTableFieldCode = getFormTableFieldCode(workflow_field);
        objField = object.fields[object_field];
        formField = getFormField(workflow_field);

        if (relatedObjectFieldCode) {
          oTableCode = object_field.split('.')[0];
          oTableFieldCode = object_field.split('.')[1];
          tableToRelatedMapKey = oTableCode;

          if (!tableToRelatedMap[tableToRelatedMapKey]) {
            tableToRelatedMap[tableToRelatedMapKey] = {};
          }

          if (formTableFieldCode) {
            wTableCode = workflow_field.split('.')[0];
            tableToRelatedMap[tableToRelatedMapKey]['_FROM_TABLE_CODE'] = wTableCode;
          }

          return tableToRelatedMap[tableToRelatedMapKey][oTableFieldCode] = workflow_field;
        } else if (workflow_field.indexOf('.') > 0 && object_field.indexOf('.$.') > 0) {
          wTableCode = workflow_field.split('.')[0];
          oTableCode = object_field.split('.$.')[0];

          if (record.hasOwnProperty(oTableCode) && _.isArray(record[oTableCode])) {
            tableFieldCodes.push(JSON.stringify({
              workflow_table_field_code: wTableCode,
              object_table_field_code: oTableCode
            }));
            return tableFieldMap.push(fm);
          } else if (oTableCode.indexOf('.') > 0) {
            oTableCodeReferenceFieldCode = oTableCode.split('.')[0];
            gridCode = oTableCode.split('.')[1];
            oTableCodeReferenceField = object.fields[oTableCodeReferenceFieldCode];

            if (oTableCodeReferenceField && ['lookup', 'master_detail'].includes(oTableCodeReferenceField.type) && _.isString(oTableCodeReferenceField.reference_to)) {
              if (record[oTableCode]) {
                return;
              }

              referenceToObjectName = oTableCodeReferenceField.reference_to;
              referenceToFieldValue = record[oTableCodeReferenceField.name];
              referenceToDoc = getFieldOdataValue(referenceToObjectName, referenceToFieldValue);

              if (referenceToDoc[gridCode]) {
                record[oTableCode] = referenceToDoc[gridCode];
                tableFieldCodes.push(JSON.stringify({
                  workflow_table_field_code: wTableCode,
                  object_table_field_code: oTableCode
                }));
                return tableFieldMap.push(fm);
              }
            }
          }
        } else if (object_field.indexOf('.') > 0 && object_field.indexOf('.$.') === -1) {
          objectFieldName = object_field.split('.')[0];
          lookupFieldName = object_field.split('.')[1];

          if (object) {
            objectField = object.fields[objectFieldName];

            if (objectField && formField && ['lookup', 'master_detail'].includes(objectField.type) && _.isString(objectField.reference_to)) {
              lookupObjectRecord = objectFindOne(objectField.reference_to, {
                filters: [['_id', '=', record[objectFieldName]]],
                fields: [lookupFieldName]
              });

              if (!lookupObjectRecord) {
                return;
              }

              objectFieldObjectName = objectField.reference_to;
              lookupFieldObj = getObjectConfig(objectFieldObjectName);
              objectLookupField = lookupFieldObj.fields[lookupFieldName];
              referenceToFieldValue = lookupObjectRecord[lookupFieldName];

              if (objectLookupField && formField && formField.type === 'odata' && ['lookup', 'master_detail'].includes(objectLookupField.type) && _.isString(objectLookupField.reference_to)) {
                referenceToObjectName = objectLookupField.reference_to;
                odataFieldValue;

                if (objectField.multiple && formField.is_multiselect) {
                  odataFieldValue = getFieldOdataValue(referenceToObjectName, referenceToFieldValue);
                } else if (!objectField.multiple && !formField.is_multiselect) {
                  odataFieldValue = getFieldOdataValue(referenceToObjectName, referenceToFieldValue);
                }

                return values[workflow_field] = odataFieldValue;
              } else if (objectLookupField && formField && ['user', 'group'].includes(formField.type) && ['lookup', 'master_detail'].includes(objectLookupField.type) && ['users', 'organizations'].includes(objectLookupField.reference_to)) {
                if (!_.isEmpty(referenceToFieldValue)) {
                  lookupSelectFieldValue;

                  if (formField.type === 'user') {
                    if (objectLookupField.multiple && formField.is_multiselect) {
                      lookupSelectFieldValue = getSelectUserValues(referenceToFieldValue, spaceId);
                    } else if (!objectLookupField.multiple && !formField.is_multiselect) {
                      lookupSelectFieldValue = getSelectUserValue(referenceToFieldValue, spaceId);
                    }
                  } else if (formField.type === 'group') {
                    if (objectLookupField.multiple && formField.is_multiselect) {
                      lookupSelectFieldValue = getSelectOrgValues(referenceToFieldValue, spaceId);
                    } else if (!objectLookupField.multiple && !formField.is_multiselect) {
                      lookupSelectFieldValue = getSelectOrgValue(referenceToFieldValue, spaceId);
                    }
                  }

                  if (lookupSelectFieldValue) {
                    return values[workflow_field] = lookupSelectFieldValue;
                  }
                }
              } else {
                return values[workflow_field] = lookupObjectRecord[lookupFieldName];
              }
            }
          }
        } else if (formField && objField && formField.type === 'odata' && ['lookup', 'master_detail'].includes(objField.type) && _.isString(objField.reference_to)) {
          referenceToObjectName = objField.reference_to;
          referenceToFieldValue = record[objField.name];
          odataFieldValue;

          if (objField.multiple && formField.is_multiselect) {
            odataFieldValue = getFieldOdataValue(referenceToObjectName, referenceToFieldValue);
          } else if (!objField.multiple && !formField.is_multiselect) {
            odataFieldValue = getFieldOdataValue(referenceToObjectName, referenceToFieldValue);
          }

          return values[workflow_field] = odataFieldValue;
        } else if (formField && objField && ['user', 'group'].includes(formField.type) && ['lookup', 'master_detail'].includes(objField.type) && ['users', 'organizations'].includes(objField.reference_to)) {
          referenceToFieldValue = record[objField.name];

          if (!_.isEmpty(referenceToFieldValue)) {
            selectFieldValue;

            if (formField.type === 'user') {
              if (objField.multiple && formField.is_multiselect) {
                selectFieldValue = getSelectUserValues(referenceToFieldValue, spaceId);
              } else if (!objField.multiple && !formField.is_multiselect) {
                selectFieldValue = getSelectUserValue(referenceToFieldValue, spaceId);
              }
            } else if (formField.type === 'group') {
              if (objField.multiple && formField.is_multiselect) {
                selectFieldValue = getSelectOrgValues(referenceToFieldValue, spaceId);
              } else if (!objField.multiple && !formField.is_multiselect) {
                selectFieldValue = getSelectOrgValue(referenceToFieldValue, spaceId);
              }
            }

            if (selectFieldValue) {
              return values[workflow_field] = selectFieldValue;
            }
          }
        } else if (record.hasOwnProperty(object_field)) {
          return values[workflow_field] = record[object_field];
        }
      });
    }

    _.uniq(tableFieldCodes).forEach(function (tfc) {
      var c;
      c = JSON.parse(tfc);
      values[c.workflow_table_field_code] = [];
      return record[c.object_table_field_code].forEach(function (tr) {
        var newTr;
        newTr = {};

        _.each(tr, function (v, k) {
          return tableFieldMap.forEach(function (tfm) {
            var wTdCode;

            if (tfm.object_field === c.object_table_field_code + '.$.' + k) {
              wTdCode = tfm.workflow_field.split('.')[1];
              return newTr[wTdCode] = v;
            }
          });
        });

        if (!_.isEmpty(newTr)) {
          return values[c.workflow_table_field_code].push(newTr);
        }
      });
    });

    _.each(tableToRelatedMap, function (map, key) {
      var formTableField, relatedCollection, relatedField, relatedFieldName, relatedObject, relatedObjectName, relatedRecords, relatedTableItems, selector, tableCode, tableValues;
      tableCode = map._FROM_TABLE_CODE;
      formTableField = getFormTableField(tableCode);

      if (!tableCode) {
        return console.warn('tableToRelated: [' + key + '] missing corresponding table.');
      } else {
        relatedObjectName = key;
        tableValues = [];
        relatedTableItems = [];
        relatedObject = getObjectConfig(relatedObjectName);
        relatedField = _.find(relatedObject.fields, function (f) {
          return ['lookup', 'master_detail'].includes(f.type) && f.reference_to === objectName;
        });
        relatedFieldName = relatedField.name;
        selector = {};
        selector[relatedFieldName] = recordId;
        relatedCollection = Creator.getCollection(relatedObjectName, spaceId);
        relatedRecords = relatedCollection.find(selector);
        relatedRecords.forEach(function (rr) {
          var tableValueItem;
          tableValueItem = {};

          _.each(map, function (valueKey, fieldKey) {
            var formField, formFieldKey, referenceToFieldValue, referenceToObjectName, relatedObjectField, tableFieldValue;

            if (fieldKey !== '_FROM_TABLE_CODE') {
              tableFieldValue;
              formFieldKey;

              if (valueKey.startsWith(tableCode + '.')) {
                formFieldKey = valueKey.split(".")[1];
              } else {
                formFieldKey = valueKey;
              }

              formField = getFormTableSubField(formTableField, formFieldKey);
              relatedObjectField = relatedObject.fields[fieldKey];

              if (!formField || !relatedObjectField) {
                return;
              }

              if (formField.type === 'odata' && ['lookup', 'master_detail'].includes(relatedObjectField.type) && _.isString(relatedObjectField.reference_to)) {
                referenceToObjectName = relatedObjectField.reference_to;
                referenceToFieldValue = rr[fieldKey];

                if (relatedObjectField.multiple && formField.is_multiselect) {
                  tableFieldValue = getFieldOdataValue(referenceToObjectName, referenceToFieldValue);
                } else if (!relatedObjectField.multiple && !formField.is_multiselect) {
                  tableFieldValue = getFieldOdataValue(referenceToObjectName, referenceToFieldValue);
                }
              } else if (['user', 'group'].includes(formField.type) && ['lookup', 'master_detail'].includes(relatedObjectField.type) && ['users', 'organizations'].includes(relatedObjectField.reference_to)) {
                referenceToFieldValue = rr[fieldKey];

                if (!_.isEmpty(referenceToFieldValue)) {
                  if (formField.type === 'user') {
                    if (relatedObjectField.multiple && formField.is_multiselect) {
                      tableFieldValue = getSelectUserValues(referenceToFieldValue, spaceId);
                    } else if (!relatedObjectField.multiple && !formField.is_multiselect) {
                      tableFieldValue = getSelectUserValue(referenceToFieldValue, spaceId);
                    }
                  } else if (formField.type === 'group') {
                    if (relatedObjectField.multiple && formField.is_multiselect) {
                      tableFieldValue = getSelectOrgValues(referenceToFieldValue, spaceId);
                    } else if (!relatedObjectField.multiple && !formField.is_multiselect) {
                      tableFieldValue = getSelectOrgValue(referenceToFieldValue, spaceId);
                    }
                  }
                }
              } else {
                tableFieldValue = rr[fieldKey];
              }

              return tableValueItem[formFieldKey] = tableFieldValue;
            }
          });

          if (!_.isEmpty(tableValueItem)) {
            tableValueItem._id = rr._id;
            tableValues.push(tableValueItem);
            return relatedTableItems.push({
              _table: {
                _id: rr._id,
                _code: tableCode
              }
            });
          }
        });
        values[tableCode] = tableValues;
        return relatedTablesInfo[relatedObjectName] = relatedTableItems;
      }
    });

    if (ow.field_map_script) {
      _.extend(values, uuflowManagerForInitApproval.evalFieldMapScript(ow.field_map_script, objectName, spaceId, recordId));
    }
  }

  filterValues = {};

  _.each(_.keys(values), function (k) {
    if (fieldCodes.includes(k)) {
      return filterValues[k] = values[k];
    }
  });

  return filterValues;
};

uuflowManagerForInitApproval.evalFieldMapScript = function (field_map_script, objectName, spaceId, objectId) {
  var func, record, script, values;
  record = objectFindOne(objectName, {
    filters: [['_id', '=', objectId]]
  });
  script = "module.exports = function (record) { " + field_map_script + " }";
  func = _eval(script, "field_map_script");
  values = func(record);

  if (_.isObject(values)) {
    return values;
  } else {
    console.error("evalFieldMapScript: 脚本返回值类型不是对象");
  }

  return {};
};

uuflowManagerForInitApproval.initiateAttach = function (recordIds, spaceId, insId, approveId) {
  Creator.Collections['cms_files'].find({
    space: spaceId,
    parent: recordIds
  }).forEach(function (cf) {
    return _.each(cf.versions, function (versionId, idx) {
      var f, newFile;
      f = Creator.Collections['cfs.files.filerecord'].findOne(versionId);
      newFile = new FS.File();
      return newFile.attachData(f.createReadStream('files'), {
        type: f.original.type
      }, function (err) {
        var metadata;

        if (err) {
          throw new Meteor.Error(err.error, err.reason);
        }

        newFile.name(f.name());
        newFile.size(f.size());
        metadata = {
          owner: f.metadata.owner,
          owner_name: f.metadata.owner_name,
          space: spaceId,
          instance: insId,
          approve: approveId,
          parent: cf._id
        };

        if (idx === 0) {
          metadata.current = true;
        }

        newFile.metadata = metadata;
        return cfs.instances.insert(newFile);
      });
    });
  });
};

uuflowManagerForInitApproval.initiateRecordInstanceInfo = function (recordIds, insId, spaceId) {
  objectUpdate(recordIds.o, recordIds.ids[0], {
    instances: [{
      _id: insId,
      state: 'draft'
    }],
    locked: true,
    instance_state: 'draft'
  });
};

uuflowManagerForInitApproval.initiateRelatedRecordInstanceInfo = function (relatedTablesInfo, insId, spaceId) {
  _.each(relatedTablesInfo, function (tableItems, relatedObjectName) {
    var relatedCollection;
    relatedCollection = Creator.getCollection(relatedObjectName, spaceId);
    return _.each(tableItems, function (item) {
      return relatedCollection.direct.update(item._table._id, {
        $set: {
          instances: [{
            _id: insId,
            state: 'draft'
          }],
          _table: item._table
        }
      });
    });
  });
};

uuflowManagerForInitApproval.checkIsInApproval = function (recordIds, spaceId) {
  var record;
  record = objectFindOne(recordIds.o, {
    filters: [['_id', '=', recordIds.ids[0]]],
    fields: ['instances']
  });

  if (record && record.instances && record.instances[0].state !== 'completed' && Creator.Collections.instances.find(record.instances[0]._id).count() > 0) {
    throw new Meteor.Error('error!', "此记录已发起流程正在审批中，待审批结束方可发起下一次审批！");
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"routes":{"api_workflow_drafts.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_creator/server/routes/api_workflow_drafts.coffee                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
JsonRoutes.add('post', '/api/object/workflow/drafts', function (req, res, next) {
  var current_user_id, current_user_info, e, hashData, inserted_instances;

  try {
    current_user_info = uuflowManagerForInitApproval.check_authorization(req);
    current_user_id = current_user_info._id;
    hashData = req.body;
    inserted_instances = new Array();

    _.each(hashData['Instances'], function (instance_from_client) {
      var new_ins, new_ins_id;
      new_ins_id = uuflowManagerForInitApproval.create_instance(instance_from_client, current_user_info);
      new_ins = Creator.Collections.instances.findOne({
        _id: new_ins_id
      }, {
        fields: {
          space: 1,
          flow: 1,
          flow_version: 1,
          form: 1,
          form_version: 1
        }
      });
      return inserted_instances.push(new_ins);
    });

    return JsonRoutes.sendResult(res, {
      code: 200,
      data: {
        inserts: inserted_instances
      }
    });
  } catch (error) {
    e = error;
    console.error(e.stack);
    return JsonRoutes.sendResult(res, {
      code: 200,
      data: {
        errors: [{
          errorMessage: e.reason || e.message
        }]
      }
    });
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}}}},{
  "extensions": [
    ".js",
    ".json",
    ".coffee"
  ]
});

require("/node_modules/meteor/steedos:creator/checkNpm.js");
require("/node_modules/meteor/steedos:creator/core.coffee");
require("/node_modules/meteor/steedos:creator/lib/apps.coffee");
require("/node_modules/meteor/steedos:creator/server/methods/object_recent_viewed.coffee");
require("/node_modules/meteor/steedos:creator/server/methods/object_recent_record.coffee");
require("/node_modules/meteor/steedos:creator/server/methods/object_listviews_options.coffee");
require("/node_modules/meteor/steedos:creator/server/methods/report_data.coffee");
require("/node_modules/meteor/steedos:creator/server/methods/user_tabular_settings.coffee");
require("/node_modules/meteor/steedos:creator/server/methods/object_export2xml.coffee");
require("/node_modules/meteor/steedos:creator/server/methods/related_objects_records.coffee");
require("/node_modules/meteor/steedos:creator/server/methods/pending_space.coffee");
require("/node_modules/meteor/steedos:creator/server/publications/object.coffee");
require("/node_modules/meteor/steedos:creator/server/publications/object_tabular.coffee");
require("/node_modules/meteor/steedos:creator/server/publications/object_listviews.coffee");
require("/node_modules/meteor/steedos:creator/server/publications/user_tabular_settings.coffee");
require("/node_modules/meteor/steedos:creator/server/publications/related_objects_records.coffee");
require("/node_modules/meteor/steedos:creator/server/publications/space_user_info.coffee");
require("/node_modules/meteor/steedos:creator/server/publications/contacts_view_limits.coffee");
require("/node_modules/meteor/steedos:creator/server/publications/contacts_no_force_phone_users.coffee");
require("/node_modules/meteor/steedos:creator/server/publications/space_need_to_confirm.coffee");
require("/node_modules/meteor/steedos:creator/server/lib/permission_manager.coffee");
require("/node_modules/meteor/steedos:creator/server/lib/uuflowManagerForInitApproval.coffee");
require("/node_modules/meteor/steedos:creator/server/routes/api_workflow_drafts.coffee");

/* Exports */
Package._define("steedos:creator", {
  permissionManagerForInitApproval: permissionManagerForInitApproval,
  uuflowManagerForInitApproval: uuflowManagerForInitApproval
});

})();

//# sourceURL=meteor://💻app/packages/steedos_creator.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMvc3RlZWRvczpjcmVhdG9yL2NoZWNrTnBtLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9wYWNrYWdlcy9zdGVlZG9zX2NyZWF0b3IvY29yZS5jb2ZmZWUiLCJtZXRlb3I6Ly/wn5K7YXBwL2NvcmUuY29mZmVlIiwibWV0ZW9yOi8v8J+Su2FwcC9wYWNrYWdlcy9zdGVlZG9zX2NyZWF0b3IvbGliL2FwcHMuY29mZmVlIiwibWV0ZW9yOi8v8J+Su2FwcC9wYWNrYWdlcy9zdGVlZG9zX2NyZWF0b3Ivc2VydmVyL21ldGhvZHMvb2JqZWN0X3JlY2VudF92aWV3ZWQuY29mZmVlIiwibWV0ZW9yOi8v8J+Su2FwcC9zZXJ2ZXIvbWV0aG9kcy9vYmplY3RfcmVjZW50X3ZpZXdlZC5jb2ZmZWUiLCJtZXRlb3I6Ly/wn5K7YXBwL3BhY2thZ2VzL3N0ZWVkb3NfY3JlYXRvci9zZXJ2ZXIvbWV0aG9kcy9vYmplY3RfcmVjZW50X3JlY29yZC5jb2ZmZWUiLCJtZXRlb3I6Ly/wn5K7YXBwL3NlcnZlci9tZXRob2RzL29iamVjdF9yZWNlbnRfcmVjb3JkLmNvZmZlZSIsIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMvc3RlZWRvc19jcmVhdG9yL3NlcnZlci9tZXRob2RzL29iamVjdF9saXN0dmlld3Nfb3B0aW9ucy5jb2ZmZWUiLCJtZXRlb3I6Ly/wn5K7YXBwL3NlcnZlci9tZXRob2RzL29iamVjdF9saXN0dmlld3Nfb3B0aW9ucy5jb2ZmZWUiLCJtZXRlb3I6Ly/wn5K7YXBwL3BhY2thZ2VzL3N0ZWVkb3NfY3JlYXRvci9zZXJ2ZXIvbWV0aG9kcy9yZXBvcnRfZGF0YS5jb2ZmZWUiLCJtZXRlb3I6Ly/wn5K7YXBwL3NlcnZlci9tZXRob2RzL3JlcG9ydF9kYXRhLmNvZmZlZSIsIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMvc3RlZWRvc19jcmVhdG9yL3NlcnZlci9tZXRob2RzL3VzZXJfdGFidWxhcl9zZXR0aW5ncy5jb2ZmZWUiLCJtZXRlb3I6Ly/wn5K7YXBwL3NlcnZlci9tZXRob2RzL3VzZXJfdGFidWxhcl9zZXR0aW5ncy5jb2ZmZWUiLCJtZXRlb3I6Ly/wn5K7YXBwL3BhY2thZ2VzL3N0ZWVkb3NfY3JlYXRvci9zZXJ2ZXIvbWV0aG9kcy9vYmplY3RfZXhwb3J0MnhtbC5jb2ZmZWUiLCJtZXRlb3I6Ly/wn5K7YXBwL3NlcnZlci9tZXRob2RzL29iamVjdF9leHBvcnQyeG1sLmNvZmZlZSIsIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMvc3RlZWRvc19jcmVhdG9yL3NlcnZlci9tZXRob2RzL3JlbGF0ZWRfb2JqZWN0c19yZWNvcmRzLmNvZmZlZSIsIm1ldGVvcjovL/CfkrthcHAvc2VydmVyL21ldGhvZHMvcmVsYXRlZF9vYmplY3RzX3JlY29yZHMuY29mZmVlIiwibWV0ZW9yOi8v8J+Su2FwcC9wYWNrYWdlcy9zdGVlZG9zX2NyZWF0b3Ivc2VydmVyL21ldGhvZHMvcGVuZGluZ19zcGFjZS5jb2ZmZWUiLCJtZXRlb3I6Ly/wn5K7YXBwL3NlcnZlci9tZXRob2RzL3BlbmRpbmdfc3BhY2UuY29mZmVlIiwibWV0ZW9yOi8v8J+Su2FwcC9wYWNrYWdlcy9zdGVlZG9zX2NyZWF0b3Ivc2VydmVyL3B1YmxpY2F0aW9ucy9vYmplY3QuY29mZmVlIiwibWV0ZW9yOi8v8J+Su2FwcC9zZXJ2ZXIvcHVibGljYXRpb25zL29iamVjdC5jb2ZmZWUiLCJtZXRlb3I6Ly/wn5K7YXBwL3BhY2thZ2VzL3N0ZWVkb3NfY3JlYXRvci9zZXJ2ZXIvcHVibGljYXRpb25zL29iamVjdF90YWJ1bGFyLmNvZmZlZSIsIm1ldGVvcjovL/CfkrthcHAvc2VydmVyL3B1YmxpY2F0aW9ucy9vYmplY3RfdGFidWxhci5jb2ZmZWUiLCJtZXRlb3I6Ly/wn5K7YXBwL3BhY2thZ2VzL3N0ZWVkb3NfY3JlYXRvci9zZXJ2ZXIvcHVibGljYXRpb25zL29iamVjdF9saXN0dmlld3MuY29mZmVlIiwibWV0ZW9yOi8v8J+Su2FwcC9wYWNrYWdlcy9zdGVlZG9zX2NyZWF0b3Ivc2VydmVyL3B1YmxpY2F0aW9ucy91c2VyX3RhYnVsYXJfc2V0dGluZ3MuY29mZmVlIiwibWV0ZW9yOi8v8J+Su2FwcC9wYWNrYWdlcy9zdGVlZG9zX2NyZWF0b3Ivc2VydmVyL3B1YmxpY2F0aW9ucy9yZWxhdGVkX29iamVjdHNfcmVjb3Jkcy5jb2ZmZWUiLCJtZXRlb3I6Ly/wn5K7YXBwL3NlcnZlci9wdWJsaWNhdGlvbnMvcmVsYXRlZF9vYmplY3RzX3JlY29yZHMuY29mZmVlIiwibWV0ZW9yOi8v8J+Su2FwcC9wYWNrYWdlcy9zdGVlZG9zX2NyZWF0b3Ivc2VydmVyL3B1YmxpY2F0aW9ucy9zcGFjZV91c2VyX2luZm8uY29mZmVlIiwibWV0ZW9yOi8v8J+Su2FwcC9wYWNrYWdlcy9zdGVlZG9zX2NyZWF0b3Ivc2VydmVyL3B1YmxpY2F0aW9ucy9jb250YWN0c192aWV3X2xpbWl0cy5jb2ZmZWUiLCJtZXRlb3I6Ly/wn5K7YXBwL3NlcnZlci9wdWJsaWNhdGlvbnMvY29udGFjdHNfdmlld19saW1pdHMuY29mZmVlIiwibWV0ZW9yOi8v8J+Su2FwcC9wYWNrYWdlcy9zdGVlZG9zX2NyZWF0b3Ivc2VydmVyL3B1YmxpY2F0aW9ucy9jb250YWN0c19ub19mb3JjZV9waG9uZV91c2Vycy5jb2ZmZWUiLCJtZXRlb3I6Ly/wn5K7YXBwL3NlcnZlci9wdWJsaWNhdGlvbnMvY29udGFjdHNfbm9fZm9yY2VfcGhvbmVfdXNlcnMuY29mZmVlIiwibWV0ZW9yOi8v8J+Su2FwcC9wYWNrYWdlcy9zdGVlZG9zX2NyZWF0b3Ivc2VydmVyL3B1YmxpY2F0aW9ucy9zcGFjZV9uZWVkX3RvX2NvbmZpcm0uY29mZmVlIiwibWV0ZW9yOi8v8J+Su2FwcC9zZXJ2ZXIvcHVibGljYXRpb25zL3NwYWNlX25lZWRfdG9fY29uZmlybS5jb2ZmZWUiLCJtZXRlb3I6Ly/wn5K7YXBwL3BhY2thZ2VzL3N0ZWVkb3NfY3JlYXRvci9zZXJ2ZXIvbGliL3Blcm1pc3Npb25fbWFuYWdlci5jb2ZmZWUiLCJtZXRlb3I6Ly/wn5K7YXBwL3NlcnZlci9saWIvcGVybWlzc2lvbl9tYW5hZ2VyLmNvZmZlZSIsIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMvc3RlZWRvc19jcmVhdG9yL3NlcnZlci9saWIvdXVmbG93TWFuYWdlckZvckluaXRBcHByb3ZhbC5jb2ZmZWUiLCJtZXRlb3I6Ly/wn5K7YXBwL3NlcnZlci9saWIvdXVmbG93TWFuYWdlckZvckluaXRBcHByb3ZhbC5jb2ZmZWUiLCJtZXRlb3I6Ly/wn5K7YXBwL3BhY2thZ2VzL3N0ZWVkb3NfY3JlYXRvci9zZXJ2ZXIvcm91dGVzL2FwaV93b3JrZmxvd19kcmFmdHMuY29mZmVlIiwibWV0ZW9yOi8v8J+Su2FwcC9zZXJ2ZXIvcm91dGVzL2FwaV93b3JrZmxvd19kcmFmdHMuY29mZmVlIl0sIm5hbWVzIjpbImNoZWNrTnBtVmVyc2lvbnMiLCJtb2R1bGUiLCJsaW5rIiwidiIsImJ1c2JveSIsIk1ldGVvciIsInNldHRpbmdzIiwiY2ZzIiwiYWxpeXVuIiwiQ3JlYXRvciIsImdldFNjaGVtYSIsIm9iamVjdF9uYW1lIiwicmVmIiwiZ2V0T2JqZWN0Iiwic2NoZW1hIiwiZ2V0T2JqZWN0SG9tZUNvbXBvbmVudCIsImlzQ2xpZW50IiwiQnVpbGRlckNyZWF0b3IiLCJwbHVnaW5Db21wb25lbnRTZWxlY3RvciIsInN0b3JlIiwiZ2V0U3RhdGUiLCJnZXRPYmplY3RVcmwiLCJyZWNvcmRfaWQiLCJhcHBfaWQiLCJsaXN0X3ZpZXciLCJsaXN0X3ZpZXdfaWQiLCJTZXNzaW9uIiwiZ2V0IiwiZ2V0TGlzdFZpZXciLCJfaWQiLCJnZXRSZWxhdGl2ZVVybCIsImdldE9iamVjdEFic29sdXRlVXJsIiwiU3RlZWRvcyIsImFic29sdXRlVXJsIiwiZ2V0T2JqZWN0Um91dGVyVXJsIiwiZ2V0TGlzdFZpZXdVcmwiLCJ1cmwiLCJnZXRMaXN0Vmlld1JlbGF0aXZlVXJsIiwiZ2V0U3dpdGNoTGlzdFVybCIsImdldFJlbGF0ZWRPYmplY3RVcmwiLCJyZWxhdGVkX29iamVjdF9uYW1lIiwicmVsYXRlZF9maWVsZF9uYW1lIiwiZ2V0T2JqZWN0TG9va3VwRmllbGRPcHRpb25zIiwiaXNfZGVlcCIsImlzX3NraXBfaGlkZSIsImlzX3JlbGF0ZWQiLCJfb2JqZWN0IiwiX29wdGlvbnMiLCJmaWVsZHMiLCJpY29uIiwicmVsYXRlZE9iamVjdHMiLCJfIiwiZm9yRWFjaCIsImYiLCJrIiwiaGlkZGVuIiwidHlwZSIsInB1c2giLCJsYWJlbCIsInZhbHVlIiwicl9vYmplY3QiLCJyZWZlcmVuY2VfdG8iLCJpc1N0cmluZyIsImYyIiwiazIiLCJnZXRSZWxhdGVkT2JqZWN0cyIsImVhY2giLCJfdGhpcyIsIl9yZWxhdGVkT2JqZWN0IiwicmVsYXRlZE9iamVjdCIsInJlbGF0ZWRPcHRpb25zIiwicmVsYXRlZE9wdGlvbiIsImZvcmVpZ25fa2V5IiwibmFtZSIsImdldE9iamVjdEZpbHRlckZpZWxkT3B0aW9ucyIsInBlcm1pc3Npb25fZmllbGRzIiwiZ2V0RmllbGRzIiwiaW5jbHVkZSIsInRlc3QiLCJpbmRleE9mIiwiZ2V0T2JqZWN0RmllbGRPcHRpb25zIiwiZ2V0RmlsdGVyc1dpdGhGaWx0ZXJGaWVsZHMiLCJmaWx0ZXJzIiwiZmlsdGVyX2ZpZWxkcyIsImxlbmd0aCIsIm4iLCJmaWVsZCIsInJlcXVpcmVkIiwiZmluZFdoZXJlIiwiaXNfZGVmYXVsdCIsImlzX3JlcXVpcmVkIiwiZmlsdGVySXRlbSIsIm1hdGNoRmllbGQiLCJmaW5kIiwiZ2V0T2JqZWN0UmVjb3JkIiwic2VsZWN0X2ZpZWxkcyIsImV4cGFuZCIsImNvbGxlY3Rpb24iLCJvYmoiLCJyZWNvcmQiLCJyZWYxIiwicmVmMiIsIlRlbXBsYXRlIiwiaW5zdGFuY2UiLCJvZGF0YSIsImRhdGFiYXNlX25hbWUiLCJnZXRDb2xsZWN0aW9uIiwiZmluZE9uZSIsImdldE9iamVjdFJlY29yZE5hbWUiLCJuYW1lX2ZpZWxkX2tleSIsIk5BTUVfRklFTERfS0VZIiwiZ2V0QXBwIiwiYXBwIiwiQXBwcyIsImRlcHMiLCJkZXBlbmQiLCJnZXRBcHBEYXNoYm9hcmQiLCJkYXNoYm9hcmQiLCJEYXNoYm9hcmRzIiwiYXBwcyIsImdldEFwcERhc2hib2FyZENvbXBvbmVudCIsImdldEFwcE9iamVjdE5hbWVzIiwiYXBwT2JqZWN0cyIsImlzTW9iaWxlIiwib2JqZWN0cyIsIm1vYmlsZV9vYmplY3RzIiwicGVybWlzc2lvbnMiLCJhbGxvd1JlYWQiLCJnZXRVcmxXaXRoVG9rZW4iLCJleHByZXNzaW9uRm9ybURhdGEiLCJoYXNRdWVyeVN5bWJvbCIsImxpbmtTdHIiLCJwYXJhbXMiLCJzcGFjZUlkIiwidXNlcklkIiwiZ2V0VXNlckNvbXBhbnlJZHMiLCJBY2NvdW50cyIsIl9zdG9yZWRMb2dpblRva2VuIiwiaXNFeHByZXNzaW9uIiwicGFyc2VTaW5nbGVFeHByZXNzaW9uIiwiVVNFUl9DT05URVhUIiwiJCIsInBhcmFtIiwiZ2V0QXBwTWVudSIsIm1lbnVfaWQiLCJtZW51cyIsImdldEFwcE1lbnVzIiwibWVudSIsImlkIiwiZ2V0QXBwTWVudVVybEZvckludGVybmV0IiwicGF0aCIsImdldEFwcE1lbnVVcmwiLCJ0YXJnZXQiLCJhcHBNZW51cyIsImN1cmVudEFwcE1lbnVzIiwibWVudUl0ZW0iLCJjaGlsZHJlbiIsImxvYWRBcHBzTWVudXMiLCJkYXRhIiwib3B0aW9ucyIsIm1vYmlsZSIsInN1Y2Nlc3MiLCJzZXQiLCJhdXRoUmVxdWVzdCIsImdldFZpc2libGVBcHBzIiwiaW5jbHVkZUFkbWluIiwiY2hhbmdlQXBwIiwiX3N1YkFwcCIsImVudGl0aWVzIiwiT2JqZWN0IiwiYXNzaWduIiwidmlzaWJsZUFwcHNTZWxlY3RvciIsImdldFZpc2libGVBcHBzT2JqZWN0cyIsInZpc2libGVPYmplY3ROYW1lcyIsImZsYXR0ZW4iLCJwbHVjayIsImZpbHRlciIsIk9iamVjdHMiLCJzb3J0Iiwic29ydGluZ01ldGhvZCIsImJpbmQiLCJrZXkiLCJ1bmlxIiwiZ2V0QXBwc09iamVjdHMiLCJ0ZW1wT2JqZWN0cyIsImNvbmNhdCIsInZhbGlkYXRlRmlsdGVycyIsImxvZ2ljIiwiZSIsImVycm9yTXNnIiwiZmlsdGVyX2l0ZW1zIiwiZmlsdGVyX2xlbmd0aCIsImZsYWciLCJpbmRleCIsIndvcmQiLCJtYXAiLCJpc0VtcHR5IiwiY29tcGFjdCIsInJlcGxhY2UiLCJtYXRjaCIsImkiLCJpbmNsdWRlcyIsInciLCJlcnJvciIsImNvbnNvbGUiLCJsb2ciLCJ0b2FzdHIiLCJmb3JtYXRGaWx0ZXJzVG9Nb25nbyIsInNlbGVjdG9yIiwiQXJyYXkiLCJvcGVyYXRpb24iLCJvcHRpb24iLCJyZWciLCJzdWJfc2VsZWN0b3IiLCJldmFsdWF0ZUZvcm11bGEiLCJSZWdFeHAiLCJpc0JldHdlZW5GaWx0ZXJPcGVyYXRpb24iLCJnZXRCZXR3ZWVuVGltZUJ1aWx0aW5WYWx1ZXMiLCJmb3JtYXRGaWx0ZXJzVG9EZXYiLCJsb2dpY1RlbXBGaWx0ZXJzIiwiaXNfbG9naWNfb3IiLCJwb3AiLCJTdGVlZG9zRmlsdGVycyIsImZvcm1hdExvZ2ljRmlsdGVyc1RvRGV2IiwiZmlsdGVyX2xvZ2ljIiwiZm9ybWF0X2xvZ2ljIiwieCIsIl9mIiwiaXNBcnJheSIsIkpTT04iLCJzdHJpbmdpZnkiLCJyZWxhdGVkX29iamVjdF9uYW1lcyIsInJlbGF0ZWRfb2JqZWN0cyIsInVucmVsYXRlZF9vYmplY3RzIiwiZ2V0T2JqZWN0UmVsYXRlZHMiLCJfY29sbGVjdGlvbl9uYW1lIiwiZ2V0UGVybWlzc2lvbnMiLCJkaWZmZXJlbmNlIiwicmVsYXRlZF9vYmplY3QiLCJpc0FjdGl2ZSIsImFsbG93UmVhZEZpbGVzIiwiZ2V0UmVsYXRlZE9iamVjdE5hbWVzIiwiZ2V0UmVsYXRlZE9iamVjdExpc3RBY3Rpb25zIiwicmVsYXRlZE9iamVjdE5hbWUiLCJhY3Rpb25zIiwiZ2V0QWN0aW9ucyIsImFjdGlvbiIsIm9uIiwidmlzaWJsZSIsImRpc2FibGVkX2FjdGlvbnMiLCJzb3J0QnkiLCJ2YWx1ZXMiLCJoYXMiLCJhbGxvd19jdXN0b21BY3Rpb25zIiwia2V5cyIsImV4Y2x1ZGVfYWN0aW9ucyIsImdldExpc3RWaWV3cyIsImRpc2FibGVkX2xpc3Rfdmlld3MiLCJsaXN0Vmlld3MiLCJsaXN0X3ZpZXdzIiwib2JqZWN0IiwiaXRlbSIsIml0ZW1fbmFtZSIsImlzRGlzYWJsZWQiLCJvd25lciIsImZpZWxkc05hbWUiLCJ1bnJlYWRhYmxlX2ZpZWxkcyIsImdldE9iamVjdEZpZWxkc05hbWUiLCJpc2xvYWRpbmciLCJib290c3RyYXBMb2FkZWQiLCJjb252ZXJ0U3BlY2lhbENoYXJhY3RlciIsInN0ciIsImdldERpc2FibGVkRmllbGRzIiwiZmllbGROYW1lIiwiYXV0b2Zvcm0iLCJkaXNhYmxlZCIsIm9taXQiLCJnZXRIaWRkZW5GaWVsZHMiLCJnZXRGaWVsZHNXaXRoTm9Hcm91cCIsImdyb3VwIiwiZ2V0U29ydGVkRmllbGRHcm91cE5hbWVzIiwibmFtZXMiLCJ1bmlxdWUiLCJnZXRGaWVsZHNGb3JHcm91cCIsImdyb3VwTmFtZSIsImdldFN5c3RlbUJhc2VGaWVsZHMiLCJnZXRGaWVsZHNXaXRob3V0U3lzdGVtQmFzZSIsImdldEZpZWxkc1dpdGhvdXRPbWl0IiwicGljayIsImdldEZpZWxkc0luRmlyc3RMZXZlbCIsImZpcnN0TGV2ZWxLZXlzIiwiZ2V0RmllbGRzRm9yUmVvcmRlciIsImlzU2luZ2xlIiwiX2tleXMiLCJjaGlsZEtleXMiLCJpc193aWRlXzEiLCJpc193aWRlXzIiLCJzY18xIiwic2NfMiIsImVuZHNXaXRoIiwiaXNfd2lkZSIsInNsaWNlIiwiaXNGaWx0ZXJWYWx1ZUVtcHR5IiwiTnVtYmVyIiwiaXNOYU4iLCJnZXRGaWVsZERhdGFUeXBlIiwib2JqZWN0RmllbGRzIiwicmVzdWx0IiwiZGF0YV90eXBlIiwiaXNTZXJ2ZXIiLCJnZXRBbGxSZWxhdGVkT2JqZWN0cyIsInJlbGF0ZWRfZmllbGQiLCJlbmFibGVfZmlsZXMiLCJmb3JtYXRJbmRleCIsImFycmF5IiwiaW5kZXhOYW1lIiwiaXNkb2N1bWVudERCIiwiYmFja2dyb3VuZCIsImRhdGFzb3VyY2VzIiwiZG9jdW1lbnREQiIsImpvaW4iLCJzdWJzdHJpbmciLCJhcHBzQnlOYW1lIiwibWV0aG9kcyIsInNwYWNlX2lkIiwiY29sbGVjdGlvbl9yZWNlbnRfdmlld2VkIiwiY3VycmVudF9yZWNlbnRfdmlld2VkIiwiZG9jIiwic3BhY2UiLCJ1cGRhdGUiLCIkaW5jIiwiY291bnQiLCIkc2V0IiwibW9kaWZpZWQiLCJEYXRlIiwibW9kaWZpZWRfYnkiLCJpbnNlcnQiLCJfbWFrZU5ld0lEIiwibyIsImlkcyIsImNyZWF0ZWQiLCJjcmVhdGVkX2J5IiwiYXN5bmNfcmVjZW50X2FnZ3JlZ2F0ZSIsInJlY2VudF9hZ2dyZWdhdGUiLCJzZWFyY2hfb2JqZWN0IiwiX3JlY29yZHMiLCJjYWxsYmFjayIsIkNvbGxlY3Rpb25zIiwib2JqZWN0X3JlY2VudF92aWV3ZWQiLCJyYXdDb2xsZWN0aW9uIiwiYWdncmVnYXRlIiwiJG1hdGNoIiwiJGdyb3VwIiwibWF4Q3JlYXRlZCIsIiRtYXgiLCIkc29ydCIsIiRsaW1pdCIsInRvQXJyYXkiLCJlcnIiLCJFcnJvciIsImlzRnVuY3Rpb24iLCJ3cmFwQXN5bmMiLCJzZWFyY2hUZXh0IiwiX29iamVjdF9jb2xsZWN0aW9uIiwiX29iamVjdF9uYW1lX2tleSIsInF1ZXJ5IiwicXVlcnlfYW5kIiwicmVjb3JkcyIsInNlYXJjaF9LZXl3b3JkcyIsInNwbGl0Iiwia2V5d29yZCIsInN1YnF1ZXJ5IiwiJHJlZ2V4IiwidHJpbSIsIiRhbmQiLCIkaW4iLCJsaW1pdCIsIl9uYW1lIiwiX29iamVjdF9uYW1lIiwicmVjb3JkX29iamVjdCIsInJlY29yZF9vYmplY3RfY29sbGVjdGlvbiIsInNlbGYiLCJvYmplY3RzQnlOYW1lIiwib2JqZWN0X3JlY29yZCIsImVuYWJsZV9zZWFyY2giLCJ1cGRhdGVfZmlsdGVycyIsImxpc3R2aWV3X2lkIiwiZmlsdGVyX3Njb3BlIiwib2JqZWN0X2xpc3R2aWV3cyIsImRpcmVjdCIsInVwZGF0ZV9jb2x1bW5zIiwiY29sdW1ucyIsImNoZWNrIiwiY29tcG91bmRGaWVsZHMiLCJjdXJzb3IiLCJmaWx0ZXJGaWVsZHMiLCJjaGlsZEtleSIsIm9iamVjdEZpZWxkIiwic3BsaXRzIiwiaXNDb21tb25TcGFjZSIsImlzU3BhY2VBZG1pbiIsInNraXAiLCJmZXRjaCIsImNvbXBvdW5kRmllbGRJdGVtIiwiY29tcG91bmRGaWx0ZXJGaWVsZHMiLCJpdGVtS2V5IiwiaXRlbVZhbHVlIiwicmVmZXJlbmNlSXRlbSIsInNldHRpbmciLCJjb2x1bW5fd2lkdGgiLCJvYmoxIiwiX2lkX2FjdGlvbnMiLCJfbWl4RmllbGRzRGF0YSIsIl9taXhSZWxhdGVkRGF0YSIsIl93cml0ZVhtbEZpbGUiLCJmcyIsImxvZ2dlciIsIm1rZGlycCIsInhtbDJqcyIsInJlcXVpcmUiLCJMb2dnZXIiLCJqc29uT2JqIiwib2JqTmFtZSIsImJ1aWxkZXIiLCJkYXkiLCJmaWxlQWRkcmVzcyIsImZpbGVOYW1lIiwiZmlsZVBhdGgiLCJtb250aCIsIm5vdyIsInN0cmVhbSIsInhtbCIsInllYXIiLCJCdWlsZGVyIiwiYnVpbGRPYmplY3QiLCJCdWZmZXIiLCJnZXRGdWxsWWVhciIsImdldE1vbnRoIiwiZ2V0RGF0ZSIsIl9fbWV0ZW9yX2Jvb3RzdHJhcF9fIiwic2VydmVyRGlyIiwiZXhpc3RzU3luYyIsInN5bmMiLCJ3cml0ZUZpbGUiLCJtaXhCb29sIiwibWl4RGF0ZSIsIm1peERlZmF1bHQiLCJvYmpGaWVsZHMiLCJmaWVsZF9uYW1lIiwiZGF0ZSIsImRhdGVTdHIiLCJmb3JtYXQiLCJtb21lbnQiLCJyZWxhdGVkT2JqTmFtZXMiLCJyZWxhdGVkT2JqTmFtZSIsInJlbGF0ZWRDb2xsZWN0aW9uIiwicmVsYXRlZFJlY29yZExpc3QiLCJyZWxhdGVkVGFibGVEYXRhIiwicmVsYXRlZE9iaiIsImZpZWxkc0RhdGEiLCJFeHBvcnQyeG1sIiwicmVjb3JkTGlzdCIsImluZm8iLCJ0aW1lIiwicmVjb3JkT2JqIiwidGltZUVuZCIsInJlbGF0ZWRfb2JqZWN0c19yZWNvcmRzIiwicmVsYXRlZF9yZWNvcmRzIiwidmlld0FsbFJlY29yZHMiLCJnZXRQZW5kaW5nU3BhY2VJbmZvIiwiaW52aXRlcklkIiwiaW52aXRlck5hbWUiLCJzcGFjZU5hbWUiLCJkYiIsInVzZXJzIiwic3BhY2VzIiwiaW52aXRlciIsInJlZnVzZUpvaW5TcGFjZSIsInNwYWNlX3VzZXJzIiwiaW52aXRlX3N0YXRlIiwiYWNjZXB0Sm9pblNwYWNlIiwidXNlcl9hY2NlcHRlZCIsInB1Ymxpc2giLCJwdWJsaXNoQ29tcG9zaXRlIiwidGFibGVOYW1lIiwiX2ZpZWxkcyIsIm9iamVjdF9jb2xsZWNpdG9uIiwicmVmZXJlbmNlX2ZpZWxkcyIsInJlYWR5IiwiU3RyaW5nIiwiTWF0Y2giLCJPcHRpb25hbCIsImdldE9iamVjdE5hbWUiLCJ1bmJsb2NrIiwiZmllbGRfa2V5cyIsIl9vYmplY3RLZXlzIiwicmVmZXJlbmNlX2ZpZWxkIiwicGFyZW50IiwiY2hpbGRyZW5fZmllbGRzIiwicF9rIiwicmVmZXJlbmNlX2lkcyIsInJlZmVyZW5jZV90b19vYmplY3QiLCJzX2siLCJnZXRQcm9wZXJ0eSIsInJlZHVjZSIsImlzT2JqZWN0Iiwic2hhcmVkIiwidXNlciIsInNwYWNlX3NldHRpbmdzIiwicGVybWlzc2lvbk1hbmFnZXJGb3JJbml0QXBwcm92YWwiLCJnZXRGbG93UGVybWlzc2lvbnMiLCJmbG93X2lkIiwidXNlcl9pZCIsImZsb3ciLCJteV9wZXJtaXNzaW9ucyIsIm9yZ19pZHMiLCJvcmdhbml6YXRpb25zIiwib3Jnc19jYW5fYWRkIiwib3Jnc19jYW5fYWRtaW4iLCJvcmdzX2Nhbl9tb25pdG9yIiwidXNlcnNfY2FuX2FkZCIsInVzZXJzX2Nhbl9hZG1pbiIsInVzZXJzX2Nhbl9tb25pdG9yIiwidXVmbG93TWFuYWdlckZvckluaXRBcHByb3ZhbCIsImdldEZsb3ciLCJwYXJlbnRzIiwib3JnIiwicGFyZW50X2lkIiwicGVybXMiLCJvcmdfaWQiLCJfZXZhbCIsImdldE9iamVjdENvbmZpZyIsImdldE9iamVjdE5hbWVGaWVsZEtleSIsImdldFJlbGF0ZWRzIiwib2JqZWN0RmluZCIsIm9iamVjdEZpbmRPbmUiLCJvYmplY3RVcGRhdGUiLCJvYmplY3RxbCIsIm9iamVjdEFwaU5hbWUiLCJ0b0NvbmZpZyIsImNiIiwidGhlbiIsInJlc29sdmUiLCJyZWplY3QiLCJjaGVja19hdXRob3JpemF0aW9uIiwicmVxIiwiYXV0aFRva2VuIiwiaGFzaGVkVG9rZW4iLCJfaGFzaExvZ2luVG9rZW4iLCJnZXRTcGFjZSIsImZsb3dzIiwiZ2V0U3BhY2VVc2VyIiwic3BhY2VfdXNlciIsImdldFNwYWNlVXNlck9yZ0luZm8iLCJvcmdhbml6YXRpb24iLCJmdWxsbmFtZSIsIm9yZ2FuaXphdGlvbl9uYW1lIiwib3JnYW5pemF0aW9uX2Z1bGxuYW1lIiwiaXNGbG93RW5hYmxlZCIsInN0YXRlIiwiaXNGbG93U3BhY2VNYXRjaGVkIiwiZ2V0Rm9ybSIsImZvcm1faWQiLCJmb3JtIiwiZm9ybXMiLCJnZXRDYXRlZ29yeSIsImNhdGVnb3J5X2lkIiwiY2F0ZWdvcmllcyIsImNoZWNrU3luY0RpcmVjdGlvbiIsIm93Iiwic3luY0RpcmVjdGlvbiIsIm9iamVjdF93b3JrZmxvd3MiLCJzeW5jX2RpcmVjdGlvbiIsImNyZWF0ZV9pbnN0YW5jZSIsImluc3RhbmNlX2Zyb21fY2xpZW50IiwidXNlcl9pbmZvIiwiYXBwcl9vYmoiLCJhcHByb3ZlX2Zyb21fY2xpZW50IiwiY2F0ZWdvcnkiLCJpbnNfb2JqIiwibmV3X2luc19pZCIsInJlbGF0ZWRUYWJsZXNJbmZvIiwic3BhY2VfdXNlcl9vcmdfaW5mbyIsInN0YXJ0X3N0ZXAiLCJ0cmFjZV9mcm9tX2NsaWVudCIsInRyYWNlX29iaiIsImNoZWNrSXNJbkFwcHJvdmFsIiwicGVybWlzc2lvbk1hbmFnZXIiLCJpbnN0YW5jZXMiLCJmbG93X3ZlcnNpb24iLCJjdXJyZW50IiwiZm9ybV92ZXJzaW9uIiwic3VibWl0dGVyIiwic3VibWl0dGVyX25hbWUiLCJhcHBsaWNhbnQiLCJhcHBsaWNhbnRfbmFtZSIsImFwcGxpY2FudF9vcmdhbml6YXRpb24iLCJhcHBsaWNhbnRfb3JnYW5pemF0aW9uX25hbWUiLCJhcHBsaWNhbnRfb3JnYW5pemF0aW9uX2Z1bGxuYW1lIiwiYXBwbGljYW50X2NvbXBhbnkiLCJjb21wYW55X2lkIiwiY29kZSIsImlzX2FyY2hpdmVkIiwiaXNfZGVsZXRlZCIsInJlY29yZF9pZHMiLCJNb25nbyIsIk9iamVjdElEIiwiX3N0ciIsImlzX2ZpbmlzaGVkIiwic3RlcHMiLCJzdGVwIiwic3RlcF90eXBlIiwic3RhcnRfZGF0ZSIsInRyYWNlIiwidXNlcl9uYW1lIiwiaGFuZGxlciIsImhhbmRsZXJfbmFtZSIsImhhbmRsZXJfb3JnYW5pemF0aW9uIiwiaGFuZGxlcl9vcmdhbml6YXRpb25fbmFtZSIsImhhbmRsZXJfb3JnYW5pemF0aW9uX2Z1bGxuYW1lIiwicmVhZF9kYXRlIiwiaXNfcmVhZCIsImlzX2Vycm9yIiwiZGVzY3JpcHRpb24iLCJpbml0aWF0ZVZhbHVlcyIsImFwcHJvdmVzIiwidHJhY2VzIiwiaW5ib3hfdXNlcnMiLCJjdXJyZW50X3N0ZXBfbmFtZSIsImF1dG9fcmVtaW5kIiwiZmxvd19uYW1lIiwiY2F0ZWdvcnlfbmFtZSIsImluaXRpYXRlUmVjb3JkSW5zdGFuY2VJbmZvIiwiaW5pdGlhdGVBdHRhY2giLCJyZWNvcmRJZHMiLCJmbG93SWQiLCJmaWVsZENvZGVzIiwiZmlsdGVyVmFsdWVzIiwiZm9ybUZpZWxkcyIsImZvcm1UYWJsZUZpZWxkcyIsImZvcm1UYWJsZUZpZWxkc0NvZGUiLCJnZXRGaWVsZE9kYXRhVmFsdWUiLCJnZXRGb3JtRmllbGQiLCJnZXRGb3JtVGFibGVGaWVsZCIsImdldEZvcm1UYWJsZUZpZWxkQ29kZSIsImdldEZvcm1UYWJsZVN1YkZpZWxkIiwiZ2V0UmVsYXRlZE9iamVjdEZpZWxkQ29kZSIsImdldFNlbGVjdE9yZ1ZhbHVlIiwiZ2V0U2VsZWN0T3JnVmFsdWVzIiwiZ2V0U2VsZWN0VXNlclZhbHVlIiwiZ2V0U2VsZWN0VXNlclZhbHVlcyIsIm9iamVjdE5hbWUiLCJyZWNvcmRJZCIsInJlbGF0ZWRPYmplY3RzS2V5cyIsInRhYmxlRmllbGRDb2RlcyIsInRhYmxlRmllbGRNYXAiLCJ0YWJsZVRvUmVsYXRlZE1hcCIsImZmIiwiZm9ybUZpZWxkIiwicmVsYXRlZE9iamVjdHNLZXkiLCJzdGFydHNXaXRoIiwiZm9ybVRhYmxlRmllbGRDb2RlIiwic2YiLCJ0YWJsZUZpZWxkIiwic3ViRmllbGRDb2RlIiwiX3JlY29yZCIsIm5hbWVLZXkiLCJzdSIsInVzZXJJZHMiLCJzdXMiLCJvcmdJZCIsIm9yZ0lkcyIsIm9yZ3MiLCJmaWVsZF9tYXAiLCJmbSIsImdyaWRDb2RlIiwibG9va3VwRmllbGROYW1lIiwibG9va3VwRmllbGRPYmoiLCJsb29rdXBPYmplY3RSZWNvcmQiLCJsb29rdXBTZWxlY3RGaWVsZFZhbHVlIiwib1RhYmxlQ29kZSIsIm9UYWJsZUNvZGVSZWZlcmVuY2VGaWVsZCIsIm9UYWJsZUNvZGVSZWZlcmVuY2VGaWVsZENvZGUiLCJvVGFibGVGaWVsZENvZGUiLCJvYmpGaWVsZCIsIm9iamVjdEZpZWxkTmFtZSIsIm9iamVjdEZpZWxkT2JqZWN0TmFtZSIsIm9iamVjdExvb2t1cEZpZWxkIiwib2JqZWN0X2ZpZWxkIiwib2RhdGFGaWVsZFZhbHVlIiwicmVmZXJlbmNlVG9Eb2MiLCJyZWZlcmVuY2VUb0ZpZWxkVmFsdWUiLCJyZWZlcmVuY2VUb09iamVjdE5hbWUiLCJyZWxhdGVkT2JqZWN0RmllbGRDb2RlIiwic2VsZWN0RmllbGRWYWx1ZSIsInRhYmxlVG9SZWxhdGVkTWFwS2V5Iiwid1RhYmxlQ29kZSIsIndvcmtmbG93X2ZpZWxkIiwiaGFzT3duUHJvcGVydHkiLCJ3b3JrZmxvd190YWJsZV9maWVsZF9jb2RlIiwib2JqZWN0X3RhYmxlX2ZpZWxkX2NvZGUiLCJtdWx0aXBsZSIsImlzX211bHRpc2VsZWN0IiwidGZjIiwiYyIsInBhcnNlIiwidHIiLCJuZXdUciIsInRmbSIsIndUZENvZGUiLCJmb3JtVGFibGVGaWVsZCIsInJlbGF0ZWRGaWVsZCIsInJlbGF0ZWRGaWVsZE5hbWUiLCJyZWxhdGVkUmVjb3JkcyIsInJlbGF0ZWRUYWJsZUl0ZW1zIiwidGFibGVDb2RlIiwidGFibGVWYWx1ZXMiLCJfRlJPTV9UQUJMRV9DT0RFIiwid2FybiIsInJyIiwidGFibGVWYWx1ZUl0ZW0iLCJ2YWx1ZUtleSIsImZpZWxkS2V5IiwiZm9ybUZpZWxkS2V5IiwicmVsYXRlZE9iamVjdEZpZWxkIiwidGFibGVGaWVsZFZhbHVlIiwiX3RhYmxlIiwiX2NvZGUiLCJmaWVsZF9tYXBfc2NyaXB0IiwiZXh0ZW5kIiwiZXZhbEZpZWxkTWFwU2NyaXB0Iiwib2JqZWN0SWQiLCJmdW5jIiwic2NyaXB0IiwiaW5zSWQiLCJhcHByb3ZlSWQiLCJjZiIsInZlcnNpb25zIiwidmVyc2lvbklkIiwiaWR4IiwibmV3RmlsZSIsIkZTIiwiRmlsZSIsImF0dGFjaERhdGEiLCJjcmVhdGVSZWFkU3RyZWFtIiwib3JpZ2luYWwiLCJtZXRhZGF0YSIsInJlYXNvbiIsInNpemUiLCJvd25lcl9uYW1lIiwiYXBwcm92ZSIsImxvY2tlZCIsImluc3RhbmNlX3N0YXRlIiwiaW5pdGlhdGVSZWxhdGVkUmVjb3JkSW5zdGFuY2VJbmZvIiwidGFibGVJdGVtcyIsIkpzb25Sb3V0ZXMiLCJhZGQiLCJyZXMiLCJuZXh0IiwiY3VycmVudF91c2VyX2lkIiwiY3VycmVudF91c2VyX2luZm8iLCJoYXNoRGF0YSIsImluc2VydGVkX2luc3RhbmNlcyIsImJvZHkiLCJuZXdfaW5zIiwic2VuZFJlc3VsdCIsImluc2VydHMiLCJzdGFjayIsImVycm9ycyIsImVycm9yTWVzc2FnZSIsIm1lc3NhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsZ0JBQUo7QUFBcUJDLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZLG9DQUFaLEVBQWlEO0FBQUNGLGtCQUFnQixDQUFDRyxDQUFELEVBQUc7QUFBQ0gs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QixDQ1VFO0FBVUQ7QUQxQ0gsRyIsImZpbGUiOiIvcGFja2FnZXMvc3RlZWRvc19jcmVhdG9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcblx0Y2hlY2tOcG1WZXJzaW9uc1xufSBmcm9tICdtZXRlb3IvdG1lYXNkYXk6Y2hlY2stbnBtLXZlcnNpb25zJztcbmNoZWNrTnBtVmVyc2lvbnMoe1xuXHRidXNib3k6IFwiXjAuMi4xM1wiLFxuXHRcInhtbDJqc1wiOiBcIl4wLjQuMTlcIixcbn0sICdzdGVlZG9zOmNyZWF0b3InKTtcblxuaWYgKE1ldGVvci5zZXR0aW5ncyAmJiBNZXRlb3Iuc2V0dGluZ3MuY2ZzICYmIE1ldGVvci5zZXR0aW5ncy5jZnMuYWxpeXVuKSB7XG5cdGNoZWNrTnBtVmVyc2lvbnMoe1xuXHRcdFwiYWxpeXVuLXNka1wiOiBcIl4xLjExLjEyXCJcblx0fSwgJ3N0ZWVkb3M6Y3JlYXRvcicpO1xufSIsIlxuXHQjIENyZWF0b3IuaW5pdEFwcHMoKVxuXG5cbiMgQ3JlYXRvci5pbml0QXBwcyA9ICgpLT5cbiMgXHRpZiBNZXRlb3IuaXNTZXJ2ZXJcbiMgXHRcdF8uZWFjaCBDcmVhdG9yLkFwcHMsIChhcHAsIGFwcF9pZCktPlxuIyBcdFx0XHRkYl9hcHAgPSBkYi5hcHBzLmZpbmRPbmUoYXBwX2lkKVxuIyBcdFx0XHRpZiAhZGJfYXBwXG4jIFx0XHRcdFx0YXBwLl9pZCA9IGFwcF9pZFxuIyBcdFx0XHRcdGRiLmFwcHMuaW5zZXJ0KGFwcClcbiMgZWxzZVxuIyBcdGFwcC5faWQgPSBhcHBfaWRcbiMgXHRkYi5hcHBzLnVwZGF0ZSh7X2lkOiBhcHBfaWR9LCBhcHApXG5cbkNyZWF0b3IuZ2V0U2NoZW1hID0gKG9iamVjdF9uYW1lKS0+XG5cdHJldHVybiBDcmVhdG9yLmdldE9iamVjdChvYmplY3RfbmFtZSk/LnNjaGVtYVxuXG5DcmVhdG9yLmdldE9iamVjdEhvbWVDb21wb25lbnQgPSAob2JqZWN0X25hbWUpLT5cblx0aWYgTWV0ZW9yLmlzQ2xpZW50XG5cdFx0cmV0dXJuIEJ1aWxkZXJDcmVhdG9yLnBsdWdpbkNvbXBvbmVudFNlbGVjdG9yKEJ1aWxkZXJDcmVhdG9yLnN0b3JlLmdldFN0YXRlKCksIFwiT2JqZWN0SG9tZVwiLCBvYmplY3RfbmFtZSlcblxuQ3JlYXRvci5nZXRPYmplY3RVcmwgPSAob2JqZWN0X25hbWUsIHJlY29yZF9pZCwgYXBwX2lkKSAtPlxuXHRpZiAhYXBwX2lkXG5cdFx0YXBwX2lkID0gU2Vzc2lvbi5nZXQoXCJhcHBfaWRcIilcblx0aWYgIW9iamVjdF9uYW1lXG5cdFx0b2JqZWN0X25hbWUgPSBTZXNzaW9uLmdldChcIm9iamVjdF9uYW1lXCIpXG5cblx0bGlzdF92aWV3ID0gQ3JlYXRvci5nZXRMaXN0VmlldyhvYmplY3RfbmFtZSwgbnVsbClcblx0bGlzdF92aWV3X2lkID0gbGlzdF92aWV3Py5faWRcblxuXHRpZiByZWNvcmRfaWRcblx0XHRyZXR1cm4gQ3JlYXRvci5nZXRSZWxhdGl2ZVVybChcIi9hcHAvXCIgKyBhcHBfaWQgKyBcIi9cIiArIG9iamVjdF9uYW1lICsgXCIvdmlldy9cIiArIHJlY29yZF9pZClcblx0ZWxzZVxuXHRcdGlmIG9iamVjdF9uYW1lIGlzIFwibWVldGluZ1wiXG5cdFx0XHRyZXR1cm4gQ3JlYXRvci5nZXRSZWxhdGl2ZVVybChcIi9hcHAvXCIgKyBhcHBfaWQgKyBcIi9cIiArIG9iamVjdF9uYW1lICsgXCIvY2FsZW5kYXIvXCIpXG5cdFx0ZWxzZVxuXHRcdFx0aWYgQ3JlYXRvci5nZXRPYmplY3RIb21lQ29tcG9uZW50KG9iamVjdF9uYW1lKVxuXHRcdFx0XHRyZXR1cm4gQ3JlYXRvci5nZXRSZWxhdGl2ZVVybChcIi9hcHAvXCIgKyBhcHBfaWQgKyBcIi9cIiArIG9iamVjdF9uYW1lKVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRpZiBsaXN0X3ZpZXdfaWRcblx0XHRcdFx0XHRyZXR1cm4gQ3JlYXRvci5nZXRSZWxhdGl2ZVVybChcIi9hcHAvXCIgKyBhcHBfaWQgKyBcIi9cIiArIG9iamVjdF9uYW1lICsgXCIvZ3JpZC9cIiArIGxpc3Rfdmlld19pZClcblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdHJldHVybiBDcmVhdG9yLmdldFJlbGF0aXZlVXJsKFwiL2FwcC9cIiArIGFwcF9pZCArIFwiL1wiICsgb2JqZWN0X25hbWUpXG5cbkNyZWF0b3IuZ2V0T2JqZWN0QWJzb2x1dGVVcmwgPSAob2JqZWN0X25hbWUsIHJlY29yZF9pZCwgYXBwX2lkKSAtPlxuXHRpZiAhYXBwX2lkXG5cdFx0YXBwX2lkID0gU2Vzc2lvbi5nZXQoXCJhcHBfaWRcIilcblx0aWYgIW9iamVjdF9uYW1lXG5cdFx0b2JqZWN0X25hbWUgPSBTZXNzaW9uLmdldChcIm9iamVjdF9uYW1lXCIpXG5cblx0bGlzdF92aWV3ID0gQ3JlYXRvci5nZXRMaXN0VmlldyhvYmplY3RfbmFtZSwgbnVsbClcblx0bGlzdF92aWV3X2lkID0gbGlzdF92aWV3Py5faWRcblxuXHRpZiByZWNvcmRfaWRcblx0XHRyZXR1cm4gU3RlZWRvcy5hYnNvbHV0ZVVybChcIi9hcHAvXCIgKyBhcHBfaWQgKyBcIi9cIiArIG9iamVjdF9uYW1lICsgXCIvdmlldy9cIiArIHJlY29yZF9pZCwgdHJ1ZSlcblx0ZWxzZVxuXHRcdGlmIG9iamVjdF9uYW1lIGlzIFwibWVldGluZ1wiXG5cdFx0XHRyZXR1cm4gU3RlZWRvcy5hYnNvbHV0ZVVybChcIi9hcHAvXCIgKyBhcHBfaWQgKyBcIi9cIiArIG9iamVjdF9uYW1lICsgXCIvY2FsZW5kYXIvXCIsIHRydWUpXG5cdFx0ZWxzZVxuXHRcdFx0cmV0dXJuIFN0ZWVkb3MuYWJzb2x1dGVVcmwoXCIvYXBwL1wiICsgYXBwX2lkICsgXCIvXCIgKyBvYmplY3RfbmFtZSArIFwiL2dyaWQvXCIgKyBsaXN0X3ZpZXdfaWQsIHRydWUpXG5cbkNyZWF0b3IuZ2V0T2JqZWN0Um91dGVyVXJsID0gKG9iamVjdF9uYW1lLCByZWNvcmRfaWQsIGFwcF9pZCkgLT5cblx0aWYgIWFwcF9pZFxuXHRcdGFwcF9pZCA9IFNlc3Npb24uZ2V0KFwiYXBwX2lkXCIpXG5cdGlmICFvYmplY3RfbmFtZVxuXHRcdG9iamVjdF9uYW1lID0gU2Vzc2lvbi5nZXQoXCJvYmplY3RfbmFtZVwiKVxuXG5cdGxpc3RfdmlldyA9IENyZWF0b3IuZ2V0TGlzdFZpZXcob2JqZWN0X25hbWUsIG51bGwpXG5cdGxpc3Rfdmlld19pZCA9IGxpc3Rfdmlldz8uX2lkXG5cblx0aWYgcmVjb3JkX2lkXG5cdFx0cmV0dXJuIFwiL2FwcC9cIiArIGFwcF9pZCArIFwiL1wiICsgb2JqZWN0X25hbWUgKyBcIi92aWV3L1wiICsgcmVjb3JkX2lkXG5cdGVsc2Vcblx0XHRpZiBvYmplY3RfbmFtZSBpcyBcIm1lZXRpbmdcIlxuXHRcdFx0cmV0dXJuIFwiL2FwcC9cIiArIGFwcF9pZCArIFwiL1wiICsgb2JqZWN0X25hbWUgKyBcIi9jYWxlbmRhci9cIlxuXHRcdGVsc2Vcblx0XHRcdHJldHVybiBcIi9hcHAvXCIgKyBhcHBfaWQgKyBcIi9cIiArIG9iamVjdF9uYW1lICsgXCIvZ3JpZC9cIiArIGxpc3Rfdmlld19pZFxuXG5DcmVhdG9yLmdldExpc3RWaWV3VXJsID0gKG9iamVjdF9uYW1lLCBhcHBfaWQsIGxpc3Rfdmlld19pZCkgLT5cblx0dXJsID0gQ3JlYXRvci5nZXRMaXN0Vmlld1JlbGF0aXZlVXJsKG9iamVjdF9uYW1lLCBhcHBfaWQsIGxpc3Rfdmlld19pZClcblx0cmV0dXJuIENyZWF0b3IuZ2V0UmVsYXRpdmVVcmwodXJsKVxuXG5DcmVhdG9yLmdldExpc3RWaWV3UmVsYXRpdmVVcmwgPSAob2JqZWN0X25hbWUsIGFwcF9pZCwgbGlzdF92aWV3X2lkKSAtPlxuXHRpZiBsaXN0X3ZpZXdfaWQgaXMgXCJjYWxlbmRhclwiXG5cdFx0cmV0dXJuIFwiL2FwcC9cIiArIGFwcF9pZCArIFwiL1wiICsgb2JqZWN0X25hbWUgKyBcIi9jYWxlbmRhci9cIlxuXHRlbHNlXG5cdFx0cmV0dXJuIFwiL2FwcC9cIiArIGFwcF9pZCArIFwiL1wiICsgb2JqZWN0X25hbWUgKyBcIi9ncmlkL1wiICsgbGlzdF92aWV3X2lkXG5cbkNyZWF0b3IuZ2V0U3dpdGNoTGlzdFVybCA9IChvYmplY3RfbmFtZSwgYXBwX2lkLCBsaXN0X3ZpZXdfaWQpIC0+XG5cdGlmIGxpc3Rfdmlld19pZFxuXHRcdHJldHVybiBDcmVhdG9yLmdldFJlbGF0aXZlVXJsKFwiL2FwcC9cIiArIGFwcF9pZCArIFwiL1wiICsgb2JqZWN0X25hbWUgKyBcIi9cIiArIGxpc3Rfdmlld19pZCArIFwiL2xpc3RcIilcblx0ZWxzZVxuXHRcdHJldHVybiBDcmVhdG9yLmdldFJlbGF0aXZlVXJsKFwiL2FwcC9cIiArIGFwcF9pZCArIFwiL1wiICsgb2JqZWN0X25hbWUgKyBcIi9saXN0L3N3aXRjaFwiKVxuXG5DcmVhdG9yLmdldFJlbGF0ZWRPYmplY3RVcmwgPSAob2JqZWN0X25hbWUsIGFwcF9pZCwgcmVjb3JkX2lkLCByZWxhdGVkX29iamVjdF9uYW1lLCByZWxhdGVkX2ZpZWxkX25hbWUpIC0+XG5cdGlmIHJlbGF0ZWRfZmllbGRfbmFtZVxuXHRcdHJldHVybiBDcmVhdG9yLmdldFJlbGF0aXZlVXJsKFwiL2FwcC9cIiArIGFwcF9pZCArIFwiL1wiICsgb2JqZWN0X25hbWUgKyBcIi9cIiArIHJlY29yZF9pZCArIFwiL1wiICsgcmVsYXRlZF9vYmplY3RfbmFtZSArIFwiL2dyaWQ/cmVsYXRlZF9maWVsZF9uYW1lPVwiICsgcmVsYXRlZF9maWVsZF9uYW1lKVxuXHRlbHNlXG5cdFx0cmV0dXJuIENyZWF0b3IuZ2V0UmVsYXRpdmVVcmwoXCIvYXBwL1wiICsgYXBwX2lkICsgXCIvXCIgKyBvYmplY3RfbmFtZSArIFwiL1wiICsgcmVjb3JkX2lkICsgXCIvXCIgKyByZWxhdGVkX29iamVjdF9uYW1lICsgXCIvZ3JpZFwiKVxuXG5DcmVhdG9yLmdldE9iamVjdExvb2t1cEZpZWxkT3B0aW9ucyA9IChvYmplY3RfbmFtZSwgaXNfZGVlcCwgaXNfc2tpcF9oaWRlLCBpc19yZWxhdGVkKS0+XG5cdF9vcHRpb25zID0gW11cblx0dW5sZXNzIG9iamVjdF9uYW1lXG5cdFx0cmV0dXJuIF9vcHRpb25zXG5cdF9vYmplY3QgPSBDcmVhdG9yLmdldE9iamVjdChvYmplY3RfbmFtZSlcblx0ZmllbGRzID0gX29iamVjdD8uZmllbGRzXG5cdGljb24gPSBfb2JqZWN0Py5pY29uXG5cdF8uZm9yRWFjaCBmaWVsZHMsIChmLCBrKS0+XG5cdFx0aWYgaXNfc2tpcF9oaWRlIGFuZCBmLmhpZGRlblxuXHRcdFx0cmV0dXJuXG5cdFx0aWYgZi50eXBlID09IFwic2VsZWN0XCJcblx0XHRcdF9vcHRpb25zLnB1c2gge2xhYmVsOiBcIiN7Zi5sYWJlbCB8fCBrfVwiLCB2YWx1ZTogXCIje2t9XCIsIGljb246IGljb259XG5cdFx0ZWxzZVxuXHRcdFx0X29wdGlvbnMucHVzaCB7bGFiZWw6IGYubGFiZWwgfHwgaywgdmFsdWU6IGssIGljb246IGljb259XG5cdGlmIGlzX2RlZXBcblx0XHRfLmZvckVhY2ggZmllbGRzLCAoZiwgayktPlxuXHRcdFx0aWYgaXNfc2tpcF9oaWRlIGFuZCBmLmhpZGRlblxuXHRcdFx0XHRyZXR1cm5cblx0XHRcdGlmIChmLnR5cGUgPT0gXCJsb29rdXBcIiB8fCBmLnR5cGUgPT0gXCJtYXN0ZXJfZGV0YWlsXCIpICYmIGYucmVmZXJlbmNlX3RvICYmIF8uaXNTdHJpbmcoZi5yZWZlcmVuY2VfdG8pXG5cdFx0XHRcdCMg5LiN5pSv5oyBZi5yZWZlcmVuY2VfdG/kuLpmdW5jdGlvbueahOaDheWGte+8jOaciemcgOaxguWGjeivtFxuXHRcdFx0XHRyX29iamVjdCA9IENyZWF0b3IuZ2V0T2JqZWN0KGYucmVmZXJlbmNlX3RvKVxuXHRcdFx0XHRpZiByX29iamVjdFxuXHRcdFx0XHRcdF8uZm9yRWFjaCByX29iamVjdC5maWVsZHMsIChmMiwgazIpLT5cblx0XHRcdFx0XHRcdF9vcHRpb25zLnB1c2gge2xhYmVsOiBcIiN7Zi5sYWJlbCB8fCBrfT0+I3tmMi5sYWJlbCB8fCBrMn1cIiwgdmFsdWU6IFwiI3trfS4je2syfVwiLCBpY29uOiByX29iamVjdD8uaWNvbn1cblx0aWYgaXNfcmVsYXRlZFxuXHRcdHJlbGF0ZWRPYmplY3RzID0gQ3JlYXRvci5nZXRSZWxhdGVkT2JqZWN0cyhvYmplY3RfbmFtZSlcblx0XHRfLmVhY2ggcmVsYXRlZE9iamVjdHMsIChfcmVsYXRlZE9iamVjdCk9PlxuXHRcdFx0cmVsYXRlZE9wdGlvbnMgPSBDcmVhdG9yLmdldE9iamVjdExvb2t1cEZpZWxkT3B0aW9ucyhfcmVsYXRlZE9iamVjdC5vYmplY3RfbmFtZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSlcblx0XHRcdHJlbGF0ZWRPYmplY3QgPSBDcmVhdG9yLmdldE9iamVjdChfcmVsYXRlZE9iamVjdC5vYmplY3RfbmFtZSlcblx0XHRcdF8uZWFjaCByZWxhdGVkT3B0aW9ucywgKHJlbGF0ZWRPcHRpb24pLT5cblx0XHRcdFx0aWYgX3JlbGF0ZWRPYmplY3QuZm9yZWlnbl9rZXkgIT0gcmVsYXRlZE9wdGlvbi52YWx1ZVxuXHRcdFx0XHRcdF9vcHRpb25zLnB1c2gge2xhYmVsOiBcIiN7cmVsYXRlZE9iamVjdC5sYWJlbCB8fCByZWxhdGVkT2JqZWN0Lm5hbWV9PT4je3JlbGF0ZWRPcHRpb24ubGFiZWx9XCIsIHZhbHVlOiBcIiN7cmVsYXRlZE9iamVjdC5uYW1lfS4je3JlbGF0ZWRPcHRpb24udmFsdWV9XCIsIGljb246IHJlbGF0ZWRPYmplY3Q/Lmljb259XG5cdHJldHVybiBfb3B0aW9uc1xuXG4jIOe7n+S4gOS4uuWvueixoW9iamVjdF9uYW1l5o+Q5L6b5Y+v55So5LqO6L+H6JmR5Zmo6L+H6JmR5a2X5q61XG5DcmVhdG9yLmdldE9iamVjdEZpbHRlckZpZWxkT3B0aW9ucyA9IChvYmplY3RfbmFtZSktPlxuXHRfb3B0aW9ucyA9IFtdXG5cdHVubGVzcyBvYmplY3RfbmFtZVxuXHRcdHJldHVybiBfb3B0aW9uc1xuXHRfb2JqZWN0ID0gQ3JlYXRvci5nZXRPYmplY3Qob2JqZWN0X25hbWUpXG5cdGZpZWxkcyA9IF9vYmplY3Q/LmZpZWxkc1xuXHRwZXJtaXNzaW9uX2ZpZWxkcyA9IENyZWF0b3IuZ2V0RmllbGRzKG9iamVjdF9uYW1lKVxuXHRpY29uID0gX29iamVjdD8uaWNvblxuXHRfLmZvckVhY2ggZmllbGRzLCAoZiwgayktPlxuXHRcdCMgaGlkZGVuLGdyaWTnrYnnsbvlnovnmoTlrZfmrrXvvIzkuI3pnIDopoHov4fmu6Rcblx0XHRpZiAhXy5pbmNsdWRlKFtcImdyaWRcIixcIm9iamVjdFwiLCBcIltPYmplY3RdXCIsIFwiW29iamVjdF1cIiwgXCJPYmplY3RcIiwgXCJhdmF0YXJcIiwgXCJpbWFnZVwiLCBcIm1hcmtkb3duXCIsIFwiaHRtbFwiXSwgZi50eXBlKSBhbmQgIWYuaGlkZGVuXG5cdFx0XHQjIGZpbHRlcnMuJC5maWVsZOWPimZsb3cuY3VycmVudOetieWtkOWtl+auteS5n+S4jemcgOimgei/h+a7pFxuXHRcdFx0aWYgIS9cXHcrXFwuLy50ZXN0KGspIGFuZCBfLmluZGV4T2YocGVybWlzc2lvbl9maWVsZHMsIGspID4gLTFcblx0XHRcdFx0X29wdGlvbnMucHVzaCB7bGFiZWw6IGYubGFiZWwgfHwgaywgdmFsdWU6IGssIGljb246IGljb259XG5cblx0cmV0dXJuIF9vcHRpb25zXG5cbkNyZWF0b3IuZ2V0T2JqZWN0RmllbGRPcHRpb25zID0gKG9iamVjdF9uYW1lKS0+XG5cdF9vcHRpb25zID0gW11cblx0dW5sZXNzIG9iamVjdF9uYW1lXG5cdFx0cmV0dXJuIF9vcHRpb25zXG5cdF9vYmplY3QgPSBDcmVhdG9yLmdldE9iamVjdChvYmplY3RfbmFtZSlcblx0ZmllbGRzID0gX29iamVjdD8uZmllbGRzXG5cdHBlcm1pc3Npb25fZmllbGRzID0gQ3JlYXRvci5nZXRGaWVsZHMob2JqZWN0X25hbWUpXG5cdGljb24gPSBfb2JqZWN0Py5pY29uXG5cdF8uZm9yRWFjaCBmaWVsZHMsIChmLCBrKS0+XG5cdFx0aWYgIV8uaW5jbHVkZShbXCJncmlkXCIsXCJvYmplY3RcIiwgXCJbT2JqZWN0XVwiLCBcIltvYmplY3RdXCIsIFwiT2JqZWN0XCIsIFwibWFya2Rvd25cIiwgXCJodG1sXCJdLCBmLnR5cGUpXG5cdFx0XHRpZiAhL1xcdytcXC4vLnRlc3QoaykgYW5kIF8uaW5kZXhPZihwZXJtaXNzaW9uX2ZpZWxkcywgaykgPiAtMVxuXHRcdFx0XHRfb3B0aW9ucy5wdXNoIHtsYWJlbDogZi5sYWJlbCB8fCBrLCB2YWx1ZTogaywgaWNvbjogaWNvbn1cblx0cmV0dXJuIF9vcHRpb25zXG5cbiMjI1xuZmlsdGVyczog6KaB6L2s5o2i55qEZmlsdGVyc1xuZmllbGRzOiDlr7nosaHlrZfmrrVcbmZpbHRlcl9maWVsZHM6IOm7mOiupOi/h+a7pOWtl+aute+8jOaUr+aMgeWtl+espuS4suaVsOe7hOWSjOWvueixoeaVsOe7hOS4pOenjeagvOW8j++8jOWmgjpbJ2ZpbGVkX25hbWUxJywnZmlsZWRfbmFtZTInXSxbe2ZpZWxkOidmaWxlZF9uYW1lMScscmVxdWlyZWQ6dHJ1ZX1dXG7lpITnkIbpgLvovpE6IOaKimZpbHRlcnPkuK3lrZjlnKjkuo5maWx0ZXJfZmllbGRz55qE6L+H5ruk5p2h5Lu25aKe5Yqg5q+P6aG555qEaXNfZGVmYXVsdOOAgWlzX3JlcXVpcmVk5bGe5oCn77yM5LiN5a2Y5Zyo5LqOZmlsdGVyX2ZpZWxkc+eahOi/h+a7pOadoeS7tuWvueW6lOeahOenu+mZpOavj+mhueeahOebuOWFs+WxnuaAp1xu6L+U5Zue57uT5p6cOiDlpITnkIblkI7nmoRmaWx0ZXJzXG4jIyNcbkNyZWF0b3IuZ2V0RmlsdGVyc1dpdGhGaWx0ZXJGaWVsZHMgPSAoZmlsdGVycywgZmllbGRzLCBmaWx0ZXJfZmllbGRzKS0+XG5cdHVubGVzcyBmaWx0ZXJzXG5cdFx0ZmlsdGVycyA9IFtdXG5cdHVubGVzcyBmaWx0ZXJfZmllbGRzXG5cdFx0ZmlsdGVyX2ZpZWxkcyA9IFtdXG5cdGlmIGZpbHRlcl9maWVsZHM/Lmxlbmd0aFxuXHRcdGZpbHRlcl9maWVsZHMuZm9yRWFjaCAobiktPlxuXHRcdFx0aWYgXy5pc1N0cmluZyhuKVxuXHRcdFx0XHRuID0gXG5cdFx0XHRcdFx0ZmllbGQ6IG4sXG5cdFx0XHRcdFx0cmVxdWlyZWQ6IGZhbHNlXG5cdFx0XHRpZiBmaWVsZHNbbi5maWVsZF0gYW5kICFfLmZpbmRXaGVyZShmaWx0ZXJzLHtmaWVsZDpuLmZpZWxkfSlcblx0XHRcdFx0ZmlsdGVycy5wdXNoXG5cdFx0XHRcdFx0ZmllbGQ6IG4uZmllbGQsXG5cdFx0XHRcdFx0aXNfZGVmYXVsdDogdHJ1ZSxcblx0XHRcdFx0XHRpc19yZXF1aXJlZDogbi5yZXF1aXJlZFxuXHRmaWx0ZXJzLmZvckVhY2ggKGZpbHRlckl0ZW0pLT5cblx0XHRtYXRjaEZpZWxkID0gZmlsdGVyX2ZpZWxkcy5maW5kIChuKS0+IHJldHVybiBuID09IGZpbHRlckl0ZW0uZmllbGQgb3Igbi5maWVsZCA9PSBmaWx0ZXJJdGVtLmZpZWxkXG5cdFx0aWYgXy5pc1N0cmluZyhtYXRjaEZpZWxkKVxuXHRcdFx0bWF0Y2hGaWVsZCA9IFxuXHRcdFx0XHRmaWVsZDogbWF0Y2hGaWVsZCxcblx0XHRcdFx0cmVxdWlyZWQ6IGZhbHNlXG5cdFx0aWYgbWF0Y2hGaWVsZFxuXHRcdFx0ZmlsdGVySXRlbS5pc19kZWZhdWx0ID0gdHJ1ZVxuXHRcdFx0ZmlsdGVySXRlbS5pc19yZXF1aXJlZCA9IG1hdGNoRmllbGQucmVxdWlyZWRcblx0XHRlbHNlXG5cdFx0XHRkZWxldGUgZmlsdGVySXRlbS5pc19kZWZhdWx0XG5cdFx0XHRkZWxldGUgZmlsdGVySXRlbS5pc19yZXF1aXJlZFxuXHRyZXR1cm4gZmlsdGVyc1xuXG5DcmVhdG9yLmdldE9iamVjdFJlY29yZCA9IChvYmplY3RfbmFtZSwgcmVjb3JkX2lkLCBzZWxlY3RfZmllbGRzLCBleHBhbmQpLT5cblxuXHRpZiAhb2JqZWN0X25hbWVcblx0XHRvYmplY3RfbmFtZSA9IFNlc3Npb24uZ2V0KFwib2JqZWN0X25hbWVcIilcblxuXHRpZiAhcmVjb3JkX2lkXG5cdFx0cmVjb3JkX2lkID0gU2Vzc2lvbi5nZXQoXCJyZWNvcmRfaWRcIilcblx0aWYgTWV0ZW9yLmlzQ2xpZW50XG5cdFx0aWYgb2JqZWN0X25hbWUgPT0gU2Vzc2lvbi5nZXQoXCJvYmplY3RfbmFtZVwiKSAmJiAgcmVjb3JkX2lkID09IFNlc3Npb24uZ2V0KFwicmVjb3JkX2lkXCIpXG5cdFx0XHRpZiBUZW1wbGF0ZS5pbnN0YW5jZSgpPy5yZWNvcmRcblx0XHRcdFx0cmV0dXJuIFRlbXBsYXRlLmluc3RhbmNlKCk/LnJlY29yZD8uZ2V0KClcblx0XHRlbHNlXG5cdFx0XHRyZXR1cm4gQ3JlYXRvci5vZGF0YS5nZXQob2JqZWN0X25hbWUsIHJlY29yZF9pZCwgc2VsZWN0X2ZpZWxkcywgZXhwYW5kKVxuXG5cdG9iaiA9IENyZWF0b3IuZ2V0T2JqZWN0KG9iamVjdF9uYW1lKVxuXG5cdGlmIG9iai5kYXRhYmFzZV9uYW1lID09IFwibWV0ZW9yXCIgfHwgIW9iai5kYXRhYmFzZV9uYW1lXG5cdFx0Y29sbGVjdGlvbiA9IENyZWF0b3IuZ2V0Q29sbGVjdGlvbihvYmplY3RfbmFtZSlcblx0XHRpZiBjb2xsZWN0aW9uXG5cdFx0XHRyZWNvcmQgPSBjb2xsZWN0aW9uLmZpbmRPbmUocmVjb3JkX2lkKVxuXHRcdFx0cmV0dXJuIHJlY29yZFxuXHRlbHNlIGlmIG9iamVjdF9uYW1lICYmIHJlY29yZF9pZFxuXHRcdHJldHVybiBDcmVhdG9yLm9kYXRhLmdldChvYmplY3RfbmFtZSwgcmVjb3JkX2lkLCBzZWxlY3RfZmllbGRzLCBleHBhbmQpXG5cbkNyZWF0b3IuZ2V0T2JqZWN0UmVjb3JkTmFtZSA9IChyZWNvcmQsIG9iamVjdF9uYW1lKS0+XG5cdHVubGVzcyByZWNvcmRcblx0XHRyZWNvcmQgPSBDcmVhdG9yLmdldE9iamVjdFJlY29yZCgpXG5cdGlmIHJlY29yZFxuXHRcdCMg5pi+56S657uE57uH5YiX6KGo5pe277yM54m55q6K5aSE55CGbmFtZV9maWVsZF9rZXnkuLpuYW1l5a2X5q61XG5cdFx0bmFtZV9maWVsZF9rZXkgPSBpZiBvYmplY3RfbmFtZSA9PSBcIm9yZ2FuaXphdGlvbnNcIiB0aGVuIFwibmFtZVwiIGVsc2UgQ3JlYXRvci5nZXRPYmplY3Qob2JqZWN0X25hbWUpPy5OQU1FX0ZJRUxEX0tFWVxuXHRcdGlmIHJlY29yZCBhbmQgbmFtZV9maWVsZF9rZXlcblx0XHRcdHJldHVybiByZWNvcmQubGFiZWwgfHwgcmVjb3JkW25hbWVfZmllbGRfa2V5XVxuXG5DcmVhdG9yLmdldEFwcCA9IChhcHBfaWQpLT5cblx0aWYgIWFwcF9pZFxuXHRcdGFwcF9pZCA9IFNlc3Npb24uZ2V0KFwiYXBwX2lkXCIpXG5cdGFwcCA9IENyZWF0b3IuQXBwc1thcHBfaWRdXG5cdENyZWF0b3IuZGVwcz8uYXBwPy5kZXBlbmQoKVxuXHRyZXR1cm4gYXBwXG5cbkNyZWF0b3IuZ2V0QXBwRGFzaGJvYXJkID0gKGFwcF9pZCktPlxuXHRhcHAgPSBDcmVhdG9yLmdldEFwcChhcHBfaWQpXG5cdGlmICFhcHBcblx0XHRyZXR1cm5cblx0ZGFzaGJvYXJkID0gbnVsbFxuXHRfLmVhY2ggQ3JlYXRvci5EYXNoYm9hcmRzLCAodiwgayktPlxuXHRcdGlmIHYuYXBwcz8uaW5kZXhPZihhcHAuX2lkKSA+IC0xXG5cdFx0XHRkYXNoYm9hcmQgPSB2O1xuXHRyZXR1cm4gZGFzaGJvYXJkO1xuXG5DcmVhdG9yLmdldEFwcERhc2hib2FyZENvbXBvbmVudCA9IChhcHBfaWQpLT5cblx0YXBwID0gQ3JlYXRvci5nZXRBcHAoYXBwX2lkKVxuXHRpZiAhYXBwXG5cdFx0cmV0dXJuXG5cdHJldHVybiBCdWlsZGVyQ3JlYXRvci5wbHVnaW5Db21wb25lbnRTZWxlY3RvcihCdWlsZGVyQ3JlYXRvci5zdG9yZS5nZXRTdGF0ZSgpLCBcIkRhc2hib2FyZFwiLCBhcHAuX2lkKTtcblxuQ3JlYXRvci5nZXRBcHBPYmplY3ROYW1lcyA9IChhcHBfaWQpLT5cblx0YXBwID0gQ3JlYXRvci5nZXRBcHAoYXBwX2lkKVxuXHRpZiAhYXBwXG5cdFx0cmV0dXJuXG5cdGlzTW9iaWxlID0gU3RlZWRvcy5pc01vYmlsZSgpXG5cdGFwcE9iamVjdHMgPSBpZiBpc01vYmlsZSB0aGVuIGFwcC5tb2JpbGVfb2JqZWN0cyBlbHNlIGFwcC5vYmplY3RzXG5cdG9iamVjdHMgPSBbXVxuXHRpZiBhcHBcblx0XHRfLmVhY2ggYXBwT2JqZWN0cywgKHYpLT5cblx0XHRcdG9iaiA9IENyZWF0b3IuZ2V0T2JqZWN0KHYpXG5cdFx0XHRpZiBvYmo/LnBlcm1pc3Npb25zLmdldCgpLmFsbG93UmVhZFxuXHRcdFx0XHRvYmplY3RzLnB1c2ggdlxuXHRyZXR1cm4gb2JqZWN0c1xuXG5DcmVhdG9yLmdldFVybFdpdGhUb2tlbiA9ICh1cmwsIGV4cHJlc3Npb25Gb3JtRGF0YSkgLT5cblx0IyDnu5l1cmzml7bmi7zmjqXlvZPliY3nlKjmiLd0b2tlbuebuOWFs+S/oeaBr+eUqOS6jueZu+W9lemqjOivge+8jOaUr+aMgemFjee9ruihqOi+vuW8j1xuXHRwYXJhbXMgPSB7fTtcblx0cGFyYW1zW1wiWC1TcGFjZS1JZFwiXSA9IFN0ZWVkb3Muc3BhY2VJZCgpXG5cdHBhcmFtc1tcIlgtVXNlci1JZFwiXSA9IFN0ZWVkb3MudXNlcklkKCk7XG5cdHBhcmFtc1tcIlgtQ29tcGFueS1JZHNcIl0gPSBTdGVlZG9zLmdldFVzZXJDb21wYW55SWRzKCk7XG5cdHBhcmFtc1tcIlgtQXV0aC1Ub2tlblwiXSA9IEFjY291bnRzLl9zdG9yZWRMb2dpblRva2VuKCk7XG5cdGlmIFN0ZWVkb3MuaXNFeHByZXNzaW9uKHVybClcblx0XHR1cmwgPSBTdGVlZG9zLnBhcnNlU2luZ2xlRXhwcmVzc2lvbih1cmwsIGV4cHJlc3Npb25Gb3JtRGF0YSwgXCIjXCIsIENyZWF0b3IuVVNFUl9DT05URVhUKVxuXHQjIOWklumDqOmTvuaOpeWcsOWdgOS4reWPr+iDveS8muW4puaciSPlj7fvvIzmr5TlpoIvYnVpbGRlci8/cF9pZHM9NjE5MzgzNTQ1YjJlOWE3MmVjMDU1OGIzIy9wYWdlL3B1YmxpYy90ZXN0XG5cdCMg5q2k5pe2dXJs5Lit5bey57uP5ZyoI+WPt+WJjemdouWHuueOsOS6huS4gOS4qj/lj7fvvIzov5nkuKrpl67lj7fkuI3lj6/ku6Xooqvor4bliKvkuLp1cmzlj4LmlbDvvIzlj6rmnIkj5Y+35ZCO6Z2i55qEP+WPt+aJjeW6lOivpeiiq+ivhuWIq+S4unVybOWPguaVsFxuXHRoYXNRdWVyeVN5bWJvbCA9IC8oXFwjLitcXD8pfChcXD9bXiNdKiQpL2cudGVzdCh1cmwpXG5cdGxpbmtTdHIgPSBpZiBoYXNRdWVyeVN5bWJvbCB0aGVuIFwiJlwiIGVsc2UgXCI/XCJcblx0cmV0dXJuIFwiI3t1cmx9I3tsaW5rU3RyfSN7JC5wYXJhbShwYXJhbXMpfVwiXG5cbkNyZWF0b3IuZ2V0QXBwTWVudSA9IChhcHBfaWQsIG1lbnVfaWQpLT5cblx0bWVudXMgPSBDcmVhdG9yLmdldEFwcE1lbnVzKGFwcF9pZClcblx0cmV0dXJuIG1lbnVzICYmIG1lbnVzLmZpbmQgKG1lbnUpLT4gcmV0dXJuIG1lbnUuaWQgPT0gbWVudV9pZFxuXG5DcmVhdG9yLmdldEFwcE1lbnVVcmxGb3JJbnRlcm5ldCA9IChtZW51KS0+XG5cdCMg5b2TdGFic+exu+Wei+S4unVybOaXtu+8jOaMieWklumDqOmTvuaOpeWkhOeQhu+8jOaUr+aMgemFjee9ruihqOi+vuW8j+W5tuWKoOS4iue7n+S4gOeahHVybOWPguaVsFxuXHRyZXR1cm4gQ3JlYXRvci5nZXRVcmxXaXRoVG9rZW4gbWVudS5wYXRoLCBtZW51XG5cbkNyZWF0b3IuZ2V0QXBwTWVudVVybCA9IChtZW51KS0+XG5cdHVybCA9IG1lbnUucGF0aFxuXHRpZiBtZW51LnR5cGUgPT0gXCJ1cmxcIlxuXHRcdGlmIG1lbnUudGFyZ2V0XG5cdFx0XHRyZXR1cm4gQ3JlYXRvci5nZXRBcHBNZW51VXJsRm9ySW50ZXJuZXQobWVudSlcblx0XHRlbHNlXG5cdFx0XHQjIOWcqGlmcmFtZeS4reaYvuekunVybOeVjOmdolxuXHRcdFx0cmV0dXJuIFwiL2FwcC8tL3RhYl9pZnJhbWUvI3ttZW51LmlkfVwiXG5cdGVsc2Vcblx0XHRyZXR1cm4gbWVudS5wYXRoXG5cbkNyZWF0b3IuZ2V0QXBwTWVudXMgPSAoYXBwX2lkKS0+XG5cdGFwcCA9IENyZWF0b3IuZ2V0QXBwKGFwcF9pZClcblx0aWYgIWFwcFxuXHRcdHJldHVybiBbXVxuXHRhcHBNZW51cyA9IFNlc3Npb24uZ2V0KFwiYXBwX21lbnVzXCIpO1xuXHR1bmxlc3MgYXBwTWVudXNcblx0XHRyZXR1cm4gW11cblx0Y3VyZW50QXBwTWVudXMgPSBhcHBNZW51cy5maW5kIChtZW51SXRlbSkgLT5cblx0XHRyZXR1cm4gbWVudUl0ZW0uaWQgPT0gYXBwLl9pZFxuXHRpZiBjdXJlbnRBcHBNZW51c1xuXHRcdHJldHVybiBjdXJlbnRBcHBNZW51cy5jaGlsZHJlblxuXG5DcmVhdG9yLmxvYWRBcHBzTWVudXMgPSAoKS0+XG5cdGlzTW9iaWxlID0gU3RlZWRvcy5pc01vYmlsZSgpXG5cdGRhdGEgPSB7IH1cblx0aWYgaXNNb2JpbGVcblx0XHRkYXRhLm1vYmlsZSA9IGlzTW9iaWxlXG5cdG9wdGlvbnMgPSB7IFxuXHRcdHR5cGU6ICdnZXQnLCBcblx0XHRkYXRhOiBkYXRhLCBcblx0XHRzdWNjZXNzOiAoZGF0YSktPlxuXHRcdFx0U2Vzc2lvbi5zZXQoXCJhcHBfbWVudXNcIiwgZGF0YSk7XG5cdCB9XG5cdFN0ZWVkb3MuYXV0aFJlcXVlc3QgXCIvc2VydmljZS9hcGkvYXBwcy9tZW51c1wiLCBvcHRpb25zXG5cbkNyZWF0b3IuZ2V0VmlzaWJsZUFwcHMgPSAoaW5jbHVkZUFkbWluKS0+XG5cdGNoYW5nZUFwcCA9IENyZWF0b3IuX3N1YkFwcC5nZXQoKTtcblx0QnVpbGRlckNyZWF0b3Iuc3RvcmUuZ2V0U3RhdGUoKS5lbnRpdGllcy5hcHBzID0gT2JqZWN0LmFzc2lnbih7fSwgQnVpbGRlckNyZWF0b3Iuc3RvcmUuZ2V0U3RhdGUoKS5lbnRpdGllcy5hcHBzLCB7YXBwczogY2hhbmdlQXBwfSk7XG5cdHJldHVybiBCdWlsZGVyQ3JlYXRvci52aXNpYmxlQXBwc1NlbGVjdG9yKEJ1aWxkZXJDcmVhdG9yLnN0b3JlLmdldFN0YXRlKCksIGluY2x1ZGVBZG1pbilcblxuQ3JlYXRvci5nZXRWaXNpYmxlQXBwc09iamVjdHMgPSAoKS0+XG5cdGFwcHMgPSBDcmVhdG9yLmdldFZpc2libGVBcHBzKClcblx0dmlzaWJsZU9iamVjdE5hbWVzID0gXy5mbGF0dGVuKF8ucGx1Y2soYXBwcywnb2JqZWN0cycpKVxuXHRvYmplY3RzID0gXy5maWx0ZXIgQ3JlYXRvci5PYmplY3RzLCAob2JqKS0+XG5cdFx0aWYgdmlzaWJsZU9iamVjdE5hbWVzLmluZGV4T2Yob2JqLm5hbWUpIDwgMFxuXHRcdFx0cmV0dXJuIGZhbHNlXG5cdFx0ZWxzZVxuXHRcdFx0cmV0dXJuIHRydWVcblx0b2JqZWN0cyA9IG9iamVjdHMuc29ydChDcmVhdG9yLnNvcnRpbmdNZXRob2QuYmluZCh7a2V5OlwibGFiZWxcIn0pKVxuXHRvYmplY3RzID0gXy5wbHVjayhvYmplY3RzLCduYW1lJylcblx0cmV0dXJuIF8udW5pcSBvYmplY3RzXG5cbkNyZWF0b3IuZ2V0QXBwc09iamVjdHMgPSAoKS0+XG5cdG9iamVjdHMgPSBbXVxuXHR0ZW1wT2JqZWN0cyA9IFtdXG5cdF8uZm9yRWFjaCBDcmVhdG9yLkFwcHMsIChhcHApLT5cblx0XHR0ZW1wT2JqZWN0cyA9IF8uZmlsdGVyIGFwcC5vYmplY3RzLCAob2JqKS0+XG5cdFx0XHRyZXR1cm4gIW9iai5oaWRkZW5cblx0XHRvYmplY3RzID0gb2JqZWN0cy5jb25jYXQodGVtcE9iamVjdHMpXG5cdHJldHVybiBfLnVuaXEgb2JqZWN0c1xuXG5DcmVhdG9yLnZhbGlkYXRlRmlsdGVycyA9IChmaWx0ZXJzLCBsb2dpYyktPlxuXHRmaWx0ZXJfaXRlbXMgPSBfLm1hcCBmaWx0ZXJzLCAob2JqKSAtPlxuXHRcdGlmIF8uaXNFbXB0eShvYmopXG5cdFx0XHRyZXR1cm4gZmFsc2Vcblx0XHRlbHNlXG5cdFx0XHRyZXR1cm4gb2JqXG5cdGZpbHRlcl9pdGVtcyA9IF8uY29tcGFjdChmaWx0ZXJfaXRlbXMpXG5cdGVycm9yTXNnID0gXCJcIlxuXHRmaWx0ZXJfbGVuZ3RoID0gZmlsdGVyX2l0ZW1zLmxlbmd0aFxuXHRpZiBsb2dpY1xuXHRcdCMg5qC85byP5YyWZmlsdGVyXG5cdFx0bG9naWMgPSBsb2dpYy5yZXBsYWNlKC9cXG4vZywgXCJcIikucmVwbGFjZSgvXFxzKy9nLCBcIiBcIilcblxuXHRcdCMg5Yik5pat54m55q6K5a2X56ymXG5cdFx0aWYgL1suX1xcLSErXSsvaWcudGVzdChsb2dpYylcblx0XHRcdGVycm9yTXNnID0gXCLlkKvmnInnibnmrorlrZfnrKbjgIJcIlxuXG5cdFx0aWYgIWVycm9yTXNnXG5cdFx0XHRpbmRleCA9IGxvZ2ljLm1hdGNoKC9cXGQrL2lnKVxuXHRcdFx0aWYgIWluZGV4XG5cdFx0XHRcdGVycm9yTXNnID0gXCLmnInkupvnrZvpgInmnaHku7bov5vooYzkuoblrprkuYnvvIzkvYbmnKrlnKjpq5jnuqfnrZvpgInmnaHku7bkuK3ooqvlvJXnlKjjgIJcIlxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRpbmRleC5mb3JFYWNoIChpKS0+XG5cdFx0XHRcdFx0aWYgaSA8IDEgb3IgaSA+IGZpbHRlcl9sZW5ndGhcblx0XHRcdFx0XHRcdGVycm9yTXNnID0gXCLmgqjnmoTnrZvpgInmnaHku7blvJXnlKjkuobmnKrlrprkuYnnmoTnrZvpgInlmajvvJoje2l944CCXCJcblxuXHRcdFx0XHRmbGFnID0gMVxuXHRcdFx0XHR3aGlsZSBmbGFnIDw9IGZpbHRlcl9sZW5ndGhcblx0XHRcdFx0XHRpZiAhaW5kZXguaW5jbHVkZXMoXCIje2ZsYWd9XCIpXG5cdFx0XHRcdFx0XHRlcnJvck1zZyA9IFwi5pyJ5Lqb562b6YCJ5p2h5Lu26L+b6KGM5LqG5a6a5LmJ77yM5L2G5pyq5Zyo6auY57qn562b6YCJ5p2h5Lu25Lit6KKr5byV55So44CCXCJcblx0XHRcdFx0XHRmbGFnKys7XG5cblx0XHRpZiAhZXJyb3JNc2dcblx0XHRcdCMg5Yik5pat5piv5ZCm5pyJ6Z2e5rOV6Iux5paH5a2X56ymXG5cdFx0XHR3b3JkID0gbG9naWMubWF0Y2goL1thLXpBLVpdKy9pZylcblx0XHRcdGlmIHdvcmRcblx0XHRcdFx0d29yZC5mb3JFYWNoICh3KS0+XG5cdFx0XHRcdFx0aWYgIS9eKGFuZHxvcikkL2lnLnRlc3Qodylcblx0XHRcdFx0XHRcdGVycm9yTXNnID0gXCLmo4Dmn6XmgqjnmoTpq5jnuqfnrZvpgInmnaHku7bkuK3nmoTmi7zlhpnjgIJcIlxuXG5cdFx0aWYgIWVycm9yTXNnXG5cdFx0XHQjIOWIpOaWreagvOW8j+aYr+WQpuato+ehrlxuXHRcdFx0dHJ5XG5cdFx0XHRcdENyZWF0b3IuZXZhbChsb2dpYy5yZXBsYWNlKC9hbmQvaWcsIFwiJiZcIikucmVwbGFjZSgvb3IvaWcsIFwifHxcIikpXG5cdFx0XHRjYXRjaCBlXG5cdFx0XHRcdGVycm9yTXNnID0gXCLmgqjnmoTnrZvpgInlmajkuK3lkKvmnInnibnmrorlrZfnrKZcIlxuXG5cdFx0XHRpZiAvKEFORClbXigpXSsoT1IpL2lnLnRlc3QobG9naWMpIHx8ICAvKE9SKVteKCldKyhBTkQpL2lnLnRlc3QobG9naWMpXG5cdFx0XHRcdGVycm9yTXNnID0gXCLmgqjnmoTnrZvpgInlmajlv4XpobvlnKjov57nu63mgKfnmoQgQU5EIOWSjCBPUiDooajovr7lvI/liY3lkI7kvb/nlKjmi6zlj7fjgIJcIlxuXHRpZiBlcnJvck1zZ1xuXHRcdGNvbnNvbGUubG9nIFwiZXJyb3JcIiwgZXJyb3JNc2dcblx0XHRpZiBNZXRlb3IuaXNDbGllbnRcblx0XHRcdHRvYXN0ci5lcnJvcihlcnJvck1zZylcblx0XHRyZXR1cm4gZmFsc2Vcblx0ZWxzZVxuXHRcdHJldHVybiB0cnVlXG5cbiMgXCI9XCIsIFwiPD5cIiwgXCI+XCIsIFwiPj1cIiwgXCI8XCIsIFwiPD1cIiwgXCJzdGFydHN3aXRoXCIsIFwiY29udGFpbnNcIiwgXCJub3Rjb250YWluc1wiLlxuIyMjXG5vcHRpb25z5Y+C5pWw77yaXG5cdGV4dGVuZC0tIOaYr+WQpumcgOimgeaKiuW9k+WJjeeUqOaIt+WfuuacrOS/oeaBr+WKoOWFpeWFrOW8j++8jOWNs+iuqeWFrOW8j+aUr+aMgUNyZWF0b3IuVVNFUl9DT05URVhU5Lit55qE5YC877yM6buY6K6k5Li6dHJ1ZVxuXHR1c2VySWQtLSDlvZPliY3nmbvlvZXnlKjmiLdcblx0c3BhY2VJZC0tIOW9k+WJjeaJgOWcqOW3peS9nOWMulxuZXh0ZW5k5Li6dHJ1ZeaXtu+8jOWQjuerr+mcgOimgemineWkluS8oOWFpXVzZXJJZOWPinNwYWNlSWTnlKjkuo7mipPlj5ZDcmVhdG9yLlVTRVJfQ09OVEVYVOWvueW6lOeahOWAvFxuIyMjXG5DcmVhdG9yLmZvcm1hdEZpbHRlcnNUb01vbmdvID0gKGZpbHRlcnMsIG9wdGlvbnMpLT5cblx0dW5sZXNzIGZpbHRlcnM/Lmxlbmd0aFxuXHRcdHJldHVyblxuXHQjIOW9k2ZpbHRlcnPkuI3mmK9bQXJyYXld57G75Z6L6ICM5pivW09iamVjdF3nsbvlnovml7bvvIzov5vooYzmoLzlvI/ovazmjaJcblx0dW5sZXNzIGZpbHRlcnNbMF0gaW5zdGFuY2VvZiBBcnJheVxuXHRcdGZpbHRlcnMgPSBfLm1hcCBmaWx0ZXJzLCAob2JqKS0+XG5cdFx0XHRyZXR1cm4gW29iai5maWVsZCwgb2JqLm9wZXJhdGlvbiwgb2JqLnZhbHVlXVxuXHRzZWxlY3RvciA9IFtdXG5cdF8uZWFjaCBmaWx0ZXJzLCAoZmlsdGVyKS0+XG5cdFx0ZmllbGQgPSBmaWx0ZXJbMF1cblx0XHRvcHRpb24gPSBmaWx0ZXJbMV1cblx0XHRpZiBNZXRlb3IuaXNDbGllbnRcblx0XHRcdHZhbHVlID0gQ3JlYXRvci5ldmFsdWF0ZUZvcm11bGEoZmlsdGVyWzJdKVxuXHRcdGVsc2Vcblx0XHRcdHZhbHVlID0gQ3JlYXRvci5ldmFsdWF0ZUZvcm11bGEoZmlsdGVyWzJdLCBudWxsLCBvcHRpb25zKVxuXHRcdHN1Yl9zZWxlY3RvciA9IHt9XG5cdFx0c3ViX3NlbGVjdG9yW2ZpZWxkXSA9IHt9XG5cdFx0aWYgb3B0aW9uID09IFwiPVwiXG5cdFx0XHRzdWJfc2VsZWN0b3JbZmllbGRdW1wiJGVxXCJdID0gdmFsdWVcblx0XHRlbHNlIGlmIG9wdGlvbiA9PSBcIjw+XCJcblx0XHRcdHN1Yl9zZWxlY3RvcltmaWVsZF1bXCIkbmVcIl0gPSB2YWx1ZVxuXHRcdGVsc2UgaWYgb3B0aW9uID09IFwiPlwiXG5cdFx0XHRzdWJfc2VsZWN0b3JbZmllbGRdW1wiJGd0XCJdID0gdmFsdWVcblx0XHRlbHNlIGlmIG9wdGlvbiA9PSBcIj49XCJcblx0XHRcdHN1Yl9zZWxlY3RvcltmaWVsZF1bXCIkZ3RlXCJdID0gdmFsdWVcblx0XHRlbHNlIGlmIG9wdGlvbiA9PSBcIjxcIlxuXHRcdFx0c3ViX3NlbGVjdG9yW2ZpZWxkXVtcIiRsdFwiXSA9IHZhbHVlXG5cdFx0ZWxzZSBpZiBvcHRpb24gPT0gXCI8PVwiXG5cdFx0XHRzdWJfc2VsZWN0b3JbZmllbGRdW1wiJGx0ZVwiXSA9IHZhbHVlXG5cdFx0ZWxzZSBpZiBvcHRpb24gPT0gXCJzdGFydHN3aXRoXCJcblx0XHRcdHJlZyA9IG5ldyBSZWdFeHAoXCJeXCIgKyB2YWx1ZSwgXCJpXCIpXG5cdFx0XHRzdWJfc2VsZWN0b3JbZmllbGRdW1wiJHJlZ2V4XCJdID0gcmVnXG5cdFx0ZWxzZSBpZiBvcHRpb24gPT0gXCJjb250YWluc1wiXG5cdFx0XHRyZWcgPSBuZXcgUmVnRXhwKHZhbHVlLCBcImlcIilcblx0XHRcdHN1Yl9zZWxlY3RvcltmaWVsZF1bXCIkcmVnZXhcIl0gPSByZWdcblx0XHRlbHNlIGlmIG9wdGlvbiA9PSBcIm5vdGNvbnRhaW5zXCJcblx0XHRcdHJlZyA9IG5ldyBSZWdFeHAoXCJeKCg/IVwiICsgdmFsdWUgKyBcIikuKSokXCIsIFwiaVwiKVxuXHRcdFx0c3ViX3NlbGVjdG9yW2ZpZWxkXVtcIiRyZWdleFwiXSA9IHJlZ1xuXHRcdHNlbGVjdG9yLnB1c2ggc3ViX3NlbGVjdG9yXG5cdHJldHVybiBzZWxlY3RvclxuXG5DcmVhdG9yLmlzQmV0d2VlbkZpbHRlck9wZXJhdGlvbiA9IChvcGVyYXRpb24pLT5cblx0cmV0dXJuIG9wZXJhdGlvbiA9PSBcImJldHdlZW5cIiBvciAhIUNyZWF0b3IuZ2V0QmV0d2VlblRpbWVCdWlsdGluVmFsdWVzKHRydWUpP1tvcGVyYXRpb25dXG5cbiMjI1xub3B0aW9uc+WPguaVsO+8mlxuXHRleHRlbmQtLSDmmK/lkKbpnIDopoHmiorlvZPliY3nlKjmiLfln7rmnKzkv6Hmga/liqDlhaXlhazlvI/vvIzljbPorqnlhazlvI/mlK/mjIFDcmVhdG9yLlVTRVJfQ09OVEVYVOS4reeahOWAvO+8jOm7mOiupOS4unRydWVcblx0dXNlcklkLS0g5b2T5YmN55m75b2V55So5oi3XG5cdHNwYWNlSWQtLSDlvZPliY3miYDlnKjlt6XkvZzljLpcblx0ZXh0ZW5k5Li6dHJ1ZeaXtu+8jOWQjuerr+mcgOimgemineWkluS8oOWFpXVzZXJJZOWPinNwYWNlSWTnlKjkuo7mipPlj5ZDcmVhdG9yLlVTRVJfQ09OVEVYVOWvueW6lOeahOWAvFxuIyMjXG5DcmVhdG9yLmZvcm1hdEZpbHRlcnNUb0RldiA9IChmaWx0ZXJzLCBvYmplY3RfbmFtZSwgb3B0aW9ucyktPlxuXHR1bmxlc3MgZmlsdGVycy5sZW5ndGhcblx0XHRyZXR1cm5cblx0aWYgb3B0aW9ucz8uaXNfbG9naWNfb3Jcblx0XHQjIOWmguaenGlzX2xvZ2ljX29y5Li6dHJ1Ze+8jOS4umZpbHRlcnPnrKzkuIDlsYLlhYPntKDlop7liqBvcumXtOmalFxuXHRcdGxvZ2ljVGVtcEZpbHRlcnMgPSBbXVxuXHRcdGZpbHRlcnMuZm9yRWFjaCAobiktPlxuXHRcdFx0bG9naWNUZW1wRmlsdGVycy5wdXNoKG4pXG5cdFx0XHRsb2dpY1RlbXBGaWx0ZXJzLnB1c2goXCJvclwiKVxuXHRcdGxvZ2ljVGVtcEZpbHRlcnMucG9wKClcblx0XHRmaWx0ZXJzID0gbG9naWNUZW1wRmlsdGVyc1xuXHRzZWxlY3RvciA9IFN0ZWVkb3NGaWx0ZXJzLmZvcm1hdEZpbHRlcnNUb0RldihmaWx0ZXJzLCBDcmVhdG9yLlVTRVJfQ09OVEVYVClcblx0cmV0dXJuIHNlbGVjdG9yXG5cbiMjI1xub3B0aW9uc+WPguaVsO+8mlxuXHRleHRlbmQtLSDmmK/lkKbpnIDopoHmiorlvZPliY3nlKjmiLfln7rmnKzkv6Hmga/liqDlhaXlhazlvI/vvIzljbPorqnlhazlvI/mlK/mjIFDcmVhdG9yLlVTRVJfQ09OVEVYVOS4reeahOWAvO+8jOm7mOiupOS4unRydWVcblx0dXNlcklkLS0g5b2T5YmN55m75b2V55So5oi3XG5cdHNwYWNlSWQtLSDlvZPliY3miYDlnKjlt6XkvZzljLpcbmV4dGVuZOS4unRydWXml7bvvIzlkI7nq6/pnIDopoHpop3lpJbkvKDlhaV1c2VySWTlj4pzcGFjZUlk55So5LqO5oqT5Y+WQ3JlYXRvci5VU0VSX0NPTlRFWFTlr7nlupTnmoTlgLxcbiMjI1xuQ3JlYXRvci5mb3JtYXRMb2dpY0ZpbHRlcnNUb0RldiA9IChmaWx0ZXJzLCBmaWx0ZXJfbG9naWMsIG9wdGlvbnMpLT5cblx0Zm9ybWF0X2xvZ2ljID0gZmlsdGVyX2xvZ2ljLnJlcGxhY2UoL1xcKFxccysvaWcsIFwiKFwiKS5yZXBsYWNlKC9cXHMrXFwpL2lnLCBcIilcIikucmVwbGFjZSgvXFwoL2csIFwiW1wiKS5yZXBsYWNlKC9cXCkvZywgXCJdXCIpLnJlcGxhY2UoL1xccysvZywgXCIsXCIpLnJlcGxhY2UoLyhhbmR8b3IpL2lnLCBcIickMSdcIilcblx0Zm9ybWF0X2xvZ2ljID0gZm9ybWF0X2xvZ2ljLnJlcGxhY2UoLyhcXGQpKy9pZywgKHgpLT5cblx0XHRfZiA9IGZpbHRlcnNbeC0xXVxuXHRcdGZpZWxkID0gX2YuZmllbGRcblx0XHRvcHRpb24gPSBfZi5vcGVyYXRpb25cblx0XHRpZiBNZXRlb3IuaXNDbGllbnRcblx0XHRcdHZhbHVlID0gQ3JlYXRvci5ldmFsdWF0ZUZvcm11bGEoX2YudmFsdWUpXG5cdFx0ZWxzZVxuXHRcdFx0dmFsdWUgPSBDcmVhdG9yLmV2YWx1YXRlRm9ybXVsYShfZi52YWx1ZSwgbnVsbCwgb3B0aW9ucylcblx0XHRzdWJfc2VsZWN0b3IgPSBbXVxuXHRcdGlmIF8uaXNBcnJheSh2YWx1ZSkgPT0gdHJ1ZVxuXHRcdFx0aWYgb3B0aW9uID09IFwiPVwiXG5cdFx0XHRcdF8uZWFjaCB2YWx1ZSwgKHYpLT5cblx0XHRcdFx0XHRzdWJfc2VsZWN0b3IucHVzaCBbZmllbGQsIG9wdGlvbiwgdl0sIFwib3JcIlxuXHRcdFx0ZWxzZSBpZiBvcHRpb24gPT0gXCI8PlwiXG5cdFx0XHRcdF8uZWFjaCB2YWx1ZSwgKHYpLT5cblx0XHRcdFx0XHRzdWJfc2VsZWN0b3IucHVzaCBbZmllbGQsIG9wdGlvbiwgdl0sIFwiYW5kXCJcblx0XHRcdGVsc2Vcblx0XHRcdFx0Xy5lYWNoIHZhbHVlLCAodiktPlxuXHRcdFx0XHRcdHN1Yl9zZWxlY3Rvci5wdXNoIFtmaWVsZCwgb3B0aW9uLCB2XSwgXCJvclwiXG5cdFx0XHRpZiBzdWJfc2VsZWN0b3Jbc3ViX3NlbGVjdG9yLmxlbmd0aCAtIDFdID09IFwiYW5kXCIgfHwgc3ViX3NlbGVjdG9yW3N1Yl9zZWxlY3Rvci5sZW5ndGggLSAxXSA9PSBcIm9yXCJcblx0XHRcdFx0c3ViX3NlbGVjdG9yLnBvcCgpXG5cdFx0ZWxzZVxuXHRcdFx0c3ViX3NlbGVjdG9yID0gW2ZpZWxkLCBvcHRpb24sIHZhbHVlXVxuXHRcdGNvbnNvbGUubG9nIFwic3ViX3NlbGVjdG9yXCIsIHN1Yl9zZWxlY3RvclxuXHRcdHJldHVybiBKU09OLnN0cmluZ2lmeShzdWJfc2VsZWN0b3IpXG5cdClcblx0Zm9ybWF0X2xvZ2ljID0gXCJbI3tmb3JtYXRfbG9naWN9XVwiXG5cdHJldHVybiBDcmVhdG9yLmV2YWwoZm9ybWF0X2xvZ2ljKVxuXG5DcmVhdG9yLmdldFJlbGF0ZWRPYmplY3RzID0gKG9iamVjdF9uYW1lLCBzcGFjZUlkLCB1c2VySWQpLT5cblx0aWYgTWV0ZW9yLmlzQ2xpZW50XG5cdFx0aWYgIW9iamVjdF9uYW1lXG5cdFx0XHRvYmplY3RfbmFtZSA9IFNlc3Npb24uZ2V0KFwib2JqZWN0X25hbWVcIilcblx0XHRpZiAhc3BhY2VJZFxuXHRcdFx0c3BhY2VJZCA9IFNlc3Npb24uZ2V0KFwic3BhY2VJZFwiKVxuXHRcdGlmICF1c2VySWRcblx0XHRcdHVzZXJJZCA9IE1ldGVvci51c2VySWQoKVxuXG5cdHJlbGF0ZWRfb2JqZWN0X25hbWVzID0gW11cblx0X29iamVjdCA9IENyZWF0b3IuZ2V0T2JqZWN0KG9iamVjdF9uYW1lKVxuXG5cdGlmICFfb2JqZWN0XG5cdFx0cmV0dXJuIHJlbGF0ZWRfb2JqZWN0X25hbWVzXG5cbiNcdHJlbGF0ZWRfb2JqZWN0X25hbWVzID0gXy5wbHVjayhfb2JqZWN0LnJlbGF0ZWRfb2JqZWN0cyxcIm9iamVjdF9uYW1lXCIpXG5cblx0cmVsYXRlZF9vYmplY3RzID0gQ3JlYXRvci5nZXRPYmplY3RSZWxhdGVkcyhfb2JqZWN0Ll9jb2xsZWN0aW9uX25hbWUpXG5cblx0cmVsYXRlZF9vYmplY3RfbmFtZXMgPSBfLnBsdWNrKHJlbGF0ZWRfb2JqZWN0cyxcIm9iamVjdF9uYW1lXCIpXG5cdGlmIHJlbGF0ZWRfb2JqZWN0X25hbWVzPy5sZW5ndGggPT0gMFxuXHRcdHJldHVybiByZWxhdGVkX29iamVjdF9uYW1lc1xuXG5cdHBlcm1pc3Npb25zID0gQ3JlYXRvci5nZXRQZXJtaXNzaW9ucyhvYmplY3RfbmFtZSwgc3BhY2VJZCwgdXNlcklkKVxuXHR1bnJlbGF0ZWRfb2JqZWN0cyA9IHBlcm1pc3Npb25zLnVucmVsYXRlZF9vYmplY3RzXG5cblx0cmVsYXRlZF9vYmplY3RfbmFtZXMgPSBfLmRpZmZlcmVuY2UgcmVsYXRlZF9vYmplY3RfbmFtZXMsIHVucmVsYXRlZF9vYmplY3RzXG5cdHJldHVybiBfLmZpbHRlciByZWxhdGVkX29iamVjdHMsIChyZWxhdGVkX29iamVjdCktPlxuXHRcdHJlbGF0ZWRfb2JqZWN0X25hbWUgPSByZWxhdGVkX29iamVjdC5vYmplY3RfbmFtZVxuXHRcdGlzQWN0aXZlID0gcmVsYXRlZF9vYmplY3RfbmFtZXMuaW5kZXhPZihyZWxhdGVkX29iamVjdF9uYW1lKSA+IC0xXG5cdFx0IyByZWxhdGVkX29iamVjdF9uYW1lID0gaWYgcmVsYXRlZF9vYmplY3RfbmFtZSA9PSBcImNmc19maWxlc19maWxlcmVjb3JkXCIgdGhlbiBcImNmcy5maWxlcy5maWxlcmVjb3JkXCIgZWxzZSByZWxhdGVkX29iamVjdF9uYW1lXG5cdFx0YWxsb3dSZWFkID0gQ3JlYXRvci5nZXRQZXJtaXNzaW9ucyhyZWxhdGVkX29iamVjdF9uYW1lLCBzcGFjZUlkLCB1c2VySWQpPy5hbGxvd1JlYWRcblx0XHRpZiByZWxhdGVkX29iamVjdF9uYW1lID09IFwiY21zX2ZpbGVzXCJcblx0XHRcdGFsbG93UmVhZCA9IGFsbG93UmVhZCAmJiBwZXJtaXNzaW9ucy5hbGxvd1JlYWRGaWxlc1xuXHRcdHJldHVybiBpc0FjdGl2ZSBhbmQgYWxsb3dSZWFkXG5cbkNyZWF0b3IuZ2V0UmVsYXRlZE9iamVjdE5hbWVzID0gKG9iamVjdF9uYW1lLCBzcGFjZUlkLCB1c2VySWQpLT5cblx0cmVsYXRlZF9vYmplY3RzID0gQ3JlYXRvci5nZXRSZWxhdGVkT2JqZWN0cyhvYmplY3RfbmFtZSwgc3BhY2VJZCwgdXNlcklkKVxuXHRyZXR1cm4gXy5wbHVjayhyZWxhdGVkX29iamVjdHMsXCJvYmplY3RfbmFtZVwiKVxuXG5DcmVhdG9yLmdldFJlbGF0ZWRPYmplY3RMaXN0QWN0aW9ucyA9IChyZWxhdGVkT2JqZWN0TmFtZSwgc3BhY2VJZCwgdXNlcklkKS0+XG5cdGFjdGlvbnMgPSBDcmVhdG9yLmdldEFjdGlvbnMocmVsYXRlZE9iamVjdE5hbWUsIHNwYWNlSWQsIHVzZXJJZClcblx0YWN0aW9ucyA9IF8uZmlsdGVyIGFjdGlvbnMsIChhY3Rpb24pLT5cblx0XHRpZiBhY3Rpb24ubmFtZSA9PSBcInN0YW5kYXJkX2ZvbGxvd1wiXG5cdFx0XHRyZXR1cm4gZmFsc2Vcblx0XHRpZiBhY3Rpb24ubmFtZSA9PSBcInN0YW5kYXJkX3F1ZXJ5XCJcblx0XHRcdHJldHVybiBmYWxzZVxuXHRcdGlmIGFjdGlvbi5vbiA9PSBcImxpc3RcIlxuXHRcdFx0aWYgdHlwZW9mIGFjdGlvbi52aXNpYmxlID09IFwiZnVuY3Rpb25cIlxuXHRcdFx0XHRyZXR1cm4gYWN0aW9uLnZpc2libGUoKVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRyZXR1cm4gYWN0aW9uLnZpc2libGVcblx0XHRlbHNlXG5cdFx0XHRyZXR1cm4gZmFsc2Vcblx0cmV0dXJuIGFjdGlvbnNcblxuQ3JlYXRvci5nZXRBY3Rpb25zID0gKG9iamVjdF9uYW1lLCBzcGFjZUlkLCB1c2VySWQpLT5cblx0aWYgTWV0ZW9yLmlzQ2xpZW50XG5cdFx0aWYgIW9iamVjdF9uYW1lXG5cdFx0XHRvYmplY3RfbmFtZSA9IFNlc3Npb24uZ2V0KFwib2JqZWN0X25hbWVcIilcblx0XHRpZiAhc3BhY2VJZFxuXHRcdFx0c3BhY2VJZCA9IFNlc3Npb24uZ2V0KFwic3BhY2VJZFwiKVxuXHRcdGlmICF1c2VySWRcblx0XHRcdHVzZXJJZCA9IE1ldGVvci51c2VySWQoKVxuXG5cdG9iaiA9IENyZWF0b3IuZ2V0T2JqZWN0KG9iamVjdF9uYW1lKVxuXG5cdGlmICFvYmpcblx0XHRyZXR1cm5cblxuXHRwZXJtaXNzaW9ucyA9IENyZWF0b3IuZ2V0UGVybWlzc2lvbnMob2JqZWN0X25hbWUsIHNwYWNlSWQsIHVzZXJJZClcblx0ZGlzYWJsZWRfYWN0aW9ucyA9IHBlcm1pc3Npb25zLmRpc2FibGVkX2FjdGlvbnNcblx0YWN0aW9ucyA9IF8uc29ydEJ5KF8udmFsdWVzKG9iai5hY3Rpb25zKSAsICdzb3J0Jyk7XG5cblx0aWYgXy5oYXMob2JqLCAnYWxsb3dfY3VzdG9tQWN0aW9ucycpXG5cdFx0YWN0aW9ucyA9IF8uZmlsdGVyIGFjdGlvbnMsIChhY3Rpb24pLT5cblx0XHRcdHJldHVybiBfLmluY2x1ZGUob2JqLmFsbG93X2N1c3RvbUFjdGlvbnMsIGFjdGlvbi5uYW1lKSB8fCBfLmluY2x1ZGUoXy5rZXlzKENyZWF0b3IuZ2V0T2JqZWN0KCdiYXNlJykuYWN0aW9ucykgfHwge30sIGFjdGlvbi5uYW1lKVxuXHRpZiBfLmhhcyhvYmosICdleGNsdWRlX2FjdGlvbnMnKVxuXHRcdGFjdGlvbnMgPSBfLmZpbHRlciBhY3Rpb25zLCAoYWN0aW9uKS0+XG5cdFx0XHRyZXR1cm4gIV8uaW5jbHVkZShvYmouZXhjbHVkZV9hY3Rpb25zLCBhY3Rpb24ubmFtZSlcblxuXHRfLmVhY2ggYWN0aW9ucywgKGFjdGlvbiktPlxuXHRcdCMg5omL5py65LiK5Y+q5pi+56S657yW6L6R5oyJ6ZKu77yM5YW25LuW55qE5pS+5Yiw5oqY5Y+g5LiL5ouJ6I+c5Y2V5LitXG5cdFx0aWYgU3RlZWRvcy5pc01vYmlsZSgpICYmIFtcInJlY29yZFwiLCBcInJlY29yZF9vbmx5XCJdLmluZGV4T2YoYWN0aW9uLm9uKSA+IC0xICYmIGFjdGlvbi5uYW1lICE9ICdzdGFuZGFyZF9lZGl0J1xuXHRcdFx0aWYgYWN0aW9uLm9uID09IFwicmVjb3JkX29ubHlcIlxuXHRcdFx0XHRhY3Rpb24ub24gPSAncmVjb3JkX29ubHlfbW9yZSdcblx0XHRcdGVsc2Vcblx0XHRcdFx0YWN0aW9uLm9uID0gJ3JlY29yZF9tb3JlJ1xuXG5cdGlmIFN0ZWVkb3MuaXNNb2JpbGUoKSAmJiBbXCJjbXNfZmlsZXNcIiwgXCJjZnMuZmlsZXMuZmlsZXJlY29yZFwiXS5pbmRleE9mKG9iamVjdF9uYW1lKSA+IC0xXG5cdFx0IyDpmYTku7bnibnmrorlpITnkIbvvIzkuIvovb3mjInpkq7mlL7lnKjkuLvoj5zljZXvvIznvJbovpHmjInpkq7mlL7liLDlupXkuIvmipjlj6DkuIvmi4noj5zljZXkuK1cblx0XHRhY3Rpb25zLmZpbmQoKG4pLT4gcmV0dXJuIG4ubmFtZSA9PSBcInN0YW5kYXJkX2VkaXRcIik/Lm9uID0gXCJyZWNvcmRfbW9yZVwiXG5cdFx0YWN0aW9ucy5maW5kKChuKS0+IHJldHVybiBuLm5hbWUgPT0gXCJkb3dubG9hZFwiKT8ub24gPSBcInJlY29yZFwiXG5cblx0YWN0aW9ucyA9IF8uZmlsdGVyIGFjdGlvbnMsIChhY3Rpb24pLT5cblx0XHRyZXR1cm4gXy5pbmRleE9mKGRpc2FibGVkX2FjdGlvbnMsIGFjdGlvbi5uYW1lKSA8IDBcblxuXHRyZXR1cm4gYWN0aW9uc1xuXG4vLy9cblx06L+U5Zue5b2T5YmN55So5oi35pyJ5p2D6ZmQ6K6/6Zeu55qE5omA5pyJbGlzdF92aWV377yM5YyF5ous5YiG5Lqr55qE77yM55So5oi36Ieq5a6a5LmJ6Z2e5YiG5Lqr55qE77yI6Zmk6Z2eb3duZXLlj5jkuobvvInvvIzku6Xlj4rpu5jorqTnmoTlhbbku5bop4blm75cblx05rOo5oSPQ3JlYXRvci5nZXRQZXJtaXNzaW9uc+WHveaVsOS4reaYr+S4jeS8muacieeUqOaIt+iHquWumuS5iemdnuWIhuS6q+eahOinhuWbvueahO+8jOaJgOS7pUNyZWF0b3IuZ2V0UGVybWlzc2lvbnPlh73mlbDkuK3mi7/liLDnmoTnu5PmnpzkuI3lhajvvIzlubbkuI3mmK/lvZPliY3nlKjmiLfog73nnIvliLDmiYDmnInop4blm75cbi8vL1xuQ3JlYXRvci5nZXRMaXN0Vmlld3MgPSAob2JqZWN0X25hbWUsIHNwYWNlSWQsIHVzZXJJZCktPlxuXHRpZiBNZXRlb3IuaXNDbGllbnRcblx0XHRpZiAhb2JqZWN0X25hbWVcblx0XHRcdG9iamVjdF9uYW1lID0gU2Vzc2lvbi5nZXQoXCJvYmplY3RfbmFtZVwiKVxuXHRcdGlmICFzcGFjZUlkXG5cdFx0XHRzcGFjZUlkID0gU2Vzc2lvbi5nZXQoXCJzcGFjZUlkXCIpXG5cdFx0aWYgIXVzZXJJZFxuXHRcdFx0dXNlcklkID0gTWV0ZW9yLnVzZXJJZCgpXG5cdFxuXHR1bmxlc3Mgb2JqZWN0X25hbWVcblx0XHRyZXR1cm5cblxuXHRvYmplY3QgPSBDcmVhdG9yLmdldE9iamVjdChvYmplY3RfbmFtZSlcblxuXHRpZiAhb2JqZWN0XG5cdFx0cmV0dXJuXG5cblx0ZGlzYWJsZWRfbGlzdF92aWV3cyA9IENyZWF0b3IuZ2V0UGVybWlzc2lvbnMob2JqZWN0X25hbWUsIHNwYWNlSWQsIHVzZXJJZCk/LmRpc2FibGVkX2xpc3Rfdmlld3MgfHwgW11cblxuXHRsaXN0X3ZpZXdzID0gW11cblxuXHRpc01vYmlsZSA9IFN0ZWVkb3MuaXNNb2JpbGUoKVxuXG5cdF8uZWFjaCBvYmplY3QubGlzdF92aWV3cywgKGl0ZW0sIGl0ZW1fbmFtZSktPlxuXHRcdGl0ZW0ubmFtZSA9IGl0ZW1fbmFtZVxuXG5cdGxpc3RWaWV3cyA9IF8uc29ydEJ5KF8udmFsdWVzKG9iamVjdC5saXN0X3ZpZXdzKSAsICdzb3J0X25vJyk7XG5cblx0Xy5lYWNoIGxpc3RWaWV3cywgKGl0ZW0pLT5cblx0XHRpZiBpc01vYmlsZSBhbmQgaXRlbS50eXBlID09IFwiY2FsZW5kYXJcIlxuXHRcdFx0IyDmiYvmnLrkuIrlhYjkuI3mmL7npLrml6Xljobop4blm75cblx0XHRcdHJldHVyblxuXHRcdGlmIGl0ZW0ubmFtZSAgIT0gXCJkZWZhdWx0XCJcblx0XHRcdGlzRGlzYWJsZWQgPSBfLmluZGV4T2YoZGlzYWJsZWRfbGlzdF92aWV3cywgaXRlbS5uYW1lKSA+IC0xIHx8IChpdGVtLl9pZCAmJiBfLmluZGV4T2YoZGlzYWJsZWRfbGlzdF92aWV3cywgaXRlbS5faWQpID4gLTEpXG5cdFx0XHRpZiAhaXNEaXNhYmxlZCB8fCBpdGVtLm93bmVyID09IHVzZXJJZFxuXHRcdFx0XHRsaXN0X3ZpZXdzLnB1c2ggaXRlbVxuXHRyZXR1cm4gbGlzdF92aWV3c1xuXG4jIOWJjeWPsOeQhuiuuuS4iuS4jeW6lOivpeiwg+eUqOivpeWHveaVsO+8jOWboOS4uuWtl+auteeahOadg+mZkOmDveWcqENyZWF0b3IuZ2V0T2JqZWN0KG9iamVjdF9uYW1lKS5maWVsZHPnmoTnm7jlhbPlsZ7mgKfkuK3mnInmoIfor4bkuoZcbkNyZWF0b3IuZ2V0RmllbGRzID0gKG9iamVjdF9uYW1lLCBzcGFjZUlkLCB1c2VySWQpLT5cblx0aWYgTWV0ZW9yLmlzQ2xpZW50XG5cdFx0aWYgIW9iamVjdF9uYW1lXG5cdFx0XHRvYmplY3RfbmFtZSA9IFNlc3Npb24uZ2V0KFwib2JqZWN0X25hbWVcIilcblx0XHRpZiAhc3BhY2VJZFxuXHRcdFx0c3BhY2VJZCA9IFNlc3Npb24uZ2V0KFwic3BhY2VJZFwiKVxuXHRcdGlmICF1c2VySWRcblx0XHRcdHVzZXJJZCA9IE1ldGVvci51c2VySWQoKVxuXG5cdGZpZWxkc05hbWUgPSBDcmVhdG9yLmdldE9iamVjdEZpZWxkc05hbWUob2JqZWN0X25hbWUpXG5cdHVucmVhZGFibGVfZmllbGRzID0gIENyZWF0b3IuZ2V0UGVybWlzc2lvbnMob2JqZWN0X25hbWUsIHNwYWNlSWQsIHVzZXJJZCk/LnVucmVhZGFibGVfZmllbGRzXG5cdHJldHVybiBfLmRpZmZlcmVuY2UoZmllbGRzTmFtZSwgdW5yZWFkYWJsZV9maWVsZHMpXG5cbkNyZWF0b3IuaXNsb2FkaW5nID0gKCktPlxuXHRyZXR1cm4gIUNyZWF0b3IuYm9vdHN0cmFwTG9hZGVkLmdldCgpXG5cbkNyZWF0b3IuY29udmVydFNwZWNpYWxDaGFyYWN0ZXIgPSAoc3RyKS0+XG5cdHJldHVybiBzdHIucmVwbGFjZSgvKFtcXF5cXCRcXChcXClcXCpcXCtcXD9cXC5cXFxcXFx8XFxbXFxdXFx7XFx9XSkvZywgXCJcXFxcJDFcIilcblxuIyDorqHnrpdmaWVsZHPnm7jlhbPlh73mlbBcbiMgU1RBUlRcbkNyZWF0b3IuZ2V0RGlzYWJsZWRGaWVsZHMgPSAoc2NoZW1hKS0+XG5cdGZpZWxkcyA9IF8ubWFwKHNjaGVtYSwgKGZpZWxkLCBmaWVsZE5hbWUpIC0+XG5cdFx0cmV0dXJuIGZpZWxkLmF1dG9mb3JtIGFuZCBmaWVsZC5hdXRvZm9ybS5kaXNhYmxlZCBhbmQgIWZpZWxkLmF1dG9mb3JtLm9taXQgYW5kIGZpZWxkTmFtZVxuXHQpXG5cdGZpZWxkcyA9IF8uY29tcGFjdChmaWVsZHMpXG5cdHJldHVybiBmaWVsZHNcblxuQ3JlYXRvci5nZXRIaWRkZW5GaWVsZHMgPSAoc2NoZW1hKS0+XG5cdGZpZWxkcyA9IF8ubWFwKHNjaGVtYSwgKGZpZWxkLCBmaWVsZE5hbWUpIC0+XG5cdFx0cmV0dXJuIGZpZWxkLmF1dG9mb3JtIGFuZCBmaWVsZC5hdXRvZm9ybS50eXBlID09IFwiaGlkZGVuXCIgYW5kICFmaWVsZC5hdXRvZm9ybS5vbWl0IGFuZCBmaWVsZE5hbWVcblx0KVxuXHRmaWVsZHMgPSBfLmNvbXBhY3QoZmllbGRzKVxuXHRyZXR1cm4gZmllbGRzXG5cbkNyZWF0b3IuZ2V0RmllbGRzV2l0aE5vR3JvdXAgPSAoc2NoZW1hKS0+XG5cdGZpZWxkcyA9IF8ubWFwKHNjaGVtYSwgKGZpZWxkLCBmaWVsZE5hbWUpIC0+XG5cdFx0cmV0dXJuICghZmllbGQuYXV0b2Zvcm0gb3IgIWZpZWxkLmF1dG9mb3JtLmdyb3VwIG9yIGZpZWxkLmF1dG9mb3JtLmdyb3VwID09IFwiLVwiKSBhbmQgKCFmaWVsZC5hdXRvZm9ybSBvciBmaWVsZC5hdXRvZm9ybS50eXBlICE9IFwiaGlkZGVuXCIpIGFuZCBmaWVsZE5hbWVcblx0KVxuXHRmaWVsZHMgPSBfLmNvbXBhY3QoZmllbGRzKVxuXHRyZXR1cm4gZmllbGRzXG5cbkNyZWF0b3IuZ2V0U29ydGVkRmllbGRHcm91cE5hbWVzID0gKHNjaGVtYSktPlxuXHRuYW1lcyA9IF8ubWFwKHNjaGVtYSwgKGZpZWxkKSAtPlxuIFx0XHRyZXR1cm4gZmllbGQuYXV0b2Zvcm0gYW5kIGZpZWxkLmF1dG9mb3JtLmdyb3VwICE9IFwiLVwiIGFuZCBmaWVsZC5hdXRvZm9ybS5ncm91cFxuXHQpXG5cdG5hbWVzID0gXy5jb21wYWN0KG5hbWVzKVxuXHRuYW1lcyA9IF8udW5pcXVlKG5hbWVzKVxuXHRyZXR1cm4gbmFtZXNcblxuQ3JlYXRvci5nZXRGaWVsZHNGb3JHcm91cCA9IChzY2hlbWEsIGdyb3VwTmFtZSkgLT5cbiAgXHRmaWVsZHMgPSBfLm1hcChzY2hlbWEsIChmaWVsZCwgZmllbGROYW1lKSAtPlxuICAgIFx0cmV0dXJuIGZpZWxkLmF1dG9mb3JtIGFuZCBmaWVsZC5hdXRvZm9ybS5ncm91cCA9PSBncm91cE5hbWUgYW5kIGZpZWxkLmF1dG9mb3JtLnR5cGUgIT0gXCJoaWRkZW5cIiBhbmQgZmllbGROYW1lXG4gIFx0KVxuICBcdGZpZWxkcyA9IF8uY29tcGFjdChmaWVsZHMpXG4gIFx0cmV0dXJuIGZpZWxkc1xuXG5DcmVhdG9yLmdldFN5c3RlbUJhc2VGaWVsZHMgPSAoKSAtPlxuXHRyZXR1cm4gW1wiY3JlYXRlZFwiLCBcImNyZWF0ZWRfYnlcIiwgXCJtb2RpZmllZFwiLCBcIm1vZGlmaWVkX2J5XCJdXG5cbkNyZWF0b3IuZ2V0RmllbGRzV2l0aG91dFN5c3RlbUJhc2UgPSAoa2V5cykgLT5cblx0cmV0dXJuIF8uZGlmZmVyZW5jZShrZXlzLCBDcmVhdG9yLmdldFN5c3RlbUJhc2VGaWVsZHMoKSk7XG5cbkNyZWF0b3IuZ2V0RmllbGRzV2l0aG91dE9taXQgPSAoc2NoZW1hLCBrZXlzKSAtPlxuXHRrZXlzID0gXy5tYXAoa2V5cywgKGtleSkgLT5cblx0XHRmaWVsZCA9IF8ucGljayhzY2hlbWEsIGtleSlcblx0XHRpZiBmaWVsZFtrZXldLmF1dG9mb3JtPy5vbWl0XG5cdFx0XHRyZXR1cm4gZmFsc2Vcblx0XHRlbHNlXG5cdFx0XHRyZXR1cm4ga2V5XG5cdClcblx0a2V5cyA9IF8uY29tcGFjdChrZXlzKVxuXHRyZXR1cm4ga2V5c1xuXG5DcmVhdG9yLmdldEZpZWxkc0luRmlyc3RMZXZlbCA9IChmaXJzdExldmVsS2V5cywga2V5cykgLT5cblx0a2V5cyA9IF8ubWFwKGtleXMsIChrZXkpIC0+XG5cdFx0aWYgXy5pbmRleE9mKGZpcnN0TGV2ZWxLZXlzLCBrZXkpID4gLTFcblx0XHRcdHJldHVybiBrZXlcblx0XHRlbHNlXG5cdFx0XHRyZXR1cm4gZmFsc2Vcblx0KVxuXHRrZXlzID0gXy5jb21wYWN0KGtleXMpXG5cdHJldHVybiBrZXlzXG5cbkNyZWF0b3IuZ2V0RmllbGRzRm9yUmVvcmRlciA9IChzY2hlbWEsIGtleXMsIGlzU2luZ2xlKSAtPlxuXHRmaWVsZHMgPSBbXVxuXHRpID0gMFxuXHRfa2V5cyA9IF8uZmlsdGVyKGtleXMsIChrZXkpLT5cblx0XHRyZXR1cm4gIWtleS5lbmRzV2l0aCgnX2VuZExpbmUnKVxuXHQpO1xuXHR3aGlsZSBpIDwgX2tleXMubGVuZ3RoXG5cdFx0c2NfMSA9IF8ucGljayhzY2hlbWEsIF9rZXlzW2ldKVxuXHRcdHNjXzIgPSBfLnBpY2soc2NoZW1hLCBfa2V5c1tpKzFdKVxuXG5cdFx0aXNfd2lkZV8xID0gZmFsc2Vcblx0XHRpc193aWRlXzIgPSBmYWxzZVxuXG4jXHRcdGlzX3JhbmdlXzEgPSBmYWxzZVxuI1x0XHRpc19yYW5nZV8yID0gZmFsc2VcblxuXHRcdF8uZWFjaCBzY18xLCAodmFsdWUpIC0+XG5cdFx0XHRpZiB2YWx1ZS5hdXRvZm9ybT8uaXNfd2lkZSB8fCB2YWx1ZS5hdXRvZm9ybT8udHlwZSA9PSBcInRhYmxlXCJcblx0XHRcdFx0aXNfd2lkZV8xID0gdHJ1ZVxuXG4jXHRcdFx0aWYgdmFsdWUuYXV0b2Zvcm0/LmlzX3JhbmdlXG4jXHRcdFx0XHRpc19yYW5nZV8xID0gdHJ1ZVxuXG5cdFx0Xy5lYWNoIHNjXzIsICh2YWx1ZSkgLT5cblx0XHRcdGlmIHZhbHVlLmF1dG9mb3JtPy5pc193aWRlIHx8IHZhbHVlLmF1dG9mb3JtPy50eXBlID09IFwidGFibGVcIlxuXHRcdFx0XHRpc193aWRlXzIgPSB0cnVlXG5cbiNcdFx0XHRpZiB2YWx1ZS5hdXRvZm9ybT8uaXNfcmFuZ2VcbiNcdFx0XHRcdGlzX3JhbmdlXzIgPSB0cnVlXG5cblx0XHRpZiBTdGVlZG9zLmlzTW9iaWxlKClcblx0XHRcdGlzX3dpZGVfMSA9IHRydWVcblx0XHRcdGlzX3dpZGVfMiA9IHRydWVcblxuXHRcdGlmIGlzU2luZ2xlXG5cdFx0XHRmaWVsZHMucHVzaCBfa2V5cy5zbGljZShpLCBpKzEpXG5cdFx0XHRpICs9IDFcblx0XHRlbHNlXG4jXHRcdFx0aWYgIWlzX3JhbmdlXzEgJiYgaXNfcmFuZ2VfMlxuI1x0XHRcdFx0Y2hpbGRLZXlzID0gX2tleXMuc2xpY2UoaSwgaSsxKVxuI1x0XHRcdFx0Y2hpbGRLZXlzLnB1c2ggdW5kZWZpbmVkXG4jXHRcdFx0XHRmaWVsZHMucHVzaCBjaGlsZEtleXNcbiNcdFx0XHRcdGkgKz0gMVxuI1x0XHRcdGVsc2Vcblx0XHRcdGlmIGlzX3dpZGVfMVxuXHRcdFx0XHRmaWVsZHMucHVzaCBfa2V5cy5zbGljZShpLCBpKzEpXG5cdFx0XHRcdGkgKz0gMVxuXHRcdFx0ZWxzZSBpZiAhaXNfd2lkZV8xIGFuZCBpc193aWRlXzJcblx0XHRcdFx0Y2hpbGRLZXlzID0gX2tleXMuc2xpY2UoaSwgaSsxKVxuXHRcdFx0XHRjaGlsZEtleXMucHVzaCB1bmRlZmluZWRcblx0XHRcdFx0ZmllbGRzLnB1c2ggY2hpbGRLZXlzXG5cdFx0XHRcdGkgKz0gMVxuXHRcdFx0ZWxzZSBpZiAhaXNfd2lkZV8xIGFuZCAhaXNfd2lkZV8yXG5cdFx0XHRcdGNoaWxkS2V5cyA9IF9rZXlzLnNsaWNlKGksIGkrMSlcblx0XHRcdFx0aWYgX2tleXNbaSsxXVxuXHRcdFx0XHRcdGNoaWxkS2V5cy5wdXNoIF9rZXlzW2krMV1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdGNoaWxkS2V5cy5wdXNoIHVuZGVmaW5lZFxuXHRcdFx0XHRmaWVsZHMucHVzaCBjaGlsZEtleXNcblx0XHRcdFx0aSArPSAyXG5cblx0cmV0dXJuIGZpZWxkc1xuXG5DcmVhdG9yLmlzRmlsdGVyVmFsdWVFbXB0eSA9ICh2KSAtPlxuXHRyZXR1cm4gdHlwZW9mIHYgPT0gXCJ1bmRlZmluZWRcIiB8fCB2ID09IG51bGwgfHwgTnVtYmVyLmlzTmFOKHYpIHx8IHYubGVuZ3RoID09IDBcblxuQ3JlYXRvci5nZXRGaWVsZERhdGFUeXBlID0gKG9iamVjdEZpZWxkcywga2V5KS0+XG5cdGlmIG9iamVjdEZpZWxkcyBhbmQga2V5XG5cdFx0cmVzdWx0ID0gb2JqZWN0RmllbGRzW2tleV0/LnR5cGVcblx0XHRpZiBbXCJmb3JtdWxhXCIsIFwic3VtbWFyeVwiXS5pbmRleE9mKHJlc3VsdCkgPiAtMVxuXHRcdFx0cmVzdWx0ID0gb2JqZWN0RmllbGRzW2tleV0uZGF0YV90eXBlXG5cdFx0IyBlbHNlIGlmIHJlc3VsdCA9PSBcInNlbGVjdFwiIGFuZCBvYmplY3RGaWVsZHNba2V5XT8uZGF0YV90eXBlIGFuZCBvYmplY3RGaWVsZHNba2V5XS5kYXRhX3R5cGUgIT0gXCJ0ZXh0XCJcblx0XHQjIFx0cmVzdWx0ID0gb2JqZWN0RmllbGRzW2tleV0uZGF0YV90eXBlXG5cdFx0cmV0dXJuIHJlc3VsdFxuXHRlbHNlXG5cdFx0cmV0dXJuIFwidGV4dFwiXG5cbiMgRU5EXG5cbmlmIE1ldGVvci5pc1NlcnZlclxuXHRDcmVhdG9yLmdldEFsbFJlbGF0ZWRPYmplY3RzID0gKG9iamVjdF9uYW1lKS0+XG5cdFx0cmVsYXRlZF9vYmplY3RfbmFtZXMgPSBbXVxuXHRcdF8uZWFjaCBDcmVhdG9yLk9iamVjdHMsIChyZWxhdGVkX29iamVjdCwgcmVsYXRlZF9vYmplY3RfbmFtZSktPlxuXHRcdFx0Xy5lYWNoIHJlbGF0ZWRfb2JqZWN0LmZpZWxkcywgKHJlbGF0ZWRfZmllbGQsIHJlbGF0ZWRfZmllbGRfbmFtZSktPlxuXHRcdFx0XHRpZiByZWxhdGVkX2ZpZWxkLnR5cGUgPT0gXCJtYXN0ZXJfZGV0YWlsXCIgYW5kIHJlbGF0ZWRfZmllbGQucmVmZXJlbmNlX3RvIGFuZCByZWxhdGVkX2ZpZWxkLnJlZmVyZW5jZV90byA9PSBvYmplY3RfbmFtZVxuXHRcdFx0XHRcdHJlbGF0ZWRfb2JqZWN0X25hbWVzLnB1c2ggcmVsYXRlZF9vYmplY3RfbmFtZVxuXG5cdFx0aWYgQ3JlYXRvci5nZXRPYmplY3Qob2JqZWN0X25hbWUpLmVuYWJsZV9maWxlc1xuXHRcdFx0cmVsYXRlZF9vYmplY3RfbmFtZXMucHVzaCBcImNtc19maWxlc1wiXG5cblx0XHRyZXR1cm4gcmVsYXRlZF9vYmplY3RfbmFtZXNcblxuaWYgTWV0ZW9yLmlzU2VydmVyXG5cdFN0ZWVkb3MuZm9ybWF0SW5kZXggPSAoYXJyYXkpIC0+XG5cdFx0b2JqZWN0ID0ge1xuICAgICAgICBcdGJhY2tncm91bmQ6IHRydWVcbiAgICBcdH07XG5cdFx0aXNkb2N1bWVudERCID0gTWV0ZW9yLnNldHRpbmdzPy5kYXRhc291cmNlcz8uZGVmYXVsdD8uZG9jdW1lbnREQiB8fCBmYWxzZTtcblx0XHRpZiBpc2RvY3VtZW50REJcblx0XHRcdGlmIGFycmF5Lmxlbmd0aCA+IDBcblx0XHRcdFx0aW5kZXhOYW1lID0gYXJyYXkuam9pbihcIi5cIik7XG5cdFx0XHRcdG9iamVjdC5uYW1lID0gaW5kZXhOYW1lO1xuXHRcdFx0XHRcblx0XHRcdFx0aWYgKGluZGV4TmFtZS5sZW5ndGggPiA1Milcblx0XHRcdFx0XHRvYmplY3QubmFtZSA9IGluZGV4TmFtZS5zdWJzdHJpbmcoMCw1Mik7XG5cblx0XHRyZXR1cm4gb2JqZWN0OyIsIkNyZWF0b3IuZ2V0U2NoZW1hID0gZnVuY3Rpb24ob2JqZWN0X25hbWUpIHtcbiAgdmFyIHJlZjtcbiAgcmV0dXJuIChyZWYgPSBDcmVhdG9yLmdldE9iamVjdChvYmplY3RfbmFtZSkpICE9IG51bGwgPyByZWYuc2NoZW1hIDogdm9pZCAwO1xufTtcblxuQ3JlYXRvci5nZXRPYmplY3RIb21lQ29tcG9uZW50ID0gZnVuY3Rpb24ob2JqZWN0X25hbWUpIHtcbiAgaWYgKE1ldGVvci5pc0NsaWVudCkge1xuICAgIHJldHVybiBCdWlsZGVyQ3JlYXRvci5wbHVnaW5Db21wb25lbnRTZWxlY3RvcihCdWlsZGVyQ3JlYXRvci5zdG9yZS5nZXRTdGF0ZSgpLCBcIk9iamVjdEhvbWVcIiwgb2JqZWN0X25hbWUpO1xuICB9XG59O1xuXG5DcmVhdG9yLmdldE9iamVjdFVybCA9IGZ1bmN0aW9uKG9iamVjdF9uYW1lLCByZWNvcmRfaWQsIGFwcF9pZCkge1xuICB2YXIgbGlzdF92aWV3LCBsaXN0X3ZpZXdfaWQ7XG4gIGlmICghYXBwX2lkKSB7XG4gICAgYXBwX2lkID0gU2Vzc2lvbi5nZXQoXCJhcHBfaWRcIik7XG4gIH1cbiAgaWYgKCFvYmplY3RfbmFtZSkge1xuICAgIG9iamVjdF9uYW1lID0gU2Vzc2lvbi5nZXQoXCJvYmplY3RfbmFtZVwiKTtcbiAgfVxuICBsaXN0X3ZpZXcgPSBDcmVhdG9yLmdldExpc3RWaWV3KG9iamVjdF9uYW1lLCBudWxsKTtcbiAgbGlzdF92aWV3X2lkID0gbGlzdF92aWV3ICE9IG51bGwgPyBsaXN0X3ZpZXcuX2lkIDogdm9pZCAwO1xuICBpZiAocmVjb3JkX2lkKSB7XG4gICAgcmV0dXJuIENyZWF0b3IuZ2V0UmVsYXRpdmVVcmwoXCIvYXBwL1wiICsgYXBwX2lkICsgXCIvXCIgKyBvYmplY3RfbmFtZSArIFwiL3ZpZXcvXCIgKyByZWNvcmRfaWQpO1xuICB9IGVsc2Uge1xuICAgIGlmIChvYmplY3RfbmFtZSA9PT0gXCJtZWV0aW5nXCIpIHtcbiAgICAgIHJldHVybiBDcmVhdG9yLmdldFJlbGF0aXZlVXJsKFwiL2FwcC9cIiArIGFwcF9pZCArIFwiL1wiICsgb2JqZWN0X25hbWUgKyBcIi9jYWxlbmRhci9cIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChDcmVhdG9yLmdldE9iamVjdEhvbWVDb21wb25lbnQob2JqZWN0X25hbWUpKSB7XG4gICAgICAgIHJldHVybiBDcmVhdG9yLmdldFJlbGF0aXZlVXJsKFwiL2FwcC9cIiArIGFwcF9pZCArIFwiL1wiICsgb2JqZWN0X25hbWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGxpc3Rfdmlld19pZCkge1xuICAgICAgICAgIHJldHVybiBDcmVhdG9yLmdldFJlbGF0aXZlVXJsKFwiL2FwcC9cIiArIGFwcF9pZCArIFwiL1wiICsgb2JqZWN0X25hbWUgKyBcIi9ncmlkL1wiICsgbGlzdF92aWV3X2lkKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gQ3JlYXRvci5nZXRSZWxhdGl2ZVVybChcIi9hcHAvXCIgKyBhcHBfaWQgKyBcIi9cIiArIG9iamVjdF9uYW1lKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxuQ3JlYXRvci5nZXRPYmplY3RBYnNvbHV0ZVVybCA9IGZ1bmN0aW9uKG9iamVjdF9uYW1lLCByZWNvcmRfaWQsIGFwcF9pZCkge1xuICB2YXIgbGlzdF92aWV3LCBsaXN0X3ZpZXdfaWQ7XG4gIGlmICghYXBwX2lkKSB7XG4gICAgYXBwX2lkID0gU2Vzc2lvbi5nZXQoXCJhcHBfaWRcIik7XG4gIH1cbiAgaWYgKCFvYmplY3RfbmFtZSkge1xuICAgIG9iamVjdF9uYW1lID0gU2Vzc2lvbi5nZXQoXCJvYmplY3RfbmFtZVwiKTtcbiAgfVxuICBsaXN0X3ZpZXcgPSBDcmVhdG9yLmdldExpc3RWaWV3KG9iamVjdF9uYW1lLCBudWxsKTtcbiAgbGlzdF92aWV3X2lkID0gbGlzdF92aWV3ICE9IG51bGwgPyBsaXN0X3ZpZXcuX2lkIDogdm9pZCAwO1xuICBpZiAocmVjb3JkX2lkKSB7XG4gICAgcmV0dXJuIFN0ZWVkb3MuYWJzb2x1dGVVcmwoXCIvYXBwL1wiICsgYXBwX2lkICsgXCIvXCIgKyBvYmplY3RfbmFtZSArIFwiL3ZpZXcvXCIgKyByZWNvcmRfaWQsIHRydWUpO1xuICB9IGVsc2Uge1xuICAgIGlmIChvYmplY3RfbmFtZSA9PT0gXCJtZWV0aW5nXCIpIHtcbiAgICAgIHJldHVybiBTdGVlZG9zLmFic29sdXRlVXJsKFwiL2FwcC9cIiArIGFwcF9pZCArIFwiL1wiICsgb2JqZWN0X25hbWUgKyBcIi9jYWxlbmRhci9cIiwgdHJ1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBTdGVlZG9zLmFic29sdXRlVXJsKFwiL2FwcC9cIiArIGFwcF9pZCArIFwiL1wiICsgb2JqZWN0X25hbWUgKyBcIi9ncmlkL1wiICsgbGlzdF92aWV3X2lkLCB0cnVlKTtcbiAgICB9XG4gIH1cbn07XG5cbkNyZWF0b3IuZ2V0T2JqZWN0Um91dGVyVXJsID0gZnVuY3Rpb24ob2JqZWN0X25hbWUsIHJlY29yZF9pZCwgYXBwX2lkKSB7XG4gIHZhciBsaXN0X3ZpZXcsIGxpc3Rfdmlld19pZDtcbiAgaWYgKCFhcHBfaWQpIHtcbiAgICBhcHBfaWQgPSBTZXNzaW9uLmdldChcImFwcF9pZFwiKTtcbiAgfVxuICBpZiAoIW9iamVjdF9uYW1lKSB7XG4gICAgb2JqZWN0X25hbWUgPSBTZXNzaW9uLmdldChcIm9iamVjdF9uYW1lXCIpO1xuICB9XG4gIGxpc3RfdmlldyA9IENyZWF0b3IuZ2V0TGlzdFZpZXcob2JqZWN0X25hbWUsIG51bGwpO1xuICBsaXN0X3ZpZXdfaWQgPSBsaXN0X3ZpZXcgIT0gbnVsbCA/IGxpc3Rfdmlldy5faWQgOiB2b2lkIDA7XG4gIGlmIChyZWNvcmRfaWQpIHtcbiAgICByZXR1cm4gXCIvYXBwL1wiICsgYXBwX2lkICsgXCIvXCIgKyBvYmplY3RfbmFtZSArIFwiL3ZpZXcvXCIgKyByZWNvcmRfaWQ7XG4gIH0gZWxzZSB7XG4gICAgaWYgKG9iamVjdF9uYW1lID09PSBcIm1lZXRpbmdcIikge1xuICAgICAgcmV0dXJuIFwiL2FwcC9cIiArIGFwcF9pZCArIFwiL1wiICsgb2JqZWN0X25hbWUgKyBcIi9jYWxlbmRhci9cIjtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFwiL2FwcC9cIiArIGFwcF9pZCArIFwiL1wiICsgb2JqZWN0X25hbWUgKyBcIi9ncmlkL1wiICsgbGlzdF92aWV3X2lkO1xuICAgIH1cbiAgfVxufTtcblxuQ3JlYXRvci5nZXRMaXN0Vmlld1VybCA9IGZ1bmN0aW9uKG9iamVjdF9uYW1lLCBhcHBfaWQsIGxpc3Rfdmlld19pZCkge1xuICB2YXIgdXJsO1xuICB1cmwgPSBDcmVhdG9yLmdldExpc3RWaWV3UmVsYXRpdmVVcmwob2JqZWN0X25hbWUsIGFwcF9pZCwgbGlzdF92aWV3X2lkKTtcbiAgcmV0dXJuIENyZWF0b3IuZ2V0UmVsYXRpdmVVcmwodXJsKTtcbn07XG5cbkNyZWF0b3IuZ2V0TGlzdFZpZXdSZWxhdGl2ZVVybCA9IGZ1bmN0aW9uKG9iamVjdF9uYW1lLCBhcHBfaWQsIGxpc3Rfdmlld19pZCkge1xuICBpZiAobGlzdF92aWV3X2lkID09PSBcImNhbGVuZGFyXCIpIHtcbiAgICByZXR1cm4gXCIvYXBwL1wiICsgYXBwX2lkICsgXCIvXCIgKyBvYmplY3RfbmFtZSArIFwiL2NhbGVuZGFyL1wiO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBcIi9hcHAvXCIgKyBhcHBfaWQgKyBcIi9cIiArIG9iamVjdF9uYW1lICsgXCIvZ3JpZC9cIiArIGxpc3Rfdmlld19pZDtcbiAgfVxufTtcblxuQ3JlYXRvci5nZXRTd2l0Y2hMaXN0VXJsID0gZnVuY3Rpb24ob2JqZWN0X25hbWUsIGFwcF9pZCwgbGlzdF92aWV3X2lkKSB7XG4gIGlmIChsaXN0X3ZpZXdfaWQpIHtcbiAgICByZXR1cm4gQ3JlYXRvci5nZXRSZWxhdGl2ZVVybChcIi9hcHAvXCIgKyBhcHBfaWQgKyBcIi9cIiArIG9iamVjdF9uYW1lICsgXCIvXCIgKyBsaXN0X3ZpZXdfaWQgKyBcIi9saXN0XCIpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBDcmVhdG9yLmdldFJlbGF0aXZlVXJsKFwiL2FwcC9cIiArIGFwcF9pZCArIFwiL1wiICsgb2JqZWN0X25hbWUgKyBcIi9saXN0L3N3aXRjaFwiKTtcbiAgfVxufTtcblxuQ3JlYXRvci5nZXRSZWxhdGVkT2JqZWN0VXJsID0gZnVuY3Rpb24ob2JqZWN0X25hbWUsIGFwcF9pZCwgcmVjb3JkX2lkLCByZWxhdGVkX29iamVjdF9uYW1lLCByZWxhdGVkX2ZpZWxkX25hbWUpIHtcbiAgaWYgKHJlbGF0ZWRfZmllbGRfbmFtZSkge1xuICAgIHJldHVybiBDcmVhdG9yLmdldFJlbGF0aXZlVXJsKFwiL2FwcC9cIiArIGFwcF9pZCArIFwiL1wiICsgb2JqZWN0X25hbWUgKyBcIi9cIiArIHJlY29yZF9pZCArIFwiL1wiICsgcmVsYXRlZF9vYmplY3RfbmFtZSArIFwiL2dyaWQ/cmVsYXRlZF9maWVsZF9uYW1lPVwiICsgcmVsYXRlZF9maWVsZF9uYW1lKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gQ3JlYXRvci5nZXRSZWxhdGl2ZVVybChcIi9hcHAvXCIgKyBhcHBfaWQgKyBcIi9cIiArIG9iamVjdF9uYW1lICsgXCIvXCIgKyByZWNvcmRfaWQgKyBcIi9cIiArIHJlbGF0ZWRfb2JqZWN0X25hbWUgKyBcIi9ncmlkXCIpO1xuICB9XG59O1xuXG5DcmVhdG9yLmdldE9iamVjdExvb2t1cEZpZWxkT3B0aW9ucyA9IGZ1bmN0aW9uKG9iamVjdF9uYW1lLCBpc19kZWVwLCBpc19za2lwX2hpZGUsIGlzX3JlbGF0ZWQpIHtcbiAgdmFyIF9vYmplY3QsIF9vcHRpb25zLCBmaWVsZHMsIGljb24sIHJlbGF0ZWRPYmplY3RzO1xuICBfb3B0aW9ucyA9IFtdO1xuICBpZiAoIW9iamVjdF9uYW1lKSB7XG4gICAgcmV0dXJuIF9vcHRpb25zO1xuICB9XG4gIF9vYmplY3QgPSBDcmVhdG9yLmdldE9iamVjdChvYmplY3RfbmFtZSk7XG4gIGZpZWxkcyA9IF9vYmplY3QgIT0gbnVsbCA/IF9vYmplY3QuZmllbGRzIDogdm9pZCAwO1xuICBpY29uID0gX29iamVjdCAhPSBudWxsID8gX29iamVjdC5pY29uIDogdm9pZCAwO1xuICBfLmZvckVhY2goZmllbGRzLCBmdW5jdGlvbihmLCBrKSB7XG4gICAgaWYgKGlzX3NraXBfaGlkZSAmJiBmLmhpZGRlbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoZi50eXBlID09PSBcInNlbGVjdFwiKSB7XG4gICAgICByZXR1cm4gX29wdGlvbnMucHVzaCh7XG4gICAgICAgIGxhYmVsOiBcIlwiICsgKGYubGFiZWwgfHwgayksXG4gICAgICAgIHZhbHVlOiBcIlwiICsgayxcbiAgICAgICAgaWNvbjogaWNvblxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBfb3B0aW9ucy5wdXNoKHtcbiAgICAgICAgbGFiZWw6IGYubGFiZWwgfHwgayxcbiAgICAgICAgdmFsdWU6IGssXG4gICAgICAgIGljb246IGljb25cbiAgICAgIH0pO1xuICAgIH1cbiAgfSk7XG4gIGlmIChpc19kZWVwKSB7XG4gICAgXy5mb3JFYWNoKGZpZWxkcywgZnVuY3Rpb24oZiwgaykge1xuICAgICAgdmFyIHJfb2JqZWN0O1xuICAgICAgaWYgKGlzX3NraXBfaGlkZSAmJiBmLmhpZGRlbikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoKGYudHlwZSA9PT0gXCJsb29rdXBcIiB8fCBmLnR5cGUgPT09IFwibWFzdGVyX2RldGFpbFwiKSAmJiBmLnJlZmVyZW5jZV90byAmJiBfLmlzU3RyaW5nKGYucmVmZXJlbmNlX3RvKSkge1xuICAgICAgICByX29iamVjdCA9IENyZWF0b3IuZ2V0T2JqZWN0KGYucmVmZXJlbmNlX3RvKTtcbiAgICAgICAgaWYgKHJfb2JqZWN0KSB7XG4gICAgICAgICAgcmV0dXJuIF8uZm9yRWFjaChyX29iamVjdC5maWVsZHMsIGZ1bmN0aW9uKGYyLCBrMikge1xuICAgICAgICAgICAgcmV0dXJuIF9vcHRpb25zLnB1c2goe1xuICAgICAgICAgICAgICBsYWJlbDogKGYubGFiZWwgfHwgaykgKyBcIj0+XCIgKyAoZjIubGFiZWwgfHwgazIpLFxuICAgICAgICAgICAgICB2YWx1ZTogayArIFwiLlwiICsgazIsXG4gICAgICAgICAgICAgIGljb246IHJfb2JqZWN0ICE9IG51bGwgPyByX29iamVjdC5pY29uIDogdm9pZCAwXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIGlmIChpc19yZWxhdGVkKSB7XG4gICAgcmVsYXRlZE9iamVjdHMgPSBDcmVhdG9yLmdldFJlbGF0ZWRPYmplY3RzKG9iamVjdF9uYW1lKTtcbiAgICBfLmVhY2gocmVsYXRlZE9iamVjdHMsIChmdW5jdGlvbihfdGhpcykge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKF9yZWxhdGVkT2JqZWN0KSB7XG4gICAgICAgIHZhciByZWxhdGVkT2JqZWN0LCByZWxhdGVkT3B0aW9ucztcbiAgICAgICAgcmVsYXRlZE9wdGlvbnMgPSBDcmVhdG9yLmdldE9iamVjdExvb2t1cEZpZWxkT3B0aW9ucyhfcmVsYXRlZE9iamVjdC5vYmplY3RfbmFtZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSk7XG4gICAgICAgIHJlbGF0ZWRPYmplY3QgPSBDcmVhdG9yLmdldE9iamVjdChfcmVsYXRlZE9iamVjdC5vYmplY3RfbmFtZSk7XG4gICAgICAgIHJldHVybiBfLmVhY2gocmVsYXRlZE9wdGlvbnMsIGZ1bmN0aW9uKHJlbGF0ZWRPcHRpb24pIHtcbiAgICAgICAgICBpZiAoX3JlbGF0ZWRPYmplY3QuZm9yZWlnbl9rZXkgIT09IHJlbGF0ZWRPcHRpb24udmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiBfb3B0aW9ucy5wdXNoKHtcbiAgICAgICAgICAgICAgbGFiZWw6IChyZWxhdGVkT2JqZWN0LmxhYmVsIHx8IHJlbGF0ZWRPYmplY3QubmFtZSkgKyBcIj0+XCIgKyByZWxhdGVkT3B0aW9uLmxhYmVsLFxuICAgICAgICAgICAgICB2YWx1ZTogcmVsYXRlZE9iamVjdC5uYW1lICsgXCIuXCIgKyByZWxhdGVkT3B0aW9uLnZhbHVlLFxuICAgICAgICAgICAgICBpY29uOiByZWxhdGVkT2JqZWN0ICE9IG51bGwgPyByZWxhdGVkT2JqZWN0Lmljb24gOiB2b2lkIDBcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgIH0pKHRoaXMpKTtcbiAgfVxuICByZXR1cm4gX29wdGlvbnM7XG59O1xuXG5DcmVhdG9yLmdldE9iamVjdEZpbHRlckZpZWxkT3B0aW9ucyA9IGZ1bmN0aW9uKG9iamVjdF9uYW1lKSB7XG4gIHZhciBfb2JqZWN0LCBfb3B0aW9ucywgZmllbGRzLCBpY29uLCBwZXJtaXNzaW9uX2ZpZWxkcztcbiAgX29wdGlvbnMgPSBbXTtcbiAgaWYgKCFvYmplY3RfbmFtZSkge1xuICAgIHJldHVybiBfb3B0aW9ucztcbiAgfVxuICBfb2JqZWN0ID0gQ3JlYXRvci5nZXRPYmplY3Qob2JqZWN0X25hbWUpO1xuICBmaWVsZHMgPSBfb2JqZWN0ICE9IG51bGwgPyBfb2JqZWN0LmZpZWxkcyA6IHZvaWQgMDtcbiAgcGVybWlzc2lvbl9maWVsZHMgPSBDcmVhdG9yLmdldEZpZWxkcyhvYmplY3RfbmFtZSk7XG4gIGljb24gPSBfb2JqZWN0ICE9IG51bGwgPyBfb2JqZWN0Lmljb24gOiB2b2lkIDA7XG4gIF8uZm9yRWFjaChmaWVsZHMsIGZ1bmN0aW9uKGYsIGspIHtcbiAgICBpZiAoIV8uaW5jbHVkZShbXCJncmlkXCIsIFwib2JqZWN0XCIsIFwiW09iamVjdF1cIiwgXCJbb2JqZWN0XVwiLCBcIk9iamVjdFwiLCBcImF2YXRhclwiLCBcImltYWdlXCIsIFwibWFya2Rvd25cIiwgXCJodG1sXCJdLCBmLnR5cGUpICYmICFmLmhpZGRlbikge1xuICAgICAgaWYgKCEvXFx3K1xcLi8udGVzdChrKSAmJiBfLmluZGV4T2YocGVybWlzc2lvbl9maWVsZHMsIGspID4gLTEpIHtcbiAgICAgICAgcmV0dXJuIF9vcHRpb25zLnB1c2goe1xuICAgICAgICAgIGxhYmVsOiBmLmxhYmVsIHx8IGssXG4gICAgICAgICAgdmFsdWU6IGssXG4gICAgICAgICAgaWNvbjogaWNvblxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuICByZXR1cm4gX29wdGlvbnM7XG59O1xuXG5DcmVhdG9yLmdldE9iamVjdEZpZWxkT3B0aW9ucyA9IGZ1bmN0aW9uKG9iamVjdF9uYW1lKSB7XG4gIHZhciBfb2JqZWN0LCBfb3B0aW9ucywgZmllbGRzLCBpY29uLCBwZXJtaXNzaW9uX2ZpZWxkcztcbiAgX29wdGlvbnMgPSBbXTtcbiAgaWYgKCFvYmplY3RfbmFtZSkge1xuICAgIHJldHVybiBfb3B0aW9ucztcbiAgfVxuICBfb2JqZWN0ID0gQ3JlYXRvci5nZXRPYmplY3Qob2JqZWN0X25hbWUpO1xuICBmaWVsZHMgPSBfb2JqZWN0ICE9IG51bGwgPyBfb2JqZWN0LmZpZWxkcyA6IHZvaWQgMDtcbiAgcGVybWlzc2lvbl9maWVsZHMgPSBDcmVhdG9yLmdldEZpZWxkcyhvYmplY3RfbmFtZSk7XG4gIGljb24gPSBfb2JqZWN0ICE9IG51bGwgPyBfb2JqZWN0Lmljb24gOiB2b2lkIDA7XG4gIF8uZm9yRWFjaChmaWVsZHMsIGZ1bmN0aW9uKGYsIGspIHtcbiAgICBpZiAoIV8uaW5jbHVkZShbXCJncmlkXCIsIFwib2JqZWN0XCIsIFwiW09iamVjdF1cIiwgXCJbb2JqZWN0XVwiLCBcIk9iamVjdFwiLCBcIm1hcmtkb3duXCIsIFwiaHRtbFwiXSwgZi50eXBlKSkge1xuICAgICAgaWYgKCEvXFx3K1xcLi8udGVzdChrKSAmJiBfLmluZGV4T2YocGVybWlzc2lvbl9maWVsZHMsIGspID4gLTEpIHtcbiAgICAgICAgcmV0dXJuIF9vcHRpb25zLnB1c2goe1xuICAgICAgICAgIGxhYmVsOiBmLmxhYmVsIHx8IGssXG4gICAgICAgICAgdmFsdWU6IGssXG4gICAgICAgICAgaWNvbjogaWNvblxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuICByZXR1cm4gX29wdGlvbnM7XG59O1xuXG5cbi8qXG5maWx0ZXJzOiDopoHovazmjaLnmoRmaWx0ZXJzXG5maWVsZHM6IOWvueixoeWtl+autVxuZmlsdGVyX2ZpZWxkczog6buY6K6k6L+H5ruk5a2X5q6177yM5pSv5oyB5a2X56ym5Liy5pWw57uE5ZKM5a+56LGh5pWw57uE5Lik56eN5qC85byP77yM5aaCOlsnZmlsZWRfbmFtZTEnLCdmaWxlZF9uYW1lMiddLFt7ZmllbGQ6J2ZpbGVkX25hbWUxJyxyZXF1aXJlZDp0cnVlfV1cbuWkhOeQhumAu+i+kTog5oqKZmlsdGVyc+S4reWtmOWcqOS6jmZpbHRlcl9maWVsZHPnmoTov4fmu6TmnaHku7blop7liqDmr4/pobnnmoRpc19kZWZhdWx044CBaXNfcmVxdWlyZWTlsZ7mgKfvvIzkuI3lrZjlnKjkuo5maWx0ZXJfZmllbGRz55qE6L+H5ruk5p2h5Lu25a+55bqU55qE56e76Zmk5q+P6aG555qE55u45YWz5bGe5oCnXG7ov5Tlm57nu5Pmnpw6IOWkhOeQhuWQjueahGZpbHRlcnNcbiAqL1xuXG5DcmVhdG9yLmdldEZpbHRlcnNXaXRoRmlsdGVyRmllbGRzID0gZnVuY3Rpb24oZmlsdGVycywgZmllbGRzLCBmaWx0ZXJfZmllbGRzKSB7XG4gIGlmICghZmlsdGVycykge1xuICAgIGZpbHRlcnMgPSBbXTtcbiAgfVxuICBpZiAoIWZpbHRlcl9maWVsZHMpIHtcbiAgICBmaWx0ZXJfZmllbGRzID0gW107XG4gIH1cbiAgaWYgKGZpbHRlcl9maWVsZHMgIT0gbnVsbCA/IGZpbHRlcl9maWVsZHMubGVuZ3RoIDogdm9pZCAwKSB7XG4gICAgZmlsdGVyX2ZpZWxkcy5mb3JFYWNoKGZ1bmN0aW9uKG4pIHtcbiAgICAgIGlmIChfLmlzU3RyaW5nKG4pKSB7XG4gICAgICAgIG4gPSB7XG4gICAgICAgICAgZmllbGQ6IG4sXG4gICAgICAgICAgcmVxdWlyZWQ6IGZhbHNlXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICBpZiAoZmllbGRzW24uZmllbGRdICYmICFfLmZpbmRXaGVyZShmaWx0ZXJzLCB7XG4gICAgICAgIGZpZWxkOiBuLmZpZWxkXG4gICAgICB9KSkge1xuICAgICAgICByZXR1cm4gZmlsdGVycy5wdXNoKHtcbiAgICAgICAgICBmaWVsZDogbi5maWVsZCxcbiAgICAgICAgICBpc19kZWZhdWx0OiB0cnVlLFxuICAgICAgICAgIGlzX3JlcXVpcmVkOiBuLnJlcXVpcmVkXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIGZpbHRlcnMuZm9yRWFjaChmdW5jdGlvbihmaWx0ZXJJdGVtKSB7XG4gICAgdmFyIG1hdGNoRmllbGQ7XG4gICAgbWF0Y2hGaWVsZCA9IGZpbHRlcl9maWVsZHMuZmluZChmdW5jdGlvbihuKSB7XG4gICAgICByZXR1cm4gbiA9PT0gZmlsdGVySXRlbS5maWVsZCB8fCBuLmZpZWxkID09PSBmaWx0ZXJJdGVtLmZpZWxkO1xuICAgIH0pO1xuICAgIGlmIChfLmlzU3RyaW5nKG1hdGNoRmllbGQpKSB7XG4gICAgICBtYXRjaEZpZWxkID0ge1xuICAgICAgICBmaWVsZDogbWF0Y2hGaWVsZCxcbiAgICAgICAgcmVxdWlyZWQ6IGZhbHNlXG4gICAgICB9O1xuICAgIH1cbiAgICBpZiAobWF0Y2hGaWVsZCkge1xuICAgICAgZmlsdGVySXRlbS5pc19kZWZhdWx0ID0gdHJ1ZTtcbiAgICAgIHJldHVybiBmaWx0ZXJJdGVtLmlzX3JlcXVpcmVkID0gbWF0Y2hGaWVsZC5yZXF1aXJlZDtcbiAgICB9IGVsc2Uge1xuICAgICAgZGVsZXRlIGZpbHRlckl0ZW0uaXNfZGVmYXVsdDtcbiAgICAgIHJldHVybiBkZWxldGUgZmlsdGVySXRlbS5pc19yZXF1aXJlZDtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gZmlsdGVycztcbn07XG5cbkNyZWF0b3IuZ2V0T2JqZWN0UmVjb3JkID0gZnVuY3Rpb24ob2JqZWN0X25hbWUsIHJlY29yZF9pZCwgc2VsZWN0X2ZpZWxkcywgZXhwYW5kKSB7XG4gIHZhciBjb2xsZWN0aW9uLCBvYmosIHJlY29yZCwgcmVmLCByZWYxLCByZWYyO1xuICBpZiAoIW9iamVjdF9uYW1lKSB7XG4gICAgb2JqZWN0X25hbWUgPSBTZXNzaW9uLmdldChcIm9iamVjdF9uYW1lXCIpO1xuICB9XG4gIGlmICghcmVjb3JkX2lkKSB7XG4gICAgcmVjb3JkX2lkID0gU2Vzc2lvbi5nZXQoXCJyZWNvcmRfaWRcIik7XG4gIH1cbiAgaWYgKE1ldGVvci5pc0NsaWVudCkge1xuICAgIGlmIChvYmplY3RfbmFtZSA9PT0gU2Vzc2lvbi5nZXQoXCJvYmplY3RfbmFtZVwiKSAmJiByZWNvcmRfaWQgPT09IFNlc3Npb24uZ2V0KFwicmVjb3JkX2lkXCIpKSB7XG4gICAgICBpZiAoKHJlZiA9IFRlbXBsYXRlLmluc3RhbmNlKCkpICE9IG51bGwgPyByZWYucmVjb3JkIDogdm9pZCAwKSB7XG4gICAgICAgIHJldHVybiAocmVmMSA9IFRlbXBsYXRlLmluc3RhbmNlKCkpICE9IG51bGwgPyAocmVmMiA9IHJlZjEucmVjb3JkKSAhPSBudWxsID8gcmVmMi5nZXQoKSA6IHZvaWQgMCA6IHZvaWQgMDtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIENyZWF0b3Iub2RhdGEuZ2V0KG9iamVjdF9uYW1lLCByZWNvcmRfaWQsIHNlbGVjdF9maWVsZHMsIGV4cGFuZCk7XG4gICAgfVxuICB9XG4gIG9iaiA9IENyZWF0b3IuZ2V0T2JqZWN0KG9iamVjdF9uYW1lKTtcbiAgaWYgKG9iai5kYXRhYmFzZV9uYW1lID09PSBcIm1ldGVvclwiIHx8ICFvYmouZGF0YWJhc2VfbmFtZSkge1xuICAgIGNvbGxlY3Rpb24gPSBDcmVhdG9yLmdldENvbGxlY3Rpb24ob2JqZWN0X25hbWUpO1xuICAgIGlmIChjb2xsZWN0aW9uKSB7XG4gICAgICByZWNvcmQgPSBjb2xsZWN0aW9uLmZpbmRPbmUocmVjb3JkX2lkKTtcbiAgICAgIHJldHVybiByZWNvcmQ7XG4gICAgfVxuICB9IGVsc2UgaWYgKG9iamVjdF9uYW1lICYmIHJlY29yZF9pZCkge1xuICAgIHJldHVybiBDcmVhdG9yLm9kYXRhLmdldChvYmplY3RfbmFtZSwgcmVjb3JkX2lkLCBzZWxlY3RfZmllbGRzLCBleHBhbmQpO1xuICB9XG59O1xuXG5DcmVhdG9yLmdldE9iamVjdFJlY29yZE5hbWUgPSBmdW5jdGlvbihyZWNvcmQsIG9iamVjdF9uYW1lKSB7XG4gIHZhciBuYW1lX2ZpZWxkX2tleSwgcmVmO1xuICBpZiAoIXJlY29yZCkge1xuICAgIHJlY29yZCA9IENyZWF0b3IuZ2V0T2JqZWN0UmVjb3JkKCk7XG4gIH1cbiAgaWYgKHJlY29yZCkge1xuICAgIG5hbWVfZmllbGRfa2V5ID0gb2JqZWN0X25hbWUgPT09IFwib3JnYW5pemF0aW9uc1wiID8gXCJuYW1lXCIgOiAocmVmID0gQ3JlYXRvci5nZXRPYmplY3Qob2JqZWN0X25hbWUpKSAhPSBudWxsID8gcmVmLk5BTUVfRklFTERfS0VZIDogdm9pZCAwO1xuICAgIGlmIChyZWNvcmQgJiYgbmFtZV9maWVsZF9rZXkpIHtcbiAgICAgIHJldHVybiByZWNvcmQubGFiZWwgfHwgcmVjb3JkW25hbWVfZmllbGRfa2V5XTtcbiAgICB9XG4gIH1cbn07XG5cbkNyZWF0b3IuZ2V0QXBwID0gZnVuY3Rpb24oYXBwX2lkKSB7XG4gIHZhciBhcHAsIHJlZiwgcmVmMTtcbiAgaWYgKCFhcHBfaWQpIHtcbiAgICBhcHBfaWQgPSBTZXNzaW9uLmdldChcImFwcF9pZFwiKTtcbiAgfVxuICBhcHAgPSBDcmVhdG9yLkFwcHNbYXBwX2lkXTtcbiAgaWYgKChyZWYgPSBDcmVhdG9yLmRlcHMpICE9IG51bGwpIHtcbiAgICBpZiAoKHJlZjEgPSByZWYuYXBwKSAhPSBudWxsKSB7XG4gICAgICByZWYxLmRlcGVuZCgpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gYXBwO1xufTtcblxuQ3JlYXRvci5nZXRBcHBEYXNoYm9hcmQgPSBmdW5jdGlvbihhcHBfaWQpIHtcbiAgdmFyIGFwcCwgZGFzaGJvYXJkO1xuICBhcHAgPSBDcmVhdG9yLmdldEFwcChhcHBfaWQpO1xuICBpZiAoIWFwcCkge1xuICAgIHJldHVybjtcbiAgfVxuICBkYXNoYm9hcmQgPSBudWxsO1xuICBfLmVhY2goQ3JlYXRvci5EYXNoYm9hcmRzLCBmdW5jdGlvbih2LCBrKSB7XG4gICAgdmFyIHJlZjtcbiAgICBpZiAoKChyZWYgPSB2LmFwcHMpICE9IG51bGwgPyByZWYuaW5kZXhPZihhcHAuX2lkKSA6IHZvaWQgMCkgPiAtMSkge1xuICAgICAgcmV0dXJuIGRhc2hib2FyZCA9IHY7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGRhc2hib2FyZDtcbn07XG5cbkNyZWF0b3IuZ2V0QXBwRGFzaGJvYXJkQ29tcG9uZW50ID0gZnVuY3Rpb24oYXBwX2lkKSB7XG4gIHZhciBhcHA7XG4gIGFwcCA9IENyZWF0b3IuZ2V0QXBwKGFwcF9pZCk7XG4gIGlmICghYXBwKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHJldHVybiBCdWlsZGVyQ3JlYXRvci5wbHVnaW5Db21wb25lbnRTZWxlY3RvcihCdWlsZGVyQ3JlYXRvci5zdG9yZS5nZXRTdGF0ZSgpLCBcIkRhc2hib2FyZFwiLCBhcHAuX2lkKTtcbn07XG5cbkNyZWF0b3IuZ2V0QXBwT2JqZWN0TmFtZXMgPSBmdW5jdGlvbihhcHBfaWQpIHtcbiAgdmFyIGFwcCwgYXBwT2JqZWN0cywgaXNNb2JpbGUsIG9iamVjdHM7XG4gIGFwcCA9IENyZWF0b3IuZ2V0QXBwKGFwcF9pZCk7XG4gIGlmICghYXBwKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlzTW9iaWxlID0gU3RlZWRvcy5pc01vYmlsZSgpO1xuICBhcHBPYmplY3RzID0gaXNNb2JpbGUgPyBhcHAubW9iaWxlX29iamVjdHMgOiBhcHAub2JqZWN0cztcbiAgb2JqZWN0cyA9IFtdO1xuICBpZiAoYXBwKSB7XG4gICAgXy5lYWNoKGFwcE9iamVjdHMsIGZ1bmN0aW9uKHYpIHtcbiAgICAgIHZhciBvYmo7XG4gICAgICBvYmogPSBDcmVhdG9yLmdldE9iamVjdCh2KTtcbiAgICAgIGlmIChvYmogIT0gbnVsbCA/IG9iai5wZXJtaXNzaW9ucy5nZXQoKS5hbGxvd1JlYWQgOiB2b2lkIDApIHtcbiAgICAgICAgcmV0dXJuIG9iamVjdHMucHVzaCh2KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICByZXR1cm4gb2JqZWN0cztcbn07XG5cbkNyZWF0b3IuZ2V0VXJsV2l0aFRva2VuID0gZnVuY3Rpb24odXJsLCBleHByZXNzaW9uRm9ybURhdGEpIHtcbiAgdmFyIGhhc1F1ZXJ5U3ltYm9sLCBsaW5rU3RyLCBwYXJhbXM7XG4gIHBhcmFtcyA9IHt9O1xuICBwYXJhbXNbXCJYLVNwYWNlLUlkXCJdID0gU3RlZWRvcy5zcGFjZUlkKCk7XG4gIHBhcmFtc1tcIlgtVXNlci1JZFwiXSA9IFN0ZWVkb3MudXNlcklkKCk7XG4gIHBhcmFtc1tcIlgtQ29tcGFueS1JZHNcIl0gPSBTdGVlZG9zLmdldFVzZXJDb21wYW55SWRzKCk7XG4gIHBhcmFtc1tcIlgtQXV0aC1Ub2tlblwiXSA9IEFjY291bnRzLl9zdG9yZWRMb2dpblRva2VuKCk7XG4gIGlmIChTdGVlZG9zLmlzRXhwcmVzc2lvbih1cmwpKSB7XG4gICAgdXJsID0gU3RlZWRvcy5wYXJzZVNpbmdsZUV4cHJlc3Npb24odXJsLCBleHByZXNzaW9uRm9ybURhdGEsIFwiI1wiLCBDcmVhdG9yLlVTRVJfQ09OVEVYVCk7XG4gIH1cbiAgaGFzUXVlcnlTeW1ib2wgPSAvKFxcIy4rXFw/KXwoXFw/W14jXSokKS9nLnRlc3QodXJsKTtcbiAgbGlua1N0ciA9IGhhc1F1ZXJ5U3ltYm9sID8gXCImXCIgOiBcIj9cIjtcbiAgcmV0dXJuIFwiXCIgKyB1cmwgKyBsaW5rU3RyICsgKCQucGFyYW0ocGFyYW1zKSk7XG59O1xuXG5DcmVhdG9yLmdldEFwcE1lbnUgPSBmdW5jdGlvbihhcHBfaWQsIG1lbnVfaWQpIHtcbiAgdmFyIG1lbnVzO1xuICBtZW51cyA9IENyZWF0b3IuZ2V0QXBwTWVudXMoYXBwX2lkKTtcbiAgcmV0dXJuIG1lbnVzICYmIG1lbnVzLmZpbmQoZnVuY3Rpb24obWVudSkge1xuICAgIHJldHVybiBtZW51LmlkID09PSBtZW51X2lkO1xuICB9KTtcbn07XG5cbkNyZWF0b3IuZ2V0QXBwTWVudVVybEZvckludGVybmV0ID0gZnVuY3Rpb24obWVudSkge1xuICByZXR1cm4gQ3JlYXRvci5nZXRVcmxXaXRoVG9rZW4obWVudS5wYXRoLCBtZW51KTtcbn07XG5cbkNyZWF0b3IuZ2V0QXBwTWVudVVybCA9IGZ1bmN0aW9uKG1lbnUpIHtcbiAgdmFyIHVybDtcbiAgdXJsID0gbWVudS5wYXRoO1xuICBpZiAobWVudS50eXBlID09PSBcInVybFwiKSB7XG4gICAgaWYgKG1lbnUudGFyZ2V0KSB7XG4gICAgICByZXR1cm4gQ3JlYXRvci5nZXRBcHBNZW51VXJsRm9ySW50ZXJuZXQobWVudSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBcIi9hcHAvLS90YWJfaWZyYW1lL1wiICsgbWVudS5pZDtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG1lbnUucGF0aDtcbiAgfVxufTtcblxuQ3JlYXRvci5nZXRBcHBNZW51cyA9IGZ1bmN0aW9uKGFwcF9pZCkge1xuICB2YXIgYXBwLCBhcHBNZW51cywgY3VyZW50QXBwTWVudXM7XG4gIGFwcCA9IENyZWF0b3IuZ2V0QXBwKGFwcF9pZCk7XG4gIGlmICghYXBwKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG4gIGFwcE1lbnVzID0gU2Vzc2lvbi5nZXQoXCJhcHBfbWVudXNcIik7XG4gIGlmICghYXBwTWVudXMpIHtcbiAgICByZXR1cm4gW107XG4gIH1cbiAgY3VyZW50QXBwTWVudXMgPSBhcHBNZW51cy5maW5kKGZ1bmN0aW9uKG1lbnVJdGVtKSB7XG4gICAgcmV0dXJuIG1lbnVJdGVtLmlkID09PSBhcHAuX2lkO1xuICB9KTtcbiAgaWYgKGN1cmVudEFwcE1lbnVzKSB7XG4gICAgcmV0dXJuIGN1cmVudEFwcE1lbnVzLmNoaWxkcmVuO1xuICB9XG59O1xuXG5DcmVhdG9yLmxvYWRBcHBzTWVudXMgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGRhdGEsIGlzTW9iaWxlLCBvcHRpb25zO1xuICBpc01vYmlsZSA9IFN0ZWVkb3MuaXNNb2JpbGUoKTtcbiAgZGF0YSA9IHt9O1xuICBpZiAoaXNNb2JpbGUpIHtcbiAgICBkYXRhLm1vYmlsZSA9IGlzTW9iaWxlO1xuICB9XG4gIG9wdGlvbnMgPSB7XG4gICAgdHlwZTogJ2dldCcsXG4gICAgZGF0YTogZGF0YSxcbiAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICByZXR1cm4gU2Vzc2lvbi5zZXQoXCJhcHBfbWVudXNcIiwgZGF0YSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gU3RlZWRvcy5hdXRoUmVxdWVzdChcIi9zZXJ2aWNlL2FwaS9hcHBzL21lbnVzXCIsIG9wdGlvbnMpO1xufTtcblxuQ3JlYXRvci5nZXRWaXNpYmxlQXBwcyA9IGZ1bmN0aW9uKGluY2x1ZGVBZG1pbikge1xuICB2YXIgY2hhbmdlQXBwO1xuICBjaGFuZ2VBcHAgPSBDcmVhdG9yLl9zdWJBcHAuZ2V0KCk7XG4gIEJ1aWxkZXJDcmVhdG9yLnN0b3JlLmdldFN0YXRlKCkuZW50aXRpZXMuYXBwcyA9IE9iamVjdC5hc3NpZ24oe30sIEJ1aWxkZXJDcmVhdG9yLnN0b3JlLmdldFN0YXRlKCkuZW50aXRpZXMuYXBwcywge1xuICAgIGFwcHM6IGNoYW5nZUFwcFxuICB9KTtcbiAgcmV0dXJuIEJ1aWxkZXJDcmVhdG9yLnZpc2libGVBcHBzU2VsZWN0b3IoQnVpbGRlckNyZWF0b3Iuc3RvcmUuZ2V0U3RhdGUoKSwgaW5jbHVkZUFkbWluKTtcbn07XG5cbkNyZWF0b3IuZ2V0VmlzaWJsZUFwcHNPYmplY3RzID0gZnVuY3Rpb24oKSB7XG4gIHZhciBhcHBzLCBvYmplY3RzLCB2aXNpYmxlT2JqZWN0TmFtZXM7XG4gIGFwcHMgPSBDcmVhdG9yLmdldFZpc2libGVBcHBzKCk7XG4gIHZpc2libGVPYmplY3ROYW1lcyA9IF8uZmxhdHRlbihfLnBsdWNrKGFwcHMsICdvYmplY3RzJykpO1xuICBvYmplY3RzID0gXy5maWx0ZXIoQ3JlYXRvci5PYmplY3RzLCBmdW5jdGlvbihvYmopIHtcbiAgICBpZiAodmlzaWJsZU9iamVjdE5hbWVzLmluZGV4T2Yob2JqLm5hbWUpIDwgMCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH0pO1xuICBvYmplY3RzID0gb2JqZWN0cy5zb3J0KENyZWF0b3Iuc29ydGluZ01ldGhvZC5iaW5kKHtcbiAgICBrZXk6IFwibGFiZWxcIlxuICB9KSk7XG4gIG9iamVjdHMgPSBfLnBsdWNrKG9iamVjdHMsICduYW1lJyk7XG4gIHJldHVybiBfLnVuaXEob2JqZWN0cyk7XG59O1xuXG5DcmVhdG9yLmdldEFwcHNPYmplY3RzID0gZnVuY3Rpb24oKSB7XG4gIHZhciBvYmplY3RzLCB0ZW1wT2JqZWN0cztcbiAgb2JqZWN0cyA9IFtdO1xuICB0ZW1wT2JqZWN0cyA9IFtdO1xuICBfLmZvckVhY2goQ3JlYXRvci5BcHBzLCBmdW5jdGlvbihhcHApIHtcbiAgICB0ZW1wT2JqZWN0cyA9IF8uZmlsdGVyKGFwcC5vYmplY3RzLCBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiAhb2JqLmhpZGRlbjtcbiAgICB9KTtcbiAgICByZXR1cm4gb2JqZWN0cyA9IG9iamVjdHMuY29uY2F0KHRlbXBPYmplY3RzKTtcbiAgfSk7XG4gIHJldHVybiBfLnVuaXEob2JqZWN0cyk7XG59O1xuXG5DcmVhdG9yLnZhbGlkYXRlRmlsdGVycyA9IGZ1bmN0aW9uKGZpbHRlcnMsIGxvZ2ljKSB7XG4gIHZhciBlLCBlcnJvck1zZywgZmlsdGVyX2l0ZW1zLCBmaWx0ZXJfbGVuZ3RoLCBmbGFnLCBpbmRleCwgd29yZDtcbiAgZmlsdGVyX2l0ZW1zID0gXy5tYXAoZmlsdGVycywgZnVuY3Rpb24ob2JqKSB7XG4gICAgaWYgKF8uaXNFbXB0eShvYmopKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBvYmo7XG4gICAgfVxuICB9KTtcbiAgZmlsdGVyX2l0ZW1zID0gXy5jb21wYWN0KGZpbHRlcl9pdGVtcyk7XG4gIGVycm9yTXNnID0gXCJcIjtcbiAgZmlsdGVyX2xlbmd0aCA9IGZpbHRlcl9pdGVtcy5sZW5ndGg7XG4gIGlmIChsb2dpYykge1xuICAgIGxvZ2ljID0gbG9naWMucmVwbGFjZSgvXFxuL2csIFwiXCIpLnJlcGxhY2UoL1xccysvZywgXCIgXCIpO1xuICAgIGlmICgvWy5fXFwtIStdKy9pZy50ZXN0KGxvZ2ljKSkge1xuICAgICAgZXJyb3JNc2cgPSBcIuWQq+acieeJueauiuWtl+espuOAglwiO1xuICAgIH1cbiAgICBpZiAoIWVycm9yTXNnKSB7XG4gICAgICBpbmRleCA9IGxvZ2ljLm1hdGNoKC9cXGQrL2lnKTtcbiAgICAgIGlmICghaW5kZXgpIHtcbiAgICAgICAgZXJyb3JNc2cgPSBcIuacieS6m+etm+mAieadoeS7tui/m+ihjOS6huWumuS5ie+8jOS9huacquWcqOmrmOe6p+etm+mAieadoeS7tuS4reiiq+W8leeUqOOAglwiO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaW5kZXguZm9yRWFjaChmdW5jdGlvbihpKSB7XG4gICAgICAgICAgaWYgKGkgPCAxIHx8IGkgPiBmaWx0ZXJfbGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gZXJyb3JNc2cgPSBcIuaCqOeahOetm+mAieadoeS7tuW8leeUqOS6huacquWumuS5ieeahOetm+mAieWZqO+8mlwiICsgaSArIFwi44CCXCI7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgZmxhZyA9IDE7XG4gICAgICAgIHdoaWxlIChmbGFnIDw9IGZpbHRlcl9sZW5ndGgpIHtcbiAgICAgICAgICBpZiAoIWluZGV4LmluY2x1ZGVzKFwiXCIgKyBmbGFnKSkge1xuICAgICAgICAgICAgZXJyb3JNc2cgPSBcIuacieS6m+etm+mAieadoeS7tui/m+ihjOS6huWumuS5ie+8jOS9huacquWcqOmrmOe6p+etm+mAieadoeS7tuS4reiiq+W8leeUqOOAglwiO1xuICAgICAgICAgIH1cbiAgICAgICAgICBmbGFnKys7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFlcnJvck1zZykge1xuICAgICAgd29yZCA9IGxvZ2ljLm1hdGNoKC9bYS16QS1aXSsvaWcpO1xuICAgICAgaWYgKHdvcmQpIHtcbiAgICAgICAgd29yZC5mb3JFYWNoKGZ1bmN0aW9uKHcpIHtcbiAgICAgICAgICBpZiAoIS9eKGFuZHxvcikkL2lnLnRlc3QodykpIHtcbiAgICAgICAgICAgIHJldHVybiBlcnJvck1zZyA9IFwi5qOA5p+l5oKo55qE6auY57qn562b6YCJ5p2h5Lu25Lit55qE5ou85YaZ44CCXCI7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFlcnJvck1zZykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgQ3JlYXRvcltcImV2YWxcIl0obG9naWMucmVwbGFjZSgvYW5kL2lnLCBcIiYmXCIpLnJlcGxhY2UoL29yL2lnLCBcInx8XCIpKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGUgPSBlcnJvcjtcbiAgICAgICAgZXJyb3JNc2cgPSBcIuaCqOeahOetm+mAieWZqOS4reWQq+acieeJueauiuWtl+esplwiO1xuICAgICAgfVxuICAgICAgaWYgKC8oQU5EKVteKCldKyhPUikvaWcudGVzdChsb2dpYykgfHwgLyhPUilbXigpXSsoQU5EKS9pZy50ZXN0KGxvZ2ljKSkge1xuICAgICAgICBlcnJvck1zZyA9IFwi5oKo55qE562b6YCJ5Zmo5b+F6aG75Zyo6L+e57ut5oCn55qEIEFORCDlkowgT1Ig6KGo6L6+5byP5YmN5ZCO5L2/55So5ous5Y+344CCXCI7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGlmIChlcnJvck1zZykge1xuICAgIGNvbnNvbGUubG9nKFwiZXJyb3JcIiwgZXJyb3JNc2cpO1xuICAgIGlmIChNZXRlb3IuaXNDbGllbnQpIHtcbiAgICAgIHRvYXN0ci5lcnJvcihlcnJvck1zZyk7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTtcblxuXG4vKlxub3B0aW9uc+WPguaVsO+8mlxuXHRleHRlbmQtLSDmmK/lkKbpnIDopoHmiorlvZPliY3nlKjmiLfln7rmnKzkv6Hmga/liqDlhaXlhazlvI/vvIzljbPorqnlhazlvI/mlK/mjIFDcmVhdG9yLlVTRVJfQ09OVEVYVOS4reeahOWAvO+8jOm7mOiupOS4unRydWVcblx0dXNlcklkLS0g5b2T5YmN55m75b2V55So5oi3XG5cdHNwYWNlSWQtLSDlvZPliY3miYDlnKjlt6XkvZzljLpcbmV4dGVuZOS4unRydWXml7bvvIzlkI7nq6/pnIDopoHpop3lpJbkvKDlhaV1c2VySWTlj4pzcGFjZUlk55So5LqO5oqT5Y+WQ3JlYXRvci5VU0VSX0NPTlRFWFTlr7nlupTnmoTlgLxcbiAqL1xuXG5DcmVhdG9yLmZvcm1hdEZpbHRlcnNUb01vbmdvID0gZnVuY3Rpb24oZmlsdGVycywgb3B0aW9ucykge1xuICB2YXIgc2VsZWN0b3I7XG4gIGlmICghKGZpbHRlcnMgIT0gbnVsbCA/IGZpbHRlcnMubGVuZ3RoIDogdm9pZCAwKSkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoIShmaWx0ZXJzWzBdIGluc3RhbmNlb2YgQXJyYXkpKSB7XG4gICAgZmlsdGVycyA9IF8ubWFwKGZpbHRlcnMsIGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIFtvYmouZmllbGQsIG9iai5vcGVyYXRpb24sIG9iai52YWx1ZV07XG4gICAgfSk7XG4gIH1cbiAgc2VsZWN0b3IgPSBbXTtcbiAgXy5lYWNoKGZpbHRlcnMsIGZ1bmN0aW9uKGZpbHRlcikge1xuICAgIHZhciBmaWVsZCwgb3B0aW9uLCByZWcsIHN1Yl9zZWxlY3RvciwgdmFsdWU7XG4gICAgZmllbGQgPSBmaWx0ZXJbMF07XG4gICAgb3B0aW9uID0gZmlsdGVyWzFdO1xuICAgIGlmIChNZXRlb3IuaXNDbGllbnQpIHtcbiAgICAgIHZhbHVlID0gQ3JlYXRvci5ldmFsdWF0ZUZvcm11bGEoZmlsdGVyWzJdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFsdWUgPSBDcmVhdG9yLmV2YWx1YXRlRm9ybXVsYShmaWx0ZXJbMl0sIG51bGwsIG9wdGlvbnMpO1xuICAgIH1cbiAgICBzdWJfc2VsZWN0b3IgPSB7fTtcbiAgICBzdWJfc2VsZWN0b3JbZmllbGRdID0ge307XG4gICAgaWYgKG9wdGlvbiA9PT0gXCI9XCIpIHtcbiAgICAgIHN1Yl9zZWxlY3RvcltmaWVsZF1bXCIkZXFcIl0gPSB2YWx1ZTtcbiAgICB9IGVsc2UgaWYgKG9wdGlvbiA9PT0gXCI8PlwiKSB7XG4gICAgICBzdWJfc2VsZWN0b3JbZmllbGRdW1wiJG5lXCJdID0gdmFsdWU7XG4gICAgfSBlbHNlIGlmIChvcHRpb24gPT09IFwiPlwiKSB7XG4gICAgICBzdWJfc2VsZWN0b3JbZmllbGRdW1wiJGd0XCJdID0gdmFsdWU7XG4gICAgfSBlbHNlIGlmIChvcHRpb24gPT09IFwiPj1cIikge1xuICAgICAgc3ViX3NlbGVjdG9yW2ZpZWxkXVtcIiRndGVcIl0gPSB2YWx1ZTtcbiAgICB9IGVsc2UgaWYgKG9wdGlvbiA9PT0gXCI8XCIpIHtcbiAgICAgIHN1Yl9zZWxlY3RvcltmaWVsZF1bXCIkbHRcIl0gPSB2YWx1ZTtcbiAgICB9IGVsc2UgaWYgKG9wdGlvbiA9PT0gXCI8PVwiKSB7XG4gICAgICBzdWJfc2VsZWN0b3JbZmllbGRdW1wiJGx0ZVwiXSA9IHZhbHVlO1xuICAgIH0gZWxzZSBpZiAob3B0aW9uID09PSBcInN0YXJ0c3dpdGhcIikge1xuICAgICAgcmVnID0gbmV3IFJlZ0V4cChcIl5cIiArIHZhbHVlLCBcImlcIik7XG4gICAgICBzdWJfc2VsZWN0b3JbZmllbGRdW1wiJHJlZ2V4XCJdID0gcmVnO1xuICAgIH0gZWxzZSBpZiAob3B0aW9uID09PSBcImNvbnRhaW5zXCIpIHtcbiAgICAgIHJlZyA9IG5ldyBSZWdFeHAodmFsdWUsIFwiaVwiKTtcbiAgICAgIHN1Yl9zZWxlY3RvcltmaWVsZF1bXCIkcmVnZXhcIl0gPSByZWc7XG4gICAgfSBlbHNlIGlmIChvcHRpb24gPT09IFwibm90Y29udGFpbnNcIikge1xuICAgICAgcmVnID0gbmV3IFJlZ0V4cChcIl4oKD8hXCIgKyB2YWx1ZSArIFwiKS4pKiRcIiwgXCJpXCIpO1xuICAgICAgc3ViX3NlbGVjdG9yW2ZpZWxkXVtcIiRyZWdleFwiXSA9IHJlZztcbiAgICB9XG4gICAgcmV0dXJuIHNlbGVjdG9yLnB1c2goc3ViX3NlbGVjdG9yKTtcbiAgfSk7XG4gIHJldHVybiBzZWxlY3Rvcjtcbn07XG5cbkNyZWF0b3IuaXNCZXR3ZWVuRmlsdGVyT3BlcmF0aW9uID0gZnVuY3Rpb24ob3BlcmF0aW9uKSB7XG4gIHZhciByZWY7XG4gIHJldHVybiBvcGVyYXRpb24gPT09IFwiYmV0d2VlblwiIHx8ICEhKChyZWYgPSBDcmVhdG9yLmdldEJldHdlZW5UaW1lQnVpbHRpblZhbHVlcyh0cnVlKSkgIT0gbnVsbCA/IHJlZltvcGVyYXRpb25dIDogdm9pZCAwKTtcbn07XG5cblxuLypcbm9wdGlvbnPlj4LmlbDvvJpcblx0ZXh0ZW5kLS0g5piv5ZCm6ZyA6KaB5oqK5b2T5YmN55So5oi35Z+65pys5L+h5oGv5Yqg5YWl5YWs5byP77yM5Y2z6K6p5YWs5byP5pSv5oyBQ3JlYXRvci5VU0VSX0NPTlRFWFTkuK3nmoTlgLzvvIzpu5jorqTkuLp0cnVlXG5cdHVzZXJJZC0tIOW9k+WJjeeZu+W9leeUqOaIt1xuXHRzcGFjZUlkLS0g5b2T5YmN5omA5Zyo5bel5L2c5Yy6XG5cdGV4dGVuZOS4unRydWXml7bvvIzlkI7nq6/pnIDopoHpop3lpJbkvKDlhaV1c2VySWTlj4pzcGFjZUlk55So5LqO5oqT5Y+WQ3JlYXRvci5VU0VSX0NPTlRFWFTlr7nlupTnmoTlgLxcbiAqL1xuXG5DcmVhdG9yLmZvcm1hdEZpbHRlcnNUb0RldiA9IGZ1bmN0aW9uKGZpbHRlcnMsIG9iamVjdF9uYW1lLCBvcHRpb25zKSB7XG4gIHZhciBsb2dpY1RlbXBGaWx0ZXJzLCBzZWxlY3RvcjtcbiAgaWYgKCFmaWx0ZXJzLmxlbmd0aCkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAob3B0aW9ucyAhPSBudWxsID8gb3B0aW9ucy5pc19sb2dpY19vciA6IHZvaWQgMCkge1xuICAgIGxvZ2ljVGVtcEZpbHRlcnMgPSBbXTtcbiAgICBmaWx0ZXJzLmZvckVhY2goZnVuY3Rpb24obikge1xuICAgICAgbG9naWNUZW1wRmlsdGVycy5wdXNoKG4pO1xuICAgICAgcmV0dXJuIGxvZ2ljVGVtcEZpbHRlcnMucHVzaChcIm9yXCIpO1xuICAgIH0pO1xuICAgIGxvZ2ljVGVtcEZpbHRlcnMucG9wKCk7XG4gICAgZmlsdGVycyA9IGxvZ2ljVGVtcEZpbHRlcnM7XG4gIH1cbiAgc2VsZWN0b3IgPSBTdGVlZG9zRmlsdGVycy5mb3JtYXRGaWx0ZXJzVG9EZXYoZmlsdGVycywgQ3JlYXRvci5VU0VSX0NPTlRFWFQpO1xuICByZXR1cm4gc2VsZWN0b3I7XG59O1xuXG5cbi8qXG5vcHRpb25z5Y+C5pWw77yaXG5cdGV4dGVuZC0tIOaYr+WQpumcgOimgeaKiuW9k+WJjeeUqOaIt+WfuuacrOS/oeaBr+WKoOWFpeWFrOW8j++8jOWNs+iuqeWFrOW8j+aUr+aMgUNyZWF0b3IuVVNFUl9DT05URVhU5Lit55qE5YC877yM6buY6K6k5Li6dHJ1ZVxuXHR1c2VySWQtLSDlvZPliY3nmbvlvZXnlKjmiLdcblx0c3BhY2VJZC0tIOW9k+WJjeaJgOWcqOW3peS9nOWMulxuZXh0ZW5k5Li6dHJ1ZeaXtu+8jOWQjuerr+mcgOimgemineWkluS8oOWFpXVzZXJJZOWPinNwYWNlSWTnlKjkuo7mipPlj5ZDcmVhdG9yLlVTRVJfQ09OVEVYVOWvueW6lOeahOWAvFxuICovXG5cbkNyZWF0b3IuZm9ybWF0TG9naWNGaWx0ZXJzVG9EZXYgPSBmdW5jdGlvbihmaWx0ZXJzLCBmaWx0ZXJfbG9naWMsIG9wdGlvbnMpIHtcbiAgdmFyIGZvcm1hdF9sb2dpYztcbiAgZm9ybWF0X2xvZ2ljID0gZmlsdGVyX2xvZ2ljLnJlcGxhY2UoL1xcKFxccysvaWcsIFwiKFwiKS5yZXBsYWNlKC9cXHMrXFwpL2lnLCBcIilcIikucmVwbGFjZSgvXFwoL2csIFwiW1wiKS5yZXBsYWNlKC9cXCkvZywgXCJdXCIpLnJlcGxhY2UoL1xccysvZywgXCIsXCIpLnJlcGxhY2UoLyhhbmR8b3IpL2lnLCBcIickMSdcIik7XG4gIGZvcm1hdF9sb2dpYyA9IGZvcm1hdF9sb2dpYy5yZXBsYWNlKC8oXFxkKSsvaWcsIGZ1bmN0aW9uKHgpIHtcbiAgICB2YXIgX2YsIGZpZWxkLCBvcHRpb24sIHN1Yl9zZWxlY3RvciwgdmFsdWU7XG4gICAgX2YgPSBmaWx0ZXJzW3ggLSAxXTtcbiAgICBmaWVsZCA9IF9mLmZpZWxkO1xuICAgIG9wdGlvbiA9IF9mLm9wZXJhdGlvbjtcbiAgICBpZiAoTWV0ZW9yLmlzQ2xpZW50KSB7XG4gICAgICB2YWx1ZSA9IENyZWF0b3IuZXZhbHVhdGVGb3JtdWxhKF9mLnZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFsdWUgPSBDcmVhdG9yLmV2YWx1YXRlRm9ybXVsYShfZi52YWx1ZSwgbnVsbCwgb3B0aW9ucyk7XG4gICAgfVxuICAgIHN1Yl9zZWxlY3RvciA9IFtdO1xuICAgIGlmIChfLmlzQXJyYXkodmFsdWUpID09PSB0cnVlKSB7XG4gICAgICBpZiAob3B0aW9uID09PSBcIj1cIikge1xuICAgICAgICBfLmVhY2godmFsdWUsIGZ1bmN0aW9uKHYpIHtcbiAgICAgICAgICByZXR1cm4gc3ViX3NlbGVjdG9yLnB1c2goW2ZpZWxkLCBvcHRpb24sIHZdLCBcIm9yXCIpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAob3B0aW9uID09PSBcIjw+XCIpIHtcbiAgICAgICAgXy5lYWNoKHZhbHVlLCBmdW5jdGlvbih2KSB7XG4gICAgICAgICAgcmV0dXJuIHN1Yl9zZWxlY3Rvci5wdXNoKFtmaWVsZCwgb3B0aW9uLCB2XSwgXCJhbmRcIik7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgXy5lYWNoKHZhbHVlLCBmdW5jdGlvbih2KSB7XG4gICAgICAgICAgcmV0dXJuIHN1Yl9zZWxlY3Rvci5wdXNoKFtmaWVsZCwgb3B0aW9uLCB2XSwgXCJvclwiKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBpZiAoc3ViX3NlbGVjdG9yW3N1Yl9zZWxlY3Rvci5sZW5ndGggLSAxXSA9PT0gXCJhbmRcIiB8fCBzdWJfc2VsZWN0b3Jbc3ViX3NlbGVjdG9yLmxlbmd0aCAtIDFdID09PSBcIm9yXCIpIHtcbiAgICAgICAgc3ViX3NlbGVjdG9yLnBvcCgpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBzdWJfc2VsZWN0b3IgPSBbZmllbGQsIG9wdGlvbiwgdmFsdWVdO1xuICAgIH1cbiAgICBjb25zb2xlLmxvZyhcInN1Yl9zZWxlY3RvclwiLCBzdWJfc2VsZWN0b3IpO1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShzdWJfc2VsZWN0b3IpO1xuICB9KTtcbiAgZm9ybWF0X2xvZ2ljID0gXCJbXCIgKyBmb3JtYXRfbG9naWMgKyBcIl1cIjtcbiAgcmV0dXJuIENyZWF0b3JbXCJldmFsXCJdKGZvcm1hdF9sb2dpYyk7XG59O1xuXG5DcmVhdG9yLmdldFJlbGF0ZWRPYmplY3RzID0gZnVuY3Rpb24ob2JqZWN0X25hbWUsIHNwYWNlSWQsIHVzZXJJZCkge1xuICB2YXIgX29iamVjdCwgcGVybWlzc2lvbnMsIHJlbGF0ZWRfb2JqZWN0X25hbWVzLCByZWxhdGVkX29iamVjdHMsIHVucmVsYXRlZF9vYmplY3RzO1xuICBpZiAoTWV0ZW9yLmlzQ2xpZW50KSB7XG4gICAgaWYgKCFvYmplY3RfbmFtZSkge1xuICAgICAgb2JqZWN0X25hbWUgPSBTZXNzaW9uLmdldChcIm9iamVjdF9uYW1lXCIpO1xuICAgIH1cbiAgICBpZiAoIXNwYWNlSWQpIHtcbiAgICAgIHNwYWNlSWQgPSBTZXNzaW9uLmdldChcInNwYWNlSWRcIik7XG4gICAgfVxuICAgIGlmICghdXNlcklkKSB7XG4gICAgICB1c2VySWQgPSBNZXRlb3IudXNlcklkKCk7XG4gICAgfVxuICB9XG4gIHJlbGF0ZWRfb2JqZWN0X25hbWVzID0gW107XG4gIF9vYmplY3QgPSBDcmVhdG9yLmdldE9iamVjdChvYmplY3RfbmFtZSk7XG4gIGlmICghX29iamVjdCkge1xuICAgIHJldHVybiByZWxhdGVkX29iamVjdF9uYW1lcztcbiAgfVxuICByZWxhdGVkX29iamVjdHMgPSBDcmVhdG9yLmdldE9iamVjdFJlbGF0ZWRzKF9vYmplY3QuX2NvbGxlY3Rpb25fbmFtZSk7XG4gIHJlbGF0ZWRfb2JqZWN0X25hbWVzID0gXy5wbHVjayhyZWxhdGVkX29iamVjdHMsIFwib2JqZWN0X25hbWVcIik7XG4gIGlmICgocmVsYXRlZF9vYmplY3RfbmFtZXMgIT0gbnVsbCA/IHJlbGF0ZWRfb2JqZWN0X25hbWVzLmxlbmd0aCA6IHZvaWQgMCkgPT09IDApIHtcbiAgICByZXR1cm4gcmVsYXRlZF9vYmplY3RfbmFtZXM7XG4gIH1cbiAgcGVybWlzc2lvbnMgPSBDcmVhdG9yLmdldFBlcm1pc3Npb25zKG9iamVjdF9uYW1lLCBzcGFjZUlkLCB1c2VySWQpO1xuICB1bnJlbGF0ZWRfb2JqZWN0cyA9IHBlcm1pc3Npb25zLnVucmVsYXRlZF9vYmplY3RzO1xuICByZWxhdGVkX29iamVjdF9uYW1lcyA9IF8uZGlmZmVyZW5jZShyZWxhdGVkX29iamVjdF9uYW1lcywgdW5yZWxhdGVkX29iamVjdHMpO1xuICByZXR1cm4gXy5maWx0ZXIocmVsYXRlZF9vYmplY3RzLCBmdW5jdGlvbihyZWxhdGVkX29iamVjdCkge1xuICAgIHZhciBhbGxvd1JlYWQsIGlzQWN0aXZlLCByZWYsIHJlbGF0ZWRfb2JqZWN0X25hbWU7XG4gICAgcmVsYXRlZF9vYmplY3RfbmFtZSA9IHJlbGF0ZWRfb2JqZWN0Lm9iamVjdF9uYW1lO1xuICAgIGlzQWN0aXZlID0gcmVsYXRlZF9vYmplY3RfbmFtZXMuaW5kZXhPZihyZWxhdGVkX29iamVjdF9uYW1lKSA+IC0xO1xuICAgIGFsbG93UmVhZCA9IChyZWYgPSBDcmVhdG9yLmdldFBlcm1pc3Npb25zKHJlbGF0ZWRfb2JqZWN0X25hbWUsIHNwYWNlSWQsIHVzZXJJZCkpICE9IG51bGwgPyByZWYuYWxsb3dSZWFkIDogdm9pZCAwO1xuICAgIGlmIChyZWxhdGVkX29iamVjdF9uYW1lID09PSBcImNtc19maWxlc1wiKSB7XG4gICAgICBhbGxvd1JlYWQgPSBhbGxvd1JlYWQgJiYgcGVybWlzc2lvbnMuYWxsb3dSZWFkRmlsZXM7XG4gICAgfVxuICAgIHJldHVybiBpc0FjdGl2ZSAmJiBhbGxvd1JlYWQ7XG4gIH0pO1xufTtcblxuQ3JlYXRvci5nZXRSZWxhdGVkT2JqZWN0TmFtZXMgPSBmdW5jdGlvbihvYmplY3RfbmFtZSwgc3BhY2VJZCwgdXNlcklkKSB7XG4gIHZhciByZWxhdGVkX29iamVjdHM7XG4gIHJlbGF0ZWRfb2JqZWN0cyA9IENyZWF0b3IuZ2V0UmVsYXRlZE9iamVjdHMob2JqZWN0X25hbWUsIHNwYWNlSWQsIHVzZXJJZCk7XG4gIHJldHVybiBfLnBsdWNrKHJlbGF0ZWRfb2JqZWN0cywgXCJvYmplY3RfbmFtZVwiKTtcbn07XG5cbkNyZWF0b3IuZ2V0UmVsYXRlZE9iamVjdExpc3RBY3Rpb25zID0gZnVuY3Rpb24ocmVsYXRlZE9iamVjdE5hbWUsIHNwYWNlSWQsIHVzZXJJZCkge1xuICB2YXIgYWN0aW9ucztcbiAgYWN0aW9ucyA9IENyZWF0b3IuZ2V0QWN0aW9ucyhyZWxhdGVkT2JqZWN0TmFtZSwgc3BhY2VJZCwgdXNlcklkKTtcbiAgYWN0aW9ucyA9IF8uZmlsdGVyKGFjdGlvbnMsIGZ1bmN0aW9uKGFjdGlvbikge1xuICAgIGlmIChhY3Rpb24ubmFtZSA9PT0gXCJzdGFuZGFyZF9mb2xsb3dcIikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoYWN0aW9uLm5hbWUgPT09IFwic3RhbmRhcmRfcXVlcnlcIikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoYWN0aW9uLm9uID09PSBcImxpc3RcIikge1xuICAgICAgaWYgKHR5cGVvZiBhY3Rpb24udmlzaWJsZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHJldHVybiBhY3Rpb24udmlzaWJsZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGFjdGlvbi52aXNpYmxlO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGFjdGlvbnM7XG59O1xuXG5DcmVhdG9yLmdldEFjdGlvbnMgPSBmdW5jdGlvbihvYmplY3RfbmFtZSwgc3BhY2VJZCwgdXNlcklkKSB7XG4gIHZhciBhY3Rpb25zLCBkaXNhYmxlZF9hY3Rpb25zLCBvYmosIHBlcm1pc3Npb25zLCByZWYsIHJlZjE7XG4gIGlmIChNZXRlb3IuaXNDbGllbnQpIHtcbiAgICBpZiAoIW9iamVjdF9uYW1lKSB7XG4gICAgICBvYmplY3RfbmFtZSA9IFNlc3Npb24uZ2V0KFwib2JqZWN0X25hbWVcIik7XG4gICAgfVxuICAgIGlmICghc3BhY2VJZCkge1xuICAgICAgc3BhY2VJZCA9IFNlc3Npb24uZ2V0KFwic3BhY2VJZFwiKTtcbiAgICB9XG4gICAgaWYgKCF1c2VySWQpIHtcbiAgICAgIHVzZXJJZCA9IE1ldGVvci51c2VySWQoKTtcbiAgICB9XG4gIH1cbiAgb2JqID0gQ3JlYXRvci5nZXRPYmplY3Qob2JqZWN0X25hbWUpO1xuICBpZiAoIW9iaikge1xuICAgIHJldHVybjtcbiAgfVxuICBwZXJtaXNzaW9ucyA9IENyZWF0b3IuZ2V0UGVybWlzc2lvbnMob2JqZWN0X25hbWUsIHNwYWNlSWQsIHVzZXJJZCk7XG4gIGRpc2FibGVkX2FjdGlvbnMgPSBwZXJtaXNzaW9ucy5kaXNhYmxlZF9hY3Rpb25zO1xuICBhY3Rpb25zID0gXy5zb3J0QnkoXy52YWx1ZXMob2JqLmFjdGlvbnMpLCAnc29ydCcpO1xuICBpZiAoXy5oYXMob2JqLCAnYWxsb3dfY3VzdG9tQWN0aW9ucycpKSB7XG4gICAgYWN0aW9ucyA9IF8uZmlsdGVyKGFjdGlvbnMsIGZ1bmN0aW9uKGFjdGlvbikge1xuICAgICAgcmV0dXJuIF8uaW5jbHVkZShvYmouYWxsb3dfY3VzdG9tQWN0aW9ucywgYWN0aW9uLm5hbWUpIHx8IF8uaW5jbHVkZShfLmtleXMoQ3JlYXRvci5nZXRPYmplY3QoJ2Jhc2UnKS5hY3Rpb25zKSB8fCB7fSwgYWN0aW9uLm5hbWUpO1xuICAgIH0pO1xuICB9XG4gIGlmIChfLmhhcyhvYmosICdleGNsdWRlX2FjdGlvbnMnKSkge1xuICAgIGFjdGlvbnMgPSBfLmZpbHRlcihhY3Rpb25zLCBmdW5jdGlvbihhY3Rpb24pIHtcbiAgICAgIHJldHVybiAhXy5pbmNsdWRlKG9iai5leGNsdWRlX2FjdGlvbnMsIGFjdGlvbi5uYW1lKTtcbiAgICB9KTtcbiAgfVxuICBfLmVhY2goYWN0aW9ucywgZnVuY3Rpb24oYWN0aW9uKSB7XG4gICAgaWYgKFN0ZWVkb3MuaXNNb2JpbGUoKSAmJiBbXCJyZWNvcmRcIiwgXCJyZWNvcmRfb25seVwiXS5pbmRleE9mKGFjdGlvbi5vbikgPiAtMSAmJiBhY3Rpb24ubmFtZSAhPT0gJ3N0YW5kYXJkX2VkaXQnKSB7XG4gICAgICBpZiAoYWN0aW9uLm9uID09PSBcInJlY29yZF9vbmx5XCIpIHtcbiAgICAgICAgcmV0dXJuIGFjdGlvbi5vbiA9ICdyZWNvcmRfb25seV9tb3JlJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBhY3Rpb24ub24gPSAncmVjb3JkX21vcmUnO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG4gIGlmIChTdGVlZG9zLmlzTW9iaWxlKCkgJiYgW1wiY21zX2ZpbGVzXCIsIFwiY2ZzLmZpbGVzLmZpbGVyZWNvcmRcIl0uaW5kZXhPZihvYmplY3RfbmFtZSkgPiAtMSkge1xuICAgIGlmICgocmVmID0gYWN0aW9ucy5maW5kKGZ1bmN0aW9uKG4pIHtcbiAgICAgIHJldHVybiBuLm5hbWUgPT09IFwic3RhbmRhcmRfZWRpdFwiO1xuICAgIH0pKSAhPSBudWxsKSB7XG4gICAgICByZWYub24gPSBcInJlY29yZF9tb3JlXCI7XG4gICAgfVxuICAgIGlmICgocmVmMSA9IGFjdGlvbnMuZmluZChmdW5jdGlvbihuKSB7XG4gICAgICByZXR1cm4gbi5uYW1lID09PSBcImRvd25sb2FkXCI7XG4gICAgfSkpICE9IG51bGwpIHtcbiAgICAgIHJlZjEub24gPSBcInJlY29yZFwiO1xuICAgIH1cbiAgfVxuICBhY3Rpb25zID0gXy5maWx0ZXIoYWN0aW9ucywgZnVuY3Rpb24oYWN0aW9uKSB7XG4gICAgcmV0dXJuIF8uaW5kZXhPZihkaXNhYmxlZF9hY3Rpb25zLCBhY3Rpb24ubmFtZSkgPCAwO1xuICB9KTtcbiAgcmV0dXJuIGFjdGlvbnM7XG59O1xuXG4v6L+U5Zue5b2T5YmN55So5oi35pyJ5p2D6ZmQ6K6/6Zeu55qE5omA5pyJbGlzdF92aWV377yM5YyF5ous5YiG5Lqr55qE77yM55So5oi36Ieq5a6a5LmJ6Z2e5YiG5Lqr55qE77yI6Zmk6Z2eb3duZXLlj5jkuobvvInvvIzku6Xlj4rpu5jorqTnmoTlhbbku5bop4blm77ms6jmhI9DcmVhdG9yLmdldFBlcm1pc3Npb25z5Ye95pWw5Lit5piv5LiN5Lya5pyJ55So5oi36Ieq5a6a5LmJ6Z2e5YiG5Lqr55qE6KeG5Zu+55qE77yM5omA5LulQ3JlYXRvci5nZXRQZXJtaXNzaW9uc+WHveaVsOS4reaLv+WIsOeahOe7k+aenOS4jeWFqO+8jOW5tuS4jeaYr+W9k+WJjeeUqOaIt+iDveeci+WIsOaJgOacieinhuWbvi87XG5cbkNyZWF0b3IuZ2V0TGlzdFZpZXdzID0gZnVuY3Rpb24ob2JqZWN0X25hbWUsIHNwYWNlSWQsIHVzZXJJZCkge1xuICB2YXIgZGlzYWJsZWRfbGlzdF92aWV3cywgaXNNb2JpbGUsIGxpc3RWaWV3cywgbGlzdF92aWV3cywgb2JqZWN0LCByZWY7XG4gIGlmIChNZXRlb3IuaXNDbGllbnQpIHtcbiAgICBpZiAoIW9iamVjdF9uYW1lKSB7XG4gICAgICBvYmplY3RfbmFtZSA9IFNlc3Npb24uZ2V0KFwib2JqZWN0X25hbWVcIik7XG4gICAgfVxuICAgIGlmICghc3BhY2VJZCkge1xuICAgICAgc3BhY2VJZCA9IFNlc3Npb24uZ2V0KFwic3BhY2VJZFwiKTtcbiAgICB9XG4gICAgaWYgKCF1c2VySWQpIHtcbiAgICAgIHVzZXJJZCA9IE1ldGVvci51c2VySWQoKTtcbiAgICB9XG4gIH1cbiAgaWYgKCFvYmplY3RfbmFtZSkge1xuICAgIHJldHVybjtcbiAgfVxuICBvYmplY3QgPSBDcmVhdG9yLmdldE9iamVjdChvYmplY3RfbmFtZSk7XG4gIGlmICghb2JqZWN0KSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGRpc2FibGVkX2xpc3Rfdmlld3MgPSAoKHJlZiA9IENyZWF0b3IuZ2V0UGVybWlzc2lvbnMob2JqZWN0X25hbWUsIHNwYWNlSWQsIHVzZXJJZCkpICE9IG51bGwgPyByZWYuZGlzYWJsZWRfbGlzdF92aWV3cyA6IHZvaWQgMCkgfHwgW107XG4gIGxpc3Rfdmlld3MgPSBbXTtcbiAgaXNNb2JpbGUgPSBTdGVlZG9zLmlzTW9iaWxlKCk7XG4gIF8uZWFjaChvYmplY3QubGlzdF92aWV3cywgZnVuY3Rpb24oaXRlbSwgaXRlbV9uYW1lKSB7XG4gICAgcmV0dXJuIGl0ZW0ubmFtZSA9IGl0ZW1fbmFtZTtcbiAgfSk7XG4gIGxpc3RWaWV3cyA9IF8uc29ydEJ5KF8udmFsdWVzKG9iamVjdC5saXN0X3ZpZXdzKSwgJ3NvcnRfbm8nKTtcbiAgXy5lYWNoKGxpc3RWaWV3cywgZnVuY3Rpb24oaXRlbSkge1xuICAgIHZhciBpc0Rpc2FibGVkO1xuICAgIGlmIChpc01vYmlsZSAmJiBpdGVtLnR5cGUgPT09IFwiY2FsZW5kYXJcIikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoaXRlbS5uYW1lICE9PSBcImRlZmF1bHRcIikge1xuICAgICAgaXNEaXNhYmxlZCA9IF8uaW5kZXhPZihkaXNhYmxlZF9saXN0X3ZpZXdzLCBpdGVtLm5hbWUpID4gLTEgfHwgKGl0ZW0uX2lkICYmIF8uaW5kZXhPZihkaXNhYmxlZF9saXN0X3ZpZXdzLCBpdGVtLl9pZCkgPiAtMSk7XG4gICAgICBpZiAoIWlzRGlzYWJsZWQgfHwgaXRlbS5vd25lciA9PT0gdXNlcklkKSB7XG4gICAgICAgIHJldHVybiBsaXN0X3ZpZXdzLnB1c2goaXRlbSk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGxpc3Rfdmlld3M7XG59O1xuXG5DcmVhdG9yLmdldEZpZWxkcyA9IGZ1bmN0aW9uKG9iamVjdF9uYW1lLCBzcGFjZUlkLCB1c2VySWQpIHtcbiAgdmFyIGZpZWxkc05hbWUsIHJlZiwgdW5yZWFkYWJsZV9maWVsZHM7XG4gIGlmIChNZXRlb3IuaXNDbGllbnQpIHtcbiAgICBpZiAoIW9iamVjdF9uYW1lKSB7XG4gICAgICBvYmplY3RfbmFtZSA9IFNlc3Npb24uZ2V0KFwib2JqZWN0X25hbWVcIik7XG4gICAgfVxuICAgIGlmICghc3BhY2VJZCkge1xuICAgICAgc3BhY2VJZCA9IFNlc3Npb24uZ2V0KFwic3BhY2VJZFwiKTtcbiAgICB9XG4gICAgaWYgKCF1c2VySWQpIHtcbiAgICAgIHVzZXJJZCA9IE1ldGVvci51c2VySWQoKTtcbiAgICB9XG4gIH1cbiAgZmllbGRzTmFtZSA9IENyZWF0b3IuZ2V0T2JqZWN0RmllbGRzTmFtZShvYmplY3RfbmFtZSk7XG4gIHVucmVhZGFibGVfZmllbGRzID0gKHJlZiA9IENyZWF0b3IuZ2V0UGVybWlzc2lvbnMob2JqZWN0X25hbWUsIHNwYWNlSWQsIHVzZXJJZCkpICE9IG51bGwgPyByZWYudW5yZWFkYWJsZV9maWVsZHMgOiB2b2lkIDA7XG4gIHJldHVybiBfLmRpZmZlcmVuY2UoZmllbGRzTmFtZSwgdW5yZWFkYWJsZV9maWVsZHMpO1xufTtcblxuQ3JlYXRvci5pc2xvYWRpbmcgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuICFDcmVhdG9yLmJvb3RzdHJhcExvYWRlZC5nZXQoKTtcbn07XG5cbkNyZWF0b3IuY29udmVydFNwZWNpYWxDaGFyYWN0ZXIgPSBmdW5jdGlvbihzdHIpIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC8oW1xcXlxcJFxcKFxcKVxcKlxcK1xcP1xcLlxcXFxcXHxcXFtcXF1cXHtcXH1dKS9nLCBcIlxcXFwkMVwiKTtcbn07XG5cbkNyZWF0b3IuZ2V0RGlzYWJsZWRGaWVsZHMgPSBmdW5jdGlvbihzY2hlbWEpIHtcbiAgdmFyIGZpZWxkcztcbiAgZmllbGRzID0gXy5tYXAoc2NoZW1hLCBmdW5jdGlvbihmaWVsZCwgZmllbGROYW1lKSB7XG4gICAgcmV0dXJuIGZpZWxkLmF1dG9mb3JtICYmIGZpZWxkLmF1dG9mb3JtLmRpc2FibGVkICYmICFmaWVsZC5hdXRvZm9ybS5vbWl0ICYmIGZpZWxkTmFtZTtcbiAgfSk7XG4gIGZpZWxkcyA9IF8uY29tcGFjdChmaWVsZHMpO1xuICByZXR1cm4gZmllbGRzO1xufTtcblxuQ3JlYXRvci5nZXRIaWRkZW5GaWVsZHMgPSBmdW5jdGlvbihzY2hlbWEpIHtcbiAgdmFyIGZpZWxkcztcbiAgZmllbGRzID0gXy5tYXAoc2NoZW1hLCBmdW5jdGlvbihmaWVsZCwgZmllbGROYW1lKSB7XG4gICAgcmV0dXJuIGZpZWxkLmF1dG9mb3JtICYmIGZpZWxkLmF1dG9mb3JtLnR5cGUgPT09IFwiaGlkZGVuXCIgJiYgIWZpZWxkLmF1dG9mb3JtLm9taXQgJiYgZmllbGROYW1lO1xuICB9KTtcbiAgZmllbGRzID0gXy5jb21wYWN0KGZpZWxkcyk7XG4gIHJldHVybiBmaWVsZHM7XG59O1xuXG5DcmVhdG9yLmdldEZpZWxkc1dpdGhOb0dyb3VwID0gZnVuY3Rpb24oc2NoZW1hKSB7XG4gIHZhciBmaWVsZHM7XG4gIGZpZWxkcyA9IF8ubWFwKHNjaGVtYSwgZnVuY3Rpb24oZmllbGQsIGZpZWxkTmFtZSkge1xuICAgIHJldHVybiAoIWZpZWxkLmF1dG9mb3JtIHx8ICFmaWVsZC5hdXRvZm9ybS5ncm91cCB8fCBmaWVsZC5hdXRvZm9ybS5ncm91cCA9PT0gXCItXCIpICYmICghZmllbGQuYXV0b2Zvcm0gfHwgZmllbGQuYXV0b2Zvcm0udHlwZSAhPT0gXCJoaWRkZW5cIikgJiYgZmllbGROYW1lO1xuICB9KTtcbiAgZmllbGRzID0gXy5jb21wYWN0KGZpZWxkcyk7XG4gIHJldHVybiBmaWVsZHM7XG59O1xuXG5DcmVhdG9yLmdldFNvcnRlZEZpZWxkR3JvdXBOYW1lcyA9IGZ1bmN0aW9uKHNjaGVtYSkge1xuICB2YXIgbmFtZXM7XG4gIG5hbWVzID0gXy5tYXAoc2NoZW1hLCBmdW5jdGlvbihmaWVsZCkge1xuICAgIHJldHVybiBmaWVsZC5hdXRvZm9ybSAmJiBmaWVsZC5hdXRvZm9ybS5ncm91cCAhPT0gXCItXCIgJiYgZmllbGQuYXV0b2Zvcm0uZ3JvdXA7XG4gIH0pO1xuICBuYW1lcyA9IF8uY29tcGFjdChuYW1lcyk7XG4gIG5hbWVzID0gXy51bmlxdWUobmFtZXMpO1xuICByZXR1cm4gbmFtZXM7XG59O1xuXG5DcmVhdG9yLmdldEZpZWxkc0Zvckdyb3VwID0gZnVuY3Rpb24oc2NoZW1hLCBncm91cE5hbWUpIHtcbiAgdmFyIGZpZWxkcztcbiAgZmllbGRzID0gXy5tYXAoc2NoZW1hLCBmdW5jdGlvbihmaWVsZCwgZmllbGROYW1lKSB7XG4gICAgcmV0dXJuIGZpZWxkLmF1dG9mb3JtICYmIGZpZWxkLmF1dG9mb3JtLmdyb3VwID09PSBncm91cE5hbWUgJiYgZmllbGQuYXV0b2Zvcm0udHlwZSAhPT0gXCJoaWRkZW5cIiAmJiBmaWVsZE5hbWU7XG4gIH0pO1xuICBmaWVsZHMgPSBfLmNvbXBhY3QoZmllbGRzKTtcbiAgcmV0dXJuIGZpZWxkcztcbn07XG5cbkNyZWF0b3IuZ2V0U3lzdGVtQmFzZUZpZWxkcyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gW1wiY3JlYXRlZFwiLCBcImNyZWF0ZWRfYnlcIiwgXCJtb2RpZmllZFwiLCBcIm1vZGlmaWVkX2J5XCJdO1xufTtcblxuQ3JlYXRvci5nZXRGaWVsZHNXaXRob3V0U3lzdGVtQmFzZSA9IGZ1bmN0aW9uKGtleXMpIHtcbiAgcmV0dXJuIF8uZGlmZmVyZW5jZShrZXlzLCBDcmVhdG9yLmdldFN5c3RlbUJhc2VGaWVsZHMoKSk7XG59O1xuXG5DcmVhdG9yLmdldEZpZWxkc1dpdGhvdXRPbWl0ID0gZnVuY3Rpb24oc2NoZW1hLCBrZXlzKSB7XG4gIGtleXMgPSBfLm1hcChrZXlzLCBmdW5jdGlvbihrZXkpIHtcbiAgICB2YXIgZmllbGQsIHJlZjtcbiAgICBmaWVsZCA9IF8ucGljayhzY2hlbWEsIGtleSk7XG4gICAgaWYgKChyZWYgPSBmaWVsZFtrZXldLmF1dG9mb3JtKSAhPSBudWxsID8gcmVmLm9taXQgOiB2b2lkIDApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGtleTtcbiAgICB9XG4gIH0pO1xuICBrZXlzID0gXy5jb21wYWN0KGtleXMpO1xuICByZXR1cm4ga2V5cztcbn07XG5cbkNyZWF0b3IuZ2V0RmllbGRzSW5GaXJzdExldmVsID0gZnVuY3Rpb24oZmlyc3RMZXZlbEtleXMsIGtleXMpIHtcbiAga2V5cyA9IF8ubWFwKGtleXMsIGZ1bmN0aW9uKGtleSkge1xuICAgIGlmIChfLmluZGV4T2YoZmlyc3RMZXZlbEtleXMsIGtleSkgPiAtMSkge1xuICAgICAgcmV0dXJuIGtleTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfSk7XG4gIGtleXMgPSBfLmNvbXBhY3Qoa2V5cyk7XG4gIHJldHVybiBrZXlzO1xufTtcblxuQ3JlYXRvci5nZXRGaWVsZHNGb3JSZW9yZGVyID0gZnVuY3Rpb24oc2NoZW1hLCBrZXlzLCBpc1NpbmdsZSkge1xuICB2YXIgX2tleXMsIGNoaWxkS2V5cywgZmllbGRzLCBpLCBpc193aWRlXzEsIGlzX3dpZGVfMiwgc2NfMSwgc2NfMjtcbiAgZmllbGRzID0gW107XG4gIGkgPSAwO1xuICBfa2V5cyA9IF8uZmlsdGVyKGtleXMsIGZ1bmN0aW9uKGtleSkge1xuICAgIHJldHVybiAha2V5LmVuZHNXaXRoKCdfZW5kTGluZScpO1xuICB9KTtcbiAgd2hpbGUgKGkgPCBfa2V5cy5sZW5ndGgpIHtcbiAgICBzY18xID0gXy5waWNrKHNjaGVtYSwgX2tleXNbaV0pO1xuICAgIHNjXzIgPSBfLnBpY2soc2NoZW1hLCBfa2V5c1tpICsgMV0pO1xuICAgIGlzX3dpZGVfMSA9IGZhbHNlO1xuICAgIGlzX3dpZGVfMiA9IGZhbHNlO1xuICAgIF8uZWFjaChzY18xLCBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgdmFyIHJlZiwgcmVmMTtcbiAgICAgIGlmICgoKHJlZiA9IHZhbHVlLmF1dG9mb3JtKSAhPSBudWxsID8gcmVmLmlzX3dpZGUgOiB2b2lkIDApIHx8ICgocmVmMSA9IHZhbHVlLmF1dG9mb3JtKSAhPSBudWxsID8gcmVmMS50eXBlIDogdm9pZCAwKSA9PT0gXCJ0YWJsZVwiKSB7XG4gICAgICAgIHJldHVybiBpc193aWRlXzEgPSB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIF8uZWFjaChzY18yLCBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgdmFyIHJlZiwgcmVmMTtcbiAgICAgIGlmICgoKHJlZiA9IHZhbHVlLmF1dG9mb3JtKSAhPSBudWxsID8gcmVmLmlzX3dpZGUgOiB2b2lkIDApIHx8ICgocmVmMSA9IHZhbHVlLmF1dG9mb3JtKSAhPSBudWxsID8gcmVmMS50eXBlIDogdm9pZCAwKSA9PT0gXCJ0YWJsZVwiKSB7XG4gICAgICAgIHJldHVybiBpc193aWRlXzIgPSB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmIChTdGVlZG9zLmlzTW9iaWxlKCkpIHtcbiAgICAgIGlzX3dpZGVfMSA9IHRydWU7XG4gICAgICBpc193aWRlXzIgPSB0cnVlO1xuICAgIH1cbiAgICBpZiAoaXNTaW5nbGUpIHtcbiAgICAgIGZpZWxkcy5wdXNoKF9rZXlzLnNsaWNlKGksIGkgKyAxKSk7XG4gICAgICBpICs9IDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChpc193aWRlXzEpIHtcbiAgICAgICAgZmllbGRzLnB1c2goX2tleXMuc2xpY2UoaSwgaSArIDEpKTtcbiAgICAgICAgaSArPSAxO1xuICAgICAgfSBlbHNlIGlmICghaXNfd2lkZV8xICYmIGlzX3dpZGVfMikge1xuICAgICAgICBjaGlsZEtleXMgPSBfa2V5cy5zbGljZShpLCBpICsgMSk7XG4gICAgICAgIGNoaWxkS2V5cy5wdXNoKHZvaWQgMCk7XG4gICAgICAgIGZpZWxkcy5wdXNoKGNoaWxkS2V5cyk7XG4gICAgICAgIGkgKz0gMTtcbiAgICAgIH0gZWxzZSBpZiAoIWlzX3dpZGVfMSAmJiAhaXNfd2lkZV8yKSB7XG4gICAgICAgIGNoaWxkS2V5cyA9IF9rZXlzLnNsaWNlKGksIGkgKyAxKTtcbiAgICAgICAgaWYgKF9rZXlzW2kgKyAxXSkge1xuICAgICAgICAgIGNoaWxkS2V5cy5wdXNoKF9rZXlzW2kgKyAxXSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2hpbGRLZXlzLnB1c2godm9pZCAwKTtcbiAgICAgICAgfVxuICAgICAgICBmaWVsZHMucHVzaChjaGlsZEtleXMpO1xuICAgICAgICBpICs9IDI7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBmaWVsZHM7XG59O1xuXG5DcmVhdG9yLmlzRmlsdGVyVmFsdWVFbXB0eSA9IGZ1bmN0aW9uKHYpIHtcbiAgcmV0dXJuIHR5cGVvZiB2ID09PSBcInVuZGVmaW5lZFwiIHx8IHYgPT09IG51bGwgfHwgTnVtYmVyLmlzTmFOKHYpIHx8IHYubGVuZ3RoID09PSAwO1xufTtcblxuQ3JlYXRvci5nZXRGaWVsZERhdGFUeXBlID0gZnVuY3Rpb24ob2JqZWN0RmllbGRzLCBrZXkpIHtcbiAgdmFyIHJlZiwgcmVzdWx0O1xuICBpZiAob2JqZWN0RmllbGRzICYmIGtleSkge1xuICAgIHJlc3VsdCA9IChyZWYgPSBvYmplY3RGaWVsZHNba2V5XSkgIT0gbnVsbCA/IHJlZi50eXBlIDogdm9pZCAwO1xuICAgIGlmIChbXCJmb3JtdWxhXCIsIFwic3VtbWFyeVwiXS5pbmRleE9mKHJlc3VsdCkgPiAtMSkge1xuICAgICAgcmVzdWx0ID0gb2JqZWN0RmllbGRzW2tleV0uZGF0YV90eXBlO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBcInRleHRcIjtcbiAgfVxufTtcblxuaWYgKE1ldGVvci5pc1NlcnZlcikge1xuICBDcmVhdG9yLmdldEFsbFJlbGF0ZWRPYmplY3RzID0gZnVuY3Rpb24ob2JqZWN0X25hbWUpIHtcbiAgICB2YXIgcmVsYXRlZF9vYmplY3RfbmFtZXM7XG4gICAgcmVsYXRlZF9vYmplY3RfbmFtZXMgPSBbXTtcbiAgICBfLmVhY2goQ3JlYXRvci5PYmplY3RzLCBmdW5jdGlvbihyZWxhdGVkX29iamVjdCwgcmVsYXRlZF9vYmplY3RfbmFtZSkge1xuICAgICAgcmV0dXJuIF8uZWFjaChyZWxhdGVkX29iamVjdC5maWVsZHMsIGZ1bmN0aW9uKHJlbGF0ZWRfZmllbGQsIHJlbGF0ZWRfZmllbGRfbmFtZSkge1xuICAgICAgICBpZiAocmVsYXRlZF9maWVsZC50eXBlID09PSBcIm1hc3Rlcl9kZXRhaWxcIiAmJiByZWxhdGVkX2ZpZWxkLnJlZmVyZW5jZV90byAmJiByZWxhdGVkX2ZpZWxkLnJlZmVyZW5jZV90byA9PT0gb2JqZWN0X25hbWUpIHtcbiAgICAgICAgICByZXR1cm4gcmVsYXRlZF9vYmplY3RfbmFtZXMucHVzaChyZWxhdGVkX29iamVjdF9uYW1lKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgaWYgKENyZWF0b3IuZ2V0T2JqZWN0KG9iamVjdF9uYW1lKS5lbmFibGVfZmlsZXMpIHtcbiAgICAgIHJlbGF0ZWRfb2JqZWN0X25hbWVzLnB1c2goXCJjbXNfZmlsZXNcIik7XG4gICAgfVxuICAgIHJldHVybiByZWxhdGVkX29iamVjdF9uYW1lcztcbiAgfTtcbn1cblxuaWYgKE1ldGVvci5pc1NlcnZlcikge1xuICBTdGVlZG9zLmZvcm1hdEluZGV4ID0gZnVuY3Rpb24oYXJyYXkpIHtcbiAgICB2YXIgaW5kZXhOYW1lLCBpc2RvY3VtZW50REIsIG9iamVjdCwgcmVmLCByZWYxLCByZWYyO1xuICAgIG9iamVjdCA9IHtcbiAgICAgIGJhY2tncm91bmQ6IHRydWVcbiAgICB9O1xuICAgIGlzZG9jdW1lbnREQiA9ICgocmVmID0gTWV0ZW9yLnNldHRpbmdzKSAhPSBudWxsID8gKHJlZjEgPSByZWYuZGF0YXNvdXJjZXMpICE9IG51bGwgPyAocmVmMiA9IHJlZjFbXCJkZWZhdWx0XCJdKSAhPSBudWxsID8gcmVmMi5kb2N1bWVudERCIDogdm9pZCAwIDogdm9pZCAwIDogdm9pZCAwKSB8fCBmYWxzZTtcbiAgICBpZiAoaXNkb2N1bWVudERCKSB7XG4gICAgICBpZiAoYXJyYXkubGVuZ3RoID4gMCkge1xuICAgICAgICBpbmRleE5hbWUgPSBhcnJheS5qb2luKFwiLlwiKTtcbiAgICAgICAgb2JqZWN0Lm5hbWUgPSBpbmRleE5hbWU7XG4gICAgICAgIGlmIChpbmRleE5hbWUubGVuZ3RoID4gNTIpIHtcbiAgICAgICAgICBvYmplY3QubmFtZSA9IGluZGV4TmFtZS5zdWJzdHJpbmcoMCwgNTIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvYmplY3Q7XG4gIH07XG59XG4iLCJDcmVhdG9yLmFwcHNCeU5hbWUgPSB7fVxuXG4iLCJNZXRlb3IubWV0aG9kc1xuXHRcIm9iamVjdF9yZWNlbnRfdmlld2VkXCI6IChvYmplY3RfbmFtZSwgcmVjb3JkX2lkLCBzcGFjZV9pZCktPlxuXHRcdGlmICF0aGlzLnVzZXJJZFxuXHRcdFx0cmV0dXJuIG51bGxcblxuXHRcdGlmIG9iamVjdF9uYW1lID09IFwib2JqZWN0X3JlY2VudF92aWV3ZWRcIlxuXHRcdFx0cmV0dXJuXG5cdFx0aWYgb2JqZWN0X25hbWUgYW5kIHJlY29yZF9pZFxuXHRcdFx0aWYgIXNwYWNlX2lkXG5cdFx0XHRcdGRvYyA9IENyZWF0b3IuZ2V0Q29sbGVjdGlvbihvYmplY3RfbmFtZSkuZmluZE9uZSh7X2lkOiByZWNvcmRfaWR9LCB7ZmllbGRzOiB7c3BhY2U6IDF9fSlcblx0XHRcdFx0c3BhY2VfaWQgPSBkb2M/LnNwYWNlXG5cblx0XHRcdGNvbGxlY3Rpb25fcmVjZW50X3ZpZXdlZCA9IENyZWF0b3IuZ2V0Q29sbGVjdGlvbihcIm9iamVjdF9yZWNlbnRfdmlld2VkXCIpXG5cdFx0XHRmaWx0ZXJzID0geyBvd25lcjogdGhpcy51c2VySWQsIHNwYWNlOiBzcGFjZV9pZCwgJ3JlY29yZC5vJzogb2JqZWN0X25hbWUsICdyZWNvcmQuaWRzJzogW3JlY29yZF9pZF19XG5cdFx0XHRjdXJyZW50X3JlY2VudF92aWV3ZWQgPSBjb2xsZWN0aW9uX3JlY2VudF92aWV3ZWQuZmluZE9uZShmaWx0ZXJzKVxuXHRcdFx0aWYgY3VycmVudF9yZWNlbnRfdmlld2VkXG5cdFx0XHRcdGNvbGxlY3Rpb25fcmVjZW50X3ZpZXdlZC51cGRhdGUoXG5cdFx0XHRcdFx0Y3VycmVudF9yZWNlbnRfdmlld2VkLl9pZCxcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHQkaW5jOiB7XG5cdFx0XHRcdFx0XHRcdGNvdW50OiAxXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0JHNldDoge1xuXHRcdFx0XHRcdFx0XHRtb2RpZmllZDogbmV3IERhdGUoKVxuXHRcdFx0XHRcdFx0XHRtb2RpZmllZF9ieTogdGhpcy51c2VySWRcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdClcblx0XHRcdGVsc2Vcblx0XHRcdFx0Y29sbGVjdGlvbl9yZWNlbnRfdmlld2VkLmluc2VydChcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRfaWQ6IGNvbGxlY3Rpb25fcmVjZW50X3ZpZXdlZC5fbWFrZU5ld0lEKClcblx0XHRcdFx0XHRcdG93bmVyOiB0aGlzLnVzZXJJZFxuXHRcdFx0XHRcdFx0c3BhY2U6IHNwYWNlX2lkXG5cdFx0XHRcdFx0XHRyZWNvcmQ6IHtvOiBvYmplY3RfbmFtZSwgaWRzOiBbcmVjb3JkX2lkXX1cblx0XHRcdFx0XHRcdGNvdW50OiAxXG5cdFx0XHRcdFx0XHRjcmVhdGVkOiBuZXcgRGF0ZSgpXG5cdFx0XHRcdFx0XHRjcmVhdGVkX2J5OiB0aGlzLnVzZXJJZFxuXHRcdFx0XHRcdFx0bW9kaWZpZWQ6IG5ldyBEYXRlKClcblx0XHRcdFx0XHRcdG1vZGlmaWVkX2J5OiB0aGlzLnVzZXJJZFxuXHRcdFx0XHRcdH1cblx0XHRcdFx0KVxuXHRcdFx0cmV0dXJuIiwiTWV0ZW9yLm1ldGhvZHMoe1xuICBcIm9iamVjdF9yZWNlbnRfdmlld2VkXCI6IGZ1bmN0aW9uKG9iamVjdF9uYW1lLCByZWNvcmRfaWQsIHNwYWNlX2lkKSB7XG4gICAgdmFyIGNvbGxlY3Rpb25fcmVjZW50X3ZpZXdlZCwgY3VycmVudF9yZWNlbnRfdmlld2VkLCBkb2MsIGZpbHRlcnM7XG4gICAgaWYgKCF0aGlzLnVzZXJJZCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGlmIChvYmplY3RfbmFtZSA9PT0gXCJvYmplY3RfcmVjZW50X3ZpZXdlZFwiKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChvYmplY3RfbmFtZSAmJiByZWNvcmRfaWQpIHtcbiAgICAgIGlmICghc3BhY2VfaWQpIHtcbiAgICAgICAgZG9jID0gQ3JlYXRvci5nZXRDb2xsZWN0aW9uKG9iamVjdF9uYW1lKS5maW5kT25lKHtcbiAgICAgICAgICBfaWQ6IHJlY29yZF9pZFxuICAgICAgICB9LCB7XG4gICAgICAgICAgZmllbGRzOiB7XG4gICAgICAgICAgICBzcGFjZTogMVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHNwYWNlX2lkID0gZG9jICE9IG51bGwgPyBkb2Muc3BhY2UgOiB2b2lkIDA7XG4gICAgICB9XG4gICAgICBjb2xsZWN0aW9uX3JlY2VudF92aWV3ZWQgPSBDcmVhdG9yLmdldENvbGxlY3Rpb24oXCJvYmplY3RfcmVjZW50X3ZpZXdlZFwiKTtcbiAgICAgIGZpbHRlcnMgPSB7XG4gICAgICAgIG93bmVyOiB0aGlzLnVzZXJJZCxcbiAgICAgICAgc3BhY2U6IHNwYWNlX2lkLFxuICAgICAgICAncmVjb3JkLm8nOiBvYmplY3RfbmFtZSxcbiAgICAgICAgJ3JlY29yZC5pZHMnOiBbcmVjb3JkX2lkXVxuICAgICAgfTtcbiAgICAgIGN1cnJlbnRfcmVjZW50X3ZpZXdlZCA9IGNvbGxlY3Rpb25fcmVjZW50X3ZpZXdlZC5maW5kT25lKGZpbHRlcnMpO1xuICAgICAgaWYgKGN1cnJlbnRfcmVjZW50X3ZpZXdlZCkge1xuICAgICAgICBjb2xsZWN0aW9uX3JlY2VudF92aWV3ZWQudXBkYXRlKGN1cnJlbnRfcmVjZW50X3ZpZXdlZC5faWQsIHtcbiAgICAgICAgICAkaW5jOiB7XG4gICAgICAgICAgICBjb3VudDogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgJHNldDoge1xuICAgICAgICAgICAgbW9kaWZpZWQ6IG5ldyBEYXRlKCksXG4gICAgICAgICAgICBtb2RpZmllZF9ieTogdGhpcy51c2VySWRcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29sbGVjdGlvbl9yZWNlbnRfdmlld2VkLmluc2VydCh7XG4gICAgICAgICAgX2lkOiBjb2xsZWN0aW9uX3JlY2VudF92aWV3ZWQuX21ha2VOZXdJRCgpLFxuICAgICAgICAgIG93bmVyOiB0aGlzLnVzZXJJZCxcbiAgICAgICAgICBzcGFjZTogc3BhY2VfaWQsXG4gICAgICAgICAgcmVjb3JkOiB7XG4gICAgICAgICAgICBvOiBvYmplY3RfbmFtZSxcbiAgICAgICAgICAgIGlkczogW3JlY29yZF9pZF1cbiAgICAgICAgICB9LFxuICAgICAgICAgIGNvdW50OiAxLFxuICAgICAgICAgIGNyZWF0ZWQ6IG5ldyBEYXRlKCksXG4gICAgICAgICAgY3JlYXRlZF9ieTogdGhpcy51c2VySWQsXG4gICAgICAgICAgbW9kaWZpZWQ6IG5ldyBEYXRlKCksXG4gICAgICAgICAgbW9kaWZpZWRfYnk6IHRoaXMudXNlcklkXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxufSk7XG4iLCJyZWNlbnRfYWdncmVnYXRlID0gKGNyZWF0ZWRfYnksIHNwYWNlSWQsIF9yZWNvcmRzLCBjYWxsYmFjayktPlxuXHRDcmVhdG9yLkNvbGxlY3Rpb25zLm9iamVjdF9yZWNlbnRfdmlld2VkLnJhd0NvbGxlY3Rpb24oKS5hZ2dyZWdhdGUoW1xuXHRcdHskbWF0Y2g6IHtjcmVhdGVkX2J5OiBjcmVhdGVkX2J5LCBzcGFjZTogc3BhY2VJZH19LFxuXHRcdHskZ3JvdXA6IHtfaWQ6IHtvYmplY3RfbmFtZTogXCIkcmVjb3JkLm9cIiwgcmVjb3JkX2lkOiBcIiRyZWNvcmQuaWRzXCIsIHNwYWNlOiBcIiRzcGFjZVwifSwgbWF4Q3JlYXRlZDogeyRtYXg6IFwiJGNyZWF0ZWRcIn19fSxcblx0XHR7JHNvcnQ6IHttYXhDcmVhdGVkOiAtMX19LFxuXHRcdHskbGltaXQ6IDEwfVxuXHRdKS50b0FycmF5IChlcnIsIGRhdGEpLT5cblx0XHRpZiBlcnJcblx0XHRcdHRocm93IG5ldyBFcnJvcihlcnIpXG5cblx0XHRkYXRhLmZvckVhY2ggKGRvYykgLT5cblx0XHRcdF9yZWNvcmRzLnB1c2ggZG9jLl9pZFxuXG5cdFx0aWYgY2FsbGJhY2sgJiYgXy5pc0Z1bmN0aW9uKGNhbGxiYWNrKVxuXHRcdFx0Y2FsbGJhY2soKVxuXG5cdFx0cmV0dXJuXG5cbmFzeW5jX3JlY2VudF9hZ2dyZWdhdGUgPSBNZXRlb3Iud3JhcEFzeW5jKHJlY2VudF9hZ2dyZWdhdGUpXG5cbnNlYXJjaF9vYmplY3QgPSAoc3BhY2UsIG9iamVjdF9uYW1lLHVzZXJJZCwgc2VhcmNoVGV4dCktPlxuXHRkYXRhID0gbmV3IEFycmF5KClcblxuXHRpZiBzZWFyY2hUZXh0XG5cblx0XHRfb2JqZWN0ID0gQ3JlYXRvci5nZXRPYmplY3Qob2JqZWN0X25hbWUpXG5cblx0XHRfb2JqZWN0X2NvbGxlY3Rpb24gPSBDcmVhdG9yLmdldENvbGxlY3Rpb24ob2JqZWN0X25hbWUpXG5cdFx0X29iamVjdF9uYW1lX2tleSA9IF9vYmplY3Q/Lk5BTUVfRklFTERfS0VZXG5cdFx0aWYgX29iamVjdCAmJiBfb2JqZWN0X2NvbGxlY3Rpb24gJiYgX29iamVjdF9uYW1lX2tleVxuXHRcdFx0cXVlcnkgPSB7fVxuXHRcdFx0c2VhcmNoX0tleXdvcmRzID0gc2VhcmNoVGV4dC5zcGxpdChcIiBcIilcblx0XHRcdHF1ZXJ5X2FuZCA9IFtdXG5cdFx0XHRzZWFyY2hfS2V5d29yZHMuZm9yRWFjaCAoa2V5d29yZCktPlxuXHRcdFx0XHRzdWJxdWVyeSA9IHt9XG5cdFx0XHRcdHN1YnF1ZXJ5W19vYmplY3RfbmFtZV9rZXldID0geyRyZWdleDoga2V5d29yZC50cmltKCl9XG5cdFx0XHRcdHF1ZXJ5X2FuZC5wdXNoIHN1YnF1ZXJ5XG5cblx0XHRcdHF1ZXJ5LiRhbmQgPSBxdWVyeV9hbmRcblx0XHRcdHF1ZXJ5LnNwYWNlID0geyRpbjogW3NwYWNlXX1cblxuXHRcdFx0ZmllbGRzID0ge19pZDogMX1cblx0XHRcdGZpZWxkc1tfb2JqZWN0X25hbWVfa2V5XSA9IDFcblxuXHRcdFx0cmVjb3JkcyA9IF9vYmplY3RfY29sbGVjdGlvbi5maW5kKHF1ZXJ5LCB7ZmllbGRzOiBmaWVsZHMsIHNvcnQ6IHttb2RpZmllZDogMX0sIGxpbWl0OiA1fSlcblxuXHRcdFx0cmVjb3Jkcy5mb3JFYWNoIChyZWNvcmQpLT5cblx0XHRcdFx0ZGF0YS5wdXNoIHtfaWQ6IHJlY29yZC5faWQsIF9uYW1lOiByZWNvcmRbX29iamVjdF9uYW1lX2tleV0sIF9vYmplY3RfbmFtZTogb2JqZWN0X25hbWV9XG5cdFxuXHRyZXR1cm4gZGF0YVxuXG5NZXRlb3IubWV0aG9kc1xuXHQnb2JqZWN0X3JlY2VudF9yZWNvcmQnOiAoc3BhY2VJZCktPlxuXHRcdGRhdGEgPSBuZXcgQXJyYXkoKVxuXHRcdHJlY29yZHMgPSBuZXcgQXJyYXkoKVxuXHRcdGFzeW5jX3JlY2VudF9hZ2dyZWdhdGUodGhpcy51c2VySWQsIHNwYWNlSWQsIHJlY29yZHMpXG5cdFx0cmVjb3Jkcy5mb3JFYWNoIChpdGVtKS0+XG5cdFx0XHRyZWNvcmRfb2JqZWN0ID0gQ3JlYXRvci5nZXRPYmplY3QoaXRlbS5vYmplY3RfbmFtZSwgaXRlbS5zcGFjZSlcblxuXHRcdFx0aWYgIXJlY29yZF9vYmplY3Rcblx0XHRcdFx0cmV0dXJuXG5cblx0XHRcdHJlY29yZF9vYmplY3RfY29sbGVjdGlvbiA9IENyZWF0b3IuZ2V0Q29sbGVjdGlvbihpdGVtLm9iamVjdF9uYW1lLCBpdGVtLnNwYWNlKVxuXG5cdFx0XHRpZiByZWNvcmRfb2JqZWN0ICYmIHJlY29yZF9vYmplY3RfY29sbGVjdGlvblxuXHRcdFx0XHRmaWVsZHMgPSB7X2lkOiAxfVxuXG5cdFx0XHRcdGZpZWxkc1tyZWNvcmRfb2JqZWN0Lk5BTUVfRklFTERfS0VZXSA9IDFcblxuXHRcdFx0XHRyZWNvcmQgPSByZWNvcmRfb2JqZWN0X2NvbGxlY3Rpb24uZmluZE9uZShpdGVtLnJlY29yZF9pZFswXSwge2ZpZWxkczogZmllbGRzfSlcblx0XHRcdFx0aWYgcmVjb3JkXG5cdFx0XHRcdFx0ZGF0YS5wdXNoIHtfaWQ6IHJlY29yZC5faWQsIF9uYW1lOiByZWNvcmRbcmVjb3JkX29iamVjdC5OQU1FX0ZJRUxEX0tFWV0sIF9vYmplY3RfbmFtZTogaXRlbS5vYmplY3RfbmFtZX1cblxuXHRcdHJldHVybiBkYXRhXG5cblx0J29iamVjdF9yZWNvcmRfc2VhcmNoJzogKG9wdGlvbnMpLT5cblx0XHRzZWxmID0gdGhpc1xuXG5cdFx0ZGF0YSA9IG5ldyBBcnJheSgpXG5cblx0XHRzZWFyY2hUZXh0ID0gb3B0aW9ucy5zZWFyY2hUZXh0XG5cdFx0c3BhY2UgPSBvcHRpb25zLnNwYWNlXG5cblx0XHRfLmZvckVhY2ggQ3JlYXRvci5vYmplY3RzQnlOYW1lLCAoX29iamVjdCwgbmFtZSktPlxuXHRcdFx0aWYgX29iamVjdC5lbmFibGVfc2VhcmNoXG5cdFx0XHRcdG9iamVjdF9yZWNvcmQgPSBzZWFyY2hfb2JqZWN0KHNwYWNlLCBfb2JqZWN0Lm5hbWUsIHNlbGYudXNlcklkLCBzZWFyY2hUZXh0KVxuXHRcdFx0XHRkYXRhID0gZGF0YS5jb25jYXQob2JqZWN0X3JlY29yZClcblxuXHRcdHJldHVybiBkYXRhXG4iLCJ2YXIgYXN5bmNfcmVjZW50X2FnZ3JlZ2F0ZSwgcmVjZW50X2FnZ3JlZ2F0ZSwgc2VhcmNoX29iamVjdDtcblxucmVjZW50X2FnZ3JlZ2F0ZSA9IGZ1bmN0aW9uKGNyZWF0ZWRfYnksIHNwYWNlSWQsIF9yZWNvcmRzLCBjYWxsYmFjaykge1xuICByZXR1cm4gQ3JlYXRvci5Db2xsZWN0aW9ucy5vYmplY3RfcmVjZW50X3ZpZXdlZC5yYXdDb2xsZWN0aW9uKCkuYWdncmVnYXRlKFtcbiAgICB7XG4gICAgICAkbWF0Y2g6IHtcbiAgICAgICAgY3JlYXRlZF9ieTogY3JlYXRlZF9ieSxcbiAgICAgICAgc3BhY2U6IHNwYWNlSWRcbiAgICAgIH1cbiAgICB9LCB7XG4gICAgICAkZ3JvdXA6IHtcbiAgICAgICAgX2lkOiB7XG4gICAgICAgICAgb2JqZWN0X25hbWU6IFwiJHJlY29yZC5vXCIsXG4gICAgICAgICAgcmVjb3JkX2lkOiBcIiRyZWNvcmQuaWRzXCIsXG4gICAgICAgICAgc3BhY2U6IFwiJHNwYWNlXCJcbiAgICAgICAgfSxcbiAgICAgICAgbWF4Q3JlYXRlZDoge1xuICAgICAgICAgICRtYXg6IFwiJGNyZWF0ZWRcIlxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwge1xuICAgICAgJHNvcnQ6IHtcbiAgICAgICAgbWF4Q3JlYXRlZDogLTFcbiAgICAgIH1cbiAgICB9LCB7XG4gICAgICAkbGltaXQ6IDEwXG4gICAgfVxuICBdKS50b0FycmF5KGZ1bmN0aW9uKGVyciwgZGF0YSkge1xuICAgIGlmIChlcnIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihlcnIpO1xuICAgIH1cbiAgICBkYXRhLmZvckVhY2goZnVuY3Rpb24oZG9jKSB7XG4gICAgICByZXR1cm4gX3JlY29yZHMucHVzaChkb2MuX2lkKTtcbiAgICB9KTtcbiAgICBpZiAoY2FsbGJhY2sgJiYgXy5pc0Z1bmN0aW9uKGNhbGxiYWNrKSkge1xuICAgICAgY2FsbGJhY2soKTtcbiAgICB9XG4gIH0pO1xufTtcblxuYXN5bmNfcmVjZW50X2FnZ3JlZ2F0ZSA9IE1ldGVvci53cmFwQXN5bmMocmVjZW50X2FnZ3JlZ2F0ZSk7XG5cbnNlYXJjaF9vYmplY3QgPSBmdW5jdGlvbihzcGFjZSwgb2JqZWN0X25hbWUsIHVzZXJJZCwgc2VhcmNoVGV4dCkge1xuICB2YXIgX29iamVjdCwgX29iamVjdF9jb2xsZWN0aW9uLCBfb2JqZWN0X25hbWVfa2V5LCBkYXRhLCBmaWVsZHMsIHF1ZXJ5LCBxdWVyeV9hbmQsIHJlY29yZHMsIHNlYXJjaF9LZXl3b3JkcztcbiAgZGF0YSA9IG5ldyBBcnJheSgpO1xuICBpZiAoc2VhcmNoVGV4dCkge1xuICAgIF9vYmplY3QgPSBDcmVhdG9yLmdldE9iamVjdChvYmplY3RfbmFtZSk7XG4gICAgX29iamVjdF9jb2xsZWN0aW9uID0gQ3JlYXRvci5nZXRDb2xsZWN0aW9uKG9iamVjdF9uYW1lKTtcbiAgICBfb2JqZWN0X25hbWVfa2V5ID0gX29iamVjdCAhPSBudWxsID8gX29iamVjdC5OQU1FX0ZJRUxEX0tFWSA6IHZvaWQgMDtcbiAgICBpZiAoX29iamVjdCAmJiBfb2JqZWN0X2NvbGxlY3Rpb24gJiYgX29iamVjdF9uYW1lX2tleSkge1xuICAgICAgcXVlcnkgPSB7fTtcbiAgICAgIHNlYXJjaF9LZXl3b3JkcyA9IHNlYXJjaFRleHQuc3BsaXQoXCIgXCIpO1xuICAgICAgcXVlcnlfYW5kID0gW107XG4gICAgICBzZWFyY2hfS2V5d29yZHMuZm9yRWFjaChmdW5jdGlvbihrZXl3b3JkKSB7XG4gICAgICAgIHZhciBzdWJxdWVyeTtcbiAgICAgICAgc3VicXVlcnkgPSB7fTtcbiAgICAgICAgc3VicXVlcnlbX29iamVjdF9uYW1lX2tleV0gPSB7XG4gICAgICAgICAgJHJlZ2V4OiBrZXl3b3JkLnRyaW0oKVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gcXVlcnlfYW5kLnB1c2goc3VicXVlcnkpO1xuICAgICAgfSk7XG4gICAgICBxdWVyeS4kYW5kID0gcXVlcnlfYW5kO1xuICAgICAgcXVlcnkuc3BhY2UgPSB7XG4gICAgICAgICRpbjogW3NwYWNlXVxuICAgICAgfTtcbiAgICAgIGZpZWxkcyA9IHtcbiAgICAgICAgX2lkOiAxXG4gICAgICB9O1xuICAgICAgZmllbGRzW19vYmplY3RfbmFtZV9rZXldID0gMTtcbiAgICAgIHJlY29yZHMgPSBfb2JqZWN0X2NvbGxlY3Rpb24uZmluZChxdWVyeSwge1xuICAgICAgICBmaWVsZHM6IGZpZWxkcyxcbiAgICAgICAgc29ydDoge1xuICAgICAgICAgIG1vZGlmaWVkOiAxXG4gICAgICAgIH0sXG4gICAgICAgIGxpbWl0OiA1XG4gICAgICB9KTtcbiAgICAgIHJlY29yZHMuZm9yRWFjaChmdW5jdGlvbihyZWNvcmQpIHtcbiAgICAgICAgcmV0dXJuIGRhdGEucHVzaCh7XG4gICAgICAgICAgX2lkOiByZWNvcmQuX2lkLFxuICAgICAgICAgIF9uYW1lOiByZWNvcmRbX29iamVjdF9uYW1lX2tleV0sXG4gICAgICAgICAgX29iamVjdF9uYW1lOiBvYmplY3RfbmFtZVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZGF0YTtcbn07XG5cbk1ldGVvci5tZXRob2RzKHtcbiAgJ29iamVjdF9yZWNlbnRfcmVjb3JkJzogZnVuY3Rpb24oc3BhY2VJZCkge1xuICAgIHZhciBkYXRhLCByZWNvcmRzO1xuICAgIGRhdGEgPSBuZXcgQXJyYXkoKTtcbiAgICByZWNvcmRzID0gbmV3IEFycmF5KCk7XG4gICAgYXN5bmNfcmVjZW50X2FnZ3JlZ2F0ZSh0aGlzLnVzZXJJZCwgc3BhY2VJZCwgcmVjb3Jkcyk7XG4gICAgcmVjb3Jkcy5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgIHZhciBmaWVsZHMsIHJlY29yZCwgcmVjb3JkX29iamVjdCwgcmVjb3JkX29iamVjdF9jb2xsZWN0aW9uO1xuICAgICAgcmVjb3JkX29iamVjdCA9IENyZWF0b3IuZ2V0T2JqZWN0KGl0ZW0ub2JqZWN0X25hbWUsIGl0ZW0uc3BhY2UpO1xuICAgICAgaWYgKCFyZWNvcmRfb2JqZWN0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHJlY29yZF9vYmplY3RfY29sbGVjdGlvbiA9IENyZWF0b3IuZ2V0Q29sbGVjdGlvbihpdGVtLm9iamVjdF9uYW1lLCBpdGVtLnNwYWNlKTtcbiAgICAgIGlmIChyZWNvcmRfb2JqZWN0ICYmIHJlY29yZF9vYmplY3RfY29sbGVjdGlvbikge1xuICAgICAgICBmaWVsZHMgPSB7XG4gICAgICAgICAgX2lkOiAxXG4gICAgICAgIH07XG4gICAgICAgIGZpZWxkc1tyZWNvcmRfb2JqZWN0Lk5BTUVfRklFTERfS0VZXSA9IDE7XG4gICAgICAgIHJlY29yZCA9IHJlY29yZF9vYmplY3RfY29sbGVjdGlvbi5maW5kT25lKGl0ZW0ucmVjb3JkX2lkWzBdLCB7XG4gICAgICAgICAgZmllbGRzOiBmaWVsZHNcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChyZWNvcmQpIHtcbiAgICAgICAgICByZXR1cm4gZGF0YS5wdXNoKHtcbiAgICAgICAgICAgIF9pZDogcmVjb3JkLl9pZCxcbiAgICAgICAgICAgIF9uYW1lOiByZWNvcmRbcmVjb3JkX29iamVjdC5OQU1FX0ZJRUxEX0tFWV0sXG4gICAgICAgICAgICBfb2JqZWN0X25hbWU6IGl0ZW0ub2JqZWN0X25hbWVcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBkYXRhO1xuICB9LFxuICAnb2JqZWN0X3JlY29yZF9zZWFyY2gnOiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgdmFyIGRhdGEsIHNlYXJjaFRleHQsIHNlbGYsIHNwYWNlO1xuICAgIHNlbGYgPSB0aGlzO1xuICAgIGRhdGEgPSBuZXcgQXJyYXkoKTtcbiAgICBzZWFyY2hUZXh0ID0gb3B0aW9ucy5zZWFyY2hUZXh0O1xuICAgIHNwYWNlID0gb3B0aW9ucy5zcGFjZTtcbiAgICBfLmZvckVhY2goQ3JlYXRvci5vYmplY3RzQnlOYW1lLCBmdW5jdGlvbihfb2JqZWN0LCBuYW1lKSB7XG4gICAgICB2YXIgb2JqZWN0X3JlY29yZDtcbiAgICAgIGlmIChfb2JqZWN0LmVuYWJsZV9zZWFyY2gpIHtcbiAgICAgICAgb2JqZWN0X3JlY29yZCA9IHNlYXJjaF9vYmplY3Qoc3BhY2UsIF9vYmplY3QubmFtZSwgc2VsZi51c2VySWQsIHNlYXJjaFRleHQpO1xuICAgICAgICByZXR1cm4gZGF0YSA9IGRhdGEuY29uY2F0KG9iamVjdF9yZWNvcmQpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBkYXRhO1xuICB9XG59KTtcbiIsIk1ldGVvci5tZXRob2RzXG4gICAgdXBkYXRlX2ZpbHRlcnM6IChsaXN0dmlld19pZCwgZmlsdGVycywgZmlsdGVyX3Njb3BlLCBmaWx0ZXJfbG9naWMpLT5cbiAgICAgICAgQ3JlYXRvci5Db2xsZWN0aW9ucy5vYmplY3RfbGlzdHZpZXdzLmRpcmVjdC51cGRhdGUoe19pZDogbGlzdHZpZXdfaWR9LCB7JHNldDoge2ZpbHRlcnM6IGZpbHRlcnMsIGZpbHRlcl9zY29wZTogZmlsdGVyX3Njb3BlLCBmaWx0ZXJfbG9naWM6IGZpbHRlcl9sb2dpY319KVxuXG4gICAgdXBkYXRlX2NvbHVtbnM6IChsaXN0dmlld19pZCwgY29sdW1ucyktPlxuICAgICAgICBjaGVjayhjb2x1bW5zLCBBcnJheSlcbiAgICAgICAgXG4gICAgICAgIGlmIGNvbHVtbnMubGVuZ3RoIDwgMVxuICAgICAgICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvciA0MDAsIFwiU2VsZWN0IGF0IGxlYXN0IG9uZSBmaWVsZCB0byBkaXNwbGF5XCJcbiAgICAgICAgQ3JlYXRvci5Db2xsZWN0aW9ucy5vYmplY3RfbGlzdHZpZXdzLnVwZGF0ZSh7X2lkOiBsaXN0dmlld19pZH0sIHskc2V0OiB7Y29sdW1uczogY29sdW1uc319KVxuIiwiTWV0ZW9yLm1ldGhvZHMoe1xuICB1cGRhdGVfZmlsdGVyczogZnVuY3Rpb24obGlzdHZpZXdfaWQsIGZpbHRlcnMsIGZpbHRlcl9zY29wZSwgZmlsdGVyX2xvZ2ljKSB7XG4gICAgcmV0dXJuIENyZWF0b3IuQ29sbGVjdGlvbnMub2JqZWN0X2xpc3R2aWV3cy5kaXJlY3QudXBkYXRlKHtcbiAgICAgIF9pZDogbGlzdHZpZXdfaWRcbiAgICB9LCB7XG4gICAgICAkc2V0OiB7XG4gICAgICAgIGZpbHRlcnM6IGZpbHRlcnMsXG4gICAgICAgIGZpbHRlcl9zY29wZTogZmlsdGVyX3Njb3BlLFxuICAgICAgICBmaWx0ZXJfbG9naWM6IGZpbHRlcl9sb2dpY1xuICAgICAgfVxuICAgIH0pO1xuICB9LFxuICB1cGRhdGVfY29sdW1uczogZnVuY3Rpb24obGlzdHZpZXdfaWQsIGNvbHVtbnMpIHtcbiAgICBjaGVjayhjb2x1bW5zLCBBcnJheSk7XG4gICAgaWYgKGNvbHVtbnMubGVuZ3RoIDwgMSkge1xuICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcig0MDAsIFwiU2VsZWN0IGF0IGxlYXN0IG9uZSBmaWVsZCB0byBkaXNwbGF5XCIpO1xuICAgIH1cbiAgICByZXR1cm4gQ3JlYXRvci5Db2xsZWN0aW9ucy5vYmplY3RfbGlzdHZpZXdzLnVwZGF0ZSh7XG4gICAgICBfaWQ6IGxpc3R2aWV3X2lkXG4gICAgfSwge1xuICAgICAgJHNldDoge1xuICAgICAgICBjb2x1bW5zOiBjb2x1bW5zXG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn0pO1xuIiwiTWV0ZW9yLm1ldGhvZHNcblx0J3JlcG9ydF9kYXRhJzogKG9wdGlvbnMpLT5cblx0XHRjaGVjayhvcHRpb25zLCBPYmplY3QpXG5cdFx0c3BhY2UgPSBvcHRpb25zLnNwYWNlXG5cdFx0ZmllbGRzID0gb3B0aW9ucy5maWVsZHNcblx0XHRvYmplY3RfbmFtZSA9IG9wdGlvbnMub2JqZWN0X25hbWVcblx0XHRmaWx0ZXJfc2NvcGUgPSBvcHRpb25zLmZpbHRlcl9zY29wZVxuXHRcdGZpbHRlcnMgPSBvcHRpb25zLmZpbHRlcnNcblx0XHRmaWx0ZXJGaWVsZHMgPSB7fVxuXHRcdGNvbXBvdW5kRmllbGRzID0gW11cblx0XHRvYmplY3RGaWVsZHMgPSBDcmVhdG9yLmdldE9iamVjdChvYmplY3RfbmFtZSk/LmZpZWxkc1xuXHRcdF8uZWFjaCBmaWVsZHMsIChpdGVtLCBpbmRleCktPlxuXHRcdFx0c3BsaXRzID0gaXRlbS5zcGxpdChcIi5cIilcblx0XHRcdG5hbWUgPSBzcGxpdHNbMF1cblx0XHRcdG9iamVjdEZpZWxkID0gb2JqZWN0RmllbGRzW25hbWVdXG5cdFx0XHRpZiBzcGxpdHMubGVuZ3RoID4gMSBhbmQgb2JqZWN0RmllbGRcblx0XHRcdFx0Y2hpbGRLZXkgPSBpdGVtLnJlcGxhY2UgbmFtZSArIFwiLlwiLCBcIlwiXG5cdFx0XHRcdGNvbXBvdW5kRmllbGRzLnB1c2goe25hbWU6IG5hbWUsIGNoaWxkS2V5OiBjaGlsZEtleSwgZmllbGQ6IG9iamVjdEZpZWxkfSlcblx0XHRcdGZpbHRlckZpZWxkc1tuYW1lXSA9IDFcblxuXHRcdHNlbGVjdG9yID0ge31cblx0XHR1c2VySWQgPSB0aGlzLnVzZXJJZFxuXHRcdHNlbGVjdG9yLnNwYWNlID0gc3BhY2Vcblx0XHRpZiBmaWx0ZXJfc2NvcGUgPT0gXCJzcGFjZXhcIlxuXHRcdFx0c2VsZWN0b3Iuc3BhY2UgPSBcblx0XHRcdFx0JGluOiBbbnVsbCxzcGFjZV1cblx0XHRlbHNlIGlmIGZpbHRlcl9zY29wZSA9PSBcIm1pbmVcIlxuXHRcdFx0c2VsZWN0b3Iub3duZXIgPSB1c2VySWRcblxuXHRcdGlmIENyZWF0b3IuaXNDb21tb25TcGFjZShzcGFjZSkgJiYgQ3JlYXRvci5pc1NwYWNlQWRtaW4oc3BhY2UsIEB1c2VySWQpXG5cdFx0XHRkZWxldGUgc2VsZWN0b3Iuc3BhY2VcblxuXHRcdGlmIGZpbHRlcnMgYW5kIGZpbHRlcnMubGVuZ3RoID4gMFxuXHRcdFx0c2VsZWN0b3JbXCIkYW5kXCJdID0gZmlsdGVyc1xuXG5cdFx0Y3Vyc29yID0gQ3JlYXRvci5nZXRDb2xsZWN0aW9uKG9iamVjdF9uYW1lKS5maW5kKHNlbGVjdG9yLCB7ZmllbGRzOiBmaWx0ZXJGaWVsZHMsIHNraXA6IDAsIGxpbWl0OiAxMDAwMH0pXG4jXHRcdGlmIGN1cnNvci5jb3VudCgpID4gMTAwMDBcbiNcdFx0XHRyZXR1cm4gW11cblx0XHRyZXN1bHQgPSBjdXJzb3IuZmV0Y2goKVxuXHRcdGlmIGNvbXBvdW5kRmllbGRzLmxlbmd0aFxuXHRcdFx0cmVzdWx0ID0gcmVzdWx0Lm1hcCAoaXRlbSxpbmRleCktPlxuXHRcdFx0XHRfLmVhY2ggY29tcG91bmRGaWVsZHMsIChjb21wb3VuZEZpZWxkSXRlbSwgaW5kZXgpLT5cblx0XHRcdFx0XHRpdGVtS2V5ID0gY29tcG91bmRGaWVsZEl0ZW0ubmFtZSArIFwiKiUqXCIgKyBjb21wb3VuZEZpZWxkSXRlbS5jaGlsZEtleS5yZXBsYWNlKC9cXC4vZywgXCIqJSpcIilcblx0XHRcdFx0XHRpdGVtVmFsdWUgPSBpdGVtW2NvbXBvdW5kRmllbGRJdGVtLm5hbWVdXG5cdFx0XHRcdFx0dHlwZSA9IGNvbXBvdW5kRmllbGRJdGVtLmZpZWxkLnR5cGVcblx0XHRcdFx0XHRpZiBbXCJsb29rdXBcIiwgXCJtYXN0ZXJfZGV0YWlsXCJdLmluZGV4T2YodHlwZSkgPiAtMVxuXHRcdFx0XHRcdFx0cmVmZXJlbmNlX3RvID0gY29tcG91bmRGaWVsZEl0ZW0uZmllbGQucmVmZXJlbmNlX3RvXG5cdFx0XHRcdFx0XHRjb21wb3VuZEZpbHRlckZpZWxkcyA9IHt9XG5cdFx0XHRcdFx0XHRjb21wb3VuZEZpbHRlckZpZWxkc1tjb21wb3VuZEZpZWxkSXRlbS5jaGlsZEtleV0gPSAxXG5cdFx0XHRcdFx0XHRyZWZlcmVuY2VJdGVtID0gQ3JlYXRvci5nZXRDb2xsZWN0aW9uKHJlZmVyZW5jZV90bykuZmluZE9uZSB7X2lkOiBpdGVtVmFsdWV9LCBmaWVsZHM6IGNvbXBvdW5kRmlsdGVyRmllbGRzXG5cdFx0XHRcdFx0XHRpZiByZWZlcmVuY2VJdGVtXG5cdFx0XHRcdFx0XHRcdGl0ZW1baXRlbUtleV0gPSByZWZlcmVuY2VJdGVtW2NvbXBvdW5kRmllbGRJdGVtLmNoaWxkS2V5XVxuXHRcdFx0XHRcdGVsc2UgaWYgdHlwZSA9PSBcInNlbGVjdFwiXG5cdFx0XHRcdFx0XHRvcHRpb25zID0gY29tcG91bmRGaWVsZEl0ZW0uZmllbGQub3B0aW9uc1xuXHRcdFx0XHRcdFx0aXRlbVtpdGVtS2V5XSA9IF8uZmluZFdoZXJlKG9wdGlvbnMsIHt2YWx1ZTogaXRlbVZhbHVlfSk/LmxhYmVsIG9yIGl0ZW1WYWx1ZVxuXHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRcdGl0ZW1baXRlbUtleV0gPSBpdGVtVmFsdWVcblx0XHRcdFx0XHR1bmxlc3MgaXRlbVtpdGVtS2V5XVxuXHRcdFx0XHRcdFx0aXRlbVtpdGVtS2V5XSA9IFwiLS1cIlxuXHRcdFx0XHRyZXR1cm4gaXRlbVxuXHRcdFx0cmV0dXJuIHJlc3VsdFxuXHRcdGVsc2Vcblx0XHRcdHJldHVybiByZXN1bHRcblxuIiwiTWV0ZW9yLm1ldGhvZHMoe1xuICAncmVwb3J0X2RhdGEnOiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgdmFyIGNvbXBvdW5kRmllbGRzLCBjdXJzb3IsIGZpZWxkcywgZmlsdGVyRmllbGRzLCBmaWx0ZXJfc2NvcGUsIGZpbHRlcnMsIG9iamVjdEZpZWxkcywgb2JqZWN0X25hbWUsIHJlZiwgcmVzdWx0LCBzZWxlY3Rvciwgc3BhY2UsIHVzZXJJZDtcbiAgICBjaGVjayhvcHRpb25zLCBPYmplY3QpO1xuICAgIHNwYWNlID0gb3B0aW9ucy5zcGFjZTtcbiAgICBmaWVsZHMgPSBvcHRpb25zLmZpZWxkcztcbiAgICBvYmplY3RfbmFtZSA9IG9wdGlvbnMub2JqZWN0X25hbWU7XG4gICAgZmlsdGVyX3Njb3BlID0gb3B0aW9ucy5maWx0ZXJfc2NvcGU7XG4gICAgZmlsdGVycyA9IG9wdGlvbnMuZmlsdGVycztcbiAgICBmaWx0ZXJGaWVsZHMgPSB7fTtcbiAgICBjb21wb3VuZEZpZWxkcyA9IFtdO1xuICAgIG9iamVjdEZpZWxkcyA9IChyZWYgPSBDcmVhdG9yLmdldE9iamVjdChvYmplY3RfbmFtZSkpICE9IG51bGwgPyByZWYuZmllbGRzIDogdm9pZCAwO1xuICAgIF8uZWFjaChmaWVsZHMsIGZ1bmN0aW9uKGl0ZW0sIGluZGV4KSB7XG4gICAgICB2YXIgY2hpbGRLZXksIG5hbWUsIG9iamVjdEZpZWxkLCBzcGxpdHM7XG4gICAgICBzcGxpdHMgPSBpdGVtLnNwbGl0KFwiLlwiKTtcbiAgICAgIG5hbWUgPSBzcGxpdHNbMF07XG4gICAgICBvYmplY3RGaWVsZCA9IG9iamVjdEZpZWxkc1tuYW1lXTtcbiAgICAgIGlmIChzcGxpdHMubGVuZ3RoID4gMSAmJiBvYmplY3RGaWVsZCkge1xuICAgICAgICBjaGlsZEtleSA9IGl0ZW0ucmVwbGFjZShuYW1lICsgXCIuXCIsIFwiXCIpO1xuICAgICAgICBjb21wb3VuZEZpZWxkcy5wdXNoKHtcbiAgICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICAgIGNoaWxkS2V5OiBjaGlsZEtleSxcbiAgICAgICAgICBmaWVsZDogb2JqZWN0RmllbGRcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmlsdGVyRmllbGRzW25hbWVdID0gMTtcbiAgICB9KTtcbiAgICBzZWxlY3RvciA9IHt9O1xuICAgIHVzZXJJZCA9IHRoaXMudXNlcklkO1xuICAgIHNlbGVjdG9yLnNwYWNlID0gc3BhY2U7XG4gICAgaWYgKGZpbHRlcl9zY29wZSA9PT0gXCJzcGFjZXhcIikge1xuICAgICAgc2VsZWN0b3Iuc3BhY2UgPSB7XG4gICAgICAgICRpbjogW251bGwsIHNwYWNlXVxuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKGZpbHRlcl9zY29wZSA9PT0gXCJtaW5lXCIpIHtcbiAgICAgIHNlbGVjdG9yLm93bmVyID0gdXNlcklkO1xuICAgIH1cbiAgICBpZiAoQ3JlYXRvci5pc0NvbW1vblNwYWNlKHNwYWNlKSAmJiBDcmVhdG9yLmlzU3BhY2VBZG1pbihzcGFjZSwgdGhpcy51c2VySWQpKSB7XG4gICAgICBkZWxldGUgc2VsZWN0b3Iuc3BhY2U7XG4gICAgfVxuICAgIGlmIChmaWx0ZXJzICYmIGZpbHRlcnMubGVuZ3RoID4gMCkge1xuICAgICAgc2VsZWN0b3JbXCIkYW5kXCJdID0gZmlsdGVycztcbiAgICB9XG4gICAgY3Vyc29yID0gQ3JlYXRvci5nZXRDb2xsZWN0aW9uKG9iamVjdF9uYW1lKS5maW5kKHNlbGVjdG9yLCB7XG4gICAgICBmaWVsZHM6IGZpbHRlckZpZWxkcyxcbiAgICAgIHNraXA6IDAsXG4gICAgICBsaW1pdDogMTAwMDBcbiAgICB9KTtcbiAgICByZXN1bHQgPSBjdXJzb3IuZmV0Y2goKTtcbiAgICBpZiAoY29tcG91bmRGaWVsZHMubGVuZ3RoKSB7XG4gICAgICByZXN1bHQgPSByZXN1bHQubWFwKGZ1bmN0aW9uKGl0ZW0sIGluZGV4KSB7XG4gICAgICAgIF8uZWFjaChjb21wb3VuZEZpZWxkcywgZnVuY3Rpb24oY29tcG91bmRGaWVsZEl0ZW0sIGluZGV4KSB7XG4gICAgICAgICAgdmFyIGNvbXBvdW5kRmlsdGVyRmllbGRzLCBpdGVtS2V5LCBpdGVtVmFsdWUsIHJlZjEsIHJlZmVyZW5jZUl0ZW0sIHJlZmVyZW5jZV90bywgdHlwZTtcbiAgICAgICAgICBpdGVtS2V5ID0gY29tcG91bmRGaWVsZEl0ZW0ubmFtZSArIFwiKiUqXCIgKyBjb21wb3VuZEZpZWxkSXRlbS5jaGlsZEtleS5yZXBsYWNlKC9cXC4vZywgXCIqJSpcIik7XG4gICAgICAgICAgaXRlbVZhbHVlID0gaXRlbVtjb21wb3VuZEZpZWxkSXRlbS5uYW1lXTtcbiAgICAgICAgICB0eXBlID0gY29tcG91bmRGaWVsZEl0ZW0uZmllbGQudHlwZTtcbiAgICAgICAgICBpZiAoW1wibG9va3VwXCIsIFwibWFzdGVyX2RldGFpbFwiXS5pbmRleE9mKHR5cGUpID4gLTEpIHtcbiAgICAgICAgICAgIHJlZmVyZW5jZV90byA9IGNvbXBvdW5kRmllbGRJdGVtLmZpZWxkLnJlZmVyZW5jZV90bztcbiAgICAgICAgICAgIGNvbXBvdW5kRmlsdGVyRmllbGRzID0ge307XG4gICAgICAgICAgICBjb21wb3VuZEZpbHRlckZpZWxkc1tjb21wb3VuZEZpZWxkSXRlbS5jaGlsZEtleV0gPSAxO1xuICAgICAgICAgICAgcmVmZXJlbmNlSXRlbSA9IENyZWF0b3IuZ2V0Q29sbGVjdGlvbihyZWZlcmVuY2VfdG8pLmZpbmRPbmUoe1xuICAgICAgICAgICAgICBfaWQ6IGl0ZW1WYWx1ZVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICBmaWVsZHM6IGNvbXBvdW5kRmlsdGVyRmllbGRzXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChyZWZlcmVuY2VJdGVtKSB7XG4gICAgICAgICAgICAgIGl0ZW1baXRlbUtleV0gPSByZWZlcmVuY2VJdGVtW2NvbXBvdW5kRmllbGRJdGVtLmNoaWxkS2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09IFwic2VsZWN0XCIpIHtcbiAgICAgICAgICAgIG9wdGlvbnMgPSBjb21wb3VuZEZpZWxkSXRlbS5maWVsZC5vcHRpb25zO1xuICAgICAgICAgICAgaXRlbVtpdGVtS2V5XSA9ICgocmVmMSA9IF8uZmluZFdoZXJlKG9wdGlvbnMsIHtcbiAgICAgICAgICAgICAgdmFsdWU6IGl0ZW1WYWx1ZVxuICAgICAgICAgICAgfSkpICE9IG51bGwgPyByZWYxLmxhYmVsIDogdm9pZCAwKSB8fCBpdGVtVmFsdWU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGl0ZW1baXRlbUtleV0gPSBpdGVtVmFsdWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghaXRlbVtpdGVtS2V5XSkge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW1baXRlbUtleV0gPSBcIi0tXCI7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICB9KTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICB9XG59KTtcbiIsIiMjI1xuICAgIHR5cGU6IFwidXNlclwiXG4gICAgb2JqZWN0X25hbWU6IFwib2JqZWN0X2xpc3R2aWV3c1wiXG4gICAgcmVjb3JkX2lkOiBcIntvYmplY3RfbmFtZX0se2xpc3R2aWV3X2lkfVwiXG4gICAgc2V0dGluZ3M6XG4gICAgICAgIGNvbHVtbl93aWR0aDogeyBmaWVsZF9hOiAxMDAsIGZpZWxkXzI6IDE1MCB9XG4gICAgICAgIHNvcnQ6IFtbXCJmaWVsZF9hXCIsIFwiZGVzY1wiXV1cbiAgICBvd25lcjoge3VzZXJJZH1cbiMjI1xuXG5NZXRlb3IubWV0aG9kc1xuICAgIFwidGFidWxhcl9zb3J0X3NldHRpbmdzXCI6IChvYmplY3RfbmFtZSwgbGlzdF92aWV3X2lkLCBzb3J0KS0+XG4gICAgICAgIHVzZXJJZCA9IHRoaXMudXNlcklkXG4gICAgICAgIHNldHRpbmcgPSBDcmVhdG9yLkNvbGxlY3Rpb25zLnNldHRpbmdzLmZpbmRPbmUoe29iamVjdF9uYW1lOiBvYmplY3RfbmFtZSwgcmVjb3JkX2lkOiBcIm9iamVjdF9saXN0dmlld3NcIiwgb3duZXI6IHVzZXJJZH0pXG4gICAgICAgIGlmIHNldHRpbmdcbiAgICAgICAgICAgIENyZWF0b3IuQ29sbGVjdGlvbnMuc2V0dGluZ3MudXBkYXRlKHtfaWQ6IHNldHRpbmcuX2lkfSwgeyRzZXQ6IHtcInNldHRpbmdzLiN7bGlzdF92aWV3X2lkfS5zb3J0XCI6IHNvcnR9fSlcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgZG9jID0gXG4gICAgICAgICAgICAgICAgdHlwZTogXCJ1c2VyXCJcbiAgICAgICAgICAgICAgICBvYmplY3RfbmFtZTogb2JqZWN0X25hbWVcbiAgICAgICAgICAgICAgICByZWNvcmRfaWQ6IFwib2JqZWN0X2xpc3R2aWV3c1wiXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHt9XG4gICAgICAgICAgICAgICAgb3duZXI6IHVzZXJJZFxuXG4gICAgICAgICAgICBkb2Muc2V0dGluZ3NbbGlzdF92aWV3X2lkXSA9IHt9XG4gICAgICAgICAgICBkb2Muc2V0dGluZ3NbbGlzdF92aWV3X2lkXS5zb3J0ID0gc29ydFxuXG4gICAgICAgICAgICBDcmVhdG9yLkNvbGxlY3Rpb25zLnNldHRpbmdzLmluc2VydChkb2MpXG5cbiAgICBcInRhYnVsYXJfY29sdW1uX3dpZHRoX3NldHRpbmdzXCI6IChvYmplY3RfbmFtZSwgbGlzdF92aWV3X2lkLCBjb2x1bW5fd2lkdGgpLT5cbiAgICAgICAgdXNlcklkID0gdGhpcy51c2VySWRcbiAgICAgICAgc2V0dGluZyA9IENyZWF0b3IuQ29sbGVjdGlvbnMuc2V0dGluZ3MuZmluZE9uZSh7b2JqZWN0X25hbWU6IG9iamVjdF9uYW1lLCByZWNvcmRfaWQ6IFwib2JqZWN0X2xpc3R2aWV3c1wiLCBvd25lcjogdXNlcklkfSlcbiAgICAgICAgaWYgc2V0dGluZ1xuICAgICAgICAgICAgQ3JlYXRvci5Db2xsZWN0aW9ucy5zZXR0aW5ncy51cGRhdGUoe19pZDogc2V0dGluZy5faWR9LCB7JHNldDoge1wic2V0dGluZ3MuI3tsaXN0X3ZpZXdfaWR9LmNvbHVtbl93aWR0aFwiOiBjb2x1bW5fd2lkdGh9fSlcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgZG9jID0gXG4gICAgICAgICAgICAgICAgdHlwZTogXCJ1c2VyXCJcbiAgICAgICAgICAgICAgICBvYmplY3RfbmFtZTogb2JqZWN0X25hbWVcbiAgICAgICAgICAgICAgICByZWNvcmRfaWQ6IFwib2JqZWN0X2xpc3R2aWV3c1wiXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHt9XG4gICAgICAgICAgICAgICAgb3duZXI6IHVzZXJJZFxuXG4gICAgICAgICAgICBkb2Muc2V0dGluZ3NbbGlzdF92aWV3X2lkXSA9IHt9XG4gICAgICAgICAgICBkb2Muc2V0dGluZ3NbbGlzdF92aWV3X2lkXS5jb2x1bW5fd2lkdGggPSBjb2x1bW5fd2lkdGhcblxuICAgICAgICAgICAgQ3JlYXRvci5Db2xsZWN0aW9ucy5zZXR0aW5ncy5pbnNlcnQoZG9jKVxuXG4gICAgXCJncmlkX3NldHRpbmdzXCI6IChvYmplY3RfbmFtZSwgbGlzdF92aWV3X2lkLCBjb2x1bW5fd2lkdGgsIHNvcnQpLT5cbiAgICAgICAgdXNlcklkID0gdGhpcy51c2VySWRcbiAgICAgICAgc2V0dGluZyA9IENyZWF0b3IuQ29sbGVjdGlvbnMuc2V0dGluZ3MuZmluZE9uZSh7b2JqZWN0X25hbWU6IG9iamVjdF9uYW1lLCByZWNvcmRfaWQ6IFwib2JqZWN0X2dyaWR2aWV3c1wiLCBvd25lcjogdXNlcklkfSlcbiAgICAgICAgaWYgc2V0dGluZ1xuICAgICAgICAgICAgIyDmr4/mrKHpg73lvLrliLbmlLnlj5hfaWRfYWN0aW9uc+WIl+eahOWuveW6pu+8jOS7peino+WGs+W9k+eUqOaIt+WPquaUueWPmOWtl+auteasoeW6j+iAjOayoeacieaUueWPmOS7u+S9leWtl+auteWuveW6puaXtu+8jOWJjeerr+ayoeacieiuoumYheWIsOWtl+auteasoeW6j+WPmOabtOeahOaVsOaNrueahOmXrumimFxuICAgICAgICAgICAgY29sdW1uX3dpZHRoLl9pZF9hY3Rpb25zID0gaWYgc2V0dGluZy5zZXR0aW5nc1tcIiN7bGlzdF92aWV3X2lkfVwiXT8uY29sdW1uX3dpZHRoPy5faWRfYWN0aW9ucyA9PSA0NiB0aGVuIDQ3IGVsc2UgNDZcbiAgICAgICAgICAgIGlmIHNvcnRcbiAgICAgICAgICAgICAgICBDcmVhdG9yLkNvbGxlY3Rpb25zLnNldHRpbmdzLnVwZGF0ZSh7X2lkOiBzZXR0aW5nLl9pZH0sIHskc2V0OiB7XCJzZXR0aW5ncy4je2xpc3Rfdmlld19pZH0uc29ydFwiOiBzb3J0LCBcInNldHRpbmdzLiN7bGlzdF92aWV3X2lkfS5jb2x1bW5fd2lkdGhcIjogY29sdW1uX3dpZHRofX0pXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgQ3JlYXRvci5Db2xsZWN0aW9ucy5zZXR0aW5ncy51cGRhdGUoe19pZDogc2V0dGluZy5faWR9LCB7JHNldDoge1wic2V0dGluZ3MuI3tsaXN0X3ZpZXdfaWR9LmNvbHVtbl93aWR0aFwiOiBjb2x1bW5fd2lkdGh9fSlcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgZG9jID1cbiAgICAgICAgICAgICAgICB0eXBlOiBcInVzZXJcIlxuICAgICAgICAgICAgICAgIG9iamVjdF9uYW1lOiBvYmplY3RfbmFtZVxuICAgICAgICAgICAgICAgIHJlY29yZF9pZDogXCJvYmplY3RfZ3JpZHZpZXdzXCJcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge31cbiAgICAgICAgICAgICAgICBvd25lcjogdXNlcklkXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGRvYy5zZXR0aW5nc1tsaXN0X3ZpZXdfaWRdID0ge31cbiAgICAgICAgICAgIGRvYy5zZXR0aW5nc1tsaXN0X3ZpZXdfaWRdLmNvbHVtbl93aWR0aCA9IGNvbHVtbl93aWR0aFxuICAgICAgICAgICAgZG9jLnNldHRpbmdzW2xpc3Rfdmlld19pZF0uc29ydCA9IHNvcnRcblxuICAgICAgICAgICAgQ3JlYXRvci5Db2xsZWN0aW9ucy5zZXR0aW5ncy5pbnNlcnQoZG9jKSIsIlxuLypcbiAgICB0eXBlOiBcInVzZXJcIlxuICAgIG9iamVjdF9uYW1lOiBcIm9iamVjdF9saXN0dmlld3NcIlxuICAgIHJlY29yZF9pZDogXCJ7b2JqZWN0X25hbWV9LHtsaXN0dmlld19pZH1cIlxuICAgIHNldHRpbmdzOlxuICAgICAgICBjb2x1bW5fd2lkdGg6IHsgZmllbGRfYTogMTAwLCBmaWVsZF8yOiAxNTAgfVxuICAgICAgICBzb3J0OiBbW1wiZmllbGRfYVwiLCBcImRlc2NcIl1dXG4gICAgb3duZXI6IHt1c2VySWR9XG4gKi9cbk1ldGVvci5tZXRob2RzKHtcbiAgXCJ0YWJ1bGFyX3NvcnRfc2V0dGluZ3NcIjogZnVuY3Rpb24ob2JqZWN0X25hbWUsIGxpc3Rfdmlld19pZCwgc29ydCkge1xuICAgIHZhciBkb2MsIG9iaiwgc2V0dGluZywgdXNlcklkO1xuICAgIHVzZXJJZCA9IHRoaXMudXNlcklkO1xuICAgIHNldHRpbmcgPSBDcmVhdG9yLkNvbGxlY3Rpb25zLnNldHRpbmdzLmZpbmRPbmUoe1xuICAgICAgb2JqZWN0X25hbWU6IG9iamVjdF9uYW1lLFxuICAgICAgcmVjb3JkX2lkOiBcIm9iamVjdF9saXN0dmlld3NcIixcbiAgICAgIG93bmVyOiB1c2VySWRcbiAgICB9KTtcbiAgICBpZiAoc2V0dGluZykge1xuICAgICAgcmV0dXJuIENyZWF0b3IuQ29sbGVjdGlvbnMuc2V0dGluZ3MudXBkYXRlKHtcbiAgICAgICAgX2lkOiBzZXR0aW5nLl9pZFxuICAgICAgfSwge1xuICAgICAgICAkc2V0OiAoXG4gICAgICAgICAgb2JqID0ge30sXG4gICAgICAgICAgb2JqW1wic2V0dGluZ3MuXCIgKyBsaXN0X3ZpZXdfaWQgKyBcIi5zb3J0XCJdID0gc29ydCxcbiAgICAgICAgICBvYmpcbiAgICAgICAgKVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRvYyA9IHtcbiAgICAgICAgdHlwZTogXCJ1c2VyXCIsXG4gICAgICAgIG9iamVjdF9uYW1lOiBvYmplY3RfbmFtZSxcbiAgICAgICAgcmVjb3JkX2lkOiBcIm9iamVjdF9saXN0dmlld3NcIixcbiAgICAgICAgc2V0dGluZ3M6IHt9LFxuICAgICAgICBvd25lcjogdXNlcklkXG4gICAgICB9O1xuICAgICAgZG9jLnNldHRpbmdzW2xpc3Rfdmlld19pZF0gPSB7fTtcbiAgICAgIGRvYy5zZXR0aW5nc1tsaXN0X3ZpZXdfaWRdLnNvcnQgPSBzb3J0O1xuICAgICAgcmV0dXJuIENyZWF0b3IuQ29sbGVjdGlvbnMuc2V0dGluZ3MuaW5zZXJ0KGRvYyk7XG4gICAgfVxuICB9LFxuICBcInRhYnVsYXJfY29sdW1uX3dpZHRoX3NldHRpbmdzXCI6IGZ1bmN0aW9uKG9iamVjdF9uYW1lLCBsaXN0X3ZpZXdfaWQsIGNvbHVtbl93aWR0aCkge1xuICAgIHZhciBkb2MsIG9iaiwgc2V0dGluZywgdXNlcklkO1xuICAgIHVzZXJJZCA9IHRoaXMudXNlcklkO1xuICAgIHNldHRpbmcgPSBDcmVhdG9yLkNvbGxlY3Rpb25zLnNldHRpbmdzLmZpbmRPbmUoe1xuICAgICAgb2JqZWN0X25hbWU6IG9iamVjdF9uYW1lLFxuICAgICAgcmVjb3JkX2lkOiBcIm9iamVjdF9saXN0dmlld3NcIixcbiAgICAgIG93bmVyOiB1c2VySWRcbiAgICB9KTtcbiAgICBpZiAoc2V0dGluZykge1xuICAgICAgcmV0dXJuIENyZWF0b3IuQ29sbGVjdGlvbnMuc2V0dGluZ3MudXBkYXRlKHtcbiAgICAgICAgX2lkOiBzZXR0aW5nLl9pZFxuICAgICAgfSwge1xuICAgICAgICAkc2V0OiAoXG4gICAgICAgICAgb2JqID0ge30sXG4gICAgICAgICAgb2JqW1wic2V0dGluZ3MuXCIgKyBsaXN0X3ZpZXdfaWQgKyBcIi5jb2x1bW5fd2lkdGhcIl0gPSBjb2x1bW5fd2lkdGgsXG4gICAgICAgICAgb2JqXG4gICAgICAgIClcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBkb2MgPSB7XG4gICAgICAgIHR5cGU6IFwidXNlclwiLFxuICAgICAgICBvYmplY3RfbmFtZTogb2JqZWN0X25hbWUsXG4gICAgICAgIHJlY29yZF9pZDogXCJvYmplY3RfbGlzdHZpZXdzXCIsXG4gICAgICAgIHNldHRpbmdzOiB7fSxcbiAgICAgICAgb3duZXI6IHVzZXJJZFxuICAgICAgfTtcbiAgICAgIGRvYy5zZXR0aW5nc1tsaXN0X3ZpZXdfaWRdID0ge307XG4gICAgICBkb2Muc2V0dGluZ3NbbGlzdF92aWV3X2lkXS5jb2x1bW5fd2lkdGggPSBjb2x1bW5fd2lkdGg7XG4gICAgICByZXR1cm4gQ3JlYXRvci5Db2xsZWN0aW9ucy5zZXR0aW5ncy5pbnNlcnQoZG9jKTtcbiAgICB9XG4gIH0sXG4gIFwiZ3JpZF9zZXR0aW5nc1wiOiBmdW5jdGlvbihvYmplY3RfbmFtZSwgbGlzdF92aWV3X2lkLCBjb2x1bW5fd2lkdGgsIHNvcnQpIHtcbiAgICB2YXIgZG9jLCBvYmosIG9iajEsIHJlZiwgcmVmMSwgc2V0dGluZywgdXNlcklkO1xuICAgIHVzZXJJZCA9IHRoaXMudXNlcklkO1xuICAgIHNldHRpbmcgPSBDcmVhdG9yLkNvbGxlY3Rpb25zLnNldHRpbmdzLmZpbmRPbmUoe1xuICAgICAgb2JqZWN0X25hbWU6IG9iamVjdF9uYW1lLFxuICAgICAgcmVjb3JkX2lkOiBcIm9iamVjdF9ncmlkdmlld3NcIixcbiAgICAgIG93bmVyOiB1c2VySWRcbiAgICB9KTtcbiAgICBpZiAoc2V0dGluZykge1xuICAgICAgY29sdW1uX3dpZHRoLl9pZF9hY3Rpb25zID0gKChyZWYgPSBzZXR0aW5nLnNldHRpbmdzW1wiXCIgKyBsaXN0X3ZpZXdfaWRdKSAhPSBudWxsID8gKHJlZjEgPSByZWYuY29sdW1uX3dpZHRoKSAhPSBudWxsID8gcmVmMS5faWRfYWN0aW9ucyA6IHZvaWQgMCA6IHZvaWQgMCkgPT09IDQ2ID8gNDcgOiA0NjtcbiAgICAgIGlmIChzb3J0KSB7XG4gICAgICAgIHJldHVybiBDcmVhdG9yLkNvbGxlY3Rpb25zLnNldHRpbmdzLnVwZGF0ZSh7XG4gICAgICAgICAgX2lkOiBzZXR0aW5nLl9pZFxuICAgICAgICB9LCB7XG4gICAgICAgICAgJHNldDogKFxuICAgICAgICAgICAgb2JqID0ge30sXG4gICAgICAgICAgICBvYmpbXCJzZXR0aW5ncy5cIiArIGxpc3Rfdmlld19pZCArIFwiLnNvcnRcIl0gPSBzb3J0LFxuICAgICAgICAgICAgb2JqW1wic2V0dGluZ3MuXCIgKyBsaXN0X3ZpZXdfaWQgKyBcIi5jb2x1bW5fd2lkdGhcIl0gPSBjb2x1bW5fd2lkdGgsXG4gICAgICAgICAgICBvYmpcbiAgICAgICAgICApXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIENyZWF0b3IuQ29sbGVjdGlvbnMuc2V0dGluZ3MudXBkYXRlKHtcbiAgICAgICAgICBfaWQ6IHNldHRpbmcuX2lkXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAkc2V0OiAoXG4gICAgICAgICAgICBvYmoxID0ge30sXG4gICAgICAgICAgICBvYmoxW1wic2V0dGluZ3MuXCIgKyBsaXN0X3ZpZXdfaWQgKyBcIi5jb2x1bW5fd2lkdGhcIl0gPSBjb2x1bW5fd2lkdGgsXG4gICAgICAgICAgICBvYmoxXG4gICAgICAgICAgKVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZG9jID0ge1xuICAgICAgICB0eXBlOiBcInVzZXJcIixcbiAgICAgICAgb2JqZWN0X25hbWU6IG9iamVjdF9uYW1lLFxuICAgICAgICByZWNvcmRfaWQ6IFwib2JqZWN0X2dyaWR2aWV3c1wiLFxuICAgICAgICBzZXR0aW5nczoge30sXG4gICAgICAgIG93bmVyOiB1c2VySWRcbiAgICAgIH07XG4gICAgICBkb2Muc2V0dGluZ3NbbGlzdF92aWV3X2lkXSA9IHt9O1xuICAgICAgZG9jLnNldHRpbmdzW2xpc3Rfdmlld19pZF0uY29sdW1uX3dpZHRoID0gY29sdW1uX3dpZHRoO1xuICAgICAgZG9jLnNldHRpbmdzW2xpc3Rfdmlld19pZF0uc29ydCA9IHNvcnQ7XG4gICAgICByZXR1cm4gQ3JlYXRvci5Db2xsZWN0aW9ucy5zZXR0aW5ncy5pbnNlcnQoZG9jKTtcbiAgICB9XG4gIH1cbn0pO1xuIiwieG1sMmpzID0gcmVxdWlyZSAneG1sMmpzJ1xuZnMgPSByZXF1aXJlICdmcydcbnBhdGggPSByZXF1aXJlICdwYXRoJ1xubWtkaXJwID0gcmVxdWlyZSAnbWtkaXJwJ1xuXG5sb2dnZXIgPSBuZXcgTG9nZ2VyICdFeHBvcnRfVE9fWE1MJ1xuXG5fd3JpdGVYbWxGaWxlID0gKGpzb25PYmosb2JqTmFtZSkgLT5cblx0IyDovax4bWxcblx0YnVpbGRlciA9IG5ldyB4bWwyanMuQnVpbGRlcigpXG5cdHhtbCA9IGJ1aWxkZXIuYnVpbGRPYmplY3QganNvbk9ialxuXG5cdCMg6L2s5Li6YnVmZmVyXG5cdHN0cmVhbSA9IG5ldyBCdWZmZXIgeG1sXG5cblx0IyDmoLnmja7lvZPlpKnml7bpl7TnmoTlubTmnIjml6XkvZzkuLrlrZjlgqjot6/lvoRcblx0bm93ID0gbmV3IERhdGVcblx0eWVhciA9IG5vdy5nZXRGdWxsWWVhcigpXG5cdG1vbnRoID0gbm93LmdldE1vbnRoKCkgKyAxXG5cdGRheSA9IG5vdy5nZXREYXRlKClcblxuXHQjIOaWh+S7tui3r+W+hFxuXHRmaWxlUGF0aCA9IHBhdGguam9pbihfX21ldGVvcl9ib290c3RyYXBfXy5zZXJ2ZXJEaXIsJy4uLy4uLy4uL2V4cG9ydC8nICsgeWVhciArICcvJyArIG1vbnRoICsgJy8nICsgZGF5ICsgJy8nICsgb2JqTmFtZSApXG5cdGZpbGVOYW1lID0ganNvbk9iaj8uX2lkICsgXCIueG1sXCJcblx0ZmlsZUFkZHJlc3MgPSBwYXRoLmpvaW4gZmlsZVBhdGgsIGZpbGVOYW1lXG5cblx0aWYgIWZzLmV4aXN0c1N5bmMgZmlsZVBhdGhcblx0XHRta2RpcnAuc3luYyBmaWxlUGF0aFxuXG5cdCMg5YaZ5YWl5paH5Lu2XG5cdGZzLndyaXRlRmlsZSBmaWxlQWRkcmVzcywgc3RyZWFtLCAoZXJyKSAtPlxuXHRcdGlmIGVyclxuXHRcdFx0bG9nZ2VyLmVycm9yIFwiI3tqc29uT2JqLl9pZH3lhpnlhaV4bWzmlofku7blpLHotKVcIixlcnJcblx0XG5cdHJldHVybiBmaWxlUGF0aFxuXG5cbiMg5pW055CGRmllbGRz55qEanNvbuaVsOaNrlxuX21peEZpZWxkc0RhdGEgPSAob2JqLG9iak5hbWUpIC0+XG5cdCMg5Yid5aeL5YyW5a+56LGh5pWw5o2uXG5cdGpzb25PYmogPSB7fVxuXHQjIOiOt+WPlmZpZWxkc1xuXHRvYmpGaWVsZHMgPSBDcmVhdG9yPy5nZXRPYmplY3Qob2JqTmFtZSk/LmZpZWxkc1xuXG5cdG1peERlZmF1bHQgPSAoZmllbGRfbmFtZSktPlxuXHRcdGpzb25PYmpbZmllbGRfbmFtZV0gPSBvYmpbZmllbGRfbmFtZV0gfHwgXCJcIlxuXG5cdG1peERhdGUgPSAoZmllbGRfbmFtZSx0eXBlKS0+XG5cdFx0ZGF0ZSA9IG9ialtmaWVsZF9uYW1lXVxuXHRcdGlmIHR5cGUgPT0gXCJkYXRlXCJcblx0XHRcdGZvcm1hdCA9IFwiWVlZWS1NTS1ERFwiXG5cdFx0ZWxzZVxuXHRcdFx0Zm9ybWF0ID0gXCJZWVlZLU1NLUREIEhIOm1tOnNzXCJcblx0XHRpZiBkYXRlPyBhbmQgZm9ybWF0P1xuXHRcdFx0ZGF0ZVN0ciA9IG1vbWVudChkYXRlKS5mb3JtYXQoZm9ybWF0KVxuXHRcdGpzb25PYmpbZmllbGRfbmFtZV0gPSBkYXRlU3RyIHx8IFwiXCJcblxuXHRtaXhCb29sID0gKGZpZWxkX25hbWUpLT5cblx0XHRpZiBvYmpbZmllbGRfbmFtZV0gPT0gdHJ1ZVxuXHRcdFx0anNvbk9ialtmaWVsZF9uYW1lXSA9IFwi5pivXCJcblx0XHRlbHNlIGlmIG9ialtmaWVsZF9uYW1lXSA9PSBmYWxzZVxuXHRcdFx0anNvbk9ialtmaWVsZF9uYW1lXSA9IFwi5ZCmXCJcblx0XHRlbHNlXG5cdFx0XHRqc29uT2JqW2ZpZWxkX25hbWVdID0gXCJcIlxuXG5cdCMg5b6q546v5q+P5LiqZmllbGRzLOW5tuWIpOaWreWPluWAvFxuXHRfLmVhY2ggb2JqRmllbGRzLCAoZmllbGQsIGZpZWxkX25hbWUpLT5cblx0XHRzd2l0Y2ggZmllbGQ/LnR5cGVcblx0XHRcdHdoZW4gXCJkYXRlXCIsXCJkYXRldGltZVwiIHRoZW4gbWl4RGF0ZSBmaWVsZF9uYW1lLGZpZWxkLnR5cGVcblx0XHRcdHdoZW4gXCJib29sZWFuXCIgdGhlbiBtaXhCb29sIGZpZWxkX25hbWVcblx0XHRcdGVsc2UgbWl4RGVmYXVsdCBmaWVsZF9uYW1lXG5cblx0cmV0dXJuIGpzb25PYmpcblxuIyDojrflj5blrZDooajmlbTnkIbmlbDmja5cbl9taXhSZWxhdGVkRGF0YSA9IChvYmosb2JqTmFtZSkgLT5cblx0IyDliJ3lp4vljJblr7nosaHmlbDmja5cblx0cmVsYXRlZF9vYmplY3RzID0ge31cblxuXHQjIOiOt+WPluebuOWFs+ihqFxuXHRyZWxhdGVkT2JqTmFtZXMgPSBDcmVhdG9yPy5nZXRBbGxSZWxhdGVkT2JqZWN0cyBvYmpOYW1lXG5cblx0IyDlvqrnjq/nm7jlhbPooahcblx0cmVsYXRlZE9iak5hbWVzLmZvckVhY2ggKHJlbGF0ZWRPYmpOYW1lKSAtPlxuXHRcdCMg5q+P5Liq6KGo5a6a5LmJ5LiA5Liq5a+56LGh5pWw57uEXG5cdFx0cmVsYXRlZFRhYmxlRGF0YSA9IFtdXG5cblx0XHQjICrorr7nva7lhbPogZTmkJzntKLmn6Xor6LnmoTlrZfmrrVcblx0XHQjIOmZhOS7tueahOWFs+iBlOaQnOe0ouWtl+auteaYr+Wumuatu+eahFxuXHRcdGlmIHJlbGF0ZWRPYmpOYW1lID09IFwiY21zX2ZpbGVzXCJcblx0XHRcdHJlbGF0ZWRfZmllbGRfbmFtZSA9IFwicGFyZW50Lmlkc1wiXG5cdFx0ZWxzZVxuXHRcdFx0IyDojrflj5ZmaWVsZHNcblx0XHRcdGZpZWxkcyA9IENyZWF0b3I/Lk9iamVjdHNbcmVsYXRlZE9iak5hbWVdPy5maWVsZHNcblx0XHRcdCMg5b6q546v5q+P5LiqZmllbGQs5om+5Ye6cmVmZXJlbmNlX3Rv55qE5YWz6IGU5a2X5q61XG5cdFx0XHRyZWxhdGVkX2ZpZWxkX25hbWUgPSBcIlwiXG5cdFx0XHRfLmVhY2ggZmllbGRzLCAoZmllbGQsIGZpZWxkX25hbWUpLT5cblx0XHRcdFx0aWYgZmllbGQ/LnJlZmVyZW5jZV90byA9PSBvYmpOYW1lXG5cdFx0XHRcdFx0cmVsYXRlZF9maWVsZF9uYW1lID0gZmllbGRfbmFtZVxuXG5cdFx0IyDmoLnmja7mib7lh7rnmoTlhbPogZTlrZfmrrXvvIzmn6XlrZDooajmlbDmja5cblx0XHRpZiByZWxhdGVkX2ZpZWxkX25hbWVcblx0XHRcdHJlbGF0ZWRDb2xsZWN0aW9uID0gQ3JlYXRvci5nZXRDb2xsZWN0aW9uKHJlbGF0ZWRPYmpOYW1lKVxuXHRcdFx0IyDojrflj5bliLDmiYDmnInnmoTmlbDmja5cblx0XHRcdHJlbGF0ZWRSZWNvcmRMaXN0ID0gcmVsYXRlZENvbGxlY3Rpb24uZmluZCh7XCIje3JlbGF0ZWRfZmllbGRfbmFtZX1cIjpvYmouX2lkfSkuZmV0Y2goKVxuXHRcdFx0IyDlvqrnjq/mr4/kuIDmnaHmlbDmja5cblx0XHRcdHJlbGF0ZWRSZWNvcmRMaXN0LmZvckVhY2ggKHJlbGF0ZWRPYmopLT5cblx0XHRcdFx0IyDmlbTlkIhmaWVsZHPmlbDmja5cblx0XHRcdFx0ZmllbGRzRGF0YSA9IF9taXhGaWVsZHNEYXRhIHJlbGF0ZWRPYmoscmVsYXRlZE9iak5hbWVcblx0XHRcdFx0IyDmiorkuIDmnaHorrDlvZXmj5LlhaXliLDlr7nosaHmlbDnu4TkuK1cblx0XHRcdFx0cmVsYXRlZFRhYmxlRGF0YS5wdXNoIGZpZWxkc0RhdGFcblxuXHRcdCMg5oqK5LiA5Liq5a2Q6KGo55qE5omA5pyJ5pWw5o2u5o+S5YWl5YiwcmVsYXRlZF9vYmplY3Rz5Lit77yM5YaN5b6q546v5LiL5LiA5LiqXG5cdFx0cmVsYXRlZF9vYmplY3RzW3JlbGF0ZWRPYmpOYW1lXSA9IHJlbGF0ZWRUYWJsZURhdGFcblxuXHRyZXR1cm4gcmVsYXRlZF9vYmplY3RzXG5cbiMgQ3JlYXRvci5FeHBvcnQyeG1sKClcbkNyZWF0b3IuRXhwb3J0MnhtbCA9IChvYmpOYW1lLCByZWNvcmRMaXN0KSAtPlxuXHRsb2dnZXIuaW5mbyBcIlJ1biBDcmVhdG9yLkV4cG9ydDJ4bWxcIlxuXG5cdGNvbnNvbGUudGltZSBcIkNyZWF0b3IuRXhwb3J0MnhtbFwiXG5cblx0IyDmtYvor5XmlbDmja5cblx0IyBvYmpOYW1lID0gXCJhcmNoaXZlX3JlY29yZHNcIlxuXG5cdCMg5p+l5om+5a+56LGh5pWw5o2uXG5cdGNvbGxlY3Rpb24gPSBDcmVhdG9yLmdldENvbGxlY3Rpb24ob2JqTmFtZSlcblx0IyDmtYvor5XmlbDmja5cblx0cmVjb3JkTGlzdCA9IGNvbGxlY3Rpb24uZmluZCh7fSkuZmV0Y2goKVxuXG5cdHJlY29yZExpc3QuZm9yRWFjaCAocmVjb3JkT2JqKS0+XG5cdFx0anNvbk9iaiA9IHt9XG5cdFx0anNvbk9iai5faWQgPSByZWNvcmRPYmouX2lkXG5cblx0XHQjIOaVtOeQhuS4u+ihqOeahEZpZWxkc+aVsOaNrlxuXHRcdGZpZWxkc0RhdGEgPSBfbWl4RmllbGRzRGF0YSByZWNvcmRPYmosb2JqTmFtZVxuXHRcdGpzb25PYmpbb2JqTmFtZV0gPSBmaWVsZHNEYXRhXG5cblx0XHQjIOaVtOeQhuebuOWFs+ihqOaVsOaNrlxuXHRcdHJlbGF0ZWRfb2JqZWN0cyA9IF9taXhSZWxhdGVkRGF0YSByZWNvcmRPYmosb2JqTmFtZVxuXG5cdFx0anNvbk9ialtcInJlbGF0ZWRfb2JqZWN0c1wiXSA9IHJlbGF0ZWRfb2JqZWN0c1xuXG5cdFx0IyDovazkuLp4bWzkv53lrZjmlofku7Zcblx0XHRmaWxlUGF0aCA9IF93cml0ZVhtbEZpbGUganNvbk9iaixvYmpOYW1lXG5cblx0Y29uc29sZS50aW1lRW5kIFwiQ3JlYXRvci5FeHBvcnQyeG1sXCJcblx0cmV0dXJuIGZpbGVQYXRoIiwidmFyIF9taXhGaWVsZHNEYXRhLCBfbWl4UmVsYXRlZERhdGEsIF93cml0ZVhtbEZpbGUsIGZzLCBsb2dnZXIsIG1rZGlycCwgcGF0aCwgeG1sMmpzO1xuXG54bWwyanMgPSByZXF1aXJlKCd4bWwyanMnKTtcblxuZnMgPSByZXF1aXJlKCdmcycpO1xuXG5wYXRoID0gcmVxdWlyZSgncGF0aCcpO1xuXG5ta2RpcnAgPSByZXF1aXJlKCdta2RpcnAnKTtcblxubG9nZ2VyID0gbmV3IExvZ2dlcignRXhwb3J0X1RPX1hNTCcpO1xuXG5fd3JpdGVYbWxGaWxlID0gZnVuY3Rpb24oanNvbk9iaiwgb2JqTmFtZSkge1xuICB2YXIgYnVpbGRlciwgZGF5LCBmaWxlQWRkcmVzcywgZmlsZU5hbWUsIGZpbGVQYXRoLCBtb250aCwgbm93LCBzdHJlYW0sIHhtbCwgeWVhcjtcbiAgYnVpbGRlciA9IG5ldyB4bWwyanMuQnVpbGRlcigpO1xuICB4bWwgPSBidWlsZGVyLmJ1aWxkT2JqZWN0KGpzb25PYmopO1xuICBzdHJlYW0gPSBuZXcgQnVmZmVyKHhtbCk7XG4gIG5vdyA9IG5ldyBEYXRlO1xuICB5ZWFyID0gbm93LmdldEZ1bGxZZWFyKCk7XG4gIG1vbnRoID0gbm93LmdldE1vbnRoKCkgKyAxO1xuICBkYXkgPSBub3cuZ2V0RGF0ZSgpO1xuICBmaWxlUGF0aCA9IHBhdGguam9pbihfX21ldGVvcl9ib290c3RyYXBfXy5zZXJ2ZXJEaXIsICcuLi8uLi8uLi9leHBvcnQvJyArIHllYXIgKyAnLycgKyBtb250aCArICcvJyArIGRheSArICcvJyArIG9iak5hbWUpO1xuICBmaWxlTmFtZSA9IChqc29uT2JqICE9IG51bGwgPyBqc29uT2JqLl9pZCA6IHZvaWQgMCkgKyBcIi54bWxcIjtcbiAgZmlsZUFkZHJlc3MgPSBwYXRoLmpvaW4oZmlsZVBhdGgsIGZpbGVOYW1lKTtcbiAgaWYgKCFmcy5leGlzdHNTeW5jKGZpbGVQYXRoKSkge1xuICAgIG1rZGlycC5zeW5jKGZpbGVQYXRoKTtcbiAgfVxuICBmcy53cml0ZUZpbGUoZmlsZUFkZHJlc3MsIHN0cmVhbSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgaWYgKGVycikge1xuICAgICAgcmV0dXJuIGxvZ2dlci5lcnJvcihqc29uT2JqLl9pZCArIFwi5YaZ5YWleG1s5paH5Lu25aSx6LSlXCIsIGVycik7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGZpbGVQYXRoO1xufTtcblxuX21peEZpZWxkc0RhdGEgPSBmdW5jdGlvbihvYmosIG9iak5hbWUpIHtcbiAgdmFyIGpzb25PYmosIG1peEJvb2wsIG1peERhdGUsIG1peERlZmF1bHQsIG9iakZpZWxkcywgcmVmO1xuICBqc29uT2JqID0ge307XG4gIG9iakZpZWxkcyA9IHR5cGVvZiBDcmVhdG9yICE9PSBcInVuZGVmaW5lZFwiICYmIENyZWF0b3IgIT09IG51bGwgPyAocmVmID0gQ3JlYXRvci5nZXRPYmplY3Qob2JqTmFtZSkpICE9IG51bGwgPyByZWYuZmllbGRzIDogdm9pZCAwIDogdm9pZCAwO1xuICBtaXhEZWZhdWx0ID0gZnVuY3Rpb24oZmllbGRfbmFtZSkge1xuICAgIHJldHVybiBqc29uT2JqW2ZpZWxkX25hbWVdID0gb2JqW2ZpZWxkX25hbWVdIHx8IFwiXCI7XG4gIH07XG4gIG1peERhdGUgPSBmdW5jdGlvbihmaWVsZF9uYW1lLCB0eXBlKSB7XG4gICAgdmFyIGRhdGUsIGRhdGVTdHIsIGZvcm1hdDtcbiAgICBkYXRlID0gb2JqW2ZpZWxkX25hbWVdO1xuICAgIGlmICh0eXBlID09PSBcImRhdGVcIikge1xuICAgICAgZm9ybWF0ID0gXCJZWVlZLU1NLUREXCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvcm1hdCA9IFwiWVlZWS1NTS1ERCBISDptbTpzc1wiO1xuICAgIH1cbiAgICBpZiAoKGRhdGUgIT0gbnVsbCkgJiYgKGZvcm1hdCAhPSBudWxsKSkge1xuICAgICAgZGF0ZVN0ciA9IG1vbWVudChkYXRlKS5mb3JtYXQoZm9ybWF0KTtcbiAgICB9XG4gICAgcmV0dXJuIGpzb25PYmpbZmllbGRfbmFtZV0gPSBkYXRlU3RyIHx8IFwiXCI7XG4gIH07XG4gIG1peEJvb2wgPSBmdW5jdGlvbihmaWVsZF9uYW1lKSB7XG4gICAgaWYgKG9ialtmaWVsZF9uYW1lXSA9PT0gdHJ1ZSkge1xuICAgICAgcmV0dXJuIGpzb25PYmpbZmllbGRfbmFtZV0gPSBcIuaYr1wiO1xuICAgIH0gZWxzZSBpZiAob2JqW2ZpZWxkX25hbWVdID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuIGpzb25PYmpbZmllbGRfbmFtZV0gPSBcIuWQplwiO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4ganNvbk9ialtmaWVsZF9uYW1lXSA9IFwiXCI7XG4gICAgfVxuICB9O1xuICBfLmVhY2gob2JqRmllbGRzLCBmdW5jdGlvbihmaWVsZCwgZmllbGRfbmFtZSkge1xuICAgIHN3aXRjaCAoZmllbGQgIT0gbnVsbCA/IGZpZWxkLnR5cGUgOiB2b2lkIDApIHtcbiAgICAgIGNhc2UgXCJkYXRlXCI6XG4gICAgICBjYXNlIFwiZGF0ZXRpbWVcIjpcbiAgICAgICAgcmV0dXJuIG1peERhdGUoZmllbGRfbmFtZSwgZmllbGQudHlwZSk7XG4gICAgICBjYXNlIFwiYm9vbGVhblwiOlxuICAgICAgICByZXR1cm4gbWl4Qm9vbChmaWVsZF9uYW1lKTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBtaXhEZWZhdWx0KGZpZWxkX25hbWUpO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBqc29uT2JqO1xufTtcblxuX21peFJlbGF0ZWREYXRhID0gZnVuY3Rpb24ob2JqLCBvYmpOYW1lKSB7XG4gIHZhciByZWxhdGVkT2JqTmFtZXMsIHJlbGF0ZWRfb2JqZWN0cztcbiAgcmVsYXRlZF9vYmplY3RzID0ge307XG4gIHJlbGF0ZWRPYmpOYW1lcyA9IHR5cGVvZiBDcmVhdG9yICE9PSBcInVuZGVmaW5lZFwiICYmIENyZWF0b3IgIT09IG51bGwgPyBDcmVhdG9yLmdldEFsbFJlbGF0ZWRPYmplY3RzKG9iak5hbWUpIDogdm9pZCAwO1xuICByZWxhdGVkT2JqTmFtZXMuZm9yRWFjaChmdW5jdGlvbihyZWxhdGVkT2JqTmFtZSkge1xuICAgIHZhciBmaWVsZHMsIG9iajEsIHJlZiwgcmVsYXRlZENvbGxlY3Rpb24sIHJlbGF0ZWRSZWNvcmRMaXN0LCByZWxhdGVkVGFibGVEYXRhLCByZWxhdGVkX2ZpZWxkX25hbWU7XG4gICAgcmVsYXRlZFRhYmxlRGF0YSA9IFtdO1xuICAgIGlmIChyZWxhdGVkT2JqTmFtZSA9PT0gXCJjbXNfZmlsZXNcIikge1xuICAgICAgcmVsYXRlZF9maWVsZF9uYW1lID0gXCJwYXJlbnQuaWRzXCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZpZWxkcyA9IHR5cGVvZiBDcmVhdG9yICE9PSBcInVuZGVmaW5lZFwiICYmIENyZWF0b3IgIT09IG51bGwgPyAocmVmID0gQ3JlYXRvci5PYmplY3RzW3JlbGF0ZWRPYmpOYW1lXSkgIT0gbnVsbCA/IHJlZi5maWVsZHMgOiB2b2lkIDAgOiB2b2lkIDA7XG4gICAgICByZWxhdGVkX2ZpZWxkX25hbWUgPSBcIlwiO1xuICAgICAgXy5lYWNoKGZpZWxkcywgZnVuY3Rpb24oZmllbGQsIGZpZWxkX25hbWUpIHtcbiAgICAgICAgaWYgKChmaWVsZCAhPSBudWxsID8gZmllbGQucmVmZXJlbmNlX3RvIDogdm9pZCAwKSA9PT0gb2JqTmFtZSkge1xuICAgICAgICAgIHJldHVybiByZWxhdGVkX2ZpZWxkX25hbWUgPSBmaWVsZF9uYW1lO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKHJlbGF0ZWRfZmllbGRfbmFtZSkge1xuICAgICAgcmVsYXRlZENvbGxlY3Rpb24gPSBDcmVhdG9yLmdldENvbGxlY3Rpb24ocmVsYXRlZE9iak5hbWUpO1xuICAgICAgcmVsYXRlZFJlY29yZExpc3QgPSByZWxhdGVkQ29sbGVjdGlvbi5maW5kKChcbiAgICAgICAgb2JqMSA9IHt9LFxuICAgICAgICBvYmoxW1wiXCIgKyByZWxhdGVkX2ZpZWxkX25hbWVdID0gb2JqLl9pZCxcbiAgICAgICAgb2JqMVxuICAgICAgKSkuZmV0Y2goKTtcbiAgICAgIHJlbGF0ZWRSZWNvcmRMaXN0LmZvckVhY2goZnVuY3Rpb24ocmVsYXRlZE9iaikge1xuICAgICAgICB2YXIgZmllbGRzRGF0YTtcbiAgICAgICAgZmllbGRzRGF0YSA9IF9taXhGaWVsZHNEYXRhKHJlbGF0ZWRPYmosIHJlbGF0ZWRPYmpOYW1lKTtcbiAgICAgICAgcmV0dXJuIHJlbGF0ZWRUYWJsZURhdGEucHVzaChmaWVsZHNEYXRhKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gcmVsYXRlZF9vYmplY3RzW3JlbGF0ZWRPYmpOYW1lXSA9IHJlbGF0ZWRUYWJsZURhdGE7XG4gIH0pO1xuICByZXR1cm4gcmVsYXRlZF9vYmplY3RzO1xufTtcblxuQ3JlYXRvci5FeHBvcnQyeG1sID0gZnVuY3Rpb24ob2JqTmFtZSwgcmVjb3JkTGlzdCkge1xuICB2YXIgY29sbGVjdGlvbjtcbiAgbG9nZ2VyLmluZm8oXCJSdW4gQ3JlYXRvci5FeHBvcnQyeG1sXCIpO1xuICBjb25zb2xlLnRpbWUoXCJDcmVhdG9yLkV4cG9ydDJ4bWxcIik7XG4gIGNvbGxlY3Rpb24gPSBDcmVhdG9yLmdldENvbGxlY3Rpb24ob2JqTmFtZSk7XG4gIHJlY29yZExpc3QgPSBjb2xsZWN0aW9uLmZpbmQoe30pLmZldGNoKCk7XG4gIHJlY29yZExpc3QuZm9yRWFjaChmdW5jdGlvbihyZWNvcmRPYmopIHtcbiAgICB2YXIgZmllbGRzRGF0YSwgZmlsZVBhdGgsIGpzb25PYmosIHJlbGF0ZWRfb2JqZWN0cztcbiAgICBqc29uT2JqID0ge307XG4gICAganNvbk9iai5faWQgPSByZWNvcmRPYmouX2lkO1xuICAgIGZpZWxkc0RhdGEgPSBfbWl4RmllbGRzRGF0YShyZWNvcmRPYmosIG9iak5hbWUpO1xuICAgIGpzb25PYmpbb2JqTmFtZV0gPSBmaWVsZHNEYXRhO1xuICAgIHJlbGF0ZWRfb2JqZWN0cyA9IF9taXhSZWxhdGVkRGF0YShyZWNvcmRPYmosIG9iak5hbWUpO1xuICAgIGpzb25PYmpbXCJyZWxhdGVkX29iamVjdHNcIl0gPSByZWxhdGVkX29iamVjdHM7XG4gICAgcmV0dXJuIGZpbGVQYXRoID0gX3dyaXRlWG1sRmlsZShqc29uT2JqLCBvYmpOYW1lKTtcbiAgfSk7XG4gIGNvbnNvbGUudGltZUVuZChcIkNyZWF0b3IuRXhwb3J0MnhtbFwiKTtcbiAgcmV0dXJuIGZpbGVQYXRoO1xufTtcbiIsIk1ldGVvci5tZXRob2RzIFxuXHRyZWxhdGVkX29iamVjdHNfcmVjb3JkczogKG9iamVjdF9uYW1lLCByZWxhdGVkX29iamVjdF9uYW1lLCByZWxhdGVkX2ZpZWxkX25hbWUsIHJlY29yZF9pZCwgc3BhY2VJZCktPlxuXHRcdHVzZXJJZCA9IHRoaXMudXNlcklkXG5cdFx0aWYgcmVsYXRlZF9vYmplY3RfbmFtZSA9PSBcImNmcy5maWxlcy5maWxlcmVjb3JkXCJcblx0XHRcdHNlbGVjdG9yID0ge1wibWV0YWRhdGEuc3BhY2VcIjogc3BhY2VJZH1cblx0XHRlbHNlXG5cdFx0XHRzZWxlY3RvciA9IHtzcGFjZTogc3BhY2VJZH1cblx0XHRcblx0XHRpZiByZWxhdGVkX29iamVjdF9uYW1lID09IFwiY21zX2ZpbGVzXCJcblx0XHRcdCMg6ZmE5Lu255qE5YWz6IGU5pCc57Si5p2h5Lu25piv5a6a5q2755qEXG5cdFx0XHRzZWxlY3RvcltcInBhcmVudC5vXCJdID0gb2JqZWN0X25hbWVcblx0XHRcdHNlbGVjdG9yW1wicGFyZW50Lmlkc1wiXSA9IFtyZWNvcmRfaWRdXG5cdFx0ZWxzZVxuXHRcdFx0c2VsZWN0b3JbcmVsYXRlZF9maWVsZF9uYW1lXSA9IHJlY29yZF9pZFxuXG5cdFx0cGVybWlzc2lvbnMgPSBDcmVhdG9yLmdldFBlcm1pc3Npb25zKHJlbGF0ZWRfb2JqZWN0X25hbWUsIHNwYWNlSWQsIHVzZXJJZClcblx0XHRpZiAhcGVybWlzc2lvbnMudmlld0FsbFJlY29yZHMgYW5kIHBlcm1pc3Npb25zLmFsbG93UmVhZFxuXHRcdFx0c2VsZWN0b3Iub3duZXIgPSB1c2VySWRcblx0XHRcblx0XHRyZWxhdGVkX3JlY29yZHMgPSBDcmVhdG9yLmdldENvbGxlY3Rpb24ocmVsYXRlZF9vYmplY3RfbmFtZSkuZmluZChzZWxlY3Rvcilcblx0XHRyZXR1cm4gcmVsYXRlZF9yZWNvcmRzLmNvdW50KCkiLCJNZXRlb3IubWV0aG9kcyh7XG4gIHJlbGF0ZWRfb2JqZWN0c19yZWNvcmRzOiBmdW5jdGlvbihvYmplY3RfbmFtZSwgcmVsYXRlZF9vYmplY3RfbmFtZSwgcmVsYXRlZF9maWVsZF9uYW1lLCByZWNvcmRfaWQsIHNwYWNlSWQpIHtcbiAgICB2YXIgcGVybWlzc2lvbnMsIHJlbGF0ZWRfcmVjb3Jkcywgc2VsZWN0b3IsIHVzZXJJZDtcbiAgICB1c2VySWQgPSB0aGlzLnVzZXJJZDtcbiAgICBpZiAocmVsYXRlZF9vYmplY3RfbmFtZSA9PT0gXCJjZnMuZmlsZXMuZmlsZXJlY29yZFwiKSB7XG4gICAgICBzZWxlY3RvciA9IHtcbiAgICAgICAgXCJtZXRhZGF0YS5zcGFjZVwiOiBzcGFjZUlkXG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBzZWxlY3RvciA9IHtcbiAgICAgICAgc3BhY2U6IHNwYWNlSWRcbiAgICAgIH07XG4gICAgfVxuICAgIGlmIChyZWxhdGVkX29iamVjdF9uYW1lID09PSBcImNtc19maWxlc1wiKSB7XG4gICAgICBzZWxlY3RvcltcInBhcmVudC5vXCJdID0gb2JqZWN0X25hbWU7XG4gICAgICBzZWxlY3RvcltcInBhcmVudC5pZHNcIl0gPSBbcmVjb3JkX2lkXTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2VsZWN0b3JbcmVsYXRlZF9maWVsZF9uYW1lXSA9IHJlY29yZF9pZDtcbiAgICB9XG4gICAgcGVybWlzc2lvbnMgPSBDcmVhdG9yLmdldFBlcm1pc3Npb25zKHJlbGF0ZWRfb2JqZWN0X25hbWUsIHNwYWNlSWQsIHVzZXJJZCk7XG4gICAgaWYgKCFwZXJtaXNzaW9ucy52aWV3QWxsUmVjb3JkcyAmJiBwZXJtaXNzaW9ucy5hbGxvd1JlYWQpIHtcbiAgICAgIHNlbGVjdG9yLm93bmVyID0gdXNlcklkO1xuICAgIH1cbiAgICByZWxhdGVkX3JlY29yZHMgPSBDcmVhdG9yLmdldENvbGxlY3Rpb24ocmVsYXRlZF9vYmplY3RfbmFtZSkuZmluZChzZWxlY3Rvcik7XG4gICAgcmV0dXJuIHJlbGF0ZWRfcmVjb3Jkcy5jb3VudCgpO1xuICB9XG59KTtcbiIsIk1ldGVvci5tZXRob2RzXG5cdGdldFBlbmRpbmdTcGFjZUluZm86IChpbnZpdGVySWQsIHNwYWNlSWQpLT5cblx0XHRpbnZpdGVyTmFtZSA9IGRiLnVzZXJzLmZpbmRPbmUoe19pZDogaW52aXRlcklkfSkubmFtZVxuXHRcdHNwYWNlTmFtZSA9IGRiLnNwYWNlcy5maW5kT25lKHtfaWQ6IHNwYWNlSWR9KS5uYW1lXG5cblx0XHRyZXR1cm4ge2ludml0ZXI6IGludml0ZXJOYW1lLCBzcGFjZTogc3BhY2VOYW1lfVxuXG5cdHJlZnVzZUpvaW5TcGFjZTogKF9pZCktPlxuXHRcdGRiLnNwYWNlX3VzZXJzLmRpcmVjdC51cGRhdGUoe19pZDogX2lkfSx7JHNldDoge2ludml0ZV9zdGF0ZTogXCJyZWZ1c2VkXCJ9fSlcblxuXHRhY2NlcHRKb2luU3BhY2U6IChfaWQpLT5cblx0XHRkYi5zcGFjZV91c2Vycy5kaXJlY3QudXBkYXRlKHtfaWQ6IF9pZH0seyRzZXQ6IHtpbnZpdGVfc3RhdGU6IFwiYWNjZXB0ZWRcIiwgdXNlcl9hY2NlcHRlZDogdHJ1ZX19KVxuXG4iLCJNZXRlb3IubWV0aG9kcyh7XG4gIGdldFBlbmRpbmdTcGFjZUluZm86IGZ1bmN0aW9uKGludml0ZXJJZCwgc3BhY2VJZCkge1xuICAgIHZhciBpbnZpdGVyTmFtZSwgc3BhY2VOYW1lO1xuICAgIGludml0ZXJOYW1lID0gZGIudXNlcnMuZmluZE9uZSh7XG4gICAgICBfaWQ6IGludml0ZXJJZFxuICAgIH0pLm5hbWU7XG4gICAgc3BhY2VOYW1lID0gZGIuc3BhY2VzLmZpbmRPbmUoe1xuICAgICAgX2lkOiBzcGFjZUlkXG4gICAgfSkubmFtZTtcbiAgICByZXR1cm4ge1xuICAgICAgaW52aXRlcjogaW52aXRlck5hbWUsXG4gICAgICBzcGFjZTogc3BhY2VOYW1lXG4gICAgfTtcbiAgfSxcbiAgcmVmdXNlSm9pblNwYWNlOiBmdW5jdGlvbihfaWQpIHtcbiAgICByZXR1cm4gZGIuc3BhY2VfdXNlcnMuZGlyZWN0LnVwZGF0ZSh7XG4gICAgICBfaWQ6IF9pZFxuICAgIH0sIHtcbiAgICAgICRzZXQ6IHtcbiAgICAgICAgaW52aXRlX3N0YXRlOiBcInJlZnVzZWRcIlxuICAgICAgfVxuICAgIH0pO1xuICB9LFxuICBhY2NlcHRKb2luU3BhY2U6IGZ1bmN0aW9uKF9pZCkge1xuICAgIHJldHVybiBkYi5zcGFjZV91c2Vycy5kaXJlY3QudXBkYXRlKHtcbiAgICAgIF9pZDogX2lkXG4gICAgfSwge1xuICAgICAgJHNldDoge1xuICAgICAgICBpbnZpdGVfc3RhdGU6IFwiYWNjZXB0ZWRcIixcbiAgICAgICAgdXNlcl9hY2NlcHRlZDogdHJ1ZVxuICAgICAgfVxuICAgIH0pO1xuICB9XG59KTtcbiIsIk1ldGVvci5wdWJsaXNoIFwiY3JlYXRvcl9vYmplY3RfcmVjb3JkXCIsIChvYmplY3RfbmFtZSwgaWQsIHNwYWNlX2lkKS0+XG5cdGNvbGxlY3Rpb24gPSBDcmVhdG9yLmdldENvbGxlY3Rpb24ob2JqZWN0X25hbWUsIHNwYWNlX2lkKVxuXHRpZiBjb2xsZWN0aW9uXG5cdFx0cmV0dXJuIGNvbGxlY3Rpb24uZmluZCh7X2lkOiBpZH0pXG5cbiIsIk1ldGVvci5wdWJsaXNoKFwiY3JlYXRvcl9vYmplY3RfcmVjb3JkXCIsIGZ1bmN0aW9uKG9iamVjdF9uYW1lLCBpZCwgc3BhY2VfaWQpIHtcbiAgdmFyIGNvbGxlY3Rpb247XG4gIGNvbGxlY3Rpb24gPSBDcmVhdG9yLmdldENvbGxlY3Rpb24ob2JqZWN0X25hbWUsIHNwYWNlX2lkKTtcbiAgaWYgKGNvbGxlY3Rpb24pIHtcbiAgICByZXR1cm4gY29sbGVjdGlvbi5maW5kKHtcbiAgICAgIF9pZDogaWRcbiAgICB9KTtcbiAgfVxufSk7XG4iLCJNZXRlb3IucHVibGlzaENvbXBvc2l0ZSBcInN0ZWVkb3Nfb2JqZWN0X3RhYnVsYXJcIiwgKHRhYmxlTmFtZSwgaWRzLCBmaWVsZHMsIHNwYWNlSWQpLT5cblx0dW5sZXNzIHRoaXMudXNlcklkXG5cdFx0cmV0dXJuIHRoaXMucmVhZHkoKVxuXG5cdGNoZWNrKHRhYmxlTmFtZSwgU3RyaW5nKTtcblx0Y2hlY2soaWRzLCBBcnJheSk7XG5cdGNoZWNrKGZpZWxkcywgTWF0Y2guT3B0aW9uYWwoT2JqZWN0KSk7XG5cblx0X29iamVjdF9uYW1lID0gdGFibGVOYW1lLnJlcGxhY2UoXCJjcmVhdG9yX1wiLFwiXCIpXG5cdF9vYmplY3QgPSBDcmVhdG9yLmdldE9iamVjdChfb2JqZWN0X25hbWUsIHNwYWNlSWQpXG5cblx0aWYgc3BhY2VJZFxuXHRcdF9vYmplY3RfbmFtZSA9IENyZWF0b3IuZ2V0T2JqZWN0TmFtZShfb2JqZWN0KVxuXG5cdG9iamVjdF9jb2xsZWNpdG9uID0gQ3JlYXRvci5nZXRDb2xsZWN0aW9uKF9vYmplY3RfbmFtZSlcblxuXG5cdF9maWVsZHMgPSBfb2JqZWN0Py5maWVsZHNcblx0aWYgIV9maWVsZHMgfHwgIW9iamVjdF9jb2xsZWNpdG9uXG5cdFx0cmV0dXJuIHRoaXMucmVhZHkoKVxuXG5cdHJlZmVyZW5jZV9maWVsZHMgPSBfLmZpbHRlciBfZmllbGRzLCAoZiktPlxuXHRcdHJldHVybiBfLmlzRnVuY3Rpb24oZi5yZWZlcmVuY2VfdG8pIHx8ICFfLmlzRW1wdHkoZi5yZWZlcmVuY2VfdG8pXG5cblx0c2VsZiA9IHRoaXNcblxuXHRzZWxmLnVuYmxvY2soKTtcblxuXHRpZiByZWZlcmVuY2VfZmllbGRzLmxlbmd0aCA+IDBcblx0XHRkYXRhID0ge1xuXHRcdFx0ZmluZDogKCktPlxuXHRcdFx0XHRzZWxmLnVuYmxvY2soKTtcblx0XHRcdFx0ZmllbGRfa2V5cyA9IHt9XG5cdFx0XHRcdF8uZWFjaCBfLmtleXMoZmllbGRzKSwgKGYpLT5cblx0XHRcdFx0XHR1bmxlc3MgL1xcdysoXFwuXFwkKXsxfVxcdz8vLnRlc3QoZilcblx0XHRcdFx0XHRcdGZpZWxkX2tleXNbZl0gPSAxXG5cdFx0XHRcdFxuXHRcdFx0XHRyZXR1cm4gb2JqZWN0X2NvbGxlY2l0b24uZmluZCh7X2lkOiB7JGluOiBpZHN9fSwge2ZpZWxkczogZmllbGRfa2V5c30pO1xuXHRcdH1cblxuXHRcdGRhdGEuY2hpbGRyZW4gPSBbXVxuXG5cdFx0a2V5cyA9IF8ua2V5cyhmaWVsZHMpXG5cblx0XHRpZiBrZXlzLmxlbmd0aCA8IDFcblx0XHRcdGtleXMgPSBfLmtleXMoX2ZpZWxkcylcblxuXHRcdF9rZXlzID0gW11cblxuXHRcdGtleXMuZm9yRWFjaCAoa2V5KS0+XG5cdFx0XHRpZiBfb2JqZWN0LnNjaGVtYS5fb2JqZWN0S2V5c1trZXkgKyAnLiddXG5cdFx0XHRcdF9rZXlzID0gX2tleXMuY29uY2F0KF8ubWFwKF9vYmplY3Quc2NoZW1hLl9vYmplY3RLZXlzW2tleSArICcuJ10sIChrKS0+XG5cdFx0XHRcdFx0cmV0dXJuIGtleSArICcuJyArIGtcblx0XHRcdFx0KSlcblx0XHRcdF9rZXlzLnB1c2goa2V5KVxuXG5cdFx0X2tleXMuZm9yRWFjaCAoa2V5KS0+XG5cdFx0XHRyZWZlcmVuY2VfZmllbGQgPSBfZmllbGRzW2tleV1cblxuXHRcdFx0aWYgcmVmZXJlbmNlX2ZpZWxkICYmIChfLmlzRnVuY3Rpb24ocmVmZXJlbmNlX2ZpZWxkLnJlZmVyZW5jZV90bykgfHwgIV8uaXNFbXB0eShyZWZlcmVuY2VfZmllbGQucmVmZXJlbmNlX3RvKSkgICMgYW5kIENyZWF0b3IuQ29sbGVjdGlvbnNbcmVmZXJlbmNlX2ZpZWxkLnJlZmVyZW5jZV90b11cblx0XHRcdFx0ZGF0YS5jaGlsZHJlbi5wdXNoIHtcblx0XHRcdFx0XHRmaW5kOiAocGFyZW50KSAtPlxuXHRcdFx0XHRcdFx0dHJ5XG5cdFx0XHRcdFx0XHRcdHNlbGYudW5ibG9jaygpO1xuXG5cdFx0XHRcdFx0XHRcdHF1ZXJ5ID0ge31cblxuXHRcdFx0XHRcdFx0XHQjIOihqOagvOWtkOWtl+auteeJueauiuWkhOeQhlxuXHRcdFx0XHRcdFx0XHRpZiAvXFx3KyhcXC5cXCRcXC4pezF9XFx3Ky8udGVzdChrZXkpXG5cdFx0XHRcdFx0XHRcdFx0cF9rID0ga2V5LnJlcGxhY2UoLyhcXHcrKVxcLlxcJFxcLlxcdysvaWcsIFwiJDFcIilcblx0XHRcdFx0XHRcdFx0XHRzX2sgPSBrZXkucmVwbGFjZSgvXFx3K1xcLlxcJFxcLihcXHcrKS9pZywgXCIkMVwiKVxuXHRcdFx0XHRcdFx0XHRcdHJlZmVyZW5jZV9pZHMgPSBwYXJlbnRbcF9rXS5nZXRQcm9wZXJ0eShzX2spXG5cdFx0XHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRcdFx0XHRyZWZlcmVuY2VfaWRzID0ga2V5LnNwbGl0KCcuJykucmVkdWNlIChvLCB4KSAtPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRvP1t4XVxuXHRcdFx0XHRcdFx0XHRcdCwgcGFyZW50XG5cblx0XHRcdFx0XHRcdFx0cmVmZXJlbmNlX3RvID0gcmVmZXJlbmNlX2ZpZWxkLnJlZmVyZW5jZV90b1xuXG5cdFx0XHRcdFx0XHRcdGlmIF8uaXNGdW5jdGlvbihyZWZlcmVuY2VfdG8pXG5cdFx0XHRcdFx0XHRcdFx0cmVmZXJlbmNlX3RvID0gcmVmZXJlbmNlX3RvKClcblxuXHRcdFx0XHRcdFx0XHRpZiBfLmlzQXJyYXkocmVmZXJlbmNlX3RvKVxuXHRcdFx0XHRcdFx0XHRcdGlmIF8uaXNPYmplY3QocmVmZXJlbmNlX2lkcykgJiYgIV8uaXNBcnJheShyZWZlcmVuY2VfaWRzKVxuXHRcdFx0XHRcdFx0XHRcdFx0cmVmZXJlbmNlX3RvID0gcmVmZXJlbmNlX2lkcy5vXG5cdFx0XHRcdFx0XHRcdFx0XHRyZWZlcmVuY2VfaWRzID0gcmVmZXJlbmNlX2lkcy5pZHMgfHwgW11cblx0XHRcdFx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gW11cblxuXHRcdFx0XHRcdFx0XHRpZiBfLmlzQXJyYXkocmVmZXJlbmNlX2lkcylcblx0XHRcdFx0XHRcdFx0XHRxdWVyeS5faWQgPSB7JGluOiByZWZlcmVuY2VfaWRzfVxuXHRcdFx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0XHRcdFx0cXVlcnkuX2lkID0gcmVmZXJlbmNlX2lkc1xuXG5cdFx0XHRcdFx0XHRcdHJlZmVyZW5jZV90b19vYmplY3QgPSBDcmVhdG9yLmdldE9iamVjdChyZWZlcmVuY2VfdG8sIHNwYWNlSWQpXG5cblx0XHRcdFx0XHRcdFx0bmFtZV9maWVsZF9rZXkgPSByZWZlcmVuY2VfdG9fb2JqZWN0Lk5BTUVfRklFTERfS0VZXG5cblx0XHRcdFx0XHRcdFx0Y2hpbGRyZW5fZmllbGRzID0ge19pZDogMSwgc3BhY2U6IDF9XG5cblx0XHRcdFx0XHRcdFx0aWYgbmFtZV9maWVsZF9rZXlcblx0XHRcdFx0XHRcdFx0XHRjaGlsZHJlbl9maWVsZHNbbmFtZV9maWVsZF9rZXldID0gMVxuXG5cdFx0XHRcdFx0XHRcdHJldHVybiBDcmVhdG9yLmdldENvbGxlY3Rpb24ocmVmZXJlbmNlX3RvLCBzcGFjZUlkKS5maW5kKHF1ZXJ5LCB7XG5cdFx0XHRcdFx0XHRcdFx0ZmllbGRzOiBjaGlsZHJlbl9maWVsZHNcblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRjYXRjaCBlXG5cdFx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKHJlZmVyZW5jZV90bywgcGFyZW50LCBlKVxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gW11cblx0XHRcdFx0fVxuXG5cdFx0cmV0dXJuIGRhdGFcblx0ZWxzZVxuXHRcdHJldHVybiB7XG5cdFx0XHRmaW5kOiAoKS0+XG5cdFx0XHRcdHNlbGYudW5ibG9jaygpO1xuXHRcdFx0XHRyZXR1cm4gb2JqZWN0X2NvbGxlY2l0b24uZmluZCh7X2lkOiB7JGluOiBpZHN9fSwge2ZpZWxkczogZmllbGRzfSlcblx0XHR9O1xuXG4iLCJNZXRlb3IucHVibGlzaENvbXBvc2l0ZShcInN0ZWVkb3Nfb2JqZWN0X3RhYnVsYXJcIiwgZnVuY3Rpb24odGFibGVOYW1lLCBpZHMsIGZpZWxkcywgc3BhY2VJZCkge1xuICB2YXIgX2ZpZWxkcywgX2tleXMsIF9vYmplY3QsIF9vYmplY3RfbmFtZSwgZGF0YSwga2V5cywgb2JqZWN0X2NvbGxlY2l0b24sIHJlZmVyZW5jZV9maWVsZHMsIHNlbGY7XG4gIGlmICghdGhpcy51c2VySWQpIHtcbiAgICByZXR1cm4gdGhpcy5yZWFkeSgpO1xuICB9XG4gIGNoZWNrKHRhYmxlTmFtZSwgU3RyaW5nKTtcbiAgY2hlY2soaWRzLCBBcnJheSk7XG4gIGNoZWNrKGZpZWxkcywgTWF0Y2guT3B0aW9uYWwoT2JqZWN0KSk7XG4gIF9vYmplY3RfbmFtZSA9IHRhYmxlTmFtZS5yZXBsYWNlKFwiY3JlYXRvcl9cIiwgXCJcIik7XG4gIF9vYmplY3QgPSBDcmVhdG9yLmdldE9iamVjdChfb2JqZWN0X25hbWUsIHNwYWNlSWQpO1xuICBpZiAoc3BhY2VJZCkge1xuICAgIF9vYmplY3RfbmFtZSA9IENyZWF0b3IuZ2V0T2JqZWN0TmFtZShfb2JqZWN0KTtcbiAgfVxuICBvYmplY3RfY29sbGVjaXRvbiA9IENyZWF0b3IuZ2V0Q29sbGVjdGlvbihfb2JqZWN0X25hbWUpO1xuICBfZmllbGRzID0gX29iamVjdCAhPSBudWxsID8gX29iamVjdC5maWVsZHMgOiB2b2lkIDA7XG4gIGlmICghX2ZpZWxkcyB8fCAhb2JqZWN0X2NvbGxlY2l0b24pIHtcbiAgICByZXR1cm4gdGhpcy5yZWFkeSgpO1xuICB9XG4gIHJlZmVyZW5jZV9maWVsZHMgPSBfLmZpbHRlcihfZmllbGRzLCBmdW5jdGlvbihmKSB7XG4gICAgcmV0dXJuIF8uaXNGdW5jdGlvbihmLnJlZmVyZW5jZV90bykgfHwgIV8uaXNFbXB0eShmLnJlZmVyZW5jZV90byk7XG4gIH0pO1xuICBzZWxmID0gdGhpcztcbiAgc2VsZi51bmJsb2NrKCk7XG4gIGlmIChyZWZlcmVuY2VfZmllbGRzLmxlbmd0aCA+IDApIHtcbiAgICBkYXRhID0ge1xuICAgICAgZmluZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBmaWVsZF9rZXlzO1xuICAgICAgICBzZWxmLnVuYmxvY2soKTtcbiAgICAgICAgZmllbGRfa2V5cyA9IHt9O1xuICAgICAgICBfLmVhY2goXy5rZXlzKGZpZWxkcyksIGZ1bmN0aW9uKGYpIHtcbiAgICAgICAgICBpZiAoIS9cXHcrKFxcLlxcJCl7MX1cXHc/Ly50ZXN0KGYpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmllbGRfa2V5c1tmXSA9IDE7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG9iamVjdF9jb2xsZWNpdG9uLmZpbmQoe1xuICAgICAgICAgIF9pZDoge1xuICAgICAgICAgICAgJGluOiBpZHNcbiAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICBmaWVsZHM6IGZpZWxkX2tleXNcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgICBkYXRhLmNoaWxkcmVuID0gW107XG4gICAga2V5cyA9IF8ua2V5cyhmaWVsZHMpO1xuICAgIGlmIChrZXlzLmxlbmd0aCA8IDEpIHtcbiAgICAgIGtleXMgPSBfLmtleXMoX2ZpZWxkcyk7XG4gICAgfVxuICAgIF9rZXlzID0gW107XG4gICAga2V5cy5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xuICAgICAgaWYgKF9vYmplY3Quc2NoZW1hLl9vYmplY3RLZXlzW2tleSArICcuJ10pIHtcbiAgICAgICAgX2tleXMgPSBfa2V5cy5jb25jYXQoXy5tYXAoX29iamVjdC5zY2hlbWEuX29iamVjdEtleXNba2V5ICsgJy4nXSwgZnVuY3Rpb24oaykge1xuICAgICAgICAgIHJldHVybiBrZXkgKyAnLicgKyBrO1xuICAgICAgICB9KSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gX2tleXMucHVzaChrZXkpO1xuICAgIH0pO1xuICAgIF9rZXlzLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XG4gICAgICB2YXIgcmVmZXJlbmNlX2ZpZWxkO1xuICAgICAgcmVmZXJlbmNlX2ZpZWxkID0gX2ZpZWxkc1trZXldO1xuICAgICAgaWYgKHJlZmVyZW5jZV9maWVsZCAmJiAoXy5pc0Z1bmN0aW9uKHJlZmVyZW5jZV9maWVsZC5yZWZlcmVuY2VfdG8pIHx8ICFfLmlzRW1wdHkocmVmZXJlbmNlX2ZpZWxkLnJlZmVyZW5jZV90bykpKSB7XG4gICAgICAgIHJldHVybiBkYXRhLmNoaWxkcmVuLnB1c2goe1xuICAgICAgICAgIGZpbmQ6IGZ1bmN0aW9uKHBhcmVudCkge1xuICAgICAgICAgICAgdmFyIGNoaWxkcmVuX2ZpZWxkcywgZSwgbmFtZV9maWVsZF9rZXksIHBfaywgcXVlcnksIHJlZmVyZW5jZV9pZHMsIHJlZmVyZW5jZV90bywgcmVmZXJlbmNlX3RvX29iamVjdCwgc19rO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgc2VsZi51bmJsb2NrKCk7XG4gICAgICAgICAgICAgIHF1ZXJ5ID0ge307XG4gICAgICAgICAgICAgIGlmICgvXFx3KyhcXC5cXCRcXC4pezF9XFx3Ky8udGVzdChrZXkpKSB7XG4gICAgICAgICAgICAgICAgcF9rID0ga2V5LnJlcGxhY2UoLyhcXHcrKVxcLlxcJFxcLlxcdysvaWcsIFwiJDFcIik7XG4gICAgICAgICAgICAgICAgc19rID0ga2V5LnJlcGxhY2UoL1xcdytcXC5cXCRcXC4oXFx3KykvaWcsIFwiJDFcIik7XG4gICAgICAgICAgICAgICAgcmVmZXJlbmNlX2lkcyA9IHBhcmVudFtwX2tdLmdldFByb3BlcnR5KHNfayk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVmZXJlbmNlX2lkcyA9IGtleS5zcGxpdCgnLicpLnJlZHVjZShmdW5jdGlvbihvLCB4KSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gbyAhPSBudWxsID8gb1t4XSA6IHZvaWQgMDtcbiAgICAgICAgICAgICAgICB9LCBwYXJlbnQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJlZmVyZW5jZV90byA9IHJlZmVyZW5jZV9maWVsZC5yZWZlcmVuY2VfdG87XG4gICAgICAgICAgICAgIGlmIChfLmlzRnVuY3Rpb24ocmVmZXJlbmNlX3RvKSkge1xuICAgICAgICAgICAgICAgIHJlZmVyZW5jZV90byA9IHJlZmVyZW5jZV90bygpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmIChfLmlzQXJyYXkocmVmZXJlbmNlX3RvKSkge1xuICAgICAgICAgICAgICAgIGlmIChfLmlzT2JqZWN0KHJlZmVyZW5jZV9pZHMpICYmICFfLmlzQXJyYXkocmVmZXJlbmNlX2lkcykpIHtcbiAgICAgICAgICAgICAgICAgIHJlZmVyZW5jZV90byA9IHJlZmVyZW5jZV9pZHMubztcbiAgICAgICAgICAgICAgICAgIHJlZmVyZW5jZV9pZHMgPSByZWZlcmVuY2VfaWRzLmlkcyB8fCBbXTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAoXy5pc0FycmF5KHJlZmVyZW5jZV9pZHMpKSB7XG4gICAgICAgICAgICAgICAgcXVlcnkuX2lkID0ge1xuICAgICAgICAgICAgICAgICAgJGluOiByZWZlcmVuY2VfaWRzXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBxdWVyeS5faWQgPSByZWZlcmVuY2VfaWRzO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJlZmVyZW5jZV90b19vYmplY3QgPSBDcmVhdG9yLmdldE9iamVjdChyZWZlcmVuY2VfdG8sIHNwYWNlSWQpO1xuICAgICAgICAgICAgICBuYW1lX2ZpZWxkX2tleSA9IHJlZmVyZW5jZV90b19vYmplY3QuTkFNRV9GSUVMRF9LRVk7XG4gICAgICAgICAgICAgIGNoaWxkcmVuX2ZpZWxkcyA9IHtcbiAgICAgICAgICAgICAgICBfaWQ6IDEsXG4gICAgICAgICAgICAgICAgc3BhY2U6IDFcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgaWYgKG5hbWVfZmllbGRfa2V5KSB7XG4gICAgICAgICAgICAgICAgY2hpbGRyZW5fZmllbGRzW25hbWVfZmllbGRfa2V5XSA9IDE7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIENyZWF0b3IuZ2V0Q29sbGVjdGlvbihyZWZlcmVuY2VfdG8sIHNwYWNlSWQpLmZpbmQocXVlcnksIHtcbiAgICAgICAgICAgICAgICBmaWVsZHM6IGNoaWxkcmVuX2ZpZWxkc1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgIGUgPSBlcnJvcjtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVmZXJlbmNlX3RvLCBwYXJlbnQsIGUpO1xuICAgICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gZGF0YTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4ge1xuICAgICAgZmluZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHNlbGYudW5ibG9jaygpO1xuICAgICAgICByZXR1cm4gb2JqZWN0X2NvbGxlY2l0b24uZmluZCh7XG4gICAgICAgICAgX2lkOiB7XG4gICAgICAgICAgICAkaW46IGlkc1xuICAgICAgICAgIH1cbiAgICAgICAgfSwge1xuICAgICAgICAgIGZpZWxkczogZmllbGRzXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gIH1cbn0pO1xuIiwiTWV0ZW9yLnB1Ymxpc2ggXCJvYmplY3RfbGlzdHZpZXdzXCIsIChvYmplY3RfbmFtZSwgc3BhY2VJZCktPlxuICAgIHVzZXJJZCA9IHRoaXMudXNlcklkXG4gICAgcmV0dXJuIENyZWF0b3IuZ2V0Q29sbGVjdGlvbihcIm9iamVjdF9saXN0dmlld3NcIikuZmluZCh7b2JqZWN0X25hbWU6IG9iamVjdF9uYW1lLCBzcGFjZTogc3BhY2VJZCAsXCIkb3JcIjpbe293bmVyOiB1c2VySWR9LCB7c2hhcmVkOiB0cnVlfV19KSIsIk1ldGVvci5wdWJsaXNoIFwidXNlcl90YWJ1bGFyX3NldHRpbmdzXCIsIChvYmplY3RfbmFtZSktPlxuICAgIHVzZXJJZCA9IHRoaXMudXNlcklkXG4gICAgcmV0dXJuIENyZWF0b3IuQ29sbGVjdGlvbnMuc2V0dGluZ3MuZmluZCh7b2JqZWN0X25hbWU6IHskaW46IG9iamVjdF9uYW1lfSwgcmVjb3JkX2lkOiB7JGluOiBbXCJvYmplY3RfbGlzdHZpZXdzXCIsIFwib2JqZWN0X2dyaWR2aWV3c1wiXX0sIG93bmVyOiB1c2VySWR9KVxuIiwiTWV0ZW9yLnB1Ymxpc2ggXCJyZWxhdGVkX29iamVjdHNfcmVjb3Jkc1wiLCAob2JqZWN0X25hbWUsIHJlbGF0ZWRfb2JqZWN0X25hbWUsIHJlbGF0ZWRfZmllbGRfbmFtZSwgcmVjb3JkX2lkLCBzcGFjZUlkKS0+XG5cdHVzZXJJZCA9IHRoaXMudXNlcklkXG5cdGlmIHJlbGF0ZWRfb2JqZWN0X25hbWUgPT0gXCJjZnMuZmlsZXMuZmlsZXJlY29yZFwiXG5cdFx0c2VsZWN0b3IgPSB7XCJtZXRhZGF0YS5zcGFjZVwiOiBzcGFjZUlkfVxuXHRlbHNlXG5cdFx0c2VsZWN0b3IgPSB7c3BhY2U6IHNwYWNlSWR9XG5cdFxuXHRpZiByZWxhdGVkX29iamVjdF9uYW1lID09IFwiY21zX2ZpbGVzXCJcblx0XHQjIOmZhOS7tueahOWFs+iBlOaQnOe0ouadoeS7tuaYr+Wumuatu+eahFxuXHRcdHNlbGVjdG9yW1wicGFyZW50Lm9cIl0gPSBvYmplY3RfbmFtZVxuXHRcdHNlbGVjdG9yW1wicGFyZW50Lmlkc1wiXSA9IFtyZWNvcmRfaWRdXG5cdGVsc2Vcblx0XHRzZWxlY3RvcltyZWxhdGVkX2ZpZWxkX25hbWVdID0gcmVjb3JkX2lkXG5cblx0cGVybWlzc2lvbnMgPSBDcmVhdG9yLmdldFBlcm1pc3Npb25zKHJlbGF0ZWRfb2JqZWN0X25hbWUsIHNwYWNlSWQsIHVzZXJJZClcblx0aWYgIXBlcm1pc3Npb25zLnZpZXdBbGxSZWNvcmRzIGFuZCBwZXJtaXNzaW9ucy5hbGxvd1JlYWRcblx0XHRzZWxlY3Rvci5vd25lciA9IHVzZXJJZFxuXHRcblx0cmV0dXJuIENyZWF0b3IuZ2V0Q29sbGVjdGlvbihyZWxhdGVkX29iamVjdF9uYW1lKS5maW5kKHNlbGVjdG9yKSIsIk1ldGVvci5wdWJsaXNoKFwicmVsYXRlZF9vYmplY3RzX3JlY29yZHNcIiwgZnVuY3Rpb24ob2JqZWN0X25hbWUsIHJlbGF0ZWRfb2JqZWN0X25hbWUsIHJlbGF0ZWRfZmllbGRfbmFtZSwgcmVjb3JkX2lkLCBzcGFjZUlkKSB7XG4gIHZhciBwZXJtaXNzaW9ucywgc2VsZWN0b3IsIHVzZXJJZDtcbiAgdXNlcklkID0gdGhpcy51c2VySWQ7XG4gIGlmIChyZWxhdGVkX29iamVjdF9uYW1lID09PSBcImNmcy5maWxlcy5maWxlcmVjb3JkXCIpIHtcbiAgICBzZWxlY3RvciA9IHtcbiAgICAgIFwibWV0YWRhdGEuc3BhY2VcIjogc3BhY2VJZFxuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgc2VsZWN0b3IgPSB7XG4gICAgICBzcGFjZTogc3BhY2VJZFxuICAgIH07XG4gIH1cbiAgaWYgKHJlbGF0ZWRfb2JqZWN0X25hbWUgPT09IFwiY21zX2ZpbGVzXCIpIHtcbiAgICBzZWxlY3RvcltcInBhcmVudC5vXCJdID0gb2JqZWN0X25hbWU7XG4gICAgc2VsZWN0b3JbXCJwYXJlbnQuaWRzXCJdID0gW3JlY29yZF9pZF07XG4gIH0gZWxzZSB7XG4gICAgc2VsZWN0b3JbcmVsYXRlZF9maWVsZF9uYW1lXSA9IHJlY29yZF9pZDtcbiAgfVxuICBwZXJtaXNzaW9ucyA9IENyZWF0b3IuZ2V0UGVybWlzc2lvbnMocmVsYXRlZF9vYmplY3RfbmFtZSwgc3BhY2VJZCwgdXNlcklkKTtcbiAgaWYgKCFwZXJtaXNzaW9ucy52aWV3QWxsUmVjb3JkcyAmJiBwZXJtaXNzaW9ucy5hbGxvd1JlYWQpIHtcbiAgICBzZWxlY3Rvci5vd25lciA9IHVzZXJJZDtcbiAgfVxuICByZXR1cm4gQ3JlYXRvci5nZXRDb2xsZWN0aW9uKHJlbGF0ZWRfb2JqZWN0X25hbWUpLmZpbmQoc2VsZWN0b3IpO1xufSk7XG4iLCJNZXRlb3IucHVibGlzaCAnc3BhY2VfdXNlcl9pbmZvJywgKHNwYWNlSWQsIHVzZXJJZCktPlxuXHRyZXR1cm4gQ3JlYXRvci5nZXRDb2xsZWN0aW9uKFwic3BhY2VfdXNlcnNcIikuZmluZCh7c3BhY2U6IHNwYWNlSWQsIHVzZXI6IHVzZXJJZH0pIiwiXG5pZiBNZXRlb3IuaXNTZXJ2ZXJcblxuXHRNZXRlb3IucHVibGlzaCAnY29udGFjdHNfdmlld19saW1pdHMnLCAoc3BhY2VJZCktPlxuXG5cdFx0dW5sZXNzIHRoaXMudXNlcklkXG5cdFx0XHRyZXR1cm4gdGhpcy5yZWFkeSgpXG5cblx0XHR1bmxlc3Mgc3BhY2VJZFxuXHRcdFx0cmV0dXJuIHRoaXMucmVhZHkoKVxuXG5cdFx0c2VsZWN0b3IgPVxuXHRcdFx0c3BhY2U6IHNwYWNlSWRcblx0XHRcdGtleTogJ2NvbnRhY3RzX3ZpZXdfbGltaXRzJ1xuXG5cdFx0cmV0dXJuIGRiLnNwYWNlX3NldHRpbmdzLmZpbmQoc2VsZWN0b3IpIiwiaWYgKE1ldGVvci5pc1NlcnZlcikge1xuICBNZXRlb3IucHVibGlzaCgnY29udGFjdHNfdmlld19saW1pdHMnLCBmdW5jdGlvbihzcGFjZUlkKSB7XG4gICAgdmFyIHNlbGVjdG9yO1xuICAgIGlmICghdGhpcy51c2VySWQpIHtcbiAgICAgIHJldHVybiB0aGlzLnJlYWR5KCk7XG4gICAgfVxuICAgIGlmICghc3BhY2VJZCkge1xuICAgICAgcmV0dXJuIHRoaXMucmVhZHkoKTtcbiAgICB9XG4gICAgc2VsZWN0b3IgPSB7XG4gICAgICBzcGFjZTogc3BhY2VJZCxcbiAgICAgIGtleTogJ2NvbnRhY3RzX3ZpZXdfbGltaXRzJ1xuICAgIH07XG4gICAgcmV0dXJuIGRiLnNwYWNlX3NldHRpbmdzLmZpbmQoc2VsZWN0b3IpO1xuICB9KTtcbn1cbiIsIlxuaWYgTWV0ZW9yLmlzU2VydmVyXG5cblx0TWV0ZW9yLnB1Ymxpc2ggJ2NvbnRhY3RzX25vX2ZvcmNlX3Bob25lX3VzZXJzJywgKHNwYWNlSWQpLT5cblxuXHRcdHVubGVzcyB0aGlzLnVzZXJJZFxuXHRcdFx0cmV0dXJuIHRoaXMucmVhZHkoKVxuXG5cdFx0dW5sZXNzIHNwYWNlSWRcblx0XHRcdHJldHVybiB0aGlzLnJlYWR5KClcblxuXHRcdHNlbGVjdG9yID1cblx0XHRcdHNwYWNlOiBzcGFjZUlkXG5cdFx0XHRrZXk6ICdjb250YWN0c19ub19mb3JjZV9waG9uZV91c2VycydcblxuXHRcdHJldHVybiBkYi5zcGFjZV9zZXR0aW5ncy5maW5kKHNlbGVjdG9yKSIsImlmIChNZXRlb3IuaXNTZXJ2ZXIpIHtcbiAgTWV0ZW9yLnB1Ymxpc2goJ2NvbnRhY3RzX25vX2ZvcmNlX3Bob25lX3VzZXJzJywgZnVuY3Rpb24oc3BhY2VJZCkge1xuICAgIHZhciBzZWxlY3RvcjtcbiAgICBpZiAoIXRoaXMudXNlcklkKSB7XG4gICAgICByZXR1cm4gdGhpcy5yZWFkeSgpO1xuICAgIH1cbiAgICBpZiAoIXNwYWNlSWQpIHtcbiAgICAgIHJldHVybiB0aGlzLnJlYWR5KCk7XG4gICAgfVxuICAgIHNlbGVjdG9yID0ge1xuICAgICAgc3BhY2U6IHNwYWNlSWQsXG4gICAgICBrZXk6ICdjb250YWN0c19ub19mb3JjZV9waG9uZV91c2VycydcbiAgICB9O1xuICAgIHJldHVybiBkYi5zcGFjZV9zZXR0aW5ncy5maW5kKHNlbGVjdG9yKTtcbiAgfSk7XG59XG4iLCJpZiBNZXRlb3IuaXNTZXJ2ZXJcblx0TWV0ZW9yLnB1Ymxpc2ggJ3NwYWNlX25lZWRfdG9fY29uZmlybScsICgpLT5cblx0XHR1c2VySWQgPSB0aGlzLnVzZXJJZFxuXHRcdHJldHVybiBkYi5zcGFjZV91c2Vycy5maW5kKHt1c2VyOiB1c2VySWQsIGludml0ZV9zdGF0ZTogXCJwZW5kaW5nXCJ9KSIsImlmIChNZXRlb3IuaXNTZXJ2ZXIpIHtcbiAgTWV0ZW9yLnB1Ymxpc2goJ3NwYWNlX25lZWRfdG9fY29uZmlybScsIGZ1bmN0aW9uKCkge1xuICAgIHZhciB1c2VySWQ7XG4gICAgdXNlcklkID0gdGhpcy51c2VySWQ7XG4gICAgcmV0dXJuIGRiLnNwYWNlX3VzZXJzLmZpbmQoe1xuICAgICAgdXNlcjogdXNlcklkLFxuICAgICAgaW52aXRlX3N0YXRlOiBcInBlbmRpbmdcIlxuICAgIH0pO1xuICB9KTtcbn1cbiIsInBlcm1pc3Npb25NYW5hZ2VyRm9ySW5pdEFwcHJvdmFsID0ge31cblxucGVybWlzc2lvbk1hbmFnZXJGb3JJbml0QXBwcm92YWwuZ2V0Rmxvd1Blcm1pc3Npb25zID0gKGZsb3dfaWQsIHVzZXJfaWQpIC0+XG5cdCMg5qC55o2uOmZsb3dfaWTmn6XliLDlr7nlupTnmoRmbG93XG5cdGZsb3cgPSB1dWZsb3dNYW5hZ2VyRm9ySW5pdEFwcHJvdmFsLmdldEZsb3coZmxvd19pZClcblx0c3BhY2VfaWQgPSBmbG93LnNwYWNlXG5cdCMg5qC55o2uc3BhY2VfaWTlkow6dXNlcl9pZOWIsG9yZ2FuaXphdGlvbnPooajkuK3mn6XliLDnlKjmiLfmiYDlsZ7miYDmnInnmoRvcmdfaWTvvIjljIXmi6zkuIrnuqfnu4RJRO+8iVxuXHRvcmdfaWRzID0gbmV3IEFycmF5XG5cdG9yZ2FuaXphdGlvbnMgPSBkYi5vcmdhbml6YXRpb25zLmZpbmQoe1xuXHRcdHNwYWNlOiBzcGFjZV9pZCwgdXNlcnM6IHVzZXJfaWQgfSwgeyBmaWVsZHM6IHsgcGFyZW50czogMSB9IH0pLmZldGNoKClcblx0Xy5lYWNoKG9yZ2FuaXphdGlvbnMsIChvcmcpIC0+XG5cdFx0b3JnX2lkcy5wdXNoKG9yZy5faWQpXG5cdFx0aWYgb3JnLnBhcmVudHNcblx0XHRcdF8uZWFjaChvcmcucGFyZW50cywgKHBhcmVudF9pZCkgLT5cblx0XHRcdFx0b3JnX2lkcy5wdXNoKHBhcmVudF9pZClcblx0XHRcdClcblx0KVxuXHRvcmdfaWRzID0gXy51bmlxKG9yZ19pZHMpXG5cdG15X3Blcm1pc3Npb25zID0gbmV3IEFycmF5XG5cdGlmIGZsb3cucGVybXNcblx0XHQjIOWIpOaWrWZsb3cucGVybXMudXNlcnNfY2FuX2FkbWlu5Lit5piv5ZCm5YyF5ZCr5b2T5YmN55So5oi377yMXG5cdFx0IyDmiJbogIVmbG93LnBlcm1zLm9yZ3NfY2FuX2FkZOaYr+WQpuWMheWQqzTmraXlvpfliLDnmoRvcmdfaWTmlbDnu4TkuK3nmoTku7vkvZXkuIDkuKrvvIxcblx0XHQjIOiLpeaYr++8jOWImeWcqOi/lOWbnueahOaVsOe7hOS4reWKoOS4imFkZFxuXHRcdGlmIGZsb3cucGVybXMudXNlcnNfY2FuX2FkZFxuXHRcdFx0dXNlcnNfY2FuX2FkZCA9IGZsb3cucGVybXMudXNlcnNfY2FuX2FkZFxuXHRcdFx0aWYgdXNlcnNfY2FuX2FkZC5pbmNsdWRlcyh1c2VyX2lkKVxuXHRcdFx0XHRteV9wZXJtaXNzaW9ucy5wdXNoKFwiYWRkXCIpXG5cblx0XHRpZiBmbG93LnBlcm1zLm9yZ3NfY2FuX2FkZFxuXHRcdFx0b3Jnc19jYW5fYWRkID0gZmxvdy5wZXJtcy5vcmdzX2Nhbl9hZGRcblx0XHRcdF8uZWFjaChvcmdfaWRzLCAob3JnX2lkKSAtPlxuXHRcdFx0XHRpZiBvcmdzX2Nhbl9hZGQuaW5jbHVkZXMob3JnX2lkKVxuXHRcdFx0XHRcdG15X3Blcm1pc3Npb25zLnB1c2goXCJhZGRcIilcblx0XHRcdClcblx0XHQjIOWIpOaWrWZsb3cucGVybXMudXNlcnNfY2FuX21vbml0b3LkuK3mmK/lkKbljIXlkKvlvZPliY3nlKjmiLfvvIxcblx0XHQjIOaIluiAhWZsb3cucGVybXMub3Jnc19jYW5fbW9uaXRvcuaYr+WQpuWMheWQqzTmraXlvpfliLDnmoRvcmdfaWTmlbDnu4TkuK3nmoTku7vkvZXkuIDkuKrvvIxcblx0XHQjIOiLpeaYr++8jOWImeWcqOi/lOWbnueahOaVsOe7hOS4reWKoOS4im1vbml0b3Jcblx0XHRpZiBmbG93LnBlcm1zLnVzZXJzX2Nhbl9tb25pdG9yXG5cdFx0XHR1c2Vyc19jYW5fbW9uaXRvciA9IGZsb3cucGVybXMudXNlcnNfY2FuX21vbml0b3Jcblx0XHRcdGlmIHVzZXJzX2Nhbl9tb25pdG9yLmluY2x1ZGVzKHVzZXJfaWQpXG5cdFx0XHRcdG15X3Blcm1pc3Npb25zLnB1c2goXCJtb25pdG9yXCIpXG5cblx0XHRpZiBmbG93LnBlcm1zLm9yZ3NfY2FuX21vbml0b3Jcblx0XHRcdG9yZ3NfY2FuX21vbml0b3IgPSBmbG93LnBlcm1zLm9yZ3NfY2FuX21vbml0b3Jcblx0XHRcdF8uZWFjaChvcmdfaWRzLCAob3JnX2lkKSAtPlxuXHRcdFx0XHRpZiBvcmdzX2Nhbl9tb25pdG9yLmluY2x1ZGVzKG9yZ19pZClcblx0XHRcdFx0XHRteV9wZXJtaXNzaW9ucy5wdXNoKFwibW9uaXRvclwiKVxuXHRcdFx0KVxuXHRcdCMg5Yik5patZmxvdy5wZXJtcy51c2Vyc19jYW5fYWRtaW7kuK3mmK/lkKbljIXlkKvlvZPliY3nlKjmiLfvvIxcblx0XHQjIOaIluiAhWZsb3cucGVybXMub3Jnc19jYW5fYWRtaW7mmK/lkKbljIXlkKs05q2l5b6X5Yiw55qEb3JnX2lk5pWw57uE5Lit55qE5Lu75L2V5LiA5Liq77yMXG5cdFx0IyDoi6XmmK/vvIzliJnlnKjov5Tlm57nmoTmlbDnu4TkuK3liqDkuIphZG1pblxuXHRcdGlmIGZsb3cucGVybXMudXNlcnNfY2FuX2FkbWluXG5cdFx0XHR1c2Vyc19jYW5fYWRtaW4gPSBmbG93LnBlcm1zLnVzZXJzX2Nhbl9hZG1pblxuXHRcdFx0aWYgdXNlcnNfY2FuX2FkbWluLmluY2x1ZGVzKHVzZXJfaWQpXG5cdFx0XHRcdG15X3Blcm1pc3Npb25zLnB1c2goXCJhZG1pblwiKVxuXG5cdFx0aWYgZmxvdy5wZXJtcy5vcmdzX2Nhbl9hZG1pblxuXHRcdFx0b3Jnc19jYW5fYWRtaW4gPSBmbG93LnBlcm1zLm9yZ3NfY2FuX2FkbWluXG5cdFx0XHRfLmVhY2gob3JnX2lkcywgKG9yZ19pZCkgLT5cblx0XHRcdFx0aWYgb3Jnc19jYW5fYWRtaW4uaW5jbHVkZXMob3JnX2lkKVxuXHRcdFx0XHRcdG15X3Blcm1pc3Npb25zLnB1c2goXCJhZG1pblwiKVxuXHRcdFx0KVxuXG5cdG15X3Blcm1pc3Npb25zID0gXy51bmlxKG15X3Blcm1pc3Npb25zKVxuXHRyZXR1cm4gbXlfcGVybWlzc2lvbnMiLCIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cbnBlcm1pc3Npb25NYW5hZ2VyRm9ySW5pdEFwcHJvdmFsID0ge307XG5cbnBlcm1pc3Npb25NYW5hZ2VyRm9ySW5pdEFwcHJvdmFsLmdldEZsb3dQZXJtaXNzaW9ucyA9IGZ1bmN0aW9uKGZsb3dfaWQsIHVzZXJfaWQpIHtcbiAgdmFyIGZsb3csIG15X3Blcm1pc3Npb25zLCBvcmdfaWRzLCBvcmdhbml6YXRpb25zLCBvcmdzX2Nhbl9hZGQsIG9yZ3NfY2FuX2FkbWluLCBvcmdzX2Nhbl9tb25pdG9yLCBzcGFjZV9pZCwgdXNlcnNfY2FuX2FkZCwgdXNlcnNfY2FuX2FkbWluLCB1c2Vyc19jYW5fbW9uaXRvcjtcbiAgZmxvdyA9IHV1Zmxvd01hbmFnZXJGb3JJbml0QXBwcm92YWwuZ2V0RmxvdyhmbG93X2lkKTtcbiAgc3BhY2VfaWQgPSBmbG93LnNwYWNlO1xuICBvcmdfaWRzID0gbmV3IEFycmF5O1xuICBvcmdhbml6YXRpb25zID0gZGIub3JnYW5pemF0aW9ucy5maW5kKHtcbiAgICBzcGFjZTogc3BhY2VfaWQsXG4gICAgdXNlcnM6IHVzZXJfaWRcbiAgfSwge1xuICAgIGZpZWxkczoge1xuICAgICAgcGFyZW50czogMVxuICAgIH1cbiAgfSkuZmV0Y2goKTtcbiAgXy5lYWNoKG9yZ2FuaXphdGlvbnMsIGZ1bmN0aW9uKG9yZykge1xuICAgIG9yZ19pZHMucHVzaChvcmcuX2lkKTtcbiAgICBpZiAob3JnLnBhcmVudHMpIHtcbiAgICAgIHJldHVybiBfLmVhY2gob3JnLnBhcmVudHMsIGZ1bmN0aW9uKHBhcmVudF9pZCkge1xuICAgICAgICByZXR1cm4gb3JnX2lkcy5wdXNoKHBhcmVudF9pZCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0pO1xuICBvcmdfaWRzID0gXy51bmlxKG9yZ19pZHMpO1xuICBteV9wZXJtaXNzaW9ucyA9IG5ldyBBcnJheTtcbiAgaWYgKGZsb3cucGVybXMpIHtcbiAgICBpZiAoZmxvdy5wZXJtcy51c2Vyc19jYW5fYWRkKSB7XG4gICAgICB1c2Vyc19jYW5fYWRkID0gZmxvdy5wZXJtcy51c2Vyc19jYW5fYWRkO1xuICAgICAgaWYgKHVzZXJzX2Nhbl9hZGQuaW5jbHVkZXModXNlcl9pZCkpIHtcbiAgICAgICAgbXlfcGVybWlzc2lvbnMucHVzaChcImFkZFwiKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGZsb3cucGVybXMub3Jnc19jYW5fYWRkKSB7XG4gICAgICBvcmdzX2Nhbl9hZGQgPSBmbG93LnBlcm1zLm9yZ3NfY2FuX2FkZDtcbiAgICAgIF8uZWFjaChvcmdfaWRzLCBmdW5jdGlvbihvcmdfaWQpIHtcbiAgICAgICAgaWYgKG9yZ3NfY2FuX2FkZC5pbmNsdWRlcyhvcmdfaWQpKSB7XG4gICAgICAgICAgcmV0dXJuIG15X3Blcm1pc3Npb25zLnB1c2goXCJhZGRcIik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAoZmxvdy5wZXJtcy51c2Vyc19jYW5fbW9uaXRvcikge1xuICAgICAgdXNlcnNfY2FuX21vbml0b3IgPSBmbG93LnBlcm1zLnVzZXJzX2Nhbl9tb25pdG9yO1xuICAgICAgaWYgKHVzZXJzX2Nhbl9tb25pdG9yLmluY2x1ZGVzKHVzZXJfaWQpKSB7XG4gICAgICAgIG15X3Blcm1pc3Npb25zLnB1c2goXCJtb25pdG9yXCIpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoZmxvdy5wZXJtcy5vcmdzX2Nhbl9tb25pdG9yKSB7XG4gICAgICBvcmdzX2Nhbl9tb25pdG9yID0gZmxvdy5wZXJtcy5vcmdzX2Nhbl9tb25pdG9yO1xuICAgICAgXy5lYWNoKG9yZ19pZHMsIGZ1bmN0aW9uKG9yZ19pZCkge1xuICAgICAgICBpZiAob3Jnc19jYW5fbW9uaXRvci5pbmNsdWRlcyhvcmdfaWQpKSB7XG4gICAgICAgICAgcmV0dXJuIG15X3Blcm1pc3Npb25zLnB1c2goXCJtb25pdG9yXCIpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKGZsb3cucGVybXMudXNlcnNfY2FuX2FkbWluKSB7XG4gICAgICB1c2Vyc19jYW5fYWRtaW4gPSBmbG93LnBlcm1zLnVzZXJzX2Nhbl9hZG1pbjtcbiAgICAgIGlmICh1c2Vyc19jYW5fYWRtaW4uaW5jbHVkZXModXNlcl9pZCkpIHtcbiAgICAgICAgbXlfcGVybWlzc2lvbnMucHVzaChcImFkbWluXCIpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoZmxvdy5wZXJtcy5vcmdzX2Nhbl9hZG1pbikge1xuICAgICAgb3Jnc19jYW5fYWRtaW4gPSBmbG93LnBlcm1zLm9yZ3NfY2FuX2FkbWluO1xuICAgICAgXy5lYWNoKG9yZ19pZHMsIGZ1bmN0aW9uKG9yZ19pZCkge1xuICAgICAgICBpZiAob3Jnc19jYW5fYWRtaW4uaW5jbHVkZXMob3JnX2lkKSkge1xuICAgICAgICAgIHJldHVybiBteV9wZXJtaXNzaW9ucy5wdXNoKFwiYWRtaW5cIik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuICBteV9wZXJtaXNzaW9ucyA9IF8udW5pcShteV9wZXJtaXNzaW9ucyk7XG4gIHJldHVybiBteV9wZXJtaXNzaW9ucztcbn07XG4iLCJfZXZhbCA9IHJlcXVpcmUoJ2V2YWwnKVxub2JqZWN0cWwgPSByZXF1aXJlKCdAc3RlZWRvcy9vYmplY3RxbCcpO1xuXG5nZXRPYmplY3RDb25maWcgPSAob2JqZWN0QXBpTmFtZSkgLT5cblx0cmV0dXJuIG9iamVjdHFsLmdldE9iamVjdChvYmplY3RBcGlOYW1lKS50b0NvbmZpZygpXG5cbmdldE9iamVjdE5hbWVGaWVsZEtleSA9IChvYmplY3RBcGlOYW1lKSAtPlxuXHRyZXR1cm4gb2JqZWN0cWwuZ2V0T2JqZWN0KG9iamVjdEFwaU5hbWUpLk5BTUVfRklFTERfS0VZXG5cbmdldFJlbGF0ZWRzID0gKG9iamVjdEFwaU5hbWUpIC0+XG5cdHJldHVybiBNZXRlb3Iud3JhcEFzeW5jKChvYmplY3RBcGlOYW1lLCBjYikgLT5cblx0XHRvYmplY3RxbC5nZXRPYmplY3Qob2JqZWN0QXBpTmFtZSkuZ2V0UmVsYXRlZHMoKS50aGVuIChyZXNvbHZlLCByZWplY3QpIC0+XG5cdFx0XHRjYihyZWplY3QsIHJlc29sdmUpXG5cdFx0KShvYmplY3RBcGlOYW1lKVxuXG5vYmplY3RGaW5kT25lID0gKG9iamVjdEFwaU5hbWUsIHF1ZXJ5KSAtPlxuXHRyZXR1cm4gTWV0ZW9yLndyYXBBc3luYygob2JqZWN0QXBpTmFtZSwgcXVlcnksIGNiKSAtPlxuXHRcdG9iamVjdHFsLmdldE9iamVjdChvYmplY3RBcGlOYW1lKS5maW5kKHF1ZXJ5KS50aGVuIChyZXNvbHZlLCByZWplY3QpIC0+XG5cdFx0XHRpZiAocmVzb2x2ZSAmJiByZXNvbHZlLmxlbmd0aCA+IDApXG5cdFx0XHRcdGNiKHJlamVjdCwgcmVzb2x2ZVswXSlcblx0XHRcdGVsc2Vcblx0XHRcdFx0Y2IocmVqZWN0LCBudWxsKVxuXHRcdCkob2JqZWN0QXBpTmFtZSwgcXVlcnkpXG5cbm9iamVjdEZpbmQgPSAob2JqZWN0QXBpTmFtZSwgcXVlcnkpIC0+XG5cdHJldHVybiBNZXRlb3Iud3JhcEFzeW5jKChvYmplY3RBcGlOYW1lLCBxdWVyeSwgY2IpIC0+XG5cdFx0b2JqZWN0cWwuZ2V0T2JqZWN0KG9iamVjdEFwaU5hbWUpLmZpbmQocXVlcnkpLnRoZW4gKHJlc29sdmUsIHJlamVjdCkgLT5cblx0XHRcdGNiKHJlamVjdCwgcmVzb2x2ZSlcblx0XHQpKG9iamVjdEFwaU5hbWUsIHF1ZXJ5KVxuXG5vYmplY3RVcGRhdGUgPSAob2JqZWN0QXBpTmFtZSwgaWQsIGRhdGEpIC0+XG5cdHJldHVybiBNZXRlb3Iud3JhcEFzeW5jKChvYmplY3RBcGlOYW1lLCBpZCwgZGF0YSwgY2IpIC0+XG5cdFx0b2JqZWN0cWwuZ2V0T2JqZWN0KG9iamVjdEFwaU5hbWUpLnVwZGF0ZShpZCwgZGF0YSkudGhlbiAocmVzb2x2ZSwgcmVqZWN0KSAtPlxuXHRcdFx0Y2IocmVqZWN0LCByZXNvbHZlKVxuXHRcdCkob2JqZWN0QXBpTmFtZSwgaWQsIGRhdGEpXG5cbnV1Zmxvd01hbmFnZXJGb3JJbml0QXBwcm92YWwgPSB7fVxuXG51dWZsb3dNYW5hZ2VyRm9ySW5pdEFwcHJvdmFsLmNoZWNrX2F1dGhvcml6YXRpb24gPSAocmVxKSAtPlxuXHRxdWVyeSA9IHJlcS5xdWVyeVxuXHR1c2VySWQgPSBxdWVyeVtcIlgtVXNlci1JZFwiXVxuXHRhdXRoVG9rZW4gPSBxdWVyeVtcIlgtQXV0aC1Ub2tlblwiXVxuXG5cdGlmIG5vdCB1c2VySWQgb3Igbm90IGF1dGhUb2tlblxuXHRcdHRocm93IG5ldyBNZXRlb3IuRXJyb3IgNDAxLCAnVW5hdXRob3JpemVkJ1xuXG5cdGhhc2hlZFRva2VuID0gQWNjb3VudHMuX2hhc2hMb2dpblRva2VuKGF1dGhUb2tlbilcblx0dXNlciA9IE1ldGVvci51c2Vycy5maW5kT25lXG5cdFx0X2lkOiB1c2VySWQsXG5cdFx0XCJzZXJ2aWNlcy5yZXN1bWUubG9naW5Ub2tlbnMuaGFzaGVkVG9rZW5cIjogaGFzaGVkVG9rZW5cblxuXHRpZiBub3QgdXNlclxuXHRcdHRocm93IG5ldyBNZXRlb3IuRXJyb3IgNDAxLCAnVW5hdXRob3JpemVkJ1xuXG5cdHJldHVybiB1c2VyXG5cbnV1Zmxvd01hbmFnZXJGb3JJbml0QXBwcm92YWwuZ2V0U3BhY2UgPSAoc3BhY2VfaWQpIC0+XG5cdHNwYWNlID0gQ3JlYXRvci5Db2xsZWN0aW9ucy5zcGFjZXMuZmluZE9uZShzcGFjZV9pZClcblx0aWYgbm90IHNwYWNlXG5cdFx0dGhyb3cgbmV3IE1ldGVvci5FcnJvcignZXJyb3IhJywgXCJzcGFjZV9pZOacieivr+aIluatpHNwYWNl5bey57uP6KKr5Yig6ZmkXCIpXG5cdHJldHVybiBzcGFjZVxuXG51dWZsb3dNYW5hZ2VyRm9ySW5pdEFwcHJvdmFsLmdldEZsb3cgPSAoZmxvd19pZCkgLT5cblx0ZmxvdyA9IENyZWF0b3IuQ29sbGVjdGlvbnMuZmxvd3MuZmluZE9uZShmbG93X2lkKVxuXHRpZiBub3QgZmxvd1xuXHRcdHRocm93IG5ldyBNZXRlb3IuRXJyb3IoJ2Vycm9yIScsIFwiaWTmnInor6/miJbmraTmtYHnqIvlt7Lnu4/ooqvliKDpmaRcIilcblx0cmV0dXJuIGZsb3dcblxudXVmbG93TWFuYWdlckZvckluaXRBcHByb3ZhbC5nZXRTcGFjZVVzZXIgPSAoc3BhY2VfaWQsIHVzZXJfaWQpIC0+XG5cdHNwYWNlX3VzZXIgPSBDcmVhdG9yLkNvbGxlY3Rpb25zLnNwYWNlX3VzZXJzLmZpbmRPbmUoeyBzcGFjZTogc3BhY2VfaWQsIHVzZXI6IHVzZXJfaWQgfSlcblx0aWYgbm90IHNwYWNlX3VzZXJcblx0XHR0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKCdlcnJvciEnLCBcInVzZXJfaWTlr7nlupTnmoTnlKjmiLfkuI3lsZ7kuo7lvZPliY1zcGFjZVwiKVxuXHRyZXR1cm4gc3BhY2VfdXNlclxuXG51dWZsb3dNYW5hZ2VyRm9ySW5pdEFwcHJvdmFsLmdldFNwYWNlVXNlck9yZ0luZm8gPSAoc3BhY2VfdXNlcikgLT5cblx0aW5mbyA9IG5ldyBPYmplY3Rcblx0aW5mby5vcmdhbml6YXRpb24gPSBzcGFjZV91c2VyLm9yZ2FuaXphdGlvblxuXHRvcmcgPSBDcmVhdG9yLkNvbGxlY3Rpb25zLm9yZ2FuaXphdGlvbnMuZmluZE9uZShzcGFjZV91c2VyLm9yZ2FuaXphdGlvbiwgeyBmaWVsZHM6IHsgbmFtZTogMSAsIGZ1bGxuYW1lOiAxIH0gfSlcblx0aW5mby5vcmdhbml6YXRpb25fbmFtZSA9IG9yZy5uYW1lXG5cdGluZm8ub3JnYW5pemF0aW9uX2Z1bGxuYW1lID0gb3JnLmZ1bGxuYW1lXG5cdHJldHVybiBpbmZvXG5cbnV1Zmxvd01hbmFnZXJGb3JJbml0QXBwcm92YWwuaXNGbG93RW5hYmxlZCA9IChmbG93KSAtPlxuXHRpZiBmbG93LnN0YXRlIGlzbnQgXCJlbmFibGVkXCJcblx0XHR0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKCdlcnJvciEnLCBcIua1geeoi+acquWQr+eUqCzmk43kvZzlpLHotKVcIilcblxudXVmbG93TWFuYWdlckZvckluaXRBcHByb3ZhbC5pc0Zsb3dTcGFjZU1hdGNoZWQgPSAoZmxvdywgc3BhY2VfaWQpIC0+XG5cdGlmIGZsb3cuc3BhY2UgaXNudCBzcGFjZV9pZFxuXHRcdHRocm93IG5ldyBNZXRlb3IuRXJyb3IoJ2Vycm9yIScsIFwi5rWB56iL5ZKM5bel5L2c5Yy6SUTkuI3ljLnphY1cIilcblxudXVmbG93TWFuYWdlckZvckluaXRBcHByb3ZhbC5nZXRGb3JtID0gKGZvcm1faWQpIC0+XG5cdGZvcm0gPSBDcmVhdG9yLkNvbGxlY3Rpb25zLmZvcm1zLmZpbmRPbmUoZm9ybV9pZClcblx0aWYgbm90IGZvcm1cblx0XHR0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKCdlcnJvciEnLCAn6KGo5Y2VSUTmnInor6/miJbmraTooajljZXlt7Lnu4/ooqvliKDpmaQnKVxuXG5cdHJldHVybiBmb3JtXG5cbnV1Zmxvd01hbmFnZXJGb3JJbml0QXBwcm92YWwuZ2V0Q2F0ZWdvcnkgPSAoY2F0ZWdvcnlfaWQpIC0+XG5cdHJldHVybiBDcmVhdG9yLkNvbGxlY3Rpb25zLmNhdGVnb3JpZXMuZmluZE9uZShjYXRlZ29yeV9pZClcblxudXVmbG93TWFuYWdlckZvckluaXRBcHByb3ZhbC5jaGVja1N5bmNEaXJlY3Rpb24gPSAob2JqZWN0X25hbWUsIGZsb3dfaWQpIC0+XG5cdG93ID0gQ3JlYXRvci5Db2xsZWN0aW9ucy5vYmplY3Rfd29ya2Zsb3dzLmZpbmRPbmUoe1xuXHRcdG9iamVjdF9uYW1lOiBvYmplY3RfbmFtZSxcblx0XHRmbG93X2lkOiBmbG93X2lkXG5cdH0pXG5cdGlmICFvd1xuXHRcdHRocm93IG5ldyBNZXRlb3IuRXJyb3IoJ2Vycm9yIScsICfmnKrmib7liLDlr7nosaHmtYHnqIvmmKDlsITorrDlvZXjgIInKVxuXHRzeW5jRGlyZWN0aW9uID0gb3cuc3luY19kaXJlY3Rpb24gfHwgJ2JvdGgnXG5cdGlmICFbJ2JvdGgnLCAnb2JqX3RvX2lucyddLmluY2x1ZGVzKHN5bmNEaXJlY3Rpb24pXG5cdFx0dGhyb3cgbmV3IE1ldGVvci5FcnJvcignZXJyb3IhJywgJ+S4jeaUr+aMgeeahOWQjOatpeaWueWQkeOAgicpXG5cblx0cmV0dXJuIFxuXG51dWZsb3dNYW5hZ2VyRm9ySW5pdEFwcHJvdmFsLmNyZWF0ZV9pbnN0YW5jZSA9IChpbnN0YW5jZV9mcm9tX2NsaWVudCwgdXNlcl9pbmZvKSAtPlxuXHRjaGVjayBpbnN0YW5jZV9mcm9tX2NsaWVudFtcImFwcGxpY2FudFwiXSwgU3RyaW5nXG5cdGNoZWNrIGluc3RhbmNlX2Zyb21fY2xpZW50W1wic3BhY2VcIl0sIFN0cmluZ1xuXHRjaGVjayBpbnN0YW5jZV9mcm9tX2NsaWVudFtcImZsb3dcIl0sIFN0cmluZ1xuXHRjaGVjayBpbnN0YW5jZV9mcm9tX2NsaWVudFtcInJlY29yZF9pZHNcIl0sIFt7bzogU3RyaW5nLCBpZHM6IFtTdHJpbmddfV1cblxuXHQjIOagoemqjOWQjOatpeaWueWQkVxuXHR1dWZsb3dNYW5hZ2VyRm9ySW5pdEFwcHJvdmFsLmNoZWNrU3luY0RpcmVjdGlvbihpbnN0YW5jZV9mcm9tX2NsaWVudFtcInJlY29yZF9pZHNcIl1bMF0ubywgaW5zdGFuY2VfZnJvbV9jbGllbnRbXCJmbG93XCJdKVxuXG5cdCMg5qCh6aqM5piv5ZCmcmVjb3Jk5bey57uP5Y+R6LW355qE55Sz6K+36L+Y5Zyo5a6h5om55LitXG5cdHV1Zmxvd01hbmFnZXJGb3JJbml0QXBwcm92YWwuY2hlY2tJc0luQXBwcm92YWwoaW5zdGFuY2VfZnJvbV9jbGllbnRbXCJyZWNvcmRfaWRzXCJdWzBdLCBpbnN0YW5jZV9mcm9tX2NsaWVudFtcInNwYWNlXCJdKVxuXG5cdHNwYWNlX2lkID0gaW5zdGFuY2VfZnJvbV9jbGllbnRbXCJzcGFjZVwiXVxuXHRmbG93X2lkID0gaW5zdGFuY2VfZnJvbV9jbGllbnRbXCJmbG93XCJdXG5cdHVzZXJfaWQgPSB1c2VyX2luZm8uX2lkXG5cdCMg6I635Y+W5YmN5Y+w5omA5Lyg55qEdHJhY2Vcblx0dHJhY2VfZnJvbV9jbGllbnQgPSBudWxsXG5cdCMg6I635Y+W5YmN5Y+w5omA5Lyg55qEYXBwcm92ZVxuXHRhcHByb3ZlX2Zyb21fY2xpZW50ID0gbnVsbFxuXHRpZiBpbnN0YW5jZV9mcm9tX2NsaWVudFtcInRyYWNlc1wiXSBhbmQgaW5zdGFuY2VfZnJvbV9jbGllbnRbXCJ0cmFjZXNcIl1bMF1cblx0XHR0cmFjZV9mcm9tX2NsaWVudCA9IGluc3RhbmNlX2Zyb21fY2xpZW50W1widHJhY2VzXCJdWzBdXG5cdFx0aWYgdHJhY2VfZnJvbV9jbGllbnRbXCJhcHByb3Zlc1wiXSBhbmQgdHJhY2VfZnJvbV9jbGllbnRbXCJhcHByb3Zlc1wiXVswXVxuXHRcdFx0YXBwcm92ZV9mcm9tX2NsaWVudCA9IGluc3RhbmNlX2Zyb21fY2xpZW50W1widHJhY2VzXCJdWzBdW1wiYXBwcm92ZXNcIl1bMF1cblxuXHQjIOiOt+WPluS4gOS4qnNwYWNlXG5cdHNwYWNlID0gdXVmbG93TWFuYWdlckZvckluaXRBcHByb3ZhbC5nZXRTcGFjZShzcGFjZV9pZClcblx0IyDojrflj5bkuIDkuKpmbG93XG5cdGZsb3cgPSB1dWZsb3dNYW5hZ2VyRm9ySW5pdEFwcHJvdmFsLmdldEZsb3coZmxvd19pZClcblx0IyDojrflj5bkuIDkuKpzcGFjZeS4i+eahOS4gOS4qnVzZXJcblx0c3BhY2VfdXNlciA9IHV1Zmxvd01hbmFnZXJGb3JJbml0QXBwcm92YWwuZ2V0U3BhY2VVc2VyKHNwYWNlX2lkLCB1c2VyX2lkKVxuXHQjIOiOt+WPlnNwYWNlX3VzZXLmiYDlnKjnmoTpg6jpl6jkv6Hmga9cblx0c3BhY2VfdXNlcl9vcmdfaW5mbyA9IHV1Zmxvd01hbmFnZXJGb3JJbml0QXBwcm92YWwuZ2V0U3BhY2VVc2VyT3JnSW5mbyhzcGFjZV91c2VyKVxuXHQjIOWIpOaWreS4gOS4qmZsb3fmmK/lkKbkuLrlkK/nlKjnirbmgIFcblx0dXVmbG93TWFuYWdlckZvckluaXRBcHByb3ZhbC5pc0Zsb3dFbmFibGVkKGZsb3cpXG5cdCMg5Yik5pat5LiA5LiqZmxvd+WSjHNwYWNlX2lk5piv5ZCm5Yy56YWNXG5cdHV1Zmxvd01hbmFnZXJGb3JJbml0QXBwcm92YWwuaXNGbG93U3BhY2VNYXRjaGVkKGZsb3csIHNwYWNlX2lkKVxuXG5cdGZvcm0gPSB1dWZsb3dNYW5hZ2VyRm9ySW5pdEFwcHJvdmFsLmdldEZvcm0oZmxvdy5mb3JtKVxuXG5cdHBlcm1pc3Npb25zID0gcGVybWlzc2lvbk1hbmFnZXIuZ2V0Rmxvd1Blcm1pc3Npb25zKGZsb3dfaWQsIHVzZXJfaWQpXG5cblx0aWYgbm90IHBlcm1pc3Npb25zLmluY2x1ZGVzKFwiYWRkXCIpXG5cdFx0dGhyb3cgbmV3IE1ldGVvci5FcnJvcignZXJyb3IhJywgXCLlvZPliY3nlKjmiLfmsqHmnInmraTmtYHnqIvnmoTmlrDlu7rmnYPpmZBcIilcblxuXHRub3cgPSBuZXcgRGF0ZVxuXHRpbnNfb2JqID0ge31cblx0aW5zX29iai5faWQgPSBDcmVhdG9yLkNvbGxlY3Rpb25zLmluc3RhbmNlcy5fbWFrZU5ld0lEKClcblx0aW5zX29iai5zcGFjZSA9IHNwYWNlX2lkXG5cdGluc19vYmouZmxvdyA9IGZsb3dfaWRcblx0aW5zX29iai5mbG93X3ZlcnNpb24gPSBmbG93LmN1cnJlbnQuX2lkXG5cdGluc19vYmouZm9ybSA9IGZsb3cuZm9ybVxuXHRpbnNfb2JqLmZvcm1fdmVyc2lvbiA9IGZsb3cuY3VycmVudC5mb3JtX3ZlcnNpb25cblx0aW5zX29iai5uYW1lID0gZmxvdy5uYW1lXG5cdGluc19vYmouc3VibWl0dGVyID0gdXNlcl9pZFxuXHRpbnNfb2JqLnN1Ym1pdHRlcl9uYW1lID0gdXNlcl9pbmZvLm5hbWVcblx0aW5zX29iai5hcHBsaWNhbnQgPSBpZiBpbnN0YW5jZV9mcm9tX2NsaWVudFtcImFwcGxpY2FudFwiXSB0aGVuIGluc3RhbmNlX2Zyb21fY2xpZW50W1wiYXBwbGljYW50XCJdIGVsc2UgdXNlcl9pZFxuXHRpbnNfb2JqLmFwcGxpY2FudF9uYW1lID0gaWYgaW5zdGFuY2VfZnJvbV9jbGllbnRbXCJhcHBsaWNhbnRfbmFtZVwiXSB0aGVuIGluc3RhbmNlX2Zyb21fY2xpZW50W1wiYXBwbGljYW50X25hbWVcIl0gZWxzZSB1c2VyX2luZm8ubmFtZVxuXHRpbnNfb2JqLmFwcGxpY2FudF9vcmdhbml6YXRpb24gPSBpZiBpbnN0YW5jZV9mcm9tX2NsaWVudFtcImFwcGxpY2FudF9vcmdhbml6YXRpb25cIl0gdGhlbiBpbnN0YW5jZV9mcm9tX2NsaWVudFtcImFwcGxpY2FudF9vcmdhbml6YXRpb25cIl0gZWxzZSBzcGFjZV91c2VyLm9yZ2FuaXphdGlvblxuXHRpbnNfb2JqLmFwcGxpY2FudF9vcmdhbml6YXRpb25fbmFtZSA9IGlmIGluc3RhbmNlX2Zyb21fY2xpZW50W1wiYXBwbGljYW50X29yZ2FuaXphdGlvbl9uYW1lXCJdIHRoZW4gaW5zdGFuY2VfZnJvbV9jbGllbnRbXCJhcHBsaWNhbnRfb3JnYW5pemF0aW9uX25hbWVcIl0gZWxzZSBzcGFjZV91c2VyX29yZ19pbmZvLm9yZ2FuaXphdGlvbl9uYW1lXG5cdGluc19vYmouYXBwbGljYW50X29yZ2FuaXphdGlvbl9mdWxsbmFtZSA9IGlmIGluc3RhbmNlX2Zyb21fY2xpZW50W1wiYXBwbGljYW50X29yZ2FuaXphdGlvbl9mdWxsbmFtZVwiXSB0aGVuIGluc3RhbmNlX2Zyb21fY2xpZW50W1wiYXBwbGljYW50X29yZ2FuaXphdGlvbl9mdWxsbmFtZVwiXSBlbHNlICBzcGFjZV91c2VyX29yZ19pbmZvLm9yZ2FuaXphdGlvbl9mdWxsbmFtZVxuXHRpbnNfb2JqLmFwcGxpY2FudF9jb21wYW55ID0gaWYgaW5zdGFuY2VfZnJvbV9jbGllbnRbXCJhcHBsaWNhbnRfY29tcGFueVwiXSB0aGVuIGluc3RhbmNlX2Zyb21fY2xpZW50W1wiYXBwbGljYW50X2NvbXBhbnlcIl0gZWxzZSBzcGFjZV91c2VyLmNvbXBhbnlfaWRcblx0aW5zX29iai5zdGF0ZSA9ICdkcmFmdCdcblx0aW5zX29iai5jb2RlID0gJydcblx0aW5zX29iai5pc19hcmNoaXZlZCA9IGZhbHNlXG5cdGluc19vYmouaXNfZGVsZXRlZCA9IGZhbHNlXG5cdGluc19vYmouY3JlYXRlZCA9IG5vd1xuXHRpbnNfb2JqLmNyZWF0ZWRfYnkgPSB1c2VyX2lkXG5cdGluc19vYmoubW9kaWZpZWQgPSBub3dcblx0aW5zX29iai5tb2RpZmllZF9ieSA9IHVzZXJfaWRcblxuXHRpbnNfb2JqLnJlY29yZF9pZHMgPSBpbnN0YW5jZV9mcm9tX2NsaWVudFtcInJlY29yZF9pZHNcIl1cblxuXHRpZiBzcGFjZV91c2VyLmNvbXBhbnlfaWRcblx0XHRpbnNfb2JqLmNvbXBhbnlfaWQgPSBzcGFjZV91c2VyLmNvbXBhbnlfaWRcblxuXHQjIOaWsOW7ulRyYWNlXG5cdHRyYWNlX29iaiA9IHt9XG5cdHRyYWNlX29iai5faWQgPSBuZXcgTW9uZ28uT2JqZWN0SUQoKS5fc3RyXG5cdHRyYWNlX29iai5pbnN0YW5jZSA9IGluc19vYmouX2lkXG5cdHRyYWNlX29iai5pc19maW5pc2hlZCA9IGZhbHNlXG5cdCMg5b2T5YmN5pyA5paw54mIZmxvd+S4reW8gOWni+iKgueCuVxuXHRzdGFydF9zdGVwID0gXy5maW5kKGZsb3cuY3VycmVudC5zdGVwcywgKHN0ZXApIC0+XG5cdFx0cmV0dXJuIHN0ZXAuc3RlcF90eXBlIGlzICdzdGFydCdcblx0KVxuXHR0cmFjZV9vYmouc3RlcCA9IHN0YXJ0X3N0ZXAuX2lkXG5cdHRyYWNlX29iai5uYW1lID0gc3RhcnRfc3RlcC5uYW1lXG5cblx0dHJhY2Vfb2JqLnN0YXJ0X2RhdGUgPSBub3dcblx0IyDmlrDlu7pBcHByb3ZlXG5cdGFwcHJfb2JqID0ge31cblx0YXBwcl9vYmouX2lkID0gbmV3IE1vbmdvLk9iamVjdElEKCkuX3N0clxuXHRhcHByX29iai5pbnN0YW5jZSA9IGluc19vYmouX2lkXG5cdGFwcHJfb2JqLnRyYWNlID0gdHJhY2Vfb2JqLl9pZFxuXHRhcHByX29iai5pc19maW5pc2hlZCA9IGZhbHNlXG5cdGFwcHJfb2JqLnVzZXIgPSBpZiBpbnN0YW5jZV9mcm9tX2NsaWVudFtcImFwcGxpY2FudFwiXSB0aGVuIGluc3RhbmNlX2Zyb21fY2xpZW50W1wiYXBwbGljYW50XCJdIGVsc2UgdXNlcl9pZFxuXHRhcHByX29iai51c2VyX25hbWUgPSBpZiBpbnN0YW5jZV9mcm9tX2NsaWVudFtcImFwcGxpY2FudF9uYW1lXCJdIHRoZW4gaW5zdGFuY2VfZnJvbV9jbGllbnRbXCJhcHBsaWNhbnRfbmFtZVwiXSBlbHNlIHVzZXJfaW5mby5uYW1lXG5cdGFwcHJfb2JqLmhhbmRsZXIgPSB1c2VyX2lkXG5cdGFwcHJfb2JqLmhhbmRsZXJfbmFtZSA9IHVzZXJfaW5mby5uYW1lXG5cdGFwcHJfb2JqLmhhbmRsZXJfb3JnYW5pemF0aW9uID0gc3BhY2VfdXNlci5vcmdhbml6YXRpb25cblx0YXBwcl9vYmouaGFuZGxlcl9vcmdhbml6YXRpb25fbmFtZSA9IHNwYWNlX3VzZXJfb3JnX2luZm8ubmFtZVxuXHRhcHByX29iai5oYW5kbGVyX29yZ2FuaXphdGlvbl9mdWxsbmFtZSA9IHNwYWNlX3VzZXJfb3JnX2luZm8uZnVsbG5hbWVcblx0YXBwcl9vYmoudHlwZSA9ICdkcmFmdCdcblx0YXBwcl9vYmouc3RhcnRfZGF0ZSA9IG5vd1xuXHRhcHByX29iai5yZWFkX2RhdGUgPSBub3dcblx0YXBwcl9vYmouaXNfcmVhZCA9IHRydWVcblx0YXBwcl9vYmouaXNfZXJyb3IgPSBmYWxzZVxuXHRhcHByX29iai5kZXNjcmlwdGlvbiA9ICcnXG5cdHJlbGF0ZWRUYWJsZXNJbmZvID0ge31cblx0YXBwcl9vYmoudmFsdWVzID0gdXVmbG93TWFuYWdlckZvckluaXRBcHByb3ZhbC5pbml0aWF0ZVZhbHVlcyhpbnNfb2JqLnJlY29yZF9pZHNbMF0sIGZsb3dfaWQsIHNwYWNlX2lkLCBmb3JtLmN1cnJlbnQuZmllbGRzLCByZWxhdGVkVGFibGVzSW5mbylcblxuXHR0cmFjZV9vYmouYXBwcm92ZXMgPSBbYXBwcl9vYmpdXG5cdGluc19vYmoudHJhY2VzID0gW3RyYWNlX29ial1cblxuXHRpbnNfb2JqLnZhbHVlcyA9IGFwcHJfb2JqLnZhbHVlc1xuXG5cdGluc19vYmouaW5ib3hfdXNlcnMgPSBpbnN0YW5jZV9mcm9tX2NsaWVudC5pbmJveF91c2VycyB8fCBbXVxuXG5cdGluc19vYmouY3VycmVudF9zdGVwX25hbWUgPSBzdGFydF9zdGVwLm5hbWVcblxuXHRpZiBmbG93LmF1dG9fcmVtaW5kIGlzIHRydWVcblx0XHRpbnNfb2JqLmF1dG9fcmVtaW5kID0gdHJ1ZVxuXG5cdCMg5paw5bu655Sz6K+35Y2V5pe277yMaW5zdGFuY2Vz6K6w5b2V5rWB56iL5ZCN56ew44CB5rWB56iL5YiG57G75ZCN56ewICMxMzEzXG5cdGluc19vYmouZmxvd19uYW1lID0gZmxvdy5uYW1lXG5cdGlmIGZvcm0uY2F0ZWdvcnlcblx0XHRjYXRlZ29yeSA9IHV1Zmxvd01hbmFnZXJGb3JJbml0QXBwcm92YWwuZ2V0Q2F0ZWdvcnkoZm9ybS5jYXRlZ29yeSlcblx0XHRpZiBjYXRlZ29yeVxuXHRcdFx0aW5zX29iai5jYXRlZ29yeV9uYW1lID0gY2F0ZWdvcnkubmFtZVxuXHRcdFx0aW5zX29iai5jYXRlZ29yeSA9IGNhdGVnb3J5Ll9pZFxuXG5cdG5ld19pbnNfaWQgPSBDcmVhdG9yLkNvbGxlY3Rpb25zLmluc3RhbmNlcy5pbnNlcnQoaW5zX29iailcblxuXHR1dWZsb3dNYW5hZ2VyRm9ySW5pdEFwcHJvdmFsLmluaXRpYXRlUmVjb3JkSW5zdGFuY2VJbmZvKGluc19vYmoucmVjb3JkX2lkc1swXSwgbmV3X2luc19pZCwgc3BhY2VfaWQpXG5cblx0IyB1dWZsb3dNYW5hZ2VyRm9ySW5pdEFwcHJvdmFsLmluaXRpYXRlUmVsYXRlZFJlY29yZEluc3RhbmNlSW5mbyhyZWxhdGVkVGFibGVzSW5mbywgbmV3X2luc19pZCwgc3BhY2VfaWQpXG5cblx0dXVmbG93TWFuYWdlckZvckluaXRBcHByb3ZhbC5pbml0aWF0ZUF0dGFjaChpbnNfb2JqLnJlY29yZF9pZHNbMF0sIHNwYWNlX2lkLCBpbnNfb2JqLl9pZCwgYXBwcl9vYmouX2lkKVxuXG5cdHJldHVybiBuZXdfaW5zX2lkXG5cbnV1Zmxvd01hbmFnZXJGb3JJbml0QXBwcm92YWwuaW5pdGlhdGVWYWx1ZXMgPSAocmVjb3JkSWRzLCBmbG93SWQsIHNwYWNlSWQsIGZpZWxkcywgcmVsYXRlZFRhYmxlc0luZm8pIC0+XG5cdGZpZWxkQ29kZXMgPSBbXVxuXHRfLmVhY2ggZmllbGRzLCAoZikgLT5cblx0XHRpZiBmLnR5cGUgPT0gJ3NlY3Rpb24nXG5cdFx0XHRfLmVhY2ggZi5maWVsZHMsIChmZikgLT5cblx0XHRcdFx0ZmllbGRDb2Rlcy5wdXNoIGZmLmNvZGVcblx0XHRlbHNlXG5cdFx0XHRmaWVsZENvZGVzLnB1c2ggZi5jb2RlXG5cblx0dmFsdWVzID0ge31cblx0b2JqZWN0TmFtZSA9IHJlY29yZElkcy5vXG5cdG9iamVjdCA9IGdldE9iamVjdENvbmZpZyhvYmplY3ROYW1lKVxuXHRyZWNvcmRJZCA9IHJlY29yZElkcy5pZHNbMF1cblx0b3cgPSBDcmVhdG9yLkNvbGxlY3Rpb25zLm9iamVjdF93b3JrZmxvd3MuZmluZE9uZSh7XG5cdFx0b2JqZWN0X25hbWU6IG9iamVjdE5hbWUsXG5cdFx0Zmxvd19pZDogZmxvd0lkXG5cdH0pXG5cdCMgcmVjb3JkID0gQ3JlYXRvci5nZXRDb2xsZWN0aW9uKG9iamVjdE5hbWUsIHNwYWNlSWQpLmZpbmRPbmUocmVjb3JkSWQpXG5cdHJlY29yZCA9IG9iamVjdEZpbmRPbmUob2JqZWN0TmFtZSwgeyBmaWx0ZXJzOiBbWydfaWQnLCAnPScsIHJlY29yZElkXV19KVxuXHRmbG93ID0gQ3JlYXRvci5nZXRDb2xsZWN0aW9uKCdmbG93cycpLmZpbmRPbmUoZmxvd0lkLCB7IGZpZWxkczogeyBmb3JtOiAxIH0gfSlcblx0aWYgb3cgYW5kIHJlY29yZFxuXHRcdGZvcm0gPSBDcmVhdG9yLmdldENvbGxlY3Rpb24oXCJmb3Jtc1wiKS5maW5kT25lKGZsb3cuZm9ybSlcblx0XHRmb3JtRmllbGRzID0gZm9ybS5jdXJyZW50LmZpZWxkcyB8fCBbXVxuXHRcdHJlbGF0ZWRPYmplY3RzID0gZ2V0UmVsYXRlZHMob2JqZWN0TmFtZSlcblx0XHRyZWxhdGVkT2JqZWN0c0tleXMgPSBfLnBsdWNrKHJlbGF0ZWRPYmplY3RzLCAnb2JqZWN0X25hbWUnKVxuXHRcdGZvcm1UYWJsZUZpZWxkcyA9IF8uZmlsdGVyIGZvcm1GaWVsZHMsIChmb3JtRmllbGQpIC0+XG5cdFx0XHRyZXR1cm4gZm9ybUZpZWxkLnR5cGUgPT0gJ3RhYmxlJ1xuXHRcdGZvcm1UYWJsZUZpZWxkc0NvZGUgPSBfLnBsdWNrKGZvcm1UYWJsZUZpZWxkcywgJ2NvZGUnKVxuXG5cdFx0Z2V0UmVsYXRlZE9iamVjdEZpZWxkQ29kZSA9ICAoa2V5KSAtPlxuXHRcdFx0cmV0dXJuIF8uZmluZCByZWxhdGVkT2JqZWN0c0tleXMsICAocmVsYXRlZE9iamVjdHNLZXkpIC0+XG5cdFx0XHRcdHJldHVybiBrZXkuc3RhcnRzV2l0aChyZWxhdGVkT2JqZWN0c0tleSArICcuJylcblxuXHRcdGdldEZvcm1UYWJsZUZpZWxkQ29kZSA9IChrZXkpIC0+XG5cdFx0XHRyZXR1cm4gXy5maW5kIGZvcm1UYWJsZUZpZWxkc0NvZGUsICAoZm9ybVRhYmxlRmllbGRDb2RlKSAtPlxuXHRcdFx0XHRyZXR1cm4ga2V5LnN0YXJ0c1dpdGgoZm9ybVRhYmxlRmllbGRDb2RlICsgJy4nKVxuXG5cdFx0Z2V0Rm9ybVRhYmxlRmllbGQgPSAoa2V5KSAtPlxuXHRcdFx0cmV0dXJuIF8uZmluZCBmb3JtVGFibGVGaWVsZHMsICAoZikgLT5cblx0XHRcdFx0cmV0dXJuIGYuY29kZSA9PSBrZXlcblxuXHRcdGdldEZvcm1GaWVsZCA9IChrZXkpIC0+XG5cdFx0XHRmZiA9IG51bGxcblx0XHRcdF8uZm9yRWFjaCBmb3JtRmllbGRzLCAoZikgLT5cblx0XHRcdFx0aWYgZmZcblx0XHRcdFx0XHRyZXR1cm5cblx0XHRcdFx0aWYgZi50eXBlID09ICdzZWN0aW9uJ1xuXHRcdFx0XHRcdGZmID0gXy5maW5kIGYuZmllbGRzLCAgKHNmKSAtPlxuXHRcdFx0XHRcdFx0cmV0dXJuIHNmLmNvZGUgPT0ga2V5XG5cdFx0XHRcdGVsc2UgaWYgZi5jb2RlID09IGtleVxuXHRcdFx0XHRcdGZmID0gZlxuXG5cdFx0XHRyZXR1cm4gZmZcblxuXHRcdGdldEZvcm1UYWJsZVN1YkZpZWxkID0gKHRhYmxlRmllbGQsIHN1YkZpZWxkQ29kZSkgLT5cblx0XHRcdHJldHVybiBfLmZpbmQgdGFibGVGaWVsZC5maWVsZHMsICAoZikgLT5cblx0XHRcdFx0cmV0dXJuIGYuY29kZSA9PSBzdWJGaWVsZENvZGVcblxuXHRcdGdldEZpZWxkT2RhdGFWYWx1ZSA9IChvYmpOYW1lLCBpZCkgLT5cblx0XHRcdCMgb2JqID0gQ3JlYXRvci5nZXRDb2xsZWN0aW9uKG9iak5hbWUpXG5cdFx0XHRvYmogPSBvYmplY3RxbC5nZXRPYmplY3Qob2JqTmFtZSlcblx0XHRcdG5hbWVLZXkgPSBnZXRPYmplY3ROYW1lRmllbGRLZXkob2JqTmFtZSlcblx0XHRcdGlmICFvYmpcblx0XHRcdFx0cmV0dXJuXG5cdFx0XHRpZiBfLmlzU3RyaW5nIGlkXG5cdFx0XHRcdCMgX3JlY29yZCA9IG9iai5maW5kT25lKGlkKVxuXHRcdFx0XHRfcmVjb3JkID0gb2JqZWN0RmluZE9uZShvYmpOYW1lLCB7IGZpbHRlcnM6IFtbJ19pZCcsICc9JywgaWRdXX0pXG5cdFx0XHRcdGlmIF9yZWNvcmRcblx0XHRcdFx0XHRfcmVjb3JkWydAbGFiZWwnXSA9IF9yZWNvcmRbbmFtZUtleV1cblx0XHRcdFx0XHRyZXR1cm4gX3JlY29yZFxuXHRcdFx0ZWxzZSBpZiBfLmlzQXJyYXkgaWRcblx0XHRcdFx0X3JlY29yZHMgPSBbXVxuXHRcdFx0XHQjIG9iai5maW5kKHsgX2lkOiB7ICRpbjogaWQgfSB9KVxuXHRcdFx0XHRvYmplY3RGaW5kKG9iak5hbWUsIHsgZmlsdGVyczogW1snX2lkJywgJ2luJywgaWRdXX0pLmZvckVhY2ggKF9yZWNvcmQpIC0+XG5cdFx0XHRcdFx0X3JlY29yZFsnQGxhYmVsJ10gPSBfcmVjb3JkW25hbWVLZXldXG5cdFx0XHRcdFx0X3JlY29yZHMucHVzaCBfcmVjb3JkXG5cdFx0XHRcdGlmICFfLmlzRW1wdHkgX3JlY29yZHNcblx0XHRcdFx0XHRyZXR1cm4gX3JlY29yZHNcblx0XHRcdHJldHVyblxuXG5cdFx0Z2V0U2VsZWN0VXNlclZhbHVlID0gKHVzZXJJZCwgc3BhY2VJZCkgLT5cblx0XHRcdHN1ID0gQ3JlYXRvci5nZXRDb2xsZWN0aW9uKCdzcGFjZV91c2VycycpLmZpbmRPbmUoeyBzcGFjZTogc3BhY2VJZCwgdXNlcjogdXNlcklkIH0pXG5cdFx0XHRzdS5pZCA9IHVzZXJJZFxuXHRcdFx0cmV0dXJuIHN1XG5cblx0XHRnZXRTZWxlY3RVc2VyVmFsdWVzID0gKHVzZXJJZHMsIHNwYWNlSWQpIC0+XG5cdFx0XHRzdXMgPSBbXVxuXHRcdFx0aWYgXy5pc0FycmF5IHVzZXJJZHNcblx0XHRcdFx0Xy5lYWNoIHVzZXJJZHMsICh1c2VySWQpIC0+XG5cdFx0XHRcdFx0c3UgPSBnZXRTZWxlY3RVc2VyVmFsdWUodXNlcklkLCBzcGFjZUlkKVxuXHRcdFx0XHRcdGlmIHN1XG5cdFx0XHRcdFx0XHRzdXMucHVzaChzdSlcblx0XHRcdHJldHVybiBzdXNcblxuXHRcdGdldFNlbGVjdE9yZ1ZhbHVlID0gKG9yZ0lkLCBzcGFjZUlkKSAtPlxuXHRcdFx0b3JnID0gQ3JlYXRvci5nZXRDb2xsZWN0aW9uKCdvcmdhbml6YXRpb25zJykuZmluZE9uZShvcmdJZCwgeyBmaWVsZHM6IHsgX2lkOiAxLCBuYW1lOiAxLCBmdWxsbmFtZTogMSB9IH0pXG5cdFx0XHRvcmcuaWQgPSBvcmdJZFxuXHRcdFx0cmV0dXJuIG9yZ1xuXG5cdFx0Z2V0U2VsZWN0T3JnVmFsdWVzID0gKG9yZ0lkcywgc3BhY2VJZCkgLT5cblx0XHRcdG9yZ3MgPSBbXVxuXHRcdFx0aWYgXy5pc0FycmF5IG9yZ0lkc1xuXHRcdFx0XHRfLmVhY2ggb3JnSWRzLCAob3JnSWQpIC0+XG5cdFx0XHRcdFx0b3JnID0gZ2V0U2VsZWN0T3JnVmFsdWUob3JnSWQsIHNwYWNlSWQpXG5cdFx0XHRcdFx0aWYgb3JnXG5cdFx0XHRcdFx0XHRvcmdzLnB1c2gob3JnKVxuXHRcdFx0cmV0dXJuIG9yZ3NcblxuXHRcdHRhYmxlRmllbGRDb2RlcyA9IFtdXG5cdFx0dGFibGVGaWVsZE1hcCA9IFtdXG5cdFx0dGFibGVUb1JlbGF0ZWRNYXAgPSB7fVxuXG5cdFx0b3cuZmllbGRfbWFwPy5mb3JFYWNoIChmbSkgLT5cblx0XHRcdG9iamVjdF9maWVsZCA9IGZtLm9iamVjdF9maWVsZFxuXHRcdFx0d29ya2Zsb3dfZmllbGQgPSBmbS53b3JrZmxvd19maWVsZFxuXHRcdFx0aWYgIW9iamVjdF9maWVsZCB8fCAhd29ya2Zsb3dfZmllbGRcblx0XHRcdFx0dGhyb3cgbmV3IE1ldGVvci5FcnJvcig0MDAsICfmnKrmib7liLDlrZfmrrXvvIzor7fmo4Dmn6Xlr7nosaHmtYHnqIvmmKDlsITlrZfmrrXphY3nva4nKVxuXHRcdFx0cmVsYXRlZE9iamVjdEZpZWxkQ29kZSA9IGdldFJlbGF0ZWRPYmplY3RGaWVsZENvZGUob2JqZWN0X2ZpZWxkKVxuXHRcdFx0Zm9ybVRhYmxlRmllbGRDb2RlID0gZ2V0Rm9ybVRhYmxlRmllbGRDb2RlKHdvcmtmbG93X2ZpZWxkKVxuXHRcdFx0b2JqRmllbGQgPSBvYmplY3QuZmllbGRzW29iamVjdF9maWVsZF1cblx0XHRcdGZvcm1GaWVsZCA9IGdldEZvcm1GaWVsZCh3b3JrZmxvd19maWVsZClcblx0XHRcdCMg5aSE55CG5a2Q6KGo5a2X5q61XG5cdFx0XHRpZiByZWxhdGVkT2JqZWN0RmllbGRDb2RlXG5cdFx0XHRcdFxuXHRcdFx0XHRvVGFibGVDb2RlID0gb2JqZWN0X2ZpZWxkLnNwbGl0KCcuJylbMF1cblx0XHRcdFx0b1RhYmxlRmllbGRDb2RlID0gb2JqZWN0X2ZpZWxkLnNwbGl0KCcuJylbMV1cblx0XHRcdFx0dGFibGVUb1JlbGF0ZWRNYXBLZXkgPSBvVGFibGVDb2RlXG5cdFx0XHRcdGlmICF0YWJsZVRvUmVsYXRlZE1hcFt0YWJsZVRvUmVsYXRlZE1hcEtleV1cblx0XHRcdFx0XHR0YWJsZVRvUmVsYXRlZE1hcFt0YWJsZVRvUmVsYXRlZE1hcEtleV0gPSB7fVxuXG5cdFx0XHRcdGlmIGZvcm1UYWJsZUZpZWxkQ29kZVxuXHRcdFx0XHRcdHdUYWJsZUNvZGUgPSB3b3JrZmxvd19maWVsZC5zcGxpdCgnLicpWzBdXG5cdFx0XHRcdFx0dGFibGVUb1JlbGF0ZWRNYXBbdGFibGVUb1JlbGF0ZWRNYXBLZXldWydfRlJPTV9UQUJMRV9DT0RFJ10gPSB3VGFibGVDb2RlXG5cblx0XHRcdFx0dGFibGVUb1JlbGF0ZWRNYXBbdGFibGVUb1JlbGF0ZWRNYXBLZXldW29UYWJsZUZpZWxkQ29kZV0gPSB3b3JrZmxvd19maWVsZFxuXHRcdFx0IyDliKTmlq3mmK/lkKbmmK/ooajmoLzlrZfmrrVcblx0XHRcdGVsc2UgaWYgd29ya2Zsb3dfZmllbGQuaW5kZXhPZignLicpID4gMCBhbmQgb2JqZWN0X2ZpZWxkLmluZGV4T2YoJy4kLicpID4gMFxuXHRcdFx0XHR3VGFibGVDb2RlID0gd29ya2Zsb3dfZmllbGQuc3BsaXQoJy4nKVswXVxuXHRcdFx0XHRvVGFibGVDb2RlID0gb2JqZWN0X2ZpZWxkLnNwbGl0KCcuJC4nKVswXVxuXHRcdFx0XHRpZiByZWNvcmQuaGFzT3duUHJvcGVydHkob1RhYmxlQ29kZSkgYW5kIF8uaXNBcnJheShyZWNvcmRbb1RhYmxlQ29kZV0pXG5cdFx0XHRcdFx0dGFibGVGaWVsZENvZGVzLnB1c2goSlNPTi5zdHJpbmdpZnkoe1xuXHRcdFx0XHRcdFx0d29ya2Zsb3dfdGFibGVfZmllbGRfY29kZTogd1RhYmxlQ29kZSxcblx0XHRcdFx0XHRcdG9iamVjdF90YWJsZV9maWVsZF9jb2RlOiBvVGFibGVDb2RlXG5cdFx0XHRcdFx0fSkpXG5cdFx0XHRcdFx0dGFibGVGaWVsZE1hcC5wdXNoKGZtKVxuXHRcdFx0XHRlbHNlIGlmIG9UYWJsZUNvZGUuaW5kZXhPZignLicpID4gMCAjIOivtOaYjuaYr+WFs+iBlOihqOeahGdyaWTlrZfmrrVcblx0XHRcdFx0XHRvVGFibGVDb2RlUmVmZXJlbmNlRmllbGRDb2RlID0gb1RhYmxlQ29kZS5zcGxpdCgnLicpWzBdO1xuXHRcdFx0XHRcdGdyaWRDb2RlID0gb1RhYmxlQ29kZS5zcGxpdCgnLicpWzFdO1xuXHRcdFx0XHRcdG9UYWJsZUNvZGVSZWZlcmVuY2VGaWVsZCA9IG9iamVjdC5maWVsZHNbb1RhYmxlQ29kZVJlZmVyZW5jZUZpZWxkQ29kZV07XG5cdFx0XHRcdFx0aWYgb1RhYmxlQ29kZVJlZmVyZW5jZUZpZWxkICYmIFsnbG9va3VwJywgJ21hc3Rlcl9kZXRhaWwnXS5pbmNsdWRlcyhvVGFibGVDb2RlUmVmZXJlbmNlRmllbGQudHlwZSkgJiYgXy5pc1N0cmluZyhvVGFibGVDb2RlUmVmZXJlbmNlRmllbGQucmVmZXJlbmNlX3RvKVxuXHRcdFx0XHRcdFx0aWYgcmVjb3JkW29UYWJsZUNvZGVdXG5cdFx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHRcdHJlZmVyZW5jZVRvT2JqZWN0TmFtZSA9IG9UYWJsZUNvZGVSZWZlcmVuY2VGaWVsZC5yZWZlcmVuY2VfdG87XG5cdFx0XHRcdFx0XHRyZWZlcmVuY2VUb0ZpZWxkVmFsdWUgPSByZWNvcmRbb1RhYmxlQ29kZVJlZmVyZW5jZUZpZWxkLm5hbWVdO1xuXHRcdFx0XHRcdFx0cmVmZXJlbmNlVG9Eb2MgPSBnZXRGaWVsZE9kYXRhVmFsdWUocmVmZXJlbmNlVG9PYmplY3ROYW1lLCByZWZlcmVuY2VUb0ZpZWxkVmFsdWUpO1xuXHRcdFx0XHRcdFx0aWYgcmVmZXJlbmNlVG9Eb2NbZ3JpZENvZGVdXG5cdFx0XHRcdFx0XHRcdHJlY29yZFtvVGFibGVDb2RlXSA9IHJlZmVyZW5jZVRvRG9jW2dyaWRDb2RlXTtcblx0XHRcdFx0XHRcdFx0dGFibGVGaWVsZENvZGVzLnB1c2goSlNPTi5zdHJpbmdpZnkoe1xuXHRcdFx0XHRcdFx0XHRcdHdvcmtmbG93X3RhYmxlX2ZpZWxkX2NvZGU6IHdUYWJsZUNvZGUsXG5cdFx0XHRcdFx0XHRcdFx0b2JqZWN0X3RhYmxlX2ZpZWxkX2NvZGU6IG9UYWJsZUNvZGVcblx0XHRcdFx0XHRcdFx0fSkpO1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdGFibGVGaWVsZE1hcC5wdXNoKGZtKTtcblxuXHRcdFx0IyDlpITnkIZsb29rdXDjgIFtYXN0ZXJfZGV0YWls57G75Z6L5a2X5q61XG5cdFx0XHRlbHNlIGlmIG9iamVjdF9maWVsZC5pbmRleE9mKCcuJykgPiAwIGFuZCBvYmplY3RfZmllbGQuaW5kZXhPZignLiQuJykgPT0gLTFcblx0XHRcdFx0b2JqZWN0RmllbGROYW1lID0gb2JqZWN0X2ZpZWxkLnNwbGl0KCcuJylbMF1cblx0XHRcdFx0bG9va3VwRmllbGROYW1lID0gb2JqZWN0X2ZpZWxkLnNwbGl0KCcuJylbMV1cblx0XHRcdFx0aWYgb2JqZWN0XG5cdFx0XHRcdFx0b2JqZWN0RmllbGQgPSBvYmplY3QuZmllbGRzW29iamVjdEZpZWxkTmFtZV1cblx0XHRcdFx0XHRpZiBvYmplY3RGaWVsZCAmJiBmb3JtRmllbGQgJiYgWydsb29rdXAnLCAnbWFzdGVyX2RldGFpbCddLmluY2x1ZGVzKG9iamVjdEZpZWxkLnR5cGUpICYmIF8uaXNTdHJpbmcob2JqZWN0RmllbGQucmVmZXJlbmNlX3RvKVxuXHRcdFx0XHRcdFx0IyBmaWVsZHNPYmogPSB7fVxuXHRcdFx0XHRcdFx0IyBmaWVsZHNPYmpbbG9va3VwRmllbGROYW1lXSA9IDFcblx0XHRcdFx0XHRcdCMgbG9va3VwT2JqZWN0UmVjb3JkID0gQ3JlYXRvci5nZXRDb2xsZWN0aW9uKG9iamVjdEZpZWxkLnJlZmVyZW5jZV90bywgc3BhY2VJZCkuZmluZE9uZShyZWNvcmRbb2JqZWN0RmllbGROYW1lXSwgeyBmaWVsZHM6IGZpZWxkc09iaiB9KVxuXHRcdFx0XHRcdFx0bG9va3VwT2JqZWN0UmVjb3JkID0gb2JqZWN0RmluZE9uZShvYmplY3RGaWVsZC5yZWZlcmVuY2VfdG8sIHsgZmlsdGVyczogW1snX2lkJywgJz0nLCByZWNvcmRbb2JqZWN0RmllbGROYW1lXV1dLCBmaWVsZHM6IFtsb29rdXBGaWVsZE5hbWVdIH0pXG5cdFx0XHRcdFx0XHRpZiAhbG9va3VwT2JqZWN0UmVjb3JkXG5cdFx0XHRcdFx0XHRcdHJldHVyblxuXHRcdFx0XHRcdFx0b2JqZWN0RmllbGRPYmplY3ROYW1lID0gb2JqZWN0RmllbGQucmVmZXJlbmNlX3RvXG5cdFx0XHRcdFx0XHRsb29rdXBGaWVsZE9iaiA9IGdldE9iamVjdENvbmZpZyhvYmplY3RGaWVsZE9iamVjdE5hbWUpXG5cdFx0XHRcdFx0XHRvYmplY3RMb29rdXBGaWVsZCA9IGxvb2t1cEZpZWxkT2JqLmZpZWxkc1tsb29rdXBGaWVsZE5hbWVdXG5cdFx0XHRcdFx0XHRyZWZlcmVuY2VUb0ZpZWxkVmFsdWUgPSBsb29rdXBPYmplY3RSZWNvcmRbbG9va3VwRmllbGROYW1lXVxuXHRcdFx0XHRcdFx0aWYgb2JqZWN0TG9va3VwRmllbGQgJiYgZm9ybUZpZWxkICYmIGZvcm1GaWVsZC50eXBlID09ICdvZGF0YScgJiYgWydsb29rdXAnLCAnbWFzdGVyX2RldGFpbCddLmluY2x1ZGVzKG9iamVjdExvb2t1cEZpZWxkLnR5cGUpICYmIF8uaXNTdHJpbmcob2JqZWN0TG9va3VwRmllbGQucmVmZXJlbmNlX3RvKVxuXHRcdFx0XHRcdFx0XHRyZWZlcmVuY2VUb09iamVjdE5hbWUgPSBvYmplY3RMb29rdXBGaWVsZC5yZWZlcmVuY2VfdG9cblx0XHRcdFx0XHRcdFx0b2RhdGFGaWVsZFZhbHVlXG5cdFx0XHRcdFx0XHRcdGlmIG9iamVjdEZpZWxkLm11bHRpcGxlICYmIGZvcm1GaWVsZC5pc19tdWx0aXNlbGVjdFxuXHRcdFx0XHRcdFx0XHRcdG9kYXRhRmllbGRWYWx1ZSA9IGdldEZpZWxkT2RhdGFWYWx1ZShyZWZlcmVuY2VUb09iamVjdE5hbWUsIHJlZmVyZW5jZVRvRmllbGRWYWx1ZSlcblx0XHRcdFx0XHRcdFx0ZWxzZSBpZiAhb2JqZWN0RmllbGQubXVsdGlwbGUgJiYgIWZvcm1GaWVsZC5pc19tdWx0aXNlbGVjdFxuXHRcdFx0XHRcdFx0XHRcdG9kYXRhRmllbGRWYWx1ZSA9IGdldEZpZWxkT2RhdGFWYWx1ZShyZWZlcmVuY2VUb09iamVjdE5hbWUsIHJlZmVyZW5jZVRvRmllbGRWYWx1ZSlcblx0XHRcdFx0XHRcdFx0dmFsdWVzW3dvcmtmbG93X2ZpZWxkXSA9IG9kYXRhRmllbGRWYWx1ZVxuXHRcdFx0XHRcdFx0ZWxzZSBpZiBvYmplY3RMb29rdXBGaWVsZCAmJiBmb3JtRmllbGQgJiYgWyd1c2VyJywgJ2dyb3VwJ10uaW5jbHVkZXMoZm9ybUZpZWxkLnR5cGUpICYmIFsnbG9va3VwJywgJ21hc3Rlcl9kZXRhaWwnXS5pbmNsdWRlcyhvYmplY3RMb29rdXBGaWVsZC50eXBlKSAmJiBbJ3VzZXJzJywgJ29yZ2FuaXphdGlvbnMnXS5pbmNsdWRlcyhvYmplY3RMb29rdXBGaWVsZC5yZWZlcmVuY2VfdG8pXG5cdFx0XHRcdFx0XHRcdGlmICFfLmlzRW1wdHkocmVmZXJlbmNlVG9GaWVsZFZhbHVlKVxuXHRcdFx0XHRcdFx0XHRcdGxvb2t1cFNlbGVjdEZpZWxkVmFsdWVcblx0XHRcdFx0XHRcdFx0XHRpZiBmb3JtRmllbGQudHlwZSA9PSAndXNlcidcblx0XHRcdFx0XHRcdFx0XHRcdGlmIG9iamVjdExvb2t1cEZpZWxkLm11bHRpcGxlICYmIGZvcm1GaWVsZC5pc19tdWx0aXNlbGVjdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRsb29rdXBTZWxlY3RGaWVsZFZhbHVlID0gZ2V0U2VsZWN0VXNlclZhbHVlcyhyZWZlcmVuY2VUb0ZpZWxkVmFsdWUsIHNwYWNlSWQpXG5cdFx0XHRcdFx0XHRcdFx0XHRlbHNlIGlmICFvYmplY3RMb29rdXBGaWVsZC5tdWx0aXBsZSAmJiAhZm9ybUZpZWxkLmlzX211bHRpc2VsZWN0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGxvb2t1cFNlbGVjdEZpZWxkVmFsdWUgPSBnZXRTZWxlY3RVc2VyVmFsdWUocmVmZXJlbmNlVG9GaWVsZFZhbHVlLCBzcGFjZUlkKVxuXHRcdFx0XHRcdFx0XHRcdGVsc2UgaWYgZm9ybUZpZWxkLnR5cGUgPT0gJ2dyb3VwJ1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYgb2JqZWN0TG9va3VwRmllbGQubXVsdGlwbGUgJiYgZm9ybUZpZWxkLmlzX211bHRpc2VsZWN0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGxvb2t1cFNlbGVjdEZpZWxkVmFsdWUgPSBnZXRTZWxlY3RPcmdWYWx1ZXMocmVmZXJlbmNlVG9GaWVsZFZhbHVlLCBzcGFjZUlkKVxuXHRcdFx0XHRcdFx0XHRcdFx0ZWxzZSBpZiAhb2JqZWN0TG9va3VwRmllbGQubXVsdGlwbGUgJiYgIWZvcm1GaWVsZC5pc19tdWx0aXNlbGVjdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRsb29rdXBTZWxlY3RGaWVsZFZhbHVlID0gZ2V0U2VsZWN0T3JnVmFsdWUocmVmZXJlbmNlVG9GaWVsZFZhbHVlLCBzcGFjZUlkKVxuXHRcdFx0XHRcdFx0XHRcdGlmIGxvb2t1cFNlbGVjdEZpZWxkVmFsdWVcblx0XHRcdFx0XHRcdFx0XHRcdHZhbHVlc1t3b3JrZmxvd19maWVsZF0gPSBsb29rdXBTZWxlY3RGaWVsZFZhbHVlXG5cdFx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0XHRcdHZhbHVlc1t3b3JrZmxvd19maWVsZF0gPSBsb29rdXBPYmplY3RSZWNvcmRbbG9va3VwRmllbGROYW1lXVxuXG5cdFx0XHQjIGxvb2t1cOOAgW1hc3Rlcl9kZXRhaWzlrZfmrrXlkIzmraXliLBvZGF0YeWtl+autVxuXHRcdFx0ZWxzZSBpZiBmb3JtRmllbGQgJiYgb2JqRmllbGQgJiYgZm9ybUZpZWxkLnR5cGUgPT0gJ29kYXRhJyAmJiBbJ2xvb2t1cCcsICdtYXN0ZXJfZGV0YWlsJ10uaW5jbHVkZXMob2JqRmllbGQudHlwZSkgJiYgXy5pc1N0cmluZyhvYmpGaWVsZC5yZWZlcmVuY2VfdG8pXG5cdFx0XHRcdHJlZmVyZW5jZVRvT2JqZWN0TmFtZSA9IG9iakZpZWxkLnJlZmVyZW5jZV90b1xuXHRcdFx0XHRyZWZlcmVuY2VUb0ZpZWxkVmFsdWUgPSByZWNvcmRbb2JqRmllbGQubmFtZV1cblx0XHRcdFx0b2RhdGFGaWVsZFZhbHVlXG5cdFx0XHRcdGlmIG9iakZpZWxkLm11bHRpcGxlICYmIGZvcm1GaWVsZC5pc19tdWx0aXNlbGVjdFxuXHRcdFx0XHRcdG9kYXRhRmllbGRWYWx1ZSA9IGdldEZpZWxkT2RhdGFWYWx1ZShyZWZlcmVuY2VUb09iamVjdE5hbWUsIHJlZmVyZW5jZVRvRmllbGRWYWx1ZSlcblx0XHRcdFx0ZWxzZSBpZiAhb2JqRmllbGQubXVsdGlwbGUgJiYgIWZvcm1GaWVsZC5pc19tdWx0aXNlbGVjdFxuXHRcdFx0XHRcdG9kYXRhRmllbGRWYWx1ZSA9IGdldEZpZWxkT2RhdGFWYWx1ZShyZWZlcmVuY2VUb09iamVjdE5hbWUsIHJlZmVyZW5jZVRvRmllbGRWYWx1ZSlcblx0XHRcdFx0dmFsdWVzW3dvcmtmbG93X2ZpZWxkXSA9IG9kYXRhRmllbGRWYWx1ZVxuXHRcdFx0ZWxzZSBpZiBmb3JtRmllbGQgJiYgb2JqRmllbGQgJiYgWyd1c2VyJywgJ2dyb3VwJ10uaW5jbHVkZXMoZm9ybUZpZWxkLnR5cGUpICYmIFsnbG9va3VwJywgJ21hc3Rlcl9kZXRhaWwnXS5pbmNsdWRlcyhvYmpGaWVsZC50eXBlKSAmJiBbJ3VzZXJzJywgJ29yZ2FuaXphdGlvbnMnXS5pbmNsdWRlcyhvYmpGaWVsZC5yZWZlcmVuY2VfdG8pXG5cdFx0XHRcdHJlZmVyZW5jZVRvRmllbGRWYWx1ZSA9IHJlY29yZFtvYmpGaWVsZC5uYW1lXVxuXHRcdFx0XHRpZiAhXy5pc0VtcHR5KHJlZmVyZW5jZVRvRmllbGRWYWx1ZSlcblx0XHRcdFx0XHRzZWxlY3RGaWVsZFZhbHVlXG5cdFx0XHRcdFx0aWYgZm9ybUZpZWxkLnR5cGUgPT0gJ3VzZXInXG5cdFx0XHRcdFx0XHRpZiBvYmpGaWVsZC5tdWx0aXBsZSAmJiBmb3JtRmllbGQuaXNfbXVsdGlzZWxlY3Rcblx0XHRcdFx0XHRcdFx0c2VsZWN0RmllbGRWYWx1ZSA9IGdldFNlbGVjdFVzZXJWYWx1ZXMocmVmZXJlbmNlVG9GaWVsZFZhbHVlLCBzcGFjZUlkKVxuXHRcdFx0XHRcdFx0ZWxzZSBpZiAhb2JqRmllbGQubXVsdGlwbGUgJiYgIWZvcm1GaWVsZC5pc19tdWx0aXNlbGVjdFxuXHRcdFx0XHRcdFx0XHRzZWxlY3RGaWVsZFZhbHVlID0gZ2V0U2VsZWN0VXNlclZhbHVlKHJlZmVyZW5jZVRvRmllbGRWYWx1ZSwgc3BhY2VJZClcblx0XHRcdFx0XHRlbHNlIGlmIGZvcm1GaWVsZC50eXBlID09ICdncm91cCdcblx0XHRcdFx0XHRcdGlmIG9iakZpZWxkLm11bHRpcGxlICYmIGZvcm1GaWVsZC5pc19tdWx0aXNlbGVjdFxuXHRcdFx0XHRcdFx0XHRzZWxlY3RGaWVsZFZhbHVlID0gZ2V0U2VsZWN0T3JnVmFsdWVzKHJlZmVyZW5jZVRvRmllbGRWYWx1ZSwgc3BhY2VJZClcblx0XHRcdFx0XHRcdGVsc2UgaWYgIW9iakZpZWxkLm11bHRpcGxlICYmICFmb3JtRmllbGQuaXNfbXVsdGlzZWxlY3Rcblx0XHRcdFx0XHRcdFx0c2VsZWN0RmllbGRWYWx1ZSA9IGdldFNlbGVjdE9yZ1ZhbHVlKHJlZmVyZW5jZVRvRmllbGRWYWx1ZSwgc3BhY2VJZClcblx0XHRcdFx0XHRpZiBzZWxlY3RGaWVsZFZhbHVlXG5cdFx0XHRcdFx0XHR2YWx1ZXNbd29ya2Zsb3dfZmllbGRdID0gc2VsZWN0RmllbGRWYWx1ZVxuXHRcdFx0ZWxzZSBpZiByZWNvcmQuaGFzT3duUHJvcGVydHkob2JqZWN0X2ZpZWxkKVxuXHRcdFx0XHR2YWx1ZXNbd29ya2Zsb3dfZmllbGRdID0gcmVjb3JkW29iamVjdF9maWVsZF1cblxuXHRcdCMg6KGo5qC85a2X5q61XG5cdFx0Xy51bmlxKHRhYmxlRmllbGRDb2RlcykuZm9yRWFjaCAodGZjKSAtPlxuXHRcdFx0YyA9IEpTT04ucGFyc2UodGZjKVxuXHRcdFx0dmFsdWVzW2Mud29ya2Zsb3dfdGFibGVfZmllbGRfY29kZV0gPSBbXVxuXHRcdFx0cmVjb3JkW2Mub2JqZWN0X3RhYmxlX2ZpZWxkX2NvZGVdLmZvckVhY2ggKHRyKSAtPlxuXHRcdFx0XHRuZXdUciA9IHt9XG5cdFx0XHRcdF8uZWFjaCB0ciwgKHYsIGspIC0+XG5cdFx0XHRcdFx0dGFibGVGaWVsZE1hcC5mb3JFYWNoICh0Zm0pIC0+XG5cdFx0XHRcdFx0XHRpZiB0Zm0ub2JqZWN0X2ZpZWxkIGlzIChjLm9iamVjdF90YWJsZV9maWVsZF9jb2RlICsgJy4kLicgKyBrKVxuXHRcdFx0XHRcdFx0XHR3VGRDb2RlID0gdGZtLndvcmtmbG93X2ZpZWxkLnNwbGl0KCcuJylbMV1cblx0XHRcdFx0XHRcdFx0bmV3VHJbd1RkQ29kZV0gPSB2XG5cdFx0XHRcdGlmIG5vdCBfLmlzRW1wdHkobmV3VHIpXG5cdFx0XHRcdFx0dmFsdWVzW2Mud29ya2Zsb3dfdGFibGVfZmllbGRfY29kZV0ucHVzaChuZXdUcilcblxuXHRcdCMg5ZCM5q2l5a2Q6KGo5pWw5o2u6Iez6KGo5Y2V6KGo5qC8XG5cdFx0Xy5lYWNoIHRhYmxlVG9SZWxhdGVkTWFwLCAgKG1hcCwga2V5KSAtPlxuXHRcdFx0dGFibGVDb2RlID0gbWFwLl9GUk9NX1RBQkxFX0NPREVcblx0XHRcdGZvcm1UYWJsZUZpZWxkID0gZ2V0Rm9ybVRhYmxlRmllbGQodGFibGVDb2RlKVxuXHRcdFx0aWYgIXRhYmxlQ29kZVxuXHRcdFx0XHRjb25zb2xlLndhcm4oJ3RhYmxlVG9SZWxhdGVkOiBbJyArIGtleSArICddIG1pc3NpbmcgY29ycmVzcG9uZGluZyB0YWJsZS4nKVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRyZWxhdGVkT2JqZWN0TmFtZSA9IGtleVxuXHRcdFx0XHR0YWJsZVZhbHVlcyA9IFtdXG5cdFx0XHRcdHJlbGF0ZWRUYWJsZUl0ZW1zID0gW11cblx0XHRcdFx0cmVsYXRlZE9iamVjdCA9IGdldE9iamVjdENvbmZpZyhyZWxhdGVkT2JqZWN0TmFtZSlcblx0XHRcdFx0cmVsYXRlZEZpZWxkID0gXy5maW5kIHJlbGF0ZWRPYmplY3QuZmllbGRzLCAoZikgLT5cblx0XHRcdFx0XHRyZXR1cm4gWydsb29rdXAnLCAnbWFzdGVyX2RldGFpbCddLmluY2x1ZGVzKGYudHlwZSkgJiYgZi5yZWZlcmVuY2VfdG8gPT0gb2JqZWN0TmFtZVxuXG5cdFx0XHRcdHJlbGF0ZWRGaWVsZE5hbWUgPSByZWxhdGVkRmllbGQubmFtZVxuXG5cdFx0XHRcdHNlbGVjdG9yID0ge31cblx0XHRcdFx0c2VsZWN0b3JbcmVsYXRlZEZpZWxkTmFtZV0gPSByZWNvcmRJZFxuXHRcdFx0XHRyZWxhdGVkQ29sbGVjdGlvbiA9IENyZWF0b3IuZ2V0Q29sbGVjdGlvbihyZWxhdGVkT2JqZWN0TmFtZSwgc3BhY2VJZClcblx0XHRcdFx0cmVsYXRlZFJlY29yZHMgPSByZWxhdGVkQ29sbGVjdGlvbi5maW5kKHNlbGVjdG9yKVxuXG5cdFx0XHRcdHJlbGF0ZWRSZWNvcmRzLmZvckVhY2ggKHJyKSAtPlxuXHRcdFx0XHRcdHRhYmxlVmFsdWVJdGVtID0ge31cblx0XHRcdFx0XHRfLmVhY2ggbWFwLCAodmFsdWVLZXksIGZpZWxkS2V5KSAtPlxuXHRcdFx0XHRcdFx0aWYgZmllbGRLZXkgIT0gJ19GUk9NX1RBQkxFX0NPREUnXG5cdFx0XHRcdFx0XHRcdHRhYmxlRmllbGRWYWx1ZVxuXHRcdFx0XHRcdFx0XHRmb3JtRmllbGRLZXlcblx0XHRcdFx0XHRcdFx0aWYgdmFsdWVLZXkuc3RhcnRzV2l0aCh0YWJsZUNvZGUgKyAnLicpXG5cdFx0XHRcdFx0XHRcdFx0Zm9ybUZpZWxkS2V5ID0gKHZhbHVlS2V5LnNwbGl0KFwiLlwiKVsxXSlcblx0XHRcdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0XHRcdGZvcm1GaWVsZEtleSA9IHZhbHVlS2V5XG5cdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRmb3JtRmllbGQgPSBnZXRGb3JtVGFibGVTdWJGaWVsZChmb3JtVGFibGVGaWVsZCwgZm9ybUZpZWxkS2V5KVxuXHRcdFx0XHRcdFx0XHRyZWxhdGVkT2JqZWN0RmllbGQgPSByZWxhdGVkT2JqZWN0LmZpZWxkc1tmaWVsZEtleV1cblx0XHRcdFx0XHRcdFx0aWYgIWZvcm1GaWVsZCB8fCAhcmVsYXRlZE9iamVjdEZpZWxkXG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuXG5cdFx0XHRcdFx0XHRcdGlmIGZvcm1GaWVsZC50eXBlID09ICdvZGF0YScgJiYgWydsb29rdXAnLCAnbWFzdGVyX2RldGFpbCddLmluY2x1ZGVzKHJlbGF0ZWRPYmplY3RGaWVsZC50eXBlKSAmJiBfLmlzU3RyaW5nKHJlbGF0ZWRPYmplY3RGaWVsZC5yZWZlcmVuY2VfdG8pXG5cdFx0XHRcdFx0XHRcdFx0cmVmZXJlbmNlVG9PYmplY3ROYW1lID0gcmVsYXRlZE9iamVjdEZpZWxkLnJlZmVyZW5jZV90b1xuXHRcdFx0XHRcdFx0XHRcdHJlZmVyZW5jZVRvRmllbGRWYWx1ZSA9IHJyW2ZpZWxkS2V5XVxuXHRcdFx0XHRcdFx0XHRcdGlmIHJlbGF0ZWRPYmplY3RGaWVsZC5tdWx0aXBsZSAmJiBmb3JtRmllbGQuaXNfbXVsdGlzZWxlY3Rcblx0XHRcdFx0XHRcdFx0XHRcdHRhYmxlRmllbGRWYWx1ZSA9IGdldEZpZWxkT2RhdGFWYWx1ZShyZWZlcmVuY2VUb09iamVjdE5hbWUsIHJlZmVyZW5jZVRvRmllbGRWYWx1ZSlcblx0XHRcdFx0XHRcdFx0XHRlbHNlIGlmICFyZWxhdGVkT2JqZWN0RmllbGQubXVsdGlwbGUgJiYgIWZvcm1GaWVsZC5pc19tdWx0aXNlbGVjdFxuXHRcdFx0XHRcdFx0XHRcdFx0dGFibGVGaWVsZFZhbHVlID0gZ2V0RmllbGRPZGF0YVZhbHVlKHJlZmVyZW5jZVRvT2JqZWN0TmFtZSwgcmVmZXJlbmNlVG9GaWVsZFZhbHVlKVxuXHRcdFx0XHRcdFx0XHRlbHNlIGlmIFsndXNlcicsICdncm91cCddLmluY2x1ZGVzKGZvcm1GaWVsZC50eXBlKSAmJiBbJ2xvb2t1cCcsICdtYXN0ZXJfZGV0YWlsJ10uaW5jbHVkZXMocmVsYXRlZE9iamVjdEZpZWxkLnR5cGUpICYmIFsndXNlcnMnLCAnb3JnYW5pemF0aW9ucyddLmluY2x1ZGVzKHJlbGF0ZWRPYmplY3RGaWVsZC5yZWZlcmVuY2VfdG8pXG5cdFx0XHRcdFx0XHRcdFx0cmVmZXJlbmNlVG9GaWVsZFZhbHVlID0gcnJbZmllbGRLZXldXG5cdFx0XHRcdFx0XHRcdFx0aWYgIV8uaXNFbXB0eShyZWZlcmVuY2VUb0ZpZWxkVmFsdWUpXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiBmb3JtRmllbGQudHlwZSA9PSAndXNlcidcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgcmVsYXRlZE9iamVjdEZpZWxkLm11bHRpcGxlICYmIGZvcm1GaWVsZC5pc19tdWx0aXNlbGVjdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRhYmxlRmllbGRWYWx1ZSA9IGdldFNlbGVjdFVzZXJWYWx1ZXMocmVmZXJlbmNlVG9GaWVsZFZhbHVlLCBzcGFjZUlkKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRlbHNlIGlmICFyZWxhdGVkT2JqZWN0RmllbGQubXVsdGlwbGUgJiYgIWZvcm1GaWVsZC5pc19tdWx0aXNlbGVjdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRhYmxlRmllbGRWYWx1ZSA9IGdldFNlbGVjdFVzZXJWYWx1ZShyZWZlcmVuY2VUb0ZpZWxkVmFsdWUsIHNwYWNlSWQpXG5cdFx0XHRcdFx0XHRcdFx0XHRlbHNlIGlmIGZvcm1GaWVsZC50eXBlID09ICdncm91cCdcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgcmVsYXRlZE9iamVjdEZpZWxkLm11bHRpcGxlICYmIGZvcm1GaWVsZC5pc19tdWx0aXNlbGVjdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRhYmxlRmllbGRWYWx1ZSA9IGdldFNlbGVjdE9yZ1ZhbHVlcyhyZWZlcmVuY2VUb0ZpZWxkVmFsdWUsIHNwYWNlSWQpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGVsc2UgaWYgIXJlbGF0ZWRPYmplY3RGaWVsZC5tdWx0aXBsZSAmJiAhZm9ybUZpZWxkLmlzX211bHRpc2VsZWN0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dGFibGVGaWVsZFZhbHVlID0gZ2V0U2VsZWN0T3JnVmFsdWUocmVmZXJlbmNlVG9GaWVsZFZhbHVlLCBzcGFjZUlkKVxuXHRcdFx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0XHRcdFx0dGFibGVGaWVsZFZhbHVlID0gcnJbZmllbGRLZXldXG5cdFx0XHRcdFx0XHRcdHRhYmxlVmFsdWVJdGVtW2Zvcm1GaWVsZEtleV0gPSB0YWJsZUZpZWxkVmFsdWVcblx0XHRcdFx0XHRpZiAhXy5pc0VtcHR5KHRhYmxlVmFsdWVJdGVtKVxuXHRcdFx0XHRcdFx0dGFibGVWYWx1ZUl0ZW0uX2lkID0gcnIuX2lkXG5cdFx0XHRcdFx0XHR0YWJsZVZhbHVlcy5wdXNoKHRhYmxlVmFsdWVJdGVtKVxuXHRcdFx0XHRcdFx0cmVsYXRlZFRhYmxlSXRlbXMucHVzaCh7IF90YWJsZTogeyBfaWQ6IHJyLl9pZCwgX2NvZGU6IHRhYmxlQ29kZSB9IH0gKVxuXG5cdFx0XHRcdHZhbHVlc1t0YWJsZUNvZGVdID0gdGFibGVWYWx1ZXNcblx0XHRcdFx0cmVsYXRlZFRhYmxlc0luZm9bcmVsYXRlZE9iamVjdE5hbWVdID0gcmVsYXRlZFRhYmxlSXRlbXNcblxuXHRcdCMg5aaC5p6c6YWN572u5LqG6ISa5pys5YiZ5omn6KGM6ISa5pysXG5cdFx0aWYgb3cuZmllbGRfbWFwX3NjcmlwdFxuXHRcdFx0Xy5leHRlbmQodmFsdWVzLCB1dWZsb3dNYW5hZ2VyRm9ySW5pdEFwcHJvdmFsLmV2YWxGaWVsZE1hcFNjcmlwdChvdy5maWVsZF9tYXBfc2NyaXB0LCBvYmplY3ROYW1lLCBzcGFjZUlkLCByZWNvcmRJZCkpXG5cblx0IyDov4fmu6Tmjol2YWx1ZXPkuK3nmoTpnZ7ms5VrZXlcblx0ZmlsdGVyVmFsdWVzID0ge31cblx0Xy5lYWNoIF8ua2V5cyh2YWx1ZXMpLCAoaykgLT5cblx0XHRpZiBmaWVsZENvZGVzLmluY2x1ZGVzKGspXG5cdFx0XHRmaWx0ZXJWYWx1ZXNba10gPSB2YWx1ZXNba11cblxuXHRyZXR1cm4gZmlsdGVyVmFsdWVzXG5cbnV1Zmxvd01hbmFnZXJGb3JJbml0QXBwcm92YWwuZXZhbEZpZWxkTWFwU2NyaXB0ID0gKGZpZWxkX21hcF9zY3JpcHQsIG9iamVjdE5hbWUsIHNwYWNlSWQsIG9iamVjdElkKSAtPlxuXHQjIHJlY29yZCA9IENyZWF0b3IuZ2V0Q29sbGVjdGlvbihvYmplY3ROYW1lLCBzcGFjZUlkKS5maW5kT25lKG9iamVjdElkKVxuXHRyZWNvcmQgPSBvYmplY3RGaW5kT25lKG9iamVjdE5hbWUsIHsgZmlsdGVyczogW1snX2lkJywgJz0nLCBvYmplY3RJZF1dIH0pXG5cdHNjcmlwdCA9IFwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAocmVjb3JkKSB7IFwiICsgZmllbGRfbWFwX3NjcmlwdCArIFwiIH1cIlxuXHRmdW5jID0gX2V2YWwoc2NyaXB0LCBcImZpZWxkX21hcF9zY3JpcHRcIilcblx0dmFsdWVzID0gZnVuYyhyZWNvcmQpXG5cdGlmIF8uaXNPYmplY3QgdmFsdWVzXG5cdFx0cmV0dXJuIHZhbHVlc1xuXHRlbHNlXG5cdFx0Y29uc29sZS5lcnJvciBcImV2YWxGaWVsZE1hcFNjcmlwdDog6ISa5pys6L+U5Zue5YC857G75Z6L5LiN5piv5a+56LGhXCJcblx0cmV0dXJuIHt9XG5cblxuXG51dWZsb3dNYW5hZ2VyRm9ySW5pdEFwcHJvdmFsLmluaXRpYXRlQXR0YWNoID0gKHJlY29yZElkcywgc3BhY2VJZCwgaW5zSWQsIGFwcHJvdmVJZCkgLT5cblxuXHRDcmVhdG9yLkNvbGxlY3Rpb25zWydjbXNfZmlsZXMnXS5maW5kKHtcblx0XHRzcGFjZTogc3BhY2VJZCxcblx0XHRwYXJlbnQ6IHJlY29yZElkc1xuXHR9KS5mb3JFYWNoIChjZikgLT5cblx0XHRfLmVhY2ggY2YudmVyc2lvbnMsICh2ZXJzaW9uSWQsIGlkeCkgLT5cblx0XHRcdGYgPSBDcmVhdG9yLkNvbGxlY3Rpb25zWydjZnMuZmlsZXMuZmlsZXJlY29yZCddLmZpbmRPbmUodmVyc2lvbklkKVxuXHRcdFx0bmV3RmlsZSA9IG5ldyBGUy5GaWxlKClcblxuXHRcdFx0bmV3RmlsZS5hdHRhY2hEYXRhIGYuY3JlYXRlUmVhZFN0cmVhbSgnZmlsZXMnKSwge1xuXHRcdFx0XHRcdHR5cGU6IGYub3JpZ2luYWwudHlwZVxuXHRcdFx0fSwgKGVycikgLT5cblx0XHRcdFx0aWYgKGVycilcblx0XHRcdFx0XHR0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKGVyci5lcnJvciwgZXJyLnJlYXNvbilcblxuXHRcdFx0XHRuZXdGaWxlLm5hbWUoZi5uYW1lKCkpXG5cdFx0XHRcdG5ld0ZpbGUuc2l6ZShmLnNpemUoKSlcblx0XHRcdFx0bWV0YWRhdGEgPSB7XG5cdFx0XHRcdFx0b3duZXI6IGYubWV0YWRhdGEub3duZXIsXG5cdFx0XHRcdFx0b3duZXJfbmFtZTogZi5tZXRhZGF0YS5vd25lcl9uYW1lLFxuXHRcdFx0XHRcdHNwYWNlOiBzcGFjZUlkLFxuXHRcdFx0XHRcdGluc3RhbmNlOiBpbnNJZCxcblx0XHRcdFx0XHRhcHByb3ZlOiBhcHByb3ZlSWRcblx0XHRcdFx0XHRwYXJlbnQ6IGNmLl9pZFxuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgaWR4IGlzIDBcblx0XHRcdFx0XHRtZXRhZGF0YS5jdXJyZW50ID0gdHJ1ZVxuXG5cdFx0XHRcdG5ld0ZpbGUubWV0YWRhdGEgPSBtZXRhZGF0YVxuXHRcdFx0XHRjZnMuaW5zdGFuY2VzLmluc2VydChuZXdGaWxlKVxuXG5cdHJldHVyblxuXG51dWZsb3dNYW5hZ2VyRm9ySW5pdEFwcHJvdmFsLmluaXRpYXRlUmVjb3JkSW5zdGFuY2VJbmZvID0gKHJlY29yZElkcywgaW5zSWQsIHNwYWNlSWQpIC0+XG5cdCMgQ3JlYXRvci5nZXRDb2xsZWN0aW9uKHJlY29yZElkcy5vLCBzcGFjZUlkKS51cGRhdGUocmVjb3JkSWRzLmlkc1swXSwge1xuXHQjIFx0JHB1c2g6IHtcblx0IyBcdFx0aW5zdGFuY2VzOiB7XG5cdCMgXHRcdFx0JGVhY2g6IFt7XG5cdCMgXHRcdFx0XHRfaWQ6IGluc0lkLFxuXHQjIFx0XHRcdFx0c3RhdGU6ICdkcmFmdCdcblx0IyBcdFx0XHR9XSxcblx0IyBcdFx0XHQkcG9zaXRpb246IDBcblx0IyBcdFx0fVxuXHQjIFx0fSxcblx0IyBcdCRzZXQ6IHtcblx0IyBcdFx0bG9ja2VkOiB0cnVlXG5cdCMgXHRcdGluc3RhbmNlX3N0YXRlOiAnZHJhZnQnXG5cdCMgXHR9XG5cdCMgfSlcblx0b2JqZWN0VXBkYXRlKHJlY29yZElkcy5vLCByZWNvcmRJZHMuaWRzWzBdLCB7XG5cdFx0aW5zdGFuY2VzOiBbe1xuXHRcdFx0X2lkOiBpbnNJZCxcblx0XHRcdHN0YXRlOiAnZHJhZnQnXG5cdFx0fV0sXG5cdFx0bG9ja2VkOiB0cnVlLFxuXHRcdGluc3RhbmNlX3N0YXRlOiAnZHJhZnQnXG5cdH0pXG5cblx0cmV0dXJuXG5cblxudXVmbG93TWFuYWdlckZvckluaXRBcHByb3ZhbC5pbml0aWF0ZVJlbGF0ZWRSZWNvcmRJbnN0YW5jZUluZm8gPSAocmVsYXRlZFRhYmxlc0luZm8sIGluc0lkLCBzcGFjZUlkKSAtPlxuXHRfLmVhY2ggcmVsYXRlZFRhYmxlc0luZm8sICh0YWJsZUl0ZW1zLCByZWxhdGVkT2JqZWN0TmFtZSkgLT5cblx0XHRyZWxhdGVkQ29sbGVjdGlvbiA9IENyZWF0b3IuZ2V0Q29sbGVjdGlvbihyZWxhdGVkT2JqZWN0TmFtZSwgc3BhY2VJZClcblx0XHRfLmVhY2ggdGFibGVJdGVtcywgKGl0ZW0pIC0+XG5cdFx0XHRyZWxhdGVkQ29sbGVjdGlvbi5kaXJlY3QudXBkYXRlKGl0ZW0uX3RhYmxlLl9pZCwge1xuXHRcdFx0XHQkc2V0OiB7XG5cdFx0XHRcdFx0aW5zdGFuY2VzOiBbe1xuXHRcdFx0XHRcdFx0X2lkOiBpbnNJZCxcblx0XHRcdFx0XHRcdHN0YXRlOiAnZHJhZnQnXG5cdFx0XHRcdFx0fV0sXG5cdFx0XHRcdFx0X3RhYmxlOiBpdGVtLl90YWJsZVxuXHRcdFx0XHR9XG5cdFx0XHR9KVxuXG5cdHJldHVyblxuXG51dWZsb3dNYW5hZ2VyRm9ySW5pdEFwcHJvdmFsLmNoZWNrSXNJbkFwcHJvdmFsID0gKHJlY29yZElkcywgc3BhY2VJZCkgLT5cblx0IyByZWNvcmQgPSBDcmVhdG9yLmdldENvbGxlY3Rpb24ocmVjb3JkSWRzLm8sIHNwYWNlSWQpLmZpbmRPbmUoe1xuXHQjIFx0X2lkOiByZWNvcmRJZHMuaWRzWzBdLCBpbnN0YW5jZXM6IHsgJGV4aXN0czogdHJ1ZSB9XG5cdCMgfSwgeyBmaWVsZHM6IHsgaW5zdGFuY2VzOiAxIH0gfSlcblx0cmVjb3JkID0gb2JqZWN0RmluZE9uZShyZWNvcmRJZHMubywgeyBmaWx0ZXJzOiBbWydfaWQnLCAnPScsIHJlY29yZElkcy5pZHNbMF1dXSwgZmllbGRzOiBbJ2luc3RhbmNlcyddIH0pXG5cblx0aWYgcmVjb3JkIGFuZCByZWNvcmQuaW5zdGFuY2VzIGFuZCByZWNvcmQuaW5zdGFuY2VzWzBdLnN0YXRlIGlzbnQgJ2NvbXBsZXRlZCcgYW5kIENyZWF0b3IuQ29sbGVjdGlvbnMuaW5zdGFuY2VzLmZpbmQocmVjb3JkLmluc3RhbmNlc1swXS5faWQpLmNvdW50KCkgPiAwXG5cdFx0dGhyb3cgbmV3IE1ldGVvci5FcnJvcignZXJyb3IhJywgXCLmraTorrDlvZXlt7Llj5HotbfmtYHnqIvmraPlnKjlrqHmibnkuK3vvIzlvoXlrqHmibnnu5PmnZ/mlrnlj6/lj5HotbfkuIvkuIDmrKHlrqHmibnvvIFcIilcblxuXHRyZXR1cm5cblxuIiwidmFyIF9ldmFsLCBnZXRPYmplY3RDb25maWcsIGdldE9iamVjdE5hbWVGaWVsZEtleSwgZ2V0UmVsYXRlZHMsIG9iamVjdEZpbmQsIG9iamVjdEZpbmRPbmUsIG9iamVjdFVwZGF0ZSwgb2JqZWN0cWw7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cbl9ldmFsID0gcmVxdWlyZSgnZXZhbCcpO1xuXG5vYmplY3RxbCA9IHJlcXVpcmUoJ0BzdGVlZG9zL29iamVjdHFsJyk7XG5cbmdldE9iamVjdENvbmZpZyA9IGZ1bmN0aW9uKG9iamVjdEFwaU5hbWUpIHtcbiAgcmV0dXJuIG9iamVjdHFsLmdldE9iamVjdChvYmplY3RBcGlOYW1lKS50b0NvbmZpZygpO1xufTtcblxuZ2V0T2JqZWN0TmFtZUZpZWxkS2V5ID0gZnVuY3Rpb24ob2JqZWN0QXBpTmFtZSkge1xuICByZXR1cm4gb2JqZWN0cWwuZ2V0T2JqZWN0KG9iamVjdEFwaU5hbWUpLk5BTUVfRklFTERfS0VZO1xufTtcblxuZ2V0UmVsYXRlZHMgPSBmdW5jdGlvbihvYmplY3RBcGlOYW1lKSB7XG4gIHJldHVybiBNZXRlb3Iud3JhcEFzeW5jKGZ1bmN0aW9uKG9iamVjdEFwaU5hbWUsIGNiKSB7XG4gICAgcmV0dXJuIG9iamVjdHFsLmdldE9iamVjdChvYmplY3RBcGlOYW1lKS5nZXRSZWxhdGVkcygpLnRoZW4oZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICByZXR1cm4gY2IocmVqZWN0LCByZXNvbHZlKTtcbiAgICB9KTtcbiAgfSkob2JqZWN0QXBpTmFtZSk7XG59O1xuXG5vYmplY3RGaW5kT25lID0gZnVuY3Rpb24ob2JqZWN0QXBpTmFtZSwgcXVlcnkpIHtcbiAgcmV0dXJuIE1ldGVvci53cmFwQXN5bmMoZnVuY3Rpb24ob2JqZWN0QXBpTmFtZSwgcXVlcnksIGNiKSB7XG4gICAgcmV0dXJuIG9iamVjdHFsLmdldE9iamVjdChvYmplY3RBcGlOYW1lKS5maW5kKHF1ZXJ5KS50aGVuKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgaWYgKHJlc29sdmUgJiYgcmVzb2x2ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJldHVybiBjYihyZWplY3QsIHJlc29sdmVbMF0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGNiKHJlamVjdCwgbnVsbCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pKG9iamVjdEFwaU5hbWUsIHF1ZXJ5KTtcbn07XG5cbm9iamVjdEZpbmQgPSBmdW5jdGlvbihvYmplY3RBcGlOYW1lLCBxdWVyeSkge1xuICByZXR1cm4gTWV0ZW9yLndyYXBBc3luYyhmdW5jdGlvbihvYmplY3RBcGlOYW1lLCBxdWVyeSwgY2IpIHtcbiAgICByZXR1cm4gb2JqZWN0cWwuZ2V0T2JqZWN0KG9iamVjdEFwaU5hbWUpLmZpbmQocXVlcnkpLnRoZW4oZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICByZXR1cm4gY2IocmVqZWN0LCByZXNvbHZlKTtcbiAgICB9KTtcbiAgfSkob2JqZWN0QXBpTmFtZSwgcXVlcnkpO1xufTtcblxub2JqZWN0VXBkYXRlID0gZnVuY3Rpb24ob2JqZWN0QXBpTmFtZSwgaWQsIGRhdGEpIHtcbiAgcmV0dXJuIE1ldGVvci53cmFwQXN5bmMoZnVuY3Rpb24ob2JqZWN0QXBpTmFtZSwgaWQsIGRhdGEsIGNiKSB7XG4gICAgcmV0dXJuIG9iamVjdHFsLmdldE9iamVjdChvYmplY3RBcGlOYW1lKS51cGRhdGUoaWQsIGRhdGEpLnRoZW4oZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICByZXR1cm4gY2IocmVqZWN0LCByZXNvbHZlKTtcbiAgICB9KTtcbiAgfSkob2JqZWN0QXBpTmFtZSwgaWQsIGRhdGEpO1xufTtcblxudXVmbG93TWFuYWdlckZvckluaXRBcHByb3ZhbCA9IHt9O1xuXG51dWZsb3dNYW5hZ2VyRm9ySW5pdEFwcHJvdmFsLmNoZWNrX2F1dGhvcml6YXRpb24gPSBmdW5jdGlvbihyZXEpIHtcbiAgdmFyIGF1dGhUb2tlbiwgaGFzaGVkVG9rZW4sIHF1ZXJ5LCB1c2VyLCB1c2VySWQ7XG4gIHF1ZXJ5ID0gcmVxLnF1ZXJ5O1xuICB1c2VySWQgPSBxdWVyeVtcIlgtVXNlci1JZFwiXTtcbiAgYXV0aFRva2VuID0gcXVlcnlbXCJYLUF1dGgtVG9rZW5cIl07XG4gIGlmICghdXNlcklkIHx8ICFhdXRoVG9rZW4pIHtcbiAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKDQwMSwgJ1VuYXV0aG9yaXplZCcpO1xuICB9XG4gIGhhc2hlZFRva2VuID0gQWNjb3VudHMuX2hhc2hMb2dpblRva2VuKGF1dGhUb2tlbik7XG4gIHVzZXIgPSBNZXRlb3IudXNlcnMuZmluZE9uZSh7XG4gICAgX2lkOiB1c2VySWQsXG4gICAgXCJzZXJ2aWNlcy5yZXN1bWUubG9naW5Ub2tlbnMuaGFzaGVkVG9rZW5cIjogaGFzaGVkVG9rZW5cbiAgfSk7XG4gIGlmICghdXNlcikge1xuICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoNDAxLCAnVW5hdXRob3JpemVkJyk7XG4gIH1cbiAgcmV0dXJuIHVzZXI7XG59O1xuXG51dWZsb3dNYW5hZ2VyRm9ySW5pdEFwcHJvdmFsLmdldFNwYWNlID0gZnVuY3Rpb24oc3BhY2VfaWQpIHtcbiAgdmFyIHNwYWNlO1xuICBzcGFjZSA9IENyZWF0b3IuQ29sbGVjdGlvbnMuc3BhY2VzLmZpbmRPbmUoc3BhY2VfaWQpO1xuICBpZiAoIXNwYWNlKSB7XG4gICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcignZXJyb3IhJywgXCJzcGFjZV9pZOacieivr+aIluatpHNwYWNl5bey57uP6KKr5Yig6ZmkXCIpO1xuICB9XG4gIHJldHVybiBzcGFjZTtcbn07XG5cbnV1Zmxvd01hbmFnZXJGb3JJbml0QXBwcm92YWwuZ2V0RmxvdyA9IGZ1bmN0aW9uKGZsb3dfaWQpIHtcbiAgdmFyIGZsb3c7XG4gIGZsb3cgPSBDcmVhdG9yLkNvbGxlY3Rpb25zLmZsb3dzLmZpbmRPbmUoZmxvd19pZCk7XG4gIGlmICghZmxvdykge1xuICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoJ2Vycm9yIScsIFwiaWTmnInor6/miJbmraTmtYHnqIvlt7Lnu4/ooqvliKDpmaRcIik7XG4gIH1cbiAgcmV0dXJuIGZsb3c7XG59O1xuXG51dWZsb3dNYW5hZ2VyRm9ySW5pdEFwcHJvdmFsLmdldFNwYWNlVXNlciA9IGZ1bmN0aW9uKHNwYWNlX2lkLCB1c2VyX2lkKSB7XG4gIHZhciBzcGFjZV91c2VyO1xuICBzcGFjZV91c2VyID0gQ3JlYXRvci5Db2xsZWN0aW9ucy5zcGFjZV91c2Vycy5maW5kT25lKHtcbiAgICBzcGFjZTogc3BhY2VfaWQsXG4gICAgdXNlcjogdXNlcl9pZFxuICB9KTtcbiAgaWYgKCFzcGFjZV91c2VyKSB7XG4gICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcignZXJyb3IhJywgXCJ1c2VyX2lk5a+55bqU55qE55So5oi35LiN5bGe5LqO5b2T5YmNc3BhY2VcIik7XG4gIH1cbiAgcmV0dXJuIHNwYWNlX3VzZXI7XG59O1xuXG51dWZsb3dNYW5hZ2VyRm9ySW5pdEFwcHJvdmFsLmdldFNwYWNlVXNlck9yZ0luZm8gPSBmdW5jdGlvbihzcGFjZV91c2VyKSB7XG4gIHZhciBpbmZvLCBvcmc7XG4gIGluZm8gPSBuZXcgT2JqZWN0O1xuICBpbmZvLm9yZ2FuaXphdGlvbiA9IHNwYWNlX3VzZXIub3JnYW5pemF0aW9uO1xuICBvcmcgPSBDcmVhdG9yLkNvbGxlY3Rpb25zLm9yZ2FuaXphdGlvbnMuZmluZE9uZShzcGFjZV91c2VyLm9yZ2FuaXphdGlvbiwge1xuICAgIGZpZWxkczoge1xuICAgICAgbmFtZTogMSxcbiAgICAgIGZ1bGxuYW1lOiAxXG4gICAgfVxuICB9KTtcbiAgaW5mby5vcmdhbml6YXRpb25fbmFtZSA9IG9yZy5uYW1lO1xuICBpbmZvLm9yZ2FuaXphdGlvbl9mdWxsbmFtZSA9IG9yZy5mdWxsbmFtZTtcbiAgcmV0dXJuIGluZm87XG59O1xuXG51dWZsb3dNYW5hZ2VyRm9ySW5pdEFwcHJvdmFsLmlzRmxvd0VuYWJsZWQgPSBmdW5jdGlvbihmbG93KSB7XG4gIGlmIChmbG93LnN0YXRlICE9PSBcImVuYWJsZWRcIikge1xuICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoJ2Vycm9yIScsIFwi5rWB56iL5pyq5ZCv55SoLOaTjeS9nOWksei0pVwiKTtcbiAgfVxufTtcblxudXVmbG93TWFuYWdlckZvckluaXRBcHByb3ZhbC5pc0Zsb3dTcGFjZU1hdGNoZWQgPSBmdW5jdGlvbihmbG93LCBzcGFjZV9pZCkge1xuICBpZiAoZmxvdy5zcGFjZSAhPT0gc3BhY2VfaWQpIHtcbiAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKCdlcnJvciEnLCBcIua1geeoi+WSjOW3peS9nOWMuklE5LiN5Yy56YWNXCIpO1xuICB9XG59O1xuXG51dWZsb3dNYW5hZ2VyRm9ySW5pdEFwcHJvdmFsLmdldEZvcm0gPSBmdW5jdGlvbihmb3JtX2lkKSB7XG4gIHZhciBmb3JtO1xuICBmb3JtID0gQ3JlYXRvci5Db2xsZWN0aW9ucy5mb3Jtcy5maW5kT25lKGZvcm1faWQpO1xuICBpZiAoIWZvcm0pIHtcbiAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKCdlcnJvciEnLCAn6KGo5Y2VSUTmnInor6/miJbmraTooajljZXlt7Lnu4/ooqvliKDpmaQnKTtcbiAgfVxuICByZXR1cm4gZm9ybTtcbn07XG5cbnV1Zmxvd01hbmFnZXJGb3JJbml0QXBwcm92YWwuZ2V0Q2F0ZWdvcnkgPSBmdW5jdGlvbihjYXRlZ29yeV9pZCkge1xuICByZXR1cm4gQ3JlYXRvci5Db2xsZWN0aW9ucy5jYXRlZ29yaWVzLmZpbmRPbmUoY2F0ZWdvcnlfaWQpO1xufTtcblxudXVmbG93TWFuYWdlckZvckluaXRBcHByb3ZhbC5jaGVja1N5bmNEaXJlY3Rpb24gPSBmdW5jdGlvbihvYmplY3RfbmFtZSwgZmxvd19pZCkge1xuICB2YXIgb3csIHN5bmNEaXJlY3Rpb247XG4gIG93ID0gQ3JlYXRvci5Db2xsZWN0aW9ucy5vYmplY3Rfd29ya2Zsb3dzLmZpbmRPbmUoe1xuICAgIG9iamVjdF9uYW1lOiBvYmplY3RfbmFtZSxcbiAgICBmbG93X2lkOiBmbG93X2lkXG4gIH0pO1xuICBpZiAoIW93KSB7XG4gICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcignZXJyb3IhJywgJ+acquaJvuWIsOWvueixoea1geeoi+aYoOWwhOiusOW9leOAgicpO1xuICB9XG4gIHN5bmNEaXJlY3Rpb24gPSBvdy5zeW5jX2RpcmVjdGlvbiB8fCAnYm90aCc7XG4gIGlmICghWydib3RoJywgJ29ial90b19pbnMnXS5pbmNsdWRlcyhzeW5jRGlyZWN0aW9uKSkge1xuICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoJ2Vycm9yIScsICfkuI3mlK/mjIHnmoTlkIzmraXmlrnlkJHjgIInKTtcbiAgfVxufTtcblxudXVmbG93TWFuYWdlckZvckluaXRBcHByb3ZhbC5jcmVhdGVfaW5zdGFuY2UgPSBmdW5jdGlvbihpbnN0YW5jZV9mcm9tX2NsaWVudCwgdXNlcl9pbmZvKSB7XG4gIHZhciBhcHByX29iaiwgYXBwcm92ZV9mcm9tX2NsaWVudCwgY2F0ZWdvcnksIGZsb3csIGZsb3dfaWQsIGZvcm0sIGluc19vYmosIG5ld19pbnNfaWQsIG5vdywgcGVybWlzc2lvbnMsIHJlbGF0ZWRUYWJsZXNJbmZvLCBzcGFjZSwgc3BhY2VfaWQsIHNwYWNlX3VzZXIsIHNwYWNlX3VzZXJfb3JnX2luZm8sIHN0YXJ0X3N0ZXAsIHRyYWNlX2Zyb21fY2xpZW50LCB0cmFjZV9vYmosIHVzZXJfaWQ7XG4gIGNoZWNrKGluc3RhbmNlX2Zyb21fY2xpZW50W1wiYXBwbGljYW50XCJdLCBTdHJpbmcpO1xuICBjaGVjayhpbnN0YW5jZV9mcm9tX2NsaWVudFtcInNwYWNlXCJdLCBTdHJpbmcpO1xuICBjaGVjayhpbnN0YW5jZV9mcm9tX2NsaWVudFtcImZsb3dcIl0sIFN0cmluZyk7XG4gIGNoZWNrKGluc3RhbmNlX2Zyb21fY2xpZW50W1wicmVjb3JkX2lkc1wiXSwgW1xuICAgIHtcbiAgICAgIG86IFN0cmluZyxcbiAgICAgIGlkczogW1N0cmluZ11cbiAgICB9XG4gIF0pO1xuICB1dWZsb3dNYW5hZ2VyRm9ySW5pdEFwcHJvdmFsLmNoZWNrU3luY0RpcmVjdGlvbihpbnN0YW5jZV9mcm9tX2NsaWVudFtcInJlY29yZF9pZHNcIl1bMF0ubywgaW5zdGFuY2VfZnJvbV9jbGllbnRbXCJmbG93XCJdKTtcbiAgdXVmbG93TWFuYWdlckZvckluaXRBcHByb3ZhbC5jaGVja0lzSW5BcHByb3ZhbChpbnN0YW5jZV9mcm9tX2NsaWVudFtcInJlY29yZF9pZHNcIl1bMF0sIGluc3RhbmNlX2Zyb21fY2xpZW50W1wic3BhY2VcIl0pO1xuICBzcGFjZV9pZCA9IGluc3RhbmNlX2Zyb21fY2xpZW50W1wic3BhY2VcIl07XG4gIGZsb3dfaWQgPSBpbnN0YW5jZV9mcm9tX2NsaWVudFtcImZsb3dcIl07XG4gIHVzZXJfaWQgPSB1c2VyX2luZm8uX2lkO1xuICB0cmFjZV9mcm9tX2NsaWVudCA9IG51bGw7XG4gIGFwcHJvdmVfZnJvbV9jbGllbnQgPSBudWxsO1xuICBpZiAoaW5zdGFuY2VfZnJvbV9jbGllbnRbXCJ0cmFjZXNcIl0gJiYgaW5zdGFuY2VfZnJvbV9jbGllbnRbXCJ0cmFjZXNcIl1bMF0pIHtcbiAgICB0cmFjZV9mcm9tX2NsaWVudCA9IGluc3RhbmNlX2Zyb21fY2xpZW50W1widHJhY2VzXCJdWzBdO1xuICAgIGlmICh0cmFjZV9mcm9tX2NsaWVudFtcImFwcHJvdmVzXCJdICYmIHRyYWNlX2Zyb21fY2xpZW50W1wiYXBwcm92ZXNcIl1bMF0pIHtcbiAgICAgIGFwcHJvdmVfZnJvbV9jbGllbnQgPSBpbnN0YW5jZV9mcm9tX2NsaWVudFtcInRyYWNlc1wiXVswXVtcImFwcHJvdmVzXCJdWzBdO1xuICAgIH1cbiAgfVxuICBzcGFjZSA9IHV1Zmxvd01hbmFnZXJGb3JJbml0QXBwcm92YWwuZ2V0U3BhY2Uoc3BhY2VfaWQpO1xuICBmbG93ID0gdXVmbG93TWFuYWdlckZvckluaXRBcHByb3ZhbC5nZXRGbG93KGZsb3dfaWQpO1xuICBzcGFjZV91c2VyID0gdXVmbG93TWFuYWdlckZvckluaXRBcHByb3ZhbC5nZXRTcGFjZVVzZXIoc3BhY2VfaWQsIHVzZXJfaWQpO1xuICBzcGFjZV91c2VyX29yZ19pbmZvID0gdXVmbG93TWFuYWdlckZvckluaXRBcHByb3ZhbC5nZXRTcGFjZVVzZXJPcmdJbmZvKHNwYWNlX3VzZXIpO1xuICB1dWZsb3dNYW5hZ2VyRm9ySW5pdEFwcHJvdmFsLmlzRmxvd0VuYWJsZWQoZmxvdyk7XG4gIHV1Zmxvd01hbmFnZXJGb3JJbml0QXBwcm92YWwuaXNGbG93U3BhY2VNYXRjaGVkKGZsb3csIHNwYWNlX2lkKTtcbiAgZm9ybSA9IHV1Zmxvd01hbmFnZXJGb3JJbml0QXBwcm92YWwuZ2V0Rm9ybShmbG93LmZvcm0pO1xuICBwZXJtaXNzaW9ucyA9IHBlcm1pc3Npb25NYW5hZ2VyLmdldEZsb3dQZXJtaXNzaW9ucyhmbG93X2lkLCB1c2VyX2lkKTtcbiAgaWYgKCFwZXJtaXNzaW9ucy5pbmNsdWRlcyhcImFkZFwiKSkge1xuICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoJ2Vycm9yIScsIFwi5b2T5YmN55So5oi35rKh5pyJ5q2k5rWB56iL55qE5paw5bu65p2D6ZmQXCIpO1xuICB9XG4gIG5vdyA9IG5ldyBEYXRlO1xuICBpbnNfb2JqID0ge307XG4gIGluc19vYmouX2lkID0gQ3JlYXRvci5Db2xsZWN0aW9ucy5pbnN0YW5jZXMuX21ha2VOZXdJRCgpO1xuICBpbnNfb2JqLnNwYWNlID0gc3BhY2VfaWQ7XG4gIGluc19vYmouZmxvdyA9IGZsb3dfaWQ7XG4gIGluc19vYmouZmxvd192ZXJzaW9uID0gZmxvdy5jdXJyZW50Ll9pZDtcbiAgaW5zX29iai5mb3JtID0gZmxvdy5mb3JtO1xuICBpbnNfb2JqLmZvcm1fdmVyc2lvbiA9IGZsb3cuY3VycmVudC5mb3JtX3ZlcnNpb247XG4gIGluc19vYmoubmFtZSA9IGZsb3cubmFtZTtcbiAgaW5zX29iai5zdWJtaXR0ZXIgPSB1c2VyX2lkO1xuICBpbnNfb2JqLnN1Ym1pdHRlcl9uYW1lID0gdXNlcl9pbmZvLm5hbWU7XG4gIGluc19vYmouYXBwbGljYW50ID0gaW5zdGFuY2VfZnJvbV9jbGllbnRbXCJhcHBsaWNhbnRcIl0gPyBpbnN0YW5jZV9mcm9tX2NsaWVudFtcImFwcGxpY2FudFwiXSA6IHVzZXJfaWQ7XG4gIGluc19vYmouYXBwbGljYW50X25hbWUgPSBpbnN0YW5jZV9mcm9tX2NsaWVudFtcImFwcGxpY2FudF9uYW1lXCJdID8gaW5zdGFuY2VfZnJvbV9jbGllbnRbXCJhcHBsaWNhbnRfbmFtZVwiXSA6IHVzZXJfaW5mby5uYW1lO1xuICBpbnNfb2JqLmFwcGxpY2FudF9vcmdhbml6YXRpb24gPSBpbnN0YW5jZV9mcm9tX2NsaWVudFtcImFwcGxpY2FudF9vcmdhbml6YXRpb25cIl0gPyBpbnN0YW5jZV9mcm9tX2NsaWVudFtcImFwcGxpY2FudF9vcmdhbml6YXRpb25cIl0gOiBzcGFjZV91c2VyLm9yZ2FuaXphdGlvbjtcbiAgaW5zX29iai5hcHBsaWNhbnRfb3JnYW5pemF0aW9uX25hbWUgPSBpbnN0YW5jZV9mcm9tX2NsaWVudFtcImFwcGxpY2FudF9vcmdhbml6YXRpb25fbmFtZVwiXSA/IGluc3RhbmNlX2Zyb21fY2xpZW50W1wiYXBwbGljYW50X29yZ2FuaXphdGlvbl9uYW1lXCJdIDogc3BhY2VfdXNlcl9vcmdfaW5mby5vcmdhbml6YXRpb25fbmFtZTtcbiAgaW5zX29iai5hcHBsaWNhbnRfb3JnYW5pemF0aW9uX2Z1bGxuYW1lID0gaW5zdGFuY2VfZnJvbV9jbGllbnRbXCJhcHBsaWNhbnRfb3JnYW5pemF0aW9uX2Z1bGxuYW1lXCJdID8gaW5zdGFuY2VfZnJvbV9jbGllbnRbXCJhcHBsaWNhbnRfb3JnYW5pemF0aW9uX2Z1bGxuYW1lXCJdIDogc3BhY2VfdXNlcl9vcmdfaW5mby5vcmdhbml6YXRpb25fZnVsbG5hbWU7XG4gIGluc19vYmouYXBwbGljYW50X2NvbXBhbnkgPSBpbnN0YW5jZV9mcm9tX2NsaWVudFtcImFwcGxpY2FudF9jb21wYW55XCJdID8gaW5zdGFuY2VfZnJvbV9jbGllbnRbXCJhcHBsaWNhbnRfY29tcGFueVwiXSA6IHNwYWNlX3VzZXIuY29tcGFueV9pZDtcbiAgaW5zX29iai5zdGF0ZSA9ICdkcmFmdCc7XG4gIGluc19vYmouY29kZSA9ICcnO1xuICBpbnNfb2JqLmlzX2FyY2hpdmVkID0gZmFsc2U7XG4gIGluc19vYmouaXNfZGVsZXRlZCA9IGZhbHNlO1xuICBpbnNfb2JqLmNyZWF0ZWQgPSBub3c7XG4gIGluc19vYmouY3JlYXRlZF9ieSA9IHVzZXJfaWQ7XG4gIGluc19vYmoubW9kaWZpZWQgPSBub3c7XG4gIGluc19vYmoubW9kaWZpZWRfYnkgPSB1c2VyX2lkO1xuICBpbnNfb2JqLnJlY29yZF9pZHMgPSBpbnN0YW5jZV9mcm9tX2NsaWVudFtcInJlY29yZF9pZHNcIl07XG4gIGlmIChzcGFjZV91c2VyLmNvbXBhbnlfaWQpIHtcbiAgICBpbnNfb2JqLmNvbXBhbnlfaWQgPSBzcGFjZV91c2VyLmNvbXBhbnlfaWQ7XG4gIH1cbiAgdHJhY2Vfb2JqID0ge307XG4gIHRyYWNlX29iai5faWQgPSBuZXcgTW9uZ28uT2JqZWN0SUQoKS5fc3RyO1xuICB0cmFjZV9vYmouaW5zdGFuY2UgPSBpbnNfb2JqLl9pZDtcbiAgdHJhY2Vfb2JqLmlzX2ZpbmlzaGVkID0gZmFsc2U7XG4gIHN0YXJ0X3N0ZXAgPSBfLmZpbmQoZmxvdy5jdXJyZW50LnN0ZXBzLCBmdW5jdGlvbihzdGVwKSB7XG4gICAgcmV0dXJuIHN0ZXAuc3RlcF90eXBlID09PSAnc3RhcnQnO1xuICB9KTtcbiAgdHJhY2Vfb2JqLnN0ZXAgPSBzdGFydF9zdGVwLl9pZDtcbiAgdHJhY2Vfb2JqLm5hbWUgPSBzdGFydF9zdGVwLm5hbWU7XG4gIHRyYWNlX29iai5zdGFydF9kYXRlID0gbm93O1xuICBhcHByX29iaiA9IHt9O1xuICBhcHByX29iai5faWQgPSBuZXcgTW9uZ28uT2JqZWN0SUQoKS5fc3RyO1xuICBhcHByX29iai5pbnN0YW5jZSA9IGluc19vYmouX2lkO1xuICBhcHByX29iai50cmFjZSA9IHRyYWNlX29iai5faWQ7XG4gIGFwcHJfb2JqLmlzX2ZpbmlzaGVkID0gZmFsc2U7XG4gIGFwcHJfb2JqLnVzZXIgPSBpbnN0YW5jZV9mcm9tX2NsaWVudFtcImFwcGxpY2FudFwiXSA/IGluc3RhbmNlX2Zyb21fY2xpZW50W1wiYXBwbGljYW50XCJdIDogdXNlcl9pZDtcbiAgYXBwcl9vYmoudXNlcl9uYW1lID0gaW5zdGFuY2VfZnJvbV9jbGllbnRbXCJhcHBsaWNhbnRfbmFtZVwiXSA/IGluc3RhbmNlX2Zyb21fY2xpZW50W1wiYXBwbGljYW50X25hbWVcIl0gOiB1c2VyX2luZm8ubmFtZTtcbiAgYXBwcl9vYmouaGFuZGxlciA9IHVzZXJfaWQ7XG4gIGFwcHJfb2JqLmhhbmRsZXJfbmFtZSA9IHVzZXJfaW5mby5uYW1lO1xuICBhcHByX29iai5oYW5kbGVyX29yZ2FuaXphdGlvbiA9IHNwYWNlX3VzZXIub3JnYW5pemF0aW9uO1xuICBhcHByX29iai5oYW5kbGVyX29yZ2FuaXphdGlvbl9uYW1lID0gc3BhY2VfdXNlcl9vcmdfaW5mby5uYW1lO1xuICBhcHByX29iai5oYW5kbGVyX29yZ2FuaXphdGlvbl9mdWxsbmFtZSA9IHNwYWNlX3VzZXJfb3JnX2luZm8uZnVsbG5hbWU7XG4gIGFwcHJfb2JqLnR5cGUgPSAnZHJhZnQnO1xuICBhcHByX29iai5zdGFydF9kYXRlID0gbm93O1xuICBhcHByX29iai5yZWFkX2RhdGUgPSBub3c7XG4gIGFwcHJfb2JqLmlzX3JlYWQgPSB0cnVlO1xuICBhcHByX29iai5pc19lcnJvciA9IGZhbHNlO1xuICBhcHByX29iai5kZXNjcmlwdGlvbiA9ICcnO1xuICByZWxhdGVkVGFibGVzSW5mbyA9IHt9O1xuICBhcHByX29iai52YWx1ZXMgPSB1dWZsb3dNYW5hZ2VyRm9ySW5pdEFwcHJvdmFsLmluaXRpYXRlVmFsdWVzKGluc19vYmoucmVjb3JkX2lkc1swXSwgZmxvd19pZCwgc3BhY2VfaWQsIGZvcm0uY3VycmVudC5maWVsZHMsIHJlbGF0ZWRUYWJsZXNJbmZvKTtcbiAgdHJhY2Vfb2JqLmFwcHJvdmVzID0gW2FwcHJfb2JqXTtcbiAgaW5zX29iai50cmFjZXMgPSBbdHJhY2Vfb2JqXTtcbiAgaW5zX29iai52YWx1ZXMgPSBhcHByX29iai52YWx1ZXM7XG4gIGluc19vYmouaW5ib3hfdXNlcnMgPSBpbnN0YW5jZV9mcm9tX2NsaWVudC5pbmJveF91c2VycyB8fCBbXTtcbiAgaW5zX29iai5jdXJyZW50X3N0ZXBfbmFtZSA9IHN0YXJ0X3N0ZXAubmFtZTtcbiAgaWYgKGZsb3cuYXV0b19yZW1pbmQgPT09IHRydWUpIHtcbiAgICBpbnNfb2JqLmF1dG9fcmVtaW5kID0gdHJ1ZTtcbiAgfVxuICBpbnNfb2JqLmZsb3dfbmFtZSA9IGZsb3cubmFtZTtcbiAgaWYgKGZvcm0uY2F0ZWdvcnkpIHtcbiAgICBjYXRlZ29yeSA9IHV1Zmxvd01hbmFnZXJGb3JJbml0QXBwcm92YWwuZ2V0Q2F0ZWdvcnkoZm9ybS5jYXRlZ29yeSk7XG4gICAgaWYgKGNhdGVnb3J5KSB7XG4gICAgICBpbnNfb2JqLmNhdGVnb3J5X25hbWUgPSBjYXRlZ29yeS5uYW1lO1xuICAgICAgaW5zX29iai5jYXRlZ29yeSA9IGNhdGVnb3J5Ll9pZDtcbiAgICB9XG4gIH1cbiAgbmV3X2luc19pZCA9IENyZWF0b3IuQ29sbGVjdGlvbnMuaW5zdGFuY2VzLmluc2VydChpbnNfb2JqKTtcbiAgdXVmbG93TWFuYWdlckZvckluaXRBcHByb3ZhbC5pbml0aWF0ZVJlY29yZEluc3RhbmNlSW5mbyhpbnNfb2JqLnJlY29yZF9pZHNbMF0sIG5ld19pbnNfaWQsIHNwYWNlX2lkKTtcbiAgdXVmbG93TWFuYWdlckZvckluaXRBcHByb3ZhbC5pbml0aWF0ZUF0dGFjaChpbnNfb2JqLnJlY29yZF9pZHNbMF0sIHNwYWNlX2lkLCBpbnNfb2JqLl9pZCwgYXBwcl9vYmouX2lkKTtcbiAgcmV0dXJuIG5ld19pbnNfaWQ7XG59O1xuXG51dWZsb3dNYW5hZ2VyRm9ySW5pdEFwcHJvdmFsLmluaXRpYXRlVmFsdWVzID0gZnVuY3Rpb24ocmVjb3JkSWRzLCBmbG93SWQsIHNwYWNlSWQsIGZpZWxkcywgcmVsYXRlZFRhYmxlc0luZm8pIHtcbiAgdmFyIGZpZWxkQ29kZXMsIGZpbHRlclZhbHVlcywgZmxvdywgZm9ybSwgZm9ybUZpZWxkcywgZm9ybVRhYmxlRmllbGRzLCBmb3JtVGFibGVGaWVsZHNDb2RlLCBnZXRGaWVsZE9kYXRhVmFsdWUsIGdldEZvcm1GaWVsZCwgZ2V0Rm9ybVRhYmxlRmllbGQsIGdldEZvcm1UYWJsZUZpZWxkQ29kZSwgZ2V0Rm9ybVRhYmxlU3ViRmllbGQsIGdldFJlbGF0ZWRPYmplY3RGaWVsZENvZGUsIGdldFNlbGVjdE9yZ1ZhbHVlLCBnZXRTZWxlY3RPcmdWYWx1ZXMsIGdldFNlbGVjdFVzZXJWYWx1ZSwgZ2V0U2VsZWN0VXNlclZhbHVlcywgb2JqZWN0LCBvYmplY3ROYW1lLCBvdywgcmVjb3JkLCByZWNvcmRJZCwgcmVmLCByZWxhdGVkT2JqZWN0cywgcmVsYXRlZE9iamVjdHNLZXlzLCB0YWJsZUZpZWxkQ29kZXMsIHRhYmxlRmllbGRNYXAsIHRhYmxlVG9SZWxhdGVkTWFwLCB2YWx1ZXM7XG4gIGZpZWxkQ29kZXMgPSBbXTtcbiAgXy5lYWNoKGZpZWxkcywgZnVuY3Rpb24oZikge1xuICAgIGlmIChmLnR5cGUgPT09ICdzZWN0aW9uJykge1xuICAgICAgcmV0dXJuIF8uZWFjaChmLmZpZWxkcywgZnVuY3Rpb24oZmYpIHtcbiAgICAgICAgcmV0dXJuIGZpZWxkQ29kZXMucHVzaChmZi5jb2RlKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmllbGRDb2Rlcy5wdXNoKGYuY29kZSk7XG4gICAgfVxuICB9KTtcbiAgdmFsdWVzID0ge307XG4gIG9iamVjdE5hbWUgPSByZWNvcmRJZHMubztcbiAgb2JqZWN0ID0gZ2V0T2JqZWN0Q29uZmlnKG9iamVjdE5hbWUpO1xuICByZWNvcmRJZCA9IHJlY29yZElkcy5pZHNbMF07XG4gIG93ID0gQ3JlYXRvci5Db2xsZWN0aW9ucy5vYmplY3Rfd29ya2Zsb3dzLmZpbmRPbmUoe1xuICAgIG9iamVjdF9uYW1lOiBvYmplY3ROYW1lLFxuICAgIGZsb3dfaWQ6IGZsb3dJZFxuICB9KTtcbiAgcmVjb3JkID0gb2JqZWN0RmluZE9uZShvYmplY3ROYW1lLCB7XG4gICAgZmlsdGVyczogW1snX2lkJywgJz0nLCByZWNvcmRJZF1dXG4gIH0pO1xuICBmbG93ID0gQ3JlYXRvci5nZXRDb2xsZWN0aW9uKCdmbG93cycpLmZpbmRPbmUoZmxvd0lkLCB7XG4gICAgZmllbGRzOiB7XG4gICAgICBmb3JtOiAxXG4gICAgfVxuICB9KTtcbiAgaWYgKG93ICYmIHJlY29yZCkge1xuICAgIGZvcm0gPSBDcmVhdG9yLmdldENvbGxlY3Rpb24oXCJmb3Jtc1wiKS5maW5kT25lKGZsb3cuZm9ybSk7XG4gICAgZm9ybUZpZWxkcyA9IGZvcm0uY3VycmVudC5maWVsZHMgfHwgW107XG4gICAgcmVsYXRlZE9iamVjdHMgPSBnZXRSZWxhdGVkcyhvYmplY3ROYW1lKTtcbiAgICByZWxhdGVkT2JqZWN0c0tleXMgPSBfLnBsdWNrKHJlbGF0ZWRPYmplY3RzLCAnb2JqZWN0X25hbWUnKTtcbiAgICBmb3JtVGFibGVGaWVsZHMgPSBfLmZpbHRlcihmb3JtRmllbGRzLCBmdW5jdGlvbihmb3JtRmllbGQpIHtcbiAgICAgIHJldHVybiBmb3JtRmllbGQudHlwZSA9PT0gJ3RhYmxlJztcbiAgICB9KTtcbiAgICBmb3JtVGFibGVGaWVsZHNDb2RlID0gXy5wbHVjayhmb3JtVGFibGVGaWVsZHMsICdjb2RlJyk7XG4gICAgZ2V0UmVsYXRlZE9iamVjdEZpZWxkQ29kZSA9IGZ1bmN0aW9uKGtleSkge1xuICAgICAgcmV0dXJuIF8uZmluZChyZWxhdGVkT2JqZWN0c0tleXMsIGZ1bmN0aW9uKHJlbGF0ZWRPYmplY3RzS2V5KSB7XG4gICAgICAgIHJldHVybiBrZXkuc3RhcnRzV2l0aChyZWxhdGVkT2JqZWN0c0tleSArICcuJyk7XG4gICAgICB9KTtcbiAgICB9O1xuICAgIGdldEZvcm1UYWJsZUZpZWxkQ29kZSA9IGZ1bmN0aW9uKGtleSkge1xuICAgICAgcmV0dXJuIF8uZmluZChmb3JtVGFibGVGaWVsZHNDb2RlLCBmdW5jdGlvbihmb3JtVGFibGVGaWVsZENvZGUpIHtcbiAgICAgICAgcmV0dXJuIGtleS5zdGFydHNXaXRoKGZvcm1UYWJsZUZpZWxkQ29kZSArICcuJyk7XG4gICAgICB9KTtcbiAgICB9O1xuICAgIGdldEZvcm1UYWJsZUZpZWxkID0gZnVuY3Rpb24oa2V5KSB7XG4gICAgICByZXR1cm4gXy5maW5kKGZvcm1UYWJsZUZpZWxkcywgZnVuY3Rpb24oZikge1xuICAgICAgICByZXR1cm4gZi5jb2RlID09PSBrZXk7XG4gICAgICB9KTtcbiAgICB9O1xuICAgIGdldEZvcm1GaWVsZCA9IGZ1bmN0aW9uKGtleSkge1xuICAgICAgdmFyIGZmO1xuICAgICAgZmYgPSBudWxsO1xuICAgICAgXy5mb3JFYWNoKGZvcm1GaWVsZHMsIGZ1bmN0aW9uKGYpIHtcbiAgICAgICAgaWYgKGZmKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChmLnR5cGUgPT09ICdzZWN0aW9uJykge1xuICAgICAgICAgIHJldHVybiBmZiA9IF8uZmluZChmLmZpZWxkcywgZnVuY3Rpb24oc2YpIHtcbiAgICAgICAgICAgIHJldHVybiBzZi5jb2RlID09PSBrZXk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAoZi5jb2RlID09PSBrZXkpIHtcbiAgICAgICAgICByZXR1cm4gZmYgPSBmO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBmZjtcbiAgICB9O1xuICAgIGdldEZvcm1UYWJsZVN1YkZpZWxkID0gZnVuY3Rpb24odGFibGVGaWVsZCwgc3ViRmllbGRDb2RlKSB7XG4gICAgICByZXR1cm4gXy5maW5kKHRhYmxlRmllbGQuZmllbGRzLCBmdW5jdGlvbihmKSB7XG4gICAgICAgIHJldHVybiBmLmNvZGUgPT09IHN1YkZpZWxkQ29kZTtcbiAgICAgIH0pO1xuICAgIH07XG4gICAgZ2V0RmllbGRPZGF0YVZhbHVlID0gZnVuY3Rpb24ob2JqTmFtZSwgaWQpIHtcbiAgICAgIHZhciBfcmVjb3JkLCBfcmVjb3JkcywgbmFtZUtleSwgb2JqO1xuICAgICAgb2JqID0gb2JqZWN0cWwuZ2V0T2JqZWN0KG9iak5hbWUpO1xuICAgICAgbmFtZUtleSA9IGdldE9iamVjdE5hbWVGaWVsZEtleShvYmpOYW1lKTtcbiAgICAgIGlmICghb2JqKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChfLmlzU3RyaW5nKGlkKSkge1xuICAgICAgICBfcmVjb3JkID0gb2JqZWN0RmluZE9uZShvYmpOYW1lLCB7XG4gICAgICAgICAgZmlsdGVyczogW1snX2lkJywgJz0nLCBpZF1dXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoX3JlY29yZCkge1xuICAgICAgICAgIF9yZWNvcmRbJ0BsYWJlbCddID0gX3JlY29yZFtuYW1lS2V5XTtcbiAgICAgICAgICByZXR1cm4gX3JlY29yZDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChfLmlzQXJyYXkoaWQpKSB7XG4gICAgICAgIF9yZWNvcmRzID0gW107XG4gICAgICAgIG9iamVjdEZpbmQob2JqTmFtZSwge1xuICAgICAgICAgIGZpbHRlcnM6IFtbJ19pZCcsICdpbicsIGlkXV1cbiAgICAgICAgfSkuZm9yRWFjaChmdW5jdGlvbihfcmVjb3JkKSB7XG4gICAgICAgICAgX3JlY29yZFsnQGxhYmVsJ10gPSBfcmVjb3JkW25hbWVLZXldO1xuICAgICAgICAgIHJldHVybiBfcmVjb3Jkcy5wdXNoKF9yZWNvcmQpO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKCFfLmlzRW1wdHkoX3JlY29yZHMpKSB7XG4gICAgICAgICAgcmV0dXJuIF9yZWNvcmRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgICBnZXRTZWxlY3RVc2VyVmFsdWUgPSBmdW5jdGlvbih1c2VySWQsIHNwYWNlSWQpIHtcbiAgICAgIHZhciBzdTtcbiAgICAgIHN1ID0gQ3JlYXRvci5nZXRDb2xsZWN0aW9uKCdzcGFjZV91c2VycycpLmZpbmRPbmUoe1xuICAgICAgICBzcGFjZTogc3BhY2VJZCxcbiAgICAgICAgdXNlcjogdXNlcklkXG4gICAgICB9KTtcbiAgICAgIHN1LmlkID0gdXNlcklkO1xuICAgICAgcmV0dXJuIHN1O1xuICAgIH07XG4gICAgZ2V0U2VsZWN0VXNlclZhbHVlcyA9IGZ1bmN0aW9uKHVzZXJJZHMsIHNwYWNlSWQpIHtcbiAgICAgIHZhciBzdXM7XG4gICAgICBzdXMgPSBbXTtcbiAgICAgIGlmIChfLmlzQXJyYXkodXNlcklkcykpIHtcbiAgICAgICAgXy5lYWNoKHVzZXJJZHMsIGZ1bmN0aW9uKHVzZXJJZCkge1xuICAgICAgICAgIHZhciBzdTtcbiAgICAgICAgICBzdSA9IGdldFNlbGVjdFVzZXJWYWx1ZSh1c2VySWQsIHNwYWNlSWQpO1xuICAgICAgICAgIGlmIChzdSkge1xuICAgICAgICAgICAgcmV0dXJuIHN1cy5wdXNoKHN1KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHN1cztcbiAgICB9O1xuICAgIGdldFNlbGVjdE9yZ1ZhbHVlID0gZnVuY3Rpb24ob3JnSWQsIHNwYWNlSWQpIHtcbiAgICAgIHZhciBvcmc7XG4gICAgICBvcmcgPSBDcmVhdG9yLmdldENvbGxlY3Rpb24oJ29yZ2FuaXphdGlvbnMnKS5maW5kT25lKG9yZ0lkLCB7XG4gICAgICAgIGZpZWxkczoge1xuICAgICAgICAgIF9pZDogMSxcbiAgICAgICAgICBuYW1lOiAxLFxuICAgICAgICAgIGZ1bGxuYW1lOiAxXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgb3JnLmlkID0gb3JnSWQ7XG4gICAgICByZXR1cm4gb3JnO1xuICAgIH07XG4gICAgZ2V0U2VsZWN0T3JnVmFsdWVzID0gZnVuY3Rpb24ob3JnSWRzLCBzcGFjZUlkKSB7XG4gICAgICB2YXIgb3JncztcbiAgICAgIG9yZ3MgPSBbXTtcbiAgICAgIGlmIChfLmlzQXJyYXkob3JnSWRzKSkge1xuICAgICAgICBfLmVhY2gob3JnSWRzLCBmdW5jdGlvbihvcmdJZCkge1xuICAgICAgICAgIHZhciBvcmc7XG4gICAgICAgICAgb3JnID0gZ2V0U2VsZWN0T3JnVmFsdWUob3JnSWQsIHNwYWNlSWQpO1xuICAgICAgICAgIGlmIChvcmcpIHtcbiAgICAgICAgICAgIHJldHVybiBvcmdzLnB1c2gob3JnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG9yZ3M7XG4gICAgfTtcbiAgICB0YWJsZUZpZWxkQ29kZXMgPSBbXTtcbiAgICB0YWJsZUZpZWxkTWFwID0gW107XG4gICAgdGFibGVUb1JlbGF0ZWRNYXAgPSB7fTtcbiAgICBpZiAoKHJlZiA9IG93LmZpZWxkX21hcCkgIT0gbnVsbCkge1xuICAgICAgcmVmLmZvckVhY2goZnVuY3Rpb24oZm0pIHtcbiAgICAgICAgdmFyIGZvcm1GaWVsZCwgZm9ybVRhYmxlRmllbGRDb2RlLCBncmlkQ29kZSwgbG9va3VwRmllbGROYW1lLCBsb29rdXBGaWVsZE9iaiwgbG9va3VwT2JqZWN0UmVjb3JkLCBsb29rdXBTZWxlY3RGaWVsZFZhbHVlLCBvVGFibGVDb2RlLCBvVGFibGVDb2RlUmVmZXJlbmNlRmllbGQsIG9UYWJsZUNvZGVSZWZlcmVuY2VGaWVsZENvZGUsIG9UYWJsZUZpZWxkQ29kZSwgb2JqRmllbGQsIG9iamVjdEZpZWxkLCBvYmplY3RGaWVsZE5hbWUsIG9iamVjdEZpZWxkT2JqZWN0TmFtZSwgb2JqZWN0TG9va3VwRmllbGQsIG9iamVjdF9maWVsZCwgb2RhdGFGaWVsZFZhbHVlLCByZWZlcmVuY2VUb0RvYywgcmVmZXJlbmNlVG9GaWVsZFZhbHVlLCByZWZlcmVuY2VUb09iamVjdE5hbWUsIHJlbGF0ZWRPYmplY3RGaWVsZENvZGUsIHNlbGVjdEZpZWxkVmFsdWUsIHRhYmxlVG9SZWxhdGVkTWFwS2V5LCB3VGFibGVDb2RlLCB3b3JrZmxvd19maWVsZDtcbiAgICAgICAgb2JqZWN0X2ZpZWxkID0gZm0ub2JqZWN0X2ZpZWxkO1xuICAgICAgICB3b3JrZmxvd19maWVsZCA9IGZtLndvcmtmbG93X2ZpZWxkO1xuICAgICAgICBpZiAoIW9iamVjdF9maWVsZCB8fCAhd29ya2Zsb3dfZmllbGQpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKDQwMCwgJ+acquaJvuWIsOWtl+aute+8jOivt+ajgOafpeWvueixoea1geeoi+aYoOWwhOWtl+autemFjee9ricpO1xuICAgICAgICB9XG4gICAgICAgIHJlbGF0ZWRPYmplY3RGaWVsZENvZGUgPSBnZXRSZWxhdGVkT2JqZWN0RmllbGRDb2RlKG9iamVjdF9maWVsZCk7XG4gICAgICAgIGZvcm1UYWJsZUZpZWxkQ29kZSA9IGdldEZvcm1UYWJsZUZpZWxkQ29kZSh3b3JrZmxvd19maWVsZCk7XG4gICAgICAgIG9iakZpZWxkID0gb2JqZWN0LmZpZWxkc1tvYmplY3RfZmllbGRdO1xuICAgICAgICBmb3JtRmllbGQgPSBnZXRGb3JtRmllbGQod29ya2Zsb3dfZmllbGQpO1xuICAgICAgICBpZiAocmVsYXRlZE9iamVjdEZpZWxkQ29kZSkge1xuICAgICAgICAgIG9UYWJsZUNvZGUgPSBvYmplY3RfZmllbGQuc3BsaXQoJy4nKVswXTtcbiAgICAgICAgICBvVGFibGVGaWVsZENvZGUgPSBvYmplY3RfZmllbGQuc3BsaXQoJy4nKVsxXTtcbiAgICAgICAgICB0YWJsZVRvUmVsYXRlZE1hcEtleSA9IG9UYWJsZUNvZGU7XG4gICAgICAgICAgaWYgKCF0YWJsZVRvUmVsYXRlZE1hcFt0YWJsZVRvUmVsYXRlZE1hcEtleV0pIHtcbiAgICAgICAgICAgIHRhYmxlVG9SZWxhdGVkTWFwW3RhYmxlVG9SZWxhdGVkTWFwS2V5XSA9IHt9O1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoZm9ybVRhYmxlRmllbGRDb2RlKSB7XG4gICAgICAgICAgICB3VGFibGVDb2RlID0gd29ya2Zsb3dfZmllbGQuc3BsaXQoJy4nKVswXTtcbiAgICAgICAgICAgIHRhYmxlVG9SZWxhdGVkTWFwW3RhYmxlVG9SZWxhdGVkTWFwS2V5XVsnX0ZST01fVEFCTEVfQ09ERSddID0gd1RhYmxlQ29kZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRhYmxlVG9SZWxhdGVkTWFwW3RhYmxlVG9SZWxhdGVkTWFwS2V5XVtvVGFibGVGaWVsZENvZGVdID0gd29ya2Zsb3dfZmllbGQ7XG4gICAgICAgIH0gZWxzZSBpZiAod29ya2Zsb3dfZmllbGQuaW5kZXhPZignLicpID4gMCAmJiBvYmplY3RfZmllbGQuaW5kZXhPZignLiQuJykgPiAwKSB7XG4gICAgICAgICAgd1RhYmxlQ29kZSA9IHdvcmtmbG93X2ZpZWxkLnNwbGl0KCcuJylbMF07XG4gICAgICAgICAgb1RhYmxlQ29kZSA9IG9iamVjdF9maWVsZC5zcGxpdCgnLiQuJylbMF07XG4gICAgICAgICAgaWYgKHJlY29yZC5oYXNPd25Qcm9wZXJ0eShvVGFibGVDb2RlKSAmJiBfLmlzQXJyYXkocmVjb3JkW29UYWJsZUNvZGVdKSkge1xuICAgICAgICAgICAgdGFibGVGaWVsZENvZGVzLnB1c2goSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICB3b3JrZmxvd190YWJsZV9maWVsZF9jb2RlOiB3VGFibGVDb2RlLFxuICAgICAgICAgICAgICBvYmplY3RfdGFibGVfZmllbGRfY29kZTogb1RhYmxlQ29kZVxuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgcmV0dXJuIHRhYmxlRmllbGRNYXAucHVzaChmbSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChvVGFibGVDb2RlLmluZGV4T2YoJy4nKSA+IDApIHtcbiAgICAgICAgICAgIG9UYWJsZUNvZGVSZWZlcmVuY2VGaWVsZENvZGUgPSBvVGFibGVDb2RlLnNwbGl0KCcuJylbMF07XG4gICAgICAgICAgICBncmlkQ29kZSA9IG9UYWJsZUNvZGUuc3BsaXQoJy4nKVsxXTtcbiAgICAgICAgICAgIG9UYWJsZUNvZGVSZWZlcmVuY2VGaWVsZCA9IG9iamVjdC5maWVsZHNbb1RhYmxlQ29kZVJlZmVyZW5jZUZpZWxkQ29kZV07XG4gICAgICAgICAgICBpZiAob1RhYmxlQ29kZVJlZmVyZW5jZUZpZWxkICYmIFsnbG9va3VwJywgJ21hc3Rlcl9kZXRhaWwnXS5pbmNsdWRlcyhvVGFibGVDb2RlUmVmZXJlbmNlRmllbGQudHlwZSkgJiYgXy5pc1N0cmluZyhvVGFibGVDb2RlUmVmZXJlbmNlRmllbGQucmVmZXJlbmNlX3RvKSkge1xuICAgICAgICAgICAgICBpZiAocmVjb3JkW29UYWJsZUNvZGVdKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJlZmVyZW5jZVRvT2JqZWN0TmFtZSA9IG9UYWJsZUNvZGVSZWZlcmVuY2VGaWVsZC5yZWZlcmVuY2VfdG87XG4gICAgICAgICAgICAgIHJlZmVyZW5jZVRvRmllbGRWYWx1ZSA9IHJlY29yZFtvVGFibGVDb2RlUmVmZXJlbmNlRmllbGQubmFtZV07XG4gICAgICAgICAgICAgIHJlZmVyZW5jZVRvRG9jID0gZ2V0RmllbGRPZGF0YVZhbHVlKHJlZmVyZW5jZVRvT2JqZWN0TmFtZSwgcmVmZXJlbmNlVG9GaWVsZFZhbHVlKTtcbiAgICAgICAgICAgICAgaWYgKHJlZmVyZW5jZVRvRG9jW2dyaWRDb2RlXSkge1xuICAgICAgICAgICAgICAgIHJlY29yZFtvVGFibGVDb2RlXSA9IHJlZmVyZW5jZVRvRG9jW2dyaWRDb2RlXTtcbiAgICAgICAgICAgICAgICB0YWJsZUZpZWxkQ29kZXMucHVzaChKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgICB3b3JrZmxvd190YWJsZV9maWVsZF9jb2RlOiB3VGFibGVDb2RlLFxuICAgICAgICAgICAgICAgICAgb2JqZWN0X3RhYmxlX2ZpZWxkX2NvZGU6IG9UYWJsZUNvZGVcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRhYmxlRmllbGRNYXAucHVzaChmbSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAob2JqZWN0X2ZpZWxkLmluZGV4T2YoJy4nKSA+IDAgJiYgb2JqZWN0X2ZpZWxkLmluZGV4T2YoJy4kLicpID09PSAtMSkge1xuICAgICAgICAgIG9iamVjdEZpZWxkTmFtZSA9IG9iamVjdF9maWVsZC5zcGxpdCgnLicpWzBdO1xuICAgICAgICAgIGxvb2t1cEZpZWxkTmFtZSA9IG9iamVjdF9maWVsZC5zcGxpdCgnLicpWzFdO1xuICAgICAgICAgIGlmIChvYmplY3QpIHtcbiAgICAgICAgICAgIG9iamVjdEZpZWxkID0gb2JqZWN0LmZpZWxkc1tvYmplY3RGaWVsZE5hbWVdO1xuICAgICAgICAgICAgaWYgKG9iamVjdEZpZWxkICYmIGZvcm1GaWVsZCAmJiBbJ2xvb2t1cCcsICdtYXN0ZXJfZGV0YWlsJ10uaW5jbHVkZXMob2JqZWN0RmllbGQudHlwZSkgJiYgXy5pc1N0cmluZyhvYmplY3RGaWVsZC5yZWZlcmVuY2VfdG8pKSB7XG4gICAgICAgICAgICAgIGxvb2t1cE9iamVjdFJlY29yZCA9IG9iamVjdEZpbmRPbmUob2JqZWN0RmllbGQucmVmZXJlbmNlX3RvLCB7XG4gICAgICAgICAgICAgICAgZmlsdGVyczogW1snX2lkJywgJz0nLCByZWNvcmRbb2JqZWN0RmllbGROYW1lXV1dLFxuICAgICAgICAgICAgICAgIGZpZWxkczogW2xvb2t1cEZpZWxkTmFtZV1cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIGlmICghbG9va3VwT2JqZWN0UmVjb3JkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIG9iamVjdEZpZWxkT2JqZWN0TmFtZSA9IG9iamVjdEZpZWxkLnJlZmVyZW5jZV90bztcbiAgICAgICAgICAgICAgbG9va3VwRmllbGRPYmogPSBnZXRPYmplY3RDb25maWcob2JqZWN0RmllbGRPYmplY3ROYW1lKTtcbiAgICAgICAgICAgICAgb2JqZWN0TG9va3VwRmllbGQgPSBsb29rdXBGaWVsZE9iai5maWVsZHNbbG9va3VwRmllbGROYW1lXTtcbiAgICAgICAgICAgICAgcmVmZXJlbmNlVG9GaWVsZFZhbHVlID0gbG9va3VwT2JqZWN0UmVjb3JkW2xvb2t1cEZpZWxkTmFtZV07XG4gICAgICAgICAgICAgIGlmIChvYmplY3RMb29rdXBGaWVsZCAmJiBmb3JtRmllbGQgJiYgZm9ybUZpZWxkLnR5cGUgPT09ICdvZGF0YScgJiYgWydsb29rdXAnLCAnbWFzdGVyX2RldGFpbCddLmluY2x1ZGVzKG9iamVjdExvb2t1cEZpZWxkLnR5cGUpICYmIF8uaXNTdHJpbmcob2JqZWN0TG9va3VwRmllbGQucmVmZXJlbmNlX3RvKSkge1xuICAgICAgICAgICAgICAgIHJlZmVyZW5jZVRvT2JqZWN0TmFtZSA9IG9iamVjdExvb2t1cEZpZWxkLnJlZmVyZW5jZV90bztcbiAgICAgICAgICAgICAgICBvZGF0YUZpZWxkVmFsdWU7XG4gICAgICAgICAgICAgICAgaWYgKG9iamVjdEZpZWxkLm11bHRpcGxlICYmIGZvcm1GaWVsZC5pc19tdWx0aXNlbGVjdCkge1xuICAgICAgICAgICAgICAgICAgb2RhdGFGaWVsZFZhbHVlID0gZ2V0RmllbGRPZGF0YVZhbHVlKHJlZmVyZW5jZVRvT2JqZWN0TmFtZSwgcmVmZXJlbmNlVG9GaWVsZFZhbHVlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCFvYmplY3RGaWVsZC5tdWx0aXBsZSAmJiAhZm9ybUZpZWxkLmlzX211bHRpc2VsZWN0KSB7XG4gICAgICAgICAgICAgICAgICBvZGF0YUZpZWxkVmFsdWUgPSBnZXRGaWVsZE9kYXRhVmFsdWUocmVmZXJlbmNlVG9PYmplY3ROYW1lLCByZWZlcmVuY2VUb0ZpZWxkVmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWVzW3dvcmtmbG93X2ZpZWxkXSA9IG9kYXRhRmllbGRWYWx1ZTtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChvYmplY3RMb29rdXBGaWVsZCAmJiBmb3JtRmllbGQgJiYgWyd1c2VyJywgJ2dyb3VwJ10uaW5jbHVkZXMoZm9ybUZpZWxkLnR5cGUpICYmIFsnbG9va3VwJywgJ21hc3Rlcl9kZXRhaWwnXS5pbmNsdWRlcyhvYmplY3RMb29rdXBGaWVsZC50eXBlKSAmJiBbJ3VzZXJzJywgJ29yZ2FuaXphdGlvbnMnXS5pbmNsdWRlcyhvYmplY3RMb29rdXBGaWVsZC5yZWZlcmVuY2VfdG8pKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFfLmlzRW1wdHkocmVmZXJlbmNlVG9GaWVsZFZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgbG9va3VwU2VsZWN0RmllbGRWYWx1ZTtcbiAgICAgICAgICAgICAgICAgIGlmIChmb3JtRmllbGQudHlwZSA9PT0gJ3VzZXInKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvYmplY3RMb29rdXBGaWVsZC5tdWx0aXBsZSAmJiBmb3JtRmllbGQuaXNfbXVsdGlzZWxlY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICBsb29rdXBTZWxlY3RGaWVsZFZhbHVlID0gZ2V0U2VsZWN0VXNlclZhbHVlcyhyZWZlcmVuY2VUb0ZpZWxkVmFsdWUsIHNwYWNlSWQpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCFvYmplY3RMb29rdXBGaWVsZC5tdWx0aXBsZSAmJiAhZm9ybUZpZWxkLmlzX211bHRpc2VsZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgbG9va3VwU2VsZWN0RmllbGRWYWx1ZSA9IGdldFNlbGVjdFVzZXJWYWx1ZShyZWZlcmVuY2VUb0ZpZWxkVmFsdWUsIHNwYWNlSWQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGZvcm1GaWVsZC50eXBlID09PSAnZ3JvdXAnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvYmplY3RMb29rdXBGaWVsZC5tdWx0aXBsZSAmJiBmb3JtRmllbGQuaXNfbXVsdGlzZWxlY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICBsb29rdXBTZWxlY3RGaWVsZFZhbHVlID0gZ2V0U2VsZWN0T3JnVmFsdWVzKHJlZmVyZW5jZVRvRmllbGRWYWx1ZSwgc3BhY2VJZCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIW9iamVjdExvb2t1cEZpZWxkLm11bHRpcGxlICYmICFmb3JtRmllbGQuaXNfbXVsdGlzZWxlY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICBsb29rdXBTZWxlY3RGaWVsZFZhbHVlID0gZ2V0U2VsZWN0T3JnVmFsdWUocmVmZXJlbmNlVG9GaWVsZFZhbHVlLCBzcGFjZUlkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgaWYgKGxvb2t1cFNlbGVjdEZpZWxkVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlc1t3b3JrZmxvd19maWVsZF0gPSBsb29rdXBTZWxlY3RGaWVsZFZhbHVlO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWVzW3dvcmtmbG93X2ZpZWxkXSA9IGxvb2t1cE9iamVjdFJlY29yZFtsb29rdXBGaWVsZE5hbWVdO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGZvcm1GaWVsZCAmJiBvYmpGaWVsZCAmJiBmb3JtRmllbGQudHlwZSA9PT0gJ29kYXRhJyAmJiBbJ2xvb2t1cCcsICdtYXN0ZXJfZGV0YWlsJ10uaW5jbHVkZXMob2JqRmllbGQudHlwZSkgJiYgXy5pc1N0cmluZyhvYmpGaWVsZC5yZWZlcmVuY2VfdG8pKSB7XG4gICAgICAgICAgcmVmZXJlbmNlVG9PYmplY3ROYW1lID0gb2JqRmllbGQucmVmZXJlbmNlX3RvO1xuICAgICAgICAgIHJlZmVyZW5jZVRvRmllbGRWYWx1ZSA9IHJlY29yZFtvYmpGaWVsZC5uYW1lXTtcbiAgICAgICAgICBvZGF0YUZpZWxkVmFsdWU7XG4gICAgICAgICAgaWYgKG9iakZpZWxkLm11bHRpcGxlICYmIGZvcm1GaWVsZC5pc19tdWx0aXNlbGVjdCkge1xuICAgICAgICAgICAgb2RhdGFGaWVsZFZhbHVlID0gZ2V0RmllbGRPZGF0YVZhbHVlKHJlZmVyZW5jZVRvT2JqZWN0TmFtZSwgcmVmZXJlbmNlVG9GaWVsZFZhbHVlKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKCFvYmpGaWVsZC5tdWx0aXBsZSAmJiAhZm9ybUZpZWxkLmlzX211bHRpc2VsZWN0KSB7XG4gICAgICAgICAgICBvZGF0YUZpZWxkVmFsdWUgPSBnZXRGaWVsZE9kYXRhVmFsdWUocmVmZXJlbmNlVG9PYmplY3ROYW1lLCByZWZlcmVuY2VUb0ZpZWxkVmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdmFsdWVzW3dvcmtmbG93X2ZpZWxkXSA9IG9kYXRhRmllbGRWYWx1ZTtcbiAgICAgICAgfSBlbHNlIGlmIChmb3JtRmllbGQgJiYgb2JqRmllbGQgJiYgWyd1c2VyJywgJ2dyb3VwJ10uaW5jbHVkZXMoZm9ybUZpZWxkLnR5cGUpICYmIFsnbG9va3VwJywgJ21hc3Rlcl9kZXRhaWwnXS5pbmNsdWRlcyhvYmpGaWVsZC50eXBlKSAmJiBbJ3VzZXJzJywgJ29yZ2FuaXphdGlvbnMnXS5pbmNsdWRlcyhvYmpGaWVsZC5yZWZlcmVuY2VfdG8pKSB7XG4gICAgICAgICAgcmVmZXJlbmNlVG9GaWVsZFZhbHVlID0gcmVjb3JkW29iakZpZWxkLm5hbWVdO1xuICAgICAgICAgIGlmICghXy5pc0VtcHR5KHJlZmVyZW5jZVRvRmllbGRWYWx1ZSkpIHtcbiAgICAgICAgICAgIHNlbGVjdEZpZWxkVmFsdWU7XG4gICAgICAgICAgICBpZiAoZm9ybUZpZWxkLnR5cGUgPT09ICd1c2VyJykge1xuICAgICAgICAgICAgICBpZiAob2JqRmllbGQubXVsdGlwbGUgJiYgZm9ybUZpZWxkLmlzX211bHRpc2VsZWN0KSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0RmllbGRWYWx1ZSA9IGdldFNlbGVjdFVzZXJWYWx1ZXMocmVmZXJlbmNlVG9GaWVsZFZhbHVlLCBzcGFjZUlkKTtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmICghb2JqRmllbGQubXVsdGlwbGUgJiYgIWZvcm1GaWVsZC5pc19tdWx0aXNlbGVjdCkge1xuICAgICAgICAgICAgICAgIHNlbGVjdEZpZWxkVmFsdWUgPSBnZXRTZWxlY3RVc2VyVmFsdWUocmVmZXJlbmNlVG9GaWVsZFZhbHVlLCBzcGFjZUlkKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChmb3JtRmllbGQudHlwZSA9PT0gJ2dyb3VwJykge1xuICAgICAgICAgICAgICBpZiAob2JqRmllbGQubXVsdGlwbGUgJiYgZm9ybUZpZWxkLmlzX211bHRpc2VsZWN0KSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0RmllbGRWYWx1ZSA9IGdldFNlbGVjdE9yZ1ZhbHVlcyhyZWZlcmVuY2VUb0ZpZWxkVmFsdWUsIHNwYWNlSWQpO1xuICAgICAgICAgICAgICB9IGVsc2UgaWYgKCFvYmpGaWVsZC5tdWx0aXBsZSAmJiAhZm9ybUZpZWxkLmlzX211bHRpc2VsZWN0KSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0RmllbGRWYWx1ZSA9IGdldFNlbGVjdE9yZ1ZhbHVlKHJlZmVyZW5jZVRvRmllbGRWYWx1ZSwgc3BhY2VJZCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzZWxlY3RGaWVsZFZhbHVlKSB7XG4gICAgICAgICAgICAgIHJldHVybiB2YWx1ZXNbd29ya2Zsb3dfZmllbGRdID0gc2VsZWN0RmllbGRWYWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAocmVjb3JkLmhhc093blByb3BlcnR5KG9iamVjdF9maWVsZCkpIHtcbiAgICAgICAgICByZXR1cm4gdmFsdWVzW3dvcmtmbG93X2ZpZWxkXSA9IHJlY29yZFtvYmplY3RfZmllbGRdO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgXy51bmlxKHRhYmxlRmllbGRDb2RlcykuZm9yRWFjaChmdW5jdGlvbih0ZmMpIHtcbiAgICAgIHZhciBjO1xuICAgICAgYyA9IEpTT04ucGFyc2UodGZjKTtcbiAgICAgIHZhbHVlc1tjLndvcmtmbG93X3RhYmxlX2ZpZWxkX2NvZGVdID0gW107XG4gICAgICByZXR1cm4gcmVjb3JkW2Mub2JqZWN0X3RhYmxlX2ZpZWxkX2NvZGVdLmZvckVhY2goZnVuY3Rpb24odHIpIHtcbiAgICAgICAgdmFyIG5ld1RyO1xuICAgICAgICBuZXdUciA9IHt9O1xuICAgICAgICBfLmVhY2godHIsIGZ1bmN0aW9uKHYsIGspIHtcbiAgICAgICAgICByZXR1cm4gdGFibGVGaWVsZE1hcC5mb3JFYWNoKGZ1bmN0aW9uKHRmbSkge1xuICAgICAgICAgICAgdmFyIHdUZENvZGU7XG4gICAgICAgICAgICBpZiAodGZtLm9iamVjdF9maWVsZCA9PT0gKGMub2JqZWN0X3RhYmxlX2ZpZWxkX2NvZGUgKyAnLiQuJyArIGspKSB7XG4gICAgICAgICAgICAgIHdUZENvZGUgPSB0Zm0ud29ya2Zsb3dfZmllbGQuc3BsaXQoJy4nKVsxXTtcbiAgICAgICAgICAgICAgcmV0dXJuIG5ld1RyW3dUZENvZGVdID0gdjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICghXy5pc0VtcHR5KG5ld1RyKSkge1xuICAgICAgICAgIHJldHVybiB2YWx1ZXNbYy53b3JrZmxvd190YWJsZV9maWVsZF9jb2RlXS5wdXNoKG5ld1RyKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgXy5lYWNoKHRhYmxlVG9SZWxhdGVkTWFwLCBmdW5jdGlvbihtYXAsIGtleSkge1xuICAgICAgdmFyIGZvcm1UYWJsZUZpZWxkLCByZWxhdGVkQ29sbGVjdGlvbiwgcmVsYXRlZEZpZWxkLCByZWxhdGVkRmllbGROYW1lLCByZWxhdGVkT2JqZWN0LCByZWxhdGVkT2JqZWN0TmFtZSwgcmVsYXRlZFJlY29yZHMsIHJlbGF0ZWRUYWJsZUl0ZW1zLCBzZWxlY3RvciwgdGFibGVDb2RlLCB0YWJsZVZhbHVlcztcbiAgICAgIHRhYmxlQ29kZSA9IG1hcC5fRlJPTV9UQUJMRV9DT0RFO1xuICAgICAgZm9ybVRhYmxlRmllbGQgPSBnZXRGb3JtVGFibGVGaWVsZCh0YWJsZUNvZGUpO1xuICAgICAgaWYgKCF0YWJsZUNvZGUpIHtcbiAgICAgICAgcmV0dXJuIGNvbnNvbGUud2FybigndGFibGVUb1JlbGF0ZWQ6IFsnICsga2V5ICsgJ10gbWlzc2luZyBjb3JyZXNwb25kaW5nIHRhYmxlLicpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVsYXRlZE9iamVjdE5hbWUgPSBrZXk7XG4gICAgICAgIHRhYmxlVmFsdWVzID0gW107XG4gICAgICAgIHJlbGF0ZWRUYWJsZUl0ZW1zID0gW107XG4gICAgICAgIHJlbGF0ZWRPYmplY3QgPSBnZXRPYmplY3RDb25maWcocmVsYXRlZE9iamVjdE5hbWUpO1xuICAgICAgICByZWxhdGVkRmllbGQgPSBfLmZpbmQocmVsYXRlZE9iamVjdC5maWVsZHMsIGZ1bmN0aW9uKGYpIHtcbiAgICAgICAgICByZXR1cm4gWydsb29rdXAnLCAnbWFzdGVyX2RldGFpbCddLmluY2x1ZGVzKGYudHlwZSkgJiYgZi5yZWZlcmVuY2VfdG8gPT09IG9iamVjdE5hbWU7XG4gICAgICAgIH0pO1xuICAgICAgICByZWxhdGVkRmllbGROYW1lID0gcmVsYXRlZEZpZWxkLm5hbWU7XG4gICAgICAgIHNlbGVjdG9yID0ge307XG4gICAgICAgIHNlbGVjdG9yW3JlbGF0ZWRGaWVsZE5hbWVdID0gcmVjb3JkSWQ7XG4gICAgICAgIHJlbGF0ZWRDb2xsZWN0aW9uID0gQ3JlYXRvci5nZXRDb2xsZWN0aW9uKHJlbGF0ZWRPYmplY3ROYW1lLCBzcGFjZUlkKTtcbiAgICAgICAgcmVsYXRlZFJlY29yZHMgPSByZWxhdGVkQ29sbGVjdGlvbi5maW5kKHNlbGVjdG9yKTtcbiAgICAgICAgcmVsYXRlZFJlY29yZHMuZm9yRWFjaChmdW5jdGlvbihycikge1xuICAgICAgICAgIHZhciB0YWJsZVZhbHVlSXRlbTtcbiAgICAgICAgICB0YWJsZVZhbHVlSXRlbSA9IHt9O1xuICAgICAgICAgIF8uZWFjaChtYXAsIGZ1bmN0aW9uKHZhbHVlS2V5LCBmaWVsZEtleSkge1xuICAgICAgICAgICAgdmFyIGZvcm1GaWVsZCwgZm9ybUZpZWxkS2V5LCByZWZlcmVuY2VUb0ZpZWxkVmFsdWUsIHJlZmVyZW5jZVRvT2JqZWN0TmFtZSwgcmVsYXRlZE9iamVjdEZpZWxkLCB0YWJsZUZpZWxkVmFsdWU7XG4gICAgICAgICAgICBpZiAoZmllbGRLZXkgIT09ICdfRlJPTV9UQUJMRV9DT0RFJykge1xuICAgICAgICAgICAgICB0YWJsZUZpZWxkVmFsdWU7XG4gICAgICAgICAgICAgIGZvcm1GaWVsZEtleTtcbiAgICAgICAgICAgICAgaWYgKHZhbHVlS2V5LnN0YXJ0c1dpdGgodGFibGVDb2RlICsgJy4nKSkge1xuICAgICAgICAgICAgICAgIGZvcm1GaWVsZEtleSA9ICh2YWx1ZUtleS5zcGxpdChcIi5cIilbMV0pO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGZvcm1GaWVsZEtleSA9IHZhbHVlS2V5O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGZvcm1GaWVsZCA9IGdldEZvcm1UYWJsZVN1YkZpZWxkKGZvcm1UYWJsZUZpZWxkLCBmb3JtRmllbGRLZXkpO1xuICAgICAgICAgICAgICByZWxhdGVkT2JqZWN0RmllbGQgPSByZWxhdGVkT2JqZWN0LmZpZWxkc1tmaWVsZEtleV07XG4gICAgICAgICAgICAgIGlmICghZm9ybUZpZWxkIHx8ICFyZWxhdGVkT2JqZWN0RmllbGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKGZvcm1GaWVsZC50eXBlID09PSAnb2RhdGEnICYmIFsnbG9va3VwJywgJ21hc3Rlcl9kZXRhaWwnXS5pbmNsdWRlcyhyZWxhdGVkT2JqZWN0RmllbGQudHlwZSkgJiYgXy5pc1N0cmluZyhyZWxhdGVkT2JqZWN0RmllbGQucmVmZXJlbmNlX3RvKSkge1xuICAgICAgICAgICAgICAgIHJlZmVyZW5jZVRvT2JqZWN0TmFtZSA9IHJlbGF0ZWRPYmplY3RGaWVsZC5yZWZlcmVuY2VfdG87XG4gICAgICAgICAgICAgICAgcmVmZXJlbmNlVG9GaWVsZFZhbHVlID0gcnJbZmllbGRLZXldO1xuICAgICAgICAgICAgICAgIGlmIChyZWxhdGVkT2JqZWN0RmllbGQubXVsdGlwbGUgJiYgZm9ybUZpZWxkLmlzX211bHRpc2VsZWN0KSB7XG4gICAgICAgICAgICAgICAgICB0YWJsZUZpZWxkVmFsdWUgPSBnZXRGaWVsZE9kYXRhVmFsdWUocmVmZXJlbmNlVG9PYmplY3ROYW1lLCByZWZlcmVuY2VUb0ZpZWxkVmFsdWUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIXJlbGF0ZWRPYmplY3RGaWVsZC5tdWx0aXBsZSAmJiAhZm9ybUZpZWxkLmlzX211bHRpc2VsZWN0KSB7XG4gICAgICAgICAgICAgICAgICB0YWJsZUZpZWxkVmFsdWUgPSBnZXRGaWVsZE9kYXRhVmFsdWUocmVmZXJlbmNlVG9PYmplY3ROYW1lLCByZWZlcmVuY2VUb0ZpZWxkVmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChbJ3VzZXInLCAnZ3JvdXAnXS5pbmNsdWRlcyhmb3JtRmllbGQudHlwZSkgJiYgWydsb29rdXAnLCAnbWFzdGVyX2RldGFpbCddLmluY2x1ZGVzKHJlbGF0ZWRPYmplY3RGaWVsZC50eXBlKSAmJiBbJ3VzZXJzJywgJ29yZ2FuaXphdGlvbnMnXS5pbmNsdWRlcyhyZWxhdGVkT2JqZWN0RmllbGQucmVmZXJlbmNlX3RvKSkge1xuICAgICAgICAgICAgICAgIHJlZmVyZW5jZVRvRmllbGRWYWx1ZSA9IHJyW2ZpZWxkS2V5XTtcbiAgICAgICAgICAgICAgICBpZiAoIV8uaXNFbXB0eShyZWZlcmVuY2VUb0ZpZWxkVmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICBpZiAoZm9ybUZpZWxkLnR5cGUgPT09ICd1c2VyJykge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVsYXRlZE9iamVjdEZpZWxkLm11bHRpcGxlICYmIGZvcm1GaWVsZC5pc19tdWx0aXNlbGVjdCkge1xuICAgICAgICAgICAgICAgICAgICAgIHRhYmxlRmllbGRWYWx1ZSA9IGdldFNlbGVjdFVzZXJWYWx1ZXMocmVmZXJlbmNlVG9GaWVsZFZhbHVlLCBzcGFjZUlkKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICghcmVsYXRlZE9iamVjdEZpZWxkLm11bHRpcGxlICYmICFmb3JtRmllbGQuaXNfbXVsdGlzZWxlY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICB0YWJsZUZpZWxkVmFsdWUgPSBnZXRTZWxlY3RVc2VyVmFsdWUocmVmZXJlbmNlVG9GaWVsZFZhbHVlLCBzcGFjZUlkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChmb3JtRmllbGQudHlwZSA9PT0gJ2dyb3VwJykge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVsYXRlZE9iamVjdEZpZWxkLm11bHRpcGxlICYmIGZvcm1GaWVsZC5pc19tdWx0aXNlbGVjdCkge1xuICAgICAgICAgICAgICAgICAgICAgIHRhYmxlRmllbGRWYWx1ZSA9IGdldFNlbGVjdE9yZ1ZhbHVlcyhyZWZlcmVuY2VUb0ZpZWxkVmFsdWUsIHNwYWNlSWQpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCFyZWxhdGVkT2JqZWN0RmllbGQubXVsdGlwbGUgJiYgIWZvcm1GaWVsZC5pc19tdWx0aXNlbGVjdCkge1xuICAgICAgICAgICAgICAgICAgICAgIHRhYmxlRmllbGRWYWx1ZSA9IGdldFNlbGVjdE9yZ1ZhbHVlKHJlZmVyZW5jZVRvRmllbGRWYWx1ZSwgc3BhY2VJZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGFibGVGaWVsZFZhbHVlID0gcnJbZmllbGRLZXldO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiB0YWJsZVZhbHVlSXRlbVtmb3JtRmllbGRLZXldID0gdGFibGVGaWVsZFZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGlmICghXy5pc0VtcHR5KHRhYmxlVmFsdWVJdGVtKSkge1xuICAgICAgICAgICAgdGFibGVWYWx1ZUl0ZW0uX2lkID0gcnIuX2lkO1xuICAgICAgICAgICAgdGFibGVWYWx1ZXMucHVzaCh0YWJsZVZhbHVlSXRlbSk7XG4gICAgICAgICAgICByZXR1cm4gcmVsYXRlZFRhYmxlSXRlbXMucHVzaCh7XG4gICAgICAgICAgICAgIF90YWJsZToge1xuICAgICAgICAgICAgICAgIF9pZDogcnIuX2lkLFxuICAgICAgICAgICAgICAgIF9jb2RlOiB0YWJsZUNvZGVcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdmFsdWVzW3RhYmxlQ29kZV0gPSB0YWJsZVZhbHVlcztcbiAgICAgICAgcmV0dXJuIHJlbGF0ZWRUYWJsZXNJbmZvW3JlbGF0ZWRPYmplY3ROYW1lXSA9IHJlbGF0ZWRUYWJsZUl0ZW1zO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmIChvdy5maWVsZF9tYXBfc2NyaXB0KSB7XG4gICAgICBfLmV4dGVuZCh2YWx1ZXMsIHV1Zmxvd01hbmFnZXJGb3JJbml0QXBwcm92YWwuZXZhbEZpZWxkTWFwU2NyaXB0KG93LmZpZWxkX21hcF9zY3JpcHQsIG9iamVjdE5hbWUsIHNwYWNlSWQsIHJlY29yZElkKSk7XG4gICAgfVxuICB9XG4gIGZpbHRlclZhbHVlcyA9IHt9O1xuICBfLmVhY2goXy5rZXlzKHZhbHVlcyksIGZ1bmN0aW9uKGspIHtcbiAgICBpZiAoZmllbGRDb2Rlcy5pbmNsdWRlcyhrKSkge1xuICAgICAgcmV0dXJuIGZpbHRlclZhbHVlc1trXSA9IHZhbHVlc1trXTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gZmlsdGVyVmFsdWVzO1xufTtcblxudXVmbG93TWFuYWdlckZvckluaXRBcHByb3ZhbC5ldmFsRmllbGRNYXBTY3JpcHQgPSBmdW5jdGlvbihmaWVsZF9tYXBfc2NyaXB0LCBvYmplY3ROYW1lLCBzcGFjZUlkLCBvYmplY3RJZCkge1xuICB2YXIgZnVuYywgcmVjb3JkLCBzY3JpcHQsIHZhbHVlcztcbiAgcmVjb3JkID0gb2JqZWN0RmluZE9uZShvYmplY3ROYW1lLCB7XG4gICAgZmlsdGVyczogW1snX2lkJywgJz0nLCBvYmplY3RJZF1dXG4gIH0pO1xuICBzY3JpcHQgPSBcIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHJlY29yZCkgeyBcIiArIGZpZWxkX21hcF9zY3JpcHQgKyBcIiB9XCI7XG4gIGZ1bmMgPSBfZXZhbChzY3JpcHQsIFwiZmllbGRfbWFwX3NjcmlwdFwiKTtcbiAgdmFsdWVzID0gZnVuYyhyZWNvcmQpO1xuICBpZiAoXy5pc09iamVjdCh2YWx1ZXMpKSB7XG4gICAgcmV0dXJuIHZhbHVlcztcbiAgfSBlbHNlIHtcbiAgICBjb25zb2xlLmVycm9yKFwiZXZhbEZpZWxkTWFwU2NyaXB0OiDohJrmnKzov5Tlm57lgLznsbvlnovkuI3mmK/lr7nosaFcIik7XG4gIH1cbiAgcmV0dXJuIHt9O1xufTtcblxudXVmbG93TWFuYWdlckZvckluaXRBcHByb3ZhbC5pbml0aWF0ZUF0dGFjaCA9IGZ1bmN0aW9uKHJlY29yZElkcywgc3BhY2VJZCwgaW5zSWQsIGFwcHJvdmVJZCkge1xuICBDcmVhdG9yLkNvbGxlY3Rpb25zWydjbXNfZmlsZXMnXS5maW5kKHtcbiAgICBzcGFjZTogc3BhY2VJZCxcbiAgICBwYXJlbnQ6IHJlY29yZElkc1xuICB9KS5mb3JFYWNoKGZ1bmN0aW9uKGNmKSB7XG4gICAgcmV0dXJuIF8uZWFjaChjZi52ZXJzaW9ucywgZnVuY3Rpb24odmVyc2lvbklkLCBpZHgpIHtcbiAgICAgIHZhciBmLCBuZXdGaWxlO1xuICAgICAgZiA9IENyZWF0b3IuQ29sbGVjdGlvbnNbJ2Nmcy5maWxlcy5maWxlcmVjb3JkJ10uZmluZE9uZSh2ZXJzaW9uSWQpO1xuICAgICAgbmV3RmlsZSA9IG5ldyBGUy5GaWxlKCk7XG4gICAgICByZXR1cm4gbmV3RmlsZS5hdHRhY2hEYXRhKGYuY3JlYXRlUmVhZFN0cmVhbSgnZmlsZXMnKSwge1xuICAgICAgICB0eXBlOiBmLm9yaWdpbmFsLnR5cGVcbiAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICB2YXIgbWV0YWRhdGE7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKGVyci5lcnJvciwgZXJyLnJlYXNvbik7XG4gICAgICAgIH1cbiAgICAgICAgbmV3RmlsZS5uYW1lKGYubmFtZSgpKTtcbiAgICAgICAgbmV3RmlsZS5zaXplKGYuc2l6ZSgpKTtcbiAgICAgICAgbWV0YWRhdGEgPSB7XG4gICAgICAgICAgb3duZXI6IGYubWV0YWRhdGEub3duZXIsXG4gICAgICAgICAgb3duZXJfbmFtZTogZi5tZXRhZGF0YS5vd25lcl9uYW1lLFxuICAgICAgICAgIHNwYWNlOiBzcGFjZUlkLFxuICAgICAgICAgIGluc3RhbmNlOiBpbnNJZCxcbiAgICAgICAgICBhcHByb3ZlOiBhcHByb3ZlSWQsXG4gICAgICAgICAgcGFyZW50OiBjZi5faWRcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKGlkeCA9PT0gMCkge1xuICAgICAgICAgIG1ldGFkYXRhLmN1cnJlbnQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIG5ld0ZpbGUubWV0YWRhdGEgPSBtZXRhZGF0YTtcbiAgICAgICAgcmV0dXJuIGNmcy5pbnN0YW5jZXMuaW5zZXJ0KG5ld0ZpbGUpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufTtcblxudXVmbG93TWFuYWdlckZvckluaXRBcHByb3ZhbC5pbml0aWF0ZVJlY29yZEluc3RhbmNlSW5mbyA9IGZ1bmN0aW9uKHJlY29yZElkcywgaW5zSWQsIHNwYWNlSWQpIHtcbiAgb2JqZWN0VXBkYXRlKHJlY29yZElkcy5vLCByZWNvcmRJZHMuaWRzWzBdLCB7XG4gICAgaW5zdGFuY2VzOiBbXG4gICAgICB7XG4gICAgICAgIF9pZDogaW5zSWQsXG4gICAgICAgIHN0YXRlOiAnZHJhZnQnXG4gICAgICB9XG4gICAgXSxcbiAgICBsb2NrZWQ6IHRydWUsXG4gICAgaW5zdGFuY2Vfc3RhdGU6ICdkcmFmdCdcbiAgfSk7XG59O1xuXG51dWZsb3dNYW5hZ2VyRm9ySW5pdEFwcHJvdmFsLmluaXRpYXRlUmVsYXRlZFJlY29yZEluc3RhbmNlSW5mbyA9IGZ1bmN0aW9uKHJlbGF0ZWRUYWJsZXNJbmZvLCBpbnNJZCwgc3BhY2VJZCkge1xuICBfLmVhY2gocmVsYXRlZFRhYmxlc0luZm8sIGZ1bmN0aW9uKHRhYmxlSXRlbXMsIHJlbGF0ZWRPYmplY3ROYW1lKSB7XG4gICAgdmFyIHJlbGF0ZWRDb2xsZWN0aW9uO1xuICAgIHJlbGF0ZWRDb2xsZWN0aW9uID0gQ3JlYXRvci5nZXRDb2xsZWN0aW9uKHJlbGF0ZWRPYmplY3ROYW1lLCBzcGFjZUlkKTtcbiAgICByZXR1cm4gXy5lYWNoKHRhYmxlSXRlbXMsIGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgIHJldHVybiByZWxhdGVkQ29sbGVjdGlvbi5kaXJlY3QudXBkYXRlKGl0ZW0uX3RhYmxlLl9pZCwge1xuICAgICAgICAkc2V0OiB7XG4gICAgICAgICAgaW5zdGFuY2VzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIF9pZDogaW5zSWQsXG4gICAgICAgICAgICAgIHN0YXRlOiAnZHJhZnQnXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXSxcbiAgICAgICAgICBfdGFibGU6IGl0ZW0uX3RhYmxlXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn07XG5cbnV1Zmxvd01hbmFnZXJGb3JJbml0QXBwcm92YWwuY2hlY2tJc0luQXBwcm92YWwgPSBmdW5jdGlvbihyZWNvcmRJZHMsIHNwYWNlSWQpIHtcbiAgdmFyIHJlY29yZDtcbiAgcmVjb3JkID0gb2JqZWN0RmluZE9uZShyZWNvcmRJZHMubywge1xuICAgIGZpbHRlcnM6IFtbJ19pZCcsICc9JywgcmVjb3JkSWRzLmlkc1swXV1dLFxuICAgIGZpZWxkczogWydpbnN0YW5jZXMnXVxuICB9KTtcbiAgaWYgKHJlY29yZCAmJiByZWNvcmQuaW5zdGFuY2VzICYmIHJlY29yZC5pbnN0YW5jZXNbMF0uc3RhdGUgIT09ICdjb21wbGV0ZWQnICYmIENyZWF0b3IuQ29sbGVjdGlvbnMuaW5zdGFuY2VzLmZpbmQocmVjb3JkLmluc3RhbmNlc1swXS5faWQpLmNvdW50KCkgPiAwKSB7XG4gICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcignZXJyb3IhJywgXCLmraTorrDlvZXlt7Llj5HotbfmtYHnqIvmraPlnKjlrqHmibnkuK3vvIzlvoXlrqHmibnnu5PmnZ/mlrnlj6/lj5HotbfkuIvkuIDmrKHlrqHmibnvvIFcIik7XG4gIH1cbn07XG4iLCJKc29uUm91dGVzLmFkZCAncG9zdCcsICcvYXBpL29iamVjdC93b3JrZmxvdy9kcmFmdHMnLCAocmVxLCByZXMsIG5leHQpIC0+XG5cdHRyeVxuXHRcdGN1cnJlbnRfdXNlcl9pbmZvID0gdXVmbG93TWFuYWdlckZvckluaXRBcHByb3ZhbC5jaGVja19hdXRob3JpemF0aW9uKHJlcSlcblx0XHRjdXJyZW50X3VzZXJfaWQgPSBjdXJyZW50X3VzZXJfaW5mby5faWRcblxuXHRcdGhhc2hEYXRhID0gcmVxLmJvZHlcblxuXHRcdGluc2VydGVkX2luc3RhbmNlcyA9IG5ldyBBcnJheVxuXG5cdFx0Xy5lYWNoIGhhc2hEYXRhWydJbnN0YW5jZXMnXSwgKGluc3RhbmNlX2Zyb21fY2xpZW50KSAtPlxuXHRcdFx0bmV3X2luc19pZCA9IHV1Zmxvd01hbmFnZXJGb3JJbml0QXBwcm92YWwuY3JlYXRlX2luc3RhbmNlKGluc3RhbmNlX2Zyb21fY2xpZW50LCBjdXJyZW50X3VzZXJfaW5mbylcblxuXHRcdFx0bmV3X2lucyA9IENyZWF0b3IuQ29sbGVjdGlvbnMuaW5zdGFuY2VzLmZpbmRPbmUoeyBfaWQ6IG5ld19pbnNfaWQgfSwgeyBmaWVsZHM6IHsgc3BhY2U6IDEsIGZsb3c6IDEsIGZsb3dfdmVyc2lvbjogMSwgZm9ybTogMSwgZm9ybV92ZXJzaW9uOiAxIH0gfSlcblxuXHRcdFx0aW5zZXJ0ZWRfaW5zdGFuY2VzLnB1c2gobmV3X2lucylcblxuXHRcdEpzb25Sb3V0ZXMuc2VuZFJlc3VsdCByZXMsIHtcblx0XHRcdGNvZGU6IDIwMFxuXHRcdFx0ZGF0YTogeyBpbnNlcnRzOiBpbnNlcnRlZF9pbnN0YW5jZXMgfVxuXHRcdH1cblx0Y2F0Y2ggZVxuXHRcdGNvbnNvbGUuZXJyb3IgZS5zdGFja1xuXHRcdEpzb25Sb3V0ZXMuc2VuZFJlc3VsdCByZXMsIHtcblx0XHRcdGNvZGU6IDIwMFxuXHRcdFx0ZGF0YTogeyBlcnJvcnM6IFt7IGVycm9yTWVzc2FnZTogZS5yZWFzb24gfHwgZS5tZXNzYWdlIH1dIH1cblx0XHR9XG5cbiIsIkpzb25Sb3V0ZXMuYWRkKCdwb3N0JywgJy9hcGkvb2JqZWN0L3dvcmtmbG93L2RyYWZ0cycsIGZ1bmN0aW9uKHJlcSwgcmVzLCBuZXh0KSB7XG4gIHZhciBjdXJyZW50X3VzZXJfaWQsIGN1cnJlbnRfdXNlcl9pbmZvLCBlLCBoYXNoRGF0YSwgaW5zZXJ0ZWRfaW5zdGFuY2VzO1xuICB0cnkge1xuICAgIGN1cnJlbnRfdXNlcl9pbmZvID0gdXVmbG93TWFuYWdlckZvckluaXRBcHByb3ZhbC5jaGVja19hdXRob3JpemF0aW9uKHJlcSk7XG4gICAgY3VycmVudF91c2VyX2lkID0gY3VycmVudF91c2VyX2luZm8uX2lkO1xuICAgIGhhc2hEYXRhID0gcmVxLmJvZHk7XG4gICAgaW5zZXJ0ZWRfaW5zdGFuY2VzID0gbmV3IEFycmF5O1xuICAgIF8uZWFjaChoYXNoRGF0YVsnSW5zdGFuY2VzJ10sIGZ1bmN0aW9uKGluc3RhbmNlX2Zyb21fY2xpZW50KSB7XG4gICAgICB2YXIgbmV3X2lucywgbmV3X2luc19pZDtcbiAgICAgIG5ld19pbnNfaWQgPSB1dWZsb3dNYW5hZ2VyRm9ySW5pdEFwcHJvdmFsLmNyZWF0ZV9pbnN0YW5jZShpbnN0YW5jZV9mcm9tX2NsaWVudCwgY3VycmVudF91c2VyX2luZm8pO1xuICAgICAgbmV3X2lucyA9IENyZWF0b3IuQ29sbGVjdGlvbnMuaW5zdGFuY2VzLmZpbmRPbmUoe1xuICAgICAgICBfaWQ6IG5ld19pbnNfaWRcbiAgICAgIH0sIHtcbiAgICAgICAgZmllbGRzOiB7XG4gICAgICAgICAgc3BhY2U6IDEsXG4gICAgICAgICAgZmxvdzogMSxcbiAgICAgICAgICBmbG93X3ZlcnNpb246IDEsXG4gICAgICAgICAgZm9ybTogMSxcbiAgICAgICAgICBmb3JtX3ZlcnNpb246IDFcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gaW5zZXJ0ZWRfaW5zdGFuY2VzLnB1c2gobmV3X2lucyk7XG4gICAgfSk7XG4gICAgcmV0dXJuIEpzb25Sb3V0ZXMuc2VuZFJlc3VsdChyZXMsIHtcbiAgICAgIGNvZGU6IDIwMCxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgaW5zZXJ0czogaW5zZXJ0ZWRfaW5zdGFuY2VzXG4gICAgICB9XG4gICAgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgZSA9IGVycm9yO1xuICAgIGNvbnNvbGUuZXJyb3IoZS5zdGFjayk7XG4gICAgcmV0dXJuIEpzb25Sb3V0ZXMuc2VuZFJlc3VsdChyZXMsIHtcbiAgICAgIGNvZGU6IDIwMCxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgZXJyb3JzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiBlLnJlYXNvbiB8fCBlLm1lc3NhZ2VcbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufSk7XG4iXX0=
