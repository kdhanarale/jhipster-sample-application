package com.vdlogic.emr.repository;

import com.vdlogic.emr.domain.VisitDetails;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the VisitDetails entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VisitDetailsRepository extends JpaRepository<VisitDetails, Long> {

}
