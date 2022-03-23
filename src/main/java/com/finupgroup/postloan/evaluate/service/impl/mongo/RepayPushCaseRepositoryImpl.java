package com.finupgroup.postloan.evaluate.service.impl.mongo;

import com.finupgroup.postloan.evaluate.entity.mongo.RepayPushCase;
import com.finupgroup.postloan.evaluate.service.mongo.RepayPushCaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * <p>
 * mongo数据库操作实现类
 * </p>
 *
 * @author zhangjia
 * @since 2019-08-27
 */
@Component
public class RepayPushCaseRepositoryImpl implements RepayPushCaseRepository {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public RepayPushCase findPushCaseById(String id) {
        Query query = new Query();
        query.addCriteria(Criteria.where("id").is(id));
        return mongoTemplate.findOne(query,RepayPushCase.class);
    }

    @Override
    public List<RepayPushCase> findAllByServiceUserId(Integer serviceUserId) {
        Query query = new Query();
        query.addCriteria(Criteria.where("serviceUserId").is(serviceUserId).and("push_status").is(false));
        return mongoTemplate.find(query,RepayPushCase.class);
    }

    @Override
    public void insterPushCase(RepayPushCase repayPushCase) {
        mongoTemplate.save(repayPushCase);
    }

    @Override
    public void updatePushStatusById(String id) {
        Query query = new Query(Criteria.where("id").is(id));
        Update update = Update.update("push_status",true);
        mongoTemplate.updateMulti(query,update,RepayPushCase.class);
    }

    @Override
    public Long selectCoreReqId() {
        Query query = new Query();
        query.with(new Sort(Sort.Direction.DESC, "core_request_id"));
        query.limit(1);
        try {
            String cri = mongoTemplate.findOne(query, String.class);
            return Long.parseLong(cri);
        } catch (Exception e) {
            return null;
        }
    }

}