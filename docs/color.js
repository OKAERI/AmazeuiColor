// Amaze UI Color Js


// form line input floating
(function() {
    if ($('.color-form-group').hasClass('color-floating-label')) {
        var colorFloatingLabel = $('.color-floating-label');
        colorFloatingLabel.find('input').on('input', function() {
            var _this = $(this);
            if (_this.val().length > 0) {
                _this.addClass('edited');
            } else {
                _this.removeClass('edited');
            }
        })
    }
})();



// form date
window.colorDate = (function() {
    var MobileCalendar = function() {
        this.gearDate;
        this.minY = 1900;
        this.minM = 1;
        this.minD = 1;
        this.maxY = 2099;
        this.maxM = 12;
        this.maxD = 31;
    }
    MobileCalendar.prototype = {
        init: function(params) {
            this.type = params.type;
            this.trigger = document.querySelector(params.trigger);
            if (this.trigger.getAttribute("data-colorDate") != null) {
                var arr = this.trigger.getAttribute("data-colorDate").split(',');
                var minArr = arr[0].split('-');
                this.minY = ~~minArr[0];
                this.minM = ~~minArr[1];
                this.minD = ~~minArr[2];
                var maxArr = arr[1].split('-');
                this.maxY = ~~maxArr[0];
                this.maxM = ~~maxArr[1];
                this.maxD = ~~maxArr[2];
            }
            if (params.minDate) {
                var minArr = params.minDate.split('-');
                this.minY = ~~minArr[0];
                this.minM = ~~minArr[1];
                this.minD = ~~minArr[2];
            }
            if (params.maxDate) {
                var maxArr = params.maxDate.split('-');
                this.maxY = ~~maxArr[0];
                this.maxM = ~~maxArr[1];
                this.maxD = ~~maxArr[2];
            }
            this.bindEvent(this.type);
        },
        bindEvent: function(type) {
            var _self = this;
            //呼出日期插件
            function popupDate(e) {
                _self.gearDate = document.createElement("div");
                _self.gearDate.className = "gearDate";
                _self.gearDate.innerHTML = '<div class="date_ctrl slideInUp">' +
                    '<div class="date_btn_box">' +
                    '<div class="date_btn colorDate_cancel">关闭</div>' +
                    '<div class="date_btn colorDate_finish">确定</div>' +
                    '</div>' +
                    '<div class="date_roll_mask">' +
                    '<div class="date_roll">' +
                    '<div>' +
                    '<div class="gear date_yy" data-datetype="date_yy"></div>' +
                    '<div class="date_grid">' +
                    '<div>年</div>' +
                    '</div>' +
                    '</div>' +
                    '<div>' +
                    '<div class="gear date_mm" data-datetype="date_mm"></div>' +
                    '<div class="date_grid">' +
                    '<div>月</div>' +
                    '</div>' +
                    '</div>' +
                    '<div>' +
                    '<div class="gear date_dd" data-datetype="date_dd"></div>' +
                    '<div class="date_grid">' +
                    '<div>日</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
                document.body.appendChild(_self.gearDate);
                dateCtrlInit();
                var colorDate_cancel = _self.gearDate.querySelector(".colorDate_cancel");
                colorDate_cancel.addEventListener('touchstart', closeMobileCalendar);
                var colorDate_finish = _self.gearDate.querySelector(".colorDate_finish");
                colorDate_finish.addEventListener('touchstart', finishMobileDate);
                var date_yy = _self.gearDate.querySelector(".date_yy");
                var date_mm = _self.gearDate.querySelector(".date_mm");
                var date_dd = _self.gearDate.querySelector(".date_dd");
                date_yy.addEventListener('touchstart', gearTouchStart);
                date_mm.addEventListener('touchstart', gearTouchStart);
                date_dd.addEventListener('touchstart', gearTouchStart);
                date_yy.addEventListener('touchmove', gearTouchMove);
                date_mm.addEventListener('touchmove', gearTouchMove);
                date_dd.addEventListener('touchmove', gearTouchMove);
                date_yy.addEventListener('touchend', gearTouchEnd);
                date_mm.addEventListener('touchend', gearTouchEnd);
                date_dd.addEventListener('touchend', gearTouchEnd);
            }
            //初始化年月日插件默认值
            function dateCtrlInit() {
                var date = new Date();
                var dateArr = {
                    yy: date.getFullYear(),
                    mm: date.getMonth(),
                    dd: date.getDate() - 1
                };
                if (/^\d{4}-\d{1,2}-\d{1,2}$/.test(_self.trigger.value)) {
                    rs = _self.trigger.value.match(/(^|-)\d{1,4}/g);
                    dateArr.yy = rs[0] - _self.minY;
                    dateArr.mm = rs[1].replace(/-/g, "") - 1;
                    dateArr.dd = rs[2].replace(/-/g, "") - 1;
                } else {
                    dateArr.yy = dateArr.yy - _self.minY;
                }
                _self.gearDate.querySelector(".date_yy").setAttribute("val", dateArr.yy);
                _self.gearDate.querySelector(".date_mm").setAttribute("val", dateArr.mm);
                _self.gearDate.querySelector(".date_dd").setAttribute("val", dateArr.dd);
                setDateGearTooth();
            }
            //呼出年月插件
            function popupYM(e) {
                _self.gearDate = document.createElement("div");
                _self.gearDate.className = "gearDate";
                _self.gearDate.innerHTML = '<div class="date_ctrl slideInUp">' +
                    '<div class="date_btn_box">' +
                    '<div class="date_btn colorDate_cancel">关闭</div>' +
                    '<div class="date_btn colorDate_finish">确定</div>' +
                    '</div>' +
                    '<div class="date_roll_mask">' +
                    '<div class="ym_roll">' +
                    '<div>' +
                    '<div class="gear date_yy" data-datetype="date_yy"></div>' +
                    '<div class="date_grid">' +
                    '<div>年</div>' +
                    '</div>' +
                    '</div>' +
                    '<div>' +
                    '<div class="gear date_mm" data-datetype="date_mm"></div>' +
                    '<div class="date_grid">' +
                    '<div>月</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
                document.body.appendChild(_self.gearDate);
                ymCtrlInit();
                var colorDate_cancel = _self.gearDate.querySelector(".colorDate_cancel");
                colorDate_cancel.addEventListener('touchstart', closeMobileCalendar);
                var colorDate_finish = _self.gearDate.querySelector(".colorDate_finish");
                colorDate_finish.addEventListener('touchstart', finishMobileYM);
                var date_yy = _self.gearDate.querySelector(".date_yy");
                var date_mm = _self.gearDate.querySelector(".date_mm");
                date_yy.addEventListener('touchstart', gearTouchStart);
                date_mm.addEventListener('touchstart', gearTouchStart);
                date_yy.addEventListener('touchmove', gearTouchMove);
                date_mm.addEventListener('touchmove', gearTouchMove);
                date_yy.addEventListener('touchend', gearTouchEnd);
                date_mm.addEventListener('touchend', gearTouchEnd);
            }
            //初始化年月插件默认值
            function ymCtrlInit() {
                var date = new Date();
                var dateArr = {
                    yy: date.getFullYear(),
                    mm: date.getMonth()
                };
                if (/^\d{4}-\d{1,2}$/.test(_self.trigger.value)) {
                    rs = _self.trigger.value.match(/(^|-)\d{1,4}/g);
                    dateArr.yy = rs[0] - _self.minY;
                    dateArr.mm = rs[1].replace(/-/g, "") - 1;
                } else {
                    dateArr.yy = dateArr.yy - _self.minY;
                }
                _self.gearDate.querySelector(".date_yy").setAttribute("val", dateArr.yy);
                _self.gearDate.querySelector(".date_mm").setAttribute("val", dateArr.mm);
                setDateGearTooth();
            }
            //呼出日期+时间插件
            function popupDateTime(e) {
                _self.gearDate = document.createElement("div");
                _self.gearDate.className = "gearDatetime";
                _self.gearDate.innerHTML = '<div class="date_ctrl slideInUp">' +
                    '<div class="date_btn_box">' +
                    '<div class="date_btn colorDate_cancel">关闭</div>' +
                    '<div class="date_btn colorDate_finish">确定</div>' +
                    '</div>' +
                    '<div class="date_roll_mask">' +
                    '<div class="datetime_roll">' +
                    '<div>' +
                    '<div class="gear date_yy" data-datetype="date_yy"></div>' +
                    '<div class="date_grid">' +
                    '<div>年</div>' +
                    '</div>' +
                    '</div>' +
                    '<div>' +
                    '<div class="gear date_mm" data-datetype="date_mm"></div>' +
                    '<div class="date_grid">' +
                    '<div>月</div>' +
                    '</div>' +
                    '</div>' +
                    '<div>' +
                    '<div class="gear date_dd" data-datetype="date_dd"></div>' +
                    '<div class="date_grid">' +
                    '<div>日</div>' +
                    '</div>' +
                    '</div>' +
                    '<div>' +
                    '<div class="gear time_hh" data-datetype="time_hh"></div>' +
                    '<div class="date_grid">' +
                    '<div>时</div>' +
                    '</div>' +
                    '</div>' +
                    '<div>' +
                    '<div class="gear time_mm" data-datetype="time_mm"></div>' +
                    '<div class="date_grid">' +
                    '<div>分</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' + //date_roll
                    '</div>' + //date_roll_mask
                    '</div>';
                document.body.appendChild(_self.gearDate);
                dateTimeCtrlInit();
                var colorDate_cancel = _self.gearDate.querySelector(".colorDate_cancel");
                colorDate_cancel.addEventListener('touchstart', closeMobileCalendar);
                var colorDate_finish = _self.gearDate.querySelector(".colorDate_finish");
                colorDate_finish.addEventListener('touchstart', finishMobileDateTime);
                var date_yy = _self.gearDate.querySelector(".date_yy");
                var date_mm = _self.gearDate.querySelector(".date_mm");
                var date_dd = _self.gearDate.querySelector(".date_dd");
                var time_hh = _self.gearDate.querySelector(".time_hh");
                var time_mm = _self.gearDate.querySelector(".time_mm");
                date_yy.addEventListener('touchstart', gearTouchStart);
                date_mm.addEventListener('touchstart', gearTouchStart);
                date_dd.addEventListener('touchstart', gearTouchStart);
                time_hh.addEventListener('touchstart', gearTouchStart);
                time_mm.addEventListener('touchstart', gearTouchStart);
                date_yy.addEventListener('touchmove', gearTouchMove);
                date_mm.addEventListener('touchmove', gearTouchMove);
                date_dd.addEventListener('touchmove', gearTouchMove);
                time_hh.addEventListener('touchmove', gearTouchMove);
                time_mm.addEventListener('touchmove', gearTouchMove);
                date_yy.addEventListener('touchend', gearTouchEnd);
                date_mm.addEventListener('touchend', gearTouchEnd);
                date_dd.addEventListener('touchend', gearTouchEnd);
                time_hh.addEventListener('touchend', gearTouchEnd);
                time_mm.addEventListener('touchend', gearTouchEnd);
            }
            //初始化年月日时分插件默认值
            function dateTimeCtrlInit() {
                var date = new Date();
                var dateArr = {
                    yy: date.getFullYear(),
                    mm: date.getMonth(),
                    dd: date.getDate() - 1,
                    hh: date.getHours(),
                    mi: date.getMinutes()
                };
                if (/^\d{4}-\d{1,2}-\d{1,2}\s\d{2}:\d{2}$/.test(_self.trigger.value)) {
                    rs = _self.trigger.value.match(/(^|-|\s|:)\d{1,4}/g);
                    dateArr.yy = rs[0] - _self.minY;
                    dateArr.mm = rs[1].replace(/-/g, "") - 1;
                    dateArr.dd = rs[2].replace(/-/g, "") - 1;
                    dateArr.hh = parseInt(rs[3].replace(/\s0?/g, ""));
                    dateArr.mi = parseInt(rs[4].replace(/:0?/g, ""));
                } else {
                    dateArr.yy = dateArr.yy - _self.minY;
                }
                _self.gearDate.querySelector(".date_yy").setAttribute("val", dateArr.yy);
                _self.gearDate.querySelector(".date_mm").setAttribute("val", dateArr.mm);
                _self.gearDate.querySelector(".date_dd").setAttribute("val", dateArr.dd);
                setDateGearTooth();
                _self.gearDate.querySelector(".time_hh").setAttribute("val", dateArr.hh);
                _self.gearDate.querySelector(".time_mm").setAttribute("val", dateArr.mi);
                setTimeGearTooth();
            }
            //呼出时间插件
            function popupTime(e) {
                _self.gearDate = document.createElement("div");
                _self.gearDate.className = "gearDate";
                _self.gearDate.innerHTML = '<div class="date_ctrl slideInUp">' +
                    '<div class="date_btn_box">' +
                    '<div class="date_btn colorDate_cancel">关闭</div>' +
                    '<div class="date_btn colorDate_finish">确定</div>' +
                    '</div>' +
                    '<div class="date_roll_mask">' +
                    '<div class="time_roll">' +
                    '<div>' +
                    '<div class="gear time_hh" data-datetype="time_hh"></div>' +
                    '<div class="date_grid">' +
                    '<div>时</div>' +
                    '</div>' +
                    '</div>' +
                    '<div>' +
                    '<div class="gear time_mm" data-datetype="time_mm"></div>' +
                    '<div class="date_grid">' +
                    '<div>分</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' + //time_roll
                    '</div>' +
                    '</div>';
                document.body.appendChild(_self.gearDate);
                timeCtrlInit();
                var colorDate_cancel = _self.gearDate.querySelector(".colorDate_cancel");
                colorDate_cancel.addEventListener('touchstart', closeMobileCalendar);
                var colorDate_finish = _self.gearDate.querySelector(".colorDate_finish");
                colorDate_finish.addEventListener('touchstart', finishMobileTime);
                var time_hh = _self.gearDate.querySelector(".time_hh");
                var time_mm = _self.gearDate.querySelector(".time_mm");
                time_hh.addEventListener('touchstart', gearTouchStart);
                time_mm.addEventListener('touchstart', gearTouchStart);
                time_hh.addEventListener('touchmove', gearTouchMove);
                time_mm.addEventListener('touchmove', gearTouchMove);
                time_hh.addEventListener('touchend', gearTouchEnd);
                time_mm.addEventListener('touchend', gearTouchEnd);
            }
            //初始化时分插件默认值
            function timeCtrlInit() {
                var d = new Date();
                var e = {
                    hh: d.getHours(),
                    mm: d.getMinutes()
                };
                if (/^\d{2}:\d{2}$/.test(_self.trigger.value)) {
                    rs = _self.trigger.value.match(/(^|:)\d{2}/g);
                    e.hh = parseInt(rs[0].replace(/^0?/g, ""));
                    e.mm = parseInt(rs[1].replace(/:0?/g, ""))
                }
                _self.gearDate.querySelector(".time_hh").setAttribute("val", e.hh);
                _self.gearDate.querySelector(".time_mm").setAttribute("val", e.mm);
                setTimeGearTooth();
            }
            //重置日期节点个数
            function setDateGearTooth() {
                var passY = _self.maxY - _self.minY + 1;
                var date_yy = _self.gearDate.querySelector(".date_yy");
                var itemStr = "";
                if (date_yy && date_yy.getAttribute("val")) {
                    //得到年份的值
                    var yyVal = parseInt(date_yy.getAttribute("val"));
                    //p 当前节点前后需要展示的节点个数
                    for (var p = 0; p <= passY - 1; p++) {
                        itemStr += "<div class='tooth'>" + (_self.minY + p) + "</div>";
                    }
                    date_yy.innerHTML = itemStr;
                    var top = Math.floor(parseFloat(date_yy.getAttribute('top')));
                    if (!isNaN(top)) {
                        top % 2 == 0 ? (top = top) : (top = top + 1);
                        top > 8 && (top = 8);
                        var minTop = 8 - (passY - 1) * 2;
                        top < minTop && (top = minTop);
                        date_yy.style["-webkit-transform"] = 'translate3d(0,' + top + 'em,0)';
                        date_yy.setAttribute('top', top + 'em');
                        yyVal = Math.abs(top - 8) / 2;
                        date_yy.setAttribute("val", yyVal);
                    } else {
                        date_yy.style["-webkit-transform"] = 'translate3d(0,' + (8 - yyVal * 2) + 'em,0)';
                        date_yy.setAttribute('top', 8 - yyVal * 2 + 'em');
                    }
                } else {
                    return;
                }
                var date_mm = _self.gearDate.querySelector(".date_mm");
                if (date_mm && date_mm.getAttribute("val")) {
                    itemStr = "";
                    //得到月份的值
                    var mmVal = parseInt(date_mm.getAttribute("val"));
                    var maxM = 11;
                    var minM = 0;
                    //当年份到达最大值
                    if (yyVal == passY - 1) {
                        maxM = _self.maxM - 1;
                    }
                    //当年份到达最小值
                    if (yyVal == 0) {
                        minM = _self.minM - 1;
                    }
                    //p 当前节点前后需要展示的节点个数
                    for (var p = 0; p < maxM - minM + 1; p++) {
                        itemStr += "<div class='tooth'>" + (minM + p + 1) + "</div>";
                    }
                    date_mm.innerHTML = itemStr;
                    if (mmVal > maxM) {
                        mmVal = maxM;
                        date_mm.setAttribute("val", mmVal);
                    } else if (mmVal < minM) {
                        mmVal = maxM;
                        date_mm.setAttribute("val", mmVal);
                    }
                    date_mm.style["-webkit-transform"] = 'translate3d(0,' + (8 - (mmVal - minM) * 2) + 'em,0)';
                    date_mm.setAttribute('top', 8 - (mmVal - minM) * 2 + 'em');
                } else {
                    return;
                }
                var date_dd = _self.gearDate.querySelector(".date_dd");
                if (date_dd && date_dd.getAttribute("val")) {
                    itemStr = "";
                    //得到日期的值
                    var ddVal = parseInt(date_dd.getAttribute("val"));
                    //返回月份的天数
                    var maxMonthDays = calcDays(yyVal, mmVal);
                    //p 当前节点前后需要展示的节点个数
                    var maxD = maxMonthDays - 1;
                    var minD = 0;
                    //当年份月份到达最大值
                    if (yyVal == passY - 1 && _self.maxM == mmVal + 1) {
                        maxD = _self.maxD - 1;
                    }
                    //当年、月到达最小值
                    if (yyVal == 0 && _self.minM == mmVal + 1) {
                        minD = _self.minD - 1;
                    }
                    for (var p = 0; p < maxD - minD + 1; p++) {
                        itemStr += "<div class='tooth'>" + (minD + p + 1) + "</div>";
                    }
                    date_dd.innerHTML = itemStr;
                    if (ddVal > maxD) {
                        ddVal = maxD;
                        date_dd.setAttribute("val", ddVal);
                    } else if (ddVal < minD) {
                        ddVal = minD;
                        date_dd.setAttribute("val", ddVal);
                    }
                    date_dd.style["-webkit-transform"] = 'translate3d(0,' + (8 - (ddVal - minD) * 2) + 'em,0)';
                    date_dd.setAttribute('top', 8 - (ddVal - minD) * 2 + 'em');
                } else {
                    return;
                }
            }
            //重置时间节点个数
            function setTimeGearTooth() {
                var time_hh = _self.gearDate.querySelector(".time_hh");
                if (time_hh && time_hh.getAttribute("val")) {
                    var i = "";
                    var hhVal = parseInt(time_hh.getAttribute("val"));
                    for (var g = 0; g <= 23; g++) {
                        i += "<div class='tooth'>" + g + "</div>";
                    }
                    time_hh.innerHTML = i;
                    time_hh.style["-webkit-transform"] = 'translate3d(0,' + (8 - hhVal * 2) + 'em,0)';
                    time_hh.setAttribute('top', 8 - hhVal * 2 + 'em');
                } else {
                    return
                }
                var time_mm = _self.gearDate.querySelector(".time_mm");
                if (time_mm && time_mm.getAttribute("val")) {
                    var i = "";
                    var mmVal = parseInt(time_mm.getAttribute("val"));
                    for (var g = 0; g <= 59; g++) {
                        i += "<div class='tooth'>" + g + "</div>";
                    }
                    time_mm.innerHTML = i;
                    time_mm.style["-webkit-transform"] = 'translate3d(0,' + (8 - mmVal * 2) + 'em,0)';
                    time_mm.setAttribute('top', 8 - mmVal * 2 + 'em');
                } else {
                    return
                }
            }
            //求月份最大天数
            function calcDays(year, month) {
                if (month == 1) {
                    year += _self.minY;
                    if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0 && year % 4000 != 0)) {
                        return 29;
                    } else {
                        return 28;
                    }
                } else {
                    if (month == 3 || month == 5 || month == 8 || month == 10) {
                        return 30;
                    } else {
                        return 31;
                    }
                }
            }
            //触摸开始
            function gearTouchStart(e) {
                e.preventDefault();
                var target = e.target;
                while (true) {
                    if (!target.classList.contains("gear")) {
                        target = target.parentElement;
                    } else {
                        break
                    }
                }
                clearInterval(target["int_" + target.id]);
                target["old_" + target.id] = e.targetTouches[0].screenY;
                target["o_t_" + target.id] = (new Date()).getTime();
                var top = target.getAttribute('top');
                if (top) {
                    target["o_d_" + target.id] = parseFloat(top.replace(/em/g, ""));
                } else {
                    target["o_d_" + target.id] = 0;
                }
                target.style.webkitTransitionDuration = target.style.transitionDuration = '0ms';
            }
            //手指移动
            function gearTouchMove(e) {
                e.preventDefault();
                var target = e.target;
                while (true) {
                    if (!target.classList.contains("gear")) {
                        target = target.parentElement;
                    } else {
                        break
                    }
                }
                target["new_" + target.id] = e.targetTouches[0].screenY;
                target["n_t_" + target.id] = (new Date()).getTime();
                var f = (target["new_" + target.id] - target["old_" + target.id]) * 30 / window.innerHeight;
                target["pos_" + target.id] = target["o_d_" + target.id] + f;
                target.style["-webkit-transform"] = 'translate3d(0,' + target["pos_" + target.id] + 'em,0)';
                target.setAttribute('top', target["pos_" + target.id] + 'em');
                if (e.targetTouches[0].screenY < 1) {
                    gearTouchEnd(e);
                };
            }
            //离开屏幕
            function gearTouchEnd(e) {
                e.preventDefault();
                var target = e.target;
                while (true) {
                    if (!target.classList.contains("gear")) {
                        target = target.parentElement;
                    } else {
                        break;
                    }
                }
                var flag = (target["new_" + target.id] - target["old_" + target.id]) / (target["n_t_" + target.id] - target["o_t_" + target.id]);
                if (Math.abs(flag) <= 0.2) {
                    target["spd_" + target.id] = (flag < 0 ? -0.08 : 0.08);
                } else {
                    if (Math.abs(flag) <= 0.5) {
                        target["spd_" + target.id] = (flag < 0 ? -0.16 : 0.16);
                    } else {
                        target["spd_" + target.id] = flag / 2;
                    }
                }
                if (!target["pos_" + target.id]) {
                    target["pos_" + target.id] = 0;
                }
                rollGear(target);
            }
            //缓动效果
            function rollGear(target) {
                var d = 0;
                var stopGear = false;

                function setDuration() {
                    target.style.webkitTransitionDuration = target.style.transitionDuration = '200ms';
                    stopGear = true;
                }
                var passY = _self.maxY - _self.minY + 1;
                clearInterval(target["int_" + target.id]);
                target["int_" + target.id] = setInterval(function() {
                    var pos = target["pos_" + target.id];
                    var speed = target["spd_" + target.id] * Math.exp(-0.03 * d);
                    pos += speed;
                    if (Math.abs(speed) > 0.1) {} else {
                        var b = Math.round(pos / 2) * 2;
                        pos = b;
                        setDuration();
                    }
                    if (pos > 8) {
                        pos = 8;
                        setDuration();
                    }
                    switch (target.dataset.datetype) {
                        case "date_yy":
                            var minTop = 8 - (passY - 1) * 2;
                            if (pos < minTop) {
                                pos = minTop;
                                setDuration();
                            }
                            if (stopGear) {
                                var gearVal = Math.abs(pos - 8) / 2;
                                setGear(target, gearVal);
                                clearInterval(target["int_" + target.id]);
                            }
                            break;
                        case "date_mm":
                            var date_yy = _self.gearDate.querySelector(".date_yy");
                            //得到年份的值
                            var yyVal = parseInt(date_yy.getAttribute("val"));
                            var maxM = 11;
                            var minM = 0;
                            //当年份到达最大值
                            if (yyVal == passY - 1) {
                                maxM = _self.maxM - 1;
                            }
                            //当年份到达最小值
                            if (yyVal == 0) {
                                minM = _self.minM - 1;
                            }
                            var minTop = 8 - (maxM - minM) * 2;
                            if (pos < minTop) {
                                pos = minTop;
                                setDuration();
                            }
                            if (stopGear) {
                                var gearVal = Math.abs(pos - 8) / 2 + minM;
                                setGear(target, gearVal);
                                clearInterval(target["int_" + target.id]);
                            }
                            break;
                        case "date_dd":
                            var date_yy = _self.gearDate.querySelector(".date_yy");
                            var date_mm = _self.gearDate.querySelector(".date_mm");
                            //得到年份的值
                            var yyVal = parseInt(date_yy.getAttribute("val"));
                            //得到月份的值
                            var mmVal = parseInt(date_mm.getAttribute("val"));
                            //返回月份的天数
                            var maxMonthDays = calcDays(yyVal, mmVal);
                            var maxD = maxMonthDays - 1;
                            var minD = 0;
                            //当年份月份到达最大值
                            if (yyVal == passY - 1 && _self.maxM == mmVal + 1) {
                                maxD = _self.maxD - 1;
                            }
                            //当年、月到达最小值
                            if (yyVal == 0 && _self.minM == mmVal + 1) {
                                minD = _self.minD - 1;
                            }
                            var minTop = 8 - (maxD - minD) * 2;
                            if (pos < minTop) {
                                pos = minTop;
                                setDuration();
                            }
                            if (stopGear) {
                                var gearVal = Math.abs(pos - 8) / 2 + minD;
                                setGear(target, gearVal);
                                clearInterval(target["int_" + target.id]);
                            }
                            break;
                        case "time_hh":
                            if (pos < -38) {
                                pos = -38;
                                setDuration();
                            }
                            if (stopGear) {
                                var gearVal = Math.abs(pos - 8) / 2;
                                setGear(target, gearVal);
                                clearInterval(target["int_" + target.id]);
                            }
                            break;
                        case "time_mm":
                            if (pos < -110) {
                                pos = -110;
                                setDuration();
                            }
                            if (stopGear) {
                                var gearVal = Math.abs(pos - 8) / 2;
                                setGear(target, gearVal);
                                clearInterval(target["int_" + target.id]);
                            }
                            break;
                        default:
                    }
                    target["pos_" + target.id] = pos;
                    target.style["-webkit-transform"] = 'translate3d(0,' + pos + 'em,0)';
                    target.setAttribute('top', pos + 'em');
                    d++;
                }, 30);
            }
            //控制插件滚动后停留的值
            function setGear(target, val) {
                val = Math.round(val);
                target.setAttribute("val", val);
                if (/date/.test(target.dataset.datetype)) {
                    setDateGearTooth();
                } else {
                    setTimeGearTooth();
                }
            }
            //取消
            function closeMobileCalendar(e) {
                e.preventDefault();
                var evt;
                try {
                    evt = new CustomEvent('input');
                } catch (e) {
                    //兼容旧浏览器(注意：该方法已从最新的web标准中删除)
                    evt = document.createEvent('Event');
                    evt.initEvent('input', true, true);
                }
                _self.trigger.dispatchEvent(evt);
                document.body.removeChild(_self.gearDate);
                _self.gearDate = null;
            }

            //日期确认
            function finishMobileDate(e) {
                var passY = _self.maxY - _self.minY + 1;
                var date_yy = parseInt(Math.round(_self.gearDate.querySelector(".date_yy").getAttribute("val")));
                var date_mm = parseInt(Math.round(_self.gearDate.querySelector(".date_mm").getAttribute("val"))) + 1;
                date_mm = date_mm > 9 ? date_mm : '0' + date_mm;
                var date_dd = parseInt(Math.round(_self.gearDate.querySelector(".date_dd").getAttribute("val"))) + 1;
                date_dd = date_dd > 9 ? date_dd : '0' + date_dd;
                _self.trigger.value = (date_yy % passY + _self.minY) + "-" + date_mm + "-" + date_dd;
                closeMobileCalendar(e);
            }
            //年月确认
            function finishMobileYM(e) {
                var passY = _self.maxY - _self.minY + 1;
                var date_yy = parseInt(Math.round(_self.gearDate.querySelector(".date_yy").getAttribute("val")));
                var date_mm = parseInt(Math.round(_self.gearDate.querySelector(".date_mm").getAttribute("val"))) + 1;
                date_mm = date_mm > 9 ? date_mm : '0' + date_mm;
                _self.trigger.value = (date_yy % passY + _self.minY) + "-" + date_mm;
                closeMobileCalendar(e);
            }
            //日期时间确认
            function finishMobileDateTime(e) {
                var passY = _self.maxY - _self.minY + 1;
                var date_yy = parseInt(Math.round(_self.gearDate.querySelector(".date_yy").getAttribute("val")));
                var date_mm = parseInt(Math.round(_self.gearDate.querySelector(".date_mm").getAttribute("val"))) + 1;
                date_mm = date_mm > 9 ? date_mm : '0' + date_mm;
                var date_dd = parseInt(Math.round(_self.gearDate.querySelector(".date_dd").getAttribute("val"))) + 1;
                date_dd = date_dd > 9 ? date_dd : '0' + date_dd;
                var time_hh = parseInt(Math.round(_self.gearDate.querySelector(".time_hh").getAttribute("val")));
                time_hh = time_hh > 9 ? time_hh : '0' + time_hh;
                var time_mm = parseInt(Math.round(_self.gearDate.querySelector(".time_mm").getAttribute("val")));
                time_mm = time_mm > 9 ? time_mm : '0' + time_mm;
                _self.trigger.value = (date_yy % passY + _self.minY) + "-" + date_mm + "-" + date_dd + " " + (time_hh.length < 2 ? "0" : "") + time_hh + (time_mm.length < 2 ? ":0" : ":") + time_mm;
                closeMobileCalendar(e);
            }
            //时间确认
            function finishMobileTime(e) {
                var time_hh = parseInt(Math.round(_self.gearDate.querySelector(".time_hh").getAttribute("val")));
                time_hh = time_hh > 9 ? time_hh : '0' + time_hh;
                var time_mm = parseInt(Math.round(_self.gearDate.querySelector(".time_mm").getAttribute("val")));
                time_mm = time_mm > 9 ? time_mm : '0' + time_mm;
                _self.trigger.value = (time_hh.length < 2 ? "0" : "") + time_hh + (time_mm.length < 2 ? ":0" : ":") + time_mm;
                closeMobileCalendar(e);
            }
            _self.trigger.addEventListener('click', {
                "ym": popupYM,
                "date": popupDate,
                "datetime": popupDateTime,
                "time": popupTime
            }[type]);
        }
    }
    return MobileCalendar;
})()



