package com.nepu.action;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.nepu.biz.CourseBiz;
import com.nepu.biz.TeacherBiz;
import com.nepu.dto.ArrangeInfo;
import com.nepu.entity.Course;
import com.nepu.entity.Teacher;
import com.nepu.entity.TurnPage;
import com.nepu.util.Log;

/**
 * Servlet implementation class CourseArrangeSsvl
 */
@WebServlet("/CourseArrangeSvl")
public class CourseArrangeSvl extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public CourseArrangeSvl() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#service(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String pg = request.getParameter("page");
		TurnPage tp = new TurnPage();
		int page = 1;
		
		CourseBiz biz = new CourseBiz();
		TeacherBiz tbiz = new TeacherBiz();
		
		if (pg != null) {
			page = Integer.parseInt(pg);
			if (page < 1) {
				tp.page = 1;
			} else {
				tp.page = page;
			}
		}		
		try {
			List<Course> courses=biz.getAllCourses();
			List<Teacher> teachers = tbiz.getAllTeachers();
			List<ArrangeInfo> arrinfos=biz.getArrInfo(tp);
			
			request.setAttribute("courses", courses);
			request.setAttribute("teachers",teachers);
			request.setAttribute("arrinfos", arrinfos);
			request.setAttribute("tp", tp);
			request.getRequestDispatcher("manager/courseArrange.jsp").forward(request, response);
			
		} catch (Exception e) {			
			Log.logger.error(e.getMessage(),e);
			request.setAttribute("msg", "Network error Please call admin!");
			request.getRequestDispatcher("/error.jsp").forward(request, response);
		}
	}

}
