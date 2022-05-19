$(function () {
    // 从 layui 中导出 form
    var form = layui.form

    // 从 layui 中导出 layer
    var layer = layui.layer

    // 自定义 layui 中的表单验证规则
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在 1 ~ 6 个字符之间！'
            }
        }
    })

    initUserinfo()

    // 初始化用户的基本信息
    function initUserinfo(){
        $.ajax({
            type:'get',
            url:'/api/home/getuser',
            success:function(res){
                if(res.code !== 200){
                    return layer.msg('获取用户信息失败')
                }
                console.log(res)
                // 调用 form.val() 快速为表单赋值
                // 第一个参数是要赋值的表单中自定义属性 lay-filter 的值
                form.val('formUserInfo',res.data)
            }
        })
    }

    // 重置表单的数据
    $('#btnReset').on('click',function(e){
        // 阻止表单的默认重置行为
        e.preventDefault()

        initUserinfo()
    })

    // 监听表单提交事件
    $('.layui-form').on('submit',function(e){
        // 阻止表单的默认提交行为
        e.preventDefault()

        var edituser={
            id:$('#nid').val(),
            nickname:$('#nickname').val(),
            email:$('#email').val()
        }

        $.ajax({
            type:'post',
            url:'/api/home/edituser',
            contentType: 'application/json',
            data:JSON.stringify(edituser),
            success:function(res){
                if(res.code !==200){
                    return layer.msg('更新用户信息失败')
                }
                
                layer.msg(res.message)
                // 调用父页面(index.html)中获取用户基本信息的方法，重新渲染用户的基本信息
                // window 表示当前的iframe, parent 表示父页面 index.html
                window.parent.getUserInfo()
            }
        })
    })
})