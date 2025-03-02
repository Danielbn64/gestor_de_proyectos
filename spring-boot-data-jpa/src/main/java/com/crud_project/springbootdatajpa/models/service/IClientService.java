package com.crud_project.springbootdatajpa.models.service;

import java.util.List;

import com.crud_project.springbootdatajpa.models.entity.Client;

public interface IClientService {
    
    public List<Client> findAll();

    public Client findOne(Long id);

    public void save(Client client);
    
    public void delete(Long id);
}
