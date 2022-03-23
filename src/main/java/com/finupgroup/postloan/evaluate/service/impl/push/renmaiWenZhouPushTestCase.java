package com.finupgroup.postloan.evaluate.service.impl.push;

import com.finupgroup.postloan.evaluate.service.pushTestCase;
import com.finupgroup.postloan.evaluate.utils.PushCaseUtil;
import com.finupgroup.postloan.evaluate.vo.OverDueVo;
import com.finupgroup.postloan.external.vo.BaseVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 * @ClassName renmaiWenZhouPushTestCase
 * @Description 任买温州银行推送案件
 * @Author ZhangJia
 * @Date 2019-10-12 18:29
 * @Version 1.0
 **/
@Repository
public class renmaiWenZhouPushTestCase implements pushTestCase {

    @Autowired
    private PushCaseUtil pushCaseUtil;

    @Override
    public String pushCase(String url, OverDueVo overDueVo, String serviceCode) {
        BaseVO baseVO = pushCaseUtil.AssembleCase(overDueVo);
        baseVO.getCaseVo().setProductName("HM_WZ");
        baseVO.getCaseVo().setChannelId(35L);
        return pushCaseUtil.PushCase(url,baseVO,serviceCode);
    }
}