// form city select

window.colorCity = (function() {
    var MobileArea = function() {
        this.gearArea;
        this.data;
        this.index = 0;
        this.value = [0, 0, 0];
    }
    MobileArea.prototype = {
        init: function(params) {
            this.params = params;
            this.trigger = document.querySelector(params.trigger);
            if (params.valueTo) {
                this.valueTo = document.querySelector(params.valueTo);
            }
            this.keys = params.keys;
            this.type = params.type || 1;
            switch (this.type) {
                case 1:
                case 2:
                    break;
                default:
                    throw new Error('错误提示: 没有这种数据源类型');
            }
            this.bindEvent();
        },
        getData: function(callback) {
            var _self = this;
            if (typeof _self.params.data == "object") {
                _self.data = _self.params.data;
                callback();
            } else {
                var xhr = new XMLHttpRequest();
                xhr.open('get', _self.params.data);
                xhr.onload = function(e) {
                    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 0) {
                        var responseData = JSON.parse(xhr.responseText);
                        _self.data = responseData.data;
                        if (callback) {
                            callback()
                        };
                    }
                }
                xhr.send();
            }
        },
        bindEvent: function() {
            var _self = this;
            //呼出插件
            function popupArea(e) {
                _self.gearArea = document.createElement("div");
                _self.gearArea.className = "gearArea";
                _self.gearArea.innerHTML = '<div class="area_ctrl slideInUp">' +
                    '<div class="area_btn_box">' +
                    '<div class="area_btn colorCity_cancel">关闭</div>' +
                    '<div class="area_btn colorCity_finish">确定</div>' +
                    '</div>' +
                    '<div class="area_roll_mask">' +
                    '<div class="area_roll">' +
                    '<div>' +
                    '<div class="gear area_province" data-areatype="area_province"></div>' +
                    '<div class="area_grid">' +
                    '</div>' +
                    '</div>' +
                    '<div>' +
                    '<div class="gear area_city" data-areatype="area_city"></div>' +
                    '<div class="area_grid">' +
                    '</div>' +
                    '</div>' +
                    '<div>' +
                    '<div class="gear area_county" data-areatype="area_county"></div>' +
                    '<div class="area_grid">' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
                document.body.appendChild(_self.gearArea);
                areaCtrlInit();
                var colorCity_cancel = _self.gearArea.querySelector(".colorCity_cancel");
                colorCity_cancel.addEventListener('touchstart', function(e) {
                    _self.close(e);
                });
                var colorCity_finish = _self.gearArea.querySelector(".colorCity_finish");
                colorCity_finish.addEventListener('touchstart', function(e) {
                    _self.finish(e);
                });
                var area_province = _self.gearArea.querySelector(".area_province");
                var area_city = _self.gearArea.querySelector(".area_city");
                var area_county = _self.gearArea.querySelector(".area_county");
                area_province.addEventListener('touchstart', gearTouchStart);
                area_city.addEventListener('touchstart', gearTouchStart);
                area_county.addEventListener('touchstart', gearTouchStart);
                area_province.addEventListener('touchmove', gearTouchMove);
                area_city.addEventListener('touchmove', gearTouchMove);
                area_county.addEventListener('touchmove', gearTouchMove);
                area_province.addEventListener('touchend', gearTouchEnd);
                area_city.addEventListener('touchend', gearTouchEnd);
                area_county.addEventListener('touchend', gearTouchEnd);
            }
            //初始化插件默认值
            function areaCtrlInit() {
                _self.gearArea.querySelector(".area_province").setAttribute("val", _self.value[0]);
                _self.gearArea.querySelector(".area_city").setAttribute("val", _self.value[1]);
                _self.gearArea.querySelector(".area_county").setAttribute("val", _self.value[2]);

                switch (_self.type) {
                    case 1:
                        _self.setGearTooth(_self.data);
                        break;
                    case 2:
                        _self.setGearTooth(_self.data[0]);
                        break;
                }
            }
            //触摸开始
            function gearTouchStart(e) {
                e.preventDefault();
                var target = e.target;
                while (true) {
                    if (!target.classList.contains("gear")) {
                        target = target.parentElement;
                    } else {
                        break
                    }
                }
                clearInterval(target["int_" + target.id]);
                target["old_" + target.id] = e.targetTouches[0].screenY;
                target["o_t_" + target.id] = (new Date()).getTime();
                var top = target.getAttribute('top');
                if (top) {
                    target["o_d_" + target.id] = parseFloat(top.replace(/em/g, ""));
                } else {
                    target["o_d_" + target.id] = 0;
                }
                target.style.webkitTransitionDuration = target.style.transitionDuration = '0ms';
            }
            //手指移动
            function gearTouchMove(e) {
                e.preventDefault();
                var target = e.target;
                while (true) {
                    if (!target.classList.contains("gear")) {
                        target = target.parentElement;
                    } else {
                        break
                    }
                }
                target["new_" + target.id] = e.targetTouches[0].screenY;
                target["n_t_" + target.id] = (new Date()).getTime();
                var f = (target["new_" + target.id] - target["old_" + target.id]) * 30 / window.innerHeight;
                target["pos_" + target.id] = target["o_d_" + target.id] + f;
                target.style["-webkit-transform"] = 'translate3d(0,' + target["pos_" + target.id] + 'em,0)';
                target.setAttribute('top', target["pos_" + target.id] + 'em');
                if (e.targetTouches[0].screenY < 1) {
                    gearTouchEnd(e);
                };
            }
            //离开屏幕
            function gearTouchEnd(e) {
                e.preventDefault();
                var target = e.target;
                while (true) {
                    if (!target.classList.contains("gear")) {
                        target = target.parentElement;
                    } else {
                        break;
                    }
                }
                var flag = (target["new_" + target.id] - target["old_" + target.id]) / (target["n_t_" + target.id] - target["o_t_" + target.id]);
                if (Math.abs(flag) <= 0.2) {
                    target["spd_" + target.id] = (flag < 0 ? -0.08 : 0.08);
                } else {
                    if (Math.abs(flag) <= 0.5) {
                        target["spd_" + target.id] = (flag < 0 ? -0.16 : 0.16);
                    } else {
                        target["spd_" + target.id] = flag / 2;
                    }
                }
                if (!target["pos_" + target.id]) {
                    target["pos_" + target.id] = 0;
                }
                rollGear(target);
            }
            //缓动效果
            function rollGear(target) {
                var d = 0;
                var stopGear = false;

                function setDuration() {
                    target.style.webkitTransitionDuration = target.style.transitionDuration = '200ms';
                    stopGear = true;
                }
                clearInterval(target["int_" + target.id]);
                target["int_" + target.id] = setInterval(function() {
                    var pos = target["pos_" + target.id];
                    var speed = target["spd_" + target.id] * Math.exp(-0.03 * d);
                    pos += speed;
                    if (Math.abs(speed) > 0.1) {} else {
                        var b = Math.round(pos / 2) * 2;
                        pos = b;
                        setDuration();
                    }
                    if (pos > 0) {
                        pos = 0;
                        setDuration();
                    }
                    var minTop = -(target.dataset.len - 1) * 2;
                    if (pos < minTop) {
                        pos = minTop;
                        setDuration();
                    }
                    if (stopGear) {
                        var gearVal = Math.abs(pos) / 2;
                        setGear(target, gearVal);
                        clearInterval(target["int_" + target.id]);
                    }
                    target["pos_" + target.id] = pos;
                    target.style["-webkit-transform"] = 'translate3d(0,' + pos + 'em,0)';
                    target.setAttribute('top', pos + 'em');
                    d++;
                }, 30);
            }
            //控制插件滚动后停留的值
            function setGear(target, val) {
                val = Math.round(val);
                target.setAttribute("val", val);
                switch (_self.type) {
                    case 1:
                        _self.setGearTooth(_self.data);
                        break;
                    case 2:
                        switch (target.dataset['areatype']) {
                            case 'area_province':
                                _self.setGearTooth(_self.data[0]);
                                break;
                            case 'area_city':
                                var ref = target.childNodes[val].getAttribute('ref');
                                var childData = [];
                                var nextData = _self.data[2];
                                for (var i in nextData) {
                                    if (i == ref) {
                                        childData = nextData[i];
                                        break;
                                    }
                                };
                                _self.index = 2;
                                _self.setGearTooth(childData);
                                break;
                        }
                }

            }
            _self.getData(function() {
                _self.trigger.addEventListener('click', popupArea);
            });
        },
        //重置节点个数
        setGearTooth: function(data) {
            var _self = this;
            var item = data || [];
            var l = item.length;
            var gearChild = _self.gearArea.querySelectorAll(".gear");
            var gearVal = gearChild[_self.index].getAttribute('val');
            var maxVal = l - 1;
            if (gearVal > maxVal) {
                gearVal = maxVal;
            }
            gearChild[_self.index].setAttribute('data-len', l);
            if (l > 0) {
                var id = item[gearVal][this.keys['id']];
                var childData;
                switch (_self.type) {
                    case 1:
                        childData = item[gearVal].child
                        break;
                    case 2:
                        var nextData = _self.data[_self.index + 1]
                        for (var i in nextData) {
                            if (i == id) {
                                childData = nextData[i];
                                break;
                            }
                        };
                        break;
                }
                var itemStr = "";
                for (var i = 0; i < l; i++) {
                    itemStr += "<div class='tooth'  ref='" + item[i][this.keys['id']] + "'>" + item[i][this.keys['name']] + "</div>";
                }
                gearChild[_self.index].innerHTML = itemStr;
                gearChild[_self.index].style["-webkit-transform"] = 'translate3d(0,' + (-gearVal * 2) + 'em,0)';
                gearChild[_self.index].setAttribute('top', -gearVal * 2 + 'em');
                gearChild[_self.index].setAttribute('val', gearVal);
                _self.index++;
                if (_self.index > 2) {
                    _self.index = 0;
                    return;
                }
                _self.setGearTooth(childData);
            } else {
                gearChild[_self.index].innerHTML = "<div class='tooth'></div>";
                gearChild[_self.index].setAttribute('val', 0);
                if (_self.index == 1) {
                    gearChild[2].innerHTML = "<div class='tooth'></div>";
                    gearChild[2].setAttribute('val', 0);
                }
                _self.index = 0;
            }
        },
        finish: function(e) {
            var _self = this;
            var area_province = _self.gearArea.querySelector(".area_province");
            var area_city = _self.gearArea.querySelector(".area_city");
            var area_county = _self.gearArea.querySelector(".area_county");
            var provinceVal = parseInt(area_province.getAttribute("val"));
            var provinceText = area_province.childNodes[provinceVal].textContent;
            var provinceCode = area_province.childNodes[provinceVal].getAttribute('ref');
            var cityVal = parseInt(area_city.getAttribute("val"));
            var cityText = area_city.childNodes[cityVal].textContent;
            var cityCode = area_city.childNodes[cityVal].getAttribute('ref');
            var countyVal = parseInt(area_county.getAttribute("val"));
            var countyText = area_county.childNodes[countyVal].textContent;
            var countyCode = area_county.childNodes[countyVal].getAttribute('ref');
            _self.trigger.value = provinceText + ((cityText) ? (',' + cityText) : ('')) + ((countyText) ? (',' + countyText) : (''));
            _self.value = [provinceVal, cityVal, countyVal];
            if (this.valueTo) {
                this.valueTo.value = provinceCode + ((cityCode) ? (',' + cityCode) : ('')) + ((countyCode) ? (',' + countyCode) : (''));
            }
            _self.close(e);
        },
        close: function(e) {
            e.preventDefault();
            var _self = this;
            var evt = new CustomEvent('input');
            _self.trigger.dispatchEvent(evt);
            document.body.removeChild(_self.gearArea);
            _self.gearArea = null;
        }
    }
    return MobileArea;
})();


