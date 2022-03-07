var form = layui.form
form.verify({
    nickname:function (value) {
        if (value.length) {
            return '用户昵称过长，请输入不超过6个字符'
        }
      }
})
// 发起get请求得到用户信息
initUserInfo()
function initUserInfo() { 
    var layer = layui.layer
$.ajax({
    method:"get",
    url: "/my/userinfo",
    success: function (res) {
        if (res.status !== 0) {
            return layer.msg('用户信息获取失败')
        }
        //渲染页面 给表单赋值
        form.val('form_userinfo',res.data)
    }
});
 }
$('#btn_reset').on('click',function (e) {
    e.preventDefault()
    //恢复服务器中的表单数据
    initUserInfo()
  })
  //提交修改
  //收集数据--存入服务器--ajax请求--数据更新
  $('.layui-form').on('click',function (e) { 
    e.preventDefault()
    $.ajax({
        method: "post",
        url: "/my/userinfo",
        data: $(this).serialize(),
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('提交信息失败')
            }
            //调用indeed.js的getUserInfo()修改昵称
            //window指的是当前页面
            //window。parent是同一个浏览器选项卡的父页面
            window.parent.getUserInfo()
        }
    });
   })