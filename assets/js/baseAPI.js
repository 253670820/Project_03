// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function (options) {
  // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
  options.url = 'http://192.168.1.34:8033' + options.url
  // options.url = 'https://192.168.0.102:8033' + options.url

  // 统一设置请求头
  if (options.url.indexOf('/home/') !== -1) {
    options.headers = {
      Authorization: 'Bearer ' + localStorage.getItem('token') || ''
    }
  }

  // 全局统一挂载 complete 回调
  options.complete = function (res) {
    // 判断http请求状态码
    if (res.status !== 200) {
      // 强制清除token
      localStorage.removeItem('token')
      // 强制跳转到登录页
      location.href = './login.html'
    }
    // 判断返回结果中的状态码
    // if (res.responseJSON.code === 500) {
    //   // 强制清除token
    //   localStorage.removeItem('token')
    //   // 强制跳转到登录页
    //   location.href = './login.html'
    // }
  }
})