(function(root, factory) {
    //amd
    if (typeof define === 'function' && define.amd) {
        define(['$'], factory);
    } else if (typeof exports === 'object') { //umd
        module.exports = factory();
    } else {
        root.AutoSearch = factory(window.Zepto || window.jQuery || $);
    }
})(this, function($) {
    function AutoSearch() {}
    AutoSearch.prototype = {
        init: function(settings) {
            var rnd = Math.random().toString().replace('.', '');
            this.id = 'autosearch_' + rnd;
            this.settings = $.extend({
                mutil: false
            }, settings);
            this.input = $(this.settings.input);
            this.min = this.settings.min || 1;
            this.data = this.settings.data;
            this.valueObj = $(this.settings.valueObj || this.settings.input); //赋值项
            this.valueName = this.settings.valueName || 'name';; //赋值项
            this.target = $(this.settings.target || this.settings.input); //显示框
            this.filterColumn = this.settings.filterColumn || ['name'];
            this.column = this.settings.column || ['name'];
            this.timer = null;
            this.content = null;
            this.mutilValueArr = [];
            this.mutilTextArr = [];
            this.createContent();
            this.bindEvent();
        },
        bindEvent: function() {
            var _this = this;
            this.target.click(function() {
                if (_this.settings.autoShow) {
                    _this.search();
                }
                return false;
            });
            this.input.on('focus', function() {
                var input = $(this);
                _this.timer && clearInterval(_this.timer);
                _this.timer = setInterval(function() {
                    if (input.data('old') != input.val()) {
                        _this.search();
                        input.data('old', input.val());
                    }
                }, 25);
                _this.settings.focusCallback && _this.settings.focusCallback.call(_this, _this.input);
            }).on('keyup', function(e) {
                var input = $(this);
                if (input.data('old') != input.val() && e.keyCode != 13) {
                    _this.search();
                    input.data('old', input.val());
                }
                //console.log(e.keyCode)
            }).on('blur', function() {
                if (_this.timer) {
                    clearInterval(_this.timer);
                }
                var input = $(this);
                setTimeout(function() {
                    _this.hide();
                    if (input.attr('data-text') != input.val() && !_this.settings.mutil) {
                        _this.input.val('');
                        _this.settings.resetCallback && _this.settings.resetCallback.call(_this, _this.input);
                    }
                }, 500)
                _this.settings.blurCallback && _this.settings.blurCallback.call(_this, _this.input);
            }).on('keyup', function(e) {
                switch (e.keyCode) {
                    case 40:
                        {
                            //down
                            var i = $('.item.current', _this.content).index();
                            i++;
                            i = Math.min($('.item', _this.content).size() - 1, i);
                            var current = $('.item.current', _this.content);
                            $('.item', _this.content).removeClass('current').eq(i).addClass('current');
                            if (current.size()) {
                                var pos = $('.item.current', _this.content).position();
                                var ch = current.outerHeight();
                                if (pos.top + ch > $(_this.content).height()) {
                                    var st = $(_this.content).scrollTop();
                                    st += ch;
                                    $(_this.content).scrollTop(st);
                                }
                            }
                        }
                        break;
                    case 38:
                        {
                            //up
                            var i = $('.item.current', _this.content).index();
                            i--;
                            i = Math.max(0, i);
                            $('.item', _this.content).removeClass('current').eq(i).addClass('current');
                            var current = $('.item.current', _this.content);
                            if (current.size()) {
                                var pos = $('.item.current', _this.content).position();
                                var ch = current.outerHeight();
                                var st = $(_this.content).scrollTop();
                                if (pos.top <= 0) {
                                    st -= ch;
                                    $(_this.content).scrollTop(Math.max(st, 0));
                                }
                            }
                        }
                        break;
                    case 13:
                        {
                            //enter
                            $('.item.current', _this.content).trigger('click');
                            setTimeout(function() {
                                _this.hide();
                            }, 50)
                        }
                }
            }).on('keydown', function(e) {
                if (e.keyCode == 13) {
                    e.preventDefault();
                }
            });
            this.content.on('click', '.item', function() {
                var data = $(this).data('data');
                var text = $(this).text();
                if (_this.settings.mutil == true) {
                    _this.mutilTextArr.push(text);
                    _this.mutilValueArr.push(data[_this.valueName]);
                    _this.input.val(_this.mutilTextArr.join(',') + ',');
                    _this.valueObj.val(_this.mutilValueArr.join(',') + ',');
                    _this.input.attr('data-value', _this.input.attr('data-value'));
                    _this.input.attr('data-text', _this.mutilTextArr.join(',') + ',');
                } else {
                    _this.input.val(text);
                    _this.valueObj.val(data[_this.valueName]);
                    _this.input.attr('data-value', data[_this.valueName]);
                    if (_this.settings.valueObj) {
                        _this.input.attr('data-text', text);
                    } else {
                        _this.input.attr('data-text', data[_this.valueName]);
                    }
                }
                _this.settings.callback && _this.settings.callback.call(_this, data);
                _this.hide();
            }).on('mouseover', '.item', function() {
                $(this).addClass('current').siblings().removeClass('current');
            })
            $(document).click(function() {
                _this.hide();
            });
        },
        createContent: function() {
            if ($('#' + this.id).size() == 0) {
                this.content = $('<div id="' + this.id + '" class="ui-autosearch-content"/>');
                this.content.hide();
                $('body').append(this.content);
            }
        },
        show: function() {
            var _this = this;
            _this.content.show();
            _this.content.css({
                position: 'absolute',
                zIndex: _this.settings.zIndex || 999,
                width: _this.input.outerWidth()
            });
            _this.setPostion();
            _this.postimer = setInterval(function() {
                _this.setPostion();
            }, 20);
            _this.settings.showCallback && _this.settings.showCallback.call(_this, _this.input, _this.content);
        },
        hide: function() {
            this.postimer && clearInterval(this.postimer);
            this.content.hide();
        },
        search: function() {
            var _this = this;
            var value = _this.input.val().split(',').pop();
            if (value.length >= _this.min || _this.settings.autoShow) {
                if (typeof _this.data === "function") {
                    //ajax
                    _this.getData();
                } else {
                    var data = _this.filter(_this.data);
                    _this.format(data);
                    _this.show();
                }
            } else {
                _this.hide();
            }
        },
        getData: function() {
            var _this = this;
            this.settings.data(function(data) {
                _this.format(data);
                _this.show();
            });
        },
        format: function(data) {
            this.content.html('');
            if (data) {
                for (var i = 0, l = data.length; i < l; i++) {
                    var item = data[i];
                    var row = $();
                    if (this.settings.format) {
                        row = $(this.settings.format.call(this, item));
                    } else {
                        var name = '';
                        for (var j = 0, len = this.column.length; j < len; j++) {
                            name += '<span class="' + this.column[j] + '">' + item[this.column[j]] + '</span>';
                        };
                        row = $('<div class="item">' + name + '</div>');
                    }
                    row.data('data', item)
                    this.content.append(row);
                };
            }
        },
        filter: function(data) {
            var _this = this;
            var value = _this.input.val().split(',').pop();
            var newData = [];
            for (var i = 0, l = data.length; i < l; i++) {
                var item = data[i];
                for (var j = 0, len = this.filterColumn.length; j < len; j++) {
                    var v = item[this.filterColumn[j]];
                    if (v.toString().indexOf(value) != -1) {
                        newData.push(item);
                    }
                }
            }
            return newData;
        },
        setPostion: function() {
            var _this = this;
            var offset = _this.input.offset();
            _this.content.css({
                top: offset.top + _this.input.outerHeight(),
                left: offset.left
            });
        }
    }
    return AutoSearch;
});



