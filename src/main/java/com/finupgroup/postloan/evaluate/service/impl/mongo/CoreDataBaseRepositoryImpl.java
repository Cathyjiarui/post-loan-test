package com.finupgroup.postloan.evaluate.service.impl.mongo;

import com.finupgroup.postloan.evaluate.entity.mongo.CoreDataBase;
import com.finupgroup.postloan.evaluate.service.mongo.CoreDataBaseRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @Author cuishaohua
 * @Date 2019/10/31
 */
@Component
@Slf4j
public class CoreDataBaseRepositoryImpl implements CoreDataBaseRepository {

    @Autowired
    private MongoTemplate mongoTemplate;

    private String state = "1";

    /**
     * @Author cuishaohua
     * @Date 2019/9/4
     * 获取当前资产的数据和表
     */
    @Override
    public List <Map <String, String>> findDataBase() {
        Query query = new Query();
        query.addCriteria(Criteria.where("state").is(state));
        List <CoreDataBase> rlt = mongoTemplate.find(query, CoreDataBase.class);
        List <Map <String, String>> core_data = new ArrayList <>();
        for (CoreDataBase coreDataBase : rlt) {
            Map <String, String> map = new HashMap <>();
            map.put("1", coreDataBase.getAsset());
            map.put("2", coreDataBase.getAsset_info());
            core_data.add(map);
        }
//        log.info("获取的核心库信息" + String.valueOf(core_data));
        return core_data;
    }
}