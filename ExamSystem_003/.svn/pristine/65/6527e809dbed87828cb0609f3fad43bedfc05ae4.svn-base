package com.nepu.action;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.nepu.biz.ResultBiz;
import com.nepu.dto.Resultdto;
import com.nepu.entity.TurnPage;
import com.nepu.entity.User;
import com.nepu.util.Log;

/**
 * Servlet implementation class ResultQuerySvl
 */
@WebServlet("/ResultQuerySvl")
public class ResultQuerySvl extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ResultQuerySvl() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * show all  student answers 
	 */
	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		User user = (User)request.getSession().getAttribute("user");
		String uno = user.getUno();
		String ptitle=request.getParameter("ptitle");
		String pg = request.getParameter("page");
		
		ResultBiz biz = new ResultBiz();
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
			List<Resultdto> results = biz.queryResult(uno, ptitle, tp);
			
			request.setAttribute("results", results);
			request.setAttribute("ptitle", ptitle);
			request.setAttribute("uno", uno);
			request.setAttribute("tp", tp);
			request.getRequestDispatcher("student/queryResult.jsp").forward(request, response);
		} catch (Exception e) {
			Log.logger.error(e.getMessage(),e);
			request.getRequestDispatcher("/error.jsp").forward(request, response);
		}
		
	}

}
