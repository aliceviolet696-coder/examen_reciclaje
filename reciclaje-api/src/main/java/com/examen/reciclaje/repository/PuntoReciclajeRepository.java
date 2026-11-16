package com.examen.reciclaje.repository;

import com.examen.reciclaje.model.PuntoReciclaje;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repositorio JPA para la entidad PuntoReciclaje.
 * JpaRepository ya incluye findAll(), save(), findById(), deleteById(), etc.
 */
@Repository
public interface PuntoReciclajeRepository extends JpaRepository<PuntoReciclaje, Integer> {
}
