package com.nepu.action;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.nepu.biz.KnowledgeBiz;
import com.nepu.dto.Know;
import com.nepu.entity.TurnPage;
import com.nepu.entity.User;
import com.nepu.util.Log;

/**
 * Servlet implementation class KnowledgeSvl
 */
@WebServlet("/KnowQuerySvl")
public class KnowQuerySvl extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public KnowQuerySvl() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#service(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String operate = request.getParameter("operate");
		
		 if(operate.equals("queryknowledge")){
			this.doQueryKnowledge(request, response);
		}
	}
	
	/**
	 * Query all knowledge points and page them
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	public void doQueryKnowledge(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		String kno = request.getParameter("kno");
		String kname = request.getParameter("kname");
		String pg = request.getParameter("page");
		User user = (User)request.getSession().getAttribute("user");
		String uno=user.getUno();				
		TurnPage tp = new TurnPage();
		int page = 1;
		KnowledgeBiz biz = new KnowledgeBiz();
		
		if (pg != null) {
			page = Integer.parseInt(pg);
			if (page < 1) {
				tp.page = 1;
			} else {
				tp.page = page;
			}
		}
		try {
			List<Know> knows = biz.QuerybyCon(kname,uno,tp);
			
			if(knows!=null&&knows.size()>0){
				request.setAttribute("knows",knows);
				request.setAttribute("tp", tp);
				request.setAttribute("kno", kno);
				request.setAttribute("kname",kname);
				request.getRequestDispatcher("knowledge/queryknowledge.jsp").forward(request, response);
			}else{
				request.setAttribute("msg", "You have not taught any courses yet");
				request.getRequestDispatcher("knowledge/queryknowledge.jsp").forward(request, response);
			}		
		} catch (Exception e) {
			Log.logger.error(e.getMessage(),e);
			request.setAttribute("msg", "Network error Please call admin!");
			request.getRequestDispatcher("/error.jsp").forward(request, response);
		}
	
	}

}
