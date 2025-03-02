package com.gestor_de_proyectos_backend.gestor_de_proyectos_backend.models.dao;

import org.springframework.data.repository.CrudRepository;

import com.gestor_de_proyectos_backend.gestor_de_proyectos_backend.models.entity.Client;

public interface IClientDao extends CrudRepository<Client, Long>{

}
