//获取用户信息
getUserInfo()
function getUserInfo(){
$.ajax({
        method:"get",
        url: "/my/userinfo",
        // data: "data",
        headers:{
            Authorization:localStorage.getItem('token') || ''
        },
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('认证信息失败')
            }
            //如果成功，渲染用户头像
            renderAvatar(res.data)
        },
        // complete:function (res) {
        //     if (res.responseJSON.status !== 0 &&res.responseJSON.message == '身份认证失败！') {
        //         location.href = '/day11/login.html'
        //     }
        //   }
    });
}
//封装函数，渲染用户头像
function renderAvatar(data) {
    //获取用户名
    var aname = data.nickname || data.username
    $('#welcome').html('欢迎 &nbsp;&nbsp;' + aname)
    //渲染头像
    if (data.user_pic !== null) {
        //如果数据中图片由路径，吧路径传给img的src属性，并隐藏文字头像
        $('.layui-nav-img').prop('src',data.user_pic).show()
        $('.text_avatar').hide()
    }else{
        $('.layui-nav-img').prop('src',data.user_pic).hide()
        $('.text_avatar').html(aname[0].toUpperCase).show()
    }
}
//退出功能
//点击弹窗，提示是否退出，点击取消没有效果
//点击确定返回登陆页面 lofin
$('#btnlogout').on('click',function () {
    layer.confirm('确定退出？'，{
        icon:3,
        title:'提示',
    },{
        function (index) {
            localStorage.removeItem('token')
            location.href('/day11/login.html')
            layer.close(index);
          }
    })
  })