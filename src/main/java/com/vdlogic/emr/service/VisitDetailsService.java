package com.vdlogic.emr.service;

import com.vdlogic.emr.domain.VisitDetails;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link VisitDetails}.
 */
public interface VisitDetailsService {

    /**
     * Save a visitDetails.
     *
     * @param visitDetails the entity to save.
     * @return the persisted entity.
     */
    VisitDetails save(VisitDetails visitDetails);

    /**
     * Get all the visitDetails.
     *
     * @return the list of entities.
     */
    List<VisitDetails> findAll();


    /**
     * Get the "id" visitDetails.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<VisitDetails> findOne(Long id);

    /**
     * Delete the "id" visitDetails.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
