package com.finupgroup.postloan.evaluate.service.impl.push;

import com.finupgroup.postloan.evaluate.service.pushTestCase;
import com.finupgroup.postloan.evaluate.utils.PushCaseUtil;
import com.finupgroup.postloan.evaluate.vo.OverDueVo;
import com.finupgroup.postloan.external.vo.BaseVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 * @ClassName paydayloanFFPushTestCase
 * @Description 月光侠-FF案件推送
 * @Author finup
 * @Date 2019-10-12 18:38
 * @Version 1.0
 **/
@Repository
public class paydayloanFFPushTestCase implements pushTestCase {

    @Autowired
    private PushCaseUtil pushCaseUtil;

    @Override
    public String pushCase(String url, OverDueVo overDueVo, String serviceCode) {
        BaseVO baseVO = pushCaseUtil.AssembleCase(overDueVo);
        baseVO.getCaseVo().setProductName("puhui_paydayloan_ff");
        baseVO.getCaseVo().setChannelId(43L);
        return pushCaseUtil.PushCase(url,baseVO,serviceCode);
    }
}