(function(root, factory) {
    //amd
    if (typeof define === 'function' && define.amd) {
        define(['$'], factory);
    } else if (typeof exports === 'object') { //umd
        module.exports = factory();
    } else {
        root.Mobile_upload = factory(window.Zepto || window.jQuery || $);
    }
})(this, function($) {
    $.fn.Mobile_upload = function(settings) {
        var list = [];
        $(this).each(function() {
            var upload = new Mobile_upload();
            var options = $.extend({
                target: $(this)
            }, settings);
            upload.init(options);
            list.push(upload);
        });
        return list;
    };

    function Mobile_upload() {
        window.uploadCount = window.uploadCount || 0;
        window.uploadCount++;
        var rnd = Math.random().toString().replace('.', '');
        this.id = 'upload_' + rnd + window.uploadCount.toString();
        this.fileInput = null;
    }
    Mobile_upload.prototype = {
        init: function(settings) {
            this.settings = $.extend({}, this.settings, settings);
            this.target = this.settings.target;
            this.createFile();
            this.name = this.settings.name || "files";
            this.bindEvent();
            this.bindFileChange();
        },
        touch: function(obj, fn) {
            var move;
            $(obj).on('click', click);

            function click(e) {
                return fn.call(this, e);
            }
            $(obj).on('touchmove', function(e) {
                move = true;
            }).on('touchend', function(e) {
                e.preventDefault();
                if (!move) {
                    var returnvalue = fn.call(this, e, 'touch');
                    if (!returnvalue) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                }
                move = false;
            });
        },
        createFile: function() {
            var _this = this;
            _this.fileInput && _this.fileInput.remove();
            _this.fileInput = $('<input type="file" style="position:absolute;top:0;left:0;width:1px;height:1px;opacity:0;"  accept="image/*" id="' + _this.id + '"/>').hide();
            $(_this.target).after(_this.fileInput);
            if (this.settings.multiple) {
                this.fileInput.attr('multiple', 'multiple');
            }
            this.bindFileChange();
        },
        bindEvent: function(e) {
            var _this = this;
            this.touch($(this.target), function(e, t) {
                if ($(this).parent().siblings().size() >= _this.settings.max) {
                    _this.settings.maxCallback && _this.settings.maxCallback(this);
                } else {
                    $(_this.fileInput).trigger('click');
                }
                return false;
            });
            _this.bindFileEvent();
        },
        bindFileEvent: function() {
            var _this = this;
            $(this.fileInput).click(function(e) {
                e.stopPropagation();
            });
        },
        bindFileChange: function() {
            var _this = this;
            $(_this.fileInput).off('change');
            $(_this.fileInput).on('change', function(e) {
                var reg_type = /^image\//i;
                var files = e.target.files;
                if (_this.settings.iframe) {
                    //ifrmae post
                    var key = "up_" + Math.random().toString().replace('.', '');
                    if (_this.postFrame(this, e, key)) {
                        _this.settings.startUpload && _this.settings.startUpload(_this.fileInput, _this.target, key);
                    }
                } else
                if (files) {
                    for (var i = files.length - 1; i >= 0; i--) {
                        var file = files[i];
                        (function(file) {
                            var key = "key_" + Math.random().toString().replace('.', '');
                            var rnd = Math.random().toString().replace('.', '');
                            var i = 'up_' + rnd;
                            var hasext = false;
                            var arr = file.name.split('.');
                            var ext = arr[arr.length - 1];
                            if (/^(jpg|jpeg)$/i.test(ext)) {
                                ext = 'jpeg';
                            }
                            if (file.type == "") {
                                //有些浏览器得不到类型时用文件名来判断
                                var typelist = ['jpeg', 'png', 'bmp', 'gif'];
                                for (var i = typelist.length - 1; i >= 0; i--) {
                                    var re = new RegExp(typelist[i], "i");
                                    if (re.exec(ext)) {
                                        hasext = true;
                                    }
                                };
                            }
                            if (reg_type.test(file.type) || hasext) {
                                if ($('#' + _this.id).parent().siblings().size() + 1 >= _this.settings.max) {
                                    _this.settings.maxCallback && _this.settings.maxCallback($('#' + _this.id));
                                }
                                if (window.FileReader) {
                                    var reader = new FileReader();
                                    _this.settings.startUpload && _this.settings.startUpload(_this.fileInput, _this.target, i);
                                    reader.onload = function() {
                                        //清除缓存
                                        _this.createFile();
                                        _this.bindFileEvent();
                                        var result = this.result;
                                        var splitimg = result.split('base64,')
                                        var imgtype = splitimg[0];
                                        //有些浏览器得不到类型时手动加入
                                        if (imgtype.length == 5 && splitimg.length == 2) {
                                            result = result.replace('data:base64,', 'data:image/' + ext + ';base64,');
                                        }
                                        _this.settings.imageReady && _this.settings.imageReady(_this.fileInput, _this.target, result, i);
                                        if (_this.settings.ajax) {
                                            var data = {};
                                            data[_this.settings.ajax.name || 'file'] = result;
                                            $.ajax({
                                                type: 'post',
                                                url: _this.settings.ajax.url,
                                                data: data,
                                                dataType: 'json',
                                                success: function(result) {
                                                    if (_this.settings.callback) {
                                                        _this.settings.callback(result, file, _this.name, _this.target, i);
                                                    }
                                                },
                                                complete: function() {
                                                    _this.settings.endUpload && _this.settings.endUpload(_this.fileInput, _this.target, i);
                                                }
                                            });
                                            this.result = null;
                                            result = null;
                                            reader.onload = null;
                                            reader = null;
                                        } else
                                        if (_this.settings.callback) {
                                            _this.settings.callback(result, file, _this.name, _this.target, i);
                                        }
                                    };
                                    reader.readAsDataURL(file);
                                }
                            } else {
                                alert("不是图片文件");
                                // break;
                            }
                        })(file)
                    };
                }
            });
        }
    };
    return Mobile_upload;
});

