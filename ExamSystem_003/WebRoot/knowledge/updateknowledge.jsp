<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@page isELIgnored="false"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>Update knowledge page </title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<link rel="stylesheet" href="<%=basePath%>css/960.css" type="text/css" media="screen" charset="utf-8" />
	<link rel="stylesheet" href="<%=basePath%>css/template.css" type="text/css" media="screen" charset="utf-8" />
	<link rel="stylesheet" href="<%=basePath%>css/colour.css" type="text/css" media="screen" charset="utf-8" />
	

  </head>
  
  <body>
   <h1 id="head">修改知识点信息</h1>
		
		<ul id="navigation" style="height: 20px;">
			<li></li>
			<li><font size="1px"><a href="<%=basePath%>index.jsp" style="float: right; !important" >返回首页</a></font></li>
		
		</ul>
			<form action="<%=basePath%>TeacherSvl?operate=updateknow" method="post"><div style="position: absolute;top: 50%;left: 50%;-ms-transform: translate(-50%,-50%);-moz-transform: translate(-50%,-50%);-o-transform: translate(-50%,-50%);transform: translate(-50%,-50%);"">
			<table align="center" > 
				<tr style="text-align: center;">
					<td style="width: 80px; text-align: center;">知识点编号</td>
					<td><input type="text" name="kno" value="${know.kno}" readonly/></td>
				</tr>
				<tr style="text-align: center;">
					<td style="width: 80px; text-align: center;">知识点内容</td>
					<td><input type="text" name="kname" value="${know.kname}"/></td>
				</tr>
				<tr style="text-align: center;">
					<td colspan="2" align="center" style="width: 80px;text-align: center;" >
					<input type="submit" value="修改知识点相关信息" align="middle"/></td>
					
				</tr>
			</table>
			</div>
			
		
			</form>
			
				
  </body>
</html>
