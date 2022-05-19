$(function () {
  var form = layui.form
  var layer = layui.layer

  // 自定义 layui 的表单验证规则
  form.verify({
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    samePwd: function (value) {
      if (value === $('[name=oldPwd]').val()) {
        return '新旧密码不能相同！'
      }
    },
    rePwd: function (value) {
      if (value !== $('[name=newPwd]').val()) {
        return '两次密码不一致！'
      }
    }
  })

  $('.layui-form').on('submit', function (e) {
    e.preventDefault()
    var pwd = {
      oldPwd: $('#oldPwd').val(),
      newPwd: $('#newPwd').val()
    }
    $.ajax({
      type: 'post',
      url: '/api/home/updatepwd',
      contentType: 'application/json',
      data: JSON.stringify(pwd),
      success: function (res) {
        if (res.message !== 200) {
          return layui.layer.msg(res.message)
        }
        layer.msg(res.message)
        // 重置表单
        $('.layui-form')[0].reset()
      }
    })
  })
})