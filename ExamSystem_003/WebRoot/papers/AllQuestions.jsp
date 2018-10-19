<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>AllQuestions  page</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<link href="<%=basePath%>css/main.css" rel="stylesheet" type="text/css" />
	<link href="<%=basePath%>css/iconfont.css" rel="stylesheet" type="text/css" />
	<link href="<%=basePath%>css/test.css" rel="stylesheet" type="text/css" />

  </head>
  
  <body>
    <div class="main">
	<!--nr start-->
	<div class="test_main">
		<div class="nr_left">
			<div class="test">
				<form action="" method="post">
					<div class="test_title">
						
					</div>
					
						<div class="test_content">
							<div class="test_content_title">
								<h2>考试试题</h2>
								<p>
									<span>共</span><i class="content_lit">${fn:length(questions)}</i><span>题，</span><span>合计</span><i class="content_fs">60</i><span>分</span>
								</p>
							</div>
						</div>
						<c:forEach var="question" items="${questions}">
						<div class="test_content_nr">
							<ul>
								
									<li >
										<div class="test_content_nr_tt">
											<font>${question.qname}</font>
										</div>

									</li>
								
												
							</ul>
	
						</div>
						</c:forEach>
				</form>
			</div>
			</div>
		<!--< div class="nr_right">
			<div class="nr_rt_main">
				<div class="rt_nr1">
					<div class="rt_nr1_title">
						<h1>
							<i class="icon iconfont">&#xe692;</i>答题卡
						</h1>
						<p class="test_time">
							<i class="icon iconfont">&#xe6fb;</i><b class="alt-1">01:40</b>
						</p>
					</div>
					
						<div class="rt_content">
							<div class="rt_content_tt">
								<h2>单选题</h2>
								<p>
									<span>共</span><i class="content_lit">60</i><span>题</span>
								</p>
							</div>
							<div class="rt_content_nr answerSheet">
								<ul>
									
										<li><a href="#qu_0_0">1</a></li>
									
										<li><a href="#qu_0_1">2</a></li>
									
										<li><a href="#qu_0_2">3</a></li>
									
										<li><a href="#qu_0_3">4</a></li>
									
										<li><a href="#qu_0_4">5</a></li>
									
										<li><a href="#qu_0_5">6</a></li>
									
								</ul>
							</div>
						</div>
					
						<div class="rt_content">
							<div class="rt_content_tt">
								<h2>多选题</h2>
								<p>
									<span>共</span><i class="content_lit">30</i><span>题</span>
								</p>
							</div>
							<div class="rt_content_nr answerSheet">
								<ul>
									
										<li><a href="#qu_1_0">1</a></li>
									
										<li><a href="#qu_1_1">2</a></li>
									
										<li><a href="#qu_1_2">3</a></li>
									
										<li><a href="#qu_1_3">4</a></li>
									
										<li><a href="#qu_1_4">5</a></li>
									
										<li><a href="#qu_1_5">6</a></li>
																	
								</ul>
							</div>
						</div>
							<div class="rt_content">
							<div class="rt_content_tt">
								<h2>填空</h2>
								<p>
									<span>共</span><i class="content_lit">30</i><span>题</span>
								</p>
							</div>
							<div class="rt_content_nr answerSheet">
								<ul>
									
										<li><a href="#qu_1_0">1</a></li>
									
										<li><a href="#qu_1_1">2</a></li>
									
										<li><a href="#qu_1_2">3</a></li>
									
										<li><a href="#qu_1_3">4</a></li>
									
										<li><a href="#qu_1_4">5</a></li>
									
										<li><a href="#qu_1_5">6</a></li>
																	
								</ul>
							</div>
						</div>
							<div class="rt_content">
							<div class="rt_content_tt">
								<h2>多选题</h2>
								<p>
									<span>共</span><i class="content_lit">30</i><span>题</span>
								</p>
							</div>
							<div class="rt_content_nr answerSheet">
								<ul>
									
										<li><a href="#qu_1_0">1</a></li>
									
										<li><a href="#qu_1_1">2</a></li>
									
										<li><a href="#qu_1_2">3</a></li>
									
										<li><a href="#qu_1_3">4</a></li>
									
										<li><a href="#qu_1_4">5</a></li>
									
										<li><a href="#qu_1_5">6</a></li>
																	
								</ul>
							</div>
						</div>
							<div class="rt_content">
							<div class="rt_content_tt">
								<h2>多选题</h2>
								<p>
									<span>共</span><i class="content_lit">30</i><span>题</span>
								</p>
							</div>
							<div class="rt_content_nr answerSheet">
								<ul>
									
										<li><a href="#qu_1_0">1</a></li>
									
										<li><a href="#qu_1_1">2</a></li>
									
										<li><a href="#qu_1_2">3</a></li>
									
										<li><a href="#qu_1_3">4</a></li>
									
										<li><a href="#qu_1_4">5</a></li>
									
										<li><a href="#qu_1_5">6</a></li>
																	
								</ul>
							</div>
						</div>
							<div class="rt_content">
							<div class="rt_content_tt">
								<h2>多选题</h2>
								<p>
									<span>共</span><i class="content_lit">30</i><span>题</span>
								</p>
							</div>
							<div class="rt_content_nr answerSheet">
								<ul>
									
										<li><a href="#qu_1_0">1</a></li>
									
										<li><a href="#qu_1_1">2</a></li>
									
										<li><a href="#qu_1_2">3</a></li>
									
										<li><a href="#qu_1_3">4</a></li>
									
										<li><a href="#qu_1_4">5</a></li>
									
										<li><a href="#qu_1_5">6</a></li>
																	
								</ul>
							</div>
						</div>
							<div class="rt_content">
							<div class="rt_content_tt">
								<h2>多选题</h2>
								<p>
									<span>共</span><i class="content_lit">30</i><span>题</span>
								</p>
							</div>
							<div class="rt_content_nr answerSheet">
								<ul>
									
										<li><a href="#qu_1_0">1</a></li>
									
										<li><a href="#qu_1_1">2</a></li>
									
										<li><a href="#qu_1_2">3</a></li>
									
										<li><a href="#qu_1_3">4</a></li>
									
										<li><a href="#qu_1_4">5</a></li>
									
										<li><a href="#qu_1_5">6</a></li>
																	
								</ul>
							</div>
						</div>
						<div class="rt_content">
							<div class="rt_content_tt">
								<h2>多选题</h2>
								<p>
									<span>共</span><i class="content_lit">30</i><span>题</span>
								</p>
							</div>
							<div class="rt_content_nr answerSheet">
								<ul>
									
										<li><a href="#qu_1_0">1</a></li>
									
										<li><a href="#qu_1_1">2</a></li>
									
										<li><a href="#qu_1_2">3</a></li>
									
										<li><a href="#qu_1_3">4</a></li>
									
										<li><a href="#qu_1_4">5</a></li>
									
										<li><a href="#qu_1_5">6</a></li>
																	
								</ul>
							</div>
						</div>
							<div class="rt_content">
							<div class="rt_content_tt">
								<h2>多选题</h2>
								<p>
									<span>共</span><i class="content_lit">30</i><span>题</span>
								</p>
							</div>
							<div class="rt_content_nr answerSheet">
								<ul>
									
										<li><a href="#qu_1_0">1</a></li>
									
										<li><a href="#qu_1_1">2</a></li>
									
										<li><a href="#qu_1_2">3</a></li>
									
										<li><a href="#qu_1_3">4</a></li>
									
										<li><a href="#qu_1_4">5</a></li>
									
										<li><a href="#qu_1_5">6</a></li>
																	
								</ul>
							</div>
						</div>
				</div>

			</div>
		</div>
	</div>
	nr end
	<div class="foot"></div>
</div>
 -->
<script src="js/jquery-1.11.3.min.js"></script>
<script src="js/jquery.easy-pie-chart.js"></script>
<!--时间js-->
<script src="js/jquery.countdown.js"></script>
<script>
	window.jQuery(function($) {
		"use strict";
		
		$('time').countDown({
			with_separators : false
		});
		$('.alt-1').countDown({
			css_class : 'countdown-alt-1'
		});
		$('.alt-2').countDown({
			css_class : 'countdown-alt-2'
		});
		
	});
	
	
	$(function() {
		$('li.option label').click(function() {
		debugger;
			var examId = $(this).closest('.test_content_nr_main').closest('li').attr('id'); // 得到题目ID
			var cardLi = $('a[href=#' + examId + ']'); // 根据题目ID找到对应答题卡
			// 设置已答题
			if(!cardLi.hasClass('hasBeenAnswer')){
				cardLi.addClass('hasBeenAnswer');
			}
			
		});
	});
</script>
  </body>
</html>
