$(function () {

    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    // 上传按钮
    $('#btnChooseImage').on('click', function () {
        $('#file').click()
    })

    // 文件选择框change事件
    $('#file').on('change', function (e) {
        // 获取用户选择的文件
        var filelist = e.target.files

        if (filelist.length === 0) {
            return layui.layer.msg('请选择图片!')
        }

        // 1. 拿到用户选择的文件
        var file = e.target.files[0]
        // 2. 将文件，转化为路径
        var imgURL = URL.createObjectURL(file)
        // 3. 重新初始化裁剪区域
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', imgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })

    // 确定按钮
    $('#btnUpload').on('click', function () {
        // 1. 要拿到用户裁剪之后的头像
        var dataURL = $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

        var pic = {
            user_Pic: dataURL
        }

        $.ajax({
            type: 'post',
            url: '/api/home/avatar',
            contentType: 'application/json',
            data: JSON.stringify(pic),
            success: function (res) {
                if (res.code !== 200) {
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg(res.message)
                // 调用父页面(index.html)中获取用户基本信息的方法，重新渲染用户的基本信息
                // window 表示当前的iframe, parent 表示父页面 index.html
                window.parent.getUserInfo()
            }
        })
    })
})