package com.finupgroup.postloan.evaluate.service.impl.mongo;

import com.finupgroup.postloan.evaluate.entity.mongo.RepayServerList;
import com.finupgroup.postloan.evaluate.service.mongo.RepayServerListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * @ClassName RepayServerListRepositoryImpl
 * @Description 案件信息实现类
 * @Author zhangjia
 * @Date 2019-09-24 22:26
 * @Version 1.0
 **/
@Component
public class RepayServerListRepositoryImpl implements RepayServerListRepository {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public void insterServerList(RepayServerList repayServerList) {
        mongoTemplate.save(repayServerList);
    }

    @Override
    public Long getCount() {
        Query query = new Query();
        query.addCriteria(Criteria.where("server_address").ne("").ne(null));
        return mongoTemplate.count(query,RepayServerList.class);
    }

    @Override
    public List<RepayServerList> getServerList(int limit, int skip) {
        Query query = new Query();
        query.addCriteria(Criteria.where("server_address").ne("").ne(null)).limit(limit).skip(skip);
        return mongoTemplate.find(query,RepayServerList.class);
    }

    @Override
    public void updateIsOpenById(String id, boolean isOpen) {
        Query query = new Query(Criteria.where("id").is(id));
        Update update = Update.update("is_open", isOpen);
        mongoTemplate.updateMulti(query,update,RepayServerList.class);
    }

    @Override
    public void updateServerAddressById(String id, String serverAddress) {
        Query query = new Query(Criteria.where("id").is(id));
        Update update = Update.update("server_address",serverAddress);
        mongoTemplate.updateMulti(query,update,RepayServerList.class);
    }
}