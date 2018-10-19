package com.nepu.action;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.nepu.biz.QuestionBiz;
import com.nepu.entity.Choice;
import com.nepu.entity.Question;
import com.nepu.util.Log;

/**
 * Servlet implementation class QuestionUpdateSvl
 */
@WebServlet("/QuestionUpdateSvl")
public class QuestionUpdateSvl extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public QuestionUpdateSvl() {
        super();
        // TODO Auto-generated constructor stub
    }

	
	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String operate = request.getParameter("operate");
		
		if(operate.equals("getupdinfo")){
			this.doUpdInfo(request, response);
		}
		if(operate.equals("updchoice")){
			this.doUpdChoiceques(request, response);
		}
		if(operate.equals("updother")){
			this.doUpdOtherques(request, response);
		}
	}
	
	/**
	 * update question Info  by qno
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	protected void doUpdInfo(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String qtype = request.getParameter("qtype");
		String qno = request.getParameter("qno");
		QuestionBiz biz = new QuestionBiz();
		
		if(qtype.equals("1")){
			try {
				Question question = biz.queryQuesByqno(qno);
				List<Choice> choices= biz.queryChoiceByqno(qno);
				
				request.setAttribute("question", question);
				request.setAttribute("choices", choices);
				request.getRequestDispatcher("question/updateinfo.jsp").forward(request, response);
			} catch (Exception e) {
				Log.logger.error(e.getMessage(),e);
				request.setAttribute("msg", "Network error Please call admin!");
				request.getRequestDispatcher("/error.jsp").forward(request, response);
			}
		}else{
			try {
				Question question = biz.queryQuesByqno(qno);
				
				request.setAttribute("question", question);
				request.getRequestDispatcher("question/otherupdateinfo.jsp").forward(request, response);
			} catch (Exception e) {
				Log.logger.error(e.getMessage(),e);
				request.setAttribute("msg", "Network error Please call admin!");
				request.getRequestDispatcher("/error.jsp").forward(request, response);
			}
		}
			
	}
	
	/**
	 * update choose questions'  choicesInfo
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	protected void doUpdChoiceques(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		
		String qno =request.getParameter("qno");
		String qname=request.getParameter("qname");
		String qanswer=request.getParameter("qanswer");
		String qexplain=request.getParameter("qexplain");
		String []oids=request.getParameterValues("oid");
		String []onames=request.getParameterValues("choice");
		
		QuestionBiz biz = new QuestionBiz();
		Question question =new Question();
		
		question.setQno(qno);
		question.setQname(qname);
		question.setQanswer(qanswer);
		question.setQexplain(qexplain);
		try {
			biz.updateChQues(question, oids,onames);
			request.setAttribute("msg", "Update success");
			request.getRequestDispatcher("/QuestionDisplaySvl?qtype=&qname=").forward(request, response);
		} catch (Exception e) {
			Log.logger.error(e.getMessage(),e);
			request.setAttribute("msg", "Network error Please call admin!");
			request.getRequestDispatcher("/error.jsp").forward(request, response);
		}

	}
	
	/**
	 * update other question
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	protected void doUpdOtherques(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		
		String qno =request.getParameter("qno");
		String qname=request.getParameter("qname");
		String qanswer=request.getParameter("qanswer");
		String qexplain=request.getParameter("qexplain");
		
		QuestionBiz biz = new QuestionBiz();
		Question question =new Question();
		
		question.setQno(qno);
		question.setQname(qname);
		question.setQanswer(qanswer);
		question.setQexplain(qexplain);
		try {
			biz.updateOtherQues(question);
			request.setAttribute("msg", "Update success");
			request.getRequestDispatcher("/QuestionDisplaySvl?qtype=&qname=").forward(request, response);
		} catch (Exception e) {
			Log.logger.error(e.getMessage(),e);
			request.setAttribute("msg", "Network error Please call admin!");
			request.getRequestDispatcher("/error.jsp").forward(request, response);
		}
	}

}
