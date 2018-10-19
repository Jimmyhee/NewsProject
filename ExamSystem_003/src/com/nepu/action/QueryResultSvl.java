package com.nepu.action;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.nepu.biz.TeacherBiz;
import com.nepu.entity.StuResult;
import com.nepu.entity.TurnPage;
import com.nepu.util.Log;

@WebServlet("/QueryResultSvl")
public class QueryResultSvl extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
   
    public QueryResultSvl() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String operate = request.getParameter("operate");
		
		if(operate.equals("queryallSturesult")){
			this.doqueryAllStuResult(request,response);
		}
	}

	/**
	 * Show all Papers answered by student
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	public void doqueryAllStuResult(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String said = request.getParameter("said");
		String pno = request.getParameter("pno");
		String pg = request.getParameter("page");
		
		TeacherBiz tbiz = new TeacherBiz();
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
			List<StuResult> stuResults = tbiz.QueryAllStuResult(pno,said,tp);
			
			if(stuResults!=null&&stuResults.size()>0){
				request.setAttribute("stuResults",stuResults);
				request.setAttribute("tp", tp);
				request.setAttribute("said", said);
				request.setAttribute("pno",pno);
				request.getRequestDispatcher("/teacher/QueryAllStuResult.jsp").forward(request, response);
			}else{
				request.setAttribute("msg", "You have not taught any courses yet");
				request.getRequestDispatcher("/teacher/QueryAllStuResult.jsp").forward(request, response);
			}		
		} catch (Exception e) {
			Log.logger.error(e.getMessage(),e);
			request.setAttribute("msg", "Network error Please call admin!");
			request.getRequestDispatcher("/error.jsp").forward(request, response);
		}
	
	
	}
	
}