(function(root, factory) {
    //amd
    if (typeof define === 'function' && define.amd) {
        define(['$'], factory);
    } else if (typeof exports === 'object') { //umd
        module.exports = factory();
    } else {
        root.WordCount = factory(window.Zepto || window.jQuery || $);
    }
})(this, function($) {
    $.fn.WordCount = function(settings) {
        var list = [];
        $(this).each(function() {
            var word = new WordCount();
            var options = $.extend({
                trigger: $(this)
            }, settings);
            word.init(options);
            list.push(word);
        });
        return list;
    };

    var WordCount = function() {};
    WordCount.prototype = {
        init: function(args) {
            var _self = this;
            this.args = args;
            this.textBox = $(args.trigger);
            this.settings = $.extend({}, args);
            this.oldNumber = 0;
            this.minHeight = args.minHeight;
            this.number = 0;
            this.timer = null;
            this.overClass = args.overClass || "";
            this.changeCallback = args.changeCallback || null;
            this.max = 0;
            this.overflowCallback = args.overflowCallback || null;
            this.passClallback = args.passClallback || null;
            this.isOverflowCut = args.isOverflowCut || true;
            _self.withButton = $(args.withButton);
            this.num = $(args.num);
            _self.max = args.max || parseInt(_self.textBox.attr("maxLength")) || 0;
            _self.textBox.bind('focus', function() {
                _self.start();
            }).bind("blur", function(e) {
                clearInterval(_self.timer);
            });
            this.bindEvent();
            this.checkNum();
        },
        bindEvent: function() {
            var _self = this;
            this.touch(this.withButton, function() {
                _self.getFullNumber();
                if (_self.max && _self.number > _self.max) {
                    _self.twinkle().done(function() {
                        _self.twinkle();
                    });
                    return false;
                }
                return true;
            });
        },
        twinkle: function() {
            var _self = this;
            var t = null;
            setTimeout(function() {
                _self.textBox.addClass('error-number');
                setTimeout(function() {
                    _self.textBox.removeClass('error-number');
                    t && t();
                }, 100);
            }, 100);
            return {
                done: function(f) {
                    t = f;
                }
            }
        },
        touch: function(obj, trigger, fn) {
            var move;
            var istouch = false;
            if (typeof trigger === "function") {
                fn = trigger;
            };
            $(obj).on('touchmove', trigger, function(e) {
                move = true;
            }).on('touchend', trigger, function(e) {
                e.preventDefault();
                if (!move) {
                    var returnvalue = fn.call(this, e, 'touch');
                    if (returnvalue === false) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                }
                move = false;
            });
            $(obj).on('mousedown', trigger, click);

            function click(e) {
                return fn.call(this, e);
            }
        },
        start: function() {
            var _self = this;
            _self.timer = setInterval(function() {
                _self.checkNum();
            }, 20);
        },
        checkNum: function() {
            var _self = this;
            _self.getFullNumber();
            if (_self.number !== _self.oldNumber && _self.changeCallback) {
                if (_self.max && _self.number > _self.max) {
                    if (_self.overflowCallback) {
                        _self.num.addClass(_self.overClass);
                        _self.textBox.addClass(_self.overClass).attr('data-overflow', true);
                        _self.overflowCallback(_self, _self.number, _self.textBox, _self.max);
                    } else if (_self.isOverflowCut) {
                        _self.textBox.val(_self.textBox.val().slice(0, _self.max));
                        _self.getFullNumber();
                    }
                } else {
                    _self.num.removeClass(_self.overClass);
                    _self.textBox.removeClass(_self.overClass).attr('data-overflow', '');
                    _self.passClallback && _self.passClallback.call(_self, _self.number, _self.textBox, _self.max);
                }
                _self.num.html(_self.max - _self.number);
                _self.changeCallback.call(_self, _self.number);
            }
            _self.oldNumber = _self.number;
            if (_self.settings.minHeight) {
                _self.textBox.height(_self.minHeight);
                _self.textBox.height(_self.textBox[0].scrollHeight);
            }
        },
        getNumber: function() {
            if (this.args.isByte) {
                this.number = this.textBox.val().replace(/[^\x00-\xff]/g, "**").length;
            } else {
                this.number = this.textBox.val().length;
            }
            return this.number;
        },
        getFullNumber: function() {
            this.number = this.textBox.val().replace(/[^\x00-\xff]/g, "**").length;
            return this.number;
        }
    };
    return WordCount;
});

