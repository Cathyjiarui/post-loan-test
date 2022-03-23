package com.finupgroup.postloan.evaluate.service.impl.push;

import com.finupgroup.postloan.evaluate.common.Constants;
import com.finupgroup.postloan.evaluate.service.pushTestCase;
import com.finupgroup.postloan.evaluate.utils.DataUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 * @ClassName pushTestCaseFactory
 * @Description 推送案件工厂
 * @Author finup
 * @Date 2019-10-11 16:38
 * @Version 1.0
 **/
@Slf4j
@Repository
public class pushTestCaseFactory {

    @Autowired
    private DataUtil dataUtil;

    @Autowired
    private LendPushTestCase lendPushTestCase;

    @Autowired
    private LendAppPushTestCase lendAppPushTestCase;

    @Autowired
    private JieaOnlinePushTestCase jieaOnlinePushTestCase;

    @Autowired
    private renmaiPushTestCase renmaiPushTestCase;

    @Autowired
    private shanJiePushTestCase shanJiePushTestCase;

    @Autowired
    private renmaiP2PPushTestCase renmaiP2PPushTestCase;

    @Autowired
    private renmaiWenZhouPushTestCase renmaiWenZhouPushTestCase;

    @Autowired
    private qianZhanPbPushTestCase qianZhanPbPushTestCase;

    @Autowired
    private paydayloanFFPushTestCase paydayloanFFPushTestCase;

    @Autowired
    private fanyinPushTestCase fanyinPushTestCase;

    @Autowired
    private gooseCardPushTestCase gooseCardPushTestCase;

    @Autowired
    private renmaiZhonganPushTestCase renmaiZhonganPushTestCase;

    @Autowired
    private renmaiYbjrPushTestCase renmaiYbjrPushTestCase;

    @Autowired
    private renmaiRepoPushTestCase renmaiRepoPushTestCase;

    @Autowired
    private renmaiZxxtPushTestCase renmaiZxxtPushTestCase;

    @Autowired
    private renmaiXydPushTestCase renmaiXydPushTestCase;

    @Autowired
    private aibtPushTestCase aibtPushTestCase;

    @Autowired
    private renmaiRyhPushTestCase renmaiRyhPushTestCase;

    @Autowired
    private PublicPushTestCase publicPushTestCase;

    @Autowired
    private finupSjfPushTestCase finupSjfPushTestCase;

    @Autowired
    private finupSjfpbPushTestCase finupSjfpbPushTestCase;

    @Autowired
    private finupAibtproPushTestCase finupAibtproPushTestCase;

    @Autowired
    private puhuiPaydayloanproFFPushTestCase puhuiPaydayloanproFFPushTestCase;

    public pushTestCase getPushTestCase(String serviceCode){

        if(dataUtil.isEmpty(serviceCode)){
            log.info("service is null !!!");
            return null;
        }
        if(Constants.PUHUI_LEND.equals(serviceCode)){
            return lendPushTestCase;
        }else if (Constants.PUHUI_LEND_APP.equals(serviceCode)){
            return lendAppPushTestCase;
        }else if (Constants.JIEA_ONLINE.equals(serviceCode)){
            return jieaOnlinePushTestCase;
        }else if(Constants.PUHUI_RENMAI.equals(serviceCode)){
            return renmaiPushTestCase;
        }else if(Constants.PUHUI_SHANJIE.equals(serviceCode)){
            return shanJiePushTestCase;
        }else if (Constants.PUHUI_RENMAI_P2P.equals(serviceCode)){
            return renmaiP2PPushTestCase;
        }else if (Constants.PUHUI_RENMAI_WENZHOU.equals(serviceCode)){
            return renmaiWenZhouPushTestCase;
        }else if (Constants.FINUP_QIANZHAN_PB.equals(serviceCode)){
            return qianZhanPbPushTestCase;
        }else if (Constants.PUHUI_PAYDAYLOAN_FF.equals(serviceCode)){
            return paydayloanFFPushTestCase;
        }else if (Constants.PUHUI_FANYIN.equals(serviceCode)){
            return fanyinPushTestCase;
        }else if (Constants.FINUP_GOOSE_CARD.equals(serviceCode)){
            return gooseCardPushTestCase;
        }else if (Constants.PUHUI_RENMAI_ZHONGAN.equals(serviceCode)){
            return renmaiZhonganPushTestCase;
        }else if (Constants.PUHUI_RENMAI_YBJR.equals(serviceCode)){
            return renmaiYbjrPushTestCase;
        }else if (Constants.RENMAI_REPO.equals(serviceCode)){
            return renmaiRepoPushTestCase;
        }else if (Constants.RENMAI_ZXXT.equals(serviceCode)){
            return renmaiZxxtPushTestCase;
        }else if (Constants.RENMAI_XYD.equals(serviceCode)){
            return renmaiXydPushTestCase;
        }else if (Constants.FINUP_AIBT.equals(serviceCode)){
            return aibtPushTestCase;
        }else if (Constants.RENMAI_RYH.equals(serviceCode)){
            return renmaiRyhPushTestCase;
        }else if (Constants.FINUP_SJF.equals(serviceCode)){
            return finupSjfPushTestCase;
        }else if (Constants.FINUP_SJFPB.equals(serviceCode)){
            return finupSjfpbPushTestCase;
        }else if (Constants.FINUP_AIBTPRO.equals(serviceCode)){
            return finupAibtproPushTestCase;
        }else if (Constants.PUHUI_PAYDAYLOANPRO_FF.equals(serviceCode)){
            return puhuiPaydayloanproFFPushTestCase;
        }else {
            return publicPushTestCase;
        }
    }
}