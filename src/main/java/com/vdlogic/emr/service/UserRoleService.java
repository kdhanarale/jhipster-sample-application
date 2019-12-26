package com.vdlogic.emr.service;

import com.vdlogic.emr.domain.UserRole;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link UserRole}.
 */
public interface UserRoleService {

    /**
     * Save a userRole.
     *
     * @param userRole the entity to save.
     * @return the persisted entity.
     */
    UserRole save(UserRole userRole);

    /**
     * Get all the userRoles.
     *
     * @return the list of entities.
     */
    List<UserRole> findAll();


    /**
     * Get the "id" userRole.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<UserRole> findOne(Long id);

    /**
     * Delete the "id" userRole.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
