<template>
  <h1>Menu Items</h1>
  <button @click="onClickNewMenuItem">New Menu Item</button>
  <form>
    <input v-model="newMenuItem.id" />
  </form>
  <nav>
    <li :key="item.id" v-for="item in menuItemsList.items">
      <RouterLink :to="`/menu-items/${item.menuItemId}`">{{
        item.menuItemId
      }}</RouterLink>
    </li>
  </nav>
  <RouterView :key="$route.fullPath" />
</template>

<script setup lang="ts">
type Props = {
  menuItemsList: ReactiveArray<CafeDomain.MenuItem>;
  sendCommand: (Command: CafeDomain.DomainCommand) => Promise<void>;
};

const props = defineProps<Props>();

const newMenuItem: CafeDomain.MenuItem = {
  id: "",
  menuItemId: "",
  ingredients: [],
  packaging: [],
};

const onClickNewMenuItem = () => {
  props.sendCommand({
    type: "create_new_menu_item",
    payload: {
      id: self.crypto.randomUUID(),
      menuItemId: newMenuItem.id,
    },
  });
};
</script>
