var layer = layui.layer
var form = layui.form
var laypage =layui.laypage
// 初始化参数对象--用来查询
var q = {
    pagenum:1,
    pagesize:2,
    cate_id:'',
    state:''
}
//封装时间函数
 template.defaults.imports.dataFormat = function (date) {
    var dt = new Date(date)
    var y = addZero(dt.getFullYear())
    var m = addZero(dt.getMonth() + 1)
    var d = addZero(dt.getDate())
    var hh = addZero(dt.getHours())
    var mm = addZero(dt.getMinutes())
    var sss = addZero(dt.getSeconds())
    return y +'-'+m+'-'+d +''+hh+':'+mm+':'+sss
   }
   function addZero(n) { 
       return n < 10 ? '0' + n : n
    }
//获取文章列表数据
function initTable() {
    $.ajax({
        method:'get',
        url: "/my/article/list",
        data:q,
        success: function (res) {
            // console.log(q);
            console.log(res.data);
            if (res.status !== 0) {
                return layer.msg('获取失败')
            }
            //渲染页面
            var htmlStr = template('hoyo',res)
            $('tbody').html(htmlStr)
            //渲染分页
            renderPage(res.total)
        }
    });
  }
  initTable()
  //渲染筛选区域的所有分类
  function initCate() {
    $.ajax({
       method:"get",
        url: "/my/article/cates",
        success: function (res) {
            console.log(res);
            if (res.status !== 0) {
                return layer.msg('获取失败')
            }
            var htmlStr = template('tpl-cate',res)
            $('[name=cate_id]').html(htmlStr)
            //重新渲染layui的表单----在渲染之后写
            form.render()
        }
    });
    }
    initCate()
    //实现筛选的功能
    $('#btn-search').on('submit',function (e) {
        e.preventDefault()
        var cate_id = $('[name=cate_id]').val()
        var state = $('[name=state]').val()
        q.cate_id = cate_id
        q.state = state
        initTable()
      })
      //封装分页函数
      function renderPage() { 
        //分页的方式：根据数据的个数/每页显示的数量
        laypage.render({
            //容器
             elem:'page',
             //数据总量
             count:total,
             limits:[3,5,10],
             //每页显示的数据
             limit:q.pagesize,
             //默认选中的页码
             curr:q.pagenum,
             layout:['count','limit','prev','page','next','skip'],
             //切换页码
             //步骤：1.得到嗲记得是那一页
             //     2.重新渲染
             // jump会生效的情况：1.点击触发jump
             //                  2.调用render函数渲染页面的时候
             jump:function (obj,first) { 
                 q.pagenum = obj.curr
                 q.pagesize = obj.limit
                 initTable()
                 //调用函数渲染表格
                 if (!first) {
                     initTable()
                 }
              }
        })  
       }
       $('tbody').on('click','.btn-del',function () { 
           var  len = $('.btn-del').legth
           var id = $(this).attr(data-id)
        layer.confirm('Are you Sure?', {icon: 3, title:'提示'}, function(index){
            $.ajax({
                method:'get',
                url: "/my/article/delete/" + id,
                success: function (res) {
                    if(res.status !== 0){
                        return layer.msg('删除失败')
                    }
                    layer.msg('删除成功')
                    //如果当前页码的数据都删除，则显示前一个页码的数据
                    //判断当前页码的删除按钮的数量
                    if (len == 1) {
                        //如果是第一页，页码还是显示1，若不是则显示-1
                        q.pagenum = q.pagenum === 1 ? 1:q.pagenum - 1
                    }
                    initTable()
                }
            });
            layer.close(index);
          });
        })