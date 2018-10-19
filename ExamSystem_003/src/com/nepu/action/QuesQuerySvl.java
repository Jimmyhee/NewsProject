package com.nepu.action;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.nepu.biz.PaperBiz;
import com.nepu.entity.Question;
import com.nepu.entity.TurnPage;
import com.nepu.util.Log;

/**
 * Servlet implementation class QuesQuerySvl
 */
@WebServlet("/QuesQuerySvl")
public class QuesQuerySvl extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public QuesQuerySvl() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String operate= request.getParameter("operate");
		
		if(operate.equals("queryaddqueTopaper")){
			this.doQueryQuestion(request,response);
		}
	}

	/**
	 *show all exam question
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	protected void doQueryQuestion(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String qno = request.getParameter("qno");
		String qname = request.getParameter("qname");
		String pg = request.getParameter("page");
		String pno = request.getParameter("pno");
		
		PaperBiz pbiz = new PaperBiz();
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
			List<Question> questions = pbiz.QuerybyKon(qno,qname, tp);
			
			if (questions != null && questions.size() > 0) {
				request.setAttribute("tp", tp);
				request.setAttribute("qno", qno);
				request.setAttribute("qname",qname);
				request.setAttribute("pno", pno);
				request.getSession().setAttribute("questions", questions);
				request.getRequestDispatcher("question/displayQuestion.jsp").forward(request, response);
			} else {
				request.setAttribute("msg", "no data!");
				request.getSession().setAttribute("students", null);
				request.getRequestDispatcher("question/displayQuestion.jsp").forward(request, response);
			}
		} catch (Exception e) {
			Log.logger.error(e.getMessage(),e);
			request.setAttribute("msg", "Network error Please call admin!");
			request.getRequestDispatcher("/error.jsp").forward(request, response);
		}
	
	
	}

}
