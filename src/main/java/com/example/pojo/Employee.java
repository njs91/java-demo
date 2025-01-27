package com.example.pojo;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

//specifies this class is part of the ORM
@Entity
public class Employee {
    //this attribute is having a primary key
    @Id
    private int empNo;
    private String eName;
    private String phoneNo;

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
