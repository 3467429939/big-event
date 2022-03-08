//封装函数获取文章类别的数据，渲染页面
initArtCateList()
var layer = layui.layer
var form = layui.form
function initArtCateList() {
    //使用ajax获取后台数据
    $.ajax({
        method:'get',
        url: "/my/article/cates",
        // data: "data",
        // dataType: "dataType",
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('获取文章列表失败')
            }
            // layer.msg('获取文章列表成功')
            //渲染页面
            var htmlStr = template('tpl-table',res)
            $('tbody').html(htmlStr)
        }
    });
  }
  var indexAdd = null;
  var indexEdit = null;
  $('#btnAddCate').on('click',function () {
        indexAdd = layer.open({
            area:['500px','300px'],
            type:1,
            title: '添加文章分类',
            content: $('#dialog-add').html(),
          });     
            
    })
    //因为表单时候添加的，所以添加事件用事件委托
    $('body').on('submit','#form-add',function (e) {
        e.preventDefault()
        $.ajax({
            method:'post',
            url: "/my/article/addcates",
            data: $(this).serialize(),
            // dataType: "dataType",
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('添加失败')
                }
                initArtCateList()
                layer.msg('添加成功')
                //用索引关闭弹出层
                layer.close(indexAdd)
            }
        });
      })
      //事件委托
      $('tbody').on('click','#btn-edit',function () {
          console.log($(this));
        indexEdit = layer.open({
            area:['500px','300px'],
            type:1,
            title: '修改文章分类',
            content: $('#dialog-edit').html(),
          }); 
          var id = $(this).attr('data-id') 
          $.ajax({
              method:'get',
              url: "/my/article/cates/" + id,
              success: function (res) {
                  console.log(res);
                  if (res.status !== 0) {
                      return layer.msg('获取文档分类失败')
                  }
                  form.val('form-edit',res.data)
                  
              }
          });
        })
        //更新文章列表
        $('body').on('submit','#form-edit',function (e) {
        e.preventDefault()
            $.ajax({
                method:'post',
                url: "/my/article/updatecate",
                data:$(this).serialize(),
                success: function (res) {
                    if(res.status !== 0){
                        return layer.msg('更新失败')
                    }
                    initArtCateList()
                    layer.close(indexEdit)
                    layer.msg('更新成功')
                }
            });
    })
    //删除文章类别
    $('tbody').on('click','#btn-del',function () {
        var id = $(this).attr('data-id')
        layer.confirm('是否删除', {icon: 3, title:'提示'}, function(index){
            //do something
            $.ajax({
                method:'get',
                url: "/my/article/deletecate/"+id,
                success: function (res) {
                 if (res.status !== 0) {
                     return layer.msg('删除失败')
                 }   
                 initArtCateList()
                 layer.msg('删除成功')
                }
            });
            layer.close(index);
          });
      })