(function($) {
    //初始化绑定事件
    $(function() {

    });
    $.fn.extend({
        comboboxfilter: function(ops) {
            if (typeof(arguments[0]) != typeof("string")) {
                return $.fn.comboboxfilter.methods["init"](this, ops);
            } else {
                return $.fn.comboboxfilter.methods[arguments[0]](this, arguments);
            }
        }
    });

    //方法
    $.fn.comboboxfilter.methods = {
        options: function(target) {
            var opts = $(target).data("comboboxfilter").options;
            return opts;
        },
        init: function(target, ops) {
            var $this = this;
            var options = $.extend({}, $.fn.comboboxfilter.defaults, ops);
            $(target).data("comboboxfilter", { options: options });
            $(target).removeClass('hotel-filter-list filter-list-has-more hotel-filter-list-min').addClass("hotel-filter-list filter-list-has-more hotel-filter-list-min");
            var listcontainer = $('<div class="con"></div>').addClass(!options.multiple ? "radio" : "checkbox");
            if (options.unlimit) { //如果开启不限 则添加 
                var anyNode = $('<ul class="any"><li><a class="filter-unlimit filter-tag selected" href="javascript:;" data-value="">' + options.unlimitText + '</a></li></ul>').bind('click', function() {
                    $(anyNode).find('.filter-unlimit').removeClass('selected').addClass('selected');
                    $this.clear(target);
                });
                listcontainer.append(anyNode);
            }
            listcontainer.append('<ul class="list"></ul> <span class="J_FilterMore filter-more"><span class="open">更多</span><span class="close">收起</span><i></i></span>');
            listcontainer.find('.open').unbind('click').bind('click', function() { //绑定点击更多事件
                $(target).removeClass('hotel-filter-list-min');
            });
            listcontainer.find('.close').unbind('click').bind('click', function() { //绑定点击更多事件
                $(target).addClass('hotel-filter-list-min');
            });
            $(target).html($('<strong class="tit">' + options.text + '</strong>'));
            if (options.inputName) { //添加隐藏的inputName
                $(target).append($('<input type="hidden" name="' + options.inputName + '" value="">'));
            }
            //具有分组
            if (options.scope) {
                $(target).attr('scope', options.scope); //添加自定义分组属性
                if ($('#' + options.scope).length > 0) {

                } else {
                    var node = $('<div id="' + options.scope + '" class="hotel-filter-list "><strong class="tit">已选</strong><div class="con selected-query"><ul  class="list"><li class="filter-query-clear"><a class="J_FilterQueryClear" href="javascript:;">全部清除</a></li></ul></div></div>');
                    node.find('.J_FilterQueryClear').unbind('click').bind('click', function() { //全部清除事件
                        $('div[scope="' + options.scope + '"]').comboboxfilter('clear');
                    });
                    $('div[scope="' + options.scope + '"]:eq(0)').before(node);
                }
            }
            $(target).append(listcontainer);
            this.load(target, {});

        },
        reload: function(target) {
            this.load(target, {});
        },
        load: function(target, opts) {
            var $this = this;
            var options = $.extend({}, $.fn.comboboxfilter.methods["options"](target), opts);
            if (opts.url) {
                $.ajax({
                    type: 'post',
                    data: options.param,
                    url: options.url,
                    success: function(data) {
                        if (typeof(data) == typeof("string")) {
                            data = $.parseJSON(data);
                        }
                        var listTarget = $(target).find('.list').html('');
                        $this.setData(listTarget, options, data, target);
                    },
                    error: function(e) {
                        $this.onError(e);
                    }
                });
            } else {
                var listTarget = $(target).find('.list').html('');
                $this.setData(listTarget, options, options.data, target);
            }

        },
        loadData: function(target, data) {
            var $this = this;
            var options = $this.options(target);
            var listTarget = $(target).find('.list').html('');
            $this.setData(listTarget, options, data, target);

        },
        setData: function(target, options, data, targetContain) {
            var $this = this;
            $.each(data, function(i, item) {
                var listnode = $(' <li></li>');
                var clicka = $('<a class="filter-tag" href="javascript:;" data-value="' + item[options.idField] + '" data-text="' + item[options.textField] + '">' + item[options.textField] + '<i></i></a>').data('data', item);
                clicka.unbind('click').bind('click', function(e) {
                    if (clicka.hasClass('selected')) { //验证是否被选择，已经选择则取消选择，反之选择
                        clicka.removeClass('selected'); //不可去掉（为了计算Value的正确性）
                    } else {
                        if (!options.multiple) { //单选执行
                            $(targetContain).find('.selected').trigger("click.selected-tag"); //触发事件清除全部选项
                        }
                        clicka.addClass('selected');
                        $this.addSelected($('#' + options.scope), clicka, item, options, targetContain); //容器中添加选择项
                    }
                    $this.reSetValue(targetContain); //重新计算Value
                    options.onClick(item); //触发单机事件
                });
                listnode.append(clicka);
                target.append(listnode);
            });
            options.onLoadSuccess(data); //触发加载完成事件
        },
        getValue: function(target) {
            var selected = $(target).find('.list .selected');
            var array = new Array();
            $.each(selected, function(i, item) {
                array.push($(item).attr('data-value'));
            });
            return array.join(",");
        },
        setValue: function(target, value) {
            $(target).find('.selected').trigger("click.selected-tag"); //触发事件清除全部选项用于重新赋值
            var options = this.options(target);
            var clicka = $(target).find('.filter-tag[data-value="' + value[1] + '"]');
            if (clicka.length > 0) {
                clicka.addClass('selected');
                var item = $(clicka).data('data'); //取值
                this.addSelected($('#' + options.scope), clicka, item, options, target); //容器中添加选择项
            }
            this.reSetValue(target); //重新计算Value
        },
        setValues: function(target, valueArray) {
            var $this = this;
            var options = this.options(target);
            if (options.multiple) { //开启多选可用
                $(target).find('.selected').trigger("click.selected-tag"); //触发事件清除全部选项用于重新赋值
                $.each(valueArray[1], function(i, itemData) {
                    var clicka = $(target).find('.filter-tag[data-value="' + itemData + '"]');
                    if (clicka.length > 0) {
                        clicka.addClass('selected');
                        var item = $(clicka).data('data'); //取值
                        $this.addSelected($('#' + options.scope), clicka, item, options, target); //容器中添加选择项
                    }
                });
                $this.reSetValue(target); //重新计算Value
            }
        },
        //添加已经选择项
        //pointTarget：选择项容器
        //target 被点击的项
        //itemData 被选择数据
        addSelected: function(pointTarget, target, itemData, options, targetContain) {
            var $this = this;
            var anode = $('<a href="javascript:;">' + itemData[options.textField] + '</a>');
            //创建X ,点击则移除选择项
            var inode = $('<i class="J_FilterQueryDel" data-type="ParentCatelog" data-value="' + itemData[options.idField] + '"></i>').unbind('click').bind('click', function(e) {
                $(target).trigger("click.selected-tag"); //触发事件
                // $(e.target).closest('.selected-tag').remove();
                $this.reSetValue(targetContain); //重新计算Value
            });
            //绑定指定命名空间的单击事件
            $(target).unbind('click.selected-tag').bind('click.selected-tag', function(e) {
                $(target).removeClass('selected');
                $(anode).closest('.selected-tag').remove();
                $(target).unbind('click.selected-tag');
            });
            anode.append(inode);
            pointTarget.find('.list').append($('<li data-type="ParentCatelog" class="selected-tag"></li>').append(anode));
        },
        //重新计算Value
        reSetValue: function(target) {
            var value = this.getValue(target);
            $(target).find('input[name="' + this.options(target).inputName + '"]').val(value);
            //有值
            if (value) {
                $(target).find('.filter-unlimit').removeClass('selected');
            }
            //无值
            else {
                $(target).find('.filter-unlimit').addClass('selected');
            }
            this.options(target).onChange(value);
        },
        clear: function(target) {
            $(target).find('.selected').trigger("click.selected-tag"); //触发事件
            this.reSetValue(target); //重新计算Value
        }
    }
    $.fn.comboboxfilter.parseOptions = function(target) {
        return $.extend({}, $.fn.datagrid.parseOptions(target), {});
    };

    $.fn.comboboxfilter.defaults = {
        url: '',
        idField: 'id',
        textField: 'text',
        scope: 'FilterQuery',
        text: '',
        multiple: false,
        data: [],
        inputName: '',
        unlimit: true, //是否显示不限，默认显示
        unlimitText: '不限',
        param: {},
        onClick: function(itemData) {},
        onChange: function(newValue) {},
        onLoadSuccess: function(data) {},
        onError: function(e) {}
    };
})(jQuery);



