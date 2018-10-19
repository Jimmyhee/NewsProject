package com.nepu.action;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.nepu.biz.QuestionBiz;
import com.nepu.entity.Question;
import com.nepu.entity.TurnPage;
import com.nepu.util.Log;

/**
 * Servlet implementation class QuestionDisplaySvl
 */
@WebServlet("/QuestionDisplaySvl")
public class QuestionDisplaySvl extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public QuestionDisplaySvl() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * show all questions
	 */
	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String qname=request.getParameter("qname");
		String qtype=request.getParameter("qtype");
		String pg = request.getParameter("page");
		
		QuestionBiz biz = new QuestionBiz();
		TurnPage tp = new TurnPage();
		int page = 1;
		
		if (pg != null) {
			page = Integer.parseInt(pg);
			if (page < 1) {
				tp.page = 1;
			} else {
				tp.page = page;
			}
		}
		try {
			List<Question> questions = biz.QuerybyCon(qname, qtype, tp);
			
			if(questions!=null&&questions.size()>0){
				request.setAttribute("tp", tp);
				request.setAttribute("qname", qname);
				request.setAttribute("qtype",qtype);
				request.setAttribute("questions", questions);
				request.getRequestDispatcher("question/queryquestion.jsp").forward(request, response);
			}else{
				request.setAttribute("msg", "No data !");
				request.setAttribute("questions", null);
				request.getRequestDispatcher("question/queryquestion.jsp").forward(request, response);
			}			
		} catch (Exception e) {
			Log.logger.error(e.getMessage(),e);
			request.setAttribute("msg", "Network error Please call admin!");
			request.getRequestDispatcher("/error.jsp").forward(request, response);
		}
	}

}
