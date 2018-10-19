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
    
    <title>query question  page</title>
    
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
		window.location.href="<%=basePath%>QuestionDelSvl?operate=delAllQues&valAll="+valAll;
	}
	
	
	</script>
	<script type="text/javascript"></script>
	<style>a{text-decoration:none}</style>
  </head>
  
  <body>
    <form action="<%=basePath%>QuestionDisplaySvl" method="post">

	<h1 id="head">查看题目</h1>

	<ul id="navigation">		
		<li><a href="" onclick="delAll();return false">批量删除</a></li>
	</ul>

	<div id="content" class="container_16 clearfix">
		<div class="grid_4">
			<p>
				<label>题目<small>根据题目内容查询</small></label> <input type="text" name="qname" value="${qname}"/>
			</p>
		</div>
		<div class="grid_5">
			<p>
				<label>类型<small>根据题目类型查询</small></label> 
				<select name ="qtype">	
							<option value="">
								--请选择--
							</option>			
							<option value="1">选择</option>
							<option value="2">填空</option>	
							<option value="3">简答</option>	
							<option value="4">判断</option>	
							<option value="5">编程</option>						
						</select>
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
						<th>正确答案</th>
						<th>题目解析</th>
						<th>题目类型</th>
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
						<a href="<%=basePath%>QuestionDisplaySvl?page=1&qname=${qname}&qtype=${qtype}" class="curved">首页</a>
						<a href="<%=basePath%>QuestionDisplaySvl?page=${tp.page-1}&qname=${qname}&qtype=${qtype}" class="curved">上一页</a>
						<a href="<%=basePath%>QuestionDisplaySvl?page=${tp.page+1}&qname=${qname}&qtype=${qtype}" class="curved">下一页</a>
						<a href="<%=basePath%>QuestionDisplaySvl?page=${tp.allPages}&qname=${qname}&qtype=${qtype}" class="curved">尾页</a>
						</td>
					</tr>
				</tfoot>
				<tbody>
				<c:forEach var="question" items="${questions}">
					<tr>
						<td>${question.qno}</td>
						<td>${question.qname}</td>
						<td>${question.qanswer}</td>
						<td>${question.qexplain}</td>
						<td>${question.qtype}</td>
						<td style="text-align:center"><a href="<%=basePath%>QuestionUpdateSvl?operate=getupdinfo&qno=${question.qno}&qtype=${question.qtype}" class="edit">Edit</a></td>
						<td style="text-align:center"><a href="<%=basePath%>QuestionDelSvl?operate=del&qno=${question.qno}" class="delete"  onclick="javascript:return del()">Delete</a></td>
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
