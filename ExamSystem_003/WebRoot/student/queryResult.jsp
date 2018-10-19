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
    
    <title>query Result page</title>
    
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
 	<form action="<%=basePath%>ResultQuerySvl" method="post">

	<h1 id="head">查看成绩</h1>


	<div id="content" class="container_16 clearfix">
		
		<div class="grid_5">
			<p>
				<label>试卷<small>根据试卷标题查询</small></label> <input type="text" name="ptitle" value="${ptitle}"/>
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
						<th>试卷编号</th>
						<th>试卷标题</th>
						<th>试卷分值</th>
						<th colspan="2" style="text-align:center">操作</th>
					</tr>
				</thead>
				<tfoot>
					<tr>
						<td>总记录数:${tp.allRows}</td>
						<td>总页数:${tp.allPages}</td>
						<td>当前页:${tp.page}</td>
						<td colspan="6" class="pagination">
						<a href="<%=basePath%>ResultQuerySvl?page=1&ptitle=${ptitle}" class="curved">首页</a>
						<a href="<%=basePath%>ResultQuerySvl?page=${tp.page-1}&ptitle=${ptitle}" class="curved">上一页</a>
						<a href="<%=basePath%>ResultQuerySvl?page=${tp.page+1}&ptitle=${ptitle}" class="curved">下一页</a>
						<a href="<%=basePath%>ResultQuerySvl?page=${tp.allPages}&ptitle=${ptitle}" class="curved">尾页</a>
						</td>
					</tr>
				</tfoot>
				<tbody>
				<c:forEach var="result" items="${results}">
					<tr>
						<td>${result.pno}</td>
						<td>${result.ptitle}</td>
						<td>${result.allpoint}</td>
						<td style="text-align:center"><a href="<%=basePath%>TeacherSvl?operate=lookPaper&&pno=${result.pno}&&uno=${uno}" class="edit">View</a></td>
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
