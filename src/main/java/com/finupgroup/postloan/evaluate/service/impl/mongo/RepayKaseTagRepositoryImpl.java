package com.finupgroup.postloan.evaluate.service.impl.mongo;

import com.finupgroup.postloan.evaluate.entity.mongo.RepayKaseTag;
import com.finupgroup.postloan.evaluate.service.mongo.RepayKaseTagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Component;

/**
 * @ClassName RepayKaseTagRepositoryImpl
 * @Description TODO
 * @Author finup
 * @Date 2019-09-18 14:19
 * @Version 1.0
 **/
@Component
public class RepayKaseTagRepositoryImpl implements RepayKaseTagRepository {

    @Autowired
    private MongoTemplate mongoTemplate;


    @Override
    public void insterKaseTag(RepayKaseTag repayKaseTag) {
        mongoTemplate.save(repayKaseTag);
    }
}