package  com.nepu.biz;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nepu.dao.UserDao;
import com.nepu.entity.User;
import com.nepu.util.Log;

@Service("userBiz")
@Transactional(readOnly = true)
public class UserBiz {
		private UserDao  udao;
	/**
	 * user login 
	 * @param uno
	 * @param pwd
	 * @return
	 * @throws Exception
	 */
	public User login(String uno, String pwd) throws Exception{
		
		 Log.logger.info("login : uno=" + uno  + "---pwd=" + pwd);
		 
		return  udao.login(uno, pwd); 
	}

	/**
	 *User update password 
	 * @param uno
	 * @param pwd1
	 * @throws Exception
	 */
	public void updatePwd(String uno, String pwd1) throws Exception {
		
		 Log.logger.info("updatepwd : uno=" + uno );
		 
		 udao.updatePwd(uno,pwd1);
	}

}
