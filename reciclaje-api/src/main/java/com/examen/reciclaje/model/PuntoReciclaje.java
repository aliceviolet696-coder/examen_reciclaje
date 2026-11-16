package com.examen.reciclaje.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

/**
 * Entidad que representa un punto de reciclaje urbano.
 * No tiene relaciones con otras tablas (alcance del examen).
 */
@Entity
@Table(name = "puntos_reciclaje")
public class PuntoReciclaje {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank(message = "El nombre es obligatorio")
    @Size(max = 100, message = "El nombre no puede superar 100 caracteres")
    @Column(name = "nombre", nullable = false, length = 100)
    private String nombre;

    @NotBlank(message = "El sector es obligatorio")
    @Size(max = 100, message = "El sector no puede superar 100 caracteres")
    @Column(name = "sector", nullable = false, length = 100)
    private String sector;

    @NotBlank(message = "El material es obligatorio")
    @Size(max = 100, message = "El material no puede superar 100 caracteres")
    @Column(name = "material", nullable = false, length = 100)
    private String material;

    @NotNull(message = "La capacidad es obligatoria")
    @Min(value = 0, message = "La capacidad no puede ser negativa")
    @Column(name = "capacidad", nullable = false)
    private Integer capacidad;

    public PuntoReciclaje() {
    }

    public PuntoReciclaje(String nombre, String sector, String material, Integer capacidad) {
        this.nombre = nombre;
        this.sector = sector;
        this.material = material;
        this.capacidad = capacidad;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getSector() {
        return sector;
    }

    public void setSector(String sector) {
        this.sector = sector;
    }

    public String getMaterial() {
        return material;
    }

    public void setMaterial(String material) {
        this.material = material;
    }

    public Integer getCapacidad() {
        return capacidad;
    }

    public void setCapacidad(Integer capacidad) {
        this.capacidad = capacidad;
    }
}
