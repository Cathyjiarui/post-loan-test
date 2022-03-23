package com.finupgroup.postloan.evaluate.service.impl.push;

import com.finupgroup.postloan.evaluate.service.pushTestCase;
import com.finupgroup.postloan.evaluate.utils.PushCaseUtil;
import com.finupgroup.postloan.evaluate.vo.OverDueVo;
import com.finupgroup.postloan.external.vo.BaseVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 * @ClassName renmaiRepoPushTestCase
 * @Description 任买回购案件推送
 * @Author finup
 * @Date 2019-10-12 19:08
 * @Version 1.0
 **/
@Repository
public class renmaiRepoPushTestCase implements pushTestCase {

    @Autowired
    private PushCaseUtil pushCaseUtil;

    @Override
    public String pushCase(String url, OverDueVo overDueVo, String serviceCode) {
        BaseVO baseVO = pushCaseUtil.AssembleCase(overDueVo);
        baseVO.getCaseVo().setProductName("HM_ZA_BUYBACK");
        baseVO.getCaseVo().setChannelId(52L);
        return pushCaseUtil.PushCase(url,baseVO,serviceCode);
    }
}