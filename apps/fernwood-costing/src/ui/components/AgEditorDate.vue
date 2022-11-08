<template>
  <input ref="input" type="date" v-model="date" />
</template>
<script lang="ts">
import type { ICellEditorParams } from "ag-grid-community";
import { defineComponent, ref } from "vue";
type Props = {
  params: ICellEditorParams;
};

// TODO [ui] Make the chosen date in human readable format instead of YYYY-MM-DD.
// TODO [architecture] Pass around dates as ISO 8601 strings instead of Date objects.
// TODO [architecture] Introduce an custom IsoDateString type to store that value.
// Why? This avoids the problem of de/serialization conflicts as we pass around dates.
// We can always count on the string being an ISO 8601 string instead of being serialized
// in some way that we do not expect.
export default defineComponent({
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
