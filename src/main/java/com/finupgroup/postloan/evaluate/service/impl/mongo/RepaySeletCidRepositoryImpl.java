package com.finupgroup.postloan.evaluate.service.impl.mongo;

import com.finupgroup.postloan.evaluate.entity.mongo.RepaySeletCid;
import com.finupgroup.postloan.evaluate.service.mongo.RepaySeletCidRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

/**
 * @Author cuishaohua
 * @Date 2019/9/11
 */
@Component
@Slf4j
public class RepaySeletCidRepositoryImpl implements RepaySeletCidRepository {

    @Autowired
    private MongoTemplate mongoTemplate;

    /**
     * @Author cuishaohua
     * @Date 2019/9/11
     * 获取需要扫描的核心进件号
     */
    @Override
    public List <Long> findCoreReqIdByStatus() {
        Query query = new Query();
        query.addCriteria(Criteria.where("status").is(false));
        List <RepaySeletCid> result = mongoTemplate.find(query, RepaySeletCid.class);
        List <Long> cid_core = new ArrayList <>();
        for (RepaySeletCid repaySeletCid : result) {
            cid_core.add(repaySeletCid.getCore_req_id());
        }
//        log.info(String.valueOf(result));
        return cid_core;
    }

    /**
     * @Author cuishaohua
     * @Date 2019/10/31
     * 清空当前核心案件ID表
     */
    @Override
    public boolean emptySelectCoreId() {
        mongoTemplate.dropCollection("repay_select_core_id");
        return true;
    }

    /**
     * @Author cuishaohua
     * @Date 2019/10/31
     * 插入核心案件号
     */
    @Override
    public void insertCoreId(RepaySeletCid repaySeletCid) {
        mongoTemplate.save(repaySeletCid);
    }
}
