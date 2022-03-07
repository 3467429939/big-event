 // 1.1 获取裁剪区域的 DOM 元素
 var $image = $('#image')
var layer = layui.layer
 // 1.2 配置选项
 const options = {
   // 纵横比
   aspectRatio: 1,
   // 指定预览区域
   preview: '.img-preview'
 }

 // 1.3 创建裁剪区域
 $image.cropper(options)
 //1.4给上传按钮添加点击事件
$('#btn_upload').on('click',function () { 
    $('#file').click()
 })
 //1.5图片上传和头像裁剪
 $('#file').on('change',function (e) { 
     var file = e.target.files[0]
     var newImgURL = URL.createObjectURL(file)
     $image
     .cropper('destroy')      // 销毁旧的裁剪区域
     .attr('src', newImgURL)  // 重新设置图片路径
     .cropper(options)        // 重新初始化裁剪区域
  })
  //1.6裁剪到的图片上传到服务器
  $('#btnUpload').on('click', function () {
  var dataURL = $image
      .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
        width: 100,
        height: 100
      })
      .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
      $.ajax({
          method: "post",
          url: "/my/update/avatar",
          data:{avatar:dataURL},
        //   dataType: "dataType",
          success: function (res) {
              if (res.status != 0) {
                  return layer.msg('上传失败')
              }
              layer.msg('上传成功')
            window.parent.getUserInfo()
          }
      })
    })