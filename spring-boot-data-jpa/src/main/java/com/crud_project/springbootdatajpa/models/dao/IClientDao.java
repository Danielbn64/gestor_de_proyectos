package com.crud_project.springbootdatajpa.models.dao;

import org.springframework.data.repository.CrudRepository;

import com.crud_project.springbootdatajpa.models.entity.Client;

public interface IClientDao extends CrudRepository<Client, Long>{

}
