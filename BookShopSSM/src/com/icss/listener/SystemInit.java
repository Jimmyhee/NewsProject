package com.icss.listener;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

import com.icss.util.Log;

@WebListener
public class SystemInit implements ServletContextListener {

	@Override
	public void contextDestroyed(ServletContextEvent arg0) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void contextInitialized(ServletContextEvent arg0) {
		/*//读取配置文件信息
		//启动定时器		
		try {
			Class.forName("com.icss.util.AppContext");	
		} catch (Exception e) {
			Log.logger.error(e.getMessage(),e);
		}*/
		Log.logger.info("SystemInit-----------------读取配置文件");		
	}

}
