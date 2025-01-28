package com.example.pojo;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

import java.time.LocalDate;

// Specifies that this class is an entity and is mapped to a database table.
@Entity
public class Employee {
    // This attribute is the primary key of the entity.
    @Id
    private int empNo;
    
    // Employee name.
    private String eName;
    
    // Employee phone number.
    private String phoneNo;
    
    // Employee hire date, formatted as "yyyy-MM-dd".
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate emphiredate;

    // Getter method for empNo.
    public int getEmpNo() {
        return empNo;
    }

    // Setter method for empNo.
    public void setEmpNo(int empNo) {
        this.empNo = empNo;
    }

    // Getter method for eName.
    public String geteName() {
        return eName;
    }

    // Setter method for eName.
    public void seteName(String eName) {
        this.eName = eName;
    }

    // Getter method for phoneNo.
    public String getPhoneNo() {
        return phoneNo;
    }

    // Setter method for phoneNo.
    public void setPhoneNo(String phoneNo) {
        this.phoneNo = phoneNo;
    }

    // Getter method for emphiredate.
    public LocalDate getEmphiredate() {
        return emphiredate;
    }

    // Setter method for emphiredate.
    public void setEmphiredate(LocalDate emphiredate) {
        this.emphiredate = emphiredate;
    }
}
