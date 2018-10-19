package com.nepu.action;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.nepu.biz.PaperBiz;
import com.nepu.entity.Choice;
import com.nepu.entity.Question;
import com.nepu.entity.User;
import com.nepu.util.Log;

/**
 * Servlet implementation class PaperSvl
 */
@WebServlet("/PaperSvl")
public class PaperSvl extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public PaperSvl() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String operate = request.getParameter("operate");
		
		if(operate.equals("showAllques")){
			this.doShowallQues(request,response);
		}else if(operate.equals("deleteques")){
			this.doDeletePaper(request,response);
		}else if(operate.equals("showPaperques")){
			this.doShowpaperQues(request,response);
		}
	}

	/**
	 * show all questions by qno
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	protected void doShowallQues(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String pno =request.getParameter("pno");
		PaperBiz pbiz = new PaperBiz();
		
		try {
			List<Question> questions = pbiz.getAllQuestion(pno);
			
			if(questions.size()>0){
				request.setAttribute("questions", questions);
				request.getRequestDispatcher("/papers/AllQuestions.jsp").forward(request, response);
			}else {
				request.setAttribute("msg", "the paper was no question please add !");
				request.setAttribute("pno",pno);
				request.getRequestDispatcher("/QuesQuerySvl?operate=queryaddqueTopaper").forward(request, response);
			}
		} catch (Exception e) {
			Log.logger.error(e.getMessage(),e);
			request.setAttribute("msg", "Network error Please call admin!");
			request.getRequestDispatcher("/error.jsp").forward(request, response);
		}
	}
	/**
	 * delete Paper and other data by pno
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	protected void doDeletePaper(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String pno =request.getParameter("pno");
		PaperBiz pbiz = new PaperBiz();
		
		try {
			pbiz.deletePaper(pno);
			request.setAttribute("msg", "delete success !");
			request.getRequestDispatcher("/PaperQuerySvl?operate=queryallpaper&&ptitle=&&pno=").forward(request, response);
		} catch (Exception e) {
			Log.logger.error(e.getMessage(),e);
			request.setAttribute("msg", "Network error Please call admin!");
			request.getRequestDispatcher("/error.jsp").forward(request, response);
		}
	}
	/**
	 * get All questions for student 
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	protected void doShowpaperQues(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String pno =request.getParameter("pno");
		String ptitle =request.getParameter("ptitle");
		
		PaperBiz pbiz = new PaperBiz();
		User user = (User)request.getSession().getAttribute("user");
		
		try {
			List<Question> questions = pbiz.getAllQuestion(pno);
			List<Choice> choices =pbiz.getAllChoices(pno);
			
			if(questions.size()>0){
				request.setAttribute("questions", questions);
				request.setAttribute("choices", choices);
				request.setAttribute("user", user);
				request.setAttribute("pno", pno);
				request.setAttribute("ptitle", ptitle);
				request.getRequestDispatcher("/papers/exam.jsp").forward(request, response);
			}else {
				request.setAttribute("msg", "the paper was no question please call teacher to add !");
				request.getRequestDispatcher("/papers/exam.jsp").forward(request, response);
			}
		} catch (Exception e) {
			Log.logger.error(e.getMessage(),e);
			request.setAttribute("msg", "Network error Please call admin!");
			request.getRequestDispatcher("/error.jsp").forward(request, response);
		}	
	}
}



