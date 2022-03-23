package com.finupgroup.postloan.evaluate.service.impl.push;

import com.finupgroup.postloan.evaluate.service.pushTestCase;
import com.finupgroup.postloan.evaluate.utils.PushCaseUtil;
import com.finupgroup.postloan.evaluate.vo.OverDueVo;
import com.finupgroup.postloan.external.vo.BaseVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 * @ClassName LendAppPushTestCase
 * @Description 个贷App推送案件
 * @Author finup
 * @Date 2019-10-11 23:45
 * @Version 1.0
 **/
@Repository
public class LendAppPushTestCase implements pushTestCase {

    @Autowired
    private PushCaseUtil pushCaseUtil;

    @Override
    public String pushCase(String url, OverDueVo overDueVo, String serviceCode) {
        BaseVO baseVO = pushCaseUtil.AssembleCase(overDueVo);
        baseVO.getCaseVo().setProductName("gedaiAPP");
        baseVO.getCaseVo().setChannelId(17L);
        return pushCaseUtil.PushCase(url,baseVO,serviceCode);
    }
}