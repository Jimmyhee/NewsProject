package com.nepu.biz;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nepu.dao.ChoiceDao;
import com.nepu.entity.Choice;
import com.nepu.util.Log;

@Service("choicBiz")
@Transactional(readOnly=true)
public class ChoiceBiz {
	
	private ChoiceDao cdao;
	/**
	 * add option of choice
	 * @param choice
	 * @throws Exception
	 */
	public void addChoice (Choice choice) throws Exception{
		Log.logger.info("add option of choice");
		
			cdao.addChoice(choice);
	}
}
