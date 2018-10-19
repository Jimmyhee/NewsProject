package com.nepu.action;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.nepu.biz.CourseBiz;
import com.nepu.biz.KnowledgeBiz;
import com.nepu.entity.Course;
import com.nepu.entity.User;
import com.nepu.util.Log;

/**
 * Servlet implementation class KnowledgeSvl
 */
@WebServlet("/KnowledgeSvl")
public class KnowledgeSvl extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public KnowledgeSvl() {
		super();
		// TODO Auto-generated constructor stub
	}

	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String operate = request.getParameter("operate");

		if (operate.equals("inadd")) {
			this.doinAdd(request, response);
		}
		if (operate.equals("delAllKnow")) {
			this.doDeleteAllKnow(request, response);
		}
	}
	/**
	 * Get all courses
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	protected void doinAdd(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		User user = (User) request.getSession().getAttribute("user");
		String uno = user.getUno();
		
		CourseBiz cbiz = new CourseBiz();
				
		try {
			List<Course> courses = cbiz.getAllCourses(uno);
			
			if (courses.size() == 0) {
				request.setAttribute("msg", "��û����Ӧ�Ŀγ̣�����ϵ����Ա�����ؿγ�");
				request.setAttribute("flag", 0);
				request.getRequestDispatcher("/knowledge/addknowledge.jsp").forward(request, response);
			} else {
				request.setAttribute("flag", 1);
				request.setAttribute("courses", courses);
				request.getRequestDispatcher("/knowledge/addknowledge.jsp").forward(request, response);
			}

		} catch (Exception e) {
			Log.logger.error(e.getMessage(),e);
			request.setAttribute("msg", "Network error Please call admin!");
			request.getRequestDispatcher("/error.jsp").forward(request, response);
		}
	}
	
	/**
	 * delete all knowledge point
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	protected void doDeleteAllKnow(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String valAll=request.getParameter("valAll");  	
    	String[] knos=valAll.split("@");
    	
    	KnowledgeBiz biz = new KnowledgeBiz();
    	
    	try {
        	for (String kno : knos) {
    			biz.deleteKnow(kno);
    		}
        	request.getRequestDispatcher("/KnowQuerySvl?operate=queryknowledge").forward(request, response);
		} catch (Exception e) {
			Log.logger.error(e.getMessage(),e);
			request.setAttribute("msg", "Network error Please call admin!");
			request.getRequestDispatcher("/error.jsp").forward(request, response);
		}
	}

}
