//确定表单输入规则
var form = layui.form
var layer = layui.layer
form.verify({
     pwd:[
        /^[\s]{6,13}$/,'请输入6-13位密码'
    ],
    //新密码规则
    samepwd:function (value) {
        if (value === $('[name=oldPwd').val()) {
            return layer.msg('新密码与旧密码不能相同')
        }
      },
      //确认新密码
      repwd:function (value) {
          if (value !==$('[name=newPwd').val()) {
              return layer.msg('两次密码不一样')
          }
        }
   })
   //修改密码按钮
   $('.layui-form').on('submit',function (e) { 
       e.preventDefault()
       $.ajax({
           method:'post',
           url: "/my/updatepwd",
           data: $(this).serialize(),
           success: function (res) {
               console.log(res);
               if (res.status !== 0) {
                   return layer.msg('更新失败')
               }
               layer.msg('更新成功')
               //清空输入框的内容
               $('.layui-form')[0].reset()
           }
       });
    })