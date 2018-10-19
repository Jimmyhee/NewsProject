package com.nepu.action;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.nepu.biz.StudentBiz;
import com.nepu.entity.Student;
import com.nepu.util.Log;

/**
 * Servlet implementation class StudentSvl
 */
@WebServlet("/StudentSvl")
public class StudentSvl extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public StudentSvl() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String operate = request.getParameter("operate");
		
		if(operate.equals("querystudentByUno")){
			this.doQueryStudentByUno(request,response);
		}else if(operate.equals("updateStudentInfo")){
			this.doUpdateStudentInfo(request,response);
		}
	}

	/**
	 * get student by uno
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	protected void doQueryStudentByUno(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String uno = request.getParameter("uno");
		Student student = null;
		
		StudentBiz tbiz = new StudentBiz();
		
		try {
			student = tbiz.getStudentByUno(uno);
			request.setAttribute("student", student);
			request.getRequestDispatcher("/student/Student_UpdateInfo.jsp").forward(request, response);
		} catch (Exception e) {
			Log.logger.error(e.getMessage(),e);
			request.setAttribute("msg","Network error Please call admin!");
			request.getRequestDispatcher("/error.jsp").forward(request, response);
		}
	}
	/**
	 * update student Info by uno
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	protected void 	doUpdateStudentInfo(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String uno = request.getParameter("uno");
		String sname  = request.getParameter("sname");
		String sphone = request.getParameter("sphone");
		
		StudentBiz sbiz = new StudentBiz();
		
		try{
			sbiz.updateStduent(uno,sname,sphone);	
			request.setAttribute("msg", "Update success ! Relogin visible");
			request.getRequestDispatcher("student/Student_UpdateInfo.jsp").forward(request, response);
		}catch (Exception e) {
			Log.logger.error(e.getMessage(),e);
			request.setAttribute("msg", "Network error Please call admin!");
			request.getRequestDispatcher("/error.jsp").forward(request, response);
		}
	}


}
