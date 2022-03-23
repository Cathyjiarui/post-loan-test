package com.finupgroup.postloan.evaluate.service.impl.push;

import com.finupgroup.postloan.evaluate.service.pushTestCase;
import com.finupgroup.postloan.evaluate.utils.PushCaseUtil;
import com.finupgroup.postloan.evaluate.vo.OverDueVo;
import com.finupgroup.postloan.external.vo.BaseVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 * @ClassName renmaiYbjrPushTestCase
 * @Description 任买易宝案件推送
 * @Author ZhangJia
 * @Date 2019-10-12 19:04
 * @Version 1.0
 **/
@Repository
public class renmaiYbjrPushTestCase implements pushTestCase {

    @Autowired
    private PushCaseUtil pushCaseUtil;

    @Override
    public String pushCase(String url, OverDueVo overDueVo, String serviceCode) {
        BaseVO baseVO = pushCaseUtil.AssembleCase(overDueVo);
        baseVO.getCaseVo().setChannelId(47L);
        baseVO.getCaseVo().setProductName("renmai_yibao");
        return pushCaseUtil.PushCase(url,baseVO,serviceCode);
    }
}