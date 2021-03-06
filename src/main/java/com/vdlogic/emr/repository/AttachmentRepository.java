package com.vdlogic.emr.repository;

import com.vdlogic.emr.domain.Attachment;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Attachment entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AttachmentRepository extends JpaRepository<Attachment, Long> {

}
