package com.finupgroup.postloan.evaluate.service.impl.push;

import com.finupgroup.postloan.evaluate.service.pushTestCase;
import com.finupgroup.postloan.evaluate.utils.PushCaseUtil;
import com.finupgroup.postloan.evaluate.vo.OverDueVo;
import com.finupgroup.postloan.external.vo.BaseVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 * @ClassName aibtPushTestCase
 * @Description 爱白条案件推送
 * @Author finup
 * @Date 2019-10-12 23:57
 * @Version 1.0
 **/
@Repository
public class aibtPushTestCase implements pushTestCase {

    @Autowired
    private PushCaseUtil pushCaseUtil;

    @Override
    public String pushCase(String url, OverDueVo overDueVo, String serviceCode) {
        BaseVO baseVO = pushCaseUtil.AssembleCase(overDueVo);
        baseVO.getCaseVo().setChannelId(68L);
        baseVO.getCaseVo().setProductName("finup_aibt");
        return pushCaseUtil.PushCase(url,baseVO,serviceCode);
    }
}