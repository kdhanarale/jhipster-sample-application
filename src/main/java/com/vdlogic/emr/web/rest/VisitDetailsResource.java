package com.vdlogic.emr.web.rest;

import com.vdlogic.emr.domain.VisitDetails;
import com.vdlogic.emr.service.VisitDetailsService;
import com.vdlogic.emr.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.vdlogic.emr.domain.VisitDetails}.
 */
@RestController
@RequestMapping("/api")
public class VisitDetailsResource {

    private final Logger log = LoggerFactory.getLogger(VisitDetailsResource.class);

    private static final String ENTITY_NAME = "visitDetails";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final VisitDetailsService visitDetailsService;

    public VisitDetailsResource(VisitDetailsService visitDetailsService) {
        this.visitDetailsService = visitDetailsService;
    }

    /**
     * {@code POST  /visit-details} : Create a new visitDetails.
     *
     * @param visitDetails the visitDetails to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new visitDetails, or with status {@code 400 (Bad Request)} if the visitDetails has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/visit-details")
    public ResponseEntity<VisitDetails> createVisitDetails(@RequestBody VisitDetails visitDetails) throws URISyntaxException {
        log.debug("REST request to save VisitDetails : {}", visitDetails);
        if (visitDetails.getId() != null) {
            throw new BadRequestAlertException("A new visitDetails cannot already have an ID", ENTITY_NAME, "idexists");
        }
        VisitDetails result = visitDetailsService.save(visitDetails);
        return ResponseEntity.created(new URI("/api/visit-details/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /visit-details} : Updates an existing visitDetails.
     *
     * @param visitDetails the visitDetails to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated visitDetails,
     * or with status {@code 400 (Bad Request)} if the visitDetails is not valid,
     * or with status {@code 500 (Internal Server Error)} if the visitDetails couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/visit-details")
    public ResponseEntity<VisitDetails> updateVisitDetails(@RequestBody VisitDetails visitDetails) throws URISyntaxException {
        log.debug("REST request to update VisitDetails : {}", visitDetails);
        if (visitDetails.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        VisitDetails result = visitDetailsService.save(visitDetails);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, visitDetails.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /visit-details} : get all the visitDetails.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of visitDetails in body.
     */
    @GetMapping("/visit-details")
    public List<VisitDetails> getAllVisitDetails() {
        log.debug("REST request to get all VisitDetails");
        return visitDetailsService.findAll();
    }

    /**
     * {@code GET  /visit-details/:id} : get the "id" visitDetails.
     *
     * @param id the id of the visitDetails to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the visitDetails, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/visit-details/{id}")
    public ResponseEntity<VisitDetails> getVisitDetails(@PathVariable Long id) {
        log.debug("REST request to get VisitDetails : {}", id);
        Optional<VisitDetails> visitDetails = visitDetailsService.findOne(id);
        return ResponseUtil.wrapOrNotFound(visitDetails);
    }

    /**
     * {@code DELETE  /visit-details/:id} : delete the "id" visitDetails.
     *
     * @param id the id of the visitDetails to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/visit-details/{id}")
    public ResponseEntity<Void> deleteVisitDetails(@PathVariable Long id) {
        log.debug("REST request to delete VisitDetails : {}", id);
        visitDetailsService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
