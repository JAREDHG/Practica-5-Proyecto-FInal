<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="fw-bold text-dark m-0">Vista General del Sistema</h2>
      <span class="badge bg-primary px-3 py-2 fs-6 shadow-sm">Token Activo</span>
    </div>

    <div class="card border-0 shadow-sm">
      <div class="card-header bg-white border-bottom py-3">
        <h6 class="mb-0 fw-bold">Últimos Eventos Registrados</h6>
      </div>
      <div class="card-body p-0">
        <ul class="list-group list-group-flush">
          <li class="list-group-item d-flex justify-content-between align-items-center p-3">
            <span>Ingreso autorizado al panel protegido por Vue Router.</span>
            <span class="badge bg-success rounded-pill">Hace unos segundos</span>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center p-3">
            <span>Validación de token Bearer (Sanctum) completada.</span>
            <span class="badge bg-secondary rounded-pill">Hace 1 min</span>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center p-3">
            <span>Petición GET a /api/productos finalizada.</span>
            <span class="badge bg-secondary rounded-pill">Hace 5 min</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>