(function($, window, document, undefined) {
    var colorSlider = function() {
        return this.init.apply(this, arguments);
    };
    colorSlider.prototype = {
        defaults: {
            onstatechange: function() {},
            isRange: false,
            showLabels: true,
            showScale: true,
            step: 1,
            format: '%s',
            theme: 'color-slider-theme-blue',
            width: 500,
            disable: false
        },
        template: '<div class="slider-container">\
			<div class="back-bar">\
                <div class="selected-bar"></div>\
                <div class="pointer low"></div><div class="pointer-label">123456</div>\
                <div class="pointer high"></div><div class="pointer-label">456789</div>\
                <div class="clickable-dummy"></div>\
            </div>\
            <div class="scale"></div>\
		</div>',
        init: function(node, options) {
            this.options = $.extend({}, this.defaults, options);
            this.inputNode = $(node);
            this.options.value = this.inputNode.val() || (this.options.isRange ? this.options.from + ',' + this.options.from : this.options.from);
            this.domNode = $(this.template);
            this.domNode.addClass(this.options.theme);
            this.inputNode.after(this.domNode);
            this.domNode.on('change', this.onChange);
            this.pointers = $('.pointer', this.domNode);
            this.lowPointer = this.pointers.first();
            this.highPointer = this.pointers.last();
            this.labels = $('.pointer-label', this.domNode);
            this.lowLabel = this.labels.first();
            this.highLabel = this.labels.last();
            this.scale = $('.scale', this.domNode);
            this.bar = $('.selected-bar', this.domNode);
            this.clickableBar = this.domNode.find('.clickable-dummy');
            this.interval = this.options.to - this.options.from;
            this.render();
        },
        render: function() {

            if (this.inputNode.width() === 0 && !this.options.width) {
                console.log('colorSlider : no width found, returning');
                return;
            } else {
                this.domNode.width(this.options.width || this.inputNode.width());
                this.inputNode.hide();
            }

            if (this.isSingle()) {
                this.lowPointer.hide();
                this.lowLabel.hide();
            }
            if (!this.options.showLabels) {
                this.labels.hide();
            }
            this.attachEvents();
            if (this.options.showScale) {
                this.renderScale();
            }
            this.setValue(this.options.value);
        },
        isSingle: function() {
            if (typeof(this.options.value) === 'number') {
                return true;
            }
            return (this.options.value.indexOf(',') !== -1 || this.options.isRange) ?
                false : true;
        },
        attachEvents: function() {
            this.clickableBar.click($.proxy(this.barClicked, this));
            this.pointers.on('mousedown touchstart', $.proxy(this.onDragStart, this));
            this.pointers.bind('dragstart', function(event) {
                event.preventDefault();
            });
        },
        onDragStart: function(e) {
            if (this.options.disable || (e.type === 'mousedown' && e.which !== 1)) {
                return;
            }
            e.stopPropagation();
            e.preventDefault();
            var pointer = $(e.target);
            this.pointers.removeClass('last-active');
            pointer.addClass('focused last-active');
            this[(pointer.hasClass('low') ? 'low' : 'high') + 'Label'].addClass('focused');
            $(document).on('mousemove.slider touchmove.slider', $.proxy(this.onDrag, this, pointer));
            $(document).on('mouseup.slider touchend.slider touchcancel.slider', $.proxy(this.onDragEnd, this));
        },
        onDrag: function(pointer, e) {
            e.stopPropagation();
            e.preventDefault();

            if (e.originalEvent.touches && e.originalEvent.touches.length) {
                e = e.originalEvent.touches[0];
            } else if (e.originalEvent.changedTouches && e.originalEvent.changedTouches.length) {
                e = e.originalEvent.changedTouches[0];
            }

            var position = e.clientX - this.domNode.offset().left;
            this.domNode.trigger('change', [this, pointer, position]);
        },
        onDragEnd: function(e) {
            this.pointers.removeClass('focused');
            this.labels.removeClass('focused');
            $(document).off('.slider');
        },
        barClicked: function(e) {
            if (this.options.disable) return;
            var x = e.pageX - this.clickableBar.offset().left;
            if (this.isSingle())
                this.setPosition(this.pointers.last(), x, true, true);
            else {
                var pointer = Math.abs(parseInt(this.pointers.first().css('left'), 10) - x + this.pointers.first().width() / 2) < Math.abs(parseInt(this.pointers.last().css('left'), 10) - x + this.pointers.first().width() / 2) ?
                    this.pointers.first() : this.pointers.last();
                this.setPosition(pointer, x, true, true);
            }
        },
        onChange: function(e, self, pointer, position) {
            var min, max;
            if (self.isSingle()) {
                min = 0;
                max = self.domNode.width();
            } else {
                min = pointer.hasClass('high') ? self.lowPointer.position().left + self.lowPointer.width() / 2 : 0;
                max = pointer.hasClass('low') ? self.highPointer.position().left + self.highPointer.width() / 2 : self.domNode.width();
            }
            var value = Math.min(Math.max(position, min), max);
            self.setPosition(pointer, value, true);
        },
        setPosition: function(pointer, position, isPx, animate) {
            var leftPos,
                lowPos = this.lowPointer.position().left,
                highPos = this.highPointer.position().left,
                circleWidth = this.highPointer.width() / 2;
            if (!isPx) {
                position = this.prcToPx(position);
            }
            if (pointer[0] === this.highPointer[0]) {
                highPos = Math.round(position - circleWidth);
            } else {
                lowPos = Math.round(position - circleWidth);
            }
            pointer[animate ? 'animate' : 'css']({
                'left': Math.round(position - circleWidth)
            });
            if (this.isSingle()) {
                leftPos = 0;
            } else {
                leftPos = lowPos + circleWidth;
            }
            this.bar[animate ? 'animate' : 'css']({
                'width': Math.round(highPos + circleWidth - leftPos),
                'left': leftPos
            });
            this.showPointerValue(pointer, position, animate);
            this.isReadonly();
        },

        setValue: function(value) {
            var values = value.toString().split(',');
            this.options.value = value;
            var prc = this.valuesToPrc(values.length === 2 ? values : [0, values[0]]);
            if (this.isSingle()) {
                this.setPosition(this.highPointer, prc[1]);
            } else {
                this.setPosition(this.lowPointer, prc[0]);
                this.setPosition(this.highPointer, prc[1]);
            }
        },
        renderScale: function() {
            var s = this.options.scale || [this.options.from, this.options.to];
            var prc = Math.round((100 / (s.length - 1)) * 10) / 10;
            var str = '';
            for (var i = 0; i < s.length; i++) {
                str += '<span style="left: ' + i * prc + '%">' + (s[i] != '|' ? '<ins>' + s[i] + '</ins>' : '') + '</span>';
            }
            this.scale.html(str);

            $('ins', this.scale).each(function() {
                $(this).css({
                    marginLeft: -$(this).outerWidth() / 2
                });
            });
        },
        getBarWidth: function() {
            var values = this.options.value.split(',');
            if (values.length > 1) {
                return parseInt(values[1], 10) - parseInt(values[0], 10);
            } else {
                return parseInt(values[0], 10);
            }
        },
        showPointerValue: function(pointer, position, animate) {
            var label = $('.pointer-label', this.domNode)[pointer.hasClass('low') ? 'first' : 'last']();
            var text;
            var value = this.positionToValue(position);
            if ($.isFunction(this.options.format)) {
                var type = this.isSingle() ? undefined : (pointer.hasClass('low') ? 'low' : 'high');
                text = this.options.format(value, type);
            } else {
                text = this.options.format.replace('%s', value);
            }

            var width = label.html(text).width(),
                left = position - width / 2;
            left = Math.min(Math.max(left, 0), this.options.width - width);
            label[animate ? 'animate' : 'css']({
                left: left
            });
            this.setInputValue(pointer, value);
        },
        valuesToPrc: function(values) {
            var lowPrc = ((values[0] - this.options.from) * 100 / this.interval),
                highPrc = ((values[1] - this.options.from) * 100 / this.interval);
            return [lowPrc, highPrc];
        },
        prcToPx: function(prc) {
            return (this.domNode.width() * prc) / 100;
        },
        positionToValue: function(pos) {
            var value = (pos / this.domNode.width()) * this.interval;
            value = value + this.options.from;
            return Math.round(value / this.options.step) * this.options.step;
        },
        setInputValue: function(pointer, v) {
            if (this.isSingle()) {
                this.options.value = v.toString();
            } else {
                var values = this.options.value.split(',');
                if (pointer.hasClass('low')) {
                    this.options.value = v + ',' + values[1];
                } else {
                    this.options.value = values[0] + ',' + v;
                }
            }
            if (this.inputNode.val() !== this.options.value) {
                this.inputNode.val(this.options.value);
                this.options.onstatechange.call(this, this.options.value);
            }
        },
        getValue: function() {
            return this.options.value;
        },
        isReadonly: function() {
            this.domNode.toggleClass('slider-readonly', this.options.disable);
        },
        disable: function() {
            this.options.disable = true;
            this.isReadonly();
        },
        enable: function() {
            this.options.disable = false;
            this.isReadonly();
        },
        toggleDisable: function() {
            this.options.disable = !this.options.disable;
            this.isReadonly();
        }
    };

    var pluginName = 'colorSlider';
    $.fn[pluginName] = function(option) {
        var args = arguments,
            result;

        this.each(function() {
            var $this = $(this),
                data = $.data(this, 'plugin_' + pluginName),
                options = typeof option === 'object' && option;
            if (!data) {
                $this.data('plugin_' + pluginName, (data = new colorSlider(this, options)));
                $(window).resize(function() {
                    data.setValue(data.getValue());
                });
            }

            if (typeof option === 'string') {
                result = data[option].apply(data, Array.prototype.slice.call(args, 1));
            }
        });

        return result || this;
    };

})(jQuery, window, document);