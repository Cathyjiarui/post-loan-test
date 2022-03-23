package com.finupgroup.postloan.evaluate.service.impl.push;

import com.finupgroup.postloan.evaluate.common.Constants;
import com.finupgroup.postloan.evaluate.service.pushTestCase;
import com.finupgroup.postloan.evaluate.utils.PushCaseUtil;
import com.finupgroup.postloan.evaluate.vo.OverDueVo;
import com.finupgroup.postloan.external.vo.BaseVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 * @ClassName GEDAIPushTestCase
 * @Description 个贷推送案件
 * @Author finup
 * @Date 2019-10-11 15:43
 * @Version 1.0
 **/
@Repository
public class LendPushTestCase implements pushTestCase {

    @Autowired
    private PushCaseUtil pushCaseUtil;

    @Override
    public String pushCase(String url, OverDueVo overDueVo, String serviceCode) {
        BaseVO baseVO = pushCaseUtil.AssembleCase(overDueVo);
        baseVO.getCaseVo().setStoreName("北京万达广场门店");
        baseVO.getCaseVo().setStoreId(7L);
        baseVO.getCaseVo().setStoreCity("beijing");
        baseVO.getCaseVo().setStoreProvince("beijing");
        baseVO.getCaseVo().setProductName("gedai");
        baseVO.getCaseVo().setChannelId(16L);
        return pushCaseUtil.PushCase(url,baseVO,serviceCode);
    }
}