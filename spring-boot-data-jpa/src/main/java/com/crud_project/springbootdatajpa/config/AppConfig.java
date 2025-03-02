package com.crud_project.springbootdatajpa.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan(basePackages = "com.crud_project.springbootdatajpa.models_dao.dao")
public class AppConfig {
    
}
