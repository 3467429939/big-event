//jq提供的Ajax的方法
$.ajaxPrefilter(function (options) { 
    options.url = 'http://www.liulongbin.top:3007' + options.url
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization:localStorage.getItem('token') || ''
        }
    }
    //权限管理优化
    options.complete = function (res) {
        if (res.responseJSON.status !== 0 &&res.responseJSON.message == '身份认证失败！') {
            location.href = '/day11/login.html'
        }
      }
 })