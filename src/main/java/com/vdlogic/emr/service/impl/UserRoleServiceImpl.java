package com.vdlogic.emr.service.impl;

import com.vdlogic.emr.service.UserRoleService;
import com.vdlogic.emr.domain.UserRole;
import com.vdlogic.emr.repository.UserRoleRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link UserRole}.
 */
@Service
@Transactional
public class UserRoleServiceImpl implements UserRoleService {

    private final Logger log = LoggerFactory.getLogger(UserRoleServiceImpl.class);

    private final UserRoleRepository userRoleRepository;

    public UserRoleServiceImpl(UserRoleRepository userRoleRepository) {
        this.userRoleRepository = userRoleRepository;
    }

    /**
     * Save a userRole.
     *
     * @param userRole the entity to save.
     * @return the persisted entity.
     */
    @Override
    public UserRole save(UserRole userRole) {
        log.debug("Request to save UserRole : {}", userRole);
        return userRoleRepository.save(userRole);
    }

    /**
     * Get all the userRoles.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<UserRole> findAll() {
        log.debug("Request to get all UserRoles");
        return userRoleRepository.findAll();
    }


    /**
     * Get one userRole by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<UserRole> findOne(Long id) {
        log.debug("Request to get UserRole : {}", id);
        return userRoleRepository.findById(id);
    }

    /**
     * Delete the userRole by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete UserRole : {}", id);
        userRoleRepository.deleteById(id);
    }
}
