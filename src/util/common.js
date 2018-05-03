export  default {

}
/*日期格式转换*/
export function formatDate (date, fmt) {
     if (/(y+)/.test(fmt)) {
         fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
       }
    let o = {
         'M+': date.getMonth() + 1,
         'd+': date.getDate(),
         'h+': date.getHours(),
        'm+': date.getMinutes(),
         's+': date.getSeconds()
     }
     for (let k in o) {
         if (new RegExp(`(${k})`).test(fmt)) {
           let str = o[k] + ''
             fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str))
          }
       }
     return fmt
   }

 function padLeftZero (str) {
     return ('00' + str).substr(str.length)
   }



/*获取上个月*/
export function getPreMonth(date) {
  var arr = date.split('-');
  var year = arr[0]; //获取当前日期的年份
  var month = arr[1]; //获取当前日期的月份
  var day = arr[2]; //获取当前日期的日
  var days = new Date(year, month, 0);
  days = days.getDate(); //获取当前日期中月的天数
  var year2 = year;
  var month2 = parseInt(month) - 1;
  if (month2 == 0) {
    year2 = parseInt(year2) - 1;
    month2 = 12;
  }
  var day2 = day;
  var days2 = new Date(year2, month2, 0);
  days2 = days2.getDate();
  if (day2 > days2) {
    day2 = days2;
  }
  if (month2 < 10) {
    month2 = '0' + month2;
  }
  var t2 = year2 + '-' + month2 + '-' + day2;
  return t2;
}
/*获取下个月*/
export function getNextMonth(date) {
  var arr = date.split('-');
  var year = arr[0]; //获取当前日期的年份
  var month = arr[1]; //获取当前日期的月份
  var day = arr[2]; //获取当前日期的日
  var days = new Date(year, month, 0);
  days = days.getDate(); //获取当前日期中的月的天数
  var year2 = year;
  var month2 = parseInt(month) + 1;
  if (month2 == 13) {
    year2 = parseInt(year2) + 1;
    month2 = 1;
  }
  var day2 = day;
  var days2 = new Date(year2, month2, 0);
  days2 = days2.getDate();
  if (day2 > days2) {
    day2 = days2;
  }
  if (month2 < 10) {
    month2 = '0' + month2;
  }
  var t2 = year2 + '-' + month2 + '-' + day2;
  return t2;
}
/*时间戳转换*/
export function getDateDiff(dateTimeStamp){
  var result;
  var minute = 1000 * 60;
  var hour = minute * 60;
  var day = hour * 24;
  var halfamonth = day * 15;
  var month = day * 30;
  var now = new Date().getTime();
  var diffValue = now - dateTimeStamp;
  if(diffValue < 0){return;}
  var monthC =diffValue/month;
  var weekC =diffValue/(7*day);
  var dayC =diffValue/day;
  var hourC =diffValue/hour;
  var minC =diffValue/minute;
 /* if(monthC>=1){
    result="" + parseInt(monthC) + "月前";
  }*/
   if(weekC>=1){
    result="" + parseInt(weekC) + "周前";
  }
  else if(dayC>=1){
    result=""+ parseInt(dayC) +"天前";
  }
  else if(hourC>=1){
    result=""+ parseInt(hourC) +"小时前";
  }
  else if(minC>=1){
    result=""+ parseInt(minC) +"分钟前";
  }else
    result="刚刚";
  return result;
}


/*获取参数*/
export function parseUrl(url) {
  // 找到url中的第一个?号
  var parse = url.substring(url.indexOf("?") + 1),
    params = parse.split("&"),
    len = params.length,
    item = [],
    param = {};

  for (var i = 0; i < len; i++) {
    item = params[i].split("=");
    param[item[0]] = item[1];
  }

  return param;
}
let wx = require('weixin-js-sdk');
//获取js-sdk接口
export function wxconfig(debug, appId, timestamp, nonceStr, signature, jsApiList){
  wx.config({
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: appId, // 必填，公众号的唯一标识
    timestamp: timestamp, // 必填，生成签名的时间戳
    nonceStr: nonceStr, // 必填，生成签名的随机串
    signature: signature,// 必填，签名，见附录1
    jsApiList: jsApiList // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
  });
}
