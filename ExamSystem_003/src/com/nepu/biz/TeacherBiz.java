package  com.nepu.biz;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nepu.dao.CouteaDao;
import com.nepu.dao.TeacherDao;
import com.nepu.dao.UserDao;
import com.nepu.entity.IRole;
import com.nepu.entity.StuResult;
import com.nepu.entity.Teacher;
import com.nepu.entity.TurnPage;
import com.nepu.entity.User;
import com.nepu.util.Log;

@Service("teacherBiz")
@Transactional(readOnly = true)
public class TeacherBiz {

	private TeacherDao tdao;
	private UserDao udao;
	private CouteaDao ctdao;
	/**
	 * all teachers
	 * @return
	 * @throws Exception
	 */
	public List<Teacher> getAllTeachers() throws Exception{
		
	Log.logger.info("query all Teacher from database");
		
		return tdao.getAllTeachers();	
	}
	
	
	/**
	 * add teacher  
	 * @param uno
	 * @param tname
	 * @param tphone
	 * @throws Exception
	 */
	@Transactional(rollbackFor = Throwable.class)
	public void addTeacher(Teacher teacher) throws Exception{
		
		Log.logger.info("add teacher where uno = "+teacher.getUno());
		
		User user = new User();
		
		user.setUno(teacher.getUno());
		user.setUname(teacher.getTname());		
		user.setPwd("123456");
		user.setRole(IRole.TEACHER);
		
		udao.addUser(user);
		tdao.addTeacher(teacher);
	}


	/**
	 * delete teacher 
	 * @param uno
	 * @throws Exception
	 */
	
	public void deleteTeacher(String uno) throws Exception{
		
		Log.logger.info("delete from teacher where uno="+uno);
		
		ctdao.deleteCouage(null, null, uno);
		tdao.deleteTeacher(uno);
		udao.deleteUser(uno);
	}


	/**
	 * query teacher by uno 
	 * @param uno
	 * @return
	 * @throws Exception
	 */
	public Teacher getTeacherByUno(String uno) throws Exception{
		
		Log.logger.info("query teacher where uno="+uno);
		
		return tdao.getTeacherByUno(uno);	
	}

	/**
	 * update teacher 
	 * @param uno
	 * @param tname
	 * @param tphone
	 * @throws Exception
	 */
	@Transactional(rollbackFor =Throwable.class)
	public void updateTeacher(String uno, String tname, String tphone)  throws Exception{
		
		Log.logger.info("update teacher  where uno="+uno);
		
		tdao.updateTeacher(uno, tname, tphone);
		udao.updateUser(uno,tname);	
	}

	/**
	 * query teacher by addition 
	 * @param uno
	 * @param tname
	 * @param tp
	 * @return
	 * @throws Exception
	 */
	
	public List<Teacher> QuerybyCon(String uno, String tname, TurnPage tp) throws Exception {
		Log.logger.info("query all Teacher ");
		
		return 	tdao.QuerybyCon(uno, tname,tp);
	}

	/**
	 * query All student Result
	 * @param pno
	 * @param said
	 * @param tp
	 * @return
	 * @throws Exception
	 */
	public List<StuResult> QueryAllStuResult(String pno, String said, TurnPage tp) throws Exception{
		Log.logger.info("get All student Result where pno = "+pno +"and said ="+said);
	
		return tdao.QueryAllStuResult(pno,said,tp);
	}

	/**
	 * checked student Result
	 * @param said
	 * @param pno
	 * @param uno
	 * @param allpoint
	 * @throws Exception
	 */
	public void checkStuPaper(String said, String pno, String uno, double allpoint) throws Exception{
		
		tdao.checkStuPaper(said,pno,uno,allpoint);
	}
	

}
