package com.finupgroup.postloan.evaluate.scheduled;

import com.finupgroup.postloan.evaluate.service.mongo.RepayConfigRepository;
import com.finupgroup.postloan.evaluate.service.mongo.RepaySeletCidRepository;
import com.finupgroup.postloan.evaluate.utils.CatchCoreData;
import com.xxl.job.core.biz.model.ReturnT;
import com.xxl.job.core.handler.IJobHandler;
import com.xxl.job.core.handler.annotation.JobHandler;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * @Author cuishaohua @Date 2019/9/2
 */


@JobHandler(value = "StorageInfoHandler")
@Component
@Slf4j
public class StorageInfo extends IJobHandler {

    @Autowired
    private RepayConfigRepository repayConfigRepository;
    @Autowired
    private RepaySeletCidRepository repaySeletCidRepository;
    @Autowired
    private CatchCoreData catchCoreData;

    @Override
    public ReturnT <String> execute(String param) throws Exception {
        log.info("推送案件开始+++++++++++++++++++++++++++++++++++++++++++++++");
//        int param_data = Integer.parseInt(param);
////        获取需要执行的初始核心进件号
//        Long core_req_id = repayConfigRepository.findCoreReqIdByName().getMax_core_req_id();
////        定义核心进件号循环初始值
//        Long addCase = 1L;
////        定义while循环的初始值
//        int addCount = 0;
////       循环调用核心接口获取进件信息
//        try {
//            while (addCount < param_data) {
//                log.info("addcount：" + addCount);
//                log.info("param_data：" + param_data);
//                Long godi = core_req_id + addCase;
//                log.info("当前获取第：{} 条", String.valueOf(godi));
//                repayConfigRepository.updateCoreReqIdByName(godi);
//                Boolean rslt = catchCoreData.GetOverDueInfo(godi);
//                if (rslt != null && rslt) {
//                    catchCoreData.GetCaseInfo(godi);
//                    log.info("入库成功，核心进件号：{}", godi);
//                    addCount++;
//                }
//                addCase++;
//                if (addCase > 38953243287559L) {
//                    break;
//                }
//            }
//        } catch (Exception e) {
//            System.out.println("test failure");
//        }

//        获取需要进行扫描判断的核心进件号
        List <Long> cid_core = repaySeletCidRepository.findCoreReqIdByStatus();
        for (Long cid : cid_core) {
//            Boolean rslt = catchCoreData.GetOverDueInfo(cid);
//            if (rslt != null && rslt) {
            try {
                catchCoreData.GetCaseInfo(cid);
                log.info("入库成功，核心进件号：{}", cid);
            } catch (Exception e) {
                log.info("test failure");
            }
//            }
        }
        log.info("抓取案件结束+++++++++++++++++++++++++++++++++++++++++++++++");
        return SUCCESS;
    }
}