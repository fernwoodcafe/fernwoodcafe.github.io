<template>
  <ag-grid-vue
    class="ag-theme-alpine"
    style="height: 500px"
    :columnDefs="columnDefs.value"
    :rowData="rowData.value"
    :defaultColDef="defaultColDef"
  >
  </ag-grid-vue>
</template>

<script>
import { AgGridVue } from "ag-grid-vue3";
import { onMounted, reactive } from "vue";

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS

export default {
  name: "AgGridTable",
  components: {
    AgGridVue,
  },
  setup() {
    const rowData = reactive({});

    // Each Column Definition results in one Column.
    const columnDefs = reactive({
      value: [
        { field: "supplierId" },
        { field: "itemId" },
        { field: "cost" },
        { field: "totalUnits" },
        { field: "units" },
      ],
    });

    // DefaultColDef sets props common to all Columns
    const defaultColDef = {
      sortable: true,
      filter: true,
      flex: 1,
    };

    // Example load data from sever
    onMounted(() => {
      rowData.value = [
        {
          supplierId: "Country Grocer",
          itemId: "Cheese",
          cost: 10,
          totalUnits: 10,
          units: "grams",
        },
      ];
    });

    return {
      columnDefs,
      rowData,
      defaultColDef,
    };
  },
};
</script>
