package com.finupgroup.postloan.evaluate.service.impl.push;

import com.finupgroup.postloan.evaluate.service.pushTestCase;
import com.finupgroup.postloan.evaluate.utils.PushCaseUtil;
import com.finupgroup.postloan.evaluate.vo.OverDueVo;
import com.finupgroup.postloan.external.vo.BaseVO;
import com.finupgroup.postloan.external.vo.CasesInRepayVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

/**
 * @ClassName qianZhanPbPushTestCase
 * @Description 钱站pb推送案件
 * @Author finup
 * @Date 2019-10-12 18:34
 * @Version 1.0
 **/
@Repository
public class qianZhanPbPushTestCase implements pushTestCase {

    @Autowired
    private PushCaseUtil pushCaseUtil;

    @Override
    public String pushCase(String url, OverDueVo overDueVo, String serviceCode) {
        BaseVO baseVO = pushCaseUtil.AssembleCase(overDueVo);
        baseVO.getCaseVo().setChannelId(42L);
        baseVO.getCaseVo().setProductName("qianzhanpb");
        CasesInRepayVO casesInRepayVO = new CasesInRepayVO();
        List<CasesInRepayVO> casesInRepayVOS = new ArrayList<>();
        casesInRepayVO.setCoreRequestId(baseVO.getCaseVo().getCoreRequestId());
        casesInRepayVOS.add(casesInRepayVO);
        baseVO.setCasesInRepayVo(casesInRepayVOS);
        return pushCaseUtil.PushCase(url,baseVO,serviceCode);
    }
}