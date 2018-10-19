package com.nepu.action;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.nepu.biz.KnowledgeBiz;
import com.nepu.entity.Knowledge;
import com.nepu.util.Log;

import net.sf.json.JSONArray;

/**
 * Servlet implementation class GetKnowByCnoSvl
 */
@WebServlet("/GetKnowByCnoSvl")
public class GetKnowByCnoSvl extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public GetKnowByCnoSvl() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#service(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String cno = new String(request.getParameter("cno").getBytes("ISO-8859-1"),"UTF-8");
		
		KnowledgeBiz biz = new KnowledgeBiz();
		
		try {
			List<Knowledge> knows= biz.getAllknowBycno(cno);
			JSONArray jsonArray = JSONArray.fromObject(knows); 
			
			response.setCharacterEncoding("utf-8");
			response.getWriter().print(jsonArray.toString());
			
		} catch (Exception e) {
			Log.logger.error(e.getMessage(),e);
			request.setAttribute("msg","Network error Please call admin!");
			request.getRequestDispatcher("/error.jsp").forward(request, response);
		}
	}

}
