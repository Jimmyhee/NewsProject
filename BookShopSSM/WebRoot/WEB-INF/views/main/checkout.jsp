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
    
    <title>My JSP 'checkout.jsp' starting page</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
	<script type="text/javascript">
	   function tijiao(){
	          var r=confirm("你确认提交吗？")
			  if (r==true){
			         var myform = document.getElementById("myform");
			         myform.submit();
			  }   
	   }
	
	</script>

  </head>
  
  <body>
    <form action="<%=basePath%>user/pay.do" method="post" id="myform">
    <table align="center" width=90%>
      <jsp:include page="mhead.jsp"></jsp:include>
      <tr>
      	<td>
      		<table border="1" width=100%> 
      			<tr><td>书名</td><td>作者</td><td>商品价格</td><td width="5%">数量</td></tr>		       
       			  <c:forEach var="bk" items="${books}">     				
       				<tr><td>${bk.bname}</td><td>${bk.author}</td><td>${bk.price}</td><td >${bk.mcount}</tr>    
				  </c:forEach>
				
       			
      			    <tr><td colspan=4 align=center>账户余额：${user.account} &nbsp;&nbsp;&nbsp;&nbsp; 商品总价：￥${allPrice}</td></tr>
    		</table>
      	</td>
      </tr>
      <tr>      	
      		<td align="center"><input type="button" onclick="tijiao()" value="付款确认"> &nbsp; <a href="<%=basePath%>main.do">返回</a></td>        	
      </tr>
        <tr><td><input type="hidden" name="allmoney" value="${allPrice}"></td></tr>
    </table>
   </form>
  </body>
</html>
