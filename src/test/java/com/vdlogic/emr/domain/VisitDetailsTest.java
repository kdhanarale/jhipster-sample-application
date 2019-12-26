package com.vdlogic.emr.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.vdlogic.emr.web.rest.TestUtil;

public class VisitDetailsTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(VisitDetails.class);
        VisitDetails visitDetails1 = new VisitDetails();
        visitDetails1.setId(1L);
        VisitDetails visitDetails2 = new VisitDetails();
        visitDetails2.setId(visitDetails1.getId());
        assertThat(visitDetails1).isEqualTo(visitDetails2);
        visitDetails2.setId(2L);
        assertThat(visitDetails1).isNotEqualTo(visitDetails2);
        visitDetails1.setId(null);
        assertThat(visitDetails1).isNotEqualTo(visitDetails2);
    }
}
