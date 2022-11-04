<template>
  <input ref="input" type="date" v-model="date" />
</template>
<script lang="ts">
import type { ICellEditorParams } from "ag-grid-community";
import { defineComponent, ref } from "vue";
type Props = {
  params: ICellEditorParams;
};

export default defineComponent({
  mounted() {
    this.$nextTick(() => {
      if (this.$refs.input instanceof HTMLInputElement) {
        // TODO Make the chosen date in human readable format instead of YYYY-MM-DD.
        this.$refs.input.focus();
        this.$refs.input.select();
        this.$refs.input.showPicker();
      }
    });
  },
  setup(props: Props) {
    const date = ref(props.params.value);
    return {
      date,
      getValue: () => new Date(date.value),
    };
  },
});
</script>
<style>
.ag-root-wrapper input[type="date"] {
  font-size: 20px;
  border: none;
  outline: none;
  padding: 5px;
}
</style>
