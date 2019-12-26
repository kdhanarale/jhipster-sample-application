package com.vdlogic.emr.web.rest;

import com.vdlogic.emr.JhipsterSampleApplicationApp;
import com.vdlogic.emr.domain.VisitDetails;
import com.vdlogic.emr.repository.VisitDetailsRepository;
import com.vdlogic.emr.service.VisitDetailsService;
import com.vdlogic.emr.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static com.vdlogic.emr.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.vdlogic.emr.domain.enumeration.VisitInfo;
/**
 * Integration tests for the {@link VisitDetailsResource} REST controller.
 */
@SpringBootTest(classes = JhipsterSampleApplicationApp.class)
public class VisitDetailsResourceIT {

    private static final VisitInfo DEFAULT_TYPE = VisitInfo.DIAGNOSIS;
    private static final VisitInfo UPDATED_TYPE = VisitInfo.PRESCRIPTION;

    private static final String DEFAULT_DATA = "AAAAAAAAAA";
    private static final String UPDATED_DATA = "BBBBBBBBBB";

    private static final Instant DEFAULT_CREATED_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private VisitDetailsRepository visitDetailsRepository;

    @Autowired
    private VisitDetailsService visitDetailsService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restVisitDetailsMockMvc;

    private VisitDetails visitDetails;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final VisitDetailsResource visitDetailsResource = new VisitDetailsResource(visitDetailsService);
        this.restVisitDetailsMockMvc = MockMvcBuilders.standaloneSetup(visitDetailsResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static VisitDetails createEntity(EntityManager em) {
        VisitDetails visitDetails = new VisitDetails()
            .type(DEFAULT_TYPE)
            .data(DEFAULT_DATA)
            .createdDate(DEFAULT_CREATED_DATE);
        return visitDetails;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static VisitDetails createUpdatedEntity(EntityManager em) {
        VisitDetails visitDetails = new VisitDetails()
            .type(UPDATED_TYPE)
            .data(UPDATED_DATA)
            .createdDate(UPDATED_CREATED_DATE);
        return visitDetails;
    }

    @BeforeEach
    public void initTest() {
        visitDetails = createEntity(em);
    }

    @Test
    @Transactional
    public void createVisitDetails() throws Exception {
        int databaseSizeBeforeCreate = visitDetailsRepository.findAll().size();

        // Create the VisitDetails
        restVisitDetailsMockMvc.perform(post("/api/visit-details")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(visitDetails)))
            .andExpect(status().isCreated());

        // Validate the VisitDetails in the database
        List<VisitDetails> visitDetailsList = visitDetailsRepository.findAll();
        assertThat(visitDetailsList).hasSize(databaseSizeBeforeCreate + 1);
        VisitDetails testVisitDetails = visitDetailsList.get(visitDetailsList.size() - 1);
        assertThat(testVisitDetails.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testVisitDetails.getData()).isEqualTo(DEFAULT_DATA);
        assertThat(testVisitDetails.getCreatedDate()).isEqualTo(DEFAULT_CREATED_DATE);
    }

    @Test
    @Transactional
    public void createVisitDetailsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = visitDetailsRepository.findAll().size();

        // Create the VisitDetails with an existing ID
        visitDetails.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restVisitDetailsMockMvc.perform(post("/api/visit-details")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(visitDetails)))
            .andExpect(status().isBadRequest());

        // Validate the VisitDetails in the database
        List<VisitDetails> visitDetailsList = visitDetailsRepository.findAll();
        assertThat(visitDetailsList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllVisitDetails() throws Exception {
        // Initialize the database
        visitDetailsRepository.saveAndFlush(visitDetails);

        // Get all the visitDetailsList
        restVisitDetailsMockMvc.perform(get("/api/visit-details?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(visitDetails.getId().intValue())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].data").value(hasItem(DEFAULT_DATA)))
            .andExpect(jsonPath("$.[*].createdDate").value(hasItem(DEFAULT_CREATED_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getVisitDetails() throws Exception {
        // Initialize the database
        visitDetailsRepository.saveAndFlush(visitDetails);

        // Get the visitDetails
        restVisitDetailsMockMvc.perform(get("/api/visit-details/{id}", visitDetails.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(visitDetails.getId().intValue()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()))
            .andExpect(jsonPath("$.data").value(DEFAULT_DATA))
            .andExpect(jsonPath("$.createdDate").value(DEFAULT_CREATED_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingVisitDetails() throws Exception {
        // Get the visitDetails
        restVisitDetailsMockMvc.perform(get("/api/visit-details/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateVisitDetails() throws Exception {
        // Initialize the database
        visitDetailsService.save(visitDetails);

        int databaseSizeBeforeUpdate = visitDetailsRepository.findAll().size();

        // Update the visitDetails
        VisitDetails updatedVisitDetails = visitDetailsRepository.findById(visitDetails.getId()).get();
        // Disconnect from session so that the updates on updatedVisitDetails are not directly saved in db
        em.detach(updatedVisitDetails);
        updatedVisitDetails
            .type(UPDATED_TYPE)
            .data(UPDATED_DATA)
            .createdDate(UPDATED_CREATED_DATE);

        restVisitDetailsMockMvc.perform(put("/api/visit-details")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedVisitDetails)))
            .andExpect(status().isOk());

        // Validate the VisitDetails in the database
        List<VisitDetails> visitDetailsList = visitDetailsRepository.findAll();
        assertThat(visitDetailsList).hasSize(databaseSizeBeforeUpdate);
        VisitDetails testVisitDetails = visitDetailsList.get(visitDetailsList.size() - 1);
        assertThat(testVisitDetails.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testVisitDetails.getData()).isEqualTo(UPDATED_DATA);
        assertThat(testVisitDetails.getCreatedDate()).isEqualTo(UPDATED_CREATED_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingVisitDetails() throws Exception {
        int databaseSizeBeforeUpdate = visitDetailsRepository.findAll().size();

        // Create the VisitDetails

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restVisitDetailsMockMvc.perform(put("/api/visit-details")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(visitDetails)))
            .andExpect(status().isBadRequest());

        // Validate the VisitDetails in the database
        List<VisitDetails> visitDetailsList = visitDetailsRepository.findAll();
        assertThat(visitDetailsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteVisitDetails() throws Exception {
        // Initialize the database
        visitDetailsService.save(visitDetails);

        int databaseSizeBeforeDelete = visitDetailsRepository.findAll().size();

        // Delete the visitDetails
        restVisitDetailsMockMvc.perform(delete("/api/visit-details/{id}", visitDetails.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<VisitDetails> visitDetailsList = visitDetailsRepository.findAll();
        assertThat(visitDetailsList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
