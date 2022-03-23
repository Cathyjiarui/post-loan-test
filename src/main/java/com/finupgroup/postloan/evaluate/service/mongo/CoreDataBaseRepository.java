package com.finupgroup.postloan.evaluate.service.mongo;

import java.util.List;
import java.util.Map;

/**
 * @Author cuishaohua
 * @Date 2019/10/31
 */
public interface CoreDataBaseRepository {
    /**
     * 获取资产数据库和表
     **/
    List <Map <String, String>> findDataBase();
}