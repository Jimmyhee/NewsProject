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
		/*//��ȡ�����ļ���Ϣ
		//������ʱ��		
		try {
			Class.forName("com.icss.util.AppContext");	
		} catch (Exception e) {
			Log.logger.error(e.getMessage(),e);
		}*/
		Log.logger.info("SystemInit-----------------��ȡ�����ļ�");		
	}

}
