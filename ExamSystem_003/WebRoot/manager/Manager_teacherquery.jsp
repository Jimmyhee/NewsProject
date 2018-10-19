<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@page isELIgnored="false"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">

<title>query  teacher page </title>

<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">

<link rel="stylesheet" href="<%=basePath%>css/960.css" type="text/css" media="screen"
	charset="utf-8" />
<link rel="stylesheet" href="<%=basePath%>css/template.css" type="text/css"
	media="screen" charset="utf-8" />
<link rel="stylesheet" href="<%=basePath%>css/colour.css" type="text/css"
	media="screen" charset="utf-8" />
	<script type="text/javascript">
	function selectAll(){
		var all=document.getElementById("all");
		var boxes=document.getElementsByName("boxname");
		if(all.checked){
			for(var i=0;i<boxes.length;i++){
				boxes[i].checked=true;
			}
		}else{
			for(var i=0;i<boxes.length;i++){
				boxes[i].checked=false;
			}
		}		
	}
	
	function cancle(){	
		var all=document.getElementById("all");
		var boxes=document.getElementsByName("boxname");
		var count=0;
		for(var i=0;i<boxes.length;i++){
			if(boxes[i].checked==false){
				all.checked=false;
			}else{
				count++;
			}									
		}
		if(count==boxes.length){
			all.checked=true;
		}
	}
	
	function del(){
		var msg="确定删除吗？";
		if(confirm(msg)==true){
			return true;
		}else{
			return false;
		}		
	}
	
	function delAll(){
		var boxes=document.getElementsByName("boxname");
		var valAll="";
		for(var i=0;i<boxes.length;i++){
			if(boxes[i].checked){
				valAll+=boxes[i].value+"@";
			}								
		}
		window.location.href="<%=basePath%>ManagerSvl?operate=delAllTeacher&valAll="+valAll;
	}
	
	</script>
	<style>a{text-decoration:none}</style>
</head>

<body>
	<form action="<%=basePath%>TeacherQuerySvl?operate=queryteacher" method="post">

	<h1 id="head">查看老师</h1>

	<ul id="navigation">		
		<li><a href="" onclick="delAll();return false">批量删除</a></li>
	</ul>

	<div id="content" class="container_16 clearfix">
		<div class="grid_4">
			<p>
				<label>老师编号<small>老师编号查询</small></label> <input type="text" name="uno" value="${uno}"/>
			</p>
		</div>
		<div class="grid_5">
			<p>
				<label>姓名<small>根据姓名查询</small></label> <input type="text" name="tname" value="${tname}"/>
			</p>
		</div>
		<div class="grid_2">
			<p>
				<label>&nbsp;</label> <input type="submit" value="Search" />		
			</p>		
			<span>${msg}</span>		
		</div>
		<div class="grid_16">
			<table>
				<thead>
					<tr>
						<th>学号</th>
						<th>姓名</th>
						<th>联系电话</th>
						<th colspan="2" style="text-align:center">操作</th>
						<th colspan="2" style="text-align:center">全选<input type="checkbox" id="all"  onclick="selectAll()" style="display:inline-block;width:15px;height:15px;"></th>
					</tr>
				</thead>
				<tfoot>
					<tr>
						<td>总记录数:${tp.allRows}</td>
						<td>总页数:${tp.allPages}</td>
						<td>当前页:${tp.page}</td>
						<td colspan="6" class="pagination">
						<a href="<%=basePath%>TeacherQuerySvl?operate=queryteacher&&page=1&uno=${uno}&sname=${sname}" class="curved">首页</a>
						<a href="<%=basePath%>TeacherQuerySvl?operate=queryteacher&&page=${tp.page-1}&uno=${uno}&tname=${tname}" class="curved">上一页</a>
						<a href="<%=basePath%>TeacherQuerySvl?operate=queryteacher&&page=${tp.page+1}&uno=${uno}&tname=${tname}" class="curved">下一页</a>
						<a href="<%=basePath%>TeacherQuerySvl?operate=queryteacher&&page=${tp.allPages}&uno=${uno}&tname=${tname}" class="curved">尾页</a>
						</td>
					</tr>
				</tfoot>
				<tbody>
				<c:forEach var="teacher" items="${teachers}">
					<tr>
						<td>${teacher.uno}</td>
						<td>${teacher.tname}</td>
						<td>${teacher.tphone}</td>
						<td style="text-align:center"><a href="<%=basePath%>ManagerSvl?operate=queryteacherByUno&&uno=${teacher.uno}" class="edit">Edit</a></td>
						<td style="text-align:center"><a href="<%=basePath%>ManagerSvl?operate=deleteteacher&&uno=${teacher.uno}" class="delete"  onclick="javascript:return del()">Delete</a></td>
						<td colspan="2" style="text-align:center"><input type="checkbox" name="boxname" onclick="cancle()" value="${teacher.uno}" style="display:inline-block;width:15px;height:15px;"></td>
					</tr>
				</c:forEach>
				</tbody>
			</table>
		</div>
	</div>

	<div id="foot">
		<a href="#">Contact Me</a>

	</div>
</form>	
</body>
</html>
