package com.crud_project.springbootdatajpa.controllers;

import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.crud_project.springbootdatajpa.models.entity.Client;
import com.crud_project.springbootdatajpa.models.service.IClientService;

@Controller
@SessionAttributes("client")
public class ClientController {

    @Autowired
    private IClientService clientService;

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public String list(Model model) {
        model.addAttribute("title", "Listado de clientes");
        model.addAttribute("clients", clientService.findAll());
        return "list";
    }

    @RequestMapping(value = "/form")
    public String create(Map<String, Object> model) {

        Client client = new Client();
        model.put("client", client);
        model.put("title", "Formulario de cliente");
        return "form";
    }

    @RequestMapping(value = "form", method = RequestMethod.POST)
    public String save(@Valid Client client, BindingResult result, Model model, RedirectAttributes flash,
            SessionStatus status) {
        if (result.hasErrors()) {
            model.addAttribute("title", "Formulario de cliente");
            return "form";
        }
        String  flashMessage = (client.getId() != null)? "Cliente editado con éxito" : "Cliente creado con éxito";

        clientService.save(client);
        status.setComplete();
        flash.addFlashAttribute("success", flashMessage);
        return "redirect:list";
    }

    @RequestMapping(value = "/form/{id}")
    public String edit(@PathVariable(value = "id") long id, Map<String, Object> model, RedirectAttributes flash) {
        Client client = null;
        if (id > 0) {
            client = clientService.findOne(id);
            if (client == null) {
                flash.addFlashAttribute("error", "El ID del cliente no existe en la base de datos");
                return "redirect:/list";
            }
        } else {
            flash.addFlashAttribute("error", "El ID del cliente no puede ser cero");
            return "redirect:/list";
        }
        model.put("client", client);
        model.put("title", "Editar cliente");
        return "form";
    }

    @RequestMapping(value = "/delete/{id}")
    public String delete(@PathVariable(value = "id") Long id, RedirectAttributes flash) {
        if (id > 0) {
            clientService.delete(id);
            flash.addFlashAttribute("success", "Cliente eliminado con éxito");
        }
        return "redirect:/list";
    }
}
