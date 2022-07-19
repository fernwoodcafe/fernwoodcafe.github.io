<template>
  <input type="checkbox" v-model="checked" />
</template>
<script lang="ts">
import type { ICellEditorParams } from "ag-grid-community";
import { ref } from "vue";
type Props = {
  params: ICellEditorParams;
};

export default {
  setup(props: Props) {
    const checked = ref(props.params.value?.valueOf());
    console.log("wat", checked.value);
    return {
      checked,
      getValue: () => checked.value,
    };
  },
};
</script>
