<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>add question page</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<link rel="stylesheet" href="<%=basePath%>css/960.css" type="text/css" media="screen" charset="utf-8" />
	<link rel="stylesheet" href="<%=basePath%>css/template.css" type="text/css" media="screen" charset="utf-8" />
	<link rel="stylesheet" href="<%=basePath%>css/colour.css" type="text/css" media="screen" charset="utf-8" />
	<script type="text/javascript" src="<%=basePath%>js/jquery-1.6.min.js"></script>
	<script type="text/javascript">
	function getknowList() {	
		    if($("#cno").val() != "nullSelect"){
	    $.getJSON("<%=basePath%>GetKnowByCnoSvl",{cno:$("#cno").val()}, function callback(data) {     	
	         $("#kno").empty();
	         $(data).each( function(i){           
	           $("<option value=" + data[i].kno + ">" + data[i].kname +"</option>").appendTo("#kno");
	            	 }); 

	     });    
    }else{
     	$("#kno").empty();
     	$("<option>--请选择--</option>").appendTo("#kno");
    }  
 } 
	</script>

  </head>
  
  <body>
    <h1 id="head">添加题目</h1>
		
		<ul id="navigation" style="height: 20px;">
			<li></li>
			<li><font size="1px"><a href="<%=basePath%>index.jsp" style="float: right; !important" >返回首页</a></font></li>
		
		</ul>
			<form action="<%=basePath%>QuestionAddSvl?operate=choosetype" method="post"><div style="position: absolute;top: 50%;left: 50%;-ms-transform: translate(-50%,-50%);-moz-transform: translate(-50%,-50%);-o-transform: translate(-50%,-50%);transform: translate(-50%,-50%);"">
			<table align="center" > 
				<tr style="text-align: center; ">
					<td  style="width: 80px;text-align: center;">课程名称</td>
					<td>
					<select name ="cno" id="cno" onchange="getknowList();">
						<option value="nullSelect">
								--请选择--
						</option>
					<c:forEach var="course" items="${courses}">
						<option value="${course.cno}">${course.cname}</option>
					</c:forEach>
					</select>
					</td>
					
				</tr>
				<tr style="text-align: center;">
					<td style="width: 80px; text-align: center;">知识点</td>
										<td>
					<select name ="kno" id="kno">					
							<option>
								--请选择--
							</option>					
					</select>
					</td>
				</tr>
				<tr style="text-align: center;">
				<td style="width: 80px; text-align: center;">题目类型</td>
					<td colspan="2" align="center" style="width: 80px;text-align: center;" >
						<select name ="qtype">	
							<option value="nullSelect">
								--请选择--
							</option>				
							<option value="1">选择</option>
							<option value="2">填空</option>	
							<option value="3">简答</option>	
							<option value="4">判断</option>	
							<option value="5">编程</option>						
						</select>
					</td>
				</tr>
				<tr>
				<td align="center" style="width: 80px; text-align: center;" colspan="2">
					<input type="submit" value="确定" align="middle"/>
				</td>
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
