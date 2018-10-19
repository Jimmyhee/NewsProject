package com.nepu.action;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.nepu.biz.KnowledgeBiz;
import com.nepu.biz.PaperBiz;
import com.nepu.biz.TeacherBiz;
import com.nepu.entity.Knowledge;
import com.nepu.entity.Question;
import com.nepu.entity.StuAnswer;
import com.nepu.entity.Teacher;
import com.nepu.util.Log;
@WebServlet("/TeacherSvl")
public class TeacherSvl extends HttpServlet {

	private static final long serialVersionUID = 1L;
	/**
		 * The doGet method of the servlet. <br>
		 *
		 * This method is called when a form has its tag value method equals to get.
		 * 
		 * @param request the request send by the client to the server
		 * @param response the response send by the server to the client
		 * @throws ServletException if an error occurred
		 * @throws IOException if an error occurred
		 */
	public void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String operate =request.getParameter("operate");
		
		if(operate.equals("queryteacherByUno")){
			this.doQueryTeacherByuno(request,response);
		}else if(operate.equals("updateTeacherInfo")){
			this.doUpdateTeacherInfo(request,response);
		}else if(operate.equals("addknow")){
			this.doAddKnow(request,response);
		}else if(operate.equals("queryknowByKno")){
			this.doQueryKnowByKno(request, response);
		}else if(operate.equals("deleteknow")){
			this.doDeleteKnow(request,response);
		}else if(operate.equals("updateknow")){
			this.doUpdateknowledge(request, response);
		}else if(operate.equals("addpaper")){
			this.doAddPaper(request,response);
		}else if(operate.equals("addquestionToPaper")){
			this.doAddQuestionToPaper(request,response);
		}else if(operate.equals("showAllstuAnswers")){
			this.doShowAllstuAnswer(request,response);
		}else if(operate.equals("checkStuPaper")){
			this.doCheckStuPaper(request,response);
		}else if(operate.equals("lookPaper")){
			this.doLookPaper(request,response);
		}
		
	}
	/**
	 * query teacher by uno 
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	public void doQueryTeacherByuno(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String uno = request.getParameter("uno");
		Teacher teacher = null;
		
		TeacherBiz tbiz = new TeacherBiz();
		
		try {
			teacher = tbiz.getTeacherByUno(uno);
			request.setAttribute("teacher", teacher);
			request.getRequestDispatcher("/teacher/Teacher_UpdateInfo.jsp").forward(request, response);
		} catch (Exception e) {
			Log.logger.error(e.getMessage(),e);
			request.setAttribute("msg","Network error Please call admin!");
			request.getRequestDispatcher("/error.jsp").forward(request, response);
		}
	}
	/**
	 * update teacherInfo
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	public void doUpdateTeacherInfo(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	
		String uno = request.getParameter("uno");
		String tname  = request.getParameter("tname");
		String tphone = request.getParameter("tphone");
		
		TeacherBiz tbiz = new TeacherBiz();
		
		try{
			tbiz.updateTeacher(uno,tname,tphone);	
			request.setAttribute("msg", "Update success ! Reloin visible");
			request.getRequestDispatcher("teacher/Teacher_UpdateInfo.jsp").forward(request, response);
		}catch (Exception e) {
			Log.logger.error(e.getMessage(),e);
			request.setAttribute("msg", "Network error Please call admin!");
			request.getRequestDispatcher("/error.jsp").forward(request, response);
		}
		}	
	/**
	 * add know 
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	public void doAddKnow(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String cno = request.getParameter("cno");
		String kname =request.getParameter("kname");
		
		KnowledgeBiz kbiz = new KnowledgeBiz();	
		
		try {
			kbiz.addknow(cno,kname);
			request.setAttribute("msg", "add success please go ahead!");
			request.getRequestDispatcher("/KnowledgeSvl?operate=inadd").forward(request, response);
		} catch (Exception e) {
			Log.logger.error(e.getMessage(),e);
			request.setAttribute("msg", "Network error Please call admin!");
			request.getRequestDispatcher("/error.jsp").forward(request, response);
		}
	}
	/**
	 * query know by kno 
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	public void doQueryKnowByKno(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String kno = request.getParameter("kno");
		KnowledgeBiz kbiz = new KnowledgeBiz();
		
		try {
			Knowledge know  = kbiz.getKnowBykno(kno);
			
			request.setAttribute("know", know);
			request.getRequestDispatcher("/knowledge/updateknowledge.jsp").forward(request, response);
		} catch (Exception e) {
			Log.logger.error(e.getMessage(),e);
			request.setAttribute("msg","Network error Please call admin!");
			request.getRequestDispatcher("/error.jsp").forward(request, response);
		}
	}
	/**
	 * delete know 
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	public void doDeleteKnow(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String kno = request.getParameter("kno");
		KnowledgeBiz kbiz = new KnowledgeBiz();
		
		try {
			kbiz.deleteKnow(kno);
			request.getRequestDispatcher("/KnowQuerySvl?operate=queryknowledge&&kname=").forward(request, response);
		} catch (Exception e) {
			Log.logger.error(e.getMessage(),e);
			request.setAttribute("msg", "Network error Please call admin!");
			request.getRequestDispatcher("/error.jsp").forward(request, response);
		}
	}
	/**
	 * update konwledge Info by kno
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	public void doUpdateknowledge(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	
		String kno  = request.getParameter("kno");
		String kname = request.getParameter("kname");
		
		KnowledgeBiz kbiz = new KnowledgeBiz();
		
		try{
			kbiz.updateKnow(kno,kname);	
			request.setAttribute("msg", "Update success");
			request.getRequestDispatcher("/KnowQuerySvl?operate=queryknowledge&&kname=&&kno=").forward(request, response);
		}catch (Exception e) {
			Log.logger.error(e.getMessage(),e);
			request.setAttribute("msg", "Network error Please call admin!");
			request.getRequestDispatcher("/error.jsp").forward(request, response);
		}
	}
	
	/**
	 * add paper 
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	public void doAddPaper(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String ptitle = request.getParameter("ptitle");
		double point = Double.parseDouble(request.getParameter("point"));
		Integer alltime =Integer.parseInt(request.getParameter("alltime")) ;
		String pno = request.getParameter("pno");
		
		PaperBiz pbiz = new PaperBiz();
		
		try {
			pbiz.addPaper(pno,ptitle,point,alltime);
			request.setAttribute("msg", "添加成功，请为试卷添加试题");
			request.getSession().setAttribute("pno", pno);
			request.getRequestDispatcher("/QuesQuerySvl?operate=queryaddqueTopaper&&qno=").forward(request, response);
		} catch (Exception e) {
			Log.logger.error(e.getMessage(),e);
			request.setAttribute("msg", "Network error Please call admin!");
			request.getRequestDispatcher("/error.jsp").forward(request, response);
		}
		
	}
	
	/**
	 * add question for paper 
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	public void doAddQuestionToPaper(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String pno = request.getParameter("pno");
		String qno = request.getParameter("qno");
		
		PaperBiz pbiz = new PaperBiz();
		
		try {
			pbiz.addQues(pno,qno);
			request.setAttribute("msg", "添加成功，请为试卷添加试题");
			request.getSession().setAttribute("pno", pno);
			request.getRequestDispatcher("/QuesQuerySvl?operate=queryaddqueTopaper&&qno=").forward(request, response);
		} catch (Exception e) {
			Log.logger.error(e.getMessage(),e);
			request.setAttribute("msg", "Network error Please call admin!");
			request.getRequestDispatcher("/error.jsp").forward(request, response);
		}
	}
	/**
	 * show all student answer
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	public void doShowAllstuAnswer(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String pno =request.getParameter("pno");
		String uno =request.getParameter("uno");
		String said = request.getParameter("said");
		
		PaperBiz pbiz = new PaperBiz();
		
		try{
			List<Question> questions = pbiz.getAllQuestion(pno);
			List<StuAnswer> stuanswers = pbiz.getStuanswer(uno,pno,questions);
			
			request.setAttribute("questions", questions);
			request.setAttribute("stuanswers", stuanswers);
			request.setAttribute("pno", pno);
			request.setAttribute("uno", uno);
			request.setAttribute("said", said);
			request.getRequestDispatcher("/teacher/teacher_checkStuAnswer.jsp").forward(request, response);
		}catch (Exception e) {
			Log.logger.error(e.getMessage(),e);
			request.setAttribute("msg", "Network error Please call admin!");
			request.getRequestDispatcher("/error.jsp").forward(request, response);
		}
		
	}
	/**
	 * teacher checked  student answer 
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	public void doCheckStuPaper(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String pno =request.getParameter("pno");
		String uno = request.getParameter("uno");
		double allpoint =Double.parseDouble(request.getParameter("allpoint"));
		String said = request.getParameter("said");
		
		TeacherBiz tbiz = new TeacherBiz();
		
		try{
			tbiz.checkStuPaper(said,pno,uno,allpoint);
			request.setAttribute("msg", "check stuPaper success please go ahead ");
			request.getRequestDispatcher("/teacher/Main3.jsp").forward(request, response);
		}catch (Exception e) {
			Log.logger.error(e.getMessage());
			request.setAttribute("msg", "Network error Please call admin!");
			request.getRequestDispatcher("/error.jsp").forward(request, response);
		}
	}
	/**
	 * student look paper Info 
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	public void doLookPaper(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String pno =request.getParameter("pno");
		String uno =request.getParameter("uno");
		String said = request.getParameter("said");
		
		PaperBiz pbiz = new PaperBiz();
		
		try{
			List<Question> questions = pbiz.getAllQuestion(pno);
			List<StuAnswer> stuanswers = pbiz.getStuanswer(uno,pno,questions);
			request.setAttribute("questions", questions);
			request.setAttribute("stuanswers", stuanswers);
			request.setAttribute("pno", pno);
			request.setAttribute("uno", uno);
			request.setAttribute("said", said);
			request.getRequestDispatcher("/student/ViewPaper.jsp").forward(request, response);
		}catch (Exception e) {
			Log.logger.error(e.getMessage());
			request.setAttribute("msg", "Network error Please call admin!");
			request.getRequestDispatcher("/error.jsp").forward(request, response);
		}
	
	}
	
}

	

	
	
	
