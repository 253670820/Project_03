$(function () {
    getUserInfo()

    var layer = layui.layer
    // 退出
    $('#btnLogout').on('click', function () {
        layer.confirm('是否确定退出？', { icon: 3, title: '提示' }, function (index) {
            // 清空本地存储中的token
            localStorage.removeItem('token')
            // 跳转到登录页面
            location.href = './login.html'
            layer.close(index)
        })
    })
})

// 获取用户基本信息
function getUserInfo() {
    $.ajax({
        type: 'get',
        url: '/api/home/getuser',
        // headers:{
        //     Authorization:'Bearer '+localStorage.getItem('token')
        // },
        success: function (res) {
            if (res.code !== 200) {
                return layui.layer.msg('获取用户信息失败')
            }

            // 调用 renderAvatar 渲染用户头像
            renderAvatar(res.data)
        }
        // // 请求无论成功还是失败都会调用 complete
        // complete: function (res) {
        //     // 判断http请求状态码
        //     if (res.status !== 200) {
        //         // 强制清除token
        //         localStorage.removeItem('token')
        //         // 强制跳转到登录页
        //         location.href = './login.html'
        //     }
        // }
    })
}

// 渲染用户头像
function renderAvatar(user) {
    // 获取用户名
    var name = user.nickname || user.usernmae
    // 设置欢迎的文本
    $('#welcome').html('欢迎&nbsp&nbsp' + name)

    // 按需设置用户头像
    if (user.user_pic !== '') {
        // 设置图片头像
        $('.layui-nav-img').attr('src',user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        // 设置文本头像
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show
        $('.layui-nav-img').hide()

    }

}