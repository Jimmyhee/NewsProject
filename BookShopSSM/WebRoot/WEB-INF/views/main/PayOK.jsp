<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib prefix="c"  uri="http://java.sun.com/jsp/jstl/core" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP 'PayOK.jsp' starting page</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->

  </head>
  
  <body>
   <table align="center" width=90%>
      <jsp:include page="mhead.jsp"></jsp:include>
      <tr>
      	<td>
      		<table border="1" width=100%> 
			    <tr><td align=center colspan=4><font color="red;size=18">付款成功！我们会尽快为您进行配送 </font><br>如下内容为您的购买信息 </td></tr>
      			<tr><td>书名</td><td>作者</td><td>商品价格</td><td width="5%">数量</td></tr>		       
       			     
       			     <tr><td>红与黑</td><td>司汤达</td><td>38.5</td><td >5本</tr>
       			     
				 
       			
      			    <tr><td colspan=4 align=center>账户余额：￥${user.account}  &nbsp;&nbsp;&nbsp;&nbsp; 商品总价：￥${allmoney}</td></tr>
    		</table>
      	</td>
      </tr>
      <tr>
      	
      		<td align="center"> <a href="<%=basePath%>main.do">返回主页</a></td>
        	
      </tr>
    
    </table>

  </body>
</html>
