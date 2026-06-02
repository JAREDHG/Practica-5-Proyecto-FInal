<template>
  <div class="container mt-5">
    <h2>Catálogo de Productos</h2>
    
    <div class="mb-4">
      <input 
        v-model="busqueda" 
        type="text" 
        class="form-control" 
        placeholder="Buscar producto por nombre..."
      >
    </div>

    <div class="row">
      <div class="col-md-4 mb-4" v-for="producto in productosFiltrados" :key="producto.id">
        <div class="card h-100 shadow-sm">
          <div class="card-body">
            <h5 class="card-title">{{ producto.nombre }}</h5>
            <p class="card-text">${{ producto.precio }}</p>
            
            <div class="d-grid gap-2">
              <router-link :to="`/catalogo/${producto.id}`" class="btn btn-outline-primary btn-sm">
                Ver Detalles
              </router-link>

              <button 
                class="btn btn-sm" 
                :class="carrito.cantidadDeProducto(producto.id) > 0 ? 'btn-success' : 'btn-primary'"
                @click="carrito.agregar(producto)"
              >
                <template v-if="carrito.cantidadDeProducto(producto.id) > 0">
                  En carrito ({{ carrito.cantidadDeProducto(producto.id) }})
                </template>
                <template v-else>
                  Agregar al carrito
                </template>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
// Importamos el store de Pinia
import { useCarritoStore } from '../stores/carrito'

const carrito = useCarritoStore()
const productos = ref([])
const busqueda = ref('')

const productosFiltrados = computed(() =>
  productos.value.filter(p =>
    p.nombre.toLowerCase().includes(busqueda.value.toLowerCase())
  )
)

onMounted(async () => {
  try {
    const respuesta = await axios.get('http://localhost:8000/api/productos')
    productos.value = respuesta.data
  } catch (error) {
    console.error('Error al cargar productos:', error)
  }
})
</script>