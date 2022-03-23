package com.finupgroup.postloan.evaluate.scheduled;

import com.finupgroup.postloan.evaluate.entity.mongo.RepaySeletCid;
import com.finupgroup.postloan.evaluate.service.mongo.CoreDataBaseRepository;
import com.finupgroup.postloan.evaluate.service.mongo.RepaySeletCidRepository;
import com.finupgroup.postloan.evaluate.utils.dbDbcpConPoolSQL;
import com.xxl.job.core.biz.model.ReturnT;
import com.xxl.job.core.handler.IJobHandler;
import com.xxl.job.core.handler.annotation.JobHandler;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * @Author cuishaohua @Date 2019/10/23
 */
@JobHandler(value = "PreCoreIdHandler")
@Component
@Slf4j
public class PreCoreId extends IJobHandler {

    @Autowired
    private RepaySeletCidRepository repaySeletCidRepository;
    @Autowired
    private CoreDataBaseRepository CoreDataBaseRepository;

    public ReturnT <String> execute(String param) throws Exception {
        String sql = null;
        String dataUrl = null;

        // 清空repay_select_core_id表数据
        log.info("清空repay_select_core_id表数据");
        boolean result = repaySeletCidRepository.emptySelectCoreId();
        log.info("清空selectcoreid表是否成功：{}", result);

        //循环获取资产库的库和表，拼装请求库地址和sql
        List <Map <String, String>> core_data = CoreDataBaseRepository.findDataBase();
        for (Map <String, String> cda : core_data) {
//            log.info("即将使用的核心库信息" + cd);
            dbDbcpConPoolSQL dbconpoolsql = new dbDbcpConPoolSQL();
            dataUrl = "jdbc:mysql://10.10.208.63/" + cda.get("1");
            sql = "SELECT id FROM " + cda.get("2") + " WHERE STATUS = 'OVER_DUE';";
            log.info("dataUrl:" + dataUrl);
            log.info("sql:" + sql);
            List <Long> cid_datas = dbconpoolsql.selectSQL(sql, dataUrl);
            // 查询资产，获取逾期案件核心进件id，入库
            log.info("单库入库案件数量：{}", String.valueOf(cid_datas.size()));
            for (Long cid_data : cid_datas) {
                RepaySeletCid rsc = new RepaySeletCid();
                rsc.setUpdateTime(new Date());
                rsc.setStatus(false);
                rsc.setCore_req_id(cid_data);
                repaySeletCidRepository.insertCoreId(rsc);
//                log.info("核心案件号入库：{}", rsc);
            }
        }
        log.info("核心进件号抓取完成");
        return null;
    }
}
