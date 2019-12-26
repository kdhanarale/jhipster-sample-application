package com.vdlogic.emr.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

import com.vdlogic.emr.domain.enumeration.ScheduleStatus;

/**
 * not an ignored comment
 */
@ApiModel(description = "not an ignored comment")
@Entity
@Table(name = "visit")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Visit implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "schedule_date")
    private Instant scheduleDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private ScheduleStatus status;

    @Column(name = "created_date")
    private Instant createdDate;

    @OneToMany(mappedBy = "visitDetails")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<VisitDetails> visits = new HashSet<>();

    @OneToMany(mappedBy = "vAttachment")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Attachment> visitAttachments = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("patientVisits")
    private Patient visit;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getScheduleDate() {
        return scheduleDate;
    }

    public Visit scheduleDate(Instant scheduleDate) {
        this.scheduleDate = scheduleDate;
        return this;
    }

    public void setScheduleDate(Instant scheduleDate) {
        this.scheduleDate = scheduleDate;
    }

    public ScheduleStatus getStatus() {
        return status;
    }

    public Visit status(ScheduleStatus status) {
        this.status = status;
        return this;
    }

    public void setStatus(ScheduleStatus status) {
        this.status = status;
    }

    public Instant getCreatedDate() {
        return createdDate;
    }

    public Visit createdDate(Instant createdDate) {
        this.createdDate = createdDate;
        return this;
    }

    public void setCreatedDate(Instant createdDate) {
        this.createdDate = createdDate;
    }

    public Set<VisitDetails> getVisits() {
        return visits;
    }

    public Visit visits(Set<VisitDetails> visitDetails) {
        this.visits = visitDetails;
        return this;
    }

    public Visit addVisit(VisitDetails visitDetails) {
        this.visits.add(visitDetails);
        visitDetails.setVisitDetails(this);
        return this;
    }

    public Visit removeVisit(VisitDetails visitDetails) {
        this.visits.remove(visitDetails);
        visitDetails.setVisitDetails(null);
        return this;
    }

    public void setVisits(Set<VisitDetails> visitDetails) {
        this.visits = visitDetails;
    }

    public Set<Attachment> getVisitAttachments() {
        return visitAttachments;
    }

    public Visit visitAttachments(Set<Attachment> attachments) {
        this.visitAttachments = attachments;
        return this;
    }

    public Visit addVisitAttachment(Attachment attachment) {
        this.visitAttachments.add(attachment);
        attachment.setVAttachment(this);
        return this;
    }

    public Visit removeVisitAttachment(Attachment attachment) {
        this.visitAttachments.remove(attachment);
        attachment.setVAttachment(null);
        return this;
    }

    public void setVisitAttachments(Set<Attachment> attachments) {
        this.visitAttachments = attachments;
    }

    public Patient getVisit() {
        return visit;
    }

    public Visit visit(Patient patient) {
        this.visit = patient;
        return this;
    }

    public void setVisit(Patient patient) {
        this.visit = patient;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Visit)) {
            return false;
        }
        return id != null && id.equals(((Visit) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Visit{" +
            "id=" + getId() +
            ", scheduleDate='" + getScheduleDate() + "'" +
            ", status='" + getStatus() + "'" +
            ", createdDate='" + getCreatedDate() + "'" +
            "}";
    }
}
