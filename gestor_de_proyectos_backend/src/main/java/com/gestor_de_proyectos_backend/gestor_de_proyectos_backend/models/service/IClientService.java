package com.gestor_de_proyectos_backend.gestor_de_proyectos_backend.models.service;

import java.util.List;

import com.gestor_de_proyectos_backend.gestor_de_proyectos_backend.models.entity.Client;

public interface IClientService {
    
    public List<Client> findAll();

    public Client findById(Long id);

    public Client save(Client client);
    
    public void delete(Long id);
}
