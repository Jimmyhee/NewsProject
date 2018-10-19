package com.icss.biz;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.icss.dao.BookDao;
import com.icss.entity.TBook;
import com.icss.entity.TBookType;
@Service("bookBiz")
@Transactional(readOnly=true)
public class BookBiz {
	@Autowired
	private BookDao bookDao;
	/**
	 * ��ȡͼ��������Ϣ
	 * @return
	 * @throws Exception
	 */
	public List<TBookType> getBookType() throws Exception{			
		return	 bookDao.getBookType();			
	}
	
	/**
	 * ͼ���ϴ�
	 * @param book
	 * @throws Exception
	 */
	public void addBook(TBook book) throws Exception{
		
		bookDao.addBook(book);	
		
	}
	
	/**
	 * ��ȡͼ������ (����������ͼƬ)
	 * @param isbn
	 * @return
	 * @throws Exception
	 */
	public TBook getBookInfo(String isbn) throws Exception{
		
		return bookDao.getBookInfo(isbn);	
		
	}
	
	/**
	 * ����ͼ���isbn����ȡ����
	 * @param isbn
	 * @return
	 * @throws Exception
	 */
	public byte[] getPic(String isbn) throws Exception{
		
		return bookDao.getPic(isbn);	
	
	}
	
	/**
	 * ��ȡ����ͼ����Ϣ(������ͼƬ��Ϣ)
	 * @return
	 * @throws Exception
	 */
	public List<TBook> getAllBooks() throws Exception{
		
		
     	return bookDao.getAllBooks();
		
		
	}
	
	/**
	 * ��ȡ���ﳵ�е�ͼ����Ϣ ������ͼƬ��
	 * @return
	 * @throws Exception
	 */
	public List<TBook> getCarBooks(Set<String> isbns) throws Exception{
		List<TBook> books = null;
		
		if(isbns != null && isbns.size()>0){
			
			books = bookDao.getCarBooks(isbns);	
						
		}
		
		return books;		
	}
	

}
