package com.examen.reciclaje.controller;

import com.examen.reciclaje.model.PuntoReciclaje;
import com.examen.reciclaje.repository.PuntoReciclajeRepository;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * API REST de puntos de reciclaje.
 *
 * GET  /api/puntos -> lista todos los puntos registrados.
 * POST /api/puntos -> guarda un nuevo punto y lo devuelve con su id generado.
 */
@RestController
@RequestMapping("/api/puntos")
public class PuntoReciclajeController {

    private final PuntoReciclajeRepository repository;

    public PuntoReciclajeController(PuntoReciclajeRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<PuntoReciclaje> listarTodos() {
        return repository.findAll();
    }

    @PostMapping
    public ResponseEntity<PuntoReciclaje> guardar(@Valid @RequestBody PuntoReciclaje punto) {
        // El id lo genera la base de datos, por eso se fuerza a null antes de guardar.
        punto.setId(null);
        PuntoReciclaje guardado = repository.save(punto);
        return ResponseEntity.status(HttpStatus.CREATED).body(guardado);
    }
}
