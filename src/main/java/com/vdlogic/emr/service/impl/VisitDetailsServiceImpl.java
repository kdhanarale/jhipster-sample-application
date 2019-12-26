package com.vdlogic.emr.service.impl;

import com.vdlogic.emr.service.VisitDetailsService;
import com.vdlogic.emr.domain.VisitDetails;
import com.vdlogic.emr.repository.VisitDetailsRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link VisitDetails}.
 */
@Service
@Transactional
public class VisitDetailsServiceImpl implements VisitDetailsService {

    private final Logger log = LoggerFactory.getLogger(VisitDetailsServiceImpl.class);

    private final VisitDetailsRepository visitDetailsRepository;

    public VisitDetailsServiceImpl(VisitDetailsRepository visitDetailsRepository) {
        this.visitDetailsRepository = visitDetailsRepository;
    }

    /**
     * Save a visitDetails.
     *
     * @param visitDetails the entity to save.
     * @return the persisted entity.
     */
    @Override
    public VisitDetails save(VisitDetails visitDetails) {
        log.debug("Request to save VisitDetails : {}", visitDetails);
        return visitDetailsRepository.save(visitDetails);
    }

    /**
     * Get all the visitDetails.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<VisitDetails> findAll() {
        log.debug("Request to get all VisitDetails");
        return visitDetailsRepository.findAll();
    }


    /**
     * Get one visitDetails by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<VisitDetails> findOne(Long id) {
        log.debug("Request to get VisitDetails : {}", id);
        return visitDetailsRepository.findById(id);
    }

    /**
     * Delete the visitDetails by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete VisitDetails : {}", id);
        visitDetailsRepository.deleteById(id);
    }
}
