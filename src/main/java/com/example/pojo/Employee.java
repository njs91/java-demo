package com.example.pojo;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

// This annotation specifies that this class is a database entity (table).
@Entity
public class Employee {
    // This field represents the primary key of the Employee table.
    @Id
    private int empNo; // Employee number (unique identifier).
    private String eName; // Employee name.
    private String phoneNo; // Employee phone number.

    // Getter and setter methods are used to read and update the field values.

    public int getEmpNo() {
        return empNo;
    }

    public void setEmpNo(int empNo) {
        this.empNo = empNo;
    }

    public String geteName() {
        return eName;
    }

    public void seteName(String eName) {
        this.eName = eName;
    }

    public String getPhoneNo() {
        return phoneNo;
    }

    public void setPhoneNo(String phoneNo) {
        this.phoneNo = phoneNo;
    }
}
