<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title></title>
    
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
    <h1 id="head">添加题目</h1>
		
		<ul id="navigation" style="height: 20px;">
			<li></li>
			<li><font size="1px"><a href="<%=basePath%>index.jsp" style="float: right; !important" >返回首页</a></font></li>
		
		</ul>
			<form action="<%=basePath%>QuestionAddSvl?operate=addother" method="post"><div style="position: absolute;top: 50%;left: 50%;-ms-transform: translate(-50%,-50%);-moz-transform: translate(-50%,-50%);-o-transform: translate(-50%,-50%);transform: translate(-50%,-50%);"">
			<table align="center" > 
				<tr style="text-align: center;">
					<td style="width: 80px; text-align: center;">题号</td>
					<td><input type="text" name ="qno" readonly="readonly" value="${qno}"/></td>
				</tr>
				<tr style="text-align: center; ">
					<td  style="width: 80px;text-align: center;">题目内容</td>
					<td><textarea rows="" cols="" name="qname"></textarea></td>
				</tr>
				<tr style="text-align: center;">
					<td style="width: 80px; text-align: center;">正确答案</td>
					<td><textarea rows="" cols="" name="qanswer"></textarea></td>
				</tr>
				<tr style="text-align: center;">
					<td style="width: 80px; text-align: center;">题目解析</td>
					<td><textarea rows="" cols="" name="qexplain"></textarea></td>
				</tr>
				<tr style="text-align: center;">
					<td colspan="2" align="center" style="width: 80px;text-align: center;" >
					<input type="submit" value="添加" align="middle"/></td>
					
				</tr>
				<tr>
				<td colspan="2" align="center" style="width: 80px;text-align: center;" >
					${msg}</td>
				</tr>
			</table>
			</div>
			</form>
  </body>
</html>
