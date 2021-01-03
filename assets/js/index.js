$(function () {
  // 调用 getUserInfo 获取用户的基本信息
  getUserInfo()
  var layer = layui.layer

  //未退出按钮 绑定点击事件
  $('#btnLogout').on('click', function () {
    // console.log('ok');
    // 提示用户是否退出
    layer.confirm('确定是否退出?', { icon: 3, title: '提示' }, function (index) {
      // console.log('ok');
      // 1.清空本地存储中的 token
      localStorage.removeItem('token');
      //2. 重新跳转到 登录页面
      location.href = '/login.html'
      //关闭 confirm 询问框
      layer.close(index);
    });
  })
})

//获取用户的基本信息
function getUserInfo() {
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    // headers 就是请求头配置对象
    // headers: {
    //   //方法 localStorage.getItem('token') 从缓存中取值 键名字为 token 没有则为""
    //   Authorization: localStorage.getItem('token') || ''
    // },
    success: function (res) {
      // console.log(res);
      if (res.status !== 0) {
        return layui.layer.msg('获取用户信息失败！')
      }
      // 调用 renderAvatar 渲染用户的头像
      renderAvatar(res.data)
    },
    //不论成功还是失败 最终都会调用 complete 回调函数
    //  complete: function(res) {
    //   // console.log('执行了 complete 回调：')
    //   // console.log(res)
    //   // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
    //   if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
    //     // 1. 强制清空 token
    //     localStorage.removeItem('token')
    //     // 2. 强制跳转到登录页面
    //     location.href = '/login.html'
    //   }
    // }
  })
}

// 渲染用户的头像
function renderAvatar(user) {
  //1.获取用户名称 用户昵称比用户名 级别高
  var name = user.nickname || user.username
  // 2.设置欢迎的文本
  $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
  // 3.按需渲染用户的头像 判断用户是否有 user_pic 属性 有就有头像
  if (user.user_pic !== null) {
    // 3.1 渲染图片头像
    //获取到图片头像
    $('.layui-nav-img')
      //.attr（）设置 src 元素的属性 .show() 显示
      .attr('src', user.user_pic)
      .show()
    // 文本头像隐藏
    $('.text-avatar').hide()
  } else {
    // 3.2 渲染文本头像
    $('.layui-nav-img').hide()
    // 获取字符串的打一个字符  name[0]  转换为 大写 .toUpperCase()
    var first = name[0].toUpperCase()
    $('.text-avatar')
      .html(first)
      .show()
  }
}