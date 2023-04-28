/**;
 * @description {Class} wdCalendar
 * This is the main class of wdCalendar.
 */
(function ($) {
  var __WDAY = new Array(
    i18n.xgcalendar.dateformat.sun,
    i18n.xgcalendar.dateformat.mon,
    i18n.xgcalendar.dateformat.tue,
    i18n.xgcalendar.dateformat.wed,
    i18n.xgcalendar.dateformat.thu,
    i18n.xgcalendar.dateformat.fri,
    i18n.xgcalendar.dateformat.sat
  );
  var __MonthName = new Array(
    i18n.xgcalendar.dateformat.jan,
    i18n.xgcalendar.dateformat.feb,
    i18n.xgcalendar.dateformat.mar,
    i18n.xgcalendar.dateformat.apr,
    i18n.xgcalendar.dateformat.may,
    i18n.xgcalendar.dateformat.jun,
    i18n.xgcalendar.dateformat.jul,
    i18n.xgcalendar.dateformat.aug,
    i18n.xgcalendar.dateformat.sep,
    i18n.xgcalendar.dateformat.oct,
    i18n.xgcalendar.dateformat.nov,
    i18n.xgcalendar.dateformat.dec
  );
  if (!Clone || typeof Clone != "function") {
    var Clone = function (obj) {
      var objClone = new Object();
      if (obj.constructor == Object) {
        objClone = new obj.constructor();
      } else {
        objClone = new obj.constructor(obj.valueOf());
      }
      for (var key in obj) {
        if (objClone[key] != obj[key]) {
          if (typeof obj[key] == "object") {
            objClone[key] = Clone(obj[key]);
          } else {
            objClone[key] = obj[key];
          }
        }
      }
      objClone.toString = obj.toString;
      objClone.valueOf = obj.valueOf;
      return objClone;
    };
  }
  if (!dateFormat || typeof dateFormat != "function") {
    var dateFormat = function (format) {
      var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "H+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        w: "0123456".indexOf(this.getDay()),
        W: __WDAY[this.getDay()],
        L: __MonthName[this.getMonth()], //non-standard
      };
      if (/(y+)/.test(format)) {
        format = format.replace(
          RegExp.$1,
          (this.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
      }
      for (var k in o) {
        if (new RegExp("(" + k + ")").test(format))
          format = format.replace(
            RegExp.$1,
            RegExp.$1.length == 1
              ? o[k]
              : ("00" + o[k]).substr(("" + o[k]).length)
          );
      }
      return format;
    };
  }
  if (!DateAdd || typeof DateDiff != "function") {
    var DateAdd = function (interval, number, idate) {
      number = parseInt(number);
      var date;
      if (typeof idate == "string") {
        date = idate.split(/\D/);
        eval("var date = new Date(" + date.join(",") + ")");
      }

      if (typeof idate == "object") {
        date = new Date(idate.toString());
      }
      switch (interval) {
        case "y":
          date.setFullYear(date.getFullYear() + number);
          break;
        case "m":
          date.setMonth(date.getMonth() + number);
          break;
        case "d":
          date.setDate(date.getDate() + number);
          break;
        case "w":
          date.setDate(date.getDate() + 7 * number);
          break;
        case "h":
          date.setHours(date.getHours() + number);
          break;
        case "n":
          date.setMinutes(date.getMinutes() + number);
          break;
        case "s":
          date.setSeconds(date.getSeconds() + number);
          break;
        case "l":
          date.setMilliseconds(date.getMilliseconds() + number);
          break;
      }
      return date;
    };
  }
  if (!DateDiff || typeof DateDiff != "function") {
    var DateDiff = function (interval, d1, d2) {
      switch (interval) {
        case "d": //date
        case "w":
          d1 = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate());
          d2 = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate());
          break; //w
        case "h":
          d1 = new Date(
            d1.getFullYear(),
            d1.getMonth(),
            d1.getDate(),
            d1.getHours()
          );
          d2 = new Date(
            d2.getFullYear(),
            d2.getMonth(),
            d2.getDate(),
            d2.getHours()
          );
          break; //h
        case "n":
          d1 = new Date(
            d1.getFullYear(),
            d1.getMonth(),
            d1.getDate(),
            d1.getHours(),
            d1.getMinutes()
          );
          d2 = new Date(
            d2.getFullYear(),
            d2.getMonth(),
            d2.getDate(),
            d2.getHours(),
            d2.getMinutes()
          );
          break;
        case "s":
          d1 = new Date(
            d1.getFullYear(),
            d1.getMonth(),
            d1.getDate(),
            d1.getHours(),
            d1.getMinutes(),
            d1.getSeconds()
          );
          d2 = new Date(
            d2.getFullYear(),
            d2.getMonth(),
            d2.getDate(),
            d2.getHours(),
            d2.getMinutes(),
            d2.getSeconds()
          );
          break;
      }
      var t1 = d1.getTime(),
        t2 = d2.getTime();
      var diff = NaN;
      switch (interval) {
        case "y":
          diff = d2.getFullYear() - d1.getFullYear();
          break; //y
        case "m":
          diff =
            (d2.getFullYear() - d1.getFullYear()) * 12 +
            d2.getMonth() -
            d1.getMonth();
          break; //m
        case "d":
          diff = Math.floor(t2 / 86400000) - Math.floor(t1 / 86400000);
          break;
        case "w":
          diff =
            Math.floor((t2 + 345600000) / 604800000) -
            Math.floor((t1 + 345600000) / 604800000);
          break; //w
        case "h":
          diff = Math.floor(t2 / 3600000) - Math.floor(t1 / 3600000);
          break; //h
        case "n":
          diff = Math.floor(t2 / 60000) - Math.floor(t1 / 60000);
          break; //
        case "s":
          diff = Math.floor(t2 / 1000) - Math.floor(t1 / 1000);
          break; //s
        case "l":
          diff = t2 - t1;
          break;
      }
      return diff;
    };
  }
  if ($.fn.noSelect == undefined) {
    $.fn.noSelect = function (p) {
      //no select plugin by me :-)
      if (p == null) prevent = true;
      else prevent = p;
      if (prevent) {
        return this.each(function () {
          if ($.browser.msie || $.browser.safari)
            $(this).bind("selectstart", function () {
              return false;
            });
          else if ($.browser.mozilla) {
            $(this).css("MozUserSelect", "none");
            $("body").trigger("focus");
          } else if ($.browser.opera)
            $(this).bind("mousedown", function () {
              return false;
            });
          else $(this).attr("unselectable", "on");
        });
      } else {
        return this.each(function () {
          if ($.browser.msie || $.browser.safari) $(this).unbind("selectstart");
          else if ($.browser.mozilla) $(this).css("MozUserSelect", "inherit");
          else if ($.browser.opera) $(this).unbind("mousedown");
          else $(this).removeAttr("unselectable", "on");
        });
      }
    }; //end noSelect
  }
  // NOTE: Funzione di creazione del calendario
  /** Main function */
  $.fn.bcalendar = function (option) {
    var def = {
      /**
       * @description {Config} view
       * {String} Three calendar view provided, 'day','week','month'. 'week' by default.
       */
      view: "week",
      /**
       * @description {Config} weekstartday
       * {Number} First day of week 0 for Sun, 1 for Mon, 2 for Tue.
       */
      weekstartday: 1, //start from Monday by default
      theme: 0, //theme no
      /**
       * @description {Config} height
       * {Number} Calendar height, false for page height by default.
       */
      height: false,
      /**
       * @description {Config} url
       * {String} Url to request calendar data.
       */
      url: "",
      /**
       * @description {Config} eventItems
       * {Array} event items for initialization.
       */
      eventItems: [],
      method: "POST",
      /**
       * @description {Config} showday
       * {Date} Current date. today by default.
       */
      showday: new Date(),
      /**
       * @description {Event} onBeforeRequestData:function(stage)
       * Fired before any ajax request is sent.
       * @param {Number} stage. 1 for retrieving events, 2 - adding event, 3 - removiing event, 4 - update event.
       */
      onBeforeRequestData: false,
      /**
       * @description {Event} onAfterRequestData:function(stage)
       * Fired before any ajax request is finished.
       * @param {Number} stage. 1 for retrieving events, 2 - adding event, 3 - removiing event, 4 - update event.
       */
      onAfterRequestData: false,
      /**
       * @description {Event} onAfterRequestData:function(stage)
       * Fired when some errors occur while any ajax request is finished.
       * @param {Number} stage. 1 for retrieving events, 2 - adding event, 3 - removiing event, 4 - update event.
       */
      onRequestDataError: false,

      onWeekOrMonthToDay: false,
      /**
       * @description {Event} quickAddHandler:function(calendar, param )
       * Fired when user quick adds an item. If this function is set, ajax request to quickAddUrl will abort.
       * @param {Object} calendar Calendar object.
       * @param {Array} param Format [{name:"name1", value:"value1"}, ...]
       *
       */
      quickAddHandler: false,
      /**
       * @description {Config} quickAddUrl
       * {String} Url for quick adding.
       */
      quickAddUrl: "",
      /**
       * @description {Config} quickUpdateUrl
       * {String} Url for time span update.
       */
      quickUpdateUrl: "",
      /**
       * @description {Config} quickDeleteUrl
       * {String} Url for removing an event.
       */
      quickDeleteUrl: "",
      /**
       * @description {Config} autoload
       * {Boolean} If event items is empty, and this param is set to true.
       * Event will be retrieved by ajax call right after calendar is initialized.
       */
      autoload: false,
      /**
       * @description {Config} readonly
       * {Boolean} Indicate calendar is readonly or editable
       */
      readonly: false,
      /**
       * @description {Config} extParam
       * {Array} Extra params submitted to server.
       * Sample - [{name:"param1", value:"value1"}, {name:"param2", value:"value2"}]
       */
      extParam: [],
      /**
       * @description {Config} enableDrag
       * {Boolean} Whether end user can drag event item by mouse.
       */
      enableDrag: true,
      /**
       * @description {Config} firstHour
       * {Number} First hour to visualize in daily and weekly mode
       */
      firstHour: 0,
      /**
       * @description {Config} lastHour
       * {Number} End hour to visualize in daily and weekly mode
       */
      lastHour: 24,
      /**
       * @description {Config} heightBox
       * {Number} Height of calendar box in pixel
       */
      heightBox: false,
      loadDateR: [],
    };
    var eventDiv = $("#gridEvent");
    if (eventDiv.length == 0) {
      eventDiv = $("<div id='gridEvent' style='display:none;'></div>").appendTo(
        document.body
      );
    }
    var gridcontainer = $(this);
    option = $.extend(def, option);
    //no quickUpdateUrl, dragging disabled.
    if (option.quickUpdateUrl == null || option.quickUpdateUrl == "") {
      option.enableDrag = false;
    }
    if (!option.height){
      option.height=(option.lastHour - option.firstHour)*42;
    }
    if (!option.heightBox){
      option.heightBox=(option.lastHour - option.firstHour)*42;
    }
    //template for month and date
    var __SCOLLEVENTTEMP =
      '<DIV style="WIDTH:${width};top:${top};left:${left};" title="${title}" class="chip chip${i} ${drag}"><div class="dhdV" style="display:none">${data}</div><DIV style="BORDER-BOTTOM-COLOR:${bdcolor}" class=ct>&nbsp;</DIV><DL style="BORDER-BOTTOM-COLOR:${bdcolor}; BACKGROUND-COLOR:${bgcolor1}; BORDER-TOP-COLOR: ${bdcolor}; HEIGHT: ${height}px; BORDER-RIGHT-COLOR:${bdcolor}; BORDER-LEFT-COLOR:${bdcolor}"><DT style="BACKGROUND-COLOR:${bgcolor2}">${starttime} - ${endtime} ${icon}</DT><DD><SPAN>${content}</SPAN></DD><DIV class=\'resizer\' style=\'display:${redisplay}\'><DIV class=rszr_icon>&nbsp;</DIV></DIV></DL><DIV style="BORDER-BOTTOM-COLOR:${bdcolor}; BACKGROUND-COLOR:${bgcolor1}; BORDER-TOP-COLOR: ${bdcolor}; BORDER-RIGHT-COLOR: ${bdcolor}; BORDER-LEFT-COLOR:${bdcolor}" class=cb1>&nbsp;</DIV><DIV style="BORDER-BOTTOM-COLOR:${bdcolor}; BORDER-TOP-COLOR:${bdcolor}; BORDER-RIGHT-COLOR:${bdcolor}; BORDER-LEFT-COLOR:${bdcolor}" class=cb2>&nbsp;</DIV></DIV>';
    var __ALLDAYEVENTTEMP =
      '<div class="rb-o ${eclass}" id="${id}" title="${title}" style="color:${color};"><div class="dhdV" style="display:none">${data}</div><div class="${extendClass} rb-m" style="background-color:${color}">${extendHTML}<div class="rb-i">${content}</div></div></div>';
    var __MonthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var __LASSOTEMP =
      "<div class='drag-lasso' style='left:${left}px;top:${top}px;width:${width}px;height:${height}px;'>&nbsp;</div>";
    //for dragging var
    var _dragdata;
    var _dragevent;

    //clear DOM
    clearcontainer();

    //no height specified in options, we get page height.
    if (!option.height) {
      option.height = document.documentElement.clientHeight;
    }
    //
    gridcontainer.css("overflow-y", "visible").height(option.height - 8);

    //populate events data for first display.
    if (option.url && option.autoload) {
      // NOTE: popola il calendario la prima volta
      populate();
    } else {
      //contruct HTML
      // NOTE: renderizza il calendario
      render();
      //get date range
      var d = getRdate();
      pushER(d.start, d.end);
    }

    /** Clear the DOM */
    function clearcontainer() {
      gridcontainer.empty();
    }
    //get range
    function getRdate() {
      return { start: option.vstart, end: option.vend };
    }
    //add date range to cache.
    function pushER(start, end) {
      var ll = option.loadDateR.length;
      if (!end) {
        end = start;
      }
      if (ll == 0) {
        option.loadDateR.push({ startdate: start, enddate: end });
      } else {
        for (var i = 0; i < ll; i++) {
          var dr = option.loadDateR[i];
          var diff = DateDiff("d", start, dr.startdate);
          if (diff == 0 || diff == 1) {
            if (dr.enddate < end) {
              dr.enddate = end;
            }
            break;
          } else if (diff > 1) {
            var d2 = DateDiff("d", end, dr.startdate);
            if (d2 > 1) {
              option.loadDateR.splice(0, 0, { startdate: start, enddate: end });
            } else {
              dr.startdate = start;
              if (dr.enddate < end) {
                dr.enddate = end;
              }
            }
            break;
          } else {
            var d3 = DateDiff("d", end, dr.startdate);

            if (dr.enddate < end) {
              if (d3 < 1) {
                dr.enddate = end;
                break;
              } else {
                if (i == ll - 1) {
                  option.loadDateR.push({ startdate: start, enddate: end });
                }
              }
            }
          }
        }
        //end for
        //clear
        ll = option.loadDateR.length;
        if (ll > 1) {
          for (var i = 0; i < ll - 1; ) {
            var d1 = option.loadDateR[i];
            var d2 = option.loadDateR[i + 1];

            var diff1 = DateDiff("d", d2.startdate, d1.enddate);
            if (diff1 <= 1) {
              d1.startdate =
                d2.startdate > d1.startdate ? d1.startdate : d2.startdate;
              d1.enddate = d2.enddate > d1.enddate ? d2.enddate : d1.enddate;
              option.loadDateR.splice(i + 1, 1);
              ll--;
              continue;
            }
            i++;
          }
        }
      }
    }
    /** Contruct the DOM */
    function render() {
      //params needed
      //viewType, showday, events, config
      var showday = new Date(
        option.showday.getFullYear(),
        option.showday.getMonth(),
        option.showday.getDate()
      );
      var events = option.eventItems;
      var config = {
        view: option.view,
        weekstartday: option.weekstartday,
        theme: option.theme,
      };
      if (option.view == "day" || option.view == "week") {
        var $dvtec = $("#dvtec");
        if ($dvtec.length > 0) {
          option.scoll = $dvtec.attr("scrollTop"); //get scroll bar position
        }
      }
      switch (option.view) {
        case "day":
          // NOTE: Costruisce la View per 1 giorno
          BuildDaysAndWeekView(showday, 1, events, config);
          break;
        case "week":
          // NOTE: Costruisce la View per la settimana
          BuildDaysAndWeekView(showday, 7, events, config);
          break;
        case "month":
          // NOTE: Costruisce la view per il mese
          BuildMonthView(showday, events, config);
          break;
        default:
          alert(i18n.xgcalendar.no_implement);
          break;
      }
      // NOTE: Inizializza gli eventi
      initevents(option.view);
      // NOTE: Ridimensiona il container a seconda della finestra
      ResizeView();
    }

    //build day view
    /**
     * Builds the day and week view
     * @param {Date} startday The day to start the view
     * @param {Number} l number of days
     * @param {Object} events events object
     * @param {Object} config Config options
     */
    function BuildDaysAndWeekView(startday, l, events, config) {
      var days = [];
      if (l == 1) {
        var show = dateFormat.call(startday, i18n.xgcalendar.dateformat.Md);
        days.push({
          display: show,
          date: startday,
          day: startday.getDate(),
          year: startday.getFullYear(),
          month: startday.getMonth() + 1,
        });
        option.datestrshow = CalDateShow(days[0].date);
        option.vstart = days[0].date;
        option.vend = days[0].date;
      } else {
        var w = 0;
        if (l == 7) {
          w = config.weekstartday - startday.getDay();
          if (w > 0) w = w - 7;
        }
        var ndate;
        for (var i = w, j = 0; j < l; i = i + 1, j++) {
          ndate = DateAdd("d", i, startday);
          var show = dateFormat.call(ndate, i18n.xgcalendar.dateformat.Md);
          days.push({
            display: show,
            date: ndate,
            day: ndate.getDate(),
            year: ndate.getFullYear(),
            month: ndate.getMonth() + 1,
          });
        }
        option.vstart = days[0].date;
        option.vend = days[l - 1].date;
        option.datestrshow = CalDateShow(days[0].date, days[l - 1].date);
      }

      var allDayEvents = [];
      var scollDayEvents = [];
      //get number of all-day events, including more-than-one-day events.
      var dM = PrepareEvents(days, events, allDayEvents, scollDayEvents);

      var html = [];
      html.push('<div id="dvwkcontaienr" class="wktopcontainer">');
      html.push(
        '<table class="wk-top" border="0" cellpadding="0" cellspacing="0">'
      );
      BuildWT(html, days, allDayEvents, dM);
      html.push("</table>");
      html.push("</div>");

      //onclick=\"javascript:FunProxy('rowhandler',event,this);\"
      html.push(
        '<div id="dvtec"  class="scolltimeevent"><table style="table-layout: fixed;',
        jQuery.browser.msie ? "" : "width:100%",
        '" cellspacing="0" cellpadding="0"><tbody><tr><td>'
      );
      html.push(
        `<table style="height: ${option.heightBox}px" id="tgTable" class="tg-timedevents" cellspacing="0" cellpadding="0"><tbody>`
      );
      BuildDayScollEventContainer(html, days, scollDayEvents);
      html.push("</tbody></table></td></tr></tbody></table></div>");
      gridcontainer.html(html.join(""));
      html = null;
      //TODO event handlers
      //$("#weekViewAllDaywk").click(RowHandler);
    }
    //build month view
    function BuildMonthView(showday, events, config) {
      var cc =
        "<div id='cal-month-cc' class='cc'><div id='cal-month-cc-header'><div class='cc-close' id='cal-month-closebtn'></div><div id='cal-month-cc-title' class='cc-title'></div></div><div id='cal-month-cc-body' class='cc-body'><div id='cal-month-cc-content' class='st-contents'><table class='st-grid' cellSpacing='0' cellPadding='0'><tbody></tbody></table></div></div></div>";
      var html = [];
      html.push(cc);
      //build header
      html.push('<div id="mvcontainer" class="mv-container">');
      html.push(
        '<table id="mvweek" class="mv-daynames-table" cellSpacing="0" cellPadding="0"><tbody><tr>'
      );
      for (var i = config.weekstartday, j = 0; j < 7; i++, j++) {
        if (i > 6) i = 0;
        var p = { dayname: __WDAY[i] };
        html.push(
          '<th class="mv-dayname" title="',
          __WDAY[i],
          '">',
          __WDAY[i],
          ""
        );
      }
      html.push("</tr></tbody></table>");
      html.push("</div>");
      var bH = GetMonthViewBodyHeight() - GetMonthViewHeaderHeight();

      html.push(
        '<div id="mvEventContainer" class="mv-event-container" style="height:',
        bH,
        "px;",
        '">'
      );
      BuilderMonthBody(html, showday, config.weekstartday, events, bH);
      html.push("</div>");
      gridcontainer.html(html.join(""));
      html = null;
      $("#cal-month-closebtn").click(closeCc);
    }
    function closeCc() {
      $("#cal-month-cc").css("visibility", "hidden");
    }

    //all-day event, including more-than-one-day events
    /**
     * @param {Array} dayarrs Array of days to view
     * @param {Array} events Array of event objects
     * @param {Array} aDE Array of all-day event objects
     * @param {any} sDE
     * @returns {Number} Number of events
     */
    function PrepareEvents(dayarrs, events, aDE, sDE) {
      var l = dayarrs.length;
      var el = events.length;
      var fE = [];
      var deB = aDE;
      var deA = sDE;
      for (var j = 0; j < el; j++) {
        var sD = events[j][2];
        var eD = events[j][3];
        var s = {};
        s.event = events[j];
        s.day = sD.getDate();
        s.year = sD.getFullYear();
        s.month = sD.getMonth() + 1;
        s.allday = events[j][4] == 1;
        s.crossday = events[j][5] == 1;
        s.reevent = events[j][6] == 1; //Recurring event
        s.daystr = [s.year, s.month, s.day].join("/");
        s.st = {};
        s.st.hour = sD.getHours();
        s.st.minute = sD.getMinutes();
        s.st.p = s.st.hour * 60 + s.st.minute; // start time
        s.et = {};
        s.et.hour = eD.getHours();
        s.et.minute = eD.getMinutes();
        s.et.p = s.et.hour * 60 + s.et.minute; // end time
        fE.push(s);
      }
      var dMax = 0;
      for (var i = 0; i < l; i++) {
        var da = dayarrs[i];
        deA[i] = [];
        deB[i] = [];
        da.daystr = da.year + "/" + da.month + "/" + da.day;
        for (var j = 0; j < fE.length; j++) {
          if (!fE[j].crossday && !fE[j].allday) {
            if (da.daystr == fE[j].daystr) deA[i].push(fE[j]);
          } else {
            if (da.daystr == fE[j].daystr) {
              deB[i].push(fE[j]);
              dMax++;
            } else {
              if (
                i == 0 &&
                da.date >= fE[j].event[2] &&
                da.date <= fE[j].event[3]
              ) {
                //first more-than-one-day event
                deB[i].push(fE[j]);
                dMax++;
              }
            }
          }
        }
      }
      var lrdate = dayarrs[l - 1].date;
      for (var i = 0; i < l; i++) {
        //to deal with more-than-one-day event
        var de = deB[i];
        if (de.length > 0) {
          //
          for (var j = 0; j < de.length; j++) {
            var end =
              DateDiff("d", lrdate, de[j].event[3]) > 0
                ? lrdate
                : de[j].event[3];
            de[j].colSpan = DateDiff("d", dayarrs[i].date, end) + 1;
          }
        }
        de = null;
      }
      //for all-day events
      for (var i = 0; i < l; i++) {
        var de = deA[i];
        if (de.length > 0) {
          var x = [];
          var y = [];
          var D = [];
          var dl = de.length;
          var Ia;
          for (var j = 0; j < dl; ++j) {
            var ge = de[j];
            for (var La = ge.st.p, Ia = 0; y[Ia] > La; ) Ia++;
            ge.PO = Ia;
            ge.ne = []; //PO is how many events before this one
            y[Ia] = ge.et.p || 1440;
            x[Ia] = ge;
            if (!D[Ia]) {
              D[Ia] = [];
            }
            D[Ia].push(ge);
            if (Ia != 0) {
              ge.pe = [x[Ia - 1]]; //previous event
              x[Ia - 1].ne.push(ge); //next event
            }
            for (Ia = Ia + 1; y[Ia] <= La; ) Ia++;
            if (x[Ia]) {
              var k = x[Ia];
              ge.ne.push(k);
              k.pe.push(ge);
            }
            ge.width = 1 / (ge.PO + 1);
            ge.left = 1 - ge.width;
          }
          var k = Array.prototype.concat.apply([], D);
          x = y = D = null;
          var t = k.length;
          for (var y = t; y--; ) {
            var H = 1;
            var La = 0;
            var x = k[y];
            for (var D = x.ne.length; D--; ) {
              var Ia = x.ne[D];
              La = Math.max(La, Ia.VL);
              H = Math.min(H, Ia.left);
            }
            x.VL = La + 1;
            x.width = H / (x.PO + 1);
            x.left = H - x.width;
          }
          for (var y = 0; y < t; y++) {
            var x = k[y];
            x.left = 0;
            if (x.pe)
              for (var D = x.pe.length; D--; ) {
                var H = x.pe[D];
                x.left = Math.max(x.left, H.left + H.width);
              }
            var p = (1 - x.left) / x.VL;
            x.width = Math.max(x.width, p);
            x.aQ = Math.min(1 - x.left, x.width + 0.7 * p); //width offset
          }
          de = null;
          deA[i] = k;
        }
      }
      return dMax;
    }

    function BuildWT(ht, dayarrs, events, dMax) {
      //1:
      ht.push("<tr>", '<th width="60" rowspan="3">&nbsp;</th>');
      for (var i = 0; i < dayarrs.length; i++) {
        var ev, title, cl;
        if (dayarrs.length == 1) {
          ev = "";
          title = "";
          cl = "";
        } else {
          ev = ""; // "onclick=\"javascript:FunProxy('week2day',event,this);\"";
          title = i18n.xgcalendar.to_date_view;
          cl = "wk-daylink";
        }
        ht.push(
          "<th abbr='",
          dateFormat.call(
            dayarrs[i].date,
            i18n.xgcalendar.dateformat.fulldayvalue
          ),
          "' class='gcweekname' scope=\"col\"><div title='",
          title,
          "' ",
          ev,
          " class='wk-dayname'><span class='",
          cl,
          "'>",
          dayarrs[i].display,
          "</span></div></th>"
        );
      }
      ht.push('<th width="16" rowspan="3">&nbsp;</th>');
      ht.push("</tr>"); //end tr1;
      //2:
      ht.push("<tr>");
      ht.push('<td class="wk-allday"');

      if (dayarrs.length > 1) {
        ht.push(" colSpan='", dayarrs.length, "'");
      }
      //onclick=\"javascript:FunProxy('rowhandler',event,this);\"
      ht.push(
        '><div id="weekViewAllDaywk" ><table class="st-grid" cellpadding="0" cellspacing="0"><tbody>'
      );

      if (dMax == 0) {
        ht.push("<tr>");
        for (var i = 0; i < dayarrs.length; i++) {
          ht.push(
            '<td class="st-c st-s"',
            " ch='qkadd' abbr='",
            dateFormat.call(dayarrs[i].date, "yyyy-M-d"),
            `' axis='${option.firstHour}'>&nbsp;</td>`
          );
        }
        ht.push("</tr>");
      } else {
        var l = events.length;
        var el = 0;
        var x = [];
        for (var j = 0; j < l; j++) {
          x.push(0);
        }
        //var c = tc();
        for (var j = 0; el < dMax; j++) {
          ht.push("<tr>");
          for (var h = 0; h < l; ) {
            var e = events[h][x[h]];
            ht.push("<td class='st-c");
            if (e) {
              //if exists
              x[h] = x[h] + 1;
              ht.push("'");
              var t = BuildMonthDayEvent(e, dayarrs[h].date, l - h);
              if (e.colSpan > 1) {
                ht.push(" colSpan='", e.colSpan, "'");
                h += e.colSpan;
              } else {
                h++;
              }
              ht.push(" ch='show'>", t);
              t = null;
              el++;
            } else {
              ht.push(
                " st-s' ch='qkadd' abbr='",
                dateFormat.call(
                  dayarrs[h].date,
                  i18n.xgcalendar.dateformat.fulldayvalue
                ),
                `' axis='${option.firstHour}'>&nbsp;`
              );
              h++;
            }
            ht.push("</td>");
          }
          ht.push("</tr>");
        }
        ht.push("<tr>");
        for (var h = 0; h < l; h++) {
          ht.push(
            "<td class='st-c st-s' ch='qkadd' abbr='",
            dateFormat.call(
              dayarrs[h].date,
              i18n.xgcalendar.dateformat.fulldayvalue
            ),
            `' axis='${option.firstHour}'>&nbsp;</td>`
          );
        }
        ht.push("</tr>");
      }
      ht.push("</tbody></table></div></td></tr>"); // stgrid end //wvAd end //td2 end //tr2 end
      //3:
      ht.push("<tr>");

      ht.push('<td style="height: 5px;"');
      if (dayarrs.length > 1) {
        ht.push(" colSpan='", dayarrs.length, "'");
      }
      ht.push("></td>");
      ht.push("</tr>");
    }

    /**
     * Builds the Event Container for non all-day events
     * @param {Array} ht Array of strings to construct the DOM
     * @param {Array} dayarrs Array of Date objects
     * @param {Array} events Array of event arrays
     */
    function BuildDayScollEventContainer(ht, dayarrs, events) {
      //1:
      ht.push("<tr>");
      ht.push("<td style='width:60px;'></td>");
      ht.push("<td");
      if (dayarrs.length > 1) {
        ht.push(" colSpan='", dayarrs.length, "'");
      }
      ht.push(
        '><div id="tgspanningwrapper" class="tg-spanningwrapper"><div style="font-size: 20px" class="tg-hourmarkers">'
      );
      for (var i = option.firstHour; i < option.lastHour; i++) {
        ht.push('<div class="tg-dualmarker"></div>');
      }
      ht.push("</div></div></td></tr>");

      //2:
      ht.push("<tr>");
      ht.push('<td style="width: 60px" class="tg-times">');

      //get current time
      var now = new Date();
      var h = now.getHours();
      var m = now.getMinutes();
      var mHg = gP(h, m) - 4; //make middle alignment vertically
      ht.push(
        '<div id="tgnowptr" class="tg-nowptr" style="left:0px;top:',
        mHg,
        'px"></div>'
      );
      var tmt = "";
      for (var i = option.firstHour; i < option.lastHour; i++) {
        tmt = fomartTimeShow(i);
        ht.push('<div style="height: 41px" class="tg-time">', tmt, "</div>");
      }
      ht.push("</td>");

      var l = dayarrs.length;
      var events_in_day = [];
      for (var i = 0; i < l; i++) {
        ht.push(
          "<td class=\"tg-col\" ch='qkadd' abbr='",
          dateFormat.call(
            dayarrs[i].date,
            i18n.xgcalendar.dateformat.fulldayvalue
          ),
          "'>"
        );
        var istoday =
          dateFormat.call(dayarrs[i].date, "yyyyMMdd") ==
          dateFormat.call(new Date(), "yyyyMMdd");
        // Today
        if (istoday) {
          ht.push(
            `<div style="margin-bottom: -${option.heightBox}px; height:${option.heightBox}px" class="tg-today">&nbsp;</div>`
          );
        }
        //var eventC = $(eventWrap);
        //onclick=\"javascript:FunProxy('rowhandler',event,this);\"
        ht.push(
          `<div  style="margin-bottom: -${option.heightBox}px; height: ${option.heightBox}px" id=\'tgCol`,
          i,
          '\' class="tg-col-eventwrapper">'
        );
        BuildEvents(ht, events[i], dayarrs[i]);
        ht.push("</div>");

        ht.push('<div class="tg-col-overlaywrapper" id=\'tgOver', i, "'>");
        if (istoday) {
          var mhh = mHg + 4;
          ht.push(
            '<div id="tgnowmarker" class="tg-hourmarker tg-nowmarker" style="left:0px;top:',
            mhh,
            'px"></div>'
          );
        }
        ht.push("</div>");
        ht.push("</td>");
      }
      ht.push("</tr>");
    }
    //show events to calendar
    /**
     * Constructs DOM for event of a given day
     * @param {Array} hv Array of strings to build DOM
     * @param {Array} events Array of event objects of the day
     * @param {Date} sday Date object of the day to build
     */
    function BuildEvents(hv, events, sday) {
      for (var i = 0; i < events.length; i++) {
        var c;
        if (events[i].event[7] && events[i].event[7] >= 0) {
          c = tc(events[i].event[7]); //theme
        } else {
          c = tc(); //default theme
        }

        if (events[i].event[4] != 1 || events[i].event[5] != 1) {
          if (!isOverlapped(events, i)) {
            events[i].aQ = 1;
            events[i].width = 1;
            events[i].left = 0;
          }
        }

        var tt = BuildDayEvent(c, events[i], i);
        hv.push(tt);
      }
    }
    function isOverlapped(events, ci) {
      for (var i = 0; i < ci; i++) {
        if (
          events[ci].st.p < events[i].et.p &&
          events[ci].et.p > events[i].st.p
        ) {
          return true;
        }
      }
      return false;
    }

    function getTitle(event) {
      var timeshow, locationshow, attendsshow, eventshow;
      var showtime = event[4] != 1;
      eventshow = event[1];
      var startformat = getymformat(event[2], null, showtime, true);
      var endformat = getymformat(event[3], event[2], showtime, true);
      timeshow =
        dateFormat.call(event[2], startformat) +
        " - " +
        dateFormat.call(event[3], endformat);
      locationshow =
        event[9] != undefined && event[9] != ""
          ? event[9]
          : i18n.xgcalendar.i_undefined;
      attendsshow = event[10] != undefined && event[10] != "" ? event[10] : "";
      var ret = [];
      if (event[4] == 1) {
        ret.push(
          "[" + i18n.xgcalendar.allday_event + "]",
          $.browser.mozilla ? "" : "\r\n"
        );
      } else {
        if (event[5] == 1) {
          ret.push(
            "[" + i18n.xgcalendar.repeat_event + "]",
            $.browser.mozilla ? "" : "\r\n"
          );
        }
      }
      ret.push(
        i18n.xgcalendar.time + ":",
        timeshow,
        $.browser.mozilla ? "" : "\r\n",
        i18n.xgcalendar.event + ":",
        eventshow,
        $.browser.mozilla ? "" : "\r\n",
        i18n.xgcalendar.location + ":",
        locationshow
      );
      if (attendsshow != "") {
        ret.push(
          $.browser.mozilla ? "" : "\r\n",
          i18n.xgcalendar.participant + ":",
          attendsshow
        );
      }
      return ret.join("");
    }
    /**
     * Builds events for given day
     * @param {any} theme
     * @param {any} e
     * @param {any} index
     * @returns {}
     */
    function BuildDayEvent(theme, e, index) {
      var p = {
        bdcolor: theme[0],
        bgcolor2: theme[0],
        bgcolor1: theme[2],
        width: "100%",
        icon: "",
        title: "",
        data: "",
      };
      p.starttime = pZero(e.st.hour) + ":" + pZero(e.st.minute);
      p.endtime = pZero(e.et.hour) + ":" + pZero(e.et.minute);
      p.content = e.event[1];
      p.title = getTitle(e.event);
      p.data = e.event.join("$");
      var icons = [];
      icons.push('<I class="cic cic-tmr">&nbsp;</I>');
      if (e.reevent) {
        icons.push('<I class="cic cic-spcl">&nbsp;</I>');
      }
      p.icon = icons.join("");
      var sP = gP(e.st.hour, e.st.minute);
      var eP = gP(e.et.hour, e.et.minute);
      p.top = sP + "px";
      p.left = e.left * 100 + "%";
      p.width = e.aQ * 100 + "%";
      p.height = eP - sP - 4;
      p.i = index;
      if (option.enableDrag && e.event[8] == 1) {
        p.drag = "drag";
        p.redisplay = "block";
      } else {
        p.drag = "";
        p.redisplay = "none";
      }
      var newtemp = Tp(__SCOLLEVENTTEMP, p);
      p = null;
      return newtemp;
    }

    //get body height in month view
    function GetMonthViewBodyHeight() {
      return option.height;
    }
    function GetMonthViewHeaderHeight() {
      return 21;
    }
    function BuilderMonthBody(htb, showday, startday, events, bodyHeight) {
      var firstdate = new Date(showday.getFullYear(), showday.getMonth(), 1);
      var diffday = startday - firstdate.getDay();
      var showmonth = showday.getMonth();
      if (diffday > 0) {
        diffday -= 7;
      }
      var startdate = DateAdd("d", diffday, firstdate);
      var enddate = DateAdd("d", 34, startdate);
      var rc = 5;

      if (
        enddate.getFullYear() == showday.getFullYear() &&
        enddate.getMonth() == showday.getMonth() &&
        enddate.getDate() < __MonthDays[showmonth]
      ) {
        enddate = DateAdd("d", 7, enddate);
        rc = 6;
      }
      option.vstart = startdate;
      option.vend = enddate;
      option.datestrshow = CalDateShow(startdate, enddate);
      bodyHeight = bodyHeight - 18 * rc;
      var rowheight = bodyHeight / rc;
      var roweventcount = parseInt(rowheight / 21);
      if (rowheight % 21 > 15) {
        roweventcount++;
      }
      var p = 100 / rc;
      var formatevents = [];
      var hastdata = formartEventsInHashtable(
        events,
        startday,
        7,
        startdate,
        enddate
      );
      var B = [];
      var C = [];
      for (var j = 0; j < rc; j++) {
        var k = 0;
        formatevents[j] = b = [];
        for (var i = 0; i < 7; i++) {
          var newkeyDate = DateAdd("d", j * 7 + i, startdate);
          C[j * 7 + i] = newkeyDate;
          var newkey = dateFormat.call(
            newkeyDate,
            i18n.xgcalendar.dateformat.fulldaykey
          );
          b[i] = hastdata[newkey];
          if (b[i] && b[i].length > 0) {
            k += b[i].length;
          }
        }
        B[j] = k;
      }
      //var c = tc();
      eventDiv.data("mvdata", formatevents);
      for (var j = 0; j < rc; j++) {
        //onclick=\"javascript:FunProxy('rowhandler',event,this);\"
        htb.push(
          "<div id='mvrow_",
          j,
          "' style=\"HEIGHT:",
          p,
          "%; TOP:",
          p * j,
          '%"  class="month-row">'
        );
        htb.push(
          '<table class="st-bg-table" cellSpacing="0" cellPadding="0"><tbody><tr>'
        );
        var dMax = B[j];

        for (var i = 0; i < 7; i++) {
          var day = C[j * 7 + i];
          htb.push(
            "<td abbr='",
            dateFormat.call(day, i18n.xgcalendar.dateformat.fulldayvalue),
            `' ch='qkadd' axis='${option.firstHour}' title=''`
          );

          if (
            dateFormat.call(day, "yyyyMMdd") ==
            dateFormat.call(new Date(), "yyyyMMdd")
          ) {
            htb.push(' class="st-bg st-bg-today">');
          } else {
            htb.push(' class="st-bg">');
          }
          htb.push("&nbsp;</td>");
        }
        //bgtable
        htb.push("</tr></tbody></table>");

        //stgrid
        htb.push(
          '<table class="st-grid" cellpadding="0" cellspacing="0"><tbody>'
        );

        //title tr
        htb.push("<tr>");
        var titletemp =
          "<td class=\"st-dtitle${titleClass}\" ch='qkadd' abbr='${abbr}' axis='"+option.firstHour+"' title=\"${title}\"><span class='monthdayshow'>${dayshow}</span></a></td>";

        for (var i = 0; i < 7; i++) {
          var o = { titleClass: "", dayshow: "" };
          var day = C[j * 7 + i];
          if (
            dateFormat.call(day, "yyyyMMdd") ==
            dateFormat.call(new Date(), "yyyyMMdd")
          ) {
            o.titleClass = " st-dtitle-today";
          }
          if (day.getMonth() != showmonth) {
            o.titleClass = " st-dtitle-nonmonth";
          }
          o.title = dateFormat.call(
            day,
            i18n.xgcalendar.dateformat.fulldayshow
          );
          if (day.getDate() == 1) {
            if (day.getMonth == 0) {
              o.dayshow = dateFormat.call(
                day,
                i18n.xgcalendar.dateformat.fulldayshow
              );
            } else {
              o.dayshow = dateFormat.call(day, i18n.xgcalendar.dateformat.Md3);
            }
          } else {
            o.dayshow = day.getDate();
          }
          o.abbr = dateFormat.call(
            day,
            i18n.xgcalendar.dateformat.fulldayvalue
          );
          htb.push(Tp(titletemp, o));
        }
        htb.push("</tr>");
        var sfirstday = C[j * 7];
        BuildMonthRow(htb, formatevents[j], dMax, roweventcount, sfirstday);
        //htb=htb.concat(rowHtml); rowHtml = null;

        htb.push("</tbody></table>");
        //month-row
        htb.push("</div>");
      }

      formatevents = B = C = hastdata = null;
      //return htb;
    }

    //formate datetime
    function formartEventsInHashtable(
      events,
      startday,
      daylength,
      rbdate,
      redate
    ) {
      var hast = new Object();
      var l = events.length;
      for (var i = 0; i < l; i++) {
        var sD = events[i][2];
        var eD = events[i][3];
        var diff = DateDiff("d", sD, eD);
        var s = {};
        s.event = events[i];
        s.day = sD.getDate();
        s.year = sD.getFullYear();
        s.month = sD.getMonth() + 1;
        s.allday = events[i][4] == 1;
        s.crossday = events[i][5] == 1;
        s.reevent = events[i][6] == 1; //Recurring event
        s.daystr = s.year + "/" + s.month + "/" + s.day;
        s.st = {};
        s.st.hour = sD.getHours();
        s.st.minute = sD.getMinutes();
        s.st.p = s.st.hour * 60 + s.st.minute; // start time position
        s.et = {};
        s.et.hour = eD.getHours();
        s.et.minute = eD.getMinutes();
        s.et.p = s.et.hour * 60 + s.et.minute; // end time postition

        if (diff > 0) {
          if (sD < rbdate) {
            //start date out of range
            sD = rbdate;
          }
          if (eD > redate) {
            //end date out of range
            eD = redate;
          }
          var f = startday - sD.getDay();
          if (f > 0) {
            f -= daylength;
          }
          var sdtemp = DateAdd("d", f, sD);
          for (; sdtemp <= eD; sD = sdtemp = DateAdd("d", daylength, sdtemp)) {
            var d = Clone(s);
            var key = dateFormat.call(
              sD,
              i18n.xgcalendar.dateformat.fulldaykey
            );
            var x = DateDiff("d", sdtemp, eD);
            if (hast[key] == null) {
              hast[key] = [];
            }
            d.colSpan =
              x >= daylength
                ? daylength - DateDiff("d", sdtemp, sD)
                : DateDiff("d", sD, eD) + 1;
            hast[key].push(d);
            d = null;
          }
        } else {
          var key = dateFormat.call(
            events[i][2],
            i18n.xgcalendar.dateformat.fulldaykey
          );
          if (hast[key] == null) {
            hast[key] = [];
          }
          s.colSpan = 1;
          hast[key].push(s);
        }
        s = null;
      }
      return hast;
    }
    function BuildMonthRow(htr, events, dMax, sc, day) {
      var x = [];
      var y = [];
      var z = [];
      var cday = [];
      var l = events.length;
      var el = 0;
      //var c = tc();
      for (var j = 0; j < l; j++) {
        x.push(0);
        y.push(0);
        z.push(0);
        cday.push(DateAdd("d", j, day));
      }
      for (var j = 0; j < l; j++) {
        var ec = events[j] ? events[j].length : 0;
        y[j] += ec;
        for (var k = 0; k < ec; k++) {
          var e = events[j][k];
          if (e && e.colSpan > 1) {
            for (var m = 1; m < e.colSpan; m++) {
              y[j + m]++;
            }
          }
        }
      }
      //var htr=[];
      var tdtemp =
        "<td class='${cssclass}' axis='${axis}' ch='${ch}' abbr='${abbr}' title='${title}' ${otherAttr}>${html}</td>";
      for (var j = 0; j < sc && el < dMax; j++) {
        htr.push("<tr>");
        //var gridtr = $(__TRTEMP);
        for (var h = 0; h < l; ) {
          var e = events[h] ? events[h][x[h]] : undefined;
          var tempdata = {
            class: "",
            axis: "",
            ch: "",
            title: "",
            abbr: "",
            html: "",
            otherAttr: "",
            click: "javascript:void(0);",
          };
          var tempCss = ["st-c"];

          if (e) {
            x[h] = x[h] + 1;
            //last event of the day
            var bs = false;
            if (z[h] + 1 == y[h] && e.colSpan == 1) {
              bs = true;
            }
            if (!bs && j == sc - 1 && z[h] < y[h]) {
              el++;
              $.extend(tempdata, {
                axis: h,
                ch: "more",
                abbr: dateFormat.call(
                  cday[h],
                  i18n.xgcalendar.dateformat.fulldayvalue
                ),
                html:
                  i18n.xgcalendar.others + (y[h] - z[h]) + i18n.xgcalendar.item,
                click: "javascript:alert('more event');",
              });
              tempCss.push("st-more st-moreul");
              h++;
            } else {
              tempdata.html = BuildMonthDayEvent(e, cday[h], l - h);
              tempdata.ch = "show";
              if (e.colSpan > 1) {
                tempdata.otherAttr = " colSpan='" + e.colSpan + "'";
                for (var m = 0; m < e.colSpan; m++) {
                  z[h + m] = z[h + m] + 1;
                }
                h += e.colSpan;
              } else {
                z[h] = z[h] + 1;
                h++;
              }
              el++;
            }
          } else {
            if (j == sc - 1 && z[h] < y[h] && y[h] > 0) {
              $.extend(tempdata, {
                axis: h,
                ch: "more",
                abbr: dateFormat.call(
                  cday[h],
                  i18n.xgcalendar.dateformat.fulldayvalue
                ),
                html:
                  i18n.xgcalendar.others + (y[h] - z[h]) + i18n.xgcalendar.item,
                click: "javascript:alert('more event');",
              });
              tempCss.push("st-more st-moreul");
              h++;
            } else {
              $.extend(tempdata, {
                html: "&nbsp;",
                ch: "qkadd",
                axis: `${option.firstHour}`,
                abbr: dateFormat.call(
                  cday[h],
                  i18n.xgcalendar.dateformat.fulldayvalue
                ),
                title: "",
              });
              tempCss.push("st-s");
              h++;
            }
          }
          tempdata.cssclass = tempCss.join(" ");
          tempCss = null;
          htr.push(Tp(tdtemp, tempdata));
          tempdata = null;
        }
        htr.push("</tr>");
      }
      x = y = z = cday = null;
      //return htr;
    }
    function BuildMonthDayEvent(e, cday, length) {
      var theme;
      if (e.event[7] && e.event[7] >= 0) {
        theme = tc(e.event[7]);
      } else {
        theme = tc();
      }
      var p = {
        color: theme[2],
        title: "",
        extendClass: "",
        extendHTML: "",
        data: "",
      };

      p.title = getTitle(e.event);
      p.id = "bbit_cal_event_" + e.event[0];
      if (option.enableDrag && e.event[8] == 1) {
        p.eclass = "drag";
      } else {
        p.eclass = "cal_" + e.event[0];
      }
      p.data = e.event.join("$");
      var sp = '<span style="cursor: pointer">${content}</span>';
      var i = '<I class="cic cic-tmr">&nbsp;</I>';
      var i2 = '<I class="cic cic-rcr">&nbsp;</I>';
      var ml = '<div class="st-ad-ml"></div>';
      var mr = '<div class="st-ad-mr"></div>';
      var arrm = [];
      var sf = e.event[2] < cday;
      var ef = DateDiff("d", cday, e.event[3]) >= length; //e.event[3] >= DateAdd("d", 1, cday);
      if (sf || ef) {
        if (sf) {
          arrm.push(ml);
          p.extendClass = "st-ad-mpad ";
        }
        if (ef) {
          arrm.push(mr);
        }
        p.extendHTML = arrm.join("");
      }
      var cen;
      if (!e.allday && !sf) {
        cen = pZero(e.st.hour) + ":" + pZero(e.st.minute) + " " + e.event[1];
      } else {
        cen = e.event[1];
      }
      var content = [];
      content.push(Tp(sp, { content: cen }));
      content.push(i);
      if (e.reevent) {
        content.push(i2);
      }
      p.content = content.join("");
      return Tp(__ALLDAYEVENTTEMP, p);
    }
    //to populate the data
    function populate() {
      if (option.isloading) {
        return true;
      }
      if (option.url && option.url != "") {
        option.isloading = true;
        //clearcontainer();
        if (
          option.onBeforeRequestData &&
          $.isFunction(option.onBeforeRequestData)
        ) {
          option.onBeforeRequestData(1);
        }
        var zone = (new Date().getTimezoneOffset() / 60) * -1;
        var param = [
          {
            name: "showdate",
            value: dateFormat.call(
              option.showday,
              i18n.xgcalendar.dateformat.fulldayvalue
            ),
          },
          { name: "viewtype", value: option.view },
          { name: "timezone", value: zone },
        ];
        if (option.extParam) {
          for (var pi = 0; pi < option.extParam.length; pi++) {
            param[param.length] = option.extParam[pi];
          }
        }

        $.ajax({
          type: option.method, //
          url: option.url,
          data: param,
          //dataType: "text",  // fixed jquery 1.4 not support Ms Date Json Format /Date(@Tickets)/
          dataType: "json",
          dataFilter: function (data, type) {
            //return data.replace(/"\\\/(Date\([0-9-]+\))\\\/"/gi, "new $1");

            return data;
          },
          success: function (data) {
            //function(datastr) {
            //datastr =datastr.replace(/"\\\/(Date\([0-9-]+\))\\\/"/gi, 'new $1');
            //var data = (new Function("return " + datastr))();
            if (data != null && data.error != null) {
              if (option.onRequestDataError) {
                option.onRequestDataError(1, data);
              }
            } else {
              data["start"] = parseDate(data["start"]);
              data["end"] = parseDate(data["end"]);
              $.each(data.events, function (index, value) {
                value[2] = parseDate(value[2]);
                value[3] = parseDate(value[3]);
              });
              responseData(data, data.start, data.end);
              pushER(data.start, data.end);
            }
            if (
              option.onAfterRequestData &&
              $.isFunction(option.onAfterRequestData)
            ) {
              option.onAfterRequestData(1);
            }
            option.isloading = false;
          },
          error: function (data) {
            try {
              if (option.onRequestDataError) {
                option.onRequestDataError(1, data);
              } else {
                alert(i18n.xgcalendar.get_data_exception);
              }
              if (
                option.onAfterRequestData &&
                $.isFunction(option.onAfterRequestData)
              ) {
                option.onAfterRequestData(1);
              }
              option.isloading = false;
            } catch (e) {}
          },
        });
      } else {
        alert("url" + i18n.xgcalendar.i_undefined);
      }
    }
    function responseData(data, start, end) {
      var events;
      if (data.issort == false) {
        if (data.events && data.events.length > 0) {
          events = data.events.sort(function (l, r) {
            return l[2] < r[2] ? -1 : 1;
          });
        } else {
          events = [];
        }
      } else {
        events = data.events;
      }
      ConcatEvents(events, start, end);
      render();
    }
    function clearrepeat(events, start, end) {
      var jl = events.length;
      if (jl > 0) {
        var es = events[0][2];
        var el = events[jl - 1][2];
        for (var i = 0, l = option.eventItems.length; i < l; i++) {
          if (option.eventItems[i][2] > el || jl == 0) {
            break;
          }
          if (option.eventItems[i][2] >= es) {
            for (var j = 0; j < jl; j++) {
              if (
                option.eventItems[i][0] == events[j][0] &&
                option.eventItems[i][2] < start
              ) {
                events.splice(j, 1); //for duplicated event
                jl--;
                break;
              }
            }
          }
        }
      }
    }
    function ConcatEvents(events, start, end) {
      if (!events) {
        events = [];
      }
      if (events) {
        if (option.eventItems.length == 0) {
          option.eventItems = events;
        } else {
          //remove duplicated one
          clearrepeat(events, start, end);
          var l = events.length;
          var sl = option.eventItems.length;
          var sI = -1;
          var eI = sl;
          var s = start;
          var e = end;
          if (option.eventItems[0][2] > e) {
            option.eventItems = events.concat(option.eventItems);
            return;
          }
          if (option.eventItems[sl - 1][2] < s) {
            option.eventItems = option.eventItems.concat(events);
            return;
          }
          for (var i = 0; i < sl; i++) {
            if (option.eventItems[i][2] >= s && sI < 0) {
              sI = i;
              continue;
            }
            if (option.eventItems[i][2] > e) {
              eI = i;
              break;
            }
          }

          var e1 = sI <= 0 ? [] : option.eventItems.slice(0, sI);
          var e2 = eI == sl ? [] : option.eventItems.slice(eI);
          option.eventItems = [].concat(e1, events, e2);
          events = e1 = e2 = null;
        }
      }
    }
    //utils goes here
    function weekormonthtoday(e) {
      var th = $(this);
      var daystr = th.attr("abbr");
      option.showday = strtodate(daystr + ` ${option.firstHour}`);
      option.view = "day";
      render();
      if (option.onweekormonthtoday) {
        option.onweekormonthtoday(option);
      }
      return false;
    }
    function parseDate(str) {
      return new Date(Date.parse(str));
    }
    function gP(h, m) {
      return (h - option.firstHour) * 42 + parseInt((m / 60) * 42);
    }
    function gW(ts1, ts2) {
      var t1 = ts1 / 42;
      var t2 = option.firstHour + parseInt(t1);
      var t3 = t1 - t2 >= 0.5 ? 30 : 0;
      var t4 = ts2 / 42;
      var t5 = option.firstHour + parseInt(t4);
      var t6 = t4 - t5 >= 0.5 ? 30 : 0;
      return { sh: t2, sm: t3, eh: t5, em: t6, h: ts2 - ts1 };
    }
    function gH(y1, y2, pt) {
      var sy1 = Math.min(y1, y2);
      var sy2 = Math.max(y1, y2);
      var t1 = (sy1 - pt) / 42;
      var t2 = option.firstHour + parseInt(t1);
      var t3 = t1 - t2 >= 0.5 ? 30 : 0;
      var t4 = (sy2 - pt) / 42;
      var t5 = option.firstHour + parseInt(t4);
      var t6 = t4 - t5 >= 0.5 ? 30 : 0;
      return { sh: t2, sm: t3, eh: t5, em: t6, h: sy2 - sy1 };
    }
    function pZero(n) {
      return n < 10 ? "0" + n : "" + n;
    }
    //to get color list array
    function tc(d) {
      function zc(c, i) {
        var d =
          "666666888888aaaaaabbbbbbdddddda32929cc3333d96666e69999f0c2c2b1365fdd4477e67399eea2bbf5c7d67a367a994499b373b3cca2cce1c7e15229a36633cc8c66d9b399e6d1c2f029527a336699668cb399b3ccc2d1e12952a33366cc668cd999b3e6c2d1f01b887a22aa9959bfb391d5ccbde6e128754e32926265ad8999c9b1c2dfd00d78131096184cb05288cb8cb8e0ba52880066aa008cbf40b3d580d1e6b388880eaaaa11bfbf4dd5d588e6e6b8ab8b00d6ae00e0c240ebd780f3e7b3be6d00ee8800f2a640f7c480fadcb3b1440edd5511e6804deeaa88f5ccb8865a5aa87070be9494d4b8b8e5d4d47057708c6d8ca992a9c6b6c6ddd3dd4e5d6c6274878997a5b1bac3d0d6db5a69867083a894a2beb8c1d4d4dae54a716c5c8d8785aaa5aec6c3cedddb6e6e41898951a7a77dc4c4a8dcdccb8d6f47b08b59c4a883d8c5ace7dcce";
        return "#" + d.substring(c * 30 + i * 6, c * 30 + (i + 1) * 6);
      }
      var c = d != null && d != undefined ? d : option.theme;
      return [zc(c, 0), zc(c, 1), zc(c, 2), zc(c, 3)];
    }
    function Tp(temp, dataarry) {
      return temp.replace(/\$\{([\w]+)\}/g, function (s1, s2) {
        var s = dataarry[s2];
        if (typeof s != "undefined") {
          return s;
        } else {
          return s1;
        }
      });
    }
    function Ta(temp, dataarry) {
      return temp.replace(/\{([\d])\}/g, function (s1, s2) {
        var s = dataarry[s2];
        if (typeof s != "undefined") {
          return encodeURIComponent(s);
        } else {
          return "";
        }
      });
    }
    function fomartTimeShow(h) {
      return h < 10 ? "0" + h + ":00" : h + ":00";
    }
    function getymformat(
      date,
      comparedate,
      isshowtime,
      isshowweek,
      showcompare
    ) {
      var showyear =
        isshowtime != undefined
          ? date.getFullYear() != new Date().getFullYear()
          : true;
      var showmonth = true;
      var showday = true;
      var showtime = isshowtime || false;
      var showweek = isshowweek || false;
      if (comparedate) {
        showyear = comparedate.getFullYear() != date.getFullYear();
        //showmonth = comparedate.getFullYear() != date.getFullYear() || date.getMonth() != comparedate.getMonth();
        if (
          comparedate.getFullYear() == date.getFullYear() &&
          date.getMonth() == comparedate.getMonth() &&
          date.getDate() == comparedate.getDate()
        ) {
          showyear = showmonth = showday = showweek = false;
        }
      }

      var a = [];
      if (showyear) {
        a.push(i18n.xgcalendar.dateformat.fulldayshow);
      } else if (showmonth) {
        a.push(i18n.xgcalendar.dateformat.Md3);
      } else if (showday) {
        a.push(i18n.xgcalendar.dateformat.day);
      }
      a.push(showweek ? " (W)" : "", showtime ? " HH:mm" : "");
      return a.join("");
    }
    function CalDateShow(startday, endday, isshowtime, isshowweek) {
      if (!endday) {
        return dateFormat.call(
          startday,
          getymformat(startday, null, isshowtime)
        );
      } else {
        var strstart = dateFormat.call(
          startday,
          getymformat(startday, null, isshowtime, isshowweek)
        );
        var strend = dateFormat.call(
          endday,
          getymformat(endday, startday, isshowtime, isshowweek)
        );
        var join = strend != "" ? " - " : "";
        return [strstart, strend].join(join);
      }
    }

    function dochange() {
      var d = getRdate();
      var loaded = checkInEr(d.start, d.end);
      if (!loaded) {
        populate();
      }
    }

    function checkInEr(start, end) {
      var ll = option.loadDateR.length;
      if (ll == 0) {
        return false;
      }
      var r = false;
      var r2 = false;
      for (var i = 0; i < ll; i++) {
        (r = false), (r2 = false);
        var dr = option.loadDateR[i];
        if (start >= dr.startdate && start <= dr.enddate) {
          r = true;
        }
        if (
          dateFormat.call(start, "yyyyMMdd") ==
            dateFormat.call(dr.startdate, "yyyyMMdd") ||
          dateFormat.call(start, "yyyyMMdd") ==
            dateFormat.call(dr.enddate, "yyyyMMdd")
        ) {
          r = true;
        }
        if (!end) {
          r2 = true;
        } else {
          if (end >= dr.startdate && end <= dr.enddate) {
            r2 = true;
          }
          if (
            dateFormat.call(end, "yyyyMMdd") ==
              dateFormat.call(dr.startdate, "yyyyMMdd") ||
            dateFormat.call(end, "yyyyMMdd") ==
              dateFormat.call(dr.enddate, "yyyyMMdd")
          ) {
            r2 = true;
          }
        }
        if (r && r2) {
          break;
        }
      }
      return r && r2;
    }

    function buildtempdayevent(sh, sm, eh, em, h, title, w, resize, thindex) {
      var theme = thindex != undefined && thindex >= 0 ? tc(thindex) : tc();
      var newtemp = Tp(__SCOLLEVENTTEMP, {
        bdcolor: theme[0],
        bgcolor2: theme[0],
        bgcolor1: theme[2],
        data: "",
        starttime: [pZero(sh), pZero(sm)].join(":"),
        endtime: [pZero(eh), pZero(em)].join(":"),
        content: title ? title : i18n.xgcalendar.new_event,
        title: title ? title : i18n.xgcalendar.new_event,
        icon: '<I class="cic cic-tmr">&nbsp;</I>',
        top: "0px",
        left: "",
        width: w ? w : "100%",
        height: h - 4,
        i: "-1",
        drag: "drag-chip",
        redisplay: resize ? "block" : "none",
      });
      return newtemp;
    }

    function getdata(chip) {
      var hddata = chip.find("div.dhdV");
      if (hddata.length == 1) {
        var str = hddata.text();
        return parseED(str.split("$"));
      }
      return null;
    }
    function parseED(data) {
      if (data.length > 6) {
        var e = [];
        e.push(
          data[0],
          data[1],
          new Date(data[2]),
          new Date(data[3]),
          parseInt(data[4]),
          parseInt(data[5]),
          parseInt(data[6]),
          data[7] != undefined ? parseInt(data[7]) : -1,
          data[8] != undefined ? parseInt(data[8]) : 0,
          data[9],
          data[10]
        );
        return e;
      }
      return null;
    }
    function quickd(type) {
      $("#bbit-cs-buddle").css("visibility", "hidden");
      var calid = $("#bbit-cs-id").val();
      var param = [
        { name: "calendarId", value: calid },
        { name: "type", value: type },
      ];
      var de = rebyKey(calid, true);
      option.onBeforeRequestData && option.onBeforeRequestData(3);
      $.post(
        option.quickDeleteUrl,
        param,
        function (data) {
          if (data) {
            if (data.IsSuccess) {
              de = null;
              option.onAfterRequestData && option.onAfterRequestData(3);
            } else {
              option.onRequestDataError && option.onRequestDataError(3, data);
              Ind(de);
              render();
              option.onAfterRequestData && option.onAfterRequestData(3);
            }
          }
        },
        "json"
      );
      render();
    }
    function getbuddlepos(x, y) {
      var tleft = x - 110;
      var ttop = y - 217;
      var maxLeft = document.documentElement.clientWidth;
      var maxTop = document.documentElement.clientHeight;
      var ishide = false;
      if (tleft <= 0 || ttop <= 0 || tleft + 400 > maxLeft) {
        tleft = x - 200 <= 0 ? 10 : x - 200;
        ttop = y - 159 <= 0 ? 10 : y - 159;
        if (tleft + 400 >= maxLeft) {
          tleft = maxLeft - 410;
        }
        if (ttop + 164 >= maxTop) {
          ttop = maxTop - 165;
        }
        ishide = true;
      }
      return { left: tleft, top: ttop, hide: ishide };
    }
    function dayshow(e, data) {
      if (data == undefined) {
        data = getdata($(this));
      }
      if (data != null) {
        if (
          option.quickDeleteUrl != "" &&
          data[8] == 1 &&
          option.readonly != true
        ) {
          var csbuddle =
            '<div id="bbit-cs-buddle" style="z-index: 180; width: 400px;visibility:hidden;" class="bubble"><table class="bubble-table" cellSpacing="0" cellPadding="0"><tbody><tr><td class="bubble-cell-side"><div id="tl1" class="bubble-corner"><div class="bubble-sprite bubble-tl"></div></div><td class="bubble-cell-main"><div class="bubble-top"></div><td class="bubble-cell-side"><div id="tr1" class="bubble-corner"><div class="bubble-sprite bubble-tr"></div></div>  <tr><td class="bubble-mid" colSpan="3"><div style="overflow: hidden" id="bubbleContent1"><div><div></div><div class="cb-root"><table class="cb-table" cellSpacing="0" cellPadding="0"><tbody><tr><td class="cb-value"><div class="textbox-fill-wrapper"><div class="textbox-fill-mid"><div id="bbit-cs-what" title="' +
            i18n.xgcalendar.click_to_detail +
            '" class="textbox-fill-div lk" style="cursor:pointer;"></div></div></div></td></tr><tr><td class=cb-value><div id="bbit-cs-buddle-timeshow"></div></td></tr></tbody></table><div class="bbit-cs-split"><input id="bbit-cs-id" type="hidden" value=""/>[ <span id="bbit-cs-delete" class="lk">' +
            i18n.xgcalendar.i_delete +
            '</span> ]&nbsp; <SPAN id="bbit-cs-editLink" class="lk">' +
            i18n.xgcalendar.update_detail +
            ' <StrONG>&gt;&gt;</StrONG></SPAN></div></div></div></div><tr><td><div id="bl1" class="bubble-corner"><div class="bubble-sprite bubble-bl"></div></div><td><div class="bubble-bottom"></div><td><div id="br1" class="bubble-corner"><div class="bubble-sprite bubble-br"></div></div></tr></tbody></table><div id="bubbleClose2" class="bubble-closebutton"></div><div id="prong1" class="prong"><div class=bubble-sprite></div></div></div>';
          var bud = $("#bbit-cs-buddle");
          if (bud.length == 0) {
            bud = $(csbuddle).appendTo(document.body);
            var calbutton = $("#bbit-cs-delete");
            var lbtn = $("#bbit-cs-editLink");
            var closebtn = $("#bubbleClose2").click(function () {
              $("#bbit-cs-buddle").css("visibility", "hidden");
            });
            calbutton.click(function () {
              var data = $("#bbit-cs-buddle").data("cdata");
              if (
                option.DeleteCmdhandler &&
                $.isFunction(option.DeleteCmdhandler)
              ) {
                option.DeleteCmdhandler.call(this, data, quickd);
              } else {
                if (confirm(i18n.xgcalendar.confirm_delete_event + "?")) {
                  var s = 0; //0 single event , 1 for Recurring event
                  if (data[6] == 1) {
                    if (confirm(i18n.xgcalendar.confrim_delete_event_or_all)) {
                      s = 0;
                    } else {
                      s = 1;
                    }
                  } else {
                    s = 0;
                  }
                  quickd(s);
                }
              }
            });
            $("#bbit-cs-what").click(function (e) {
              if (!option.ViewCmdhandler) {
                alert("ViewCmdhandler" + i18n.xgcalendar.i_undefined);
              } else {
                if (
                  option.ViewCmdhandler &&
                  $.isFunction(option.ViewCmdhandler)
                ) {
                  option.ViewCmdhandler.call(
                    this,
                    $("#bbit-cs-buddle").data("cdata")
                  );
                }
              }
              $("#bbit-cs-buddle").css("visibility", "hidden");
              return false;
            });
            lbtn.click(function (e) {
              if (!option.EditCmdhandler) {
                alert("EditCmdhandler" + i18n.xgcalendar.i_undefined);
              } else {
                if (
                  option.EditCmdhandler &&
                  $.isFunction(option.EditCmdhandler)
                ) {
                  option.EditCmdhandler.call(
                    this,
                    $("#bbit-cs-buddle").data("cdata")
                  );
                }
              }
              $("#bbit-cs-buddle").css("visibility", "hidden");
              return false;
            });
            bud.click(function () {
              return false;
            });
          }
          var pos = getbuddlepos(e.pageX, e.pageY);
          if (pos.hide) {
            $("#prong1").hide();
          } else {
            $("#prong1").show();
          }
          var ss = [];
          var iscos = DateDiff("d", data[2], data[3]) != 0;
          ss.push(
            dateFormat.call(data[2], i18n.xgcalendar.dateformat.Md3),
            " (",
            __WDAY[data[2].getDay()],
            ")"
          );
          if (data[4] != 1) {
            ss.push(",", dateFormat.call(data[2], "HH:mm"));
          }

          if (iscos) {
            ss.push(
              " - ",
              dateFormat.call(data[3], i18n.xgcalendar.dateformat.Md3),
              " (",
              __WDAY[data[3].getDay()],
              ")"
            );
            if (data[4] != 1) {
              ss.push(",", dateFormat.call(data[3], "HH:mm"));
            }
          }
          var ts = $("#bbit-cs-buddle-timeshow").html(ss.join(""));
          $("#bbit-cs-what").html(data[1]);
          $("#bbit-cs-id").val(data[0]);
          bud.data("cdata", data);
          bud.css({ visibility: "visible", left: pos.left, top: pos.top });

          $(document).one("click", function () {
            $("#bbit-cs-buddle").css("visibility", "hidden");
          });
        } else {
          if (!option.ViewCmdhandler) {
            alert("ViewCmdhandler" + i18n.xgcalendar.i_undefined);
          } else {
            if (option.ViewCmdhandler && $.isFunction(option.ViewCmdhandler)) {
              option.ViewCmdhandler.call(this, data);
            }
          }
        }
      } else {
        alert(i18n.xgcalendar.data_format_error);
      }
      return false;
    }

    function moreshow(mv) {
      var me = $(this);
      var divIndex = mv.id.split("_")[1];
      var pdiv = $(mv);
      var offsetMe = me.position();
      var offsetP = pdiv.position();
      var width = (me.width() + 2) * 1.5;
      var top = offsetP.top + 15;
      var left = offsetMe.left;

      var daystr = this.abbr;
      var day = strtodate(daystr + ` ${option.firstHour}`);
      var cc = $("#cal-month-cc");
      var ccontent = $("#cal-month-cc-content table tbody");
      var ctitle = $("#cal-month-cc-title");
      ctitle.html(
        dateFormat.call(day, i18n.xgcalendar.dateformat.Md3) +
          " " +
          __WDAY[day.getDay()]
      );
      ccontent.empty();
      //var c = tc()[2];
      var edata = $("#gridEvent").data("mvdata");
      var events = edata[divIndex];
      var index = parseInt(this.axis);
      var htm = [];
      for (var i = 0; i <= index; i++) {
        var ec = events[i] ? events[i].length : 0;
        for (var j = 0; j < ec; j++) {
          var e = events[i][j];
          if (e) {
            if (e.colSpan + i - 1 >= index) {
              htm.push("<tr><td class='st-c'>");
              htm.push(BuildMonthDayEvent(e, day, 1));
              htm.push("</td></tr>");
            }
          }
        }
      }
      ccontent.html(htm.join(""));
      //click
      ccontent.find("div.rb-o").each(function (i) {
        $(this).click(dayshow);
      });

      edata = events = null;
      var height = cc.height();
      var maxleft = document.documentElement.clientWidth;
      var maxtop = document.documentElement.clientHeight;
      if (left + width >= maxleft) {
        left = offsetMe.left - (me.width() + 2) * 0.5;
      }
      if (top + height >= maxtop) {
        top = maxtop - height - 2;
      }
      var newOff = {
        left: left,
        top: top,
        "z-index": 180,
        width: width,
        visibility: "visible",
      };
      cc.css(newOff);
      $(document).one("click", closeCc);
      return false;
    }
    function dayupdate(data, start, end) {
      if (
        option.quickUpdateUrl != "" &&
        data[8] == 1 &&
        option.readonly != true
      ) {
        if (option.isloading) {
          return false;
        }
        option.isloading = true;
        var id = data[0];
        var os = data[2];
        var od = data[3];
        var zone = (new Date().getTimezoneOffset() / 60) * -1;
        var param = [
          { name: "calendarId", value: id },
          {
            name: "CalendarStartTime",
            value: dateFormat.call(
              start,
              i18n.xgcalendar.dateformat.fulldayvalue + " HH:mm"
            ),
          },
          {
            name: "CalendarEndTime",
            value: dateFormat.call(
              end,
              i18n.xgcalendar.dateformat.fulldayvalue + " HH:mm"
            ),
          },
          { name: "timezone", value: zone },
        ];
        var d;
        if (
          option.quickUpdateHandler &&
          $.isFunction(option.quickUpdateHandler)
        ) {
          option.quickUpdateHandler.call(this, param);
        } else {
          option.onBeforeRequestData && option.onBeforeRequestData(4);
          $.post(
            option.quickUpdateUrl,
            param,
            function (data) {
              if (data) {
                if (data.IsSuccess == true) {
                  option.isloading = false;
                  option.onAfterRequestData && option.onAfterRequestData(4);
                } else {
                  option.onRequestDataError &&
                    option.onRequestDataError(4, data);
                  option.isloading = false;
                  d = rebyKey(id, true);
                  d[2] = os;
                  d[3] = od;
                  Ind(d);
                  render();
                  d = null;
                  option.onAfterRequestData && option.onAfterRequestData(4);
                }
              }
            },
            "json"
          );
          d = rebyKey(id, true);
          if (d) {
            d[2] = start;
            d[3] = end;
          }
          Ind(d);
          render();
        }
      }
    }
    function quickadd(start, end, isallday, pos) {
      if (
        (!option.quickAddHandler && option.quickAddUrl == "") ||
        option.readonly
      ) {
        return;
      }
      var buddle = $("#bbit-cal-buddle");
      if (buddle.length == 0) {
        var temparr = [];
        temparr.push(
          '<div id="bbit-cal-buddle" style="z-index: 180; width: 400px;visibility:hidden;" class="bubble">'
        );
        temparr.push(
          '<table class="bubble-table" cellSpacing="0" cellPadding="0"><tbody><tr><td class="bubble-cell-side"><div id="tl1" class="bubble-corner"><div class="bubble-sprite bubble-tl"></div></div>'
        );
        temparr.push(
          '<td class="bubble-cell-main"><div class="bubble-top"></div><td class="bubble-cell-side"><div id="tr1" class="bubble-corner"><div class="bubble-sprite bubble-tr"></div></div>  <tr><td class="bubble-mid" colSpan="3"><div style="overflow: hidden" id="bubbleContent1"><div><div></div><div class="cb-root">'
        );
        temparr.push(
          '<table class="cb-table" cellSpacing="0" cellPadding="0"><tbody><tr><th class="cb-key">'
        );
        temparr.push(
          i18n.xgcalendar.time,
          ':</th><td class=cb-value><div id="bbit-cal-buddle-timeshow"></div></td></tr><tr><th class="cb-key">'
        );
        temparr.push(
          i18n.xgcalendar.content,
          ':</th><td class="cb-value"><div class="textbox-fill-wrapper"><div class="textbox-fill-mid"><input id="bbit-cal-what" class="textbox-fill-input"/></div></div><div class="cb-example">'
        );
        temparr.push(
          i18n.xgcalendar.example,
          '</div></td></tr></tbody></table><input id="bbit-cal-start" type="hidden"/><input id="bbit-cal-end" type="hidden"/><input id="bbit-cal-allday" type="hidden"/><input id="bbit-cal-quickAddBTN" value="'
        );
        temparr.push(
          i18n.xgcalendar.create_event,
          '" type="button"/>&nbsp; <SPAN id="bbit-cal-editLink" class="lk">'
        );
        temparr.push(
          i18n.xgcalendar.update_detail,
          ' <StrONG>&gt;&gt;</StrONG></SPAN></div></div></div><tr><td><div id="bl1" class="bubble-corner"><div class="bubble-sprite bubble-bl"></div></div><td><div class="bubble-bottom"></div><td><div id="br1" class="bubble-corner"><div class="bubble-sprite bubble-br"></div></div></tr></tbody></table><div id="bubbleClose1" class="bubble-closebutton"></div><div id="prong2" class="prong"><div class=bubble-sprite></div></div></div>'
        );
        var tempquickAddHanler = temparr.join("");
        temparr = null;
        $(document.body).append(tempquickAddHanler);
        buddle = $("#bbit-cal-buddle");
        var calbutton = $("#bbit-cal-quickAddBTN");
        var lbtn = $("#bbit-cal-editLink");
        var closebtn = $("#bubbleClose1").click(function () {
          $("#bbit-cal-buddle").css("visibility", "hidden");
          realsedragevent();
        });
        calbutton.click(function (e) {
          if (option.isloading) {
            return false;
          }
          option.isloading = true;
          var what = $("#bbit-cal-what").val();
          var datestart = $("#bbit-cal-start").val();
          var dateend = $("#bbit-cal-end").val();
          var allday = $("#bbit-cal-allday").val();
          var f = /^[^\$\<\>]+$/.test(what);
          if (!f) {
            alert(i18n.xgcalendar.invalid_title);
            $("#bbit-cal-what").focus();
            option.isloading = false;
            return false;
          }
          var zone = (new Date().getTimezoneOffset() / 60) * -1;
          var param = [
            { name: "CalendarTitle", value: what },
            { name: "CalendarStartTime", value: datestart },
            { name: "CalendarEndTime", value: dateend },
            { name: "IsAllDayEvent", value: allday },
            { name: "timezone", value: zone },
          ];

          if (option.extParam) {
            for (var pi = 0; pi < option.extParam.length; pi++) {
              param[param.length] = option.extParam[pi];
            }
          }

          if (option.quickAddHandler && $.isFunction(option.quickAddHandler)) {
            option.quickAddHandler.call(this, param);
            $("#bbit-cal-buddle").css("visibility", "hidden");
            realsedragevent();
          } else {
            $("#bbit-cal-buddle").css("visibility", "hidden");
            var newdata = [];
            var tId = -1;
            option.onBeforeRequestData && option.onBeforeRequestData(2);
            $.post(
              option.quickAddUrl,
              param,
              function (data) {
                if (data) {
                  if (data.IsSuccess == true) {
                    option.isloading = false;
                    option.eventItems[tId][0] = data.Data;
                    option.eventItems[tId][8] = 1;
                    render();
                    option.onAfterRequestData && option.onAfterRequestData(2);
                  } else {
                    option.onRequestDataError &&
                      option.onRequestDataError(2, data);
                    option.isloading = false;
                    option.onAfterRequestData && option.onAfterRequestData(2);
                  }
                }
              },
              "json"
            );

            newdata.push(-1, what);
            var sd = strtodate(datestart);
            var ed = strtodate(dateend);
            var diff = DateDiff("d", sd, ed);
            newdata.push(sd, ed, allday == "1" ? 1 : 0, diff > 0 ? 1 : 0, 0);
            newdata.push(-1, 0, "", "");
            tId = Ind(newdata);
            realsedragevent();
            render();
          }
        });
        lbtn.click(function (e) {
          if (!option.EditCmdhandler) {
            alert("EditCmdhandler" + i18n.xgcalendar.i_undefined);
          } else {
            if (option.EditCmdhandler && $.isFunction(option.EditCmdhandler)) {
              option.EditCmdhandler.call(this, [
                "0",
                $("#bbit-cal-what").val(),
                $("#bbit-cal-start").val(),
                $("#bbit-cal-end").val(),
                $("#bbit-cal-allday").val(),
              ]);
            }
            $("#bbit-cal-buddle").css("visibility", "hidden");
            realsedragevent();
          }
          return false;
        });
        buddle.mousedown(function (e) {
          return false;
        });
      }

      var dateshow = CalDateShow(start, end, !isallday, true);
      var off = getbuddlepos(pos.left, pos.top);
      if (off.hide) {
        $("#prong2").hide();
      } else {
        $("#prong2").show();
      }
      $("#bbit-cal-buddle-timeshow").html(dateshow);
      var calwhat = $("#bbit-cal-what").val("");
      $("#bbit-cal-allday").val(isallday ? "1" : "0");
      $("#bbit-cal-start").val(
        dateFormat.call(
          start,
          i18n.xgcalendar.dateformat.fulldayvalue + " HH:mm"
        )
      );
      $("#bbit-cal-end").val(
        dateFormat.call(end, i18n.xgcalendar.dateformat.fulldayvalue + " HH:mm")
      );
      buddle.css({ visibility: "visible", left: off.left, top: off.top });
      calwhat.blur().focus(); //add 2010-01-26 blur() fixed chrome
      $(document).one("mousedown", function () {
        $("#bbit-cal-buddle").css("visibility", "hidden");
        realsedragevent();
      });
      return false;
    }
    //format datestring to Date Type
    function strtodate(str) {
      var arr = str.split(" ");
      var arr2 = arr[0].split(i18n.xgcalendar.dateformat.separator);
      var arr3 = arr[1].split(":");

      var y = arr2[i18n.xgcalendar.dateformat.year_index];
      var m =
        arr2[i18n.xgcalendar.dateformat.month_index].indexOf("0") == 0
          ? arr2[i18n.xgcalendar.dateformat.month_index].substr(1, 1)
          : arr2[i18n.xgcalendar.dateformat.month_index];
      var d =
        arr2[i18n.xgcalendar.dateformat.day_index].indexOf("0") == 0
          ? arr2[i18n.xgcalendar.dateformat.day_index].substr(1, 1)
          : arr2[i18n.xgcalendar.dateformat.day_index];
      var h = arr3[0].indexOf("0") == 0 ? arr3[0].substr(1, 1) : arr3[0];
      var n = arr3[1].indexOf("0") == 0 ? arr3[1].substr(1, 1) : arr3[1];
      return new Date(y, parseInt(m) - 1, d, h, n);
    }

    function rebyKey(key, remove) {
      if (option.eventItems && option.eventItems.length > 0) {
        var sl = option.eventItems.length;
        var i = -1;
        for (var j = 0; j < sl; j++) {
          if (option.eventItems[j][0] == key) {
            i = j;
            break;
          }
        }
        if (i >= 0) {
          var t = option.eventItems[i];
          if (remove) {
            option.eventItems.splice(i, 1);
          }
          return t;
        }
      }
      return null;
    }
    function Ind(event, i) {
      var d = 0;
      if (!i) {
        if (option.eventItems && option.eventItems.length > 0) {
          var sl = option.eventItems.length;
          var s = event[2];
          var d1 = s.getTime() - option.eventItems[0][2].getTime();
          var d2 = option.eventItems[sl - 1][2].getTime() - s.getTime();
          var diff = d1 - d2;
          if (d1 < 0 || diff < 0) {
            for (var j = 0; j < sl; j++) {
              if (option.eventItems[j][2] >= s) {
                i = j;
                break;
              }
            }
          } else if (d2 < 0) {
            i = sl;
          } else {
            for (var j = sl - 1; j >= 0; j--) {
              if (option.eventItems[j][2] < s) {
                i = j + 1;
                break;
              }
            }
          }
        } else {
          i = 0;
        }
      } else {
        d = 1;
      }
      if (option.eventItems && option.eventItems.length > 0) {
        if (i == option.eventItems.length) {
          option.eventItems.push(event);
        } else {
          option.eventItems.splice(i, d, event);
        }
      } else {
        option.eventItems = [event];
      }
      return i;
    }

    function ResizeView() {
      var _MH = document.documentElement.clientHeight;
      var _viewType = option.view;
      if (_viewType == "day" || _viewType == "week") {
        var $dvwkcontaienr = $("#dvwkcontaienr");
        var $dvtec = $("#dvtec");
        if ($dvwkcontaienr.length == 0 || $dvtec.length == 0) {
          alert(i18n.xgcalendar.view_no_ready);
          return;
        }
        var dvwkH = $dvwkcontaienr.height() + 2;
        var calH = option.height - 8 - dvwkH;
        $dvtec.height(calH);
        if (typeof option.scoll == "undefined") {
          var currentday = new Date();
          var h = currentday.getHours();
          var m = currentday.getMinutes();
          var th = gP(h, m);
          var ch = $dvtec.attr("clientHeight");
          var sh = th - 0.5 * ch;
          var ph = $dvtec.attr("scrollHeight");
          if (sh < 0) sh = 0;
          if (sh > ph - ch) sh = ph - ch - 10 * (23 - h);
          $dvtec.attr("scrollTop", sh);
        } else {
          $dvtec.attr("scrollTop", option.scoll);
        }
      } else if (_viewType == "month") {
        //Resize GridContainer
      }
    }
    function returnfalse() {
      return false;
    }
    function initevents(viewtype) {
      if (viewtype == "week" || viewtype == "day") {
        // NOTE: Evento singolo
        $("div.chip", gridcontainer).each(function (i) {
          var chip = $(this);
          chip.click(dayshow);
          if (chip.hasClass("drag")) {
            chip.mousedown(function (e) {
              dragStart.call(this, "dw3", e);
              return false;
            });
            //resize
            chip.find("div.resizer").mousedown(function (e) {
              dragStart.call($(this).parent().parent(), "dw4", e);
              return false;
            });
          } else {
            chip.mousedown(returnfalse);
          }
        });
        // NOTE: Evento tutto il giorno
        $("div.rb-o", gridcontainer).each(function (i) {
          var chip = $(this);
          chip.click(dayshow);
          if (chip.hasClass("drag") && viewtype == "week") {
            //drag;
            chip.mousedown(function (e) {
              dragStart.call(this, "dw5", e);
              return false;
            });
          } else {
            chip.mousedown(returnfalse);
          }
        });
        if (option.readonly == false) {
          // NOTE: Colonna giornalier
          $("td.tg-col", gridcontainer).each(function (i) {
            $(this).mousedown(function (e) {
              dragStart.call(this, "dw1", e);
              return false;
            });
          });
          $("#weekViewAllDaywk").mousedown(function (e) {
            dragStart.call(this, "dw2", e);
            return false;
          });
        }

        // NOTE: Va dalla settimana al singolo giorno
        if (viewtype == "week") {
          $("#dvwkcontaienr th.gcweekname").each(function (i) {
            $(this).click(weekormonthtoday);
          });
        }
      } else if ((viewtype = "month")) {
        $("div.rb-o", gridcontainer).each(function (i) {
          var chip = $(this);
          chip.click(dayshow);
          if (chip.hasClass("drag")) {
            //drag;
            chip.mousedown(function (e) {
              dragStart.call(this, "m2", e);
              return false;
            });
          } else {
            chip.mousedown(returnfalse);
          }
        });
        $("td.st-more", gridcontainer).each(function (i) {
          $(this)
            .click(function (e) {
              moreshow.call(
                this,
                $(this).parent().parent().parent().parent()[0]
              );
              return false;
            })
            .mousedown(function () {
              return false;
            });
        });
        if (option.readonly == false) {
          $("#mvEventContainer").mousedown(function (e) {
            dragStart.call(this, "m1", e);
            return false;
          });
        }
      }
    }
    function realsedragevent() {
      if (_dragevent) {
        _dragevent();
        _dragevent = null;
      }
    }
    function dragStart(type, e) {
      var obj = $(this);
      var source = e.srcElement || e.target;
      realsedragevent();
      switch (type) {
        case "dw1":
          _dragdata = { type: 1, target: obj, sx: e.pageX, sy: e.pageY };
          break;
        case "dw2":
          var w = obj.width();
          var h = obj.height();
          var offset = obj.offset();
          var left = offset.left;
          var top = offset.top;
          var l = option.view == "day" ? 1 : 7;
          var py = w % l;
          var pw = parseInt(w / l);
          if (py > l / 2 + 1) {
            pw++;
          }
          var xa = [];
          var ya = [];
          for (var i = 0; i < l; i++) {
            xa.push({ s: i * pw + left, e: (i + 1) * pw + left });
          }
          ya.push({ s: top, e: top + h });
          _dragdata = {
            type: 2,
            target: obj,
            sx: e.pageX,
            sy: e.pageY,
            pw: pw,
            xa: xa,
            ya: ya,
            h: h,
          };
          w = left = l = py = pw = xa = null;
          break;
        case "dw3":
          var evid = obj.parent().attr("id").replace("tgCol", "");
          var p = obj.parent();
          var pos = p.offset();
          var w = p.width() + 10;
          var h = obj.height();
          var data = getdata(obj);
          _dragdata = {
            type: 4,
            target: obj,
            sx: e.pageX,
            sy: e.pageY,
            pXMin: pos.left,
            pXMax: pos.left + w,
            pw: w,
            h: h,
            cdi: parseInt(evid),
            fdi: parseInt(evid),
            data: data,
          };
          break;
        case "dw4": //resize;
          var h = obj.height();
          var data = getdata(obj);
          _dragdata = {
            type: 5,
            target: obj,
            sx: e.pageX,
            sy: e.pageY,
            h: h,
            data: data,
          };
          break;
        case "dw5":
          var con = $("#weekViewAllDaywk");
          var w = con.width();
          var h = con.height();
          var offset = con.offset();
          var moffset = obj.offset();
          var left = offset.left;
          var top = offset.top;
          var l = 7;
          var py = w % l;
          var pw = parseInt(w / l);
          if (py > l / 2 + 1) {
            pw++;
          }
          var xa = [];
          var ya = [];
          var di = 0;
          for (var i = 0; i < l; i++) {
            xa.push({ s: i * pw + left, e: (i + 1) * pw + left });
            if (moffset.left >= xa[i].s && moffset.left < xa[i].e) {
              di = i;
            }
          }
          var fdi = { x: di, y: 0, di: di };
          ya.push({ s: top, e: top + h });
          var data = getdata(obj);
          var dp = DateDiff("d", data[2], data[3]) + 1;
          _dragdata = {
            type: 6,
            target: obj,
            sx: e.pageX,
            sy: e.pageY,
            data: data,
            xa: xa,
            ya: ya,
            fdi: fdi,
            h: h,
            dp: dp,
            pw: pw,
          };
          break;
        case "m1":
          var w = obj.width();
          var offset = obj.offset();
          var left = offset.left;
          var top = offset.top;
          var l = 7;
          var yl = obj.children().length;
          var py = w % l;
          var pw = parseInt(w / l);
          if (py > l / 2 + 1) {
            pw++;
          }
          var h = $("#mvrow_0").height();
          var xa = [];
          var ya = [];
          for (var i = 0; i < l; i++) {
            xa.push({ s: i * pw + left, e: (i + 1) * pw + left });
          }
          var xa = [];
          var ya = [];
          for (var i = 0; i < l; i++) {
            xa.push({ s: i * pw + left, e: (i + 1) * pw + left });
          }
          for (var i = 0; i < yl; i++) {
            ya.push({ s: i * h + top, e: (i + 1) * h + top });
          }
          _dragdata = {
            type: 3,
            target: obj,
            sx: e.pageX,
            sy: e.pageY,
            pw: pw,
            xa: xa,
            ya: ya,
            h: h,
          };
          break;
        case "m2":
          var row0 = $("#mvrow_0");
          var row1 = $("#mvrow_1");
          var w = row0.width();
          var offset = row0.offset();
          var diffset = row1.offset();
          var moffset = obj.offset();
          var h = diffset.top - offset.top;
          var left = offset.left;
          var top = offset.top;
          var l = 7;
          var yl = row0.parent().children().length;
          var py = w % l;
          var pw = parseInt(w / l);
          if (py > l / 2 + 1) {
            pw++;
          }
          var xa = [];
          var ya = [];
          var xi = 0;
          var yi = 0;
          for (var i = 0; i < l; i++) {
            xa.push({ s: i * pw + left, e: (i + 1) * pw + left });
            if (moffset.left >= xa[i].s && moffset.left < xa[i].e) {
              xi = i;
            }
          }
          for (var i = 0; i < yl; i++) {
            ya.push({ s: i * h + top, e: (i + 1) * h + top });
            if (moffset.top >= ya[i].s && moffset.top < ya[i].e) {
              yi = i;
            }
          }
          var fdi = { x: xi, y: yi, di: yi * 7 + xi };
          var data = getdata(obj);
          var dp = DateDiff("d", data[2], data[3]) + 1;
          _dragdata = {
            type: 7,
            target: obj,
            sx: e.pageX,
            sy: e.pageY,
            data: data,
            xa: xa,
            ya: ya,
            fdi: fdi,
            h: h,
            dp: dp,
            pw: pw,
          };
          break;
      }
      $("body").noSelect();
    }
    function dragMove(e) {
      if (_dragdata) {
        if (
          e.pageX < 0 ||
          e.pageY < 0 ||
          e.pageX > document.documentElement.clientWidth ||
          e.pageY >= document.documentElement.clientHeight
        ) {
          dragEnd(e);
          return false;
        }
        var d = _dragdata;
        switch (d.type) {
          case 1:
            var sy = d.sy;
            var y = e.pageY;
            var diffy = y - sy;
            if (diffy > 11 || diffy < -11 || d.cpwrap) {
              if (diffy == 0) {
                diffy = 21;
              }
              var dy = diffy % 21;
              if (dy != 0) {
                diffy = dy > 0 ? diffy + 21 - dy : diffy - 21 - dy;
                y = d.sy + diffy;
                if (diffy < 0) {
                  sy = sy + 21;
                }
              }
              if (!d.tp) {
                d.tp = $(d.target).offset().top;
              }
              var gh = gH(sy, y, d.tp);
              var ny = gP(gh.sh, gh.sm);
              var tempdata;
              if (!d.cpwrap) {
                tempdata = buildtempdayevent(gh.sh, gh.sm, gh.eh, gh.em, gh.h);
                var cpwrap = $(
                  "<div class='ca-evpi drag-chip-wrapper' style='top:" +
                    ny +
                    "px'/>"
                ).html(tempdata);
                $(d.target).find("div.tg-col-overlaywrapper").append(cpwrap);
                d.cpwrap = cpwrap;
              } else {
                if (
                  d.cgh.sh != gh.sh ||
                  d.cgh.eh != gh.eh ||
                  d.cgh.sm != gh.sm ||
                  d.cgh.em != gh.em
                ) {
                  tempdata = buildtempdayevent(
                    gh.sh,
                    gh.sm,
                    gh.eh,
                    gh.em,
                    gh.h
                  );
                  d.cpwrap.css("top", ny + "px").html(tempdata);
                }
              }
              d.cgh = gh;
            }
            break;
          case 2:
            var sx = d.sx;
            var x = e.pageX;
            var diffx = x - sx;
            if (diffx > 5 || diffx < -5 || d.lasso) {
              if (!d.lasso) {
                d.lasso = $(
                  "<div style='z-index: 10; display: block' class='drag-lasso-container'/>"
                );
                $(document.body).append(d.lasso);
              }
              if (!d.sdi) {
                d.sdi = getdi(d.xa, d.ya, sx, d.sy);
              }
              var ndi = getdi(d.xa, d.ya, x, e.pageY);
              if (!d.fdi || d.fdi.di != ndi.di) {
                addlasso(d.lasso, d.sdi, ndi, d.xa, d.ya, d.h);
              }
              d.fdi = ndi;
            }
            break;
          case 3:
            var sx = d.sx;
            var x = e.pageX;
            var sy = d.sy;
            var y = e.pageY;
            var diffx = x - sx;
            var diffy = y - sy;
            if (diffx > 5 || diffx < -5 || diffy < -5 || diffy > 5 || d.lasso) {
              if (!d.lasso) {
                d.lasso = $(
                  "<div style='z-index: 10; display: block' class='drag-lasso-container'/>"
                );
                $(document.body).append(d.lasso);
              }
              if (!d.sdi) {
                d.sdi = getdi(d.xa, d.ya, sx, sy);
              }
              var ndi = getdi(d.xa, d.ya, x, y);
              if (!d.fdi || d.fdi.di != ndi.di) {
                addlasso(d.lasso, d.sdi, ndi, d.xa, d.ya, d.h);
              }
              d.fdi = ndi;
            }
            break;
          case 4:
            var data = d.data;
            if (data != null && data[8] == 1) {
              var sx = d.sx;
              var x = e.pageX;
              var sy = d.sy;
              var y = e.pageY;
              var diffx = x - sx;
              var diffy = y - sy;
              if (
                diffx > 5 ||
                diffx < -5 ||
                diffy > 5 ||
                diffy < -5 ||
                d.cpwrap
              ) {
                var gh, ny, tempdata;
                if (!d.cpwrap) {
                  gh = {
                    sh: data[2].getHours(),
                    sm: data[2].getMinutes(),
                    eh: data[3].getHours(),
                    em: data[3].getMinutes(),
                    h: d.h,
                  };
                  d.target.hide();
                  ny = gP(gh.sh, gh.sm);
                  d.top = ny;
                  tempdata = buildtempdayevent(
                    gh.sh,
                    gh.sm,
                    gh.eh,
                    gh.em,
                    gh.h,
                    data[1],
                    false,
                    false,
                    data[7]
                  );
                  var cpwrap = $(
                    "<div class='ca-evpi drag-chip-wrapper' style='top:" +
                      ny +
                      "px'/>"
                  ).html(tempdata);
                  var evid = d.target
                    .parent()
                    .attr("id")
                    .replace("tgCol", "#tgOver");
                  $(evid).append(cpwrap);
                  d.cpwrap = cpwrap;
                  d.ny = ny;
                } else {
                  var pd = 0;
                  if (x < d.pXMin) {
                    pd = -1;
                  } else if (x > d.pXMax) {
                    pd = 1;
                  }
                  if (pd != 0) {
                    d.cdi = d.cdi + pd;
                    var ov = $("#tgOver" + d.cdi);
                    if (ov.length == 1) {
                      d.pXMin = d.pXMin + d.pw * pd;
                      d.pXMax = d.pXMax + d.pw * pd;
                      ov.append(d.cpwrap);
                    } else {
                      d.cdi = d.cdi - pd;
                    }
                  }
                  ny = d.top + diffy;
                  var pny = ny % 21;
                  if (pny != 0) {
                    ny = ny - pny;
                  }
                  if (d.ny != ny) {
                    //log.info("ny=" + ny);
                    gh = gW(ny, ny + d.h);
                    //log.info("sh=" + gh.sh + ",sm=" + gh.sm);
                    tempdata = buildtempdayevent(
                      gh.sh,
                      gh.sm,
                      gh.eh,
                      gh.em,
                      gh.h,
                      data[1],
                      false,
                      false,
                      data[7]
                    );
                    d.cpwrap.css("top", ny + "px").html(tempdata);
                  }
                  d.ny = ny;
                }
              }
            }

            break;
          case 5:
            var data = d.data;
            if (data != null && data[8] == 1) {
              var sy = d.sy;
              var y = e.pageY;
              var diffy = y - sy;
              if (diffy != 0 || d.cpwrap) {
                var gh, ny, tempdata;
                if (!d.cpwrap) {
                  gh = {
                    sh: data[2].getHours(),
                    sm: data[2].getMinutes(),
                    eh: data[3].getHours(),
                    em: data[3].getMinutes(),
                    h: d.h,
                  };
                  d.target.hide();
                  ny = gP(gh.sh, gh.sm);
                  d.top = ny;
                  tempdata = buildtempdayevent(
                    gh.sh,
                    gh.sm,
                    gh.eh,
                    gh.em,
                    gh.h,
                    data[1],
                    "100%",
                    true,
                    data[7]
                  );
                  var cpwrap = $(
                    "<div class='ca-evpi drag-chip-wrapper' style='top:" +
                      ny +
                      "px'/>"
                  ).html(tempdata);
                  var evid = d.target
                    .parent()
                    .attr("id")
                    .replace("tgCol", "#tgOver");
                  $(evid).append(cpwrap);
                  d.cpwrap = cpwrap;
                } else {
                  nh = d.h + diffy;
                  var pnh = nh % 21;
                  nh = pnh > 1 ? nh - pnh + 21 : nh - pnh;
                  if (d.nh != nh) {
                    var sp = gP(data[2].getHours(), data[2].getMinutes());
                    var ep = sp + nh;
                    gh = gW(d.top, d.top + nh);
                    tempdata = buildtempdayevent(
                      gh.sh,
                      gh.sm,
                      gh.eh,
                      gh.em,
                      gh.h,
                      data[1],
                      "100%",
                      true,
                      data[7]
                    );
                    d.cpwrap.html(tempdata);
                  }
                  d.nh = nh;
                }
              }
            }
            break;
          case 6:
            var sx = d.sx;
            var x = e.pageX;
            var y = e.pageY;
            var diffx = x - sx;
            if (diffx > 5 || diffx < -5 || d.lasso) {
              if (!d.lasso) {
                var w1 = d.dp > 1 ? (d.pw - 4) * 1.5 : d.pw - 4;
                var cp = d.target.clone();
                if (d.dp > 1) {
                  cp.find("div.rb-i>span").prepend(
                    "(" + d.dp + " " + i18n.xgcalendar.day_plural + ")&nbsp;"
                  );
                }
                var cpwrap = $(
                  "<div class='drag-event st-contents' style='width:" +
                    w1 +
                    "px'/>"
                )
                  .append(cp)
                  .appendTo(document.body);
                d.cpwrap = cpwrap;
                d.lasso = $(
                  "<div style='z-index: 10; display: block' class='drag-lasso-container'/>"
                );
                $(document.body).append(d.lasso);
                cp = cpwrap = null;
              }
              fixcppostion(d.cpwrap, e, d.xa, d.ya);
              var ndi = getdi(d.xa, d.ya, x, e.pageY);
              if (!d.cdi || d.cdi.di != ndi.di) {
                addlasso(
                  d.lasso,
                  ndi,
                  { x: ndi.x, y: ndi.y, di: ndi.di + d.dp - 1 },
                  d.xa,
                  d.ya,
                  d.h
                );
              }
              d.cdi = ndi;
            }
            break;
          case 7:
            var sx = d.sx;
            var sy = d.sy;
            var x = e.pageX;
            var y = e.pageY;
            var diffx = x - sx;
            var diffy = y - sy;
            if (diffx > 5 || diffx < -5 || diffy > 5 || diffy < -5 || d.lasso) {
              if (!d.lasso) {
                var w1 = d.dp > 1 ? (d.pw - 4) * 1.5 : d.pw - 4;
                var cp = d.target.clone();
                if (d.dp > 1) {
                  cp.find("div.rb-i>span").prepend(
                    "(" + d.dp + " " + i18n.xgcalendar.day_plural + ")&nbsp;"
                  );
                }
                var cpwrap = $(
                  "<div class='drag-event st-contents' style='width:" +
                    w1 +
                    "px'/>"
                )
                  .append(cp)
                  .appendTo(document.body);
                d.cpwrap = cpwrap;
                d.lasso = $(
                  "<div style='z-index: 10; display: block' class='drag-lasso-container'/>"
                );
                $(document.body).append(d.lasso);
                cp = cpwrap = null;
              }
              fixcppostion(d.cpwrap, e, d.xa, d.ya);
              var ndi = getdi(d.xa, d.ya, x, e.pageY);
              if (!d.cdi || d.cdi.di != ndi.di) {
                addlasso(
                  d.lasso,
                  ndi,
                  { x: ndi.x, y: ndi.y, di: ndi.di + d.dp - 1 },
                  d.xa,
                  d.ya,
                  d.h
                );
              }
              d.cdi = ndi;
            }
            break;
        }
      }
      return false;
    }
    function dragEnd(e) {
      if (_dragdata) {
        var d = _dragdata;
        switch (d.type) {
          case 1: //day view
            var wrapid = new Date().getTime();
            tp = d.target.offset().top;
            if (!d.cpwrap) {
              var gh = gH(d.sy, d.sy + 42, tp);
              var ny = gP(gh.sh, gh.sm);
              var tempdata = buildtempdayevent(
                gh.sh,
                gh.sm,
                gh.eh,
                gh.em,
                gh.h
              );
              d.cpwrap = $(
                "<div class='ca-evpi drag-chip-wrapper' style='top:" +
                  ny +
                  "px'/>"
              ).html(tempdata);
              $(d.target).find("div.tg-col-overlaywrapper").append(d.cpwrap);
              d.cgh = gh;
            }
            var pos = d.cpwrap.offset();
            pos.left = pos.left + 30;
            d.cpwrap.attr("id", wrapid);
            var start = strtodate(
              d.target.attr("abbr") + " " + d.cgh.sh + ":" + d.cgh.sm
            );
            var end = strtodate(
              d.target.attr("abbr") + " " + d.cgh.eh + ":" + d.cgh.em
            );
            _dragevent = function () {
              $("#" + wrapid).remove();
              $("#bbit-cal-buddle").css("visibility", "hidden");
            };
            quickadd(start, end, false, pos);
            break;
          case 2: //week view
          case 3: //month view
            var source = e.srcElement || e.target;
            var lassoid = new Date().getTime();
            if (!d.lasso) {
              if ($(source).hasClass("monthdayshow")) {
                weekormonthtoday.call($(source).parent()[0], e);
                break;
              }
              d.fdi = d.sdi = getdi(d.xa, d.ya, d.sx, d.sy);
              d.lasso = $(
                "<div style='z-index: 10; display: block' class='drag-lasso-container'/>"
              );
              $(document.body).append(d.lasso);
              addlasso(d.lasso, d.sdi, d.fdi, d.xa, d.ya, d.h);
            }
            d.lasso.attr("id", lassoid);
            var si = Math.min(d.fdi.di, d.sdi.di);
            var ei = Math.max(d.fdi.di, d.sdi.di);
            var firstday = option.vstart;
            var start = DateAdd("d", si, firstday);
            var end = DateAdd("d", ei, firstday);
            _dragevent = function () {
              $("#" + lassoid).remove();
            };
            quickadd(start, end, true, { left: e.pageX, top: e.pageY });
            break;
          case 4: // event moving
            if (d.cpwrap) {
              var start = DateAdd("d", d.cdi, option.vstart);
              var end = DateAdd("d", d.cdi, option.vstart);
              var gh = gW(d.ny, d.ny + d.h);
              start.setHours(gh.sh, gh.sm);
              end.setHours(gh.eh, gh.em);
              if (
                start.getTime() == d.data[2].getTime() &&
                end.getTime() == d.data[3].getTime()
              ) {
                d.cpwrap.remove();
                d.target.show();
              } else {
                dayupdate(d.data, start, end);
              }
            }
            break;
          case 5: //Resize
            if (d.cpwrap) {
              var start = new Date(d.data[2].toString());
              var end = new Date(d.data[3].toString());
              var gh = gW(d.top, d.top + nh);
              start.setHours(gh.sh, gh.sm);
              end.setHours(gh.eh, gh.em);

              if (
                start.getTime() == d.data[2].getTime() &&
                end.getTime() == d.data[3].getTime()
              ) {
                d.cpwrap.remove();
                d.target.show();
              } else {
                dayupdate(d.data, start, end);
              }
            }
            break;
          case 6:
          case 7:
            if (d.lasso) {
              d.cpwrap.remove();
              d.lasso.remove();
              var start = new Date(d.data[2].toString());
              var end = new Date(d.data[3].toString());
              var currrentdate = DateAdd("d", d.cdi.di, option.vstart);
              var diff = DateDiff("d", start, currrentdate);
              start = DateAdd("d", diff, start);
              end = DateAdd("d", diff, end);
              if (
                start.getTime() != d.data[2].getTime() ||
                end.getTime() != d.data[3].getTime()
              ) {
                dayupdate(d.data, start, end);
              }
            }
            break;
        }
        d = _dragdata = null;
        $("body").noSelect(false);
        return false;
      }
    }
    function getdi(xa, ya, x, y) {
      var ty = 0;
      var tx = 0;
      var lx = 0;
      var ly = 0;
      if (xa && xa.length != 0) {
        lx = xa.length;
        if (x >= xa[lx - 1].e) {
          tx = lx - 1;
        } else {
          for (var i = 0; i < lx; i++) {
            if (x > xa[i].s && x <= xa[i].e) {
              tx = i;
              break;
            }
          }
        }
      }
      if (ya && ya.length != 0) {
        ly = ya.length;
        if (y >= ya[ly - 1].e) {
          ty = ly - 1;
        } else {
          for (var j = 0; j < ly; j++) {
            if (y > ya[j].s && y <= ya[j].e) {
              ty = j;
              break;
            }
          }
        }
      }
      return { x: tx, y: ty, di: ty * lx + tx };
    }
    function addlasso(lasso, sdi, edi, xa, ya, height) {
      var diff = sdi.di > edi.di ? sdi.di - edi.di : edi.di - sdi.di;
      diff++;
      var sp = sdi.di > edi.di ? edi : sdi;
      var ep = sdi.di > edi.di ? sdi : edi;
      var l = xa.length > 0 ? xa.length : 1;
      var h = ya.length > 0 ? ya.length : 1;
      var play = [];
      var width = xa[0].e - xa[0].s;
      var i = sp.x;
      var j = sp.y;
      var max = Math.min(document.documentElement.clientWidth, xa[l - 1].e) - 2;

      while (j < h && diff > 0) {
        var left = xa[i].s;
        var d = i + diff > l ? l - i : diff;
        var wid = width * d;
        while (left + wid >= max) {
          wid--;
        }
        play.push(
          Tp(__LASSOTEMP, {
            left: left,
            top: ya[j].s,
            height: height,
            width: wid,
          })
        );
        i = 0;
        diff = diff - d;
        j++;
      }
      lasso.html(play.join(""));
    }
    function fixcppostion(cpwrap, e, xa, ya) {
      var x = e.pageX - 6;
      var y = e.pageY - 4;
      var w = cpwrap.width();
      var h = 21;
      var lmin = xa[0].s + 6;
      var tmin = ya[0].s + 4;
      var lmax = xa[xa.length - 1].e - w - 2;
      var tmax = ya[ya.length - 1].e - h - 2;
      if (x > lmax) {
        x = lmax;
      }
      if (x <= lmin) {
        x = lmin + 1;
      }
      if (y <= tmin) {
        y = tmin + 1;
      }
      if (y > tmax) {
        y = tmax;
      }
      cpwrap.css({ left: x, top: y });
    }
    $(document).mousemove(dragMove).mouseup(dragEnd);
    //.mouseout(dragEnd);

    var c = {
      sv: function (view) {
        //switch view
        if (view == option.view) {
          return;
        }
        clearcontainer();
        option.view = view;
        render();
        dochange();
      },
      rf: function () {
        populate();
      },
      gt: function (d) {
        if (!d) {
          d = new Date();
        }
        option.showday = d;
        render();
        dochange();
      },

      pv: function () {
        switch (option.view) {
          case "day":
            option.showday = DateAdd("d", -1, option.showday);
            break;
          case "week":
            option.showday = DateAdd("w", -1, option.showday);
            break;
          case "month":
            option.showday = DateAdd("m", -1, option.showday);
            break;
        }
        render();
        dochange();
      },
      nt: function () {
        switch (option.view) {
          case "day":
            option.showday = DateAdd("d", 1, option.showday);
            break;
          case "week":
            option.showday = DateAdd("w", 1, option.showday);
            break;
          case "month":
            var od = option.showday.getDate();
            option.showday = DateAdd("m", 1, option.showday);
            var nd = option.showday.getDate();
            if (od != nd) {
              //we go to the next month
              option.showday = DateAdd("d", 0 - nd, option.showday); //last day of last month
            }
            break;
        }
        render();
        dochange();
      },
      go: function () {
        return option;
      },
      so: function (p) {
        option = $.extend(option, p);
      },
    };
    this[0].bcal = c;
    return this;
  };

  /**
   * @description {Method} swtichView To switch to another view.
   * @param {String} view View name, one of 'day', 'week', 'month'.
   */
  $.fn.swtichView = function (view) {
    return this.each(function () {
      if (this.bcal) {
        this.bcal.sv(view);
      }
    });
  };

  /**
   * @description {Method} reload To reload event of current time range.
   */
  $.fn.reload = function () {
    return this.each(function () {
      if (this.bcal) {
        this.bcal.rf();
      }
    });
  };

  /**
   * @description {Method} gotoDate To go to a range containing date.
   * If view is week, it will go to a week containing date.
   * If view is month, it will got to a month containing date.
   * @param {Date} date. Date to go.
   */
  $.fn.gotoDate = function (d) {
    return this.each(function () {
      if (this.bcal) {
        this.bcal.gt(d);
      }
    });
  };

  /**
   * @description {Method} previousRange To go to previous date range.
   * If view is week, it will go to previous week.
   * If view is month, it will got to previous month.
   */
  $.fn.previousRange = function () {
    return this.each(function () {
      if (this.bcal) {
        this.bcal.pv();
      }
    });
  };

  /**
   * @description {Method} nextRange To go to next date range.
   * If view is week, it will go to next week.
   * If view is month, it will got to next month.
   */
  $.fn.nextRange = function () {
    return this.each(function () {
      if (this.bcal) {
        this.bcal.nt();
      }
    });
  };

  $.fn.BcalGetOp = function () {
    if (this[0].bcal) {
      return this[0].bcal.go();
    }
    return null;
  };

  $.fn.BcalSetOp = function (p) {
    if (this[0].bcal) {
      return this[0].bcal.so(p);
    }
  };
})(jQuery);
