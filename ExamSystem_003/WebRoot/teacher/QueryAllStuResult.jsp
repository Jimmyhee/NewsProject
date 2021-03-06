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
    
    <title>老师查看所有学生答案</title>
    
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
		window.location.href="<%=basePath%>PapaerSvl?operate=delAllKnow&valAll="+valAll;
	}
	
	</script>

  </head>
  
  <body>
 	<form action="<%=basePath%>QueryResultSvl?operate=queryallSturesult" method="post">

	<h1 id="head">查看答题卡</h1>


	<div id="content" class="container_16 clearfix">
		
		<div class="grid_5">
			<p>
				<label>试卷编号<small>根据试卷编号查询答题卡</small></label> <input type="text" name="pno" value="${pno}"/>
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
						<th>学生编号</th>
						<th>试卷编号</th>
						<th>总分</th>
						<th>是否批改</th>
						<th colspan="2" style="text-align:center">操作</th>
					</tr>
				</thead>
				<tfoot>
					<tr>
						<td>总记录数:${tp.allRows}</td>
						<td>总页数:${tp.allPages}</td>
						<td>当前页:${tp.page}</td>
						<td colspan="6" class="pagination">
						<a href="<%=basePath%>PaperQuerySvl?operate=querystudentpaper&&page=1&pno=${pno}&ptitle=${ptitle}" class="curved">首页</a>
						<a href="<%=basePath%>PaperQuerySvl?operate=querystudentpaper&&page=${tp.page-1}&pno=${pno}&ptitle=${ptitle}" class="curved">上一页</a>
						<a href="<%=basePath%>PaperQuerySvl?operate=querystudentpaper&&page=${tp.page+1}&pno=${pno}&ptitle=${ptitle}" class="curved">下一页</a>
						<a href="<%=basePath%>PaperQuerySvl?operate=querystudentpaper&&page=${tp.allPages}&pno=${pno}&ptitle=${ptitle}" class="curved">尾页</a>
						</td>
					</tr>
				</tfoot>
				<tbody>
				<c:forEach var="stuResult" items="${stuResults}">
					<tr>
						<td>${stuResult.uno}</td>
						<td>${stuResult.pno}</td>
						<td>${stuResult.allpoint}</td>
						<td>${stuResult.ischecked}</td>
						<td style="text-align:center"><a href="<%=basePath%>TeacherSvl?operate=showAllstuAnswers&&pno=${stuResult.pno}&&uno=${stuResult.uno}&&said=${stuResult.said}" class="edit" target="_parent">Begin </a></td>
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
