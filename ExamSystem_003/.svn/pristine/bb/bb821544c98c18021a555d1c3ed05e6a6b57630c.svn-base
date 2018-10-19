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
    
    <title>courseArrange  page</title>
    
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
		window.location.href="<%=basePath%>ManagerSvl?operate=delAllCoutea&valAll="+valAll;
	}
	
	</script>
	<style>a{text-decoration:none}</style>

  </head>
  
  <body>
    <form action="<%=basePath%>ManagerSvl?operate=addcoutea" method="post">

	<h1 id="head">授课安排</h1>

	<ul id="navigation">		
		<li><a href="" onclick="delAll();return false">批量删除</a></li>
	</ul>

	<div id="content" class="container_16 clearfix">
		<div class="grid_4">
			<p>
				<label>课程<small>请选择课程</small></label> 
				<select name="cno">
					<c:forEach var="course" items="${courses}">
						<option value="${course.cno}">${course.cname}</option>
					</c:forEach>
				</select>
			</p>
		</div>
		<div class="grid_5">
			<p>
				<label>教师<small>请选择教师</small></label> 
				<select name="uno">
					<c:forEach var="teacher" items="${teachers}">
						<option value="${teacher.uno}">${teacher.tname}</option>
					</c:forEach>
				</select>
			</p>
		</div>
		<div class="grid_5">
			<p>
				<label>&nbsp<small>点击确定完成授课安排</small></label>&nbsp&nbsp&nbsp<input type="submit" value="确定" />	
			</p>		
			<span>${msg}</span>		
		</div>
		<div class="grid_16">
			<table>
				<thead>
					<tr>
						<th>课程</th>
						<th colspan="2" style="text-align:center">教师</th>						
						<th  style="text-align:center">操作</th>
						<th  style="text-align:center">全选<input type="checkbox" id="all"  onclick="selectAll()" style="display:inline-block;width:15px;height:15px;"></th>
					</tr>
				</thead>
				<tfoot>
					<tr>
						<td>总记录数:${tp.allRows}</td>
						<td>总页数:${tp.allPages}</td>
						<td>当前页:${tp.page}</td>
						<td colspan="5" class="pagination">
						<a href="<%=basePath%>CourseArrangeSvl?page=1" class="curved">首页</a>
						<a href="<%=basePath%>CourseArrangeSvl?page=${tp.page-1}" class="curved">上一页</a>
						<a href="<%=basePath%>CourseArrangeSvl?page=${tp.page+1}" class="curved">下一页</a>
						<a href="<%=basePath%>CourseArrangeSvl?page=${tp.allPages}" class="curved">尾页</a>
						</td>
					</tr>
				</tfoot>
				<tbody>
				<c:forEach var="arrinfo" items="${arrinfos}">
					<tr>
						<td >${arrinfo.cname}</td>
						<td style="text-align:center" colspan="2">${arrinfo.tname}</td>
						<td style="text-align:center"><a href="<%=basePath%>ManagerSvl?operate=deletecouage&&ctid=${arrinfo.ctid}" class="delete"  onclick="javascript:return del()">Delete</a></td>
						<td colspan="2" style="text-align:center"><input type="checkbox" name="boxname" onclick="cancle()" value="${arrinfo.ctid}" style="display:inline-block;width:15px;height:15px;"></td>
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
