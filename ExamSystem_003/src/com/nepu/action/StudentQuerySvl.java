package com.nepu.action;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.nepu.biz.StudentBiz;
import com.nepu.entity.Student;
import com.nepu.entity.TurnPage;
import com.nepu.util.Log;
@WebServlet("/StudentQuerySvl")
public class StudentQuerySvl extends HttpServlet {

	private static final long serialVersionUID = 1L;

	
	public void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String operate = request.getParameter("operate");
		
		 if(operate.equals("querystudent")){
			this.doQueryStudent(request, response);
		}
	
	}

	
	/**
	 * show all students
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	public void doQueryStudent(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		String uno = request.getParameter("uno");
		String sname = request.getParameter("sname");
		String pg = request.getParameter("page");
		
		StudentBiz sbiz = new StudentBiz();
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
			List<Student> students = sbiz.QuerybyCon(uno, sname, tp);
			
			if (students != null && students.size() > 0) {
				request.setAttribute("tp", tp);
				request.setAttribute("uno", uno);
				request.setAttribute("sname",sname);
				request.getSession().setAttribute("students", students);
				request.getRequestDispatcher("manager/Manager_studentquery.jsp").forward(request, response);
			} else {
				request.setAttribute("msg", "No data !");
				request.getSession().setAttribute("students", null);
				request.getRequestDispatcher("manager/Manager_studentquery.jsp").forward(request, response);
			}
		} catch (Exception e) {
			Log.logger.error(e.getMessage(),e);
			request.setAttribute("msg", "Network error Please call admin!");
			request.getRequestDispatcher("/error.jsp").forward(request, response);
		}
	
	}

}
