<template>
  <input type="number" v-model="percent" />
</template>
<script lang="ts">
import { ref } from "vue";
import type { ICellEditorParams } from "ag-grid-community";
type Props = {
  params: ICellEditorParams;
};

export default {
  setup(props: Props) {
    const percent = ref(props.params.value);
    return {
      percent,
      getValue: () => percent.value / 100,
    };
  },
};
</script>
