<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@page isELIgnored="false"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML >
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>Login page</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<link href="<%=basePath%>css/style.css" rel='stylesheet' type='text/css' />
  	<script type="text/javascript">
	if(top.location!=self.location){
	top.location="Login.jsp";
	}
	</script> 
	
  </head>
  
  <body>
     <!--SIGN UP-->
     <h1>欢迎登录考试系统</h1>
<div class="login-form">
	<div class="close"> </div>
		<div class="head-info">
			<label class="lbl-1"> </label>
			<label class="lbl-2"> </label>
			<label class="lbl-3"> </label>
		</div>
			<div class="clear"> </div>
	<div class="avtar">
		<img src="<%=basePath%>/img/avtar.png" />
	</div>
			<form action="<%=basePath%>LoginSvl" method="post">
			
					<input type="text" class="text" name="uno" id="uno"   >
						<div class="key">
					<input type="password" name="pwd" id="pwd" ><br>
						</div>
						<div><span style="color: white !important">${msg}</span></div>
						
						<div class="signin">
						<input type="submit" value="登录" >
						</div>
			</form>
			
			
</div>
 <div class="copy-rights">
					<p>Copyright &copy; 2019.by hzm</p>
			</div>
  </body>
</html>
