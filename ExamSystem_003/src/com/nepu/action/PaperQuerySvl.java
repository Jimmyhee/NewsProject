package com.nepu.action;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.nepu.biz.PaperBiz;
import com.nepu.entity.Paper;
import com.nepu.entity.TurnPage;
import com.nepu.util.Log;

/**
 * Servlet implementation class PaperQuerySvl
 */
@WebServlet("/PaperQuerySvl")
public class PaperQuerySvl extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public PaperQuerySvl() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String operate = request.getParameter("operate");
		
		if(operate.equals("queryallpaper")){
			this.doGetAllPaper(request,response);
		}else if(operate.equals("querystudentpaper")){
			this.doQueryPaper(request,response);
		}
	}

	/**
	 * getAll Papers 
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	protected void doGetAllPaper(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		String pno = request.getParameter("pno");
		String ptitle = request.getParameter("ptitle");		
		String pg = request.getParameter("page");
		
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
			List<Paper> papers = pbiz.QuerybyPon(ptitle,pno,tp);
			
			if(papers!=null&&papers.size()>0){
				request.setAttribute("papers",papers);
				request.setAttribute("tp", tp);
				request.setAttribute("pno", pno);
				request.setAttribute("ptitle",ptitle);
				request.getRequestDispatcher("papers/queryPaper.jsp").forward(request, response);
			}else{
				request.setAttribute("msg", "You have no any papers");
				request.getRequestDispatcher("papers/queryPaper.jsp").forward(request, response);
			}		
		} catch (Exception e) {
			Log.logger.error(e.getMessage(),e);
			request.setAttribute("msg", "Network error Please call admin!");
			request.getRequestDispatcher("/error.jsp").forward(request, response);
		}
	
	}
	
	/**
	 * show allpapers to student
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	protected void doQueryPaper(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String pno = request.getParameter("pno");
		String ptitle = request.getParameter("ptitle");
		String pg = request.getParameter("page");
		
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
			List<Paper> papers = pbiz.QuerybyPon(ptitle,pno,tp);
			
			if(papers!=null&&papers.size()>0){
				request.setAttribute("papers",papers);
				request.setAttribute("tp", tp);
				request.setAttribute("pno", pno);
				request.setAttribute("ptitle",ptitle);
				request.getRequestDispatcher("student/studentqueryPaper.jsp").forward(request, response);
			}else{
				request.setAttribute("msg", "there were no papers Please call Teacher to add!");
				request.getRequestDispatcher("papers/queryPaper.jsp").forward(request, response);
			}		
		} catch (Exception e) {
			Log.logger.error(e.getMessage(),e);
			request.setAttribute("msg", "Network error Please call admin!");
			request.getRequestDispatcher("/error.jsp").forward(request, response);
		}
	}
	
	

}
