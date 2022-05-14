$(function () {
    // 点击注册账号链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 点击去登陆链接
    $('#link_login').on('click', function () {
        $('.reg-box').hide()
        $('.login-box').show()
    })

    // 从 layui 中获取 form
    var form = layui.form
    // 从 layui 中获取 layer
    var layer = layui.layer

    // 通过调用 form.verify() 函数自定义表单校验规则
    form.verify({
        // 自定义了一个叫做 pwd 校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 校验两次密码是否一致的规则
        repwd: function (value) {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败,则return一个提示消息即可
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    })

    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        // 阻止表单的默认提交行为
        e.preventDefault()

        var user = {
            UserName: $('#form_reg [name=username]').val(),
            Password: $('#form_reg [name=password]').val()
        }
        // 使用jquery发起ajax请求
        $.ajax({
            type: 'post',
            url: '/api/user/reguser',
            contentType: 'application/json',
            data: JSON.stringify(user),
            success: function (res) {
                if (res.code !== 200) {
                    // 使用 layui 中的layer(弹出层)提示消息
                    return layer.msg(`注册失败:${res.message}`)
                }
                layer.msg(`注册成功，请登录`)
                // 模拟人的点击行为
                $('#link_login').click()
            }
        })
    })

    // 监听登录表单的提交事件
    $('#form_login').on('submit', function (e) {
        // 阻止表单的默认提交行为
        e.preventDefault()

        var user = {
            UserName: $('#form_login [name=username]').val(),
            Password: $('#form_login [name=password]').val()
        }
        // 使用jquery发起ajax请求
        $.ajax({
            type: 'post',
            url: '/api/account/login',
            contentType: 'application/json',
            // async:false,
            data: JSON.stringify(user),
            success: function (res) {
                if (res.code !== 200) {
                    // 使用 layui 中的layer(弹出层)提示消息
                    return layer.msg(`用户名或密码错误`)
                }
                // layer.msg(`${res.token}`)
                // 将登录成功得到的 token 字符串，保存到 localStorage 中
                localStorage.setItem('token', res.token)
                // 跳转到后台主页
                location.href = './index.html'
            }
        })
    })
})