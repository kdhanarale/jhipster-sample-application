package com.vdlogic.emr.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;

import com.vdlogic.emr.domain.enumeration.VisitInfo;

/**
 * A VisitDetails.
 */
@Entity
@Table(name = "visit_details")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class VisitDetails implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    private VisitInfo type;

    @Column(name = "data")
    private String data;

    @Column(name = "created_date")
    private Instant createdDate;

    @ManyToOne
    @JsonIgnoreProperties("visits")
    private Visit visitDetails;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public VisitInfo getType() {
        return type;
    }

    public VisitDetails type(VisitInfo type) {
        this.type = type;
        return this;
    }

    public void setType(VisitInfo type) {
        this.type = type;
    }

    public String getData() {
        return data;
    }

    public VisitDetails data(String data) {
        this.data = data;
        return this;
    }

    public void setData(String data) {
        this.data = data;
    }

    public Instant getCreatedDate() {
        return createdDate;
    }

    public VisitDetails createdDate(Instant createdDate) {
        this.createdDate = createdDate;
        return this;
    }

    public void setCreatedDate(Instant createdDate) {
        this.createdDate = createdDate;
    }

    public Visit getVisitDetails() {
        return visitDetails;
    }

    public VisitDetails visitDetails(Visit visit) {
        this.visitDetails = visit;
        return this;
    }

    public void setVisitDetails(Visit visit) {
        this.visitDetails = visit;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof VisitDetails)) {
            return false;
        }
        return id != null && id.equals(((VisitDetails) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "VisitDetails{" +
            "id=" + getId() +
            ", type='" + getType() + "'" +
            ", data='" + getData() + "'" +
            ", createdDate='" + getCreatedDate() + "'" +
            "}";
    }
}
