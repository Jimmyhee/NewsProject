package  com.nepu.biz;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nepu.dao.ManagerDao;
import com.nepu.dao.UserDao;
import com.nepu.entity.Manager;
import com.nepu.util.Log;

@Service("managerBiz")
@Transactional(readOnly = true)
public class ManagerBiz {
	private ManagerDao mdao;
	private UserDao udao;
	/**
	 * query manager by uno 
	 * @param uno
	 * @return
	 * @throws Exception
	 */
	public Manager getManager(String uno) throws Exception{
		Log.logger.info("query manager by uno :"+uno);
		
		return mdao.getManager(uno);
	}
	
	
	/**
	 * update manager 
	 * @param manager
	 * @throws Exception
	 */
	@Transactional(rollbackFor = Throwable.class)
	public void UpdateManager(Manager manager) throws Exception{
		Log.logger.info("update manager");
		
		mdao.UpdateManager(manager);
		udao.updateUser(manager.getUno(),manager.getMname());
	}
}
