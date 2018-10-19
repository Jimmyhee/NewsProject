<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@page isELIgnored="false"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>


<title>Main2  page</title>

<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">

	<link href="<%=basePath%>css/bootstrap.css" rel="stylesheet">
    <link href="<%=basePath%>css/font-awesome.css" rel="stylesheet">
    <link href="<%=basePath%>css/admin.css" rel="stylesheet">
    <script src="<%=basePath%>/js/jquery.min.js"></script>
	<script src="<%=basePath%>/js/bootstrap.js"></script>


</head>

<body>

	<div class="container">

		<div class="row">

			<div class="span2" >

				<div class="main-left-col" >

					<h1>
						<i class="icon-table icon-large"></i> 你好,同学
					</h1>

					<ul class="side-nav">

						<li class="active"><a href="#" onclick="document.getElementById('iframe1').src='<%=basePath%>index.jsp'"><i
								class="icon-home"></i> 主页</a></li>
						<li class="dropdown"><a class="dropdown-toggle"
							data-toggle="collapse" data-target="#store-dropdown" href="#"><i
								class="icon-sitemap"></i> 考试相关 <b class="caret"></b></a>
							<ul id="store-dropdown" class="collapse"
								style="padding-left: 10%;">
								<font size="1px"><li><a
										href="#" onclick="document.getElementById('iframe1').src='<%=basePath%>PaperQuerySvl?operate=querystudentpaper'">开始考试</a></li>
									<li><a
										href="#" onclick="document.getElementById('iframe1').src='<%=basePath%>ResultQuerySvl'">查看成绩</a></li></font>
							</ul></li>
						<li class="dropdown"><a href="#"><i
								class="icon-info-sign"></i> 帮助 </a></li>
					</ul>

				</div>
				<!-- end main-left-col -->

			</div>
			<!-- end span2 -->

			<div class="span10">

				<div class="secondary-masthead">

					<ul class="nav nav-pills pull-right">
						
						<li class="dropdown"><a class="dropdown-toggle"
							data-toggle="dropdown" href="#"><i class="icon-user"></i>${user.uname}
								<b class="caret"></b> </a>
							<ul class="dropdown-menu">
								<li><a href="#" onclick="document.getElementById('iframe1').src='<%=basePath %>StudentSvl?operate=querystudentByUno&&uno=${user.uno}'" target="_parent">个人信息</a></li>
								<li><a href="#" onclick="document.getElementById('iframe1').src='<%=basePath %>UpdatePwd.jsp'">更改密码</a></li>
								<li><a href="LogoutSvl">退出登录</a></li>
							</ul></li>
					</ul>

					<ul class="breadcrumb">
						<li><a href="#">欢迎你</a> <span class="divider">/</span></li>
						<li class="active">${user.uname}</li>
					</ul>

				</div>
				<!--具体内容-->
				<div class="row" style="margin-left:0;margin-top:20px">
				<iframe width="100%" height="80%" id ="iframe1" src="index.jsp"></iframe>
				</div>
			</div>
		</div>
		<!-- end span10 -->
	</div>
	<!-- end row -->
	</div>
	<!-- end container -->

</body>
</html>
