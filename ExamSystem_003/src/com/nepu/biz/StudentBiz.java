package  com.nepu.biz;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nepu.dao.StudentDao;
import com.nepu.dao.UserDao;
import com.nepu.entity.IRole;
import com.nepu.entity.Student;
import com.nepu.entity.TurnPage;
import com.nepu.entity.User;
import com.nepu.util.Log;

@Service("studentBiz")
@Transactional(readOnly = true)
public class StudentBiz {
	
	private StudentDao sdao;
	private UserDao udao;
	/**
	 * query student by addition
	 * @param uno
	 * @param sname
	 * @param tp
	 * @return
	 * @throws Exception
	 */
	public List<Student> QuerybyCon(String uno, String sname, TurnPage tp) throws Exception {
		Log.logger.info("query -------------- allstudent");
		
		return sdao.QuerybyCon(uno, sname,tp);
	}
	/**
	 * add student 
	 * @throws Exception
	 */
	@Transactional(rollbackFor = Throwable.class)
	public void addStudent(Student student)throws Exception{
		
		Log.logger.info("add   student  where uno =  "+student.getUno());
		
		User user = new User();
		
		user.setUno(student.getUno());
		user.setUname(student.getSname());
		user.setPwd("123456");
		user.setRole(IRole.STUDENT);
		
		udao.addUser(user);
		sdao.addStudent(student);
	}
	/**
	 * delete student 
	 * @param uno
	 * @throws Exception
	 */
	@Transactional(rollbackFor = Throwable.class)
	public void deleteStudent(String uno) throws Exception {
		Log.logger.info("delete from teacher where uno="+uno);
			
		sdao.deleteStudent(uno);
		udao.deleteUser(uno);
	}
	
	/**
	 * query student by uno 
	 * @param uno
	 * @return
	 * @throws Exception
	 */
	public Student getStudentByUno(String uno)  throws Exception{
		
		Log.logger.info("query student where uno="+uno);
		
		return sdao.getStudentByUno(uno);	
	}
	/**
	 * update student 
	 * @param uno
	 * @param sname
	 * @param sphone
	 * @throws Exception 
	 */
	public void updateStduent(String uno, String sname, String sphone) throws Exception {
		Log.logger.info("update student  where uno="+uno);
		
		sdao.updateStudent(uno, sname, sphone);
		udao.updateUser(uno,sname);
	}

}
