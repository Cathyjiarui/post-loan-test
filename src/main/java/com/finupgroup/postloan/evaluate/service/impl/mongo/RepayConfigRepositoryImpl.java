package com.finupgroup.postloan.evaluate.service.impl.mongo;

import com.finupgroup.postloan.evaluate.entity.mongo.RepayConfig;
import com.finupgroup.postloan.evaluate.service.mongo.RepayConfigRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Component;

/**
 * @Author cuishaohua
 * @Date 2019/9/4
 */
@Component
@Slf4j
public class RepayConfigRepositoryImpl implements RepayConfigRepository {

    @Autowired
    private MongoTemplate mongoTemplate;

    private int type_data = 1;

    /**
     * @Author cuishaohua
     * @Date 2019/9/4
     * 获取需要执行的最大核心进件号
     */
    @Override
    public RepayConfig findCoreReqIdByName() {
        Query query = new Query();
        query.addCriteria(Criteria.where("type").is(type_data));
        RepayConfig rlt = mongoTemplate.findOne(query, RepayConfig.class);
        log.info(String.valueOf(rlt));
        return rlt;
    }

    /**
     * @Author cuishaohua
     * @Date 2019/9/4
     * 更新需要执行的最大核心进件号
     */
    @Override
    public void updateCoreReqIdByName(Long core_req_id) {
        Query query = new Query(Criteria.where("type").is(type_data));
        Update update = Update.update("max_core_req_id", core_req_id);
        mongoTemplate.updateMulti(query, update, RepayConfig.class);
    }
}
