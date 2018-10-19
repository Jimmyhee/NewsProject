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

<title> query all question page </title>

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
		window.location.href="<%=basePath%>ManagerSvl?operate=delAllStudent&valAll="+valAll;
	}
	
	</script>
	<style>a{text-decoration:none}</style>
</head>

<body>
	<form action="<%=basePath%>QuesQuerySvl?operate=queryaddqueTopaper" method="post">

	<h1 id="head">查看试题</h1>

	<ul id="navigation">		
		<li><a href="" onclick="delAll();return false">批量添加</a></li>
	</ul>
	<div><span>正在为 <tr><td>${pno}</td></tr>试卷添加试题</span></div>
	<div id="content" class="container_16 clearfix">
		<div class="grid_4">
			<p>
				<label>题目编号<small>根据学号查询</small></label> <input type="text" name="qno" value="${qno}"/>
			</p>
		</div>
		<div class="grid_5">
			<p>
				<label>试题内容<small>根据试题内容查询</small></label> <input type="text" name="qname" value="${qname}"/>
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
						<th>题目编号</th>
						<th>题目内容</th>
						<th>题型</th>
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
						<a href="<%=basePath%>QuesQuerySvl?operate=queryaddqueTopaper&&page=1&qno=${qno}&qname=${qname}" class="curved">首页</a>
						<a href="<%=basePath%>QuesQuerySvl?operate=queryaddqueTopaper&&page=${tp.page-1}&qno=${qno}&qname=${qname}" class="curved">上一页</a>
						<a href="<%=basePath%>QuesQuerySvl?operate=queryaddqueTopaper&&page=${tp.page+1}&qno=${qno}&qname=${qname}" class="curved">下一页</a>
						<a href="<%=basePath%>QuesQuerySvl?operate=queryaddqueTopaper&&page=${tp.allPages}&qno=${qno}&qname=${qname}" class="curved">尾页</a>
						</td>
					</tr>
				</tfoot>
				<tbody>
				<c:forEach var="question" items="${questions}">
					<tr>
						<td>${question.qno}</td>
						<td>${question.qname}</td>
						<td>${question.qtype}</td>
						<td style="text-align:center"><a href="<%=basePath%>TeacherSvl?operate=addquestionToPaper&&qno=${question.qno}&&pno=${pno}" class="edit">add</a></td>
						
						<td colspan="2" style="text-align:center"><input type="checkbox" name="boxname" onclick="cancle()" value="${question.qno}" style="display:inline-block;width:15px;height:15px;"></td>
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
