<template>
  <div class="form-container">
    <h3>{{ productoEditar ? 'Editar Producto' : 'Nuevo Producto' }}</h3>
    
    <div v-if="mensaje" :class="['alerta', tipoAlerta]">
      {{ mensaje }}
    </div>

    <form @submit.prevent="guardar">
      <div>
        <label>Nombre:</label>
        <input v-model="formulario.nombre" type="text" required />
      </div>
      <div>
        <label>Descripción:</label>
        <textarea v-model="formulario.descripcion"></textarea>
      </div>
      <div>
        <label>Precio:</label>
        <input v-model="formulario.precio" type="number" step="0.01" required />
      </div>
      <div>
        <label>Stock:</label>
        <input v-model="formulario.stock" type="number" required />
      </div>
      <button type="submit" class="btn-guardar">
        {{ productoEditar ? 'Actualizar Producto' : 'Guardar Producto' }}
      </button>
      <button type="button" v-if="productoEditar" @click="cancelar" class="btn-cancelar">
        Cancelar
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { createProducto, updateProducto } from '../services/productoService'

const props = defineProps({
  productoEditar: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['recargar', 'limpiar-edicion'])

const formulario = ref({ nombre: '', descripcion: '', precio: 0, stock: 0 })
const mensaje = ref('')
const tipoAlerta = ref('')

// 1. PRIMERO declaramos las funciones de apoyo
const resetFormulario = () => {
  formulario.value = { nombre: '', descripcion: '', precio: 0, stock: 0 }
}

const mostrarMensaje = (texto, tipo) => {
  mensaje.value = texto
  tipoAlerta.value = tipo
  setTimeout(() => { mensaje.value = '' }, 3000)
}

// 2. DESPUÉS ponemos el watch, así ya sabe qué es resetFormulario()
watch(() => props.productoEditar, (nuevoProducto) => {
  if (nuevoProducto) {
    formulario.value = { ...nuevoProducto }
  } else {
    resetFormulario()
  }
}, { immediate: true })

// 3. Y finalmente las funciones principales
const guardar = async () => {
  try {
    if (props.productoEditar) {
      await updateProducto(props.productoEditar.id, formulario.value)
      mostrarMensaje('Producto actualizado correctamente', 'exito')
    } else {
      await createProducto(formulario.value)
      mostrarMensaje('Producto creado correctamente', 'exito')
    }
    emit('recargar')
    resetFormulario()
    emit('limpiar-edicion')
  } catch (error) {
    mostrarMensaje('Ocurrió un error al guardar', 'error')
    console.error(error)
  }
}

const cancelar = () => {
  resetFormulario()
  emit('limpiar-edicion')
}
</script>

<style scoped>
.form-container { border: 1px solid #ddd; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
.form-container div { margin-bottom: 10px; }
input, textarea { width: 100%; padding: 8px; margin-top: 5px; }
.btn-guardar { background-color: #4CAF50; color: white; padding: 10px; border: none; cursor: pointer; }
.btn-cancelar { background-color: #f44336; color: white; padding: 10px; border: none; cursor: pointer; margin-left: 10px; }
.alerta { padding: 10px; margin-bottom: 15px; border-radius: 4px; }
.exito { background-color: #d4edda; color: #155724; }
.error { background-color: #f8d7da; color: #721c24; }
</style>