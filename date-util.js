/**
 * Created by zhaoyinyin on 2017/5/24.
 */

//日期工具类
function DateUtil() {
    this.now = new Date(); //当前日期
    this.nowDayOfWeek = this.now.getDay(); //今天本周的第几天
    this.nowYear = this.now.getFullYear(); //当前年
    this.nowMonth = this.now.getMonth(); //月
    this.nowDay = this.now.getDate();
    this.millisecond = 1000 * 60 * 60 * 24;//一天的毫秒数

    /**
     * 获得某周的起止日期
     * 0表示本周
     * 1表示上周
     * -1表示下周
     * */
    this.getWeek =  function(num){
        if (isNaN(num)){
            return false;
        }
        var minusDay, minus_tmp = 0;
        var cur_monday, cur_sunday, cur_monday_stamp, cur_sunday_stamp = '';
        minusDay = this.nowDayOfWeek != 0 ? this.nowDayOfWeek - 1 : 6;//减去的天数

        cur_monday_stamp = this.now.getTime() - (minusDay * this.millisecond);
        cur_monday = new Date(cur_monday_stamp);//本周 周一
        cur_sunday_stamp = cur_monday.getTime() + (6 * this.millisecond);
        cur_sunday = new Date(cur_sunday_stamp);//本周 周日

        if (num == 0){
            return {'first':this.formatDate(cur_monday), 'last':this.formatDate(cur_sunday)};
        }
        if (num < 0){
            minus_tmp = - (Math.abs(num) * 7 * this.millisecond);
        }else{
            minus_tmp = + (Math.abs(num) * 7 * this.millisecond);
        }

        var l_monday = new Date(cur_monday_stamp + minus_tmp);
        var l_sunday = new Date(cur_sunday_stamp + minus_tmp);
        return {'first':this.formatDate(l_monday), 'last':this.formatDate(l_sunday)};
    };

    /**
     * 获得某月的起止日期
     * 0表示本月
     * -1表示上月
     * 1表示下月
     * */
    this.getMonth =  function(num){
        if (isNaN(num)){
            return false;
        }
        var cur_month_first_day, cur_month_last_day, next_month_first_day = new Date();
        cur_month_first_day = this.formatDate(new Date(this.nowYear, this.nowMonth, 1));
        next_month_first_day = new Date(this.nowYear, this.nowMonth + 1, 1);
        cur_month_last_day = this.formatDate(new Date(next_month_first_day - this.millisecond));

        var first_day, last_day = tmp_day = new Date();
        //本月起止日期
        if (num == 0){
            return {'first': cur_month_first_day, 'last': cur_month_last_day};
        }
        else
        {
            //其他月份
            first_day = num < 0 ? this.formatDate(new Date(this.nowYear, this.nowMonth - Math.abs(num), 1)) : this.formatDate(new Date(this.nowYear, this.nowMonth + Math.abs(num), 1));
            tmp_day = num < 0 ? new Date(this.nowYear, this.nowMonth - Math.abs(num) + 1, 1) : new Date(this.nowYear, this.nowMonth + Math.abs(num) + 1, 1);
            last_day = num < 0 ? this.formatDate(new Date(tmp_day - this.millisecond)) : this.formatDate(new Date(tmp_day + this.millisecond));
        }

        return {'first': first_day, 'last': last_day};
    }

    /**
     * 格式化日期
     * */
    this.formatDate = function (dd) {
        var y = dd.getFullYear();
        var m = (dd.getMonth() + 1) < 10 ? "0" + (dd.getMonth() + 1) : (dd.getMonth() + 1);//获取当前月份的日期，不足10补0
        var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();//获取当前几号，不足10补0
        return y + "-" + m + "-" + d;
    }
}