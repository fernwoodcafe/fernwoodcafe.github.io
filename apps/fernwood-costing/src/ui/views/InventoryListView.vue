<template>
  <h1>Inventory</h1>
  <p>Coming Soon</p>
</template>

<script setup lang="ts">
import type { CafeCommandUnion } from "@packages/domain/types/CafeCommandUnion";
import type { Inventory } from "@packages/domain/types/Inventory";
import type { ReactiveArray } from "@ui/types/ReactiveArray";

type Props = {
  inventoriesList: ReactiveArray<Inventory>;
  sendCommand: (Command: CafeCommandUnion) => Promise<void>;
};

const props = defineProps<Props>();
</script>
