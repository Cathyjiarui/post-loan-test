package com.finupgroup.postloan.evaluate.entity.enums;

import com.baomidou.mybatisplus.core.enums.IEnum;

public enum ServiceUser implements IEnum<String> {

    PUHUI_LEND("puhui_lend", 2, 16L),
    PUHUI_LEND_APP("puhui_lend_app", 3, 17L),
    JIEA_ONLINE("jiea_online", 4, 1L),
    PUHUI_RENMAI("puhui_renmai", 6, 24L),
    PUHUI_SHANJIE("puhui_shanjie", 7, 29L),
    PUHUI_RENMAI_P2P("puhui_renmai_p2p", 9, 30L),
    PUHUI_RENMAI_WENZHOU("puhui_renmai_wenzhou", 12, 35L),
    FINUP_FANCARD("finup_fancard", 13, 41L),
    FINUP_QIANZHAN_PB("finup_qianzhan_pb", 14, 42L),
    PUHUI_PAYDAYLOAN_FF("puhui_paydayloan_ff", 15,43L),
    PUHUI_FANYIN("puhui_fanyin", 16, 44L),
    FINUP_GOOSE_CARD("finup_goose_card", 17, 46L),
    PUHUI_RENMAI_ZHONGAN("puhui_renmai_zhongan", 18, 48L),
    PUHUI_RENMAI_YBJR("puhui_renmai_ybjr", 19, 47L),
    RENMAI_REPO("renmai_repo",20, 52L),
    RENMAI_ZXXT("renmai_zxxt",21, 58L),
    RENMAI_XYD("renmai_xyd",22, 63L),
    FINUP_AIBT("finup_aibt",23, 68L),
    RENMAI_RYH("renmai_ryh",24, 71L),
    UNKNOWN_DATA("unknown_data",999, 999L);

    private String ServiceUserName;
    private Integer Index;
    private Long ChannelId;

    ServiceUser(String name, Integer index, Long channelId) {
        ServiceUserName = name;
        Index = index;
        ChannelId = channelId;
    }

    @Override
    public String getValue() {
        return ServiceUserName;
    }

    public Integer getIndex() {
        return Index;
    }

    public Long getChannelId() {
        return ChannelId;
    }

}