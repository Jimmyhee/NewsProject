<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>choice page</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<link rel="stylesheet" href="<%=basePath%>css/960.css" type="text/css" media="screen" charset="utf-8" />
	<link rel="stylesheet" href="<%=basePath%>css/template.css" type="text/css" media="screen" charset="utf-8" />
	<link rel="stylesheet" href="<%=basePath%>css/colour.css" type="text/css" media="screen" charset="utf-8" />
 <script>
       	    function delinput(){
       	        var table= document.getElementById('table');
				var tr = table.getElementsByTagName('tr');
				var len = tr.length;
					document.getElementById('table').removeChild(tr[len-1]);
				
			    	
		    }   
    	    function newinput() {
			    var input = document.createElement('input');
			    input.setAttribute("name", "choice");
			    var tr = document.createElement('tr');
			    var td1 = document.createElement('td');
			    td1.style="text-align: center";
			    var td2 = document.createElement('td');
			    td1.innerHTML="选项";
			    td2.appendChild(input);
			    tr.appendChild(td1);
			    tr.appendChild(td2);

			    document.getElementById('table').appendChild(tr);	
		    }
		   function submitform(){
			    var inps = document.getElementsByTagName('input'),
			    len = inps.length,count = 0,arr = [];
			
			    for(var i = 0; i < len; i++){
				    if(inps[i].type == 'text'){
					    arr.push(inps[i]);
				    }	
			    }
			
			    for(var i = 0; i < arr.length; i++){
				    if(inps[i].value != ''){
					    count++;
				    }else{
					    count--;	
				    }
			    }
			
			    if(count == arr.length){
				    alert('提交')
				    document.getElementById('myform').submit();	
			    }else{
				    alert('有空值')	
			    }
		    }
    </script>

  </head>
  
  <body>
    <h1 id="head">添加选择题</h1>
		
		<ul id="navigation" style="height: 20px;">
			<li></li>
			<li><font size="1px"><a href="<%=basePath%>index.jsp" style="float: right; !important" >返回首页</a></font></li>
		
		</ul>
			<form action="<%=basePath%>QuestionAddSvl?operate=add" method="post" id="myform"><div style="position: absolute;top: 50%;left: 50%;-ms-transform: translate(-50%,-50%);-moz-transform: translate(-50%,-50%);-o-transform: translate(-50%,-50%);transform: translate(-50%,-50%);"">
			<table align="center"  id="table"> 
				<tr style="text-align: center;">
					<td style="width: 80px; text-align: center;">题号</td>
					<td><input type="text" name ="qno" readonly="readonly" value="${qno}"/></td>
				</tr>
				<tr style="text-align: center; ">
					<td  style="width: 80px;text-align: center;">题目内容</td>
					<td><textarea rows="" cols="" name="qname"></textarea></td>
				</tr>
				<tr style="text-align: center; ">
					<td  style="width: 80px;text-align: center;">正确答案</td>
					<td><input type="text" name ="qanswer"/></textarea></td>
				</tr>
				<tr style="text-align: center; ">
					<td  style="width: 80px;text-align: center;">题目解析</td>
					<td><textarea rows="" cols="" name="qexplain"></textarea></td>
				</tr>
				<tr style="text-align: center; ">
					<td  style="width: 80px;text-align: center;">选项</td>
					<td><input type="text" name ="choice"/></td>
				</tr>
				<tr style="text-align: center; ">
					<td  style="width: 80px;text-align: center;">选项</td>
					<td><input type="text" name ="choice"/></td>
				</tr>		
			</table>
			<table id="table2">
				<tr style="text-align: center;">
					<td colspan="2" align="center" style="width: 80px;text-align: center;" >
       					<input type="button" id="new" value="新增选项" onclick="newinput()"/>
      					<input type="button" id="del" value="删除选项" onclick="delinput()"/>
      				</td>					
				</tr>
				<tr style="text-align: center;">
					<td colspan="2" align="center" style="width: 80px;text-align: center;" >
					<input type="button" value="添加" align="middle" onclick="submitform()"/></td>					
				</tr>
				<tr><span>${msg}</span></tr>
			</table>
			
			</div>		
			</form>				
  </body>
